import { useEffect, useState } from "react";
import {
  getSubjects,
  getChapters,
  getLessons,
  getAITutors,
  createAITutor,
  updateAITutor,
  deleteAITutor,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-ai.css";

export default function AdminAITutor() {

  const emptyForm = {
    subject_id: "",
    chapter_id: "",
    lesson_id: "",
    title: "",
    prompt: "",
    explanation: "",
    difficulty: "Easy",
  };

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [topics, setTopics] = useState([]);

  const [filteredChapters, setFilteredChapters] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);

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

    setFilteredChapters(
      chapters.filter(
        chapter => chapter.subject_id === selectedSubject
      )
    );

  }, [selectedSubject, chapters]);

  useEffect(() => {

    if (!selectedChapter) {

      setFilteredLessons([]);
      return;

    }

    setFilteredLessons(
      lessons.filter(
        lesson => lesson.chapter_id === selectedChapter
      )
    );

  }, [selectedChapter, lessons]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
    async function loadData() {

    setLoading(true);
  const { data: subjectData } = await getSubjects();
const { data: chapterData } = await getChapters();
const { data: lessonData } = await getLessons();
const { data: topicData } = await getAITutors();
    

    setSubjects(subjectData || []);
    setChapters(chapterData || []);
    setLessons(lessonData || []);
    setTopics(topicData || []);

    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.lesson_id ||
      !form.title.trim() ||
      !form.prompt.trim() ||
      !form.explanation.trim()
    ) {

      setFormError("Please fill all required fields.");

      return;

    }

    setFormError("");
    console.log("FORM:", form);
    setLoading(true);

    const payload = {

      ...form,

      title: form.title.trim(),

      prompt: form.prompt.trim(),

      explanation: form.explanation.trim(),

    };


   const result = editingId
  ? await updateAITutor(editingId, payload)
  : await createAITutor(payload);

  console.log("Supabase Result:", result);
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
    function editAITutor(topic) {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const lesson = lessons.find(
      (l) => l.id === topic.lesson_id
    );

    const chapterId = lesson?.chapter_id || "";

    const chapter = chapters.find(
      (c) => c.id === chapterId
    );

    const subjectId = chapter?.subject_id || "";

    setSelectedSubject(subjectId);

    setSelectedChapter(chapterId);

    setEditingId(topic.id);

    setForm({

      lesson_id: topic.lesson_id,
      
      title: topic.title,

      prompt: topic.prompt,

      explanation: topic.explanation,

      difficulty: topic.difficulty,

      subject_id: subjectId,

      chapter_id: chapterId,

    });

  }

  async function removeAITutor(id) {

    if (!window.confirm("Delete this AI topic?")) return;

    setLoading(true);

  const { error } = await deleteAITutor(id);

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    await loadData();

  }

  const filteredTopics = topics.filter((topic) => {

    const lesson = lessons.find(
      (l) => l.id === topic.lesson_id
    );

    const chapter = chapters.find(
      (c) => c.id === lesson?.chapter_id
    );

    const subject = subjects.find(
      (s) => s.id === chapter?.subject_id
    );

    const term = searchTerm.toLowerCase();

    return `
      ${topic.title}
      ${topic.prompt}
      ${lesson?.title || ""}
      ${chapter?.title || ""}
      ${subject?.name || ""}
    `
      .toLowerCase()
      .includes(term);

  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTopics.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleTopics = filteredTopics.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-page admin-ai">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>🤖 AI Tutor Management</h1>
      <p>Manage AI learning topics, prompts and explanations.</p>
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
      <h3>{topics.length}</h3>
      <span>Total AI Topics</span>
    </div>

    <div className="stat-card">
      <h3>{subjects.length}</h3>
      <span>Total Subjects</span>
    </div>

    <div className="stat-card">
      <h3>{lessons.length}</h3>
      <span>Total Lessons</span>
    </div>

    <div className="stat-card">
      <h3>{filteredTopics.length}</h3>
      <span>Search Results</span>
    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="card">

    <div className="subject-form-header">

      <h2>
        {editingId
          ? "✏️ Update AI Topic"
          : "➕ Add AI Topic"}
      </h2>

      <p>
        Create AI tutor prompts and learning explanations.
      </p>

    </div>

    <form
      className="subject-form ai-form"
      onSubmit={handleSubmit}
    >

      <select
        value={selectedSubject}
      onChange={(e) => {
  setSelectedSubject(e.target.value);

  setForm({
    ...form,
    subject_id: e.target.value,
    chapter_id: "",
    lesson_id: "",
  });

  setSelectedChapter("");
}}  
      >

        <option value="">
          Select Subject
        </option>

        {subjects.map(subject=>(

          <option
            key={subject.id}
            value={subject.id}
          >
            {subject.name}
          </option>

        ))}

      </select>

      <select
        value={selectedChapter}
        onChange={(e) => {
  setSelectedChapter(e.target.value);

  setForm({
    ...form,
    subject_id: selectedSubject,
    chapter_id: e.target.value,
    lesson_id: "",
  });
}}
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

      <select
        value={form.lesson_id}
      onChange={(e) => {

  console.log("Selected Subject:", selectedSubject);
  console.log("Selected Chapter:", selectedChapter);
  console.log("Selected Lesson:", e.target.value);

  setForm({
    ...form,
    subject_id: selectedSubject,
    chapter_id: selectedChapter,
    lesson_id: e.target.value,
  });

}}
    
      >

        <option value="">
          Select Lesson
        </option>

        {filteredLessons.map(lesson=>(

          <option
            key={lesson.id}
            value={lesson.id}
          >
            {lesson.title}
          </option>

        ))}

      </select>

      <select
        value={form.difficulty}
        onChange={(e)=>
          setForm({
            ...form,
            difficulty:e.target.value
          })
        }
      >

        <option value="Easy">
          🟢 Easy
        </option>

        <option value="Medium">
          🟡 Medium
        </option>

        <option value="Hard">
          🔴 Hard
        </option>

      </select>

      <input
        type="text"
        placeholder="AI Topic Title"
        value={form.title}
        onChange={(e)=>
          setForm({
            ...form,
            title:e.target.value
          })
        }
      />

      <textarea
        placeholder="AI Prompt"
        value={form.prompt}
        onChange={(e)=>
          setForm({
            ...form,
            prompt:e.target.value
          })
        }
      />

      <textarea
        placeholder="AI Explanation"
        value={form.explanation}
        onChange={(e)=>
          setForm({
            ...form,
            explanation:e.target.value
          })
        }
      />

      {formError && (

        <p className="form-error">
          {formError}
        </p>

      )}

      <button
        type="submit"
        className="primary-btn"
      >
        {editingId
          ? "Update AI Topic"
          : "Add AI Topic"}
      </button>

    </form>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="table-toolbar">

    <input
      type="text"
      placeholder="🔍 Search AI Topics..."
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
    />

    <button
      type="button"
      className="ghost-btn"
      onClick={()=>setSearchTerm("")}
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
              <th>AI Topic</th>
              <th>Difficulty</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {visibleTopics.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-state"
                >
                  No AI topics found.
                </td>

              </tr>

            ) : (

              visibleTopics.map((topic) => {

                const lesson = lessons.find(
                  (l) => l.id === topic.lesson_id
                );

                const chapter = chapters.find(
                  (c) => c.id === lesson?.chapter_id
                );

                const subject = subjects.find(
                  (s) => s.id === chapter?.subject_id
                );

                return (

                  <tr key={topic.id}>

                    <td className="ai-subject">
                      {subject?.name || "-"}
                    </td>

                    <td className="ai-chapter">
                      {chapter?.title || "-"}
                    </td>

                    <td className="ai-lesson">
                      {lesson?.title || "-"}
                    </td>

                    <td>

                      <div className="ai-title">
                        {topic.title}
                      </div>

                      <small className="ai-prompt">
                        {topic.prompt}
                      </small>

                    </td>

                    <td>

                      <span
                        className={`difficulty-badge ${topic.difficulty.toLowerCase()}`}
                      >
                        {topic.difficulty}
                      </span>

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => editAITutor(topic)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                        onClick={() => removeAITutor(topic.id)}
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