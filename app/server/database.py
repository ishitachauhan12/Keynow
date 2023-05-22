from sqlalchemy.orm import declarative_base
import os
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

ALCHEMY_URL = f"postgresql+psycopg2://{os.environ.get('POSTGRES_USER')}:{os.environ.get('POSTGRES_PASSWORD')}@db/{os.environ.get('POSTGRES_DB')}"

engine = create_engine(ALCHEMY_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

metadata = MetaData()

Base = declarative_base(metadata=metadata)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    metadata.create_all(bind=engine, checkfirst=True)
