from typing import Dict
from ...utils.jwtHandler import encode, decode
from .schema import userSchema
from .model import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def signUp(data: userSchema, db: Session):
    try:
        email = data.email
        password = data.password
        users = db.query(User).filter(User.email==email).all()
        if len(users) != 0:
            return {
                "status": 'FAILED',
                "message": 'User with this email already exists'
            }
        hashed_password = pwd_context.hash(password)
        db_user = User(email=email, password=hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return {
            "status": 'SUCCESS',
            "message": 'User added',
            "user": db_user
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)#"something went wrong"
        }
