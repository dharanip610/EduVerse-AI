from fastapi import APIRouter
from schemas.quiz_submit_schema import QuizSubmitRequest
from services.quiz_service import submit_quiz

from schemas.quiz_schema import (
    QuizCreate,
    QuizUpdate,
)

from services.quiz_service import *

router = APIRouter(
    prefix="/quizzes",
    tags=["Quiz"]
)


@router.get("/{lesson_id}")
def get_quiz(lesson_id: str):
    return get_quiz_by_lesson(lesson_id)


@router.post("/")
def create(quiz: QuizCreate):
    return create_quiz(quiz.model_dump())


@router.put("/{quiz_id}")
def update(quiz_id: str, quiz: QuizUpdate):
    return update_quiz(
        quiz_id,
        quiz.model_dump(exclude_none=True)
    )


@router.delete("/{quiz_id}")
def delete(quiz_id: str):
    return delete_quiz(quiz_id)
@router.post("/submit")
def submit(data: QuizSubmitRequest):

    return submit_quiz(
        data.student_id,
        data.lesson_id,
        [answer.model_dump() for answer in data.answers]
    )