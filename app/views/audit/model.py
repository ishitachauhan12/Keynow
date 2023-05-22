from app.server.database import Base
from sqlalchemy import Column, String, DateTime, Integer, func, ForeignKey, Boolean

class Audit(Base):
    __tablename__ = 'audits'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    platform_id = Column(Integer, ForeignKey('platforms.id'))
    timestamp = Column(DateTime, default=func.now())

class Flag(Base):
    __tablename__ = 'flags'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    audit_id = Column(Integer, ForeignKey('audits.id'))
    type = Column(String)
    user_id = Column(Integer, ForeignKey('platform_users.id'))
