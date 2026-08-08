import { useState } from "react";
import "../../styles/games.css";
import { useNavigate } from "react-router-dom";
const games = [
  {
    title: "Memory Match",
    icon: "🧩",
    xp: "+50 XP",
    description: "Match cards and improve your memory."
  },
  {
    title: "Speed Quiz",
    icon: "⚡",
    xp: "+100 XP",
    description: "Answer quickly before the timer ends."
  },
  {
    title: "Word Puzzle",
    icon: "🔤",
    xp: "+75 XP",
    description: "Arrange letters to form the correct word."
  },
  {
    title: "Math Challenge",
    icon: "➗",
    xp: "+120 XP",
    description: "Solve math problems against the clock."
  },
  {
    title: "Science Adventure",
    icon: "🧪",
    xp: "+150 XP",
    description: "Explore science through fun missions."
  },
  {
    title: "Spin & Learn",
    icon: "🎯",
    xp: "+80 XP",
    description: "Spin the wheel and answer random questions."
  }
];

export default function Games() {
const navigate = useNavigate(); 
  const [selectedGame, setSelectedGame] = useState(null);
  return (
    <section className="games-page">

      <div className="games-header">

        <div>

          <h1>🎮 Learning Games</h1>

          <p>
            Play, Learn and Earn XP while having fun.
          </p>

        </div>

      </div>

      <div className="games-grid">

        {games.map((game, index) => (

          <div
            className="game-card"
            key={index}
          >

            <div className="game-icon">
              {game.icon}
            </div>

            <h2>{game.title}</h2>

            <p>{game.description}</p>

            <span>{game.xp}</span>

        <button
  onClick={() => setSelectedGame(game)}
>
  ▶ Play Now
</button>

          </div>
          

        ))}
        {selectedGame && (

  <div
    className="game-modal-overlay"
    onClick={() => setSelectedGame(null)}
  >

    <div
      className="game-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <h2>{selectedGame.icon} {selectedGame.title}</h2>

      <p>{selectedGame.description}</p>

      <h3>{selectedGame.xp}</h3>

     <button
  className="play-game-btn"
  onClick={() => {

switch (selectedGame.title) {

  case "Memory Match":
    navigate("/games/memory");
    break;

  case "Speed Quiz":
    navigate("/games/speed-quiz");
    break;

  case "Word Puzzle":
    navigate("/games/word-puzzle");
    break;

  case "Math Challenge":
    navigate("/games/math");
    break;

 case "Science Adventure":
  console.log("Science");
  navigate("/games/science");
  return;
  
 case "Spin & Learn":
  console.log("Spin");
  navigate("/games/spin");
  return;

default:
  navigate("/games/coming-soon");
}

  }}
>
  ▶ Start Game
</button> 

      <button
        className="close-modal-btn"
        onClick={() => setSelectedGame(null)}
      >
        ✖ Close
      </button>

    </div>

  </div>

)}

      </div>

    </section>
  );
}