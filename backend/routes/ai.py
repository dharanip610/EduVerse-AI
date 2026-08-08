from fastapi import APIRouter, Request
from services.ai_service import ask_ai

router = APIRouter(prefix="/api/ai", tags=["AI Tutor"])

@router.post("/chat")
async def chat(request: Request):
    data = await request.json()
    print("REQUEST DATA:", data)

    question = data.get("question", "")
    subject = data.get("subject", "")
    lesson = data.get("lesson", {})

    prompt = f"""
You are a friendly AI Tutor.

Subject: {subject}
Lesson: {lesson.get("title", "")}

Lesson Content:
{lesson.get("content", "")}

Student Question:
{question}

Explain in a simple and easy-to-understand way with examples.
"""

    reply = ask_ai(prompt)

    return {
        "success": True,
        "reply": reply
    }