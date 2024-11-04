from fastapi import APIRouter, HTTPException
from models import SessionLocal, User

router = APIRouter()

@router.post("/signup")
def signup(username: str, password: str, role: str):
    db = SessionLocal()
    user = User(username=username, password=password, role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "username": user.username, "role": user.role}

@router.post("/login")
def login(username: str, password: str):
    db = SessionLocal()
    user = db.query(User).filter_by(username=username, password=password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": f"Welcome back, {user.username}!"}
