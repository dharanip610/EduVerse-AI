from database.supabase import supabase


def get_quiz_by_lesson(lesson_id: str):
    return (
        supabase
        .table("quizzes")
        .select("*")
        .eq("lesson_id", lesson_id)
        .execute()
        .data
    )


def create_quiz(quiz: dict):
    return (
        supabase
        .table("quizzes")
        .insert(quiz)
        .execute()
        .data
    )


def update_quiz(quiz_id: str, quiz: dict):
    return (
        supabase
        .table("quizzes")
        .update(quiz)
        .eq("id", quiz_id)
        .execute()
        .data
    )


def delete_quiz(quiz_id: str):
    return (
        supabase
        .table("quizzes")
        .delete()
        .eq("id", quiz_id)
        .execute()
        .data
    )


def calculate_score(lesson_id: str, answers: dict):

    questions = (
        supabase
        .table("quizzes")
        .select("*")
        .eq("lesson_id", lesson_id)
        .execute()
        .data
    )

    score = 0

    for q in questions:

        if answers.get(str(q["id"])) == q["correct_answer"]:
            score += q["xp_reward"]

    return score
from services.xp_service import add_xp


def submit_quiz(student_id, lesson_id, answers):

    questions = (
        supabase
        .table("quizzes")
        .select("*")
        .eq("lesson_id", lesson_id)
        .execute()
        .data
    )

    score = 0
    correct = 0

    for question in questions:

        for answer in answers:

            if answer["question_id"] == str(question["id"]):

                if answer["selected_answer"] == question["correct_answer"]:

                    correct += 1
                    score += question["xp_reward"]

    supabase.table("quiz_attempts").insert({

        "student_id": student_id,
        "lesson_id": lesson_id,
        "score": score,
        "earned_xp": score,
        "correct_answers": correct,
        "total_questions": len(questions)

    }).execute()

    xp = add_xp(student_id, score)

    return {

        "score": score,
        "correct": correct,
        "total": len(questions),
        "xp": xp

    }