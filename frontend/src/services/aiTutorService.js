function lessonContext(lesson) {
  if (!lesson) return "";
  return lesson.ai_notes || lesson.content || lesson.description || "";
}

export function createFallbackTutorResponse({ question, subject, lesson }) {
  const topic = lesson?.title || subject || "this topic";
  const context = lessonContext(lesson).trim();

  if (context) {
    const excerpt = context.length > 700 ? `${context.slice(0, 700)}…` : context;
    return `Let's use the ${topic} lesson to work through this.\n\n${excerpt}\n\nFor your question, “${question}”, focus on the key idea above and tell me which part you would like explained step by step.`;
  }

  return `Let's work on ${topic}. For “${question}”, I can explain the concept, give an example, or guide you step by step. Which approach would help most?`;
}

export async function requestTutorResponse({ question, subject, lesson, history, signal }) {
  const endpoint = import.meta.env.VITE_AI_TUTOR_API_URL;

  if (!endpoint) return createFallbackTutorResponse({ question, subject, lesson });

  const compactHistory = (history || [])
    .slice(-8)
    .map(({ role, text }) => ({ role, text }))
    .filter((entry) => typeof entry.text === "string" && entry.text.trim());

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        question,
        subject,
        lesson: lesson ? { id: lesson.id, title: lesson.title, content: lessonContext(lesson) } : null,
        history: compactHistory,
      }),
    });

    if (!response.ok) {
      throw new Error("The AI Tutor service is unavailable.");
    }

    const payload = await response.json();
    const text =
    
  payload.reply ||
  payload.answer ||
  payload.response ||
  payload.message;
    if (typeof text !== "string" || !text.trim()) {
      return createFallbackTutorResponse({ question, subject, lesson });
    }

    return text.trim();
  } catch (error) {
    if (error?.name === "AbortError") {
      return createFallbackTutorResponse({ question, subject, lesson });
    }

    return createFallbackTutorResponse({ question, subject, lesson });
  }
}
