from database.supabase import supabase

def add_xp(student_id: str, earned_xp: int):
    student = (
        supabase
        .table("students")
        .select("*")
        .eq("id", student_id)
        .single()
        .execute()
        .data
    )

    total_xp = student["xp"] + earned_xp
    new_level = (total_xp // 100) + 1

    supabase.table("students").update({
        "xp": total_xp,
        "level": new_level
    }).eq("id", student_id).execute()

    return {
        "xp": total_xp,
        "level": new_level
    }
