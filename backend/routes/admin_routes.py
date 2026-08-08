
from fastapi import APIRouter

from services.admin_service import admin_dashboard

router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"]
)


@router.get("/dashboard")
def dashboard():

    return admin_dashboard()

