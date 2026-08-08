import { useEffect, useState } from "react";
import {
  getSubjects,
  getChapters,
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-lessons.css";

export default function AdminLessons() {

  const emptyForm = {
    chapter_id: "",
    title: "",
    video_url: "",
    content: "",
    ai_notes: "",
    duration: 10,
    xp_reward: 10,
  };

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");

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

      return;

    }

    const list = chapters.filter(
      (chapter) => chapter.subject_id === selectedSubject
    );

    setFilteredChapters(list);

  }, [selectedSubject, chapters]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
    async function loadData() {

    setLoading(true);
const { data: subjectData } = await getSubjects();
const { data: chapterData } = await getChapters();
const { data: lessonData } = await getLessons();
    

    setSubjects(subjectData || []);
    setChapters(chapterData || []);
    setLessons(lessonData || []);

    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!form.chapter_id || !form.title.trim()) {

      setFormError("Please select a chapter and enter lesson title.");

      return;

    }

    if (Number(form.duration) < 1) {

      setFormError("Duration must be at least 1 minute.");

      return;

    }

    if (Number(form.xp_reward) < 0) {

      setFormError("XP reward cannot be negative.");

      return;

    }

    setFormError("");

    setLoading(true);

    const payload = {

      ...form,

      title: form.title.trim(),

      content: form.content.trim(),

      ai_notes: form.ai_notes.trim(),

      video_url: form.video_url.trim(),

      duration: Number(form.duration),

      xp_reward: Number(form.xp_reward),

    };

  const result = editingId
  ? await updateLesson(editingId, payload)
  : await createLesson(payload);

    if (result.error) {

      setFormError(result.error.message);

      setLoading(false);

      return;

    }

    setEditingId(null);

    setSelectedSubject("");

    setForm(emptyForm);

    await loadData();

  }
    function editLesson(lesson) {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const subjectId = lesson.chapters?.subjects?.id || "";

    setSelectedSubject(subjectId);

    setEditingId(lesson.id);

    setForm({
      chapter_id: lesson.chapter_id,
      title: lesson.title,
      video_url: lesson.video_url || "",
      content: lesson.content || "",
      ai_notes: lesson.ai_notes || "",
      duration: lesson.duration || 10,
      xp_reward: lesson.xp_reward || 10,
    });

  }

  async function removeLesson(id) {

    if (!window.confirm("Delete this lesson?")) return;

    setLoading(true);

    const { error } = await deleteLesson(id);

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    await loadData();

  }

  const filteredLessons = lessons.filter((lesson) => {

    const term = searchTerm.toLowerCase();

    return `
      ${lesson.title}
      ${lesson.chapters?.title || ""}
      ${lesson.chapters?.subjects?.name || ""}
    `
      .toLowerCase()
      .includes(term);

  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLessons.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleLessons = filteredLessons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-page admin-lessons">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>📚 Lesson Management</h1>
      <p>Manage lessons, content and learning resources.</p>
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
      <h3>{lessons.length}</h3>
      <span>Total Lessons</span>
    </div>

    <div className="stat-card">
      <h3>{subjects.length}</h3>
      <span>Total Subjects</span>
    </div>

    <div className="stat-card">
      <h3>{filteredLessons.length}</h3>
      <span>Search Results</span>
    </div>

    <div className="stat-card">
      <h3>{totalPages}</h3>
      <span>Total Pages</span>
    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="card">

    <div className="subject-form-header">

      <h2>
        {editingId ? "✏️ Update Lesson" : "➕ Add New Lesson"}
      </h2>

      <p>
        Create lessons for each chapter with learning content.
      </p>

    </div>

    <form
      className="subject-form lesson-form"
      onSubmit={handleSubmit}
    >

      <select
        value={selectedSubject}
        onChange={(e) =>
          setSelectedSubject(e.target.value)
        }
      >
        <option value="">Select Subject</option>

        {subjects.map(subject => (

          <option
            key={subject.id}
            value={subject.id}
          >
            {subject.name}
          </option>

        ))}

      </select>

      <select
        value={form.chapter_id}
        onChange={(e)=>
          setForm({
            ...form,
            chapter_id:e.target.value
          })
        }
      >

        <option value="">
          Select Chapter
        </option>

        {filteredChapters.map(chapter=>(

          <option
            key={chapter.id}
            value={chapter.id}
          >
            {chapter.title}
          </option>

        ))}

      </select>

      <input
        type="text"
        placeholder="Lesson Title"
        value={form.title}
        onChange={(e)=>
          setForm({
            ...form,
            title:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Video URL"
        value={form.video_url}
        onChange={(e)=>
          setForm({
            ...form,
            video_url:e.target.value
          })
        }
      />

      <textarea
        placeholder="Lesson Content"
        value={form.content}
        onChange={(e)=>
          setForm({
            ...form,
            content:e.target.value
          })
        }
      />

      <textarea
        placeholder="AI Notes"
        value={form.ai_notes}
        onChange={(e)=>
          setForm({
            ...form,
            ai_notes:e.target.value
          })
        }
      />

      <input
        type="number"
        min="1"
        placeholder="Duration (Minutes)"
        value={form.duration}
        onChange={(e)=>
          setForm({
            ...form,
            duration:Number(e.target.value)
          })
        }
      />

      <input
        type="number"
        min="0"
        placeholder="XP Reward"
        value={form.xp_reward}
        onChange={(e)=>
          setForm({
            ...form,
            xp_reward:Number(e.target.value)
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
        {editingId
          ? "Update Lesson"
          : "Add Lesson"}
      </button>

    </form>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="table-toolbar">

    <input
      type="text"
      placeholder="🔍 Search Lessons..."
      value={searchTerm}
      onChange={(e)=>
        setSearchTerm(e.target.value)
      }
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
              <th>Duration</th>
              <th>XP</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {visibleLessons.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-state"
                >
                  No lessons found.
                </td>

              </tr>

            ) : (

              visibleLessons.map((lesson) => (

                <tr key={lesson.id}>

                  <td className="lesson-subject">
                    {lesson.chapters?.subjects?.name}
                  </td>

                  <td className="lesson-chapter">
                    📖 {lesson.chapters?.title}
                  </td>

                  <td className="lesson-title">
                    📚 {lesson.title}
                  </td>

                  <td>

                    <span className="lesson-duration">
                      {lesson.duration} min
                    </span>

                  </td>

                  <td>

                    <span className="lesson-xp">
                      ⭐ {lesson.xp_reward}
                    </span>

                  </td>

                  <td>

                    <div className="action-buttons">

                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() => editLesson(lesson)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="delete-btn"
                        onClick={() => removeLesson(lesson.id)}
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

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