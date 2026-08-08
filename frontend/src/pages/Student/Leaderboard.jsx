import { useEffect, useState } from "react";
import "../../styles/leaderboard.css";
import { getLeaderboard } from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";

export default function Leaderboard() {
  const { user } = useAuth();

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      setLoading(true);
      setError("");

      const { data, error: leaderboardError } = await getLeaderboard("global");

      if (!active) return;

      if (leaderboardError) {
        setLeaders([]);
        setError("Unable to load leaderboard right now. Please try again shortly.");
      } else {
        setLeaders((data || []).sort((a, b) => (b.xp || 0) - (a.xp || 0)));
      }

      setLoading(false);
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, [user?.id]);

  const currentStudent = leaders.find((student) => student.id === user?.id);
  const currentRank = currentStudent ? currentStudent.rank : null;

  if (loading) {

        return (

            <section className="leaderboard-page">

                <div className="loading-card">

                    Loading Leaderboard...

                </div>

            </section>

        );

    }

    return (

        <section className="leaderboard-page">

            <div className="leaderboard-header">

                <h1>🏆 Leaderboard</h1>

                <p>
                    Compete with students and climb the rankings.
                </p>

            </div>
            {error ? (
              <div className="loading-card">{error}</div>
            ) : currentStudent ? (
              <div className="your-rank-card">

                <h2>👤 Your Rank</h2>

                <div className="rank-details">

                  <div>
                    <strong>🏅 Rank</strong>
                    <p>#{currentRank || "—"}</p>
                    <p>{currentStudent.badge || "Keep learning"}</p>
                  </div>

                  <div>
                    <strong>⭐ XP</strong>
                    <p>{currentStudent.xp || 0} XP</p>
                  </div>

                  <div>
                    <strong>🎯 Level</strong>
                    <p>{currentStudent.level || 1}</p>
                  </div>

                  <div>
                    <strong>🪙 Coins</strong>
                    <p>{currentStudent.coins || 0}</p>
                  </div>

                </div>

              </div>
            ) : (
              <div className="loading-card">Your progress is not ranked yet. Complete lessons and quizzes to appear here.</div>
            )}

            <div className="leaderboard-table">

                <div className="table-head">

                    <span>Rank</span>

                    <span>Student</span>

                    <span>XP</span>

                </div>

                {leaders.length === 0 ? (

                    <div className="table-row">

                        <span>-</span>

                        <span>No Students Found</span>

                        <span>0 XP</span>

                    </div>

                ) : (

                    leaders.map((student, index) => (

                        <div
                            key={student.id || index}
                            className={`table-row ${
                                student.id === user?.id ? "current-user" : ""
                            }`}
                        >

                            <span>

                                {index === 0
                                    ? "🥇"
                                    : index === 1
                                    ? "🥈"
                                    : index === 2
                                    ? "🥉"
                                    : "🏅"}{" "}
                                #{index + 1}

                            </span>
<span className="studentInfo">

  {student.avatar ? (

    <img
      src={student.avatar}
      alt={student.full_name}
      className="leaderAvatar"
    />

  ) : (

    <div className="leaderInitial">

      {student.full_name?.charAt(0).toUpperCase()}

    </div>

  )}

  <div>

    <strong>{student.full_name}</strong>

    <small>{student.badge || `Level ${student.level}`}</small>

  </div>

</span>

 <span className="xpBox">

  ⭐ {student.xp || 0}

  <br />

  🪙 {student.coins || 0}

</span>                          

                        </div>

                    ))

                )}

            </div>

        </section>

    );

}