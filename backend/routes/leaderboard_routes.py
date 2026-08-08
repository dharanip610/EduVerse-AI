from fastapi import APIRouter

from services.leaderboard_service import get_leaderboard

router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"]
)


@router.get("/")
def leaderboard():

    return get_leaderboard()