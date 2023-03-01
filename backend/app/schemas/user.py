from typing import Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: bool = False
    is_superuser: bool = False


# Properties to receive on user creation
class UserCreate(UserBase):
    username: str
    email: EmailStr
    password: str


# Properties to receive on user update
class UserUpdate(UserBase):
    password: Optional[str] = None


# Properties shared by models stored in DB
class UserInDBBase(UserBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class User(UserInDBBase):
    ...


# Properties properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str
