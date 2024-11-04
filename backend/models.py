from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
    role = Column(String)  # e.g., "admin", "volunteer", "user"

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True)
    location = Column(String)
    description = Column(String)
    severity = Column(String)
    status = Column(String)

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    quantity = Column(Integer)
    location = Column(String)
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    incident_id = Column(Integer, ForeignKey("incidents.id"))
    message = Column(String)
    timestamp = Column(TIMESTAMP, server_default=func.now())

# Database setup
DATABASE_URL = "sqlite:///./cdms.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def setup_database():
    Base.metadata.create_all(bind=engine)
