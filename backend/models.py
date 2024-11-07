from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP, Boolean, create_engine
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime
from backend.database import Base

# User Model
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
    contact_info = Column(String)

    # Define relationship to Incident (one user can have many incidents)
    incidents = relationship("Incident", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user")
    volunteer = relationship("Volunteer", back_populates="user", uselist=False)  # One-to-one relationship with Volunteer

# Incident Model
class Incident(Base):
    __tablename__ = 'incidents'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    location = Column(String)
    description = Column(Text)
    severity = Column(String)
    status = Column(String)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    # Define relationship with User (many incidents belong to one user)
    user = relationship("User", back_populates="incidents")
    notifications = relationship("Notification", back_populates="incident")

# Resource Model
class Resource(Base):
    __tablename__ = 'resources'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    quantity = Column(Integer)
    location = Column(String)

# Volunteer Model
class Volunteer(Base):
    __tablename__ = 'volunteers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    availability = Column(Boolean)

    # Relationship to User (a volunteer is a user)
    user = relationship("User", back_populates="volunteer")

# Notification Model
class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    incident_id = Column(Integer, ForeignKey('incidents.id'))
    message = Column(String)

    # Relationships to User and Incident
    user = relationship("User", back_populates="notifications")
    incident = relationship("Incident", back_populates="notifications")


# Database setup
DATABASE_URL = "sqlite:///./cdms.db"  # SQLite database (can be changed to PostgreSQL or others)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # Only needed for SQLite

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def setup_database():
    """Create all tables in the database (if not already present)."""
    Base.metadata.create_all(bind=engine)
