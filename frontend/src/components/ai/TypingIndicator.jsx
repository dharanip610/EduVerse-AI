import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function TypingIndicator() {
  return (
    <motion.div
      className="message assistant typingMessage"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="messageAvatar aiAvatar">
        <FaRobot />
      </div>

      <div className="messageContent">
        <div className="messageBubble typingBubble">
          <span className="typingDot"></span>
          <span className="typingDot"></span>
          <span className="typingDot"></span>
        </div>

        <span className="messageTime">
          EduVerse AI is typing...
        </span>
      </div>
    </motion.div>
  );
}