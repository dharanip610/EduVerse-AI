from pydantic import BaseModel
from typing import Optional


class SubjectCreate(BaseModel):
    name: str
    description: str
    icon: Optional[str] = None
    image: Optional[str] = None
    status: bool = True


class SubjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    image: Optional[str] = None
    status: Optional[bool] = None