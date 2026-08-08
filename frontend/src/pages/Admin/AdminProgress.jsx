import { useEffect, useState } from "react";

import {
  getStudentProgress,
  getAllStudents,
  getAllSubjects,
  updateStudentProgress,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-progress.css";

export default function AdminProgress() {

  const [progress, setProgress] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
    async function loadData() {

    setLoading(true);

    const { data: progressData } = await getStudentProgress();
    const { data: studentData } = await getAllStudents();
    const { data: subjectData } = await getAllSubjects();

    setProgress(progressData || []);
    setStudents(studentData || []);
    setSubjects(subjectData || []);

    setLoading(false);

  }

  async function updateProgress(id, field, value) {

    setLoading(true);

    const { error } = await updateStudentProgress(id, {
      [field]: value,
    });

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    await loadData();

  }

  const filteredProgress = progress.filter((item) => {

    const student = students.find(
      (s) => s.id === item.student_id
    );

    const subject = subjects.find(
      (s) => s.id === item.subject_id
    );

    const term = searchTerm.toLowerCase();

    return `
      ${student?.full_name || ""}
      ${student?.email || ""}
      ${subject?.name || ""}
    `
      .toLowerCase()
      .includes(term);

  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProgress.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleProgress = filteredProgress.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-page admin-progress">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>📈 Student Progress</h1>
      <p>Track student learning progress, XP and completion.</p>
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
      <h3>{students.length}</h3>
      <span>Total Students</span>
    </div>

    <div className="stat-card">
      <h3>{subjects.length}</h3>
      <span>Total Subjects</span>
    </div>

    <div className="stat-card">
      <h3>{progress.length}</h3>
      <span>Progress Records</span>
    </div>

    <div className="stat-card">
      <h3>{filteredProgress.length}</h3>
      <span>Search Results</span>
    </div>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="table-toolbar">

    <input
      type="text"
      placeholder="🔍 Search Student..."
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

              <th>Student</th>
              <th>Subject</th>
              <th>Progress</th>
              <th>XP</th>
              <th>Completed</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {visibleProgress.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-state"
                >
                  No progress records found.
                </td>

              </tr>

            ) : (

              visibleProgress.map((item) => {

                const student = students.find(
                  s => s.id === item.student_id
                );

                const subject = subjects.find(
                  s => s.id === item.subject_id
                );

                const progressValue = item.completion_percentage || 0;
                const xp = item.xp_earned || 0;

                let status = "Beginner";

                if(progressValue >= 80){
                  status = "Completed";
                }
                else if(progressValue >= 50){
                  status = "In Progress";
                }

                return (
                                      <tr key={item.id}>

                    <td>

                      <div className="student-name">
                        {student?.full_name || "-"}
                      </div>

                      <small className="student-email">
                        {student?.email || "-"}
                      </small>

                    </td>

                    <td className="progress-subject">
                      {subject?.name || "-"}
                    </td>

                    <td>

                      <div className="progress-bar">

                        <div
                          className="progress-fill"
                          style={{
                            width: `${progressValue}%`,
                          }}
                        />

                      </div>

                      <small>
                        {progressValue}%
                      </small>

                    </td>

                    <td>

                      <span className="xp-badge">
                        ⭐ {xp}
                      </span>

                    </td>

                    <td>

                      <strong>
                        {item.completed ? 1 : 0}
                      </strong>

                    </td>

                    <td>

                      <span
                        className={`status-badge ${status
                          .toLowerCase()
                          .replace(/\s+/g,"-")}`}
                      >
                        {status}
                      </span>

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