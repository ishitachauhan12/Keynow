from fastapi import  Depends, APIRouter, HTTPException
from .helper import signUp
from .schema import userSchema
from sqlalchemy.orm import Session
from app.server.database import get_db
from .model import User
from ...utils.jwtHandler import encode
from .model import User

userRouter = APIRouter()

@userRouter.post('/signUp')
def call(data: userSchema, db: Session = Depends(get_db)):
    return signUp(data, db)

@userRouter.post('/signIn')
async def call(data: userSchema, db: Session = Depends(get_db)):
    try:
        db_user = User.authenticate_user(db, data.email, data.password)
        if not db_user:
            return {
                "message": "incorrect password"
            }
        return {
            "message": "verification successfull",
            "user": db_user,
            "token": encode(db_user.email)
        }
    except Exception as e:
        return {
            "message": str(e)#"Verification failed"
        }
