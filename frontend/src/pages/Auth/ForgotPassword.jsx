import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

import "../../styles/forgot.css";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    const { error } = await forgotPassword(email);

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Password reset link has been sent to your email.");

  }

  return (

    <div className="forgot-page">

      <form
        className="forgot-card"
        onSubmit={handleSubmit}
      >

        <div className="forgot-logo">EduVerse AI</div>
        <div className="forgot-icon">?</div>

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address and we will send you a reset link.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <button className="forgot-btn" type="submit">

          {loading ? "Sending..." : "Send Reset Link"}

        </button>

        <Link className="back-login" to="/login">

          Back to Login

        </Link>

      </form>

    </div>

  );

}
