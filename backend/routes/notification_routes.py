
from fastapi import APIRouter

from schemas.notification_schema import NotificationCreate
from services.notification_service import *

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.post("/")
def create(data: NotificationCreate):

    return create_notification(data.model_dump())


@router.get("/{student_id}")
def all_notifications(student_id: str):

    return get_notifications(student_id)


@router.put("/{notification_id}")
def read(notification_id: str):

    return mark_as_read(notification_id)

