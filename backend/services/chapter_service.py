from database.supabase import supabase


def get_all_chapters():
    return (
        supabase
        .table("chapters")
        .select("*")
        .order("chapter_order")
        .execute()
        .data
    )


def get_chapters_by_subject(subject_id: str):
    return (
        supabase
        .table("chapters")
        .select("*")
        .eq("subject_id", subject_id)
        .order("chapter_order")
        .execute()
        .data
    )


def get_chapter(chapter_id: str):
    return (
        supabase
        .table("chapters")
        .select("*")
        .eq("id", chapter_id)
        .single()
        .execute()
        .data
    )


def create_chapter(chapter: dict):
    return (
        supabase
        .table("chapters")
        .insert(chapter)
        .execute()
        .data
    )


def update_chapter(chapter_id: str, chapter: dict):
    return (
        supabase
        .table("chapters")
        .update(chapter)
        .eq("id", chapter_id)
        .execute()
        .data
    )


def delete_chapter(chapter_id: str):
    return (
        supabase
        .table("chapters")
        .delete()
        .eq("id", chapter_id)
        .execute()
        .data
    )