import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  PlayCircle,
  CheckCircle2,
  Lock,
  MessageSquare,
  Share2,
  Bookmark,
  Star,
  Award,
  Heart,
  Send,
  X,
  ThumbsUp,
} from "lucide-react";
import clsx from "clsx";

export function LearningPath({
  onStartLesson,
}: {
  onStartLesson?: () => void;
}) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newComment, setNewComment] = useState("");

  const modules = [
    {
      id: 0,
      title: "Module 1: Foundations of Modern UI",
      description:
        "Learn the core principles of layout, typography, and color theory.",
      duration: "45 min",
      status: "completed",
      lessons: [
        {
          title: "Understanding the Box Model",
          type: "video",
          duration: "10:00",
          completed: true,
        },
        {
          title: "Typography Hierarchies",
          type: "reading",
          duration: "15:00",
          completed: true,
        },
        {
          title: "Color Theory Basics",
          type: "interactive",
          duration: "20:00",
          completed: true,
        },
      ],
    },
    {
      id: 1,
      title: "Module 2: Component Architecture",
      description: "Building reusable and scalable components with React.",
      duration: "1h 15m",
      status: "in-progress",
      lessons: [
        {
          title: "Atomic Design Principles",
          type: "reading",
          duration: "12:00",
          completed: true,
        },
        {
          title: "Building a Button Component",
          type: "video",
          duration: "25:00",
          completed: false,
        },
        {
          title: "Prop Drilling vs Context",
          type: "interactive",
          duration: "38:00",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: "Module 3: Advanced State Management",
      description: "Mastering global state with Redux and Context API.",
      duration: "2h 30m",
      status: "locked",
      lessons: [
        {
          title: "Context API Deep Dive",
          type: "video",
          duration: "45:00",
          completed: false,
        },
        {
          title: "Redux Toolkit Setup",
          type: "video",
          duration: "35:00",
          completed: false,
        },
        {
          title: "Async Thunks",
          type: "interactive",
          duration: "40:00",
          completed: false,
        },
      ],
    },
  ];

  const discussions = [
    {
      id: 1,
      user: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
      question:
        "Can someone explain the difference between useEffect and useLayoutEffect?",
      time: "2h ago",
      likes: 24,
      comments: 12,
      tags: ["React", "Hooks"],
      replies: [
        {
          user: "Sarah Jensen",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop",
          comment:
            "useEffect runs asynchronously after the render is committed to the screen, while useLayoutEffect runs synchronously after all DOM mutations. Use useLayoutEffect when you need to measure layout or perform DOM mutations that need to be visible to the user synchronously.",
          time: "1h ago",
          likes: 8,
          isMentor: true,
        },
        {
          user: "Mike Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
          comment:
            "Great explanation! Also worth noting: useLayoutEffect can cause performance issues if overused, since it blocks visual updates.",
          time: "45m ago",
          likes: 3,
        },
      ],
    },
    {
      id: 2,
      user: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop",
      question: "Best practices for organizing large Redux applications?",
      time: "5h ago",
      likes: 18,
      comments: 7,
      tags: ["Redux", "Architecture"],
      replies: [
        {
          user: "David Kim",
          avatar:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop",
          comment:
            "I recommend using Redux Toolkit's createSlice and organizing by feature folders rather than type. Also consider using RTK Query for server state!",
          time: "3h ago",
          likes: 5,
        },
      ],
    },
    {
      id: 3,
      user: "Tom Wilson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      question: "How do you handle authentication in React applications?",
      time: "1d ago",
      likes: 31,
      comments: 15,
      tags: ["Authentication", "Security"],
      replies: [
        {
          user: "Emma Davis",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop",
          comment:
            "I've had success with JWT tokens stored in httpOnly cookies for security, and using React Context for auth state management.",
          time: "20h ago",
          likes: 12,
        },
      ],
    },
    {
      id: 4,
      user: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop",
      question: "Performance optimization tips for React components?",
      time: "2d ago",
      likes: 42,
      comments: 21,
      tags: ["Performance", "Optimization"],
      replies: [
        {
          user: "Marcus Lee",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
          comment:
            "Use React.memo for pure components, useCallback for functions, and consider virtualization for long lists. Also, profile with React DevTools!",
          time: "1d ago",
          likes: 15,
        },
      ],
    },
  ];

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      alert(`Question submitted: ${newQuestion}`);
      setNewQuestion("");
    }
  };

  const handleSubmitComment = (questionId: number) => {
    if (newComment.trim()) {
      alert(`Comment added to question ${questionId}: ${newComment}`);
      setNewComment("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Course Header */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
                alt="Course Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-md uppercase tracking-wide">
                      Web Development
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold text-foreground">
                        4.9
                      </span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Advanced React Patterns
                  </h1>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    Master advanced React concepts including HOCs, Render Props,
                    Custom Hooks, and Compound Components.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-card bg-secondary overflow-hidden"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-${i === 1 ? "1534528741775-53994a69daeb" : i === 2 ? "1506794778202-cad84cf45f1d" : "1507003211169-0a1dd7228f2d"}?w=60&h=60&fit=crop`}
                        alt="User"
                      />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    +2k
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">2,450</span>{" "}
                  learners enrolled
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
            <button
              onClick={onStartLesson}
              className="flex-1 bg-accent text-white py-3 rounded-xl font-bold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all"
            >
              Continue Learning
            </button>
            
          </div>
        </div>

        {/* Modules Accordion */}
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-foreground">Course Content</h3>

          {modules.map((module) => (
            <div
              key={module.id}
              className={clsx(
                "bg-card border rounded-2xl overflow-hidden transition-all duration-300",
                module.status === "locked"
                  ? "opacity-70 border-border"
                  : "border-border shadow-sm",
              )}
            >
              <button
                onClick={() =>
                  module.status !== "locked" &&
                  setExpandedModule(
                    expandedModule === module.id ? null : module.id,
                  )
                }
                className="w-full p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                disabled={module.status === "locked"}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0",
                      module.status === "completed"
                        ? "bg-green-100 border-green-500 text-green-600"
                        : module.status === "in-progress"
                          ? "bg-accent/10 border-accent text-accent"
                          : "bg-muted border-transparent text-muted-foreground",
                    )}
                  >
                    {module.status === "completed" ? (
                      <CheckCircle2 size={20} />
                    ) : module.status === "locked" ? (
                      <Lock size={20} />
                    ) : (
                      <span className="font-bold text-sm">{module.id + 1}</span>
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground">
                      {module.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                    {module.duration}
                  </span>
                  <ChevronDown
                    size={20}
                    className={clsx(
                      "text-muted-foreground transition-transform duration-300",
                      expandedModule === module.id && "rotate-180",
                    )}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-2 space-y-2 border-t border-border/50 bg-secondary/10">
                      {module.lessons.map((lesson, idx) => (
                        <div
                          key={idx}
                          onClick={onStartLesson}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-card transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={clsx(
                                "w-6 h-6 rounded-full flex items-center justify-center",
                                lesson.completed
                                  ? "text-green-500"
                                  : "text-muted-foreground",
                              )}
                            >
                              {lesson.completed ? (
                                <CheckCircle2 size={16} />
                              ) : (
                                <PlayCircle size={16} />
                              )}
                            </div>
                            <span
                              className={clsx(
                                "text-sm font-medium",
                                lesson.completed
                                  ? "text-muted-foreground"
                                  : "text-foreground",
                              )}
                            >
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}

                      <div className="mt-4 pt-4 flex justify-end">
                        <button
                          onClick={onStartLesson}
                          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="space-y-6">
        {/* Mentor Card */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
          <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 overflow-hidden border-4 border-background shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
              alt="Mentor"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-foreground text-lg">
            Dr. Sarah Jensen
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Senior Software Engineer @ TechCorp
          </p>
          <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            View Profile
          </button>
        </div>

        {/* Course Stats */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">Your Progress</h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-accent">32%</span>
            <span className="text-sm text-muted-foreground mb-1.5">
              completed
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full w-[32%]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-background p-3 rounded-xl border border-border text-center">
              <div className="text-lg font-bold text-foreground">4/12</div>
              <div className="text-xs text-muted-foreground">Modules</div>
            </div>
            <div className="bg-background p-3 rounded-xl border border-border text-center">
              <div className="text-lg font-bold text-foreground">1250</div>
              <div className="text-xs text-muted-foreground">XP Earned</div>
            </div>
          </div>
        </div>

        {/* Community/Discussions */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Discussions</h3>
            
          </div>

          {/* Ask Question Form */}
          <form onSubmit={handleSubmitQuestion} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ask a question..."
                className="w-full p-3 pr-10 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-accent hover:text-accent/80"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="space-y-3">
                <div
                  className="space-y-2 cursor-pointer"
                  onClick={() =>
                    setSelectedQuestion(
                      selectedQuestion === discussion.id ? null : discussion.id,
                    )
                  }
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary shrink-0 overflow-hidden">
                      <img src={discussion.avatar} alt={discussion.user} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium line-clamp-2">
                        {discussion.question}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {discussion.user}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {discussion.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart
                            size={12}
                            className="hover:text-red-500 cursor-pointer"
                          />
                          <span>{discussion.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare size={12} />
                          <span>{discussion.comments}</span>
                        </div>
                        <div className="flex gap-1">
                          {discussion.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-secondary text-xs text-muted-foreground rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies Section */}
                <AnimatePresence>
                  {selectedQuestion === discussion.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-11 space-y-3 border-l-2 border-border pl-3"
                    >
                      {/* Replies */}
                      {discussion.replies.map((reply, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-secondary shrink-0 overflow-hidden">
                              <img src={reply.avatar} alt={reply.user} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-foreground">
                                  {reply.user}
                                </span>
                                {reply.isMentor && (
                                  <span className="px-1.5 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded">
                                    Mentor
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {reply.comment}
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {reply.time}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <ThumbsUp
                                    size={10}
                                    className="hover:text-blue-500 cursor-pointer"
                                  />
                                  <span>{reply.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Comment Form */}
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 p-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                        <button
                          onClick={() => handleSubmitComment(discussion.id)}
                          className="px-3 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selectedQuestion !== discussion.id &&
                  discussion.id < discussions.length && (
                    <div className="border-b border-border/50 pb-4"></div>
                  )}
              </div>
            ))}
          </div>

         
        </div>
      </div>
    </div>
  );
}
