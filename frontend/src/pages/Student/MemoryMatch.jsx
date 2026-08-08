import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { saveGameXP } from "../../services/gameService";
import "../../styles/memoryMatch.css";

const CARD_VALUES = ["➕", "🔤", "🧪", "🌍"];
const MEMORY_XP = 50;

function createBoard() {
  return [...CARD_VALUES, ...CARD_VALUES]
    .map((emoji, index) => ({ id: `${emoji}-${index}`, emoji }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryMatch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState(createBoard);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [locked, setLocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [saveError, setSaveError] = useState("");
  const submittedRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (gameWon) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [gameWon]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  async function completeGame() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setGameWon(true);

    const { error } = await saveGameXP(user?.id, MEMORY_XP);
    if (error) {
      setSaveError("Your game is complete, but XP could not be saved. Please try again later.");
    }
  }

  function handleCardClick(card) {
    if (locked || gameWon || matched.includes(card.id) || flipped.some((item) => item.id === card.id)) {
      return;
    }

    const nextFlipped = [...flipped, card];
    setFlipped(nextFlipped);

    if (nextFlipped.length !== 2) return;

    setMoves((value) => value + 1);
    setLocked(true);
    const [first, second] = nextFlipped;

    if (first.emoji === second.emoji) {
      const nextMatched = [...matched, first.id, second.id];
      setMatched(nextMatched);
      setFlipped([]);
      setLocked(false);
      if (nextMatched.length === cards.length) completeGame();
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setFlipped([]);
      setLocked(false);
    }, 800);
  }

  function retryGame() {
    window.clearTimeout(timeoutRef.current);
    submittedRef.current = false;
    setCards(createBoard());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
    setLocked(false);
    setGameWon(false);
    setSaveError("");
  }

  return (
    <section className="memory-page">
      <h1>🧩 Memory Match</h1>
      <p>Match all the cards to earn XP.</p>
      <p>Moves: {moves} · Time: {seconds}s</p>

      <div className="memory-board">
        {cards.map((card) => {
          const visible = flipped.some((item) => item.id === card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              className="memory-card"
              onClick={() => handleCardClick(card)}
              disabled={locked || matched.includes(card.id) || gameWon}
              aria-label={visible ? `Card ${card.emoji}` : "Hidden memory card"}
            >
              {visible ? card.emoji : "❓"}
            </button>
          );
        })}
      </div>

      {gameWon && (
        <div className="memory-win-overlay">
          <div className="memory-win-card">
            <h1>🎉 Congratulations!</h1>
            <p>You completed the Memory Match Game in {moves} moves and {seconds} seconds.</p>
            <h2>⭐ +{MEMORY_XP} XP Earned</h2>
            {saveError && <p>{saveError}</p>}
            <button className="play-again-btn" type="button" onClick={retryGame}>🔄 Play Again</button>
            <button className="play-again-btn" type="button" onClick={() => navigate("/games/speed-quiz")}>Next Game</button>
          </div>
        </div>
      )}
    </section>
  );
}
