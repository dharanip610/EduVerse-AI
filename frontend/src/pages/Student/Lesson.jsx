import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getLessons } from "../../services/studentService";

import "../../styles/lesson.css";

export default function Lesson() {

    const { chapterId } = useParams();

    const navigate = useNavigate();

    const [lessons, setLessons] = useState([]);

    useEffect(() => {

        loadLessons();

    }, [chapterId]);

    async function loadLessons() {

        const { data, error } = await getLessons(chapterId);

        if (error) {

            console.log(error);

            return;

        }

        setLessons(data || []);

    }

    return (

        <section className="lesson-page">

            {/* Hero */}

            <div className="lesson-header">

                <div>

                    <h1>📚 Interactive Lessons</h1>

                    <p>

                        Learn through AI explanations, quizzes,
                        games and interactive activities.

                    </p>

                </div>

                <button className="progress-btn">

                    🔥 Continue Learning

                </button>

            </div>

            {/* Stats */}

            <div className="lesson-stats">

                <div className="lesson-stat">

                    <h2>{lessons.length}</h2>

                    <span>Total Lessons</span>

                </div>

                <div className="lesson-stat">

                    <h2>12</h2>

                    <span>Completed</span>

                </div>

                <div className="lesson-stat">

                    <h2>87%</h2>

                    <span>Progress</span>

                </div>

                <div className="lesson-stat">

                    <h2>150 XP</h2>

                    <span>Reward</span>

                </div>

            </div>

            {/* Lessons */}

            <div className="lesson-grid">

                {lessons.length === 0 ? (

                    <div className="empty-lessons">

                        <h2>No Lessons Available</h2>

                        <p>

                            Lessons will appear once the admin uploads them.

                        </p>

                    </div>

                ) : (

                    lessons.map((lesson, index) => (

                        <div
                            key={lesson.id}
                            className="lesson-card"
                        >

                            <div className="lesson-top">

                                <div className="lesson-number">

                                    {index + 1}

                                </div>

                                <span className="lesson-status">

                                    Ready

                                </span>

                            </div>

                            <h2>

                                {lesson.title}

                            </h2>

                            <p>

                                {lesson.content}

                            </p>

                            <div className="lesson-info">

                                <span>

                                    ⏱ {lesson.duration} mins

                                </span>

                                <span>

                                    ⭐ +25 XP

                                </span>

                            </div>

                            <div className="lesson-actions">

                                <button
                                    className="ai-btn"
                                    onClick={() =>
                                        navigate(`/ai-tutor/${lesson.id}`)
                                    }
                                >
                                    🤖 AI Tutor
                                </button>

                                <button
                                    className="quiz-btn"
                                    onClick={() =>
                                        navigate(`/quiz/${lesson.id}`)
                                    }
                                >
                                    📝 Quiz
                                </button>

                            <button
  className="game-btn"
  onClick={() => navigate("/games")}
>
  🎮 Game
</button>   

                            </div>

                        </div>

                    ))

                )}

            </div>

        </section>

    );

}