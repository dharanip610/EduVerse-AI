from pydantic import BaseModel
from typing import Optional


class LessonCreate(BaseModel):
    chapter_id: str
    title: str
    content: str
    ai_notes: Optional[str] = None
    duration: int
    xp_reward: int


class LessonUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    ai_notes: Optional[str] = None
    duration: Optional[int] = None
    xp_reward: Optional[int] = None
    