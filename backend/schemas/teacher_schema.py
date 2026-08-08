
from pydantic import BaseModel


class TeacherCreate(BaseModel):

    full_name: str
    email: str
    phone: str | None = None
    subject_id: str
    school: str | None = None
