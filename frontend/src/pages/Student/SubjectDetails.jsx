import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getSubject,
  getChapters
} from "../../services/studentService";

import "../../styles/subject-details.css";

export default function SubjectDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    loadSubject();
  }, [id]);

  async function loadSubject() {

    const { data: subjectData } = await getSubject(id);
    const { data: chapterData } = await getChapters(id);

    setSubject(subjectData);
    setChapters(chapterData || []);

  }

  return (

    <section className="subject-details">

      {/* Header */}

      <div className="subject-header">

        <div className="subject-info">

          <div className="subject-icon-large">

            {subject?.icon || "📚"}

          </div>

          <div>

            <h1>

              {subject?.name || "Subject"}

            </h1>

            <p>

              {subject?.description ||
                "Start learning with interactive lessons, AI explanations and quizzes."}

            </p>

            <div className="subject-meta">

              <span>📖 {chapters.length} Chapters</span>

              <span>⏱ 3 Hours</span>

              <span>⭐ Beginner Friendly</span>

            </div>

          </div>

        </div>

        <button
          className="continue-btn"
          onClick={() => {
            if (chapters.length > 0) {
              navigate(`/lesson/${chapters[0].id}`);
            }
          }}
        >
          ▶ Continue Learning
        </button>

      </div>

      {/* Progress */}

      <div className="progress-card">

        <div className="progress-top">

          <h3>Your Progress</h3>

          <span>45%</span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: "45%" }}
          ></div>

        </div>

      </div>

      {/* Stats */}

      <div className="subject-stats">

        <div className="stat-card">

          <h2>{chapters.length}</h2>

          <span>Total Chapters</span>

        </div>

        <div className="stat-card">

          <h2>15</h2>

          <span>Lessons</span>

        </div>

        <div className="stat-card">

          <h2>5</h2>

          <span>Quizzes</span>

        </div>

        <div className="stat-card">

          <h2>3</h2>

          <span>Games</span>

        </div>

      </div>

      {/* Chapters */}

      <h2 className="chapter-title">

        📚 Course Chapters

      </h2>

      <div className="chapter-grid">

        {chapters.length === 0 ? (

          <div className="empty-state">

            <h2>No Chapters Available</h2>

            <p>
              Chapters will appear once the admin uploads content.
            </p>

          </div>

        ) : (

          chapters.map((chapter, index) => (

            <div
              key={chapter.id}
              className="chapter-card"
            >

              <div className="chapter-top">

                <div className="chapter-number">

                  {index + 1}

                </div>

                <span className="chapter-status">

                  Ready

                </span>

              </div>

              <h2>

                {chapter.title}

              </h2>

              <p>

                {chapter.description}

              </p>

              <div className="chapter-footer">

                <span>

                  ⏱ 20 mins

                </span>

                <button
                  onClick={() =>
                    navigate(`/lesson/${chapter.id}`)
                  }
                >
                  Start →

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );

}