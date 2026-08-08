import { supabase } from "../config/supabase";

// Current Student Profile
export async function getStudentProfile(userId) {
  return await supabase
    .from("students")
    .select("*")
    .eq("id", userId)
    .single();
}

// Subjects
export async function getSubjects() {
  return await supabase
    .from("subjects")
    .select("*")
    .eq("status", true)
    .order("name");
}

// Chapters
export async function getChapters(subjectId) {
  return await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", subjectId)
    .order("chapter_order");
}

// Lessons
export async function getLessons(chapterId) {
  return await supabase
    .from("lessons")
    .select("*")
    .eq("chapter_id", chapterId);
}

// Quiz
export async function getQuiz(lessonId) {
  return await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", lessonId);
}

// Progress
export async function getProgress(studentId) {
  return await supabase
    .from("student_progress")
    .select("*")
    .eq("student_id", studentId);
}

function calculateLevel(xp) {
  const normalizedXp = Number(xp) || 0;

  if (normalizedXp >= 5000) return 20;
  if (normalizedXp >= 3000) return 15;
  if (normalizedXp >= 1800) return 10;
  if (normalizedXp >= 900) return 6;
  if (normalizedXp >= 400) return 3;
  return 1;
}

function calculateBadge(xp, rank) {
  const normalizedXp = Number(xp) || 0;

  if (rank === 1) return "Champion";
  if (rank === 2) return "Rising Star";
  if (rank === 3) return "Top 3";
  if (normalizedXp >= 2500) return "Master";
  if (normalizedXp >= 1200) return "Explorer";
  return "Learner";
}

function normalizeLeaderboardEntry(entry, index) {
  const xp = Number(entry?.xp || 0);
  const coins = Number(entry?.coins || 0);
  const rank = index + 1;

  return {
    ...entry,
    xp,
    coins,
    level: Number(entry?.level) || calculateLevel(xp),
    badge: entry?.badge || calculateBadge(xp, rank),
    full_name: entry?.full_name || "Anonymous Student",
    avatar: entry?.avatar || null,
    rank,
  };
}

function getLeaderboardDateRange(period) {
  const end = new Date();
  const start = new Date();

  if (period === "weekly") {
    start.setDate(end.getDate() - 6);
  } else if (period === "monthly") {
    start.setDate(end.getDate() - 29);
  } else {
    return null;
  }

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

// Leaderboard
export async function getLeaderboard(period = "global") {
  if (period === "weekly" || period === "monthly") {
    const range = getLeaderboardDateRange(period);

    if (!range) {
      return { data: [], error: null };
    }

    const { data: progressData, error: progressError } = await supabase
      .from("student_progress")
      .select("student_id, xp_earned, completed_at")
      .gte("completed_at", range.start)
      .lte("completed_at", range.end)
      .order("completed_at", { ascending: false });

    if (progressError) {
      return { data: [], error: progressError };
    }

    const xpByStudent = new Map();

    (progressData || []).forEach((item) => {
      const studentId = item.student_id;
      const xpEarned = Number(item.xp_earned || 0);
      xpByStudent.set(studentId, (xpByStudent.get(studentId) || 0) + xpEarned);
    });

    const studentIds = [...xpByStudent.keys()];

    if (studentIds.length === 0) {
      return await getLeaderboard("global");
    }

    const { data: studentsData, error: studentError } = await supabase
      .from("students")
      .select("id, full_name, avatar, xp, level, coins")
      .in("id", studentIds);

    if (studentError) {
      return { data: [], error: studentError };
    }

    const rankedData = (studentsData || [])
      .map((student) => ({
        ...student,
        xp: xpByStudent.get(student.id) || 0,
      }))
      .sort((a, b) => (b.xp || 0) - (a.xp || 0))
      .map((student, index) => normalizeLeaderboardEntry(student, index));

    return { data: rankedData, error: null };
  }

  const { data, error } = await supabase
    .from("students")
    .select("id, full_name, avatar, xp, level, coins")
    .order("xp", { ascending: false })
    .order("coins", { ascending: false })
    .limit(100);
    console.log("Leaderboard Data:", data);

  if (error) {
    return { data: [], error };
  }

  const rankedData = (data || []).map((student, index) => normalizeLeaderboardEntry(student, index));

  return { data: rankedData, error: null };
}
export async function getSubject(subjectId){

    return await supabase

        .from("subjects")

        .select("*")

        .eq("id",subjectId)

        .single();

}
export async function getLesson(lessonId){

    return await supabase

        .from("lessons")

        .select("*")

        .eq("id", lessonId)

        .single();

}
export async function saveChatMessage(
    studentId,
    question,
    answer
){

    return await supabase

        .from("ai_chat_history")

        .insert({

            student_id: studentId,

            question,

            answer

        });

}
export async function submitQuiz(
  studentId,
  lessonId,
  score
  
) {

  const xpEarned = score * 10;
const result = await supabase
  .from("student_progress")
  .upsert(
    {
      student_id: studentId,
      lesson_id: lessonId,
      completed: true,
      score: score,
      xp_earned: xpEarned,
      completion_percentage: 100,
      completed_at: new Date().toISOString(),
      last_accessed: new Date().toISOString()
    },
    {
      onConflict: "student_id,lesson_id"
    }
  );
 await addStudentXP(studentId, xpEarned);

return result;   

}

/* ===================================
   UPDATE PROFILE
=================================== */

export async function updateStudentProfile(userId, profile) {

  return await supabase
    .from("students")
    .update(profile)
    .eq("id", userId);

}

/* ===================================
   UPDATE AVATAR
=================================== */

export async function updateAvatar(userId, avatarUrl) {

  return await supabase
    .from("students")
    .update({
      avatar: avatarUrl
    })
    .eq("id", userId);

}

/* ===================================
   CHANGE PASSWORD
=================================== */

export async function changePassword(newPassword) {

  return await supabase.auth.updateUser({

    password: newPassword

  });

}
/* ===================================
   ADMIN SUBJECTS
=================================== */

// Get All Subjects
export async function getAllSubjects() {

  return await supabase
    .from("subjects")
    .select("*")
    .order("created_at", { ascending: false });

}

// Add Subject
export async function addSubject(subject) {

  return await supabase
    .from("subjects")
    .insert(subject);

}

// Update Subject
export async function updateSubject(id, subject) {

  return await supabase
    .from("subjects")
    .update(subject)
    .eq("id", id);

}

// Delete Subject
export async function deleteSubject(id) {

  return await supabase
    .from("subjects")
    .delete()
    .eq("id", id);

}
export async function uploadAvatar(userId, file) {

  const fileExt = file.name.split(".").pop();

  const fileName = `${userId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) return { error };

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return {
    data: `${data.publicUrl}?t=${Date.now()}`,
    error: null,
  };

}
export async function removeAvatar(userId) {

  const { data: files } = await supabase.storage
    .from("avatars")
    .list();

  const file = files?.find((f) =>
    f.name.startsWith(userId)
  );

  if (!file) {
    return { error: null };
  }

  const { error } = await supabase.storage
    .from("avatars")
    .remove([file.name]);

  return { error };

}
/* ===================================
   ADD XP
=================================== */

export async function addStudentXP(userId, xp) {

  const { data: student, error } = await supabase
    .from("students")
    .select("xp")
    .eq("id", userId)
    .single();

  if (error) return { error };

  const currentXP = student?.xp || 0;

  return await supabase
    .from("students")
    .update({
      xp: currentXP + xp,
    })
    .eq("id", userId);

}

export async function getChatHistory(studentId) {
  if (!studentId) return { data: [], error: null };

  return await supabase
    .from("ai_chat_history")
    .select("id, question, answer, created_at")
    .eq("student_id", studentId)
    .order("created_at", { ascending: true })
    .limit(50);
}
export async function deleteAllChats(studentId) {
  if (!studentId) {
    return { error: null };
  }

  return await supabase
    .from("ai_chat_history")
    .delete()
    .eq("student_id", studentId);
}
export async function deleteSingleChat(chatId) {
  if (!chatId) {
    return { error: null };
  }

  return await supabase
    .from("ai_chat_history")
    .delete()
    .eq("id", chatId);
}
export async function getCertificates(studentId) {
  if (!studentId) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("student_id", studentId)
    .order("issued_at", { ascending: false });

  return { data: data || [], error };
}
export async function createCertificate(certificateData) {
  const { data, error } = await supabase
    .from("certificates")
    .insert([certificateData])
    .select()
    .single();

  return { data, error };
}