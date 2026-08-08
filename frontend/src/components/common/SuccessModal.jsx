import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

export default function SuccessModal({
  open,
  title,
  message,
  buttonText = "OK",
  onClose
}) {

  return (

    <AnimatePresence>

      {open && (

        <motion.div
          className="modalOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            className="successModal"
            initial={{
              scale: 0.8,
              opacity: 0,
              y: 50
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.8,
              opacity: 0
            }}
            transition={{
              duration: 0.35
            }}
          >

            <button
              className="closeModalBtn"
              onClick={onClose}
            >
              <FaTimes />
            </button>

            <div className="successIcon">

              <FaCheckCircle />

            </div>

            <h2>{title}</h2>

            <p>{message}</p>

            <button
              className="modalBtn"
              onClick={onClose}
            >
              {buttonText}
            </button>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>

  );

}