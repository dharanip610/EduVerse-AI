from pydantic import BaseModel
from typing import List


class Answer(BaseModel):
    question_id: str
    selected_answer: str


class QuizSubmitRequest(BaseModel):
    student_id: str
    lesson_id: str
    answers: List[Answer]