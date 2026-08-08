import { FaPaperPlane } from "react-icons/fa";

export default function ChatInput({
  input,
  setInput,
  onSend,
  disabled = false,
}) {
  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <div className="chatInputWrapper">
      <div className="chatInputBox">

        <textarea
          className="chatInput"
          rows={1}
          placeholder="Ask EduVerse AI anything..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        <button
          className="sendBtn"
          type="button"
          onClick={onSend}
          disabled={disabled || !input.trim()}
          aria-label="Send Message"
        >
          <FaPaperPlane />
        </button>

      </div>

      <p className="chatInputHint">
        Press <strong>Enter</strong> to send •
        <strong> Shift + Enter</strong> for a new line
      </p>
    </div>
  );
}