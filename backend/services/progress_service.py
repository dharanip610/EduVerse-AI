from database.supabase import supabase


def complete_lesson(student_id, lesson_id, chapter_id, subject_id):

    progress = (
        supabase
        .table("student_progress")
        .insert({

            "student_id": student_id,

            "lesson_id": lesson_id,

            "chapter_id": chapter_id,

            "subject_id": subject_id,

            "completed": True,

            "completion_percentage": 100

        })
        .execute()
    )

    return progress.data


def get_progress(student_id):

    return (

        supabase

        .table("student_progress")

        .select("*")

        .eq("student_id", student_id)

        .execute()

        .data

    )
def continue_learning(student_id):

    result = (
        supabase
        .table("student_progress")
        .select("*")
        .eq("student_id", student_id)
        .order("last_accessed", desc=True)
        .limit(1)
        .execute()
    )

    if len(result.data) == 0:
        return {
            "message": "No progress found"
        }

    return result.data[0]