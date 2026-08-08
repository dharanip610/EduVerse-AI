
from database.supabase import supabase


def create_notification(data):

    return (
        supabase
        .table("notifications")
        .insert(data)
        .execute()
        .data
    )


def get_notifications(student_id):

    return (
        supabase
        .table("notifications")
        .select("*")
        .eq("student_id", student_id)
        .order("created_at", desc=True)
        .execute()
        .data
    )


def mark_as_read(notification_id):

    return (
        supabase
        .table("notifications")
        .update({
            "is_read": True
        })
        .eq("id", notification_id)
        .execute()
        .data
    )

