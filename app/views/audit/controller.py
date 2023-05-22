from fastapi import Depends, APIRouter, HTTPException
from .helper import getAllAudits, generate_flags, suspendAll
from sqlalchemy.orm import Session
from app.server.database import get_db

auditRouter = APIRouter()


@auditRouter.get('/audits')
def call(page_no: int, page_size: int, db: Session = Depends(get_db)):
    return getAllAudits(page_no, page_size, db)


@auditRouter.post('/call')
def call(vendor: str):
    try:
        generate_flags.delay(vendor)
        return {
            "status": 'ok',
            "message": 'please check the dashboard in a while'
        }
    except Exception as e:
        return {
            "status": 'error',
            "message": str(e)
        }


@auditRouter.post('/suspendAll')
def call(audit_id: str, db: Session = Depends(get_db)):
    try:
        suspendAll.delay(audit_id)
        return {
            "status": 'ok',
            "message": 'please check the vendor dashboard in a while, selected users should be automatically deactivated'
        }
    except Exception as e:
        return {
            "status": 'error',
            "error": str(e)
        }
