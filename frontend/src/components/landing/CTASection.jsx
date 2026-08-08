import "../../styles/ctaSection.css";

export default function CTASection() {
  return (
   <section id="ai" className="cta-section">

      <div className="cta-card">

        <span className="cta-badge">
          🚀 Start Your AI Learning Journey
        </span>

        <h2>
          Learn Smarter with EduVerse AI
        </h2>

        <p>
          Join thousands of students learning through AI, games,
          quizzes, rewards and interactive lessons.
        </p>

        <div className="cta-buttons">

          <button className="cta-primary">
            🚀 Start Learning
          </button>

          <button className="cta-secondary">
            ▶ Watch Demo
          </button>

        </div>

        <div className="cta-stats">

          <div>
            <h3>25K+</h3>
            <span>Students</span>
          </div>

          <div>
            <h3>120+</h3>
            <span>Games</span>
          </div>

          <div>
            <h3>500+</h3>
            <span>Lessons</span>
          </div>

          <div>
            <h3>4.9★</h3>
            <span>Rating</span>
          </div>

        </div>

      </div>

    </section>
  );
}