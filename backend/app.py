from fastapi import FastAPI
from routes import auth_routes, incident_routes, volunteer_routes
from config import setup_database

app = FastAPI()

# Database setup
setup_database()

# Include API routes
app.include_router(auth_routes.router, prefix="/api/auth")
app.include_router(incident_routes.router, prefix="/api/incidents")
app.include_router(volunteer_routes.router, prefix="/api/volunteers")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Community Disaster Management System"}
