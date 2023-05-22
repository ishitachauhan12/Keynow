from typing import Dict
from .model import Platform, platformUser
from sqlalchemy.orm import Session, sessionmaker
from fastapi.params import Query
import pandas as pd
from ...utils.celery import app as celery_app
from sqlalchemy import create_engine
import datetime
import pytz
from .schema import platformSchema
from ...utils.hash import encrypt, decrypt
from ..user.model import User
import importlib
from ..audit.model import Audit, Flag
from ..employee.model import Employee


def getAllplatforms(page_no: int, page_size: int, db: Session):
    try:
        start = (page_no - 1) * page_size
        end = start + page_size
        platforms = db.query(Platform).all()
        platforms = platforms[start:end]
        for platform in platforms:
            platform = platform.__dict__
            audits = db.query(Audit).filter(
                Audit.platform_id == platform['id']).all()
            for audit in audits:
                audit = audit.__dict__
                id = audit['id']
                audit['notFoundFlags'] = db.query(Flag).filter(
                    Flag.audit_id == id, Flag.type == 'NOT_FOUND_IN_MASTER_DATA').count()
                audit['inactiveFlags'] = db.query(Flag).filter(
                    Flag.audit_id == id, Flag.type == 'SHOULD_BE_INACTIVE').count()
            platform['audits'] = audits
        return {
            "status": 'OK',
            "message": 'platforms',
            "list": platforms
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)  # "something went wrong"
        }


def getplatform(vendor: str, db: Session):
    try:
        platform = db.query(Platform).filter(Platform.vendor == vendor).first()
        audits = db.query(Audit).filter(Audit.platform_id == platform.id).all()
        for audit in audits:
            audit = audit.__dict__
            id = audit['id']
            audit['notFoundFlags'] = db.query(Flag).filter(
                Flag.audit_id == id, Flag.type == 'NOT_FOUND_IN_MASTER_DATA').count()
            audit['inactiveFlags'] = db.query(Flag).filter(
                Flag.audit_id == id, Flag.type == 'SHOULD_BE_INACTIVE').count()
            flags = db.query(Flag).filter(Flag.audit_id == id).all()
            for f in flags:
                f = f.__dict__
                pUser = db.query(platformUser).filter(
                    platformUser.id == f['user_id']).first()
                email = None
                if pUser.platform_email:
                    email = decrypt(pUser.platform_email)
                else:
                    emp = db.query(Employee).filter(
                        Employee.id == decrypt(pUser.employee_id)).first()
                    email = decrypt(emp.email)
                pUser = pUser.__dict__
                pUser['email'] = email
                f['account'] = pUser
            audit['flags'] = flags
        platform = platform.__dict__
        platform['audits'] = audits
        return {
            "status": 'OK',
            "message": 'platform',
            "data": platform,
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)  # "something went wrong"
        }


def addPlatform(data: platformSchema, db: Session):
    try:
        platform = db.query(Platform).filter(
            Platform.vendor == data.vendor).all()
        if len(platform) != 0:
            return {
                "status": 'FAILED',
                "message": 'This platform already exists'
            }
        platform = Platform(vendor=data.vendor)
        db.add(platform)
        db.commit()
        db.refresh(platform)
        return {
            "status": 'OK',
            "message": 'platform added',
            "data": platform
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)  # "something went wrong"
        }


def addOrUpdatePlatformUser(db: Session, platform_id: int, email: str):
    try:
        print('in the helper function')
        encrypted_email = encrypt(email)
        employee = db.query(Employee).filter(
            Employee.email == encrypted_email).first()
        platform_user = None
        if employee:
            encrypted_id = encrypt(str(employee.id))
            platform_user = db.query(platformUser).filter(
                platformUser.platform_id == platform_id, platformUser.platform_email == encrypted_email).first()
            if not platform_user:
                platform_user = db.query(platformUser).filter(
                    platformUser.platform_id == platform_id, platformUser.employee_id == encrypted_id).first()
                if not platform_user:
                    platform_user = platformUser(
                        platform_id=platform_id, employee_id=encrypted_id)
                    db.add(platform_user)
            else:
                platform_user.platform_email = None
                platform_user.employee_id = encrypted_id
        else:
            platform_user = db.query(platformUser).filter(
                platformUser.platform_id == platform_id, platformUser.platform_email == encrypted_email).first()
            if not platform_user:
                platform_user = platformUser(
                    platform_id=platform_id, platform_email=encrypted_email)
                db.add(platform_user)
        db.commit()
        return platform_user
    except Exception as e:
        print(e)


def deactivateAccount(email: str, platform: str, db: Session):
    try:
        driverModule = importlib.import_module(
            f'app.views.platform.src.{platform}.driver')
        driver = driverModule.Driver()
        driver.suspendUser(email)
        return {
            'message': 'account suspended successfully'
        }
    except Exception as e:
        return {
            'message': str(e)
        }
