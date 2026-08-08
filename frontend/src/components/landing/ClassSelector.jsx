import "../../styles/classSelector.css";

const classes = [
  { grade: "Class 1", lessons: 24, games: 12 },
  { grade: "Class 2", lessons: 28, games: 15 },
  { grade: "Class 3", lessons: 32, games: 18 },
  { grade: "Class 4", lessons: 36, games: 20 },
  { grade: "Class 5", lessons: 40, games: 22 },
  { grade: "Class 6", lessons: 44, games: 24 },
  { grade: "Class 7", lessons: 48, games: 28 },
  { grade: "Class 8", lessons: 52, games: 30 },
  { grade: "Class 9", lessons: 60, games: 34 },
  { grade: "Class 10", lessons: 68, games: 38 },
  { grade: "Class 11", lessons: 75, games: 42 },
  { grade: "Class 12", lessons: 82, games: 48 },
];

export default function ClassSelector() {
  return (
    <section className="class-section" id="classes">

      <div className="section-title">

        <span>CHOOSE YOUR GRADE</span>

        <h2>
          Start Your Learning Journey
        </h2>

        <p>
          Select your class and unlock AI-powered lessons, quizzes,
          games and personalized learning.
        </p>

      </div>

      <div className="class-grid">

        {classes.map((item, index) => (

          <div className="class-card" key={index}>

            <div className="class-number">

              📚

            </div>

            <h3>{item.grade}</h3>

            <p>{item.lessons} Interactive Lessons</p>

            <p>{item.games} Learning Games</p>

            <button>
              Explore →
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}