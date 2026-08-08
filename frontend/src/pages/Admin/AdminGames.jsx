import { useEffect, useState } from "react";
import {
  getSubjects,
  getGames,
  createGame,
  updateGame,
  deleteGame,
} from "../../services/adminService";

import "../../styles/admin.css";
import "../../styles/admin-games.css";

export default function AdminGames() {

  const emptyForm = {
    subject_id: "",
    title: "",
    description: "",
    game_type: "Puzzle",
    difficulty: "Easy",
    xp_reward: 20,
    thumbnail: "",
  };

  const [subjects, setSubjects] = useState([]);
  const [games, setGames] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);

  const [formError, setFormError] = useState("");

  const itemsPerPage = 8;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
    async function loadData() {

    setLoading(true);

    const { data: subjectData } = await getSubjects();
const { data: gameData } = await getGames();
    setSubjects(subjectData || []);
    setGames(gameData || []);

    setLoading(false);

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.subject_id ||
      !form.title.trim() ||
      !form.description.trim()
    ) {

      setFormError("Please fill all required fields.");

      return;

    }

    if (Number(form.xp_reward) < 0) {

      setFormError("XP Reward cannot be negative.");

      return;

    }

    setFormError("");

    setLoading(true);

    const payload = {

      ...form,

      title: form.title.trim(),

      description: form.description.trim(),

      thumbnail: form.thumbnail.trim(),

      xp_reward: Number(form.xp_reward),

    };

   const result = editingId
  ? await updateGame(editingId, payload)
  : await createGame(payload); 

    if (result.error) {

      setFormError(result.error.message);

      setLoading(false);

      return;

    }

    setEditingId(null);

    setForm(emptyForm);

    await loadData();

  }
    function editGame(game) {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setEditingId(game.id);

    setForm({

      subject_id: game.subject_id,

      title: game.title,

      description: game.description,

      game_type: game.game_type,

      difficulty: game.difficulty,

      xp_reward: game.xp_reward,

      thumbnail: game.thumbnail || "",

    });

  }

  async function removeGame(id) {

    if (!window.confirm("Delete this game?")) return;

    setLoading(true);

    const { error } = await deleteGame(id);

    if (error) {

      alert(error.message);

      setLoading(false);

      return;

    }

    await loadData();

  }

  const filteredGames = games.filter((game) => {

    const subject = subjects.find(
      (s) => s.id === game.subject_id
    );

    const term = searchTerm.toLowerCase();

    return `
      ${game.title}
      ${game.description}
      ${game.game_type}
      ${game.difficulty}
      ${subject?.name || ""}
    `
      .toLowerCase()
      .includes(term);

  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredGames.length / itemsPerPage)
  );

  const startIndex = (page - 1) * itemsPerPage;

  const visibleGames = filteredGames.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="admin-page admin-games">

  {/* ================= HEADER ================= */}

  <div className="page-header">

    <div>
      <h1>🎮 Games Management</h1>
      <p>Manage educational games for every subject.</p>
    </div>

    <button
      type="button"
      className="primary-btn"
      onClick={loadData}
    >
      🔄 Refresh
    </button>

  </div>

  {/* ================= STATS ================= */}

  <div className="stats-grid">

    <div className="stat-card">
      <h3>{games.length}</h3>
      <span>Total Games</span>
    </div>

    <div className="stat-card">
      <h3>{subjects.length}</h3>
      <span>Total Subjects</span>
    </div>

    <div className="stat-card">
      <h3>{filteredGames.length}</h3>
      <span>Search Results</span>
    </div>

    <div className="stat-card">
      <h3>{totalPages}</h3>
      <span>Total Pages</span>
    </div>

  </div>

  {/* ================= FORM ================= */}

  <div className="card">

    <div className="subject-form-header">

      <h2>
        {editingId ? "✏️ Update Game" : "➕ Add New Game"}
      </h2>

      <p>Create educational games for students.</p>

    </div>

    <form
      className="subject-form game-form"
      onSubmit={handleSubmit}
    >

      <select
        value={form.subject_id}
        onChange={(e) =>
          setForm({
            ...form,
            subject_id: e.target.value,
          })
        }
      >
        <option value="">Select Subject</option>

        {subjects.map((subject) => (
          <option
            key={subject.id}
            value={subject.id}
          >
            {subject.name}
          </option>
        ))}

      </select>

      <input
        type="text"
        placeholder="Game Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Game Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <select
        value={form.game_type}
        onChange={(e) =>
          setForm({
            ...form,
            game_type: e.target.value,
          })
        }
      >
        <option value="Puzzle">🧩 Puzzle</option>
        <option value="Quiz">❓ Quiz Game</option>
        <option value="Memory">🧠 Memory</option>
        <option value="Matching">🔗 Matching</option>
        <option value="Word">🔤 Word Game</option>
      </select>

      <select
        value={form.difficulty}
        onChange={(e) =>
          setForm({
            ...form,
            difficulty: e.target.value,
          })
        }
      >
        <option value="Easy">🟢 Easy</option>
        <option value="Medium">🟡 Medium</option>
        <option value="Hard">🔴 Hard</option>
      </select>

      <input
        type="number"
        min="0"
        placeholder="XP Reward"
        value={form.xp_reward}
        onChange={(e) =>
          setForm({
            ...form,
            xp_reward: Number(e.target.value),
          })
        }
      />

      <input
        type="text"
        placeholder="Thumbnail URL"
        value={form.thumbnail}
        onChange={(e) =>
          setForm({
            ...form,
            thumbnail: e.target.value,
          })
        }
      />

      {formError && (
        <p className="form-error">
          {formError}
        </p>
      )}

      <button
        className="primary-btn"
        type="submit"
      >
        {editingId ? "Update Game" : "Add Game"}
      </button>

    </form>

  </div>

  {/* ================= SEARCH ================= */}

  <div className="table-toolbar">

    <input
      type="text"
      placeholder="🔍 Search Games..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <button
      type="button"
      className="ghost-btn"
      onClick={() => setSearchTerm("")}
    >
      Clear
    </button>

  </div>
    {/* ================= TABLE ================= */}

  {loading ? (

    <div className="table-skeleton">

      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>

    </div>

  ) : (

    <>

      <div className="table-container">

        <table className="subjects-table">

          <thead>

            <tr>

              <th>Thumbnail</th>
              <th>Subject</th>
              <th>Game</th>
              <th>Type</th>
              <th>Difficulty</th>
              <th>XP</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {visibleGames.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="empty-state"
                >
                  No games found.
                </td>

              </tr>

            ) : (

              visibleGames.map((game) => {

                const subject = subjects.find(
                  (s) => s.id === game.subject_id
                );

                return (

                  <tr key={game.id}>

                    <td>

                      {game.thumbnail ? (

                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="game-thumb"
                        />

                      ) : (

                        <div className="game-thumb placeholder">
                          🎮
                        </div>

                      )}

                    </td>

                    <td className="game-subject">
                      {subject?.name || "-"}
                    </td>

                    <td>

                      <div className="game-title">
                        {game.title}
                      </div>

                      <small className="game-description">
                        {game.description}
                      </small>

                    </td>

                    <td>

                      <span className="game-type">
                        {game.game_type}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`difficulty-badge ${game.difficulty.toLowerCase()}`}
                      >
                        {game.difficulty}
                      </span>

                    </td>

                    <td>

                      <span className="game-xp">
                        ⭐ {game.xp_reward}
                      </span>

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => editGame(game)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeGame(game.id)}
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

      {/* ================= PAGINATION ================= */}

      <div className="pagination">

        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Previous
        </button>

        <span>

          Page <strong>{page}</strong> of{" "}
          <strong>{totalPages}</strong>

        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>

      </div>

    </>

  )}

</div>

);
}