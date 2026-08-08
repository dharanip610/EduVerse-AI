from fastapi import APIRouter

from schemas.progress_schema import ProgressRequest

from services.progress_service import *

router = APIRouter(

    prefix="/progress",

    tags=["Student Progress"]

)


@router.post("/complete")
def complete(data: ProgressRequest):

    return complete_lesson(

        data.student_id,

        data.lesson_id,

        data.chapter_id,

        data.subject_id

    )


@router.get("/{student_id}")
def progress(student_id: str):

    return get_progress(student_id)
@router.get("/continue/{student_id}")
def continue_study(student_id: str):

    return continue_learning(student_id)