from app.server.database import Base
from sqlalchemy import Column, String, ForeignKey, Integer, UniqueConstraint, Boolean
from ...utils.hash import encrypt, decrypt
from sqlalchemy.orm import Session
from ..user.model import User


class Platform(Base):
    __tablename__ = 'platforms'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    vendor = Column(String, nullable=False, index=True, default='Unknown')


class platformUser(Base):
    __tablename__ = 'platform_users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    platform_id = Column(Integer, ForeignKey('platforms.id'))
    employee_id = Column(String, nullable=True)
    platform_email = Column(String, nullable=True)
    active = Column(Boolean, default=True)

    __table_args__ = (UniqueConstraint(
        'platform_id', 'user_id', name='unique_user_per_platform'),)
    __table_args__ = (UniqueConstraint(
        'platform_id', 'platform_email', name='unique_email_per_platform'),)

    @staticmethod
    def get_user(user_id: str, db: Session):
        decrypted_id = int(decrypt(user_id))
        user = db.query(User).filter(User.id == decrypted_id).first()
        return user

    @staticmethod
    def get_email(email: str, db: Session):
        decrypted_email = decrypt(email)
        return decrypted_email
