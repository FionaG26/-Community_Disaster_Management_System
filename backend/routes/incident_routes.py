from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from models import SessionLocal, Incident
from logging_config import logger  # Import logger
from typing import List

router = APIRouter()

# Pydantic model for creating an incident
class IncidentCreate(BaseModel):
    location: str
    description: str
    severity: str

@router.post("/report", status_code=status.HTTP_201_CREATED)
def report_incident(incident: IncidentCreate):
    """
    Report a new incident to the system.
    """
    logger.info(f"Reporting new incident at {incident.location}")
    try:
        db: Session = SessionLocal()
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
    except Exception as e:
        logger.error(f"Error reporting incident: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        db.close()

@router.get("/", response_model=List[Incident])
def get_all_incidents():
    """
    Fetch all incidents from the system.
    """
    logger.info("Fetching all incidents")
    try:
        db: Session = SessionLocal()
        incidents = db.query(Incident).all()
        logger.info(f"Found {len(incidents)} incidents.")
        return incidents
    except Exception as e:
        logger.error(f"Error fetching incidents: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        db.close()

@router.put("/{incident_id}", status_code=status.HTTP_200_OK)
def update_incident_status(incident_id: int, status: str):
    """
    Update the status of an existing incident.
    """
    logger.info(f"Updating status for incident ID {incident_id} to {status}")
    try:
        db: Session = SessionLocal()
        incident = db.query(Incident).filter(Incident.id == incident_id).first()

        if not incident:
            logger.warning(f"Incident with ID {incident_id} not found")
            raise HTTPException(status_code=404, detail="Incident not found")
        
        # Update the incident status
        incident.status = status
        db.commit()
        db.refresh(incident)
        logger.info(f"Incident ID {incident_id} status updated to {status}")
        return {"message": "Incident status updated successfully"}
    except Exception as e:
        logger.error(f"Error updating incident status: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        db.close()
