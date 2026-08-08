
from database.supabase import supabase


def admin_dashboard():

    students = (
        supabase.table("students")
        .select("id", count="exact")
        .execute()
    )

    teachers = (
        supabase.table("teachers")
        .select("id", count="exact")
        .execute()
    )

    subjects = (
        supabase.table("subjects")
        .select("id", count="exact")
        .execute()
    )

    lessons = (
        supabase.table("lessons")
        .select("id", count="exact")
        .execute()
    )

    quizzes = (
        supabase.table("quizzes")
        .select("id", count="exact")
        .execute()
    )

    return {
        "students": students.count or 0,
        "teachers": teachers.count or 0,
        "subjects": subjects.count or 0,
        "lessons": lessons.count or 0,
        "quizzes": quizzes.count or 0
    }

