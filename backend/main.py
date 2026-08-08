from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.student_routes import router as student_router
from routes.subject_routes import router as subject_router
from routes.chapter_routes import router as chapter_router
from routes.lesson_routes import router as lesson_router
from routes.quiz_routes import router as quiz_router
from routes.game_routes import router as game_router
from routes.quiz_routes import router as quiz_router
from routes.progress_routes import router as progress_router
from routes.leaderboard_routes import router as leaderboard_router
from routes.achievement_routes import router as achievement_router
from routes.streak_routes import router as streak_router
from routes.reward_routes import router as reward_router
from routes.teacher_routes import router as teacher_router
from routes.dashboard_routes import router as dashboard_router
from routes.assignment_routes import router as assignment_router
from routes.notification_routes import router as notification_router
from routes.analytics_routes import router as analytics_router
from routes.admin_routes import router as admin_router
from routes.user_management_routes import router as user_router
from routes.ai import router as ai_router



app = FastAPI(
    title="EduVerse AI API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(student_router)
app.include_router(subject_router)
app.include_router(chapter_router)
app.include_router(lesson_router)
app.include_router(quiz_router)
app.include_router(game_router)
app.include_router(progress_router)
app.include_router(leaderboard_router)
app.include_router(achievement_router)
app.include_router(streak_router)
app.include_router(reward_router)
app.include_router(teacher_router)
app.include_router(dashboard_router)
app.include_router(assignment_router)
app.include_router(notification_router)
app.include_router(analytics_router)
app.include_router(admin_router)
app.include_router(user_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "status": "running",
        "project": "EduVerse AI",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }