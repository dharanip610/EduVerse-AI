
from database.supabase import supabase


def create_assignment(data):

    return (
        supabase
        .table("assignments")
        .insert(data)
        .execute()
        .data
    )


def get_assignments():

    return (
        supabase
        .table("assignments")
        .select("*")
        .execute()
        .data
    )

