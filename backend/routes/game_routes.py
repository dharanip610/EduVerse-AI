from fastapi import APIRouter

from services.xp_service import add_xp
from schemas.xp_schema import XPRequest

router = APIRouter(
    prefix="/game",
    tags=["Gamification"]
)

@router.post("/xp")
def update_xp(data: XPRequest):

    return add_xp(
        data.student_id,
        data.xp
    )