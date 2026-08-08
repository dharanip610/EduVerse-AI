import "../../styles/testimonials.css";

const reviews = [
  {
    name: "Aarav",
    role: "Class 6 Student",
    rating: "★★★★★",
    review:
      "Learning with EduVerse AI feels like playing a game. I love earning XP and badges!"
  },
  {
    name: "Priya",
    role: "Parent",
    rating: "★★★★★",
    review:
      "The progress reports help me understand my child's strengths and weak areas."
  },
  {
    name: "Rahul",
    role: "Science Teacher",
    rating: "★★★★★",
    review:
      "AI-powered explanations and interactive quizzes make teaching much easier."
  },
  {
    name: "Meera",
    role: "Class 9 Student",
    rating: "★★★★★",
    review:
      "The AI Tutor explains difficult concepts in a simple and fun way."
  },
  {
    name: "Karthik",
    role: "Parent",
    rating: "★★★★★",
    review:
      "The dashboard is beautiful, and my son enjoys learning every day."
  },
  {
    name: "Ananya",
    role: "Class 11 Student",
    rating: "★★★★★",
    review:
      "Daily streaks and challenges motivate me to learn consistently."
  }
];

export default function Testimonials() {
  return (
    <section className="testimonial-section" id="leaderboard">

      <div className="section-title">

        <span>REVIEWS</span>

        <h2>Loved by Students, Parents & Teachers</h2>

        <p>
          Thousands of learners trust EduVerse AI to make education smarter,
          interactive and more enjoyable.
        </p>

      </div>

      <div className="testimonial-slider">

        {reviews.map((item, index) => (

          <div className="testimonial-card" key={index}>

           <div className="review-header">

    <h3>{item.name}</h3>

    <span>{item.role}</span>

</div>

            <div className="rating">
              {item.rating}
            </div>

            <p className="review">
              "{item.review}"
            </p>


          </div>

        ))}

      </div>

    </section>
  );
}