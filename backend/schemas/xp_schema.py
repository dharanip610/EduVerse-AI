from pydantic import BaseModel

class XPRequest(BaseModel):
    student_id: str
    xp: int