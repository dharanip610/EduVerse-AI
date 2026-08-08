from pydantic import BaseModel
from typing import Optional


class QuizCreate(BaseModel):
    lesson_id: str
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str
    xp_reward: int


class QuizUpdate(BaseModel):
    question: Optional[str] = None
    option_a: Optional[str] = None
    option_b: Optional[str] = None
    option_c: Optional[str] = None
    option_d: Optional[str] = None
    correct_answer: Optional[str] = None
    xp_reward: Optional[int] = None


class QuizSubmit(BaseModel):
    student_id: str
    lesson_id: str
    answers: dict