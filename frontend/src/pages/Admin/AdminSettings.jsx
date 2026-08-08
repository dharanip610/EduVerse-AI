import { useEffect, useState } from "react";

import {
  getAdminSettings,
  updateAdminSettings,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-settings.css";
import { useTheme } from "../../context/ThemeContext";
export default function AdminSettings() {

const defaultSettings = {
  id: "",
  siteName: "",
  supportEmail: "",
  theme: "light",
  notifications: true,
  maintenanceMode: false,
}; 
  const [settings, setSettings] = useState(defaultSettings);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const { setTheme } = useTheme();

  useEffect(() => {
    loadSettings();
  }, []);
    async function loadSettings() {

    setLoading(true);

    const { data, error } = await getAdminSettings();

    if (error) {

      setError(error.message);

      setLoading(false);

      return;

    }
  if (data) {

setSettings({
  id: data.id,
  siteName: data.site_name || "",
  supportEmail: data.support_email || "",
  theme: data.theme || "light",
  notifications: data.notifications ?? true,
  maintenanceMode: data.maintenance_mode ?? false,
});

}

    
    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !settings.siteName.trim() ||
      !settings.supportEmail.trim()
    ) {

      setError("Site Name and Support Email are required.");

      return;

    }

    setError("");

    setSaving(true);

    const { error } = await updateAdminSettings({
  id: settings.id,
  site_name: settings.siteName.trim(),
  support_email: settings.supportEmail.trim(),
  theme: settings.theme,
  notifications: settings.notifications,
  maintenance_mode: settings.maintenanceMode,
});

    setSaving(false);

 if (error) {
  setError(error.message);
  return;
}

setTheme(settings.theme);

await loadSettings();

  }

  return (
    <div className="admin-page admin-settings">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>⚙️ Admin Settings</h1>
      <p>Configure your platform preferences and system settings.</p>
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
        className="settings-form"
        onSubmit={handleSubmit}
      >

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-grid">

          <div>

            <label>Site Name</label>

            <input
              type="text"
              value={settings.siteName}
              onChange={(e)=>
                setSettings({
                  ...settings,
                  siteName:e.target.value,
                })
              }
            />

          </div>

          <div>

            <label>Support Email</label>

            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e)=>
                setSettings({
                  ...settings,
                  supportEmail:e.target.value,
                })
              }
            />

          </div>

        </div>

        <div className="form-grid">

          <div>

            <label>Theme</label>

            <select
              value={settings.theme}
              onChange={(e)=>
                setSettings({
                  ...settings,
                  theme:e.target.value,
                })
              }
            >
              <option value="light">
                🌞 Light
              </option>

              <option value="dark">
                🌙 Dark
              </option>

              <option value="system">
                💻 System
              </option>

            </select>

          </div>

        </div>

        <div className="settings-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={saving}
          >
            {saving ? "Saving..." : "💾 Save Settings"}
          </button>
        </div>

      </form>

    </div>

  )}

</div>

);
}