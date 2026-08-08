import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "../../services/authService";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

import {
  getStudentProfile,
  getProgress,
  getLeaderboard
} from "../../services/studentService";

import "../../styles/student-dashboard.css";

export default function StudentDashboard() {

  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [student, setStudent] = useState(null);

  const [progress, setProgress] = useState([]);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {

    if (user) {

      loadDashboard();

    }

  }, [user]);

  async function loadDashboard() {

    if (!user) return;

    setLoading(true);

    try {

      const profile = await getStudentProfile(user.id);

      if (profile?.data) {

        setStudent(profile.data);

      }

      const progressData = await getProgress(user.id);

      if (progressData?.data) {

        setProgress(progressData.data);

      }

      const leaderboardData = await getLeaderboard();

      if (leaderboardData?.data) {

        setLeaderboard(leaderboardData.data);

      }

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  async function handleLogout() {

    const { error } = await signOut();

    if (error) {

      alert(error.message);

      return;

    }

    navigate("/login");

  }

  const statCards = [

    {
      icon:"⭐",
      label:"Total XP",
      value:student?.xp || 0,
      hint:"Experience Points"
    },

    {
      icon:"🔥",
      label:"Current Streak",
      value:student?.streak || 0,
      hint:"Learning Days"
    },

    {
      icon:"📚",
      label:"Lessons",
      value:progress.length,
      hint:"Completed Lessons"
    },

    {
      icon:"🏆",
      label:"Level",
      value:student?.level || 1,
      hint:"Current Level"
    },

    {
      icon:"📝",
      label:"Quiz Score",
      value:student?.quiz_score || 0,
      hint:"Average Score"
    },

    {
      icon:"🎖",
      label:"Certificates",
      value:student?.certificates || 0,
      hint:"Achievements"
    }

  ];

  const notifications = [

    {
      title:"Learning Streak",
      detail:`🔥 ${student?.streak || 0} Day Streak`
    },

    {
      title:"Completed Lessons",
      detail:`${progress.length} Lessons Completed`
    },

    {
      title:"Current Level",
      detail:`Level ${student?.level || 1}`
    }

  ];

  if (loading) {

    return <div className="student-loading">Loading Dashboard...</div>;

  }

  return (

    <div className={`student-dashboard ${theme}`}>

      <aside className={`student-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="sidebar-logo">

          <h2>🎓 EduVerse</h2>

          <span>Student Panel</span>

        </div>

        <ul>

          <li className="active">🏠 Dashboard</li>

          <li onClick={()=>navigate("/subjects")}>📚 Subjects</li>

        <li onClick={()=>navigate("/games")}>🎮 Games</li>


<li onClick={() => navigate("/subjects")}>
  📝 Quiz
</li>

<li onClick={() => navigate("/subjects")}>
  🤖 AI Tutor
</li>

          <li onClick={()=>navigate("/leaderboard")}>🏆 Leaderboard</li>


          <li onClick={()=>navigate("/profile")}>👤 Profile</li>

          <li onClick={()=>navigate("/settings")}>⚙ Settings</li>

          <li onClick={handleLogout}>🚪 Logout</li>

        </ul>

      </aside>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={()=>setSidebarOpen(false)}
      />

      <main className="student-content">

        <div className="student-header">

          <div>

            <h1>

              Welcome Back, {student?.full_name || "Student"} 👋

            </h1>

            <p>

              {new Date().toLocaleDateString("en-IN",{

                weekday:"long",

                day:"numeric",

                month:"long",

                year:"numeric"

              })}

            </p>

            <p>

              Continue your AI learning journey.

            </p>

          </div>

          <div className="header-actions">

            <button
              className="header-btn mobile-menu"
              onClick={()=>setSidebarOpen(true)}
            >
              ☰
            </button>

            <button
              className="header-btn"
              onClick={toggleTheme}
            >
              {theme==="dark" ? "☀️":"🌙"}
            </button>

            <button
              className="header-btn"
              onClick={handleLogout}
            >
              ↪
            </button>

          </div>

        </div>
        {/* ==============================
      STATISTICS
============================== */}

<div className="student-cards">

  {statCards.map((card) => (

    <div
      className="student-card"
      key={card.label}
    >

      <div className="card-icon">

        {card.icon}

      </div>

      <h2>

        {card.value}

      </h2>

      <span>

        {card.label}

      </span>

      <small>

        {card.hint}

      </small>

    </div>

  ))}

</div>

{/* ==============================
      QUICK ACTIONS + NOTIFICATIONS
============================== */}

<div className="dashboard-grid">

  {/* Quick Actions */}

  <div className="dashboard-box">

    <div className="box-header">

      <h2>⚡ Quick Actions</h2>

      <span>Continue Learning</span>

    </div>

    <div className="quick-actions">

      <button
        onClick={() => navigate("/subjects")}
      >
        📚 Browse Subjects
      </button>

      <button
        onClick={() => navigate("/ai-tutor")}
      >
        🤖 AI Tutor
      </button>

      <button
        onClick={() => navigate("/quiz")}
      >
        📝 Start Quiz
      </button>

      <button
        onClick={() => navigate("/games")}
      >
        🎮 Play Games
      </button>

      <button
        onClick={() => navigate("/leaderboard")}
      >
        🏆 Leaderboard
      </button>

      <button
        onClick={() => navigate("/progress")}
      >
        📈 My Progress
      </button>

    </div>

  </div>

  {/* Notifications */}

  <div className="dashboard-box">

    <div className="box-header">

      <h2>🔔 Notifications</h2>

      <span>Latest Updates</span>

    </div>

    <ul className="activity-list">

      {notifications.map((item) => (

        <li key={item.title}>

          <strong>

            {item.title}

          </strong>

          <span>

            {item.detail}

          </span>

        </li>

      ))}

    </ul>

  </div>

</div>
{/* ==============================
      RECENT ACTIVITY
============================== */}

<div className="dashboard-grid">

  <div className="dashboard-box wide">

    <div className="box-header">

      <h2>📈 Recent Activity</h2>

      <span>Your latest learning</span>

    </div>

    {

      progress.length === 0 ? (

        <div className="empty-state">

          <p>

            🚀 No learning activity yet.

            <br />

            Start your first lesson to begin your journey.

          </p>

        </div>

      ) : (

        <ul className="activity-list">

          {

            progress.slice(0,5).map((item,index)=>(

              <li key={item.id || index}>

                <strong>

                  📚 Lesson {index+1}

                </strong>

                <span>

                  {

                    item.completed

                    ? "Completed Successfully ✅"

                    : "In Progress ⏳"

                  }

                </span>

              </li>

            ))

          }

        </ul>

      )

    }

  </div>

</div>

{/* ==============================
      SUBJECTS + ACHIEVEMENTS
============================== */}

<div className="dashboard-grid">

  {/* Recommended Subjects */}

  <div className="dashboard-box">

    <div className="box-header">

      <h2>📚 Recommended Subjects</h2>

      <span>Continue Learning</span>

    </div>

    <div className="subject-grid">

      <div
        className="subject-card"
        onClick={()=>navigate("/subjects")}
      >

        <div className="subject-icon">

          📘

        </div>

        <h3>

          Mathematics

        </h3>

        <p>

          Improve calculations and logical thinking.

        </p>

        <button>

          Continue →

        </button>

      </div>

      <div
        className="subject-card"
        onClick={()=>navigate("/subjects")}
      >

        <div className="subject-icon">

          🧪

        </div>

        <h3>

          Science

        </h3>

        <p>

          Learn experiments and real-world concepts.

        </p>

        <button>

          Continue →

        </button>

      </div>

      <div
        className="subject-card"
        onClick={()=>navigate("/subjects")}
      >

        <div className="subject-icon">

          📖

        </div>

        <h3>

          English

        </h3>

        <p>

          Improve grammar and communication skills.

        </p>

        <button>

          Continue →

        </button>

      </div>

    </div>

  </div>

  {/* Achievements */}

  <div className="dashboard-box">

    <div className="box-header">

      <h2>🏆 Achievements</h2>

      <span>Your Rewards</span>

    </div>

    <div className="achievement-grid">

      <div className="achievement-card">

        <span>🥇</span>

        <h4>First Quiz</h4>

        <small>Unlocked</small>

      </div>

      <div className="achievement-card">

        <span>🔥</span>

        <h4>7 Day Streak</h4>

        <small>Unlocked</small>

      </div>

      <div className="achievement-card">

        <span>⭐</span>

        <h4>100 XP</h4>

        <small>Unlocked</small>

      </div>

      <div className="achievement-card">

        <span>🎯</span>

        <h4>Perfect Score</h4>

        <small>Unlocked</small>

      </div>

    </div>

  </div>

</div>
{/* ==============================
      LEADERBOARD + PROGRESS
============================== */}

<div className="dashboard-grid">

  {/* Leaderboard */}

  <div className="dashboard-box">

    <div className="box-header">

      <h2>🏆 Leaderboard</h2>

      <span>Top Learners</span>

    </div>

    {

      leaderboard.length === 0 ? (

        <div className="empty-state">

          <p>No leaderboard data available.</p>

        </div>

      ) : (

        <ul className="activity-list">

          {

            leaderboard.slice(0,5).map((item,index)=>(

              <li key={item.id || index}>

                <strong>

                  {

                    index===0 ? "🥇" :

                    index===1 ? "🥈" :

                    index===2 ? "🥉" :

                    "🏅"

                  }

                  {" "}

                  {item.full_name}

                </strong>

                <span>

                  {item.xp || 0} XP

                </span>

              </li>

            ))

          }

        </ul>

      )

    }

  </div>

  {/* Progress */}

  <div className="dashboard-box">

    <div className="box-header">

      <h2>📈 Learning Progress</h2>

      <span>Your Journey</span>

    </div>

    <div className="progress-wrapper">

      <div className="progress-item">

        <span>Overall Progress</span>

        <strong>

          {

            progress.length===0

            ?0

            :Math.min(progress.length*10,100)

          }%

        </strong>

      </div>

      <div className="progress-bar">

        <div

          className="progress-fill"

          style={{

            width:`${

              progress.length===0

              ?0

              :Math.min(progress.length*10,100)

            }%`

          }}

        />

      </div>

      <div className="progress-stats">

        <div>

          <h3>{progress.length}</h3>

          <p>Lessons</p>

        </div>

        <div>

          <h3>{student?.xp || 0}</h3>

          <p>XP</p>

        </div>

        <div>

          <h3>{student?.level || 1}</h3>

          <p>Level</p>

        </div>

      </div>

    </div>

  </div>

</div>

{/* ==============================
      TODAY'S GOAL
============================== */}

<div className="dashboard-box">

  <div className="box-header">

    <h2>🎯 Today's Goal</h2>

    <span>Stay Consistent</span>

  </div>

  <div className="goal-card">

    <h3>

      Complete 2 Lessons Today

    </h3>

    <p>

      Keep your learning streak alive and
      earn extra XP by completing today's lessons.

    </p>

    <button
      className="primary-btn"
      onClick={()=>navigate("/subjects")}
    >

      Continue Learning

    </button>

  </div>

</div>

      </main>

    </div>

  );

}