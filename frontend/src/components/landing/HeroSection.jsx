import "../../styles/hero.css";
import { useNavigate } from "react-router-dom";
const stats = [
  { value: "25K+", label: "Students" },
  { value: "500+", label: "Lessons" },
  { value: "120+", label: "Games" },
  { value: "4.9★", label: "Rating" }
];

const floatingCards = [
  "🤖 AI Tutor",
  "🎮 Gamified Learning",
  "🏆 XP Rewards",
  "🔥 Daily Streak",
  "📚 Smart Notes",
  "🎤 Voice Learning",
  "🧠 AI Quiz",
  "🌍  English",
  "🏅 Weekly Rank",
];

export default function HeroSection() {
  return (
    <section id="home" className="hero">

      <div className="hero-bg"></div>
      <div className="hero-bg hero-bg-two"></div>

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <div className="hero-badge">

            🚀 India's Next Generation AI Learning Platform

          </div>

          <h1>

            Learn Smarter.

            <br />

            Play Better.

            <br />

            <span>Grow with AI.</span>

          </h1>

          <p>

            EduVerse AI helps students from Classes 1–12
            learn through Artificial Intelligence,
            interactive games, quizzes,
            rewards, voice learning,
            personalized notes
            and real-time progress tracking.

          </p>

          <div className="hero-buttons">

            <button
  className="primary-btn"
  onClick={() => navigate("/signup")}
>
  🚀 Start Learning
</button>

            <button className="secondary-btn">

              ▶ Watch Demo

            </button>

          </div>

          <div className="hero-stats">

            {stats.map((item, index) => (

              <div className="stat-card" key={index}>

                <h2>{item.value}</h2>

                <span>{item.label}</span>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT START */}
                <div className="hero-right">

          <div className="chat-window">

            <div className="chat-header">

              <div className="chat-avatar">
                🤖
              </div>

              <div className="chat-info">
                <h3>EduVerse AI Assistant</h3>
                <span>● Online • Ready to Help</span>
              </div>

            </div>

            <div className="chat-body">

              <div className="message user">
                👋 Hi AI, explain Photosynthesis.
              </div>

              <div className="message ai">
                🌱 Photosynthesis is the process by which green plants use
                sunlight, water and carbon dioxide to prepare food and release
                oxygen.
              </div>

              <div className="message user">
                Give me a quick quiz.
              </div>

              <div className="message ai">

                <strong>AI Quiz</strong>

                <br /><br />

                Which gas do plants absorb?

                <div className="quiz-options">

                  <button>A. Oxygen</button>

                  <button>B. Nitrogen</button>

                  <button>C. Carbon Dioxide ✅</button>

                  <button>D. Hydrogen</button>

                </div>

              </div>

              <div className="typing">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

            <div className="chat-footer">

              <button>
                🎤 Voice
              </button>

              <button>
                📝 Notes
              </button>

              <button>
                🎮 Quiz
              </button>

            </div>

          </div>

          {/* Floating Cards */}

          <div className="floating-wrapper">

            {floatingCards.map((item, index) => (

              <div
                key={index}
                className={`floating-card floating-${index + 1}`}
              >

                {item}

              </div>

            ))}

          </div>

          {/* Achievement Cards */}

          <div className="achievement-card achievement-one">

            🏆

            <h4>+150 XP</h4>

            <span>Today's Reward</span>

          </div>

          <div className="achievement-card achievement-two">

            🔥

            <h4>15 Days</h4>

            <span>Learning Streak</span>

          </div>

          <div className="achievement-card achievement-three">

            ⭐

            <h4>Rank #3</h4>

            <span>Leaderboard</span>

          </div>

        </div>

        {/* RIGHT END */}
                {/* Bottom Hero Content */}

      </div>

      <div className="hero-bottom">
      <div className="trusted-section">

  <h3 className="trusted-title">
    Trusted by Students, Parents & Schools
  </h3>

  <div className="trusted-logos">

    <div className="logo-pill">CBSE</div>
    <div className="logo-pill">State Board</div>
    <div className="logo-pill">ICSE</div>
    <div className="logo-pill">AI Learning</div>
    <div className="logo-pill">Smart Education</div>

  </div>

</div>
        

        <div className="feature-scroll">

          <div className="feature-track">

            {[
              ...floatingCards,
              ...floatingCards
            ].map((item, index) => (

              <div
                key={index}
                className="feature-pill"
              >

                {item}

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  );
}