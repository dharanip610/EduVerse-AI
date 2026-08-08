from database.supabase import supabase


def get_all_lessons():
    return (
        supabase
        .table("lessons")
        .select("*")
        .order("title")
        .execute()
        .data
    )


def get_lessons_by_chapter(chapter_id: str):
    return (
        supabase
        .table("lessons")
        .select("*")
        .eq("chapter_id", chapter_id)
        .execute()
        .data
    )


def get_lesson(lesson_id: str):
    return (
        supabase
        .table("lessons")
        .select("*")
        .eq("id", lesson_id)
        .single()
        .execute()
        .data
    )


def create_lesson(lesson: dict):
    return (
        supabase
        .table("lessons")
        .insert(lesson)
        .execute()
        .data
    )


def update_lesson(lesson_id: str, lesson: dict):
    return (
        supabase
        .table("lessons")
        .update(lesson)
        .eq("id", lesson_id)
        .execute()
        .data
    )


def delete_lesson(lesson_id: str):
    return (
        supabase
        .table("lessons")
        .delete()
        .eq("id", lesson_id)
        .execute()
        .data
    )