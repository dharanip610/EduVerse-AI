import "../../styles/otp.css";

export default function OTPVerification() {
  return (
    <section className="otp-page">

      <div className="otp-card">

        <div className="otp-icon">
          📩
        </div>

        <h1>Email Verification</h1>

        <p>
          Enter the 6-digit verification code sent to your email.
        </p>

        <div className="otp-inputs">

          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />
          <input maxLength="1" />

        </div>

        <button className="verify-btn">

          Verify OTP

        </button>

        <div className="otp-footer">

          <span>
            Didn't receive the code?
          </span>

          <a href="#">
            Resend OTP
          </a>

        </div>

      </div>

    </section>
  );
}