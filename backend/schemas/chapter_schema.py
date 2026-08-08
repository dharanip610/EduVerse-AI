from pydantic import BaseModel
from typing import Optional


class ChapterCreate(BaseModel):
    subject_id: str
    title: str
    description: str
    chapter_order: int


class ChapterUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    chapter_order: Optional[int] = None
    