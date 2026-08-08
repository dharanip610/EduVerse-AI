import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/settings.css";
import useStudent from "../../hooks/useStudent";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/studentService";

function readStoredValue(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return fallback;

    return JSON.parse(storedValue);
  } catch {
    return fallback;
  }
}

export default function Settings() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme, setTheme } = useTheme();
  const [dailyReminder, setDailyReminder] = useState(() => readStoredValue("dailyReminder", true));
  const [quizReminder, setQuizReminder] = useState(() => readStoredValue("quizReminder", true));
  const [achievementAlert, setAchievementAlert] = useState(() => readStoredValue("achievementAlert", true));
function changeTheme(mode) {
  setTheme(mode);
}

 document.body.classList.toggle("dark", theme === "dark");
localStorage.setItem("theme", theme); 

  const { student, loading } = useStudent();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

    if (loading) {
        return (
            <section className="settings-page">
                <div className="settings-loading">
                    Loading Settings...
                </div>
            </section>
        );
    }
    if (!student) {
    return (
        <section className="settings-page">
            <div className="settings-loading">
                Student profile not found.
            </div>
        </section>
    );
}

    return (

        <section className="settings-page">

            {/* Header */}

            <div className="settings-header">

                <h1>⚙️ Settings</h1>

                <p>

                    Manage your EduVerse AI account and preferences.

                </p>

            </div>

            {/* Account */}

            <div className="setting-card">

                <div className="setting-title">

                    <h2>👤 Account</h2>

                    <span>Student Profile</span>

                </div>

                <div className="account-info">

                    <div>

                        <label>Full Name</label>

                        <p>{student?.full_name}</p>

                    </div>

                    <div>

                        <label>Email</label>

                        <p>{student?.email}</p>

                    </div>

                    <div>

                        <label>School</label>

                        <p>{student?.school}</p>

                    </div>

                    <div>

                        <label>Class</label>

                        <p>{student?.class}</p>

                    </div>

                </div>

                <button
    className="primary-btn"
    onClick={() => navigate("/profile")}
>
    ✏️ Edit Profile
</button>

            </div>

            {/* Theme */}

            <div className="setting-card">

                <div className="setting-title">

                    <h2>🎨 Appearance</h2>

                    <span>Customize Theme</span>

                </div>

                <div className="setting-row">

                    <span>🌞 Light Theme</span>
<button
    className={theme === "light" ? "active-theme" : ""}
    onClick={() => changeTheme("light")}
>
    Active
</button>

                </div>

                <div className="setting-row">

                    <span>🌙 Dark Theme</span>
<button
    className={theme === "dark" ? "active-theme" : ""}
    onClick={() => changeTheme("dark")}
>
    Enable
</button>

                </div>

            </div>  

            
<div className="readonly-field">
    <label>Email Address</label>

    <input
        type="email"
        value={student?.email || ""}
        readOnly
    />
</div>
            {/* Security */}

            <div className="setting-card">

                <div className="setting-title">

    <h2>🔒 Security</h2>

    <span>Update your account password</span>

</div>

<input
    type="password"
    placeholder="Enter New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
/>
<input
    type="password"
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) =>
        setConfirmPassword(e.target.value)
    }
/>
<div className="security-actions">

           <button
    className="primary-btn"
    disabled={
        changingPassword ||
        !newPassword.trim() ||
        !confirmPassword.trim()
    }
    onClick={async () => {

        if (newPassword.length < 6) {

            alert("Password must contain at least 6 characters");

            return;

        }
        if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
}
setChangingPassword(true);

const { error } = await changePassword(newPassword);

if (error) {

    alert(error.message);

} else {

    alert("Password Updated Successfully");

    setNewPassword("");
    setConfirmPassword("");

}

setChangingPassword(false);
    }}
>

   {changingPassword
  ? "Updating..."
  : "🔒 Change Password"}

</button>   

                
             
    <button
        className="danger-btn"
        onClick={() => {
            const confirmLogout = window.confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {
                handleLogout();
            }
        }}
    >
        🚪 Logout
    </button>

</div>
</div>

            {/* About */}

            <div className="setting-card">

                <div className="setting-title">

                    <h2>ℹ️ About EduVerse AI</h2>

                </div>

                <div className="about-box">

                    <p>

                        Version : 1.0.0

                    </p>

                    <p>

                        AI Powered Learning Platform

                    </p>

                    <p>

                        © 2026 EduVerse AI

                    </p>
                </div>

            </div>

        </section>

    );

}