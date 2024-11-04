from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str
    role: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class IncidentBase(BaseModel):
    description: str
    location: str

class IncidentCreate(IncidentBase):
    pass

class IncidentInDB(IncidentBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
