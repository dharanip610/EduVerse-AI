import { useState } from "react";
import "../../styles/admin-add-quiz.css";

export default function AdminAddQuiz() {

  const [quiz, setQuiz] = useState({
    subject: "",
    chapter: "",
    lesson: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
  });

  function handleChange(e) {
    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Quiz Added Successfully ✅");

    console.log(quiz);

    setQuiz({
      subject: "",
      chapter: "",
      lesson: "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
    });
  }

  return (
    <div className="admin-page admin-quiz">

      <h1>📝 Add Quiz</h1>

      <form onSubmit={handleSubmit}>

        <select
          name="subject"
          value={quiz.subject}
          onChange={handleChange}
          required
        >
          <option value="">Select Subject</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>Tamil</option>
        </select>

        <input
          type="text"
          name="chapter"
          placeholder="Chapter"
          value={quiz.chapter}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lesson"
          placeholder="Lesson"
          value={quiz.lesson}
          onChange={handleChange}
          required
        />

        <textarea
          name="question"
          placeholder="Question"
          value={quiz.question}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="optionA"
          placeholder="Option A"
          value={quiz.optionA}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="optionB"
          placeholder="Option B"
          value={quiz.optionB}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="optionC"
          placeholder="Option C"
          value={quiz.optionC}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="optionD"
          placeholder="Option D"
          value={quiz.optionD}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="answer"
          placeholder="Correct Answer"
          value={quiz.answer}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Save Quiz
        </button>

      </form>

    </div>
  );
}