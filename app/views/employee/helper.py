from typing import Dict
from .model import Employee
from fastapi.params import Query
from .schema import employeeSchema
from sqlalchemy.orm import Session
from ...utils.hash import encrypt

def getAllEmployees(page_no: int, page_size: int, db: Session):
    try:
        start = (page_no - 1) * page_size
        end = start + page_size
        employees = db.query(Employee).filter(Employee.active==True).all()
        employees = employees[start:end]
        for r in employees:
            r = r.__dict__
        return {
            "status": 'OK',
            "message": 'employees',
            "list": employees
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)#"something went wrong"
        }

def addEmployee(data: employeeSchema, db: Session):
    try:
        encrypted_email = encrypt(data.email)
        employee = db.query(Employee).filter(Employee.email==encrypted_email).all()
        if len(employee) != 0:
            return {
                "status": 'FAILED',
                "message": 'This employee already exists'
            }
        data = data.__dict__
        data['email'] = encrypted_email
        employee = Employee(**data)
        db.add(employee)
        db.commit()
        db.refresh(employee)
        return {
            "status": 'OK',
            "message": 'employee added',
            "data": employee
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)#"something went wrong"
        }

def deactivateEmployee(eid: str, db: Session):
    try:
        employee = db.query(Employee).filter(Employee.eid==eid).first()
        if not employee:
            return {
                "status": 'FAILED',
                "message": 'This employee does not exist'
            }
        employee.active = False
        db.commit()
        db.refresh(employee)
        return {
            "status": 'OK',
            "message": 'Employee marked as inactive',
            "data": employee
        }
    except Exception as e:
        db.rollback()
        return {
            "status": "error",
            "message": str(e)
        }
