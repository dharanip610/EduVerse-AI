import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <div className="footer-logo">
            🎓 EduVerse AI
          </div>

          <p>
            Learn smarter with Artificial Intelligence, fun games,
            quizzes, rewards and personalized education for Classes 1–12.
          </p>

        </div>

        <div className="footer-links">

          <h3>Platform</h3>

          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">Classes</a>
          <a href="#">Games</a>

        </div>

        <div className="footer-links">

          <h3>Resources</h3>

          <a href="#">AI Tutor</a>
          <a href="#">Demo</a>
          <a href="#">Parents</a>
          <a href="#">Teachers</a>

        </div>

        <div className="footer-links">

          <h3>Support</h3>

          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help Center</a>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 EduVerse AI. All Rights Reserved.

      </div>

    </footer>
  );
}