from fastapi import Depends, APIRouter, HTTPException
from .helper import getAllplatforms, getplatform, addPlatform, deactivateAccount
from sqlalchemy.orm import Session
from app.server.database import get_db
from .schema import platformSchema

platformRouter = APIRouter()


@platformRouter.get('/list')
def call(page_no: int, page_size: int, db: Session = Depends(get_db)):
    return getAllplatforms(page_no, page_size, db)


@platformRouter.get('/detail')
def call(vendor: str, db: Session = Depends(get_db)):
    return getplatform(vendor, db)


@platformRouter.post('/add')
def call(data: platformSchema, db: Session = Depends(get_db)):
    return addPlatform(data, db)


@platformRouter.put('/deactivateAccount')
def call(email: str, platform: str, db: Session = Depends(get_db)):
    return deactivateAccount(email, platform, db)
