from database.supabase import supabase


def add_coins(student_id, coins):

    student = (
        supabase
        .table("students")
        .select("coins")
        .eq("id", student_id)
        .single()
        .execute()
        .data
    )

    total = (student["coins"] or 0) + coins

    (
        supabase
        .table("students")
        .update({
            "coins": total
        })
        .eq("id", student_id)
        .execute()
    )

    return {
        "coins": total
    }


def get_rewards():

    return (
        supabase
        .table("rewards")
        .select("*")
        .execute()
        .data
    )