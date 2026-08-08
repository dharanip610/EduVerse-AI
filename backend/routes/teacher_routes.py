
from fastapi import APIRouter

from schemas.teacher_schema import TeacherCreate
from services.teacher_service import *

router = APIRouter(
    prefix="/teachers",
    tags=["Teachers"]
)


@router.post("/")
def create(data: TeacherCreate):

    return create_teacher(data.model_dump())


@router.get("/")
def all_teachers():

    return get_teachers()


@router.get("/{teacher_id}")
def one_teacher(teacher_id: str):

    return get_teacher(teacher_id)

