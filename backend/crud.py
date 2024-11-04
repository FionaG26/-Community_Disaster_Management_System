from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models import User
from schemas import UserCreate
from logging_config import logger
from fastapi import HTTPException

def create_user(db: Session, user: UserCreate):
    try:
        db_user = User(username=user.username, password=hash_password(user.password), role=user.role)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        logger.info(f"User created successfully: {db_user.id}")
        return db_user
    except SQLAlchemyError as e:
        db.rollback()
        logger.error(f"Failed to create user: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during user creation")

def hash_password(password: str) -> str:
    return password

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_incident(db: Session, incident: IncidentCreate, user_id: int):
    db_incident = Incident(**incident.dict(), user_id=user_id)
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident
