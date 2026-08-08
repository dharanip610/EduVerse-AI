import { Outlet, Link } from "react-router-dom";
import { FiAward } from "react-icons/fi";

import "../styles/student-layout.css";

export default function StudentLayout() {
  return (
    <div className="student-layout">

      {/* Sidebar */}

      <aside className="student-sidebar">

        <h2>EduVerse AI</h2>
    
        <nav>

          <Link to="/student">🏠 Home</Link>

          <Link to="/subjects">📚 Subjects</Link>

          <Link to="/ai-tutor">🤖 AI Tutor</Link>

          <Link to="/quiz">📝 Quiz</Link>

          <Link to="/games">🎮 Games</Link>

          <Link to="/leaderboard">🏆 Leaderboard</Link>

          <Link to="/student/certificates">
            <FiAward /> Certificates
          </Link>

          <Link to="/profile">👤 Profile</Link>

          <Link to="/settings">⚙ Settings</Link>

        </nav>

      </aside>

      {/* Main */}

      <main className="student-main">

        <Outlet />

      </main>

    </div>
  );
}