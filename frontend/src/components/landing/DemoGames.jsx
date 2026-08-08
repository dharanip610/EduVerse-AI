import "../../styles/demoGames.css";

const games = [
  {
    emoji: "🧠",
    title: "Memory Match",
    desc: "Improve memory with exciting matching cards."
  },
  {
    emoji: "➕",
    title: "Math Race",
    desc: "Solve math problems and race to the finish."
  },
  {
    emoji: "🧩",
    title: "Puzzle Quest",
    desc: "Boost logical thinking through puzzles."
  },
  {
    emoji: "🌍",
    title: "Word Builder",
    desc: "Learn vocabulary while playing."
  },
  {
    emoji: "🧪",
    title: "Science Lab",
    desc: "Perform virtual science experiments."
  },
  {
    emoji: "🤖",
    title: "AI Challenge",
    desc: "Challenge the AI Tutor with interesting questions."
  }
];

export default function DemoGames() {
  return (
    <section className="games-section" id="games">

      <div className="section-title">

        <span>GAME ZONE</span>

        <h2>Learn Through Fun Games</h2>

        <p>
          Every lesson becomes an adventure with interactive educational games.
        </p>

      </div>

      <div className="games-slider">

        {games.map((game, index) => (

          <div className="game-card" key={index}>

            <div className="game-icon">

              {game.emoji}

            </div>

            <h3>{game.title}</h3>

            <p>{game.desc}</p>

            <button>
              Play Now →
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}