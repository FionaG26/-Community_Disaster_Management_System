from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_report_incident():
    response = client.post("/api/incidents/report", json={
        "location": "Downtown",
        "description": "Flood",
        "severity": "high"
    })
    assert response.status_code == 200
    assert "incident_id" in response.json()
