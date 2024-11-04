from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models import SessionLocal, Incident

router = APIRouter()

# Pydantic schema for incident input validation
class IncidentCreate(BaseModel):
    location: str
    description: str
    severity: str

@router.post("/report")
def report_incident(incident: IncidentCreate):
    db = SessionLocal()
    new_incident = Incident(
        location=incident.location,
        description=incident.description,
        severity=incident.severity,
        status="reported"  # Default status when reported
    )
    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)
    return {"message": "Incident reported successfully", "incident_id": new_incident.id}

@router.get("/")
def get_all_incidents():
    db = SessionLocal()
    incidents = db.query(Incident).all()
    return incidents

@router.put("/{incident_id}")
def update_incident_status(incident_id: int, status: str):
    db = SessionLocal()
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident.status = status
    db.commit()
    return {"message": "Incident status updated successfully"}
