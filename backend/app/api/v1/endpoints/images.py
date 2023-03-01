from typing import List

from fastapi import APIRouter

from app import schemas

router = APIRouter()


@router.get("/", response_model=List[schemas.Image])
def get_items():
    ...
