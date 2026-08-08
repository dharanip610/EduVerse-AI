
from database.supabase import supabase


def teacher_dashboard():

    students = (
        supabase.table("students")
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

    teachers = (
        supabase.table("teachers")
        .select("id", count="exact")
        .execute()
    )

    return {
        "total_students": students.count,
        "total_teachers": teachers.count,
        "total_lessons": lessons.count,
        "total_quizzes": quizzes.count
    }

