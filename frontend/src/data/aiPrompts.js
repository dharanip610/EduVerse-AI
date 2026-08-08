// ==========================================
// EduVerse AI
// AI Prompt Library
// ==========================================

export const quickPrompts = [
  "Explain this topic in simple words.",
  "Summarize this chapter.",
  "Generate 10 quiz questions.",
  "Create flashcards.",
  "Help me with homework.",
  "Give me important exam questions.",
  "Explain with real-life examples.",
  "Teach me step by step.",
];

export const subjectPrompts = {
  Science: [
    "Explain Photosynthesis",
    "What is Gravity?",
    "Human Digestive System",
    "Periodic Table Basics",
    "Electricity and Circuits",
  ],

  Mathematics: [
    "Solve Quadratic Equation",
    "Explain Algebra",
    "Pythagoras Theorem",
    "Probability Basics",
    "Trigonometry Introduction",
  ],

  English: [
    "Improve my grammar",
    "Explain Active and Passive Voice",
    "Write an Essay",
    "Improve Vocabulary",
    "Reading Comprehension",
  ],

  "Social Science": [
    "Indian Freedom Movement",
    "World War II",
    "Indian Constitution",
    "Climate Change",
    "Geography Basics",
  ],

  Coding: [
    "Learn HTML",
    "Learn CSS",
    "Learn JavaScript",
    "React Basics",
    "Python Programming",
  ],
};

export const aiFeatures = [
  {
    id: 1,
    title: "Homework Helper",
    icon: "📚",
    prompt: "Help me solve my homework step by step.",
  },
  {
    id: 2,
    title: "Quiz Generator",
    icon: "📝",
    prompt: "Generate a quiz from this topic.",
  },
  {
    id: 3,
    title: "Flashcards",
    icon: "🧠",
    prompt: "Create flashcards for quick revision.",
  },
  {
    id: 4,
    title: "Mind Map",
    icon: "🗺️",
    prompt: "Generate a mind map for this lesson.",
  },
  {
    id: 5,
    title: "Exam Preparation",
    icon: "🎯",
    prompt: "Give me important exam questions.",
  },
  {
    id: 6,
    title: "Explain Like I'm 5",
    icon: "👶",
    prompt: "Explain this topic like I'm 5 years old.",
  },
];

export const welcomeMessage = {
  role: "assistant",
  text: `👋 Welcome to EduVerse AI!

I'm your AI Tutor.

I can help you with:

📚 Homework

📝 Quiz Preparation

🧠 Flashcards

💻 Coding

🔬 Science

➗ Mathematics

📖 English

🌍 Social Science

Ask me anything and let's start learning! 🚀`,
};