from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_signup():
    response = client.post("/api/auth/signup", json={"username": "testuser", "password": "testpass", "role": "user"})
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"
