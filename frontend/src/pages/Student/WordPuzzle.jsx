import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveGameXP } from "../../services/gameService";
import "../../styles/gamePlay.css";

const PUZZLES = [
  { scrambled: "C E I N C S", answer: "SCIENCE", hint: "A school subject about the natural world." },
  { scrambled: "T H A M", answer: "MATH", hint: "A subject involving numbers and calculations." },
  { scrambled: "P L A N E T", answer: "PLANET", hint: "Earth is one of these." },
];
const SECONDS_PER_PUZZLE = 30;
const XP_PER_CORRECT = 25;

export default function WordPuzzle() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_PUZZLE);
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
    if (error) setSaveError("The puzzle is complete, but XP could not be saved. Please try again later.");
  }, [user]);

  const submitAnswer = useCallback((value) => {
    if (finished || advancingRef.current) return;
    advancingRef.current = true;
    const isCorrect = value.trim().toUpperCase() === PUZZLES[current].answer;
    const nextScore = isCorrect ? score + 1 : score;
    setFeedback(isCorrect ? "Correct!" : `Correct answer: ${PUZZLES[current].answer}`);
    if (isCorrect) setScore(nextScore);

    advanceTimeoutRef.current = window.setTimeout(() => {
      if (current + 1 < PUZZLES.length) {
        setCurrent((value) => value + 1);
        setAnswer("");
        setFeedback("");
        setTimeLeft(SECONDS_PER_PUZZLE);
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
    setCurrent(0); setAnswer(""); setScore(0); setTimeLeft(SECONDS_PER_PUZZLE); setFinished(false); setFeedback(""); setSaveError("");
  }

  if (finished) return <section className="game-play-page"><div className="game-play-card"><h1>🔤 Word Puzzle Complete</h1><p>Score: {score} / {PUZZLES.length}</p><p>⭐ XP Earned: {score * XP_PER_CORRECT}</p>{saveError && <p>{saveError}</p>}<div className="game-play-actions"><button type="button" className="game-play-action" onClick={retryGame}>Retry</button><button type="button" className="game-play-action" onClick={() => navigate("/games/math")}>Next Game</button></div></div></section>;

  const puzzle = PUZZLES[current];
  return (
    <section className="game-play-page"><div className="game-play-card">
      <div className="game-play-header"><div><h1>🔤 Word Puzzle</h1><p>Puzzle {current + 1} of {PUZZLES.length}</p></div><p className="game-play-timer">Time Left: {timeLeft}s</p></div>
      <h2 className="game-play-question">Unscramble: {puzzle.scrambled}</h2><p>Hint: {puzzle.hint}</p>
      <input className="game-play-input" value={answer} onChange={(event) => setAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && answer.trim()) submitAnswer(answer); }} placeholder="Type the word" aria-label="Your answer" autoComplete="off" />
      <p className="game-play-status" aria-live="polite">{feedback}</p><button type="button" className="game-play-action" onClick={() => submitAnswer(answer)} disabled={!answer.trim()}>Submit Answer</button>
    </div></section>
  );
}
