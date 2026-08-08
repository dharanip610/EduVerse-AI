import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signOut, isAdmin } from "../../services/authService";
import "../../styles/login.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
async function handleAdminLogin(e) {

  e.preventDefault();

  const { data, error } = await signIn(email, password);

  if (error) {
    alert("Invalid Admin Credentials");
    return;
  }

  const { data: admin, error: adminError } = await isAdmin(data.user.id);

  if (adminError || !admin) {
    await signOut();
    alert("Access Denied");
    return;
  }

  navigate("/admin-dashboard");
}
  return (

    <div className="login-page">

      <form
        className="login-card"
        onSubmit={handleAdminLogin}
      >

        <div className="login-logo">

          👨‍💼 EduVerse Admin

        </div>

        <h1>

          Admin Login

        </h1>

        <p>

          Login to manage EduVerse AI.

        </p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          className="login-btn"
          type="submit"
        >

          Login

        </button>

      </form>

    </div>

  );

}