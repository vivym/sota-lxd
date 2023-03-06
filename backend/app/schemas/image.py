from typing import Optional

from pydantic import BaseModel


# Shared properties
class ImageBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    fingerprint: Optional[str] = None


# Properties to receive on image creation
class ImageCreate(ImageBase):
    name: str
    description: Optional[str] = None


# Properties to receive on image update
class ImageUpdate(ImageBase):
    ...


# Properties shared by models stored in DB
class ImageInDBBase(ImageBase):
    id: int
    name: str
    owner_id: int
    is_public: bool

    class Config:
        orm_mode = True


# Properties to return to client
class Image(ImageInDBBase):
    ...


# Properties stored in DB
class ImageInDB(ImageInDBBase):
    ...
