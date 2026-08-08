import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveGameXP } from "../../services/gameService";
import "../../styles/gamePlay.css";

const QUESTIONS = [
  { question: "8 + 7", answer: 15 },
  { question: "12 - 5", answer: 7 },
  { question: "6 × 4", answer: 24 },
  { question: "18 ÷ 3", answer: 6 },
];
const SECONDS_PER_QUESTION = 30;
const XP_PER_CORRECT = 30;

export default function MathChallenge() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTION);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [saveError, setSaveError] = useState("");
  const submittedRef = useRef(false);
  const advancingRef = useRef(false);
  const advanceTimeoutRef = useRef(null);

  const finishGame = useCallback(async (finalScore) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setFinished(true);
    const { error } = await saveGameXP(user?.id, finalScore * XP_PER_CORRECT);
    if (error) setSaveError("The challenge is complete, but XP could not be saved. Please try again later.");
  }, [user]);

  const submitAnswer = useCallback((value) => {
    if (finished || advancingRef.current) return;
    advancingRef.current = true;
    const numericAnswer = Number(value);
    const isCorrect = value.trim() !== "" && Number.isFinite(numericAnswer) && numericAnswer === QUESTIONS[current].answer;
    const nextScore = isCorrect ? score + 1 : score;
    setFeedback(isCorrect ? "Correct!" : `Correct answer: ${QUESTIONS[current].answer}`);
    if (isCorrect) setScore(nextScore);

    advanceTimeoutRef.current = window.setTimeout(() => {
      if (current + 1 < QUESTIONS.length) {
        setCurrent((value) => value + 1);
        setAnswer("");
        setFeedback("");
        setTimeLeft(SECONDS_PER_QUESTION);
      } else {
        finishGame(nextScore);
      }
    }, 500);
  }, [current, finished, score, finishGame]);

  useEffect(() => {
    if (finished) return undefined;
    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) submitAnswer("");
      else setTimeLeft((value) => value - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [finished, timeLeft, submitAnswer]);

  useEffect(() => { advancingRef.current = false; }, [current]);
  useEffect(() => () => window.clearTimeout(advanceTimeoutRef.current), []);

  function retryGame() {
    window.clearTimeout(advanceTimeoutRef.current);
    submittedRef.current = false;
    advancingRef.current = false;
    setCurrent(0); setAnswer(""); setScore(0); setTimeLeft(SECONDS_PER_QUESTION); setFinished(false); setFeedback(""); setSaveError("");
  }

  if (finished) return <section className="game-play-page"><div className="game-play-card"><h1>➗ Math Challenge Complete</h1><p>Score: {score} / {QUESTIONS.length}</p><p>⭐ XP Earned: {score * XP_PER_CORRECT}</p>{saveError && <p>{saveError}</p>}<div className="game-play-actions"><button type="button" className="game-play-action" onClick={retryGame}>Retry</button><button type="button" className="game-play-action" onClick={() => navigate("/games")}>Back to Games</button></div></div></section>;

  return (
    <section className="game-play-page"><div className="game-play-card">
      <div className="game-play-header"><div><h1>➗ Math Challenge</h1><p>Question {current + 1} of {QUESTIONS.length}</p></div><p className="game-play-timer">Time Left: {timeLeft}s</p></div>
      <h2 className="game-play-question">Solve: {QUESTIONS[current].question}</h2>
      <input className="game-play-input" type="number" inputMode="numeric" value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && answer.trim()) submitAnswer(answer); }} placeholder="Type your answer" aria-label="Your answer" />
      <p className="game-play-status" aria-live="polite">{feedback}</p><button type="button" className="game-play-action" onClick={() => submitAnswer(answer)} disabled={!answer.trim()}>Submit Answer</button>
    </div></section>
  );
}
