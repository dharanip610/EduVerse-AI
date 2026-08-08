import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { FaRobot, FaBrain, FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import TutorSidebar from "../../components/ai/TutorSidebar";
import AIAvatar from "../../components/ai/AIAvatar";
import ChatMessage from "../../components/ai/ChatMessage";
import ChatInput from "../../components/ai/ChatInput";
import SuggestionCards from "../../components/ai/SuggestionCards";
import SubjectSelector from "../../components/ai/SubjectSelector";
import TypingIndicator from "../../components/ai/TypingIndicator";
import { quickPrompts, subjectPrompts, welcomeMessage } from "../../data/aiPrompts";
import {
  getChatHistory,
  getLesson,
  saveChatMessage,
  deleteAllChats,
  deleteSingleChat,
} from "../../services/studentService";
import { createFallbackTutorResponse, requestTutorResponse } from "../../services/aiTutorService";
import "../../styles/aitutor.css";

function messageId(prefix = "message") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function displayTime(value) {
  if (!value) return "Now";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Now" : date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const INITIAL_MESSAGE = { id: "welcome", role: welcomeMessage.role, text: welcomeMessage.text, time: "Now" };
const MAX_HISTORY_MESSAGES = 8;

export default function AITutor() {
  const { lessonId } = useParams();
  const { user } = useAuth();
  const { theme } = useTheme();
  const chatEndRef = useRef(null);
  const mountedRef = useRef(true);
  const sendingRef = useRef(false);
  const requestControllerRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("Science");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [lessonError, setLessonError] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [recentChats, setRecentChats] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedChatId, setSelectedChatId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

  
  const suggestions = useMemo(
    () => [...(subjectPrompts[selectedSubject] || []), ...quickPrompts].slice(0, 6),
    [selectedSubject]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    let active = true;

    async function loadLessonContext() {
      if (!lessonId) {
        if (active) {
          setLesson(null);
          setLessonError("");
        }
        return;
      }

      setLessonError("");
      const { data, error } = await getLesson(lessonId);
      if (!active) return;
      if (error) {
        setLesson(null);
        setLessonError("Lesson context could not be loaded. You can still ask general questions.");
        return;
      }
      setLesson(data || null);
    }

    loadLessonContext();
    return () => { active = false; };
  }, [lessonId]);

  useEffect(() => {
    let active = true;

    async function loadConversationHistory() {
      if (!user?.id) {
        if (active) {
          setMessages([INITIAL_MESSAGE]);
          setRecentChats([]);
        }
        return;
      }

      const { data, error } = await getChatHistory(user.id);
      if (!active || error) return;

      const history = data || [];
      const restoredMessages = history.flatMap((chat) => [
        { id: `${chat.id}-question`, role: "user", text: chat.question, time: displayTime(chat.created_at) },
        { id: `${chat.id}-answer`, role: "assistant", text: chat.answer, time: displayTime(chat.created_at) },
      ]);

      setMessages([INITIAL_MESSAGE, ...restoredMessages]);
      setRecentChats([...history].reverse().slice(0, 4));
    }

    loadConversationHistory();
    return () => { active = false; };
  }, [user?.id]);

  const sendMessage = useCallback(async (prompt) => {
    const question = (typeof prompt === "string" ? prompt : input).trim();
    if (!question || sendingRef.current) return;

    sendingRef.current = true;
    const userMessage = { id: messageId("user"), role: "user", text: question, time: "Now" };
    const historyForRequest = [...messages, userMessage].slice(-MAX_HISTORY_MESSAGES);
    setMessages([...messages, userMessage]);
    setInput("");
    setTyping(true);

    const controller = new AbortController();
    requestControllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const aiText = await requestTutorResponse({
        question,
        subject: selectedSubject,
        lesson,
        history: historyForRequest,
        signal: controller.signal,
      });

      if (!mountedRef.current) return;

      const aiReply = { id: messageId("assistant"), role: "assistant", text: aiText, time: "Now" };
      setMessages((previous) => [...previous, aiReply]);

      if (user?.id) {
        const { error } = await saveChatMessage(user.id, question, aiText);
        if (!error && mountedRef.current) {
          setRecentChats((previous) => [{ id: userMessage.id, question, answer: aiText }, ...previous.filter((chat) => chat.question !== question)].slice(0, 4));
        }
      }
    } catch (error) {
      if (!mountedRef.current) return;

      const fallbackText = createFallbackTutorResponse({ question, subject: selectedSubject, lesson });
      const aiReply = { id: messageId("assistant"), role: "assistant", text: fallbackText, time: "Now" };
      setMessages((previous) => [...previous, aiReply]);
    } finally {
      window.clearTimeout(timeout);
      requestControllerRef.current = null;
      if (mountedRef.current) {
        setTyping(false);
      }
      sendingRef.current = false;
    }
  }, [input, lesson, messages, selectedSubject, user?.id]);

  const showEmptyState = messages.length <= 1 && !typing;
  const handleDeleteChats = async () => {
  if (!user?.id) return;

  setDeletingAll(true);

  const { error } = await deleteAllChats(user.id);

  setDeletingAll(false);

  if (error) {
    alert("Failed to delete chats.");
    return;
  }

  setMessages([INITIAL_MESSAGE]);
  setRecentChats([]);
  setShowSettings(false);
};
const handleDeleteSingleChat = (chatId) => {
  setSelectedChatId(chatId);
  setShowDeleteModal(true);
};
const confirmDeleteSingleChat = async () => {
  if (!selectedChatId) return;

  const { error } = await deleteSingleChat(selectedChatId);

  if (error) {
    alert("Unable to delete chat.");
    return;
  }

  setRecentChats((prev) =>
    prev.filter((chat) => chat.id !== selectedChatId)
  );

  setMessages((prev) => {
    const remaining = prev.filter(
      (msg) => !msg.id.startsWith(`${selectedChatId}-`)
    );

    return remaining.length
      ? remaining
      : [INITIAL_MESSAGE];
  });

  setSelectedChatId(null);
  setShowDeleteModal(false);
};

  return (
    <div className="aiTutorPage">
      <div className="aurora one"></div><div className="aurora two"></div><div className="aurora three"></div>
      <button className="mobileMenuBtn" type="button" onClick={() => setSidebarOpen((open) => !open)} aria-label="Toggle tutor sidebar"><FaBars /></button>

      <div className="aiTutorLayout">
  <TutorSidebar
    sidebarOpen={sidebarOpen}
    subject={selectedSubject}
    setSubject={setSelectedSubject}
    onPrompt={sendMessage}
    recentChats={recentChats}
    onDeleteChats={handleDeleteChats}
    onDeleteSingleChat={handleDeleteSingleChat}
    onOpenSettings={() => setShowSettings(true)}
  />

  {sidebarOpen && (
    <div
      className="sidebarOverlay"
      onClick={() => setSidebarOpen(false)}
    />
  )}

        <motion.div className="chatSection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
          <div className="chatHeader">
            <div className="chatTitle">
              <AIAvatar />
              <div className="chatHeaderContent">
                <div className="chatHeaderBadge">Live tutor</div>
                <h2>{lesson?.title || "EduVerse AI Tutor"}</h2>
                <p>{lessonError || lesson?.description || "Personalized AI Learning Assistant"}</p>
              </div>
            </div>
            <SubjectSelector selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} />
          </div>

          <SuggestionCards suggestions={suggestions} onSelect={sendMessage} disabled={typing} />
          <div className="chatMessages">
            {showEmptyState && (
              <div className="emptyStateCard">
                <div className="emptyStateIcon"><FaBrain /></div>
                <h3>Ask anything</h3>
                <p>Start with a quick question and I’ll guide you step by step.</p>
              </div>
            )}
            {messages.map((message) => <ChatMessage key={message.id} role={message.role} text={message.text} time={message.time} />)}
            {typing && <TypingIndicator />}
            <div ref={chatEndRef}></div>
          </div>
          <ChatInput input={input} setInput={setInput} onSend={sendMessage} disabled={typing} />
          {showSettings && (
  <div
    className="settingsOverlay"
    onClick={() => setShowSettings(false)}
  >
    <div
      className="settingsModal"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>⚙️ Settings</h3>

      <p>
        Manage your AI Tutor chat history.
      </p>

      <button
        className="deleteAllBtn"
        onClick={handleDeleteChats}
        disabled={deletingAll}
      >
        {deletingAll
          ? "Deleting..."
          : "🗑 Delete All Chats"}
      </button>

      <button
        className="cancelBtn"
        onClick={() => setShowSettings(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
{showDeleteModal && (
  <div
    className="settingsOverlay"
    onClick={() => {
      setShowDeleteModal(false);
      setSelectedChatId(null);
    }}
  >
    <div
      className="settingsModal"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>🗑 Delete Chat</h3>

      <p>
        Are you sure you want to delete this chat?
      </p>

      <button
        className="deleteAllBtn"
        onClick={confirmDeleteSingleChat}
      >
        Delete Chat
      </button>

      <button
        className="cancelBtn"
        onClick={() => {
          setShowDeleteModal(false);
          setSelectedChatId(null);
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
        </motion.div>
      </div>
    </div>
  );
}
