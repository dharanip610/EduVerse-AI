
from fastapi import APIRouter

from schemas.assignment_schema import AssignmentCreate
from services.assignment_service import *

router = APIRouter(
    prefix="/assignments",
    tags=["Assignments"]
)


@router.post("/")
def create(data: AssignmentCreate):

    return create_assignment(data.model_dump())


@router.get("/")
def all_assignments():

    return get_assignments()

