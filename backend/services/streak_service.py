from datetime import datetime, timedelta

from database.supabase import supabase


def update_streak(student_id):

    student = (
        supabase
        .table("students")
        .select("streak,updated_at")
        .eq("id", student_id)
        .single()
        .execute()
        .data
    )

    streak = student["streak"] or 0

    last = datetime.fromisoformat(
        student["updated_at"].replace("Z", "+00:00")
    )

    today = datetime.utcnow()

    diff = (today.date() - last.date()).days

    if diff == 1:

        streak += 1

    elif diff > 1:

        streak = 1

    (
        supabase
        .table("students")
        .update({
            "streak": streak,
            "updated_at": today.isoformat()
        })
        .eq("id", student_id)
        .execute()
    )

    return {
        "streak": streak
    }