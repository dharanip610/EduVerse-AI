import { useEffect, useState } from "react";

import {
  getSubjects,
  getChapters,
  getLessons,
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-quiz.css";

export default function AdminQuiz() {
const emptyForm = {
  lesson_id: "",
  question: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_answer: "A",
  difficulty: "Easy",
  explanation: "",
  xp_reward: 10,
};

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const [formError, setFormError] = useState("");

  const itemsPerPage = 8;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {

    if (!selectedSubject) {

      setFilteredChapters([]);
      setFilteredLessons([]);
      return;

    }

    const chapterList = chapters.filter(
      chapter => chapter.subject_id === selectedSubject
    );

    setFilteredChapters(chapterList);

  }, [selectedSubject, chapters]);

  useEffect(() => {

    if (!selectedChapter) {

      setFilteredLessons([]);
      return;

    }

    const lessonList = lessons.filter(
      lesson => lesson.chapter_id === selectedChapter
    );

    setFilteredLessons(lessonList);

  }, [selectedChapter, lessons]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
    async function loadData() {

    setLoading(true);

  const { data: subjectData } = await getSubjects();
const { data: chapterData } = await getChapters();
const { data: lessonData } = await getLessons();
const { data: quizData } = await getQuizzes();

    setSubjects(subjectData || []);
    setChapters(chapterData || []);
    setLessons(lessonData || []);
    setQuizzes(quizData || []);

    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.lesson_id ||
      !form.question.trim() ||
      !form.option_a.trim() ||
      !form.option_b.trim() ||
      !form.option_c.trim() ||
      !form.option_d.trim()
    ) {

      setFormError("Please fill all required fields.");

      return;

    }

    setFormError("");

    setLoading(true);

    const payload = {

      ...form,

      question: form.question.trim(),

      option_a: form.option_a.trim(),

      option_b: form.option_b.trim(),

      option_c: form.option_c.trim(),

      option_d: form.option_d.trim(),

    };

    const result = editingId
      ? await updateQuiz(editingId, payload)
      : await createQuiz(payload);

    if (result.error) {

      setFormError(result.error.message);

      setLoading(false);

      return;

    }

    setEditingId(null);

    setSelectedSubject("");
    setSelectedChapter("");

    setForm(emptyForm);

    await loadData();

  }
    function editQuiz(quiz) {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const lesson = lessons.find(
      (l) => l.id === quiz.lesson_id
    );

    const chapterId = lesson?.chapter_id || "";

    const chapter = chapters.find(
      (c) => c.id === chapterId
    );

    const subjectId = chapter?.subject_id || "";

    setSelectedSubject(subjectId);

    setSelectedChapter(chapterId);

    setEditingId(quiz.id);

  setForm({

  lesson_id: quiz.lesson_id,
  question: quiz.question,
  option_a: quiz.option_a,
  option_b: quiz.option_b,
  option_c: quiz.option_c,
  option_d: quiz.option_d,
  correct_answer: quiz.correct_answer,
  difficulty: quiz.difficulty,
  explanation: quiz.explanation || "",
  xp_reward: quiz.xp_reward || 10,

});

  }

  async function removeQuiz(id) {

    if (!window.confirm("Delete this question?")) return;

    setLoading(true);

    const { error } = await deleteQuiz(id);

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    await loadData();

  }

  const filteredQuizzes = quizzes.filter((quiz) => {

    const lesson = lessons.find(
      (l) => l.id === quiz.lesson_id
    );

    const chapter = chapters.find(
      (c) => c.id === lesson?.chapter_id
    );

    const subject = subjects.find(
      (s) => s.id === chapter?.subject_id
    );

    const term = searchTerm.toLowerCase();

    return `
      ${quiz.question}
      ${lesson?.title || ""}
      ${chapter?.title || ""}
      ${subject?.name || ""}
    `
      .toLowerCase()
      .includes(term);

  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredQuizzes.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleQuizzes = filteredQuizzes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-page admin-quiz">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>📝 Quiz Management</h1>
      <p>Create and manage quiz questions for every lesson.</p>
    </div>

    <button
      type="button"
      className="primary-btn"
      onClick={loadData}
    >
      🔄 Refresh
    </button>

  </div>

  {/* ================= STATS ================= */}

  <div className="stats-grid">

    <div className="stat-card">
      <h3>{quizzes.length}</h3>
      <span>Total Questions</span>
    </div>

    <div className="stat-card">
      <h3>{subjects.length}</h3>
      <span>Subjects</span>
    </div>

    <div className="stat-card">
      <h3>{lessons.length}</h3>
      <span>Lessons</span>
    </div>

    <div className="stat-card">
      <h3>{filteredQuizzes.length}</h3>
      <span>Search Results</span>
    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="card">

    <div className="subject-form-header">

      <h2>
        {editingId ? "✏️ Update Question" : "➕ Add New Question"}
      </h2>

      <p>Create quiz questions with multiple-choice answers.</p>

    </div>

    <form
      className="subject-form quiz-form"
      onSubmit={handleSubmit}
    >

      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">Select Subject</option>

        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}

      </select>

      <select
        value={selectedChapter}
        onChange={(e) => setSelectedChapter(e.target.value)}
      >
        <option value="">Select Chapter</option>

        {filteredChapters.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            {chapter.title}
          </option>
        ))}

      </select>

      <select
        value={form.lesson_id}
        onChange={(e) =>
          setForm({
            ...form,
            lesson_id: e.target.value,
          })
        }
      >
        <option value="">Select Lesson</option>

        {filteredLessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.title}
          </option>
        ))}

      </select>

      <select
        value={form.correct_answer}
        onChange={(e) =>
          setForm({
            ...form,
            correct_answer: e.target.value,
          })
        }
      >
        <option value="A">Correct Answer : A</option>
        <option value="B">Correct Answer : B</option>
        <option value="C">Correct Answer : C</option>
        <option value="D">Correct Answer : D</option>
      </select>

      <textarea
        placeholder="Question"
        value={form.question}
        onChange={(e) =>
          setForm({
            ...form,
            question: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Option A"
        value={form.option_a}
        onChange={(e) =>
          setForm({
            ...form,
            option_a: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Option B"
        value={form.option_b}
        onChange={(e) =>
          setForm({
            ...form,
            option_b: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Option C"
        value={form.option_c}
        onChange={(e) =>
          setForm({
            ...form,
            option_c: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Option D"
        value={form.option_d}
        onChange={(e) =>
          setForm({
            ...form,
            option_d: e.target.value,
          })
        }
      />

      <select
        value={form.difficulty}
        onChange={(e) =>
          setForm({
            ...form,
            difficulty: e.target.value,
          })
        }
      >
        <option value="Easy">🟢 Easy</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Hard">🔴 Hard</option>
      </select>
      <textarea
  placeholder="Explanation"
  value={form.explanation}
  onChange={(e) =>
    setForm({
      ...form,
      explanation: e.target.value,
    })
  }
/>

<input
  type="number"
  placeholder="XP Reward"
  value={form.xp_reward}
  onChange={(e) =>
    setForm({
      ...form,
      xp_reward: e.target.value,
    })
  }
/>

      {formError && (
        <p className="form-error">
          {formError}
        </p>
      )}

      <button
        className="primary-btn"
        type="submit"
      >
        {editingId ? "Update Question" : "Add Question"}
      </button>

    </form>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="table-toolbar">

    <input
      type="text"
      placeholder="🔍 Search Questions..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button
      type="button"
      className="ghost-btn"
      onClick={() => setSearchTerm("")}
    >
      Clear
    </button>

  </div>
    {/* ================= TABLE ================= */}

  {loading ? (

    <div className="table-skeleton">

      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>

    </div>

  ) : (

    <>

      <div className="table-container">

        <table className="subjects-table">

          <thead>

            <tr>

              <th>Subject</th>
              <th>Chapter</th>
              <th>Lesson</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Difficulty</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {visibleQuizzes.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="empty-state"
                >
                  No quiz questions found.
                </td>

              </tr>

            ) : (

              visibleQuizzes.map((quiz) => {

                const lesson = lessons.find(
                  (l) => l.id === quiz.lesson_id
                );

                const chapter = chapters.find(
                  (c) => c.id === lesson?.chapter_id
                );

                const subject = subjects.find(
                  (s) => s.id === chapter?.subject_id
                );

                return (

                  <tr key={quiz.id}>

                    <td className="quiz-subject">
                      {subject?.name || "-"}
                    </td>

                    <td className="quiz-chapter">
                      {chapter?.title || "-"}
                    </td>

                    <td className="quiz-lesson">
                      {lesson?.title || "-"}
                    </td>

                    <td className="quiz-question">
                      {quiz.question}
                    </td>

                    <td>
                      <span className="answer-badge">
                        {quiz.correct_answer}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`difficulty-badge ${quiz.difficulty.toLowerCase()}`}
                      >
                        {quiz.difficulty}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => editQuiz(quiz)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeQuiz(quiz.id)}
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}

      <div className="pagination">

        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>

        <span>

          Page <strong>{page}</strong> of{" "}
          <strong>{totalPages}</strong>

        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>

      </div>

    </>

  )}

</div>

);
}