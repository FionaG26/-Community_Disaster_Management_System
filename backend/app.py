from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles  # Import StaticFiles to serve static files
from fastapi.responses import FileResponse  # Import FileResponse to serve files
from routes import auth_routes, incident_routes, volunteer_routes, contact_routes
from config import setup_database
from logging_config import logger  # Import the logger setup from logging_config
from pydantic import BaseModel

app = FastAPI()

# Database setup
setup_database()

# Middleware for request logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Request completed with status: {response.status_code}")
    return response

# Frontend log model
class LogEntry(BaseModel):
    level: str
    message: str
    extraData: dict
    timestamp: str

# Endpoint to receive logs from frontend
@app.post("/api/logs")
async def log_entry(log: LogEntry):
    try:
        if log.level == 'info':
            logger.info(log.message, extra=log.extraData)
        elif log.level == 'error':
            logger.error(log.message, extra=log.extraData)
        else:
            logger.warning(log.message, extra=log.extraData)
        return {"message": "Log received"}
    except Exception as e:
        logger.error(f"Failed to log entry: {e}")
        raise HTTPException(status_code=500, detail="Failed to log entry")

# Include API routes
app.include_router(auth_routes.router, prefix="/api/auth")
app.include_router(incident_routes.router, prefix="/api/incidents")
app.include_router(volunteer_routes.router, prefix="/api/volunteers")

app.mount(
    "/static",
    StaticFiles(directory=os.path.join("..", "frontend", "my-app", "build", "static")),
    name="static"
)
# Serve index.html for the root and any unmatched paths
@app.get("/", response_class=FileResponse)
async def serve_index():
    return "../frontend/public/index.html"  

@app.get("/{full_path:path}", response_class=FileResponse)
async def serve_index(full_path: str):
    return FileResponse("frontend/my-app/build/index.html")
