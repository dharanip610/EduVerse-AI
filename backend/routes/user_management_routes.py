
from fastapi import APIRouter

from services.user_management_service import *

router = APIRouter(
    prefix="/users",
    tags=["User Management"]
)


@router.get("/students")
def students():

    return get_all_students()


@router.get("/teachers")
def teachers():

    return get_all_teachers()


@router.put("/students/{student_id}/activate")
def activate(student_id: str):

    return activate_student(student_id)


@router.put("/students/{student_id}/deactivate")
def deactivate(student_id: str):

    return deactivate_student(student_id)

