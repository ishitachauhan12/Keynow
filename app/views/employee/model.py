from app.server.database import Base
from sqlalchemy import Column, String, ForeignKey, Integer, UniqueConstraint, Boolean

class Employee(Base):
    __tablename__ = 'employees'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    eid = Column(String, nullable=False, index=True, unique=True)
    email = Column(String, nullable=False, index=True, unique=True)
    department = Column(String)
    fullName = Column(String)
    active = Column(Boolean, default=True)
