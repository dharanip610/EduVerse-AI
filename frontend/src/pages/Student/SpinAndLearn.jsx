import { useState } from "react";
import "../../styles/spin-and-learn.css";

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Chennai", "Mumbai", "New Delhi", "Kolkata"],
    answer: "New Delhi",
  },
  {
    question: "2 + 8 = ?",
    options: ["8", "9", "10", "12"],
    answer: "10",
  },
  {
    question: "Which animal is called King of the Jungle?",
    options: ["Tiger", "Elephant", "Lion", "Bear"],
    answer: "Lion",
  },
  {
    question: "How many days are there in a week?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
];

export default function SpinAndLearn() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  function choose(option) {
    if (option === questions[current].answer) {
      setScore((s) => s + 20);
    }

    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      alert(`🎉 Game Finished!\nXP Earned: ${score + (option === questions[current].answer ? 20 : 0)}`);
    }
  }

  return (
    <section className="spin-page">
      <div className="spin-card">
        {!started ? (
          <>
            <h1>🎯 Spin & Learn</h1>
            <p>Press the button to spin and start the challenge.</p>

            <button
              className="spin-btn"
              onClick={() => setStarted(true)}
            >
              🎡 Spin Now
            </button>
          </>
        ) : (
          <>
            <h2>
              Question {current + 1} / {questions.length}
            </h2>

            <h3>{questions[current].question}</h3>

            {questions[current].options.map((option) => (
              <button
                key={option}
                className="option-btn"
                onClick={() => choose(option)}
              >
                {option}
              </button>
            ))}

            <p>⭐ XP : {score}</p>
          </>
        )}
      </div>
    </section>
  );
}