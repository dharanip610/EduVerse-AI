from fastapi import APIRouter

from services.reward_service import *

router = APIRouter(
    prefix="/rewards",
    tags=["Rewards"]
)


@router.post("/coins/{student_id}/{coins}")
def earn(student_id: str, coins: int):

    return add_coins(student_id, coins)


@router.get("/")
def rewards():

    return get_rewards()