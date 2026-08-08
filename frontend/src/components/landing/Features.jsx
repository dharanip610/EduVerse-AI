import "../../styles/features.css";

const features = [
  {
    icon: "🤖",
    title: "AI Smart Tutor",
    description:
      "Your personal AI teacher explains every concept in a simple and interactive way."
  },
  {
    icon: "🎮",
    title: "Gamified Learning",
    description:
      "Every lesson is transformed into exciting games, quizzes and fun challenges."
  },
  {
    icon: "🏆",
    title: "XP, Badges & Rewards",
    description:
      "Earn XP, unlock badges, maintain streaks and climb the leaderboard."
  },
  {
    icon: "📊",
    title: "Smart Progress Tracking",
    description:
      "AI generates detailed reports to monitor learning performance and improvements."
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parent Dashboard",
    description:
      "Parents can monitor attendance, scores, achievements and weekly progress."
  },
  {
    icon: "🎤",
    title: "Voice AI Assistant",
    description:
      "Talk naturally with the AI tutor and receive instant voice-based explanations."
  }
];

export default function Features() {
  return (
    <section className="features" id="subjects">

      <div className="section-title">

        <span>✨ WHY EDUVERSE AI</span>

        <h2>Everything Students Need in One Platform</h2>

        <p>
          Learn with Artificial Intelligence, exciting games, quizzes,
          achievements and personalized learning experiences.
        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>
  );
}