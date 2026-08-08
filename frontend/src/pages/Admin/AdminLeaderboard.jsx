import { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/adminService";
import "../../styles/admin.css";
import "../../styles/admin-leaderboard.css";

export default function AdminLeaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
    async function loadData() {
 setLoading(true);

const { data: leaderboardData } = await getLeaderboard();

setLeaderboard(leaderboardData || []);

setLoading(false);

  }
 async function refreshLeaderboard() {

  await loadData();

}
const filteredLeaderboard = leaderboard.filter((student) => {

  const term = searchTerm.toLowerCase();

  return `
    ${student.full_name || ""}
    ${student.email || ""}
  `
    .toLowerCase()
    .includes(term);

});
  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeaderboard.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleLeaderboard = filteredLeaderboard.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-page admin-leaderboard">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>🏆 Leaderboard Management</h1>
      <p>Monitor student rankings, XP and achievements.</p>
    </div>

    <button
      type="button"
      className="primary-btn"
      onClick={refreshLeaderboard}
    >
      🔄 Refresh Rankings
    </button>

  </div>

  {/* ================= STATS ================= */}

  <div className="stats-grid">

    <div className="stat-card">
      <h3>{leaderboard.length}</h3>
      <span>Total Rankings</span>
    </div>

    <div className="stat-card">
      <h3>{leaderboard.length}</h3>
<span>Total Students</span>
    </div>

    <div className="stat-card">
      <h3>{filteredLeaderboard.length}</h3>
      <span>Search Results</span>
    </div>

    <div className="stat-card">
      <h3>{totalPages}</h3>
      <span>Total Pages</span>
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

              <th>Rank</th>
              <th>Student</th>
              <th>XP</th>
              <th>Lessons</th>
              <th>Streak</th>
              <th>Achievement</th>

            </tr>

          </thead>

          <tbody>

            {visibleLeaderboard.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-state"
                >
                  No leaderboard data found.
                </td>

              </tr>

            ) : (

              visibleLeaderboard.map((item,index)=>{

                const student = item;
                const rank = startIndex + index + 1;

                let achievement = "Rookie";

                if(rank===1){
                  achievement="Champion";
                }
                else if(rank<=3){
                  achievement="Top Performer";
                }
                else if(rank<=10){
                  achievement="Rising Star";
                }

                return (
                                      <tr key={item.id}>

                    <td>

                      <span className={`rank-badge rank-${rank}`}>
                        #{rank}
                      </span>

                    </td>

                    <td>
                  <div className="student-name">
  {student?.full_name || "-"}
</div>

<small className="student-email">
  {student?.email || "-"}
</small> 

                    </td>

                    <td>

                      <span className="xp-badge">
                        ⭐ {item.xp || 0}
                      </span>

                    </td>

                    <td>

                      <span className="lesson-count">
                        📚 {item.completed_lessons || 0}
                      </span>

                    </td>

                    <td>

                      <span className="streak-badge">
                        🔥 {item.streak || 0}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`achievement-badge ${achievement
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {achievement}
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