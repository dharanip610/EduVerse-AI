
from pydantic import BaseModel


class NotificationCreate(BaseModel):

    student_id: str
    title: str
    message: str

