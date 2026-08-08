import { useEffect, useState } from "react";

import {
  getDashboardAnalytics,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-analytics.css";

export default function AdminAnalytics() {

  const [analytics, setAnalytics] = useState({

    totalStudents: 0,

    totalSubjects: 0,

    totalChapters: 0,

    totalLessons: 0,

    totalQuizzes: 0,

    totalGames: 0,

    completedLessons: 0,

    averageScore: 0,

    topStudents: [],

    recentActivity: [],

  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);
    async function loadAnalytics() {

    setLoading(true);

    const { data, error } = await getDashboardAnalytics();

    if (error) {

      console.error(error);

      setLoading(false);

      return;

    }

    if (data) {

      setAnalytics({

        totalStudents: data.totalStudents || 0,

        totalSubjects: data.totalSubjects || 0,

        totalChapters: data.totalChapters || 0,

        totalLessons: data.totalLessons || 0,

        totalQuizzes: data.totalQuizzes || 0,

        totalGames: data.totalGames || 0,

        completedLessons: data.completedLessons || 0,

        averageScore: data.averageScore || 0,

        topStudents: data.topStudents || [],

        recentActivity: data.recentActivity || [],

      });

    }

    setLoading(false);

  }

  return (
    <div className="admin-page admin-analytics">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>📊 Analytics Dashboard</h1>
      <p>Monitor platform performance and learning insights.</p>
    </div>

  </div>

  {loading ? (

    <div className="stats-grid">

      <div className="stat-card skeleton-row"></div>
      <div className="stat-card skeleton-row"></div>
      <div className="stat-card skeleton-row"></div>
      <div className="stat-card skeleton-row"></div>

    </div>

  ) : (

    <>

      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>{analytics.totalStudents}</h3>
          <span>👨‍🎓 Students</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.totalSubjects}</h3>
          <span>📚 Subjects</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.totalChapters}</h3>
          <span>📖 Chapters</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.totalLessons}</h3>
          <span>🎓 Lessons</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.totalQuizzes}</h3>
          <span>📝 Quizzes</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.totalGames}</h3>
          <span>🎮 Games</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.completedLessons}</h3>
          <span>✅ Completed Lessons</span>
        </div>

        <div className="stat-card">
          <h3>{analytics.averageScore}%</h3>
          <span>📈 Average Score</span>
        </div>

      </div>

      {/* ================= DETAILS ================= */}

      <div className="analytics-grid">

        <div className="card">

          <h2>🏆 Top Performing Students</h2>

          <div className="analytics-list">
            {analytics.topStudents.length === 0 ? (

              <p className="empty-state">
                No student data available.
              </p>

            ) : (

           analytics.topStudents.map((student, index) => (

  <div
    className="analytics-item"
    key={student.id || index}
  >

    <div>

      <strong>
        {index === 0 ? "🥇" :
         index === 1 ? "🥈" :
         index === 2 ? "🥉" :
         `#${index + 1}`} {student.full_name}
      </strong>

      <p>
        Level {student.level || 1}
      </p>

    </div>

    <span className="analytics-badge">
      {student.xp || 0} XP
    </span>

  </div>

))   
           

            )}


          </div>

        </div>

        <div className="card">

          <h2>📅 Recent Activity</h2>

          <div className="analytics-list">

            {analytics.recentActivity.length === 0 ? (

              <p className="empty-state">
                No recent activity found.
              </p>

            ) : (

              analytics.recentActivity.map((activity, index) => (

                <div
                  className="analytics-item"
                  key={activity.id || index}
                >

                  <div>

                    <strong>
                      {activity.title}
                    </strong>

                    <p>
                      {activity.description}
                    </p>

                  </div>

                <small>
  {new Date(activity.time).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })}
</small>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </>

  )}

    </div>

  );

}