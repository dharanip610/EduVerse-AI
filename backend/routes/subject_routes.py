from fastapi import APIRouter

from schemas.subject_schema import (
    SubjectCreate,
    SubjectUpdate
)

from services.subject_service import *

router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


@router.get("/")
def get_subjects():
    return get_all_subjects()


@router.get("/{subject_id}")
def get_subject_by_id(subject_id: str):
    return get_subject(subject_id)


@router.post("/")
def create(subject: SubjectCreate):
    return create_subject(subject.model_dump())


@router.put("/{subject_id}")
def update(subject_id: str, subject: SubjectUpdate):
    return update_subject(
        subject_id,
        subject.model_dump(exclude_none=True)
    )


@router.delete("/{subject_id}")
def delete(subject_id: str):
    return delete_subject(subject_id)