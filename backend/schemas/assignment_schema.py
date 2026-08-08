
from pydantic import BaseModel
from typing import Optional


class AssignmentCreate(BaseModel):
    lesson_id: str
    teacher_id: str
    title: str
    description: Optional[str] = None
    due_date: str

