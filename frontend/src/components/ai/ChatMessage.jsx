import { motion } from "framer-motion";
import { FaRobot, FaUserCircle } from "react-icons/fa";

export default function ChatMessage({
  role,
  text,
  time,
}) {
  const isUser = role === "user";

  return (
    <motion.div
      className={`message ${isUser ? "user" : "assistant"}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {!isUser && (
        <div className="messageAvatar aiAvatar">
          <FaRobot />
        </div>
      )}

      <div className="messageContent">
        <div className="messageBubble">
          <p>{text}</p>
        </div>

        <span className="messageTime">
          {time}
        </span>
      </div>

      {isUser && (
        <div className="messageAvatar userAvatar">
          <FaUserCircle />
        </div>
      )}
    </motion.div>
  );
}