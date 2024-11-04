from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import SessionLocal, Incident
from logging_config import logger  # Import logger

router = APIRouter()

class IncidentCreate(BaseModel):
    location: str
    description: str
    severity: str

@router.post("/report")
def report_incident(incident: IncidentCreate):
    logger.info(f"Reporting new incident at {incident.location}")
    db = SessionLocal()
    new_incident = Incident(
        location=incident.location,
        description=incident.description,
        severity=incident.severity,
        status="reported"
    )
    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)
    logger.info(f"Incident reported successfully with ID {new_incident.id}")
    return {"message": "Incident reported successfully", "incident_id": new_incident.id}

@router.get("/")
def get_all_incidents():
    logger.info("Fetching all incidents")
    db = SessionLocal()
    incidents = db.query(Incident).all()
    return incidents

@router.put("/{incident_id}")
def update_incident_status(incident_id: int, status: str):
    logger.info(f"Updating status for incident ID {incident_id} to {status}")
    db = SessionLocal()
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        logger.warning(f"Incident with ID {incident_id} not found")
        raise HTTPException(status_code=404, detail="Incident not found")
    incident.status = status
    db.commit()
    logger.info(f"Incident ID {incident_id} status updated to {status}")
    return {"message": "Incident status updated successfully"}
