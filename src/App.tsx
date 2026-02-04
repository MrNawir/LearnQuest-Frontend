import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { LearningPath } from "./components/LearningPath";
import { Gamification } from "./components/Gamification";
import { CreatorStudio } from "./components/CreatorStudio";
import { AuthModal } from "./components/AuthModal";
import { LandingPage } from "./components/LandingPage";
import { LessonView } from "./components/LessonView";
import { ContactUs } from "./components/ContactUs";
import { AnimatePresence } from "motion/react";
import { useAuthStore } from "./stores/authStore";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isInLessonMode, setIsInLessonMode] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Listen for auth logout events (from API interceptor)
  useEffect(() => {
    const handleLogout = () => logout();
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [logout]);

  // Map backend role to frontend role format
  const getUserRole = (): "Learner" | "Contributor" | "Admin" => {
    if (!user) return "Learner";
    switch (user.role) {
      case "admin":
        return "Admin";
      case "contributor":
        return "Contributor";
      default:
        return "Learner";
    }
  };

  const handleLogin = () => {
    setIsAuthOpen(false);
  };

  const handleLessonStart = () => {
    setIsInLessonMode(true);
  };

  const handleLessonBack = () => {
    setIsInLessonMode(false);
  };

  const renderContent = () => {
    if (isInLessonMode) {
      return <LessonView onBack={handleLessonBack} />;
    }

    switch (activeTab) {
      case "dashboard":
        return <Dashboard userName={user?.username || "Learner"} />;
      case "learning-path":
        return <LearningPath onStartLesson={handleLessonStart} />;
      case "gamification":
        return <Gamification />;
      case "creator":
        return <CreatorStudio />;
      default:
        return <Dashboard userName={user?.username || "Learner"} />;
    }
  };

  if (showContact) {
    return <ContactUs onBack={() => setShowContact(false)} />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenContact={() => setShowContact(true)}
        />
        <AnimatePresence>
          {isAuthOpen && (
            <AuthModal
              isOpen={isAuthOpen}
              onClose={() => setIsAuthOpen(false)}
              onLogin={handleLogin}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Layout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={getUserRole()}
        onOpenAuth={() => setIsAuthOpen(true)}
        isLoggedIn={isAuthenticated}
        userName={user?.username || ""}
      >
        <AnimatePresence mode="wait">
          <div key={isInLessonMode ? "lesson" : activeTab} className="h-full">
            {renderContent()}
          </div>
        </AnimatePresence>
      </Layout>

      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>
    </>
  );
}
