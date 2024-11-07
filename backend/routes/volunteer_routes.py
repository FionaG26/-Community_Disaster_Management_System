# backend/routes/volunteer_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import SessionLocal, User
from logging_config import logger  # Import logger

router = APIRouter()

# Define the Pydantic model for volunteer registration
class VolunteerCreate(BaseModel):
    username: str  # full name
    contact_info: str  # email address

@router.post("/register")
def register_volunteer(volunteer: VolunteerCreate):
    logger.info(f"Registering new volunteer: {volunteer.username}")
    db = SessionLocal()
    
    # Check if the volunteer already exists (optional)
    existing_volunteer = db.query(User).filter(User.username == volunteer.username).first()
    if existing_volunteer:
        logger.warning(f"Volunteer with username {volunteer.username} already exists.")
        raise HTTPException(status_code=400, detail="Volunteer already exists")

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
