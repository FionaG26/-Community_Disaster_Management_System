from pydantic import BaseModel
from typing import List, Optional

# User Schemas
class UserBase(BaseModel):
    username: str
    role: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True

# Incident Schemas
class IncidentBase(BaseModel):
    location: str
    description: str
    severity: str
    status: str

class IncidentCreate(IncidentBase):
    pass

class IncidentInDB(IncidentBase):
    id: int

    class Config:
        orm_mode = True

# Resource Schemas
class ResourceBase(BaseModel):
    name: str
    quantity: int
    location: str

class ResourceCreate(ResourceBase):
    pass

class ResourceInDB(ResourceBase):
    id: int
    updated_at: datetime

    class Config:
        orm_mode = True

# Notification Schemas
class NotificationBase(BaseModel):
    message: str
    user_id: int
    incident_id: int

class NotificationCreate(NotificationBase):
    pass

class NotificationInDB(NotificationBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True

# Volunteer Schemas
class VolunteerBase(BaseModel):
    name: str
    phone: str
    email: str
    role: str

class VolunteerCreate(VolunteerBase):
    pass

class VolunteerInDB(VolunteerBase):
    id: int

    class Config:
        orm_mode = True
