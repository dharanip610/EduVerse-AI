import { Routes, Route } from "react-router-dom";

// Landing
import LandingPage from "../pages/Landing/LandingPage";

// Auth
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPVerification from "../pages/Auth/OTPVerification";
import ResetPassword from "../pages/Auth/ResetPassword";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminSubjects from "../pages/Admin/AdminSubjects";
import AdminAddQuiz from "../pages/Admin/AdminAddQuiz";
import AdminQuizManager from "../pages/Admin/AdminQuizManager";
import AdminChapters from "../pages/Admin/AdminChapters";
import AdminLessons from "../pages/Admin/AdminLessons";
import AdminStudents from "../pages/Admin/AdminStudents";
import AdminGames from "../pages/Admin/AdminGames";
import AdminAITutor from "../pages/Admin/AdminAITutor";
import AdminLeaderboard from "../pages/Admin/AdminLeaderboard";
import AdminProgress from "../pages/Admin/AdminProgress";
import AdminAnalytics from "../pages/Admin/AdminAnalytics";
import AdminProfile from "../pages/Admin/AdminProfile";
import AdminSettings from "../pages/Admin/AdminSettings";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";


// Student
import Subjects from "../pages/student/Subjects";
import SubjectDetails from "../pages/student/SubjectDetails";
import Lesson from "../pages/student/Lesson";
import AITutor from "../pages/Student/AITutor";
import Quiz from "../pages/student/Quiz";
import Games from "../pages/student/Games";
import MemoryMatch from "../pages/student/MemoryMatch";
import SpeedQuiz from "../pages/student/SpeedQuiz";
import WordPuzzle from "../pages/student/WordPuzzle";
import MathChallenge from "../pages/student/MathChallenge";
import ComingSoon from "../pages/student/ComingSoon";
import Leaderboard from "../pages/student/Leaderboard";
import Certificates from "../pages/student/Certificates";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";
import ScienceAdventure from "../pages/student/ScienceAdventure";
import SpinAndLearn from "../pages/student/SpinAndLearn";


// Protected Route
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../components/common/ErrorBoundary";

export default function AppRoutes() {
  return (
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-login" element={<AdminLogin />}/>
<Route path="/dashboard" element={<ProtectedRoute>
<Dashboard /></ProtectedRoute>}/>
<Route path="/admin-dashboard" element={<AdminDashboard />}/>
<Route
  path="/admin-subjects"
  element={
    <ProtectedRoute>
      <AdminSubjects />
    </ProtectedRoute>
  }
/>
<Route
  path="/student"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-lessons"
  element={<AdminLessons />}
/>
<Route
  path="/admin-students"
  element={<AdminStudents />}
/>
<Route
  path="/admin-quiz"
  element={<AdminQuizManager />}
/>
<Route
  path="/admin-games"
  element={<AdminGames />}
/>
<Route
  path="/admin-ai-tutor"
  element={<AdminAITutor />}
/>
<Route
  path="/admin-leaderboard"
  element={<AdminLeaderboard />}
/>
<Route
  path="/admin-progress"
  element={<AdminProgress />}
/>
<Route
    path="/admin-analytics"
    element={<AdminAnalytics />}
/>
<Route
  path="/admin-profile"
  element={
    <ProtectedRoute>
      <AdminProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/games/science"
  element={
    <ProtectedRoute>
      <ScienceAdventure />
    </ProtectedRoute>
  }
/>
<Route
  path="/games/spin"
  element={
    <ProtectedRoute>
      <SpinAndLearn />
    </ProtectedRoute>
  }
/>
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin-settings"
  element={
    <ProtectedRoute>
      <AdminSettings />
    </ProtectedRoute>
  }
/>

      <Route
    path="/subject-details/:id"
    element={
        <ProtectedRoute>
            <SubjectDetails />
        </ProtectedRoute>
    }
/> 

   <Route
  path="/lesson/:chapterId"
  element={
    <ProtectedRoute>
      <Lesson />
    </ProtectedRoute>
  }
/>    

 <Route
path="/ai-tutor/:lessonId"
element={
<ProtectedRoute>
<AITutor />
</ProtectedRoute>
}
/>       

   <Route
path="/quiz/:lessonId"
element={
<ProtectedRoute>
<Quiz />
</ProtectedRoute>
}
/>     

        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <Settings />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        
        <Route
  path="/admin-add-quiz"
  element={<AdminAddQuiz />}
/>

<Route
  path="/admin-chapters"
  element={<AdminChapters />}
/>


<Route path="/games/memory" element={<ProtectedRoute><MemoryMatch /></ProtectedRoute>} />
<Route path="/games/speed-quiz" element={<ProtectedRoute><SpeedQuiz /></ProtectedRoute>} />
<Route path="/games/word-puzzle" element={<ProtectedRoute><WordPuzzle /></ProtectedRoute>} />
<Route path="/games/math" element={<ProtectedRoute><MathChallenge /></ProtectedRoute>} />
<Route path="/games/coming-soon" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />

      </Routes>
      
      
  );
}