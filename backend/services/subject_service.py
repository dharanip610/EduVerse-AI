from database.supabase import supabase


def get_all_subjects():
    return (
        supabase
        .table("subjects")
        .select("*")
        .order("name")
        .execute()
        .data
    )


def get_subject(subject_id: str):
    return (
        supabase
        .table("subjects")
        .select("*")
        .eq("id", subject_id)
        .single()
        .execute()
        .data
    )


def create_subject(subject: dict):
    return (
        supabase
        .table("subjects")
        .insert(subject)
        .execute()
        .data
    )


def update_subject(subject_id: str, subject: dict):
    return (
        supabase
        .table("subjects")
        .update(subject)
        .eq("id", subject_id)
        .execute()
        .data
    )


def delete_subject(subject_id: str):
    return (
        supabase
        .table("subjects")
        .delete()
        .eq("id", subject_id)
        .execute()
        .data
    )