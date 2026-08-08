
async def get_admin_profile():
    """Return single admin profile record."""
    return await supabase.from_("admin_profile").select("*").single()


async def update_admin_profile(profile):
    """Update an admin profile by id. `profile` must contain `id`."""
    return await supabase.from_("admin_profile").update(profile).eq("id", profile["id"])


async def get_admin_settings():
    return await supabase.from_("admin_settings").select("*").single()


async def update_admin_settings(settings):
    return await supabase.from_("admin_settings").update(settings).eq("id", settings["id"])


# ==========================================
# STUDENT PROGRESS
# ==========================================

async def get_student_progress():
    return await supabase.from_("student_progress").select("*").order("updated_at", {"ascending": False})


async def update_student_progress(id, progress):
    return await supabase.from_("student_progress").update(progress).eq("id", id)


async def delete_student_progress(id):
    return await supabase.from_("student_progress").delete().eq("id", id)

from fastapi import APIRouter, HTTPException

from backend.database import supabase

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


# ==========================================
# DASHBOARD ANALYTICS
# ==========================================

@router.get("/analytics")
async def dashboard_analytics():

    try:

        students = (
            supabase.table("students")
            .select("*", count="exact")
            .execute()
        )

        subjects = (
            supabase.table("subjects")
            .select("*", count="exact")
            .execute()
        )

        chapters = (
            supabase.table("chapters")
            .select("*", count="exact")
            .execute()
        )

        lessons = (
            supabase.table("lessons")
            .select("*", count="exact")
            .execute()
        )

        quizzes = (
            supabase.table("quizzes")
            .select("*", count="exact")
            .execute()
        )

        games = (
            supabase.table("games")
            .select("*", count="exact")
            .execute()
        )

        return {

            "totalStudents": students.count,

            "totalSubjects": subjects.count,

            "totalChapters": chapters.count,

            "totalLessons": lessons.count,

            "totalQuizzes": quizzes.count,

            "totalGames": games.count,

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    # ==========================================
# STUDENTS CRUD
# ==========================================

@router.get("/students")
async def get_students():

    try:

        response = (
            supabase.table("students")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/students")
async def create_student(student: dict):

    try:

        response = (
            supabase.table("students")
            .insert(student)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/students/{student_id}")
async def update_student(
    student_id: str,
    student: dict,
):

    try:

        response = (
            supabase.table("students")
            .update(student)
            .eq("id", student_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/students/{student_id}")
async def delete_student(student_id: str):

    try:

        response = (
            supabase.table("students")
            .delete()
            .eq("id", student_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# SUBJECTS CRUD
# ==========================================

@router.get("/subjects")
async def get_subjects():

    try:

        response = (
            supabase.table("subjects")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/subjects")
async def create_subject(subject: dict):

    try:

        response = (
            supabase.table("subjects")
            .insert(subject)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/subjects/{subject_id}")
async def update_subject(
    subject_id: str,
    subject: dict,
):

    try:

        response = (
            supabase.table("subjects")
            .update(subject)
            .eq("id", subject_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/subjects/{subject_id}")
async def delete_subject(subject_id: str):

    try:

        response = (
            supabase.table("subjects")
            .delete()
            .eq("id", subject_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    # ==========================================
# CHAPTERS CRUD
# ==========================================

@router.get("/chapters")
async def get_chapters():

    try:

        response = (
            supabase.table("chapters")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/chapters")
async def create_chapter(chapter: dict):

    try:

        response = (
            supabase.table("chapters")
            .insert(chapter)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/chapters/{chapter_id}")
async def update_chapter(
    chapter_id: str,
    chapter: dict,
):

    try:

        response = (
            supabase.table("chapters")
            .update(chapter)
            .eq("id", chapter_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/chapters/{chapter_id}")
async def delete_chapter(chapter_id: str):

    try:

        response = (
            supabase.table("chapters")
            .delete()
            .eq("id", chapter_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# LESSONS CRUD
# ==========================================

@router.get("/lessons")
async def get_lessons():

    try:

        response = (
            supabase.table("lessons")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/lessons")
async def create_lesson(lesson: dict):

    try:

        response = (
            supabase.table("lessons")
            .insert(lesson)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/lessons/{lesson_id}")
async def update_lesson(
    lesson_id: str,
    lesson: dict,
):

    try:

        response = (
            supabase.table("lessons")
            .update(lesson)
            .eq("id", lesson_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/lessons/{lesson_id}")
async def delete_lesson(lesson_id: str):

    try:

        response = (
            supabase.table("lessons")
            .delete()
            .eq("id", lesson_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    # ==========================================
# QUIZZES CRUD
# ==========================================

@router.get("/quizzes")
async def get_quizzes():

    try:

        response = (
            supabase.table("quizzes")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/quizzes")
async def create_quiz(quiz: dict):

    try:

        response = (
            supabase.table("quizzes")
            .insert(quiz)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/quizzes/{quiz_id}")
async def update_quiz(
    quiz_id: str,
    quiz: dict,
):

    try:

        response = (
            supabase.table("quizzes")
            .update(quiz)
            .eq("id", quiz_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/quizzes/{quiz_id}")
async def delete_quiz(quiz_id: str):

    try:

        response = (
            supabase.table("quizzes")
            .delete()
            .eq("id", quiz_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# GAMES CRUD
# ==========================================

@router.get("/games")
async def get_games():

    try:

        response = (
            supabase.table("games")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/games")
async def create_game(game: dict):

    try:

        response = (
            supabase.table("games")
            .insert(game)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/games/{game_id}")
async def update_game(
    game_id: str,
    game: dict,
):

    try:

        response = (
            supabase.table("games")
            .update(game)
            .eq("id", game_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/games/{game_id}")
async def delete_game(game_id: str):

    try:

        response = (
            supabase.table("games")
            .delete()
            .eq("id", game_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    # ==========================================
# AI TUTOR CRUD
# ==========================================

@router.get("/ai-tutors")
async def get_ai_tutors():

    try:

        response = (
            supabase.table("ai_tutors")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/ai-tutors")
async def create_ai_tutor(tutor: dict):

    try:

        response = (
            supabase.table("ai_tutors")
            .insert(tutor)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/ai-tutors/{tutor_id}")
async def update_ai_tutor(
    tutor_id: str,
    tutor: dict,
):

    try:

        response = (
            supabase.table("ai_tutors")
            .update(tutor)
            .eq("id", tutor_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/ai-tutors/{tutor_id}")
async def delete_ai_tutor(tutor_id: str):

    try:

        response = (
            supabase.table("ai_tutors")
            .delete()
            .eq("id", tutor_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# LEADERBOARD
# ==========================================

@router.get("/leaderboard")
async def get_leaderboard():

    try:

        response = (
            supabase.table("leaderboard")
            .select("*")
            .order("xp", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.post("/leaderboard/refresh")
async def refresh_leaderboard():

    try:

        response = (
            supabase.rpc("refresh_leaderboard")
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )
    # ==========================================
# ADMIN PROFILE
# ==========================================

@router.get("/profile")
async def get_admin_profile():

    try:

        response = (
            supabase.table("admin_profile")
            .select("*")
            .limit(1)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/profile")
async def update_admin_profile(profile: dict):

    try:

        response = (
            supabase.table("admin_profile")
            .update(profile)
            .eq("id", profile["id"])
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# ADMIN SETTINGS
# ==========================================

@router.get("/settings")
async def get_admin_settings():

    try:

        response = (
            supabase.table("admin_settings")
            .select("*")
            .limit(1)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/settings")
async def update_admin_settings(settings: dict):

    try:

        response = (
            supabase.table("admin_settings")
            .update(settings)
            .eq("id", settings["id"])
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# STUDENT PROGRESS
# ==========================================

@router.get("/student-progress")
async def get_student_progress():

    try:

        response = (
            supabase.table("student_progress")
            .select("*")
            .order("updated_at", desc=True)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.put("/student-progress/{progress_id}")
async def update_student_progress(
    progress_id: str,
    progress: dict,
):

    try:

        response = (
            supabase.table("student_progress")
            .update(progress)
            .eq("id", progress_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.delete("/student-progress/{progress_id}")
async def delete_student_progress(progress_id: str):

    try:

        response = (
            supabase.table("student_progress")
            .delete()
            .eq("id", progress_id)
            .execute()
        )

        return response.data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )