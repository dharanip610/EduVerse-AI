import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../services/authService";
import { useTheme } from "../../context/ThemeContext";
import { getDashboardAnalytics } from "../../services/adminService";
import "../../styles/admin-dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [stats, setStats] = useState({ students: 0, subjects: 0, chapters: 0, lessons: 0, quizzes: 0, certificates: 0 });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

  const { data, error } = await getDashboardAnalytics();

if (!error && data) {
  setStats({
    students: data.totalStudents,
    subjects: data.totalSubjects,
    chapters: data.totalChapters,
    lessons: data.totalLessons,
    quizzes: data.totalQuizzes,
    certificates: 0,
  });

  setActivity(data.recentActivity || []);
}

    setLoading(false);
  }

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/admin-login");
  }
  const statCards = [
  {
    icon: "👨‍🎓",
    label: "Total Students",
    value: stats.students,
    hint: "Active learners",
  },
  {
    icon: "📚",
    label: "Subjects",
    value: stats.subjects,
    hint: "Curriculum tracks",
  },
  {
    icon: "📖",
    label: "Chapters",
    value: stats.chapters,
    hint: "Structured content",
  },
  {
    icon: "🎓",
    label: "Lessons",
    value: stats.lessons,
    hint: "Learning modules",
  },
  {
    icon: "📝",
    label: "Quizzes",
    value: stats.quizzes,
    hint: "Assessments ready",
  },
  
];
 
  const notifications = [
    { title: "Enrollment health", detail: `${stats.students} learners are currently onboarded` },
    { title: "Content volume", detail: `${stats.chapters} chapters and ${stats.lessons} lessons are available` },
    { title: "Assessment coverage", detail: `${stats.quizzes} quizzes are ready for learners` },
  ];

  return (
    <div className={`admin-dashboard ${theme}`}>
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <h2>🎓 EduVerse</h2>
          <span>Admin Panel</span>
        </div>

      <ul>
  <li className="active">📊 Dashboard</li>

  <li onClick={() => navigate("/admin-students")}>
    👨‍🎓 Students
</li>

  <li onClick={() => navigate("/admin-subjects")}>
    📚 Subjects
  </li>

  <li onClick={() => navigate("/admin-chapters")}>
    📖 Chapters
  </li>

  <li onClick={() => navigate("/admin-lessons")}>
    📘 Lessons
  </li>

  <li onClick={() => navigate("/admin-quiz")}>
    📝 Quiz Manager
  </li>
  
  <li onClick={() => navigate("/admin-games")}>
  🎮 Games
</li>

 <li onClick={() => navigate("/admin-leaderboard")}>
  🏆 Leaderboard
</li>

<li onClick={() => navigate("/admin-progress")}>
  📈 Progress
</li>

 <li onClick={() => navigate("/admin-analytics")}>
    📊 Analytics
</li>

  <li onClick={() => navigate("/admin-profile")}>
    👤 Profile
  </li>
   
   

    <li onClick={() => navigate("/admin-ai-tutor")}>
  🤖 AI Tutor
</li>

  <li onClick={() => navigate("/admin-settings")}>
    ⚙️ Settings
  </li>

  <li onClick={handleLogout}>
    🚪 Logout
  </li>
</ul>
      </aside>

      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1>Welcome Back, Admin 👋</h1>
            <p>
  {new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</p>
            <p>Manage your AI learning platform with live Supabase insights.</p>
          </div>

          <div className="header-actions">
            <button className="header-btn mobile-menu" onClick={() => setSidebarOpen(true)}>☰</button>
            <button className="header-btn" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
            <button className="header-btn" onClick={handleLogout}>↪</button>
          </div>
        </div>

        <div className="admin-cards">
          {statCards.map((card) => (
            <div className="admin-card" key={card.label}>
              <div className="card-icon">{card.icon}</div>
              <h2>{loading ? "—" : card.value}</h2>
              <span>{card.label}</span>
              <small>{card.hint}</small>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-box">
            <div className="box-header">
              <h2>⚡ Quick Actions</h2>
              <span>Fast navigation</span>
            </div>

            <div className="quick-actions">
              <button onClick={() => navigate("/admin-subjects")}>+ Add Subject</button>
              <button onClick={() => navigate("/admin-chapters")}>+ Add Chapter</button>
              <button onClick={() => navigate("/admin-lessons")}>+ Add Lesson</button>
              <button onClick={() => navigate("/admin-quiz")}>+ Add Quiz</button>
              <button onClick={() => navigate("/admin-students")}>
  👨‍🎓 Manage Students
</button>
            </div>
          </div>

          <div className="dashboard-box">
            <div className="box-header">
              <h2>📬 Notifications</h2>
              <span>Live platform insights</span>
            </div>

            <ul className="activity-list">
              {notifications.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-box wide">
            <div className="box-header">
              <h2>📈 Recent Activity</h2>
              <span>Updated from your Supabase data</span>
            </div>

            {loading ? (
              <div className="skeleton-list">
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
              </div>
            ) : (
              <ul className="activity-list">
                {activity.length === 0 ? <li>🚀 No recent activity available.
Start managing students, subjects and quizzes to see updates here.</li> : activity.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}