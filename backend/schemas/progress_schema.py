from pydantic import BaseModel


class ProgressRequest(BaseModel):
    student_id: str
    lesson_id: str
    chapter_id: str
    subject_id: str