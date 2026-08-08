
from database.supabase import supabase


def get_all_students():
    return (
        supabase
        .table("students")
        .select("*")
        .execute()
        .data
    )


def get_all_teachers():
    return (
        supabase
        .table("teachers")
        .select("*")
        .execute()
        .data
    )


def deactivate_student(student_id):

    return (
        supabase
        .table("students")
        .update({
            "status": "inactive"
        })
        .eq("id", student_id)
        .execute()
        .data
    )


def activate_student(student_id):

    return (
        supabase
        .table("students")
        .update({
            "status": "active"
        })
        .eq("id", student_id)
        .execute()
        .data
    )

