import { useEffect, useState } from "react";

import {
  getAdminProfile,
  updateAdminProfile,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-profile.css";

export default function AdminProfile() {

 const emptyForm = {
  id: "",
  name: "",
  email: "",
  phone: "",
  designation: "",
  bio: "",
  avatar: "",
};

  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);
    async function loadProfile() {

    setLoading(true);

    const { data, error } = await getAdminProfile();

    if (error) {

      setFormError(error.message);

      setLoading(false);

      return;

    }

    if (data) {

setForm({
  id: data.id,
  name: data.name || "",
  email: data.email || "",
  phone: data.phone || "",
  designation: data.designation || "",
  bio: data.bio || "",
  avatar: data.avatar || "",
});

    }

    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim()
    ) {

      setFormError("Name and Email are required.");

      return;

    }

    setFormError("");

    setSaving(true);

    const { error } = await updateAdminProfile({

      ...form,

      name: form.name.trim(),

      email: form.email.trim(),

      phone: form.phone.trim(),

      designation: form.designation.trim(),

      bio: form.bio.trim(),

      avatar: form.avatar.trim(),

    });

    setSaving(false);

    if (error) {

      setFormError(error.message);

      return;

    }

    await loadProfile();

  }

  return (
    <div className="admin-page admin-profile">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>👤 Admin Profile</h1>
      <p>Manage your personal information and account details.</p>
    </div>

  </div>

  {loading ? (

    <div className="card">

      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>

    </div>

  ) : (

    <div className="card">

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <div className="profile-layout">

          {/* Avatar */}

          <div className="profile-avatar-section">

            <div className="avatar-preview">

              {form.avatar ? (

                <img
                  src={form.avatar}
                  alt="Admin Avatar"
                />

              ) : (

                <div className="avatar-placeholder">

                  {form.name
                    ? form.name.charAt(0).toUpperCase()
                    : "A"}

                </div>

              )}

            </div>

            <input
              type="text"
              placeholder="Avatar Image URL"
              value={form.avatar}
              onChange={(e)=>
                setForm({
                  ...form,
                  avatar:e.target.value,
                })
              }
            />

          </div>

          {/* Form */}

          <div className="profile-fields">

            {formError && (

              <div className="form-error">

                {formError}

              </div>

            )}

            <div className="form-grid">

              <div>

                <label>Full Name</label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      name:e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label>Email</label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      email:e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label>Phone</label>

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      phone:e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label>Designation</label>

                <input
                  type="text"
                  value={form.designation}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      designation:e.target.value,
                    })
                  }
                />

              </div>

            </div>

            <div className="full-width">

              <label>Bio</label>

              <textarea
                rows="5"
                value={form.bio}
                onChange={(e)=>
                  setForm({
                    ...form,
                    bio:e.target.value,
                  })
                }
              />

            </div>
                        <div className="profile-actions">

              <button
                type="submit"
                className="primary-btn"
                disabled={saving}
              >
                {saving ? "Saving..." : "💾 Save Changes"}
              </button>

            </div>

          </div>

        </div>

      </form>

    </div>

  )}

</div>

);
}