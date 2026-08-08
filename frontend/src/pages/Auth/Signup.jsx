import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../config/supabase";
import "../../styles/signup.css";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    studentClass: "",
    school: ""
  });

  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {

    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.studentClass
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {

      // ===============================
      // Create Authentication User
      // ===============================

      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("User account was not created.");
      }

      // ===============================
      // Save Student Profile
      // ===============================

      const { error: profileError } = await supabase
        .from("students")
        .insert({
          id: data.user.id,
          full_name: form.fullName,
          email: form.email.trim(),
          class: form.studentClass,
          school: form.school,
          role: "student"
        });

      if (profileError) {
        throw profileError;
      }

      // ===============================
      // Success
      // ===============================

      alert("🎉 Account Created Successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      console.error(err);

      if (
        err.message?.includes("already") ||
        err.message?.includes("registered")
      ) {
        alert("This email is already registered.");
      }

      else if (
        err.message?.includes("Password")
      ) {
        alert(err.message);
      }

      else {
        alert(err.message || "Something went wrong.");
      }

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="signup-page">

      <form
        className="signup-card"
        onSubmit={handleSignup}
      >

        <div className="signup-logo">
          EduVerse AI
        </div>

        <h1>Create Student Account</h1>

        <p>
          Start learning with lessons, quizzes,
          games and AI-powered education.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
          required
        />

        <select
          value={form.studentClass}
          onChange={(e) =>
            setForm({
              ...form,
              studentClass: e.target.value
            })
          }
          required
        >

          <option value="">
            Select Class
          </option>

          {Array.from({ length: 12 }, (_, i) => (

            <option
              key={i + 1}
              value={`Class ${i + 1}`}
            >
              Class {i + 1}
            </option>

          ))}

        </select>

        <input
          type="text"
          placeholder="School Name"
          value={form.school}
          onChange={(e) =>
            setForm({
              ...form,
              school: e.target.value
            })
          }
        />

        <button
          className="signup-btn"
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Creating Account..."
            : "Create Account"}

        </button>

        <div className="login-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </form>

    </div>

  );

}