import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/login.css";

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    setLoading(true);

    const { error } = await login(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    console.log("Login Success");

    navigate("/student");

  }

  return (

    <div className="login-page">

      <button className="theme-toggle">
        🌙
      </button>

      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>
      <div className="bg-circle circle-3"></div>

      <div className="floating-chip chip-1">🤖 AI Tutor</div>
      <div className="floating-chip chip-2">🏆 XP Rewards</div>
      <div className="floating-chip chip-3">🎮 120+ Games</div>
      <div className="floating-chip chip-4">📚 500+ Lessons</div>

      <form
        className="login-card"
        onSubmit={handleLogin}
      >

        <div className="login-logo">
          🎓 EduVerse AI
        </div>

        <h1>Welcome Back 👋</h1>

        <p>
          Continue your AI learning journey
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <div className="login-options">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button
          className="login-btn"
          type="submit"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        <div className="divider">
          OR
        </div>

        <div className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup">
            Create Account
          </Link>
        </div>

      </form>

    </div>

  );

}