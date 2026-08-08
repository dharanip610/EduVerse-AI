import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile } from "../../services/studentService";
import "../../styles/student-home.css";

export default function StudentHome() {

  const { user } = useAuth();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  async function loadStudent() {

    if (!user) return;

    const { data, error } = await getStudentProfile(user.id);

    if (error) {
      console.log(error);
      return;
    }

    setStudent(data);

  }
  return (
    <section className="student-home">

      {/* Hero */}

      <div className="student-hero">

        <div>

          <h1>
  👋 Welcome Back, {student?.full_name || "Student"}
</h1>

          <p>
            Continue your AI-powered learning journey today.
          </p>

        </div>

        <button className="continue-btn">

          Continue Learning →

        </button>

      </div>

      {/* Quick Stats */}

      <div className="student-stats">

        <div className="student-card">

          <h2>{student?.xp || 0}</h2>

          <span>Total XP</span>

        </div>

        <div className="student-card">

          <h2>15 🔥</h2>

          <span>Daily Streak</span>

        </div>

        <div className="student-card">

          <h2>48</h2>

          <span>Lessons Completed</span>

        </div>

        <div className="student-card">

          <h2>92%</h2>

          <span>Overall Progress</span>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-grid">

          <div className="action-card">
            🤖
            <h3>AI Tutor</h3>
          </div>

          <div className="action-card">
            📚
            <h3>Subjects</h3>
          </div>

          <div className="action-card">
            📝
            <h3>Quiz</h3>
          </div>

          <div className="action-card">
            🎮
            <h3>Games</h3>
          </div>

          <div className="action-card">
            🏆
            <h3>Leaderboard</h3>
          </div>

          <div className="action-card">
            👤
            <h3>Profile</h3>
          </div>

        </div>

      </div>

    </section>
  );
}