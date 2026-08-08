from fastapi import APIRouter

from schemas.chapter_schema import (
    ChapterCreate,
    ChapterUpdate
)

from services.chapter_service import *

router = APIRouter(
    prefix="/chapters",
    tags=["Chapters"]
)


@router.get("/")
def get_chapters():
    return get_all_chapters()


@router.get("/subject/{subject_id}")
def get_subject_chapters(subject_id: str):
    return get_chapters_by_subject(subject_id)


@router.get("/{chapter_id}")
def get_chapter_by_id(chapter_id: str):
    return get_chapter(chapter_id)


@router.post("/")
def create(chapter: ChapterCreate):
    return create_chapter(chapter.model_dump())


@router.put("/{chapter_id}")
def update(chapter_id: str, chapter: ChapterUpdate):
    return update_chapter(
        chapter_id,
        chapter.model_dump(exclude_none=True)
    )


@router.delete("/{chapter_id}")
def delete(chapter_id: str):
    return delete_chapter(chapter_id)