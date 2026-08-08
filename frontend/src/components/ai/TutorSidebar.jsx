import { motion } from "framer-motion";
import {
  FaRobot,
  FaBook,
  FaFlask,
  FaCalculator,
  FaGlobe,
  FaCode,
  FaStickyNote,
  FaClipboardList,
  FaLayerGroup,
  FaCog,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";

const subjects = [
  { name: "Science", icon: <FaFlask /> },
  { name: "Mathematics", icon: <FaCalculator /> },
  { name: "English", icon: <FaBook /> },
  { name: "Social Science", icon: <FaGlobe /> },
  { name: "Coding", icon: <FaCode /> },
];
export default function TutorSidebar({
  sidebarOpen,
  subject,
  setSubject,
  onPrompt,
  recentChats = [],
  onDeleteChats,
  onDeleteSingleChat,
  onOpenSettings,
}) {

  return (
  <motion.aside
  className={`tutorSidebar ${sidebarOpen ? "open" : "closed"}`}
  initial={false}
  animate={{
    opacity: 1
  }}
  transition={{ duration: 0.25 }}
>
      {/* Header */}

      <div className="sidebarHeader">
        <div className="sidebarLogo">
          <div className="logoIcon">
            <FaRobot />
          </div>

          <div>
            <h2>EduVerse AI</h2>
            <p>Personal AI Tutor</p>
          </div>
        </div>

        <span className="sidebarBadge">
          Online
        </span>
      </div>

      {/* Subjects */}

      <div className="sidebarSection">

        <h4>Subjects</h4>

        {subjects.map((item) => (

          <button
            key={item.name}
            type="button"
            className={
              subject === item.name
                ? "subjectButton active"
                : "subjectButton"
            }
            onClick={() => setSubject(item.name)}
          >
            <span className="subjectIcon">
              {item.icon}
            </span>

            <span className="subjectName">
              {item.name}
            </span>

          </button>

        ))}

      </div>

      {/* Learning Tools */}

      <div className="sidebarSection">

        <h4>Learning Tools</h4>

        <button
          className="sidebarAction"
          type="button"
          onClick={() =>
            onPrompt(
              "Help me solve my homework step by step."
            )
          }
        >
          <FaClipboardList />
          <span>Homework</span>
        </button>

        <button
          className="sidebarAction"
          type="button"
          onClick={() =>
            onPrompt(
              "Create flashcards for this topic."
            )
          }
        >
          <FaLayerGroup />
          <span>Flashcards</span>
        </button>

        <button
          className="sidebarAction"
          type="button"
          onClick={() =>
            onPrompt(
              "Summarize the important notes from this topic."
            )
          }
        >
          <FaStickyNote />
          <span>Notes</span>
        </button>

      </div>

      {/* Recent Chats */}

      <div className="sidebarSection">

        <h4>Recent Chats</h4>

        {recentChats.length === 0 ? (

          <div className="recentChatEmpty">
            No recent conversations.
          </div>

        ) : (
      recentChats.map((chat) => (

  <div
    key={chat.id}
    className="recentChatItem"
  >

    <button
      className="recentChatContent"
      type="button"
      onClick={() => onPrompt(chat.question)}
    >

      <span className="recentChatLabel">
        {chat.question}
      </span>

      <span className="recentChatHint">
        Continue
      </span>

    </button>

    <button
      className="recentDeleteBtn"
      type="button"
      onClick={() => onDeleteSingleChat(chat.id)}
    >
      <FaTrash />
    </button>

  </div>

))


        )}

      </div>

      {/* Bottom */}

      <div className="sidebarBottom">

<button
  className="settingsButton"
  type="button"
  onClick={onOpenSettings}
>
  <FaCog />
  <span>Settings</span>
</button>

      </div>

    </motion.aside>
  );
}