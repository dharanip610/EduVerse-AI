
from fastapi import APIRouter

from services.analytics_service import student_analytics

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/{student_id}")
def analytics(student_id: str):

    return student_analytics(student_id)

