from fastapi import APIRouter

from schemas.lesson_schema import (
    LessonCreate,
    LessonUpdate
)

from services.lesson_service import *

router = APIRouter(
    prefix="/lessons",
    tags=["Lessons"]
)


@router.get("/")
def get_lessons():
    return get_all_lessons()


@router.get("/chapter/{chapter_id}")
def get_chapter_lessons(chapter_id: str):
    return get_lessons_by_chapter(chapter_id)


@router.get("/{lesson_id}")
def get_lesson_by_id(lesson_id: str):
    return get_lesson(lesson_id)


@router.post("/")
def create(lesson: LessonCreate):
    return create_lesson(lesson.model_dump())


@router.put("/{lesson_id}")
def update(lesson_id: str, lesson: LessonUpdate):
    return update_lesson(
        lesson_id,
        lesson.model_dump(exclude_none=True)
    )


@router.delete("/{lesson_id}")
def delete(lesson_id: str):
    return delete_lesson(lesson_id)