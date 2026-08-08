import { useEffect, useState } from "react";
import {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject
} from "../../services/adminService";

import "../../styles/admin-subjects.css";

export default function AdminSubjects() {
  const emptyForm = {
    name: "",
    description: "",
    icon: "📘",
    image: "",
    status: true,
  };

  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [formError, setFormError] = useState("");

  const itemsPerPage = 8;

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  async function loadSubjects() {
    setLoading(true);

    const { data, error } = await getSubjects();

    if (error) {
      console.error(error);
    } else {
      setSubjects(data || []);
    }

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setFormError("Subject name is required.");
      return;
    }

    if (!form.description.trim()) {
      setFormError("Please add a short description.");
      return;
    }

    setFormError("");
    setLoading(true);

    const payload = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      icon: form.icon || "📘",
      status: form.status !== false,
    };

    const result = editingId
      ? await updateSubject(editingId, payload)
      : await createSubject(payload);

    if (result.error) {
      setFormError(result.error.message);
      setLoading(false);
      return;
    }

    setForm(emptyForm);
    setEditingId(null);

    await loadSubjects();
  }

  function editSubject(subject) {
    setEditingId(subject.id);

    setForm({
      ...subject,
      description: subject.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function removeSubject(id) {
    if (!window.confirm("Delete this subject?")) return;

    setLoading(true);

    const { error } = await deleteSubject(id);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    await loadSubjects();
  }

  const filteredSubjects = subjects.filter((subject) => {
    const term = searchTerm.toLowerCase();

    return `${subject.name} ${subject.description || ""}`
      .toLowerCase()
      .includes(term);
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubjects.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleSubjects = filteredSubjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div className="admin-page admin-subjects">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="page-header">

        <div>
          <h1>📚 Subject Management</h1>
          <p>Manage all learning subjects for students.</p>
        </div>

        <button
          className="refresh-btn"
          type="button"
          onClick={loadSubjects}
        >
          🔄 Refresh
        </button>

      </div>


      {/* =========================
          STATS
      ========================== */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>{subjects.length}</h3>
          <span>Total Subjects</span>
        </div>

        <div className="stat-card">
          <h3>
            {subjects.filter((item) => item.status).length}
          </h3>
          <span>Active</span>
        </div>

        <div className="stat-card">
          <h3>
            {subjects.filter((item) => !item.status).length}
          </h3>
          <span>Inactive</span>
        </div>

        <div className="stat-card">
          <h3>{filteredSubjects.length}</h3>
          <span>Search Result</span>
        </div>

      </div>


      {/* =========================
            ADD SUBJECT
      ========================== */}

      <div className="subject-card">

        <div className="subject-form-header">

          <h2>
            {editingId
              ? "✏ Edit Subject"
              : "➕ Add New Subject"}
          </h2>

          <p>
            Create and manage learning subjects.
          </p>

        </div>


        <form
          className="subject-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Subject Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />


          <select
            value={form.icon}
            onChange={(e) =>
              setForm({
                ...form,
                icon: e.target.value,
              })
            }
          >
            <option value="📘">📘 Book</option>
            <option value="🧮">🧮 Mathematics</option>
            <option value="🧪">🧪 Science</option>
            <option value="🌍">🌍 Social Science</option>
            <option value="💻">💻 Computer</option>
            <option value="🎨">🎨 Art</option>
          </select>


          <textarea
            rows="4"
            placeholder="Subject Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
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
              ? "Update Subject"
              : "Add Subject"}
          </button>

        </form>

      </div>


      {/* =========================
             SEARCH
      ========================== */}

      <div className="table-toolbar">

        <input
          type="text"
          placeholder="🔍 Search Subject..."
          value={searchTerm}
          onChange={(e) =>
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


      {/* =========================
           TABLE LOADING
      ========================== */}

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
                  <th>Icon</th>
                  <th>Subject Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {visibleSubjects.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="empty-state"
                    >
                      📭 No subjects found.
                    </td>
                  </tr>

                ) : (

                  visibleSubjects.map((subject) => (

                    <tr key={subject.id}>

                      <td className="subject-icon">
                        {subject.icon}
                      </td>

                      <td className="subject-name">
                        {subject.name}
                      </td>

                      <td className="subject-description">
                        {subject.description}
                      </td>

                      <td>

                        <span
                          className={
                            subject.status
                              ? "status-badge active"
                              : "status-badge inactive"
                          }
                        >
                          {subject.status
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() =>
                              editSubject(subject)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              removeSubject(subject.id)
                            }
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


          <div className="pagination">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
            >
              ← Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
            >
              Next →
            </button>

          </div>

        </>
      )}

    </div>
  );
}