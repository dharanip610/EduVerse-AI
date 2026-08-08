from fastapi import APIRouter
from schemas.student_schema import StudentCreate, StudentUpdate
from services.student_service import *

router = APIRouter(prefix="/students", tags=["Students"])


@router.get("/")
def get_students():
    return get_all_students()


@router.get("/{student_id}")
def get_student_by_id(student_id: str):
    return get_student(student_id)


@router.post("/")
def create(student: StudentCreate):
    return create_student(student.model_dump())


@router.put("/{student_id}")
def update(student_id: str, student: StudentUpdate):
    return update_student(
        student_id,
        student.model_dump(exclude_none=True)
    )


@router.delete("/{student_id}")
def delete(student_id: str):
    return delete_student(student_id)