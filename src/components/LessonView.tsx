import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  FileText, 
  Download, 
  MoreHorizontal,
  ThumbsUp,
  Share2,
  Bookmark
} from 'lucide-react';
import clsx from 'clsx';

interface LessonViewProps {
  onBack: () => void;
}

export function LessonView({ onBack }: LessonViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'discussion' | 'notes'>('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Mock Data
  const playlist = [
    { id: 1, title: "1. Understanding the Box Model", duration: "10:00", completed: true, type: 'video' },
    { id: 2, title: "2. Typography Hierarchies", duration: "15:00", completed: true, type: 'article' },
    { id: 3, title: "3. Color Theory Basics", duration: "20:00", completed: false, current: true, type: 'video' },
    { id: 4, title: "4. Flexbox Layouts", duration: "25:00", completed: false, type: 'video' },
    { id: 5, title: "5. CSS Grid Fundamentals", duration: "30:00", completed: false, type: 'video' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -m-4 md:-m-8">
      {/* Top Bar Navigation for Lesson */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-foreground text-lg line-clamp-1">3. Color Theory Basics</h2>
            <p className="text-xs text-muted-foreground">Module 1: Foundations of Modern UI</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            <ChevronLeft size={16} /> Previous
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
            Next Lesson <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background p-4 md:p-8 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative shadow-lg group">
              <img 
                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=675&fit=crop" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover opacity-80" 
              />
              
              {/* Custom Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-accent/90 text-white rounded-full flex items-center justify-center pl-1 shadow-2xl shadow-accent/40 transform transition-transform group-hover:scale-110">
                  <Play size={32} fill="currentColor" />
                </button>
              </div>

              {/* Progress Bar Mock */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                <div className="h-full bg-accent w-1/3 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full shadow-sm scale-0 group-hover:scale-100 transition-transform"></div>
                </div>
              </div>
            </div>

            {/* Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Mastering Color Theory for Digital Screens</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Play size={14} /> 20 min</span>
                  <span className="flex items-center gap-1"><FileText size={14} /> Transcript available</span>
                  <span className="text-green-600 font-medium">+50 XP</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors" title="Like">
                  <ThumbsUp size={18} />
                </button>
                <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors" title="Save">
                  <Bookmark size={18} />
                </button>
                <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors" title="Share">
                  <Share2 size={18} />
                </button>
                <button className="p-2.5 border border-border rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Tabbed Content */}
            <div>
              <div className="flex items-center gap-6 border-b border-border mb-6 overflow-x-auto">
                {['overview', 'discussion', 'notes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={clsx(
                      "pb-3 text-sm font-medium capitalize transition-colors relative whitespace-nowrap",
                      activeTab === tab ? "text-accent" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTabLesson"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[200px]">
                {activeTab === 'overview' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="prose prose-stone max-w-none text-foreground/90">
                      <p>
                        In this lesson, we dive deep into the 60-30-10 rule, a classic decorating rule that helps create a balanced color palette. It states that 60% of the room should be a dominant color, 30% should be the secondary color or texture, and the last 10% should be an accent.
                      </p>
                      <h3 className="text-lg font-bold text-foreground mt-6 mb-2">Key Takeaways</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Understanding color harmony and contrast ratios.</li>
                        <li>How to use the HSL color model effectively in CSS.</li>
                        <li>Accessibility standards for color (WCAG 2.1).</li>
                      </ul>
                    </div>

                    <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <Download size={18} /> Lesson Resources
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-accent/50 cursor-pointer transition-colors group">
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded bg-red-100 text-red-500 flex items-center justify-center">
                               <FileText size={16} />
                             </div>
                             <div>
                               <p className="text-sm font-bold text-foreground group-hover:text-accent">Color_Cheatsheet.pdf</p>
                               <p className="text-xs text-muted-foreground">2.4 MB</p>
                             </div>
                           </div>
                           <Download size={16} className="text-muted-foreground group-hover:text-accent" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-accent/50 cursor-pointer transition-colors group">
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded bg-blue-100 text-blue-500 flex items-center justify-center">
                               <FileText size={16} />
                             </div>
                             <div>
                               <p className="text-sm font-bold text-foreground group-hover:text-accent">Starter_Files.zip</p>
                               <p className="text-xs text-muted-foreground">156 KB</p>
                             </div>
                           </div>
                           <Download size={16} className="text-muted-foreground group-hover:text-accent" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'discussion' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <div className="flex gap-4 mb-8">
                       <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                         ME
                       </div>
                       <div className="flex-1">
                         <textarea 
                           placeholder="Ask a question or share your thoughts..." 
                           rows={3}
                           className="w-full p-4 bg-secondary/30 border border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
                         />
                         <div className="flex justify-end mt-2">
                           <button className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold">Post Comment</button>
                         </div>
                       </div>
                     </div>
                     
                     <div className="space-y-6">
                       {[1, 2].map((i) => (
                         <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary overflow-hidden shrink-0">
                               <img src={`https://images.unsplash.com/photo-${i === 1 ? '1500648767791-00dcc994a43e' : '1535713875002-d1d0cf377fde'}?w=50&h=50&fit=crop`} alt="User" />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                 <span className="font-bold text-foreground text-sm">Sarah Jenkins</span>
                                 <span className="text-xs text-muted-foreground">2 hours ago</span>
                               </div>
                               <p className="text-sm text-foreground/80 leading-relaxed">
                                 Does anyone have a good tool for generating accessible color palettes? The one mentioned in the video seems to be offline.
                               </p>
                               <div className="flex items-center gap-4 mt-2">
                                 <button className="text-xs font-bold text-muted-foreground hover:text-accent flex items-center gap-1">
                                   <ThumbsUp size={12} /> 12
                                 </button>
                                 <button className="text-xs font-bold text-muted-foreground hover:text-accent">Reply</button>
                               </div>
                            </div>
                         </div>
                       ))}
                     </div>
                   </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[400px] border border-border rounded-xl overflow-hidden flex flex-col">
                    <div className="bg-secondary/30 p-2 border-b border-border flex items-center gap-2 text-xs text-muted-foreground">
                      <button className="p-1 hover:bg-secondary rounded"><strong className="font-serif font-bold">B</strong></button>
                      <button className="p-1 hover:bg-secondary rounded"><em className="font-serif italic">I</em></button>
                      <button className="p-1 hover:bg-secondary rounded"><span className="underline">U</span></button>
                      <div className="w-px h-4 bg-border mx-1"></div>
                      <button className="p-1 hover:bg-secondary rounded">H1</button>
                      <button className="p-1 hover:bg-secondary rounded">List</button>
                    </div>
                    <textarea 
                      className="flex-1 p-4 bg-card outline-none resize-none font-mono text-sm leading-relaxed"
                      placeholder="Start typing your notes here..."
                      defaultValue="- 60-30-10 rule: 60% dominant, 30% secondary, 10% accent.&#10;- Important to check contrast ratios for accessibility.&#10;"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Playlist */}
        <div className={clsx(
          "w-80 border-l border-border bg-card overflow-y-auto shrink-0 transition-all duration-300 absolute md:static right-0 top-0 bottom-0 z-20 shadow-xl md:shadow-none",
          isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0 md:hidden"
        )}>
          <div className="p-4 border-b border-border bg-secondary/10">
            <h3 className="font-bold text-foreground">Course Content</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-2/5"></div>
              </div>
              <span>40%</span>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {playlist.map((item) => (
              <button 
                key={item.id}
                className={clsx(
                  "w-full p-4 flex items-start gap-3 text-left hover:bg-secondary/30 transition-colors relative",
                  item.current ? "bg-secondary/50" : ""
                )}
              >
                {item.current && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>
                )}
                
                <div className={clsx(
                  "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                  item.completed ? "text-green-500 bg-green-100" : 
                  item.current ? "text-accent border border-accent bg-transparent" :
                  "border border-muted-foreground text-transparent"
                )}>
                  {item.completed && <CheckCircle2 size={14} />}
                  {item.current && <div className="w-2 h-2 rounded-full bg-accent"></div>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={clsx(
                    "text-sm font-medium leading-tight mb-1",
                    item.current ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                    <span>{item.type === 'video' ? 'Video' : 'Article'}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
