from database.supabase import supabase


def create_teacher(data):

    return (
        supabase
        .table("teachers")
        .insert(data)
        .execute()
        .data
    )


def get_teachers():

    return (
        supabase
        .table("teachers")
        .select("*")
        .execute()
        .data
    )


def get_teacher(id):

    result = (
        supabase
        .table("teachers")
        .select("*")
        .eq("id", id)
        .single()
        .execute()
    )

    return result.data

