from database.supabase import supabase


def get_leaderboard():

    result = (
        supabase
        .table("students")
        .select("id,full_name,avatar,xp,level,streak")
        .order("xp", desc=True)
        .limit(10)
        .execute()
    )

    leaderboard = []

    for index, student in enumerate(result.data, start=1):

        student["rank"] = index

        leaderboard.append(student)

    return leaderboard