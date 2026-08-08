import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function AIAvatar() {
  return (
    <motion.div
      className="aiAvatar"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.35,
        type: "spring",
      }}
    >
      <div className="avatarGlow"></div>

      <div className="avatarCircle">
        <FaRobot />
      </div>

      <div className="avatarStatus">
        <span className="statusDot"></span>
        <span>AI Online</span>
      </div>
    </motion.div>
  );
}