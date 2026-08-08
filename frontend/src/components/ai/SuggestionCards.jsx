import { motion } from "framer-motion";

export default function SuggestionCards({
  suggestions = [],
  onSelect,
  disabled = false,
}) {
  return (
    <div className="suggestionWrapper">
      <div className="suggestionCards">
        {suggestions.map((item, index) => (
          <motion.button
            key={index}
            type="button"
            className="suggestionCard"
            onClick={() => onSelect(item)}
            disabled={disabled}
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <span className="suggestionIcon">
              ✨
            </span>

            <span className="suggestionText">
              {item}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}