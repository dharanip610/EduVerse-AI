from database.supabase import supabase


def get_all_students():
    return supabase.table("students").select("*").execute().data


def get_student(student_id: str):
    return (
        supabase
        .table("students")
        .select("*")
        .eq("id", student_id)
        .single()
        .execute()
        .data
    )


def create_student(student: dict):
    return (
        supabase
        .table("students")
        .insert(student)
        .execute()
        .data
    )


def update_student(student_id: str, student: dict):
    return (
        supabase
        .table("students")
        .update(student)
        .eq("id", student_id)
        .execute()
        .data
    )


def delete_student(student_id: str):
    return (
        supabase
        .table("students")
        .delete()
        .eq("id", student_id)
        .execute()
        .data
    )