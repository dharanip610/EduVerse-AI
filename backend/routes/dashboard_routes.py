
from fastapi import APIRouter

from services.dashboard_service import teacher_dashboard

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/teacher")
def dashboard():

    return teacher_dashboard()

