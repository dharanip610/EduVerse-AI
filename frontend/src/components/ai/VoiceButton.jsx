import { useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaStop } from "react-icons/fa";

export default function VoiceButton() {
  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    setListening((prev) => !prev);

    // Speech Recognition API will be integrated later
    if (!listening) {
      console.log("🎤 Voice listening started...");
    } else {
      console.log("🛑 Voice listening stopped.");
    }
  };

  return (
    <motion.button
      className={`voiceButton ${listening ? "listening" : ""}`}
      onClick={toggleListening}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {listening ? (
        <>
          <FaStop />
          <span>Stop</span>
        </>
      ) : (
        <>
          <FaMicrophone />
          <span>Voice</span>
        </>
      )}

      {listening && <span className="voicePulse"></span>}
    </motion.button>
  );
}