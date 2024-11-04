from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import SessionLocal, User
from logging_config import logger  # Import logger

router = APIRouter()

class VolunteerCreate(BaseModel):
    username: str
    contact_info: str

@router.post("/register")
def register_volunteer(volunteer: VolunteerCreate):
    logger.info(f"Registering new volunteer: {volunteer.username}")
    db = SessionLocal()
    new_volunteer = User(
        username=volunteer.username,
        contact_info=volunteer.contact_info,
        role="volunteer"
    )
    db.add(new_volunteer)
    db.commit()
    db.refresh(new_volunteer)
    logger.info(f"Volunteer registered successfully with ID {new_volunteer.id}")
    return {"message": "Volunteer registered successfully", "volunteer_id": new_volunteer.id}

@router.get("/")
def get_all_volunteers():
    logger.info("Fetching all volunteers")
    db = SessionLocal()
    volunteers = db.query(User).filter(User.role == "volunteer").all()
    return volunteers

@router.put("/{volunteer_id}")
def update_volunteer_status(volunteer_id: int, available: bool):
    logger.info(f"Updating availability for volunteer ID {volunteer_id} to {'available' if available else 'not available'}")
    db = SessionLocal()
    volunteer = db.query(User).filter(User.id == volunteer_id).first()
    if not volunteer:
        logger.warning(f"Volunteer with ID {volunteer_id} not found")
        raise HTTPException(status_code=404, detail="Volunteer not found")
    volunteer.available = available
    db.commit()
    logger.info(f"Volunteer ID {volunteer_id} availability updated to {available}")
    return {"message": "Volunteer status updated successfully"}
