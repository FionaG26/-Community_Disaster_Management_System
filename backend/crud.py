from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from .models import User, Incident, Resource, Notification, Volunteer
from .schemas import UserCreate, IncidentCreate, ResourceCreate, NotificationCreate, VolunteerCreate
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

# **User CRUD Operations**
def create_user(db: Session, user: UserCreate):
    try:
        db_user = User(username=user.username, password=user.password, role=user.role)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail="Error creating user")

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_users(db: Session):
    return db.query(User).all()

# **Incident CRUD Operations**
def create_incident(db: Session, incident: IncidentCreate):
    try:
        db_incident = Incident(**incident.dict())
        db.add(db_incident)
        db.commit()
        db.refresh(db_incident)
        return db_incident
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Error creating incident: {e}")
        raise HTTPException(status_code=500, detail="Error creating incident")

def get_incidents(db: Session):
    return db.query(Incident).all()

def get_incident(db: Session, incident_id: int):
    return db.query(Incident).filter(Incident.id == incident_id).first()

# **Resource CRUD Operations**
def create_resource(db: Session, resource: ResourceCreate):
    try:
        db_resource = Resource(**resource.dict())
        db.add(db_resource)
        db.commit()
        db.refresh(db_resource)
        return db_resource
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Error creating resource: {e}")
        raise HTTPException(status_code=500, detail="Error creating resource")

def get_resources(db: Session):
    return db.query(Resource).all()

# **Notification CRUD Operations**
def create_notification(db: Session, notification: NotificationCreate):
    try:
        db_notification = Notification(**notification.dict())
        db.add(db_notification)
        db.commit()
        db.refresh(db_notification)
        return db_notification
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Error creating notification: {e}")
        raise HTTPException(status_code=500, detail="Error creating notification")

def get_notifications(db: Session):
    return db.query(Notification).all()

# **Volunteer CRUD Operations**
def create_volunteer(db: Session, volunteer: VolunteerCreate):
    try:
        db_volunteer = Volunteer(**volunteer.dict())
        db.add(db_volunteer)
        db.commit()
        db.refresh(db_volunteer)
        return db_volunteer
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Error creating volunteer: {e}")
        raise HTTPException(status_code=500, detail="Error creating volunteer")

def get_volunteers(db: Session):
    return db.query(Volunteer).all()

def get_volunteer(db: Session, volunteer_id: int):
    return db.query(Volunteer).filter(Volunteer.id == volunteer_id).first()
