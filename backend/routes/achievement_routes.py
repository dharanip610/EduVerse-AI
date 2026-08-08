from fastapi import APIRouter

from services.achievement_service import (
    unlock_badge,
    get_badges
)

router = APIRouter(
    prefix="/achievements",
    tags=["Achievements"]
)


@router.post("/first-quiz/{student_id}")
def first_quiz(student_id: str):

    return unlock_badge(
        student_id,
        "First Quiz",
        "Completed your first quiz!",
        "🥇"
    )


@router.get("/{student_id}")
def badges(student_id: str):

    return get_badges(student_id)