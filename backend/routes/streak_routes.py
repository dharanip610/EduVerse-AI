from fastapi import APIRouter

from services.streak_service import update_streak

router = APIRouter(

    prefix="/streak",

    tags=["Daily Streak"]

)


@router.post("/{student_id}")
def streak(student_id: str):

    return update_streak(student_id)