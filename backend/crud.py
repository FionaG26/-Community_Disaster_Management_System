from sqlalchemy.orm import Session
from .models import User, Incident
from .schemas import UserCreate, IncidentCreate

def create_user(db: Session, user: UserCreate):
    db_user = User(username=user.username, email=user.email, role=user.role, password_hash=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def create_incident(db: Session, incident: IncidentCreate, user_id: int):
    db_incident = Incident(**incident.dict(), user_id=user_id)
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident
