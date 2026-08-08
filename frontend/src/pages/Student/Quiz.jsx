import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import {
  getQuiz,
  submitQuiz,
  createCertificate,
} from "../../services/studentService";

import "../../styles/quiz.css";

export default function Quiz() {

  const { lessonId } = useParams();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [lessonId]);

  async function loadQuiz() {
    setLoading(true);
    const { data, error } = await getQuiz(lessonId);
    if (error) {
      console.error(error);
      setQuestions([]);
      setLoading(false);
      return;
    }
    setQuestions(data || []);
    setLoading(false);
  }

  useEffect(() => {
    if (score !== null) return;
    if (timeLeft === 0) {
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1);
        setTimeLeft(30);
      } else {
        finishQuiz();
      }
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, current, score, questions.length]);

  function selectAnswer(option) {
    setAnswers((prev) => ({ ...prev, [current]: option }));
    setChecked(false);
    setIsCorrect(false);
  }

  function checkAnswer() {
    const correct = answers[current] === questions[current].correct_answer;
    setIsCorrect(correct);
    setChecked(true);
  }

  async function finishQuiz() {
    let marks = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        marks++;
      }
    });
    setScore(marks);
    setCorrectCount(marks);
    setWrongCount(questions.length - marks);

    if (user) {
  await submitQuiz(user.id, lessonId, marks);

const percentage = Math.round((marks / questions.length) * 100);

if (percentage >= 80) {
  const { data, error } = await createCertificate({
    student_id: user.id,
    course_name: "Quiz Completion",
    subject: "General",
    score: percentage,
    grade: percentage >= 90 ? "A+" : "A",
    certificate_id: crypto.randomUUID(),
    status: "Issued",
  });

  console.log("Certificate Data:", data);
  console.log("Certificate Error:", error);
}  
    }
  }

  if (loading) {
    return (
      <section className="quiz-page">
        <div className="quiz-state-card" role="status">
          <span className="quiz-state-orb" />
          <h2>Preparing your quiz</h2>
          <p>Loading the next learning challenge...</p>
        </div>
      </section>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="quiz-page">
        <div className="quiz-state-card quiz-empty-state">
          <Sparkles size={30} aria-hidden="true" />
          <h2>No quiz available yet</h2>
          <p>This lesson doesn't have any quiz questions yet.</p>
        </div>
      </section>
    );
  }

  if (!questions[current]) {
    return (
      <section className="quiz-page">
        <div className="quiz-state-card" role="status">
          <span className="quiz-state-orb" />
          <h2>Loading question...</h2>
        </div>
      </section>
    );
  }

  const question = questions[current];

  return (
    <section className="quiz-page">
      <div className="quiz-container">
        <header className="quiz-topbar">
          <div className="quiz-brand">
            <div className="quiz-brand-icon" aria-hidden="true"><Sparkles size={20} /></div>
            <div>
              <p className="quiz-eyebrow">Learning checkpoint</p>
              <h1>Quiz Challenge</h1>
            </div>
          </div>
          <div className="quiz-timer" aria-label={`${timeLeft} seconds remaining`}>
            <Clock3 size={19} aria-hidden="true" />
            <span>{timeLeft}s</span>
          </div>
        </header>

        <div className="quiz-progress-panel">
          <div className="quiz-progress-copy">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{Math.round(((current + 1) / questions.length) * 100)}% complete</span>
          </div>
          <div className="quiz-progress" aria-label="Quiz progress">
            <div className="quiz-progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="quiz-card">
          {score === null && (
            <div className="question-card">
              <div className="question-number">Question {String(current + 1).padStart(2, "0")}</div>
              <h2 className="quiz-question">{question.question}</h2>

              <div className="options">
                {[question.option_a, question.option_b, question.option_c, question.option_d].map((option, index) => (
                  <button
                    key={option}
                    className={`quiz-option ${answers[current] === option ? "selected" : ""}`}
                    onClick={() => selectAnswer(option)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span>{option}</span>
                    <span className="option-check" aria-hidden="true"><Check size={18} /></span>
                  </button>
                ))}
              </div>

              {checked && (
                <div className={isCorrect ? "correct-msg" : "wrong-msg"}>
                  {isCorrect ? (<><CheckCircle2 size={21} aria-hidden="true" /> Correct answer — nicely done!</>) : (
                    <><XCircle size={21} aria-hidden="true" /><span>Not quite. The correct answer is <b>{question.correct_answer}</b>.</span></>
                  )}
                </div>
              )}

              <div className="quiz-actions">
                <button className="quiz-action quiz-action-primary" onClick={checkAnswer} disabled={!answers[current] || checked}><Check size={18} aria-hidden="true" /> Check answer</button>
                {current > 0 && (
                  <button className="quiz-action quiz-action-secondary" onClick={() => { setCurrent(current - 1); setTimeLeft(30); setChecked(false); setIsCorrect(false); }}><ArrowLeft size={18} aria-hidden="true" /> Previous</button>
                )}
                {current < questions.length - 1 ? (
                  <button className="quiz-action quiz-action-next" onClick={() => { setCurrent(current + 1); setTimeLeft(30); }} disabled={!answers[current]}>Next <ArrowRight size={18} aria-hidden="true" /></button>
                ) : (
                  <button className="quiz-action quiz-action-next" onClick={finishQuiz} disabled={!answers[current]}><Trophy size={18} aria-hidden="true" /> Finish quiz</button>
                )}
              </div>
            </div>
          )}

          {score !== null && (
            <div className="result-card">
              <div className="result-trophy" aria-hidden="true"><Trophy size={34} /></div>
              <p className="quiz-eyebrow">Quiz complete</p>
              <h2>Great effort!</h2>
              <p className="result-description">Here’s a clear view of how you did on this learning checkpoint.</p>
              <div className="result-score"><strong>{score}</strong><span> / {questions.length}</span><small>{Math.round((score / questions.length) * 100)}% score</small></div>

              <div className="result-stats">
                <div><span className="stat-icon xp-icon">✦</span><p>XP earned</p><strong>{score * 10}</strong></div>
                <div><span className="stat-icon correct-icon"><Check size={16} /></span><p>Correct</p><strong>{correctCount}</strong></div>
                <div><span className="stat-icon wrong-icon"><XCircle size={16} /></span><p>To revisit</p><strong>{wrongCount}</strong></div>
              </div>

              <div className="result-actions">
                <button className="retry-btn" onClick={() => { setCurrent(0); setAnswers({}); setScore(null); setTimeLeft(30); setChecked(false); setIsCorrect(false); }}><RotateCcw size={18} aria-hidden="true" /> Retry quiz</button>
                <button className="review-btn" onClick={() => setShowReview(!showReview)}>{showReview ? "Hide review" : "Review answers"}<ArrowRight size={18} aria-hidden="true" /></button>
              </div>

              {showReview && (
                <section className="review-table">
                  <div className="review-heading">
                    <div><p className="quiz-eyebrow">Answer breakdown</p><h3>Review your answers</h3></div>
                    <span>{correctCount} of {questions.length} correct</span>
                  </div>
                  <div className="review-list">
                    {questions.map((q, index) => {
                      const correct = answers[index] === q.correct_answer;
                      return (
                        <article className={`review-item ${correct ? "is-correct" : "is-wrong"}`} key={q.id || index}>
                          <div className="review-status">{correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}</div>
                          <div className="review-content">
                            <p className="review-question-number">Question {index + 1}</p>
                            <h4>{q.question}</h4>
                            <div className="review-answers"><p><span>Your answer</span>{answers[index] || "-"}</p><p><span>Correct answer</span>{q.correct_answer}</p></div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
