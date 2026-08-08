
from database.supabase import supabase


def student_analytics(student_id):

    progress = (
        supabase
        .table("student_progress")
        .select("*")
        .eq("student_id", student_id)
        .execute()
    )

    achievements = (
        supabase
        .table("achievements")
        .select("*")
        .eq("student_id", student_id)
        .execute()
    )

    student = (
        supabase
        .table("students")
        .select("xp,level,streak,coins")
        .eq("id", student_id)
        .single()
        .execute()
        .data
    )

    return {
        "xp": student["xp"],
        "level": student["level"],
        "streak": student["streak"],
        "coins": student["coins"],
        "completed_lessons": len(progress.data),
        "badges": len(achievements.data)
    }

