from app.server.database import Base
from sqlalchemy import Column, String, Float, Integer, ForeignKey
from ...utils.hash import pwd_context
from sqlalchemy.orm import Session

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    def verify_password(self, password: str):
        return pwd_context.verify(password, self.password)

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return False
        if not user.verify_password(password):
            return False
        return user
