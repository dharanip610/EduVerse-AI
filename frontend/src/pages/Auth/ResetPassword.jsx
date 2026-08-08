import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/forgot.css";
import { updatePassword } from "../../services/authService";

export default function ResetPassword() {

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleReset(e) {

    e.preventDefault();

    setLoading(true);

    const { error } = await updatePassword(password);

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("Password updated successfully.");

    navigate("/login");

  }

  return (
<div className="forgot-page">
  <form
  className="forgot-card"
        onSubmit={handleReset}
      >

        <h1>Reset Password</h1>
        <p>
  Enter your new password below to secure your account.
</p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

       <button
  className="forgot-btn"
  type="submit"
>

          {loading ? "Updating..." : "Update Password"}

        </button>

      </form>

    </div>

  );

}