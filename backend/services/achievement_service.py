from database.supabase import supabase


def unlock_badge(student_id, badge_name, description="", icon="🏅"):

    existing = (
        supabase
        .table("achievements")
        .select("id")
        .eq("student_id", student_id)
        .eq("badge_name", badge_name)
        .execute()
    )

    if existing.data:
        return {
            "message": "Badge already unlocked"
        }

    result = (
        supabase
        .table("achievements")
        .insert({
            "student_id": student_id,
            "badge_name": badge_name,
            "badge_icon": icon,
            "description": description
        })
        .execute()
    )

    return result.data


def get_badges(student_id):

    return (
        supabase
        .table("achievements")
        .select("*")
        .eq("student_id", student_id)
        .order("unlocked_at", desc=True)
        .execute()
        .data
    )