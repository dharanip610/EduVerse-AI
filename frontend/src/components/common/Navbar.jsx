import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        <Link to="/">
          EduVerse AI
        </Link>
      </div>

      <nav>

        <a href="#home">Home</a>

        <a href="#subjects">Subjects</a>

        <a href="#ai">AI Tutor</a>

        <a href="#quiz">Quiz</a>

        <a href="#games">Games</a>

        <a href="#leaderboard">Leaderboard</a>

      </nav>

      <div className="nav-buttons">

        <Link
          to="/login"
          className="login-btn"
        >
          Student Login
        </Link>

        <Link
          to="/admin-login"
          className="admin-btn"
        >
          Admin Login
        </Link>

        <Link
          to="/signup"
          className="signup-btn"
        >
          Get Started
        </Link>

      </div>

    </header>
  );
}