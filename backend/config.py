import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

class Config:
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_GROUP = os.getenv("LOG_GROUP", "cdms-log-group")
    REGION = os.getenv("AWS_REGION", "us-west-2")

# Database setup
DATABASE_URL = "sqlite:///./cdms.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def setup_database():
    # Create all tables in the database
    Base.metadata.create_all(bind=engine)
