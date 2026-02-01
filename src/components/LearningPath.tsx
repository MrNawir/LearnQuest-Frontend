import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  MessageSquare, 
  Share2, 
  Bookmark,
  Star,
  Award
} from 'lucide-react';
import clsx from 'clsx';

export function LearningPath({ onStartLesson }: { onStartLesson?: () => void }) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const modules = [
    {
      id: 0,
      title: "Module 1: Foundations of Modern UI",
      description: "Learn the core principles of layout, typography, and color theory.",
      duration: "45 min",
      status: "completed",
      lessons: [
        { title: "Understanding the Box Model", type: "video", duration: "10:00", completed: true },
        { title: "Typography Hierarchies", type: "reading", duration: "15:00", completed: true },
        { title: "Color Theory Basics", type: "interactive", duration: "20:00", completed: true },
      ]
    },
    {
      id: 1,
      title: "Module 2: Component Architecture",
      description: "Building reusable and scalable components with React.",
      duration: "1h 15m",
      status: "in-progress",
      lessons: [
        { title: "Atomic Design Principles", type: "reading", duration: "12:00", completed: true },
        { title: "Building a Button Component", type: "video", duration: "25:00", completed: false },
        { title: "Prop Drilling vs Context", type: "interactive", duration: "38:00", completed: false },
      ]
    },
    {
      id: 2,
      title: "Module 3: Advanced State Management",
      description: "Mastering global state with Redux and Context API.",
      duration: "2h 30m",
      status: "locked",
      lessons: [
        { title: "Context API Deep Dive", type: "video", duration: "45:00", completed: false },
        { title: "Redux Toolkit Setup", type: "video", duration: "35:00", completed: false },
        { title: "Async Thunks", type: "interactive", duration: "40:00", completed: false },
      ]
    }
  ];

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
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-md uppercase tracking-wide">Web Development</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold text-foreground">4.9</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Advanced React Patterns</h1>
                  <p className="text-muted-foreground text-sm line-clamp-2">Master advanced React concepts including HOCs, Render Props, Custom Hooks, and Compound Components.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-card bg-secondary overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : '1507003211169-0a1dd7228f2d'}?w=60&h=60&fit=crop`} alt="User" />
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                     +2k
                   </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">2,450</span> learners enrolled
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
            <button className="p-3 border border-border rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Bookmark size={20} />
            </button>
            <button className="p-3 border border-border rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <Share2 size={20} />
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
                module.status === 'locked' ? "opacity-70 border-border" : "border-border shadow-sm"
              )}
            >
              <button 
                onClick={() => module.status !== 'locked' && setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                disabled={module.status === 'locked'}
              >
                <div className="flex items-center gap-4">
                  <div className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0",
                    module.status === 'completed' ? "bg-green-100 border-green-500 text-green-600" :
                    module.status === 'in-progress' ? "bg-accent/10 border-accent text-accent" :
                    "bg-muted border-transparent text-muted-foreground"
                  )}>
                    {module.status === 'completed' ? <CheckCircle2 size={20} /> : 
                     module.status === 'locked' ? <Lock size={20} /> :
                     <span className="font-bold text-sm">{module.id + 1}</span>}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground">{module.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{module.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground hidden sm:block">{module.duration}</span>
                  <ChevronDown 
                    size={20} 
                    className={clsx(
                      "text-muted-foreground transition-transform duration-300",
                      expandedModule === module.id && "rotate-180"
                    )} 
                  />
                </div>
              </button>

              <AnimatePresence>
                {expandedModule === module.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
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
                            <div className={clsx(
                              "w-6 h-6 rounded-full flex items-center justify-center",
                              lesson.completed ? "text-green-500" : "text-muted-foreground"
                            )}>
                              {lesson.completed ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                            </div>
                            <span className={clsx("text-sm font-medium", lesson.completed ? "text-muted-foreground" : "text-foreground")}>
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
             <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" alt="Mentor" className="w-full h-full object-cover" />
           </div>
           <h3 className="font-bold text-foreground text-lg">Dr. Sarah Jensen</h3>
           <p className="text-muted-foreground text-sm mb-4">Senior Software Engineer @ TechCorp</p>
           <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
             View Profile
           </button>
        </div>

        {/* Course Stats */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-foreground">Your Progress</h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-accent">32%</span>
            <span className="text-sm text-muted-foreground mb-1.5">completed</span>
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
             <button className="text-xs font-bold text-accent uppercase">View All</button>
           </div>
           
           <div className="space-y-4">
             {[1, 2].map(i => (
               <div key={i} className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-secondary shrink-0 overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${i===1 ? '1500648767791-00dcc994a43e' : '1535713875002-d1d0cf377fde'}?w=50&h=50&fit=crop`} alt="User" />
                 </div>
                 <div>
                   <p className="text-sm text-foreground font-medium line-clamp-2">Can someone explain the difference between useEffect and useLayoutEffect?</p>
                   <div className="flex items-center gap-3 mt-1">
                     <span className="text-xs text-muted-foreground">2h ago</span>
                     <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare size={12} />
                        <span>12</span>
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           
           <button className="w-full mt-4 py-2 border border-border text-muted-foreground rounded-lg text-sm font-medium hover:bg-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
             <MessageSquare size={16} />
             <span>Ask a Question</span>
           </button>
        </div>
      </div>
    </div>
  );
}
