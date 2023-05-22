from fastapi import  Depends, APIRouter, HTTPException
from .helper import getAllEmployees, addEmployee, deactivateEmployee
from sqlalchemy.orm import Session
from app.server.database import get_db
from .schema import employeeSchema

employeeRouter = APIRouter()

@employeeRouter.get('/list')
def call(page_no: int, page_size: int, db: Session = Depends(get_db)):
    return getAllEmployees(page_no, page_size, db)

@employeeRouter.post('/add')
def call(data: employeeSchema, db: Session = Depends(get_db)):
    return addEmployee(data, db)

@employeeRouter.put('/markInactive')
def call(eid: str, db: Session = Depends(get_db)):
    return deactivateEmployee(eid, db)
