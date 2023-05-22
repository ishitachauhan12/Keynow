from fastapi.params import Query
from ...utils.celery import app as celery_app
import importlib
from .model import Flag, Audit
from sqlalchemy.orm import Session
from ..platform.helper import addOrUpdatePlatformUser
from ..platform.model import Platform, platformUser
from ..employee.model import Employee
from ..platform.src.google.driver import Driver
from app.server.database import get_db
from ...utils.hash import encrypt, decrypt


def getAllAudits(page_no: int, page_size: int, db: Session):
    try:
        start = (page_no - 1) * page_size
        end = start + page_size
        audits = db.query(Audit).all()
        audits = audits[start:end]
        for r in audits:
            r = r.__dict__
            id = r['id']
            r['notFoundFlags'] = db.query(Flag).filter(
                Flag.audit_id == id, Flag.type == 'NOT_FOUND_IN_MASTER_DATA').count()
            r['inactiveFlags'] = db.query(Flag).filter(
                Flag.audit_id == id, Flag.type == 'SHOULD_BE_INACTIVE').count()
        return {
            "status": 'OK',
            "message": 'audits',
            "list": audits
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)  # "something went wrong"
        }


def update_platform_list(vendor_id: int, vendor: str, db: Session):
    driverModule = importlib.import_module(
        f'app.views.platform.src.{vendor}.driver')
    driver = driverModule.Driver()
    updatedList = driver.getVendorData()
    for email in updatedList:
        addOrUpdatePlatformUser(db=db, platform_id=vendor_id, email=email)
        encrypted_email = encrypt(email)
        emp = db.query(Employee).filter(
            Employee.email == encrypted_email).first()
        if emp:
            usr = db.query(platformUser).filter(platformUser.employee_id == encrypt(
                str(emp.id)), platformUser.platform_id == vendor_id).first()
            usr.active = not updatedList[email]
        else:
            usr = db.query(platformUser).filter(platformUser.platform_email ==
                                                encrypted_email, platformUser.platform_id == vendor_id).first()
            usr.active = not updatedList[email]
    db.commit()


class FlagsGenerationError(Exception):
    pass


@celery_app.task
def generate_flags(vendor_name: str):
    try:
        db = next(get_db())
        vendor_id = None
        vendor = db.query(Platform).filter(
            Platform.vendor == vendor_name).first()
        if vendor:
            vendor_id = vendor.id
        else:
            raise FlagsGenerationError(f"{vendor_name} not found")
        update_platform_list(vendor_id, vendor_name, db)
        masterData = db.query(Employee).all()
        vendorData = db.query(platformUser).filter(
            platformUser.platform_id == vendor_id).all()
        inactive_flagged = []
        not_found_flagged = []
        audit = Audit(platform_id=vendor_id)
        db.add(audit)
        db.commit()
        db.refresh(audit)
        flags = []
        for usr in vendorData:
            print(f'{usr.employee_id} {usr.platform_email}')
            if not usr.employee_id:
                print('employee id not found')
                flag = Flag(audit_id=audit.id,
                            type='NOT_FOUND_IN_MASTER_DATA', user_id=usr.id)
                flags.append(flag)
                not_found_flagged.append(decrypt(usr.platform_email))
            else:
                emp_id = decrypt(usr.employee_id)
                print(f'decrypted id is {emp_id}')
                employee = db.query(Employee).filter(
                    Employee.id == emp_id).first()
                if not employee.active and usr.active:
                    flag = Flag(audit_id=audit.id,
                                type='SHOULD_BE_INACTIVE', user_id=usr.id)
                    flags.append(flag)
                inactive_flagged.append(decrypt(employee.email))
            print('-------------------------------------')
        db.bulk_save_objects(flags)
        db.commit()
        gDriver = Driver()
        for fEmail in not_found_flagged:
            gDriver.sendEmail(vendor=vendor, to=[fEmail], fromEmail='tech.admin@keynow.live',
                              message=f'Your email associated with {vendor.vendor} was not found in master data. If you think this is a mistake, contact Human Resources within 12 hours before the account is suspended'
                              )
        for fEmail in inactive_flagged:
            gDriver.sendEmail(vendor=vendor, to=[fEmail], fromEmail='tech.admin@keynow.live',
                              message=f'Your email associated with {vendor.vendor} was found to be marked inactive in the master data. If you think this is a mistake, contact Human Resources within 12 hours before the account is suspended'
                              )
    except Exception as e:
        raise FlagsGenerationError(
            f"could not update platform list and generate_flags {e}")


@celery_app.task
def suspendAll(audit_id: str):
    db = next(get_db())
    driverModule = importlib.import_module(
        f'app.views.platform.src.{platform}.driver')
    driver = driverModule.Driver()
    flags = db.query(Flag).filter(Flag.audit_id == audit_id).all()
    for flag in flags:
        pUser = db.query(platformUser).filter(
            platformUser.id == flag.user_id).first()
        email = None
        if pUser.platform_email:
            email = pUser.platform_email
        else:
            emp = db.query(Employee).filter(
                Employee.id == pUser.employee_id).first()
            email = emp.email
        driver.suspendUser(email)
        pUser.active = False
        db.commit(pUser)
