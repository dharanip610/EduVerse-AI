import { useState } from "react";
import "../../styles/science-adventure.css";

const questions = [
  {
    question: "Which planet is called the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "Water boils at?",
    options: ["50°C", "75°C", "100°C", "150°C"],
    answer: "100°C",
  },
  {
    question: "Plants prepare food by?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Evaporation"],
    answer: "Photosynthesis",
  },
  {
    question: "Which gas do humans breathe in?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
    answer: "Oxygen",
  },
  {
    question: "Force is measured in?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: "Newton",
  },
];

export default function ScienceAdventure() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function selectAnswer(option) {
    if (option === questions[current].answer) {
      setScore(score + 30);
    }

    if (current + 1 === questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  }

  if (finished) {
    return (
      <section className="science-page">
        <div className="science-result">
          <h1>🎉 Mission Completed!</h1>
          <h2>Science Adventure Finished</h2>
          <h3>🏆 XP Earned: {score}</h3>
          <p>Great Job, Scientist! 🧪</p>
        </div>
      </section>
    );
  }

  return (
    <section className="science-page">
      <div className="science-card">
        <h1>🧪 Science Adventure</h1>

        <h2>
          Question {current + 1} / {questions.length}
        </h2>

        <p>{questions[current].question}</p>

        <div className="science-options">
          {questions[current].options.map((option) => (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="science-progress">
          Progress: {current + 1}/{questions.length}
        </div>
      </div>
    </section>
  );
}