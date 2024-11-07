# backend/routes/volunteer_routes.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import SessionLocal, User
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from logging_config import logger  # Import logger

router = APIRouter()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key and algorithm for JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Utility function to verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Function to create JWT token
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Define the Pydantic model for volunteer registration
class VolunteerCreate(BaseModel):
    username: str  # full name
    contact_info: str  # email address

# Define the Pydantic model for volunteer sign-in
class SignInRequest(BaseModel):
    username: str
    password: str

# Route to register a new volunteer
@router.post("/register")
def register_volunteer(volunteer: VolunteerCreate):
    logger.info(f"Registering new volunteer: {volunteer.username}")
    db = SessionLocal()
    
    # Check if the volunteer already exists (optional)
    existing_volunteer = db.query(User).filter(User.username == volunteer.username).first()
    if existing_volunteer:
        logger.warning(f"Volunteer with username {volunteer.username} already exists.")
        raise HTTPException(status_code=400, detail="Volunteer already exists")

    # Create a new volunteer and store it in the database
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

# Route to sign in a volunteer and return a JWT token
@router.post("/signin")
def sign_in(volunteer: SignInRequest):
    logger.info(f"Signing in volunteer: {volunteer.username}")
    db = SessionLocal()
    
    # Check if the volunteer exists in the database
    user = db.query(User).filter(User.username == volunteer.username).first()
    
    # If the user does not exist or password doesn't match, raise an error
    if not user or not verify_password(volunteer.password, user.password):
        logger.warning(f"Failed sign-in attempt for volunteer: {volunteer.username}")
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Generate a JWT token if the credentials are valid
    access_token = create_access_token(
        {"sub": user.username}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    logger.info(f"Volunteer {volunteer.username} signed in successfully")
    return {"access_token": access_token, "token_type": "bearer"}
