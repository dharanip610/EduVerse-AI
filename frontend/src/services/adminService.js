import { supabase } from "../config/supabase";

/* ==========================================
   DASHBOARD
========================================== */

export async function getDashboardAnalytics() {

  const [
    students,
    subjects,
    chapters,
    lessons,
    quizzes,
    games,
    progress,
    leaderboard,
  ] = await Promise.all([
    supabase
      .from("students")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase.from("subjects").select("*", { count: "exact" }),

    supabase.from("chapters").select("*", { count: "exact" }),

    supabase.from("lessons").select("*", { count: "exact" }),

    supabase.from("quizzes").select("*", { count: "exact" }),

    supabase.from("games").select("*", { count: "exact" }),

  supabase
  .from("student_progress")
  .select(`
    *,
    lessons(title),
    students(full_name)
  `),
  
  supabase
  .from("students")
  .select(`
    id,
    full_name,
    xp,
    level,
    coins,
    streak,
    role
  `)
  .eq("role", "student")
  .order("xp", { ascending: false }), 
  ]);

  const completedLessons =
    progress.data?.filter(
      (item) => item.completed
    ).length || 0;

  const averageScore =
    progress.data?.length
      ? Math.round(
          progress.data.reduce(
            (sum, item) => sum + (item.score || 0),
            0
          ) / progress.data.length
        )
      : 0;

  return {

    data: {

      totalStudents: students.count || 0,

      totalSubjects: subjects.count || 0,

      totalChapters: chapters.count || 0,

      totalLessons: lessons.count || 0,

      totalQuizzes: quizzes.count || 0,

      totalGames: games.count || 0,

      completedLessons,

      averageScore,

      topStudents:
        leaderboard.data?.slice(0, 5) || [],

    recentActivity:
  progress.data
    ?.sort(
      (a, b) =>
        new Date(b.last_accessed || b.completed_at) -
        new Date(a.last_accessed || a.completed_at)
    )
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      title: item.students?.full_name || "Student",

description: item.completed
  ? `Completed "${item.lessons?.title || "Lesson"}"`
  : `Learning "${item.lessons?.title || "Lesson"}"`,
      time: item.last_accessed || item.completed_at,
    })) || [], 

    },

    error:
      students.error ||
      subjects.error ||
      chapters.error ||
      lessons.error ||
      quizzes.error ||
      games.error,

  };

}
/* ==========================================
   STUDENTS
========================================== */

export async function getAllStudents() {

  return await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function getStudent(id) {

  return await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

}

export async function createStudent(student) {

  return await supabase
    .from("students")
    .insert([student]);

}

export async function updateStudent(id, student) {

  return await supabase
    .from("students")
    .update(student)
    .eq("id", id);

}

export async function deleteStudent(id) {

  return await supabase
    .from("students")
    .delete()
    .eq("id", id);

}

/* ==========================================
   SUBJECTS
========================================== */

export async function getSubjects() {

  return await supabase
    .from("subjects")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function createSubject(subject) {

  return await supabase
    .from("subjects")
    .insert([subject]);

}

export async function updateSubject(id, subject) {

  return await supabase
    .from("subjects")
    .update(subject)
    .eq("id", id);

}

export async function deleteSubject(id) {

  return await supabase
    .from("subjects")
    .delete()
    .eq("id", id);

}

/* ==========================================
   CHAPTERS
========================================== */

export async function getChapters() {

  return await supabase
    .from("chapters")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function createChapter(chapter) {

  return await supabase
    .from("chapters")
    .insert([chapter]);

}

export async function updateChapter(id, chapter) {

  return await supabase
    .from("chapters")
    .update(chapter)
    .eq("id", id);

}

export async function deleteChapter(id) {

  return await supabase
    .from("chapters")
    .delete()
    .eq("id", id);

}

/* ==========================================
   LESSONS
========================================== */

export async function getLessons() {

  return await supabase
    .from("lessons")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function createLesson(lesson) {

  return await supabase
    .from("lessons")
    .insert([lesson]);

}

export async function updateLesson(id, lesson) {

  return await supabase
    .from("lessons")
    .update(lesson)
    .eq("id", id);

}

export async function deleteLesson(id) {

  return await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

}
/* ==========================================
   QUIZZES
========================================== */

export async function getQuizzes() {

  return await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function createQuiz(quiz) {

  return await supabase
    .from("quizzes")
    .insert([quiz]);

}

export async function updateQuiz(id, quiz) {

  return await supabase
    .from("quizzes")
    .update(quiz)
    .eq("id", id);

}

export async function deleteQuiz(id) {

  return await supabase
    .from("quizzes")
    .delete()
    .eq("id", id);

}

/* ==========================================
   GAMES
========================================== */

export async function getGames() {

  return await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function createGame(game) {

  return await supabase
    .from("games")
    .insert([game]);

}

export async function updateGame(id, game) {

  return await supabase
    .from("games")
    .update(game)
    .eq("id", id);

}

export async function deleteGame(id) {

  return await supabase
    .from("games")
    .delete()
    .eq("id", id);

}

/* ==========================================
   AI TUTOR
========================================== */

export async function getAITutors() {

  return await supabase
    .from("ai_tutors")
    .select("*")
    .order("created_at", { ascending: false });

}

export async function createAITutor(tutor) {

  return await supabase
    .from("ai_tutors")
    .insert([tutor]);

}

export async function updateAITutor(id, tutor) {

  return await supabase
    .from("ai_tutors")
    .update(tutor)
    .eq("id", id);

}

export async function deleteAITutor(id) {

  return await supabase
    .from("ai_tutors")
    .delete()
    .eq("id", id);

}

/* ==========================================
   LEADERBOARD
========================================== */
export async function getLeaderboard() {

  return await supabase
    .from("students")
    .select(`
      id,
      full_name,
      email,
      class,
      avatar,
      xp,
      level,
      streak,
      coins,
      role
    `)
    .eq("role", "student")
    .order("xp", { ascending: false });

}
/* ==========================================
   ADMIN PROFILE
========================================== */

export async function getAdminProfile() {

  return await supabase
    .from("admin_profile")
    .select("*")
    .single();

}

export async function updateAdminProfile(profile) {

  return await supabase
    .from("admin_profile")
    .update(profile)
    .eq("id", profile.id);

}

/* ==========================================
   ADMIN SETTINGS
========================================== */

export async function getAdminSettings() {

  return await supabase
    .from("admin_settings")
    .select("*")
    .single();

}

export async function updateAdminSettings(settings) {

  return await supabase
    .from("admin_settings")
    .update(settings)
    .eq("id", settings.id);

}

/* ==========================================
   STUDENT PROGRESS
========================================== */
export async function getStudentProgress() {

  const result = await supabase
    .from("student_progress")
    .select("*");

  console.log(result);

  return result;
}

export async function updateStudentProgress(id, progress) {

  return await supabase
    .from("student_progress")
    .update(progress)
    .eq("id", id);

}

export async function deleteStudentProgress(id) {

  return await supabase
    .from("student_progress")
    .delete()
    .eq("id", id);

}

/* ==========================================
   BACKWARD COMPATIBILITY EXPORTS
========================================== */

// Students
export const addStudent = createStudent;
export const getStudents = getAllStudents;

// Subjects
export const addSubject = createSubject;
export const getAllSubjects = getSubjects;

// Chapters
export const addChapter = createChapter;
export const getAllChapters = getChapters;

// Lessons
export const addLesson = createLesson;
export const getAllLessons = getLessons;

// Quizzes
export const addQuiz = createQuiz;
export const getAllQuizzes = getQuizzes;

// Games
export const addGame = createGame;
export const getAllGames = getGames;

// AI Tutors
export const addAITutor = createAITutor;
export const getAllAITutors = getAITutors;