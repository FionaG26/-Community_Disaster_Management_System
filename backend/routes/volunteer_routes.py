from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import SessionLocal, User

router = APIRouter()

# Pydantic schema for volunteer input validation
class VolunteerCreate(BaseModel):
    username: str
    contact_info: str

@router.post("/register")
def register_volunteer(volunteer: VolunteerCreate):
    db = SessionLocal()
    new_volunteer = User(
        username=volunteer.username,
        contact_info=volunteer.contact_info,
        role="volunteer"  # Automatically set role as "volunteer"
    )
    db.add(new_volunteer)
    db.commit()
    db.refresh(new_volunteer)
    return {"message": "Volunteer registered successfully", "volunteer_id": new_volunteer.id}

@router.get("/")
def get_all_volunteers():
    db = SessionLocal()
    volunteers = db.query(User).filter(User.role == "volunteer").all()
    return volunteers

@router.put("/{volunteer_id}")
def update_volunteer_status(volunteer_id: int, available: bool):
    db = SessionLocal()
    volunteer = db.query(User).filter(User.id == volunteer_id).first()
    if not volunteer:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    volunteer.available = available
    db.commit()
    return {"message": "Volunteer status updated successfully"}
