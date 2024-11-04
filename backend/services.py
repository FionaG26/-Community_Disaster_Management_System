from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import logging
from .models import User, Incident
from .schemas import UserCreate, IncidentCreate
from fastapi import HTTPException

logger = logging.getLogger(__name__)

def create_user(db: Session, user: UserCreate):
    try:
        db_user = User(username=user.username, email=user.email, role=user.role, password_hash=user.password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to create user: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during user creation")

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_incident(db: Session, incident: IncidentCreate, user_id: int):
    try:
        db_incident = Incident(**incident.dict(), user_id=user_id)
        db.add(db_incident)
        db.commit()
        db.refresh(db_incident)
        return db_incident
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to create incident: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during incident creation")
