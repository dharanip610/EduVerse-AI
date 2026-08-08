import { addStudentXP } from "./studentService";

// Game attempts do not have a dedicated database table in the current schema.
// XP is therefore the persisted outcome for a completed game.
export async function saveGameXP(studentId, xp) {
  if (!studentId || !Number.isFinite(xp) || xp <= 0) {
    return { data: null, error: null };
  }

  return addStudentXP(studentId, xp);
}
