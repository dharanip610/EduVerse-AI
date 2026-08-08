from pydantic import BaseModel
from typing import Optional


class StudentCreate(BaseModel):
    full_name: str
    email: str
    phone: Optional[str] = None
    student_class: str
    school: str
    avatar: Optional[str] = None


class StudentUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    student_class: Optional[str] = None
    school: Optional[str] = None
    avatar: Optional[str] = None