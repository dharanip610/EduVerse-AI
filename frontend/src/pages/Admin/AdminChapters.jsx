import { useEffect, useState } from "react";
import {
  getSubjects,
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-chapters.css";

export default function AdminChapters() {

  const emptyForm = {
    subject_id: "",
    title: "",
    description: "",
    chapter_order: 1,
  };

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);

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
    setPage(1);
  }, [searchTerm]);

  async function loadData() {

    setLoading(true);

   const { data: subjectData } = await getSubjects();
   const { data: chapterData } = await getChapters();
    setSubjects(subjectData || []);

    setChapters(chapterData || []);

    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!form.subject_id || !form.title.trim()) {

      setFormError("Please select a subject and enter chapter title.");

      return;

    }

    if (Number(form.chapter_order) < 1) {

      setFormError("Chapter order should be greater than 0.");

      return;

    }

    setFormError("");

    const payload = {

      ...form,

      title: form.title.trim(),

      description: form.description.trim(),

      chapter_order: Number(form.chapter_order),

    };

    setLoading(true);
  const result = editingId
  ? await updateChapter(editingId, payload)
  : await createChapter(payload);
   

    if (result.error) {

      setFormError(result.error.message);

      setLoading(false);

      return;

    }

    setEditingId(null);

    setForm(emptyForm);

    await loadData();

  }

  function editChapter(chapter) {

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

    setEditingId(chapter.id);

    setForm({

      subject_id:chapter.subject_id,

      title:chapter.title,

      description:chapter.description || "",

      chapter_order:chapter.chapter_order || 1,

    });

  }

  async function removeChapter(id){

    if(!window.confirm("Delete this chapter?")) return;

    setLoading(true);

    const {error}=await deleteChapter(id);

    if(error){

      alert(error.message);

      setLoading(false);

      return;

    }

    await loadData();

  }

  const filteredChapters = chapters.filter((chapter)=>{

    const term=searchTerm.toLowerCase();

    return `${chapter.title}
            ${chapter.subjects?.name || ""}
            ${chapter.description || ""}`
      .toLowerCase()
      .includes(term);

  });

  const totalPages=Math.max(
    1,
    Math.ceil(filteredChapters.length/itemsPerPage)
  );

  const startIndex=(page-1)*itemsPerPage;

  const visibleChapters=filteredChapters.slice(
    startIndex,
    startIndex+itemsPerPage
  );
  return (
  <div className="admin-page admin-chapters">

    {/* ================= HEADER ================= */}

    <div className="page-header">

      <div>
        <h1>📖 Chapter Management</h1>
        <p>Manage all chapters for every subject.</p>
      </div>

      <button
        className="primary-btn"
        onClick={loadData}
        type="button"
      >
        🔄 Refresh
      </button>

    </div>

    {/* ================= STATS ================= */}

    <div className="stats-grid">

      <div className="stat-card">
        <h3>{chapters.length}</h3>
        <span>Total Chapters</span>
      </div>

      <div className="stat-card">
        <h3>{subjects.length}</h3>
        <span>Total Subjects</span>
      </div>

      <div className="stat-card">
        <h3>{filteredChapters.length}</h3>
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
          {editingId ? "✏️ Update Chapter" : "➕ Add New Chapter"}
        </h2>

        <p>
          Create and organize chapters for every subject.
        </p>

      </div>

      <form
        className="subject-form chapter-form"
        onSubmit={handleSubmit}
      >

        <select
          value={form.subject_id}
          onChange={(e)=>
            setForm({
              ...form,
              subject_id:e.target.value
            })
          }
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

        <input
          type="text"
          placeholder="Chapter Title"
          value={form.title}
          onChange={(e)=>
            setForm({
              ...form,
              title:e.target.value
            })
          }
        />

        <input
          type="number"
          min="1"
          placeholder="Chapter Order"
          value={form.chapter_order}
          onChange={(e)=>
            setForm({
              ...form,
              chapter_order:Number(e.target.value)
            })
          }
        />

        <textarea
          placeholder="Chapter Description"
          value={form.description}
          onChange={(e)=>
            setForm({
              ...form,
              description:e.target.value
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
            ? "Update Chapter"
            : "Add Chapter"}
        </button>

      </form>

    </div>

    {/* ================= SEARCH ================= */}

    <div className="table-toolbar">

      <input
        type="text"
        placeholder="🔍 Search Chapters..."
        value={searchTerm}
        onChange={(e)=>
          setSearchTerm(e.target.value)
        }
      />

      <button
        className="ghost-btn"
        type="button"
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
                <th>Description</th>
                <th>Order</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {visibleChapters.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-state"
                  >
                    No chapters found.
                  </td>

                </tr>

              ) : (

                visibleChapters.map((chapter) => (

              <tr key={chapter.id}>

  {/* Subject */}
  <td className="chapter-subject">
    {chapter.subjects?.name}
  </td>

  {/* Chapter Title */}
  <td>
    <span className="chapter-title">
      📖 {chapter.title}
    </span>
  </td>

  {/* Description */}
  <td className="chapter-description">
    {chapter.description || "-"}
  </td>

  {/* Order */}
  <td>
    <span className="chapter-order">
      {chapter.chapter_order}
    </span>
  </td>

  {/* Actions */}
  <td>
    <div className="action-buttons">

      <button
        type="button"
        className="edit-btn"
        onClick={() => editChapter(chapter)}
      >
        ✏️ Edit
      </button>

      <button
        type="button"
        className="delete-btn"
        onClick={() => removeChapter(chapter.id)}
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