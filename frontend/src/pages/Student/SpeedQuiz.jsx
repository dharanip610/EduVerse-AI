import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveGameXP } from "../../services/gameService";
import "../../styles/speedQuiz.css";

const QUESTIONS = [
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: "12" },
];
const SECONDS_PER_QUESTION = 30;
const XP_PER_CORRECT = 50;

export default function SpeedQuiz() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [saveError, setSaveError] = useState("");
  const submittedRef = useRef(false);
  const answeringRef = useRef(false);

  const finishGame = useCallback(async (finalScore) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setFinished(true);
    const { error } = await saveGameXP(user?.id, finalScore * XP_PER_CORRECT);
    if (error) setSaveError("Your score is saved locally, but XP could not be added. Please try again later.");
  }, [user]);

  const handleAnswer = useCallback((answer) => {
    if (finished || answeringRef.current) return;
    answeringRef.current = true;
    const isCorrect = answer === QUESTIONS[current].answer;
    const nextScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(nextScore);
      setCorrect((value) => value + 1);
    } else {
      setWrong((value) => value + 1);
    }

    if (current + 1 < QUESTIONS.length) {
      setCurrent((value) => value + 1);
      setSelected("");
      setTimeLeft(SECONDS_PER_QUESTION);
    } else {
      finishGame(nextScore);
    }
  }, [current, finished, score, finishGame]);

  useEffect(() => {
    if (finished) return undefined;
    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) handleAnswer("");
      else setTimeLeft((value) => value - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [finished, timeLeft, handleAnswer]);

  useEffect(() => {
    answeringRef.current = false;
  }, [current]);

  function retryGame() {
    submittedRef.current = false;
    setCurrent(0);
    setSelected("");
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setFinished(false);
    setTimeLeft(SECONDS_PER_QUESTION);
    setSaveError("");
  }

  const percentage = Math.round((score / QUESTIONS.length) * 100);
  const message = percentage >= 90 ? "🏆 Excellent!" : percentage >= 70 ? "🌟 Great Job!" : percentage >= 50 ? "👍 Good Work!" : "📚 Keep Practicing!";

  if (finished) {
    return (
      <section className="speed-quiz-page">
        <div className="speed-quiz-card">
          <h1>🎉 Quiz Completed</h1>
          <h2>Score: {score} / {QUESTIONS.length}</h2>
          <p>✅ Correct Answers: {correct}</p><p>❌ Wrong Answers: {wrong}</p><p>🎯 Percentage: {percentage}%</p>
          <h3>{message}</h3><p>⭐ XP Earned: {score * XP_PER_CORRECT}</p>{saveError && <p>{saveError}</p>}
          <button type="button" onClick={retryGame} className="speed-play-btn">🔄 Play Again</button>
          <button type="button" onClick={() => navigate("/games/word-puzzle")} className="speed-play-btn">Next Game</button>
        </div>
      </section>
    );
  }

  return (
    <section className="speed-quiz-page">
      <div className="speed-quiz-card">
        <div className="speed-quiz-header"><h1>Speed Quiz</h1><p className="speed-timer">Time Left: {timeLeft}s</p></div>
        <h2 className="speed-question">{QUESTIONS[current].question}</h2>
        <div className="speed-options">
          {QUESTIONS[current].options.map((option) => <button key={option} type="button" onClick={() => setSelected(option)} className={`speed-option-btn ${selected === option ? "selected" : ""}`}>{option}</button>)}
        </div>
        <button type="button" onClick={() => handleAnswer(selected)} disabled={!selected} className="speed-next-btn">{current === QUESTIONS.length - 1 ? "Finish" : "Next"}</button>
      </div>
    </section>
  );
}
