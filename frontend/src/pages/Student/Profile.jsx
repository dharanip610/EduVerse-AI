// =====================================================
// EduVerse AI
// Student Profile
// Professional UI
// Part 1
// =====================================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FaUserGraduate,
  FaCoins,
  FaFire,
  FaStar,
  FaEdit,
  FaSave,
  FaSignOutAlt,
  FaSchool,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCamera,
  FaTrash,
} from "react-icons/fa";

import "../../styles/profile.css";

import useStudent from "../../hooks/useStudent";
import { useAuth } from "../../context/AuthContext";
import {
  getStudentProfile,
  updateStudentProfile,
  uploadAvatar,
  removeAvatar,
} from "../../services/studentService";

export default function Profile() {

  const { student, loading } = useStudent();

const achievements = [
  {
    id: 1,
    icon: "🏆",
    title: "First Quiz",
    unlocked: (student?.xp || 0) >= 10,
  },
  {
    id: 2,
    icon: "🧩",
    title: "Memory Master",
    unlocked: (student?.xp || 0) >= 50,
  },
  {
    id: 3,
    icon: "⭐",
    title: "100 XP",
    unlocked: (student?.xp || 0) >= 100,
  },
  {
    id: 4,
    icon: "🚀",
    title: "500 XP",
    unlocked: (student?.xp || 0) >= 500,
  },
];

  const { signOut, user } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    school: "",
    class: "",
    avatar: ""
  });

  useEffect(() => {

    if (!student) return;

    setProfile({
      full_name: student.full_name || "",
      phone: student.phone || "",
      school: student.school || "",
      class: student.class || "",
      avatar: student.avatar || ""
    });

  }, [student]);

  function handleChange(e) {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  }

  async function handleSave() {

    if (!user?.id) {
      alert("You must be signed in to update your profile.");
      return;
    }
    if (!profile.full_name.trim()) {
  alert("Full Name is required.");
  return;
}

if (
  profile.phone &&
  !/^\d{10}$/.test(profile.phone)
) {
  alert("Enter a valid 10-digit phone number.");
  return;
}

    setSaving(true);

    const { error } = await updateStudentProfile(user.id, profile);

    if (error) {
      console.log(error);
      alert("Failed to update profile.");
    } else {
      console.log("Profile Updated Successfully");
      setEditMode(false);
    }

    setSaving(false);
  }

  async function handleAvatarChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    if (!user?.id) {
      alert("You must be signed in to upload an avatar.");
      return;
    }

    // Preview
    const preview = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      avatar: preview,
    }));
    URL.revokeObjectURL(preview);

    // Upload to Supabase
    const { data, error } = await uploadAvatar(user.id, file);

    if (error) {
      console.log(error);
      alert("Avatar upload failed");
      return;
    }

    // Save public URL
    setProfile((prev) => ({
      ...prev,
      avatar: data,
    }));

  }
  async function handleRemoveAvatar() {

  if (!user?.id) return;

  const { error } = await removeAvatar(user.id);

  if (error) {
    console.log(error);
    alert("Failed to remove avatar");
    return;
  }
  const { error: updateError } =
  await updateStudentProfile(user.id, {
    avatar: null,
  });

if (updateError) {
  console.log(updateError);
}

  setProfile((prev) => ({
    ...prev,
    avatar: "",
  }));

}

  if (loading) {
    return (
      <section className="profileLoading">
        <h2>Loading Profile...</h2>
      </section>
    );
  }

  if (!student) {
    return (
      <section className="profileLoading">
        <h2>Student Profile Not Found</h2>
      </section>
    );
  }

  return (

    <motion.section
      className="profilePage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 }}
    >

      {/* HERO */}

      <div className="profileHero">

        <div className="heroLeft">

          <div className="avatarBox">

            {
              profile.avatar ? (

                <img
                  src={profile.avatar}
                  alt=""
                  className="avatarImage"
                />

              ) : (

                <div className="avatarCircle">

                  {student.full_name?.charAt(0).toUpperCase()}

                </div>

              )
            }

            <label
              htmlFor="avatar"
              className="cameraBtn"
            >
              <FaCamera />
            </label>

            <input
              id="avatar"
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarChange}
            />
           

          </div>

          <div className="heroInfo">

            <h1>{student.full_name}</h1>

            <p>{student.email}</p>

            <div className="badgeRow">

              <span>
                <FaStar />
                Level {student.level}
              </span>

              <span>
                <FaFire />
                {student.streak} Days
              </span>

              <span>
                <FaCoins />
                {student.coins}
              </span>

            </div>
           {profile.avatar && (
  <button
    className="removeAvatarBtn"
    onClick={handleRemoveAvatar}
  >
    <FaTrash />
    Remove Photo
  </button>
)}

          </div>

        </div>

        <div className="heroRight">

          <div className="levelCard">

            <h2>{student.level}</h2>

            <span>LEVEL</span>

          </div>

        </div>

      </div>
      

      {/* STATS */}
    
      <div className="profileStats">

        <div className="statBox">
          <FaStar />
          <h2>{student.xp}</h2>
          <span>Total XP</span>
        </div>
        {/* ACHIEVEMENTS */}
        <div className="achievementProgress">

  <div className="achievementProgressHeader">

    <span>Achievement Progress</span>

    <span>{student.xp} / 500 XP</span>

  </div>

  <div className="achievementProgressBar">

    <div
      className="achievementProgressFill"
      style={{
        width: `${Math.min((student.xp / 500) * 100, 100)}%`
      }}
    />

  </div>

</div>

<div className="achievementSection">

  <h2>🏅 Achievements</h2>

  <div className="achievementGrid">

    {achievements.map((item) => (

      <div
        key={item.id}
        className={`achievementCard ${
          item.unlocked ? "unlocked" : "locked"
        }`}
      >

        <div className="achievementIcon">

          {item.icon}

        </div>

        <h3>{item.title}</h3>

        <p>

          {item.unlocked ? "Unlocked" : "Locked"}

        </p>

      </div>

    ))}

  </div>

</div>

        <div className="statBox">
          <FaCoins />
          <h2>{student.coins}</h2>
          <span>Coins</span>
        </div>

        <div className="statBox">
          <FaFire />
          <h2>{student.streak}</h2>
          <span>Learning Streak</span>
        </div>

        <div className="statBox">
          <FaUserGraduate />
          <h2>{student.level}</h2>
          <span>Current Level</span>
        </div>

      </div>
            {/* ================= PROFILE CONTENT ================= */}

      <div className="profileContent">

        {/* Personal Information */}

        <div className="infoSection">

          <h2>

            Personal Information

          </h2>

          <div className="infoGrid">

            {/* Full Name */}

            <div className="infoCard">

              <label>

                <FaUserGraduate />

                Full Name

              </label>

              {

                editMode ? (

                  <input
                    type="text"
                    name="full_name"
                    value={profile.full_name}
                    onChange={handleChange}
                  />

                ) : (

                  <p>

                    {student.full_name}

                  </p>

                )

              }

            </div>

            {/* Email */}

            <div className="infoCard">

              <label>

                <FaEnvelope />

                Email

              </label>

              <p>

                {student.email}

              </p>

            </div>

            {/* Phone */}

            <div className="infoCard">

              <label>

                <FaPhone />

                Phone Number

              </label>

              {

                editMode ? (

                 <input
  type="text"
  name="phone"
  value={profile.phone}
  onChange={handleChange}
  maxLength={10}
  inputMode="numeric"
/>

                ) : (

                  <p>

                    {student.phone || "Not Added"}

                  </p>

                )

              }

            </div>

            {/* School */}

            <div className="infoCard">

              <label>

                <FaSchool />

                School

              </label>

              {

                editMode ? (

                  <input
                    type="text"
                    name="school"
                    value={profile.school}
                    onChange={handleChange}
                  />

                ) : (

                  <p>

                    {student.school || "Not Added"}

                  </p>

                )

              }

            </div>

            {/* Class */}

            <div className="infoCard">

              <label>

                📚 Class

              </label>

              {

                editMode ? (

                  <input
                    type="text"
                    name="class"
                    value={profile.class}
                    onChange={handleChange}
                  />

                ) : (

                  <p>

                    {student.class || "Not Added"}

                  </p>

                )

              }

            </div>

            {/* Joined */}

            <div className="infoCard">

              <label>

                <FaCalendarAlt />

                Joined On

              </label>

              <p>

                {

                  new Date(

                    student.created_at

                  ).toLocaleDateString()

                }

              </p>

            </div>

          </div>

        </div>
                {/* ================= ACTION BUTTONS ================= */}

        <div className="profileButtons">

        {
  editMode ? (

    <>

      <button
        className="saveButton"
        onClick={handleSave}
        disabled={saving}
      >
        <FaSave />
        {saving ? " Saving..." : " Save Profile"}
      </button>

      <button
        className="cancelButton"
        onClick={() => {
          setEditMode(false);

          setProfile({
            full_name: student.full_name || "",
            phone: student.phone || "",
            school: student.school || "",
            class: student.class || "",
            avatar: student.avatar || "",
          });
        }}
      >
        Cancel
      </button>

    </>

  ) : (

    <button
      className="editButton"
      onClick={() => setEditMode(true)}
    >
      <FaEdit />
      Edit Profile
    </button>

  )
}

          <button

            className="logoutButton"

            onClick={signOut}

          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

        {/* ================= PROFILE SUMMARY ================= */}

        <div className="summarySection">

          <div className="summaryCard">

            <h3>Learning Progress</h3>

            <div className="progressBar">

              <div
                className="progressFill"
                style={{
                  width: `${Math.min(
                    (student.xp / 1000) * 100,
                    100
                  )}%`,
                }}
              ></div>

            </div>

            <span>

              {student.xp} XP Earned

            </span>

          </div>

          <div className="summaryCard">

            <h3>Current Status</h3>

            <p>

              🎓 Level {student.level}

            </p>

            <p>

              🔥 {student.streak} Day Streak

            </p>

            <p>

              🪙 {student.coins} Coins

            </p>

          </div>

        </div>

      </div>

    </motion.section>

  );

}