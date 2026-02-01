import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, ArrowRight, ArrowLeft, Upload, Plus, Trash2, FileText, Video, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

export function CreatorStudio() {
  const [step, setStep] = useState(1);
  
  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Content" },
    { num: 3, label: "Quiz" },
    { num: 4, label: "Preview" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Resource</h1>
        <p className="text-muted-foreground">Share your knowledge with the community.</p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-secondary -z-10"></div>
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-background px-2">
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300",
                step >= s.num ? "bg-accent text-white" : "bg-secondary text-muted-foreground"
              )}>
                {s.num}
              </div>
              <span className={clsx(
                "text-xs font-medium transition-colors duration-300",
                step >= s.num ? "text-accent" : "text-muted-foreground"
              )}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Resource Title</label>
              <input type="text" placeholder="e.g. Introduction to React Hooks" className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Description</label>
              <textarea rows={4} placeholder="What will students learn from this resource?" className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Category</label>
                <select className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all">
                  <option>Development</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>Science</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Difficulty Level</label>
                <select className="w-full px-4 py-3 bg-secondary/20 border border-border rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-sm font-bold text-foreground">Cover Image</label>
               <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-secondary/20 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-3">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
               </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Modules & Lessons</h3>
              <button className="text-accent text-sm font-bold flex items-center gap-1">
                <Plus size={16} />
                Add Module
              </button>
            </div>

            <div className="border border-border rounded-xl overflow-hidden">
               <div className="bg-secondary/30 p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">1</div>
                   <span className="font-bold text-foreground">Module 1</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"><Plus size={16} /></button>
                   <button className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 size={16} /></button>
                 </div>
               </div>
               
               <div className="p-4 space-y-3 bg-card">
                 <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-secondary/10">
                   <FileText size={18} className="text-muted-foreground" />
                   <input type="text" value="Introduction to the topic" className="bg-transparent border-none outline-none text-sm font-medium flex-1" />
                   <span className="text-xs text-muted-foreground">Reading</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-secondary/10">
                   <Video size={18} className="text-muted-foreground" />
                   <input type="text" value="Video Walkthrough" className="bg-transparent border-none outline-none text-sm font-medium flex-1" />
                   <span className="text-xs text-muted-foreground">Video</span>
                 </div>
               </div>
            </div>
            
            <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground font-medium hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
              <Plus size={18} />
              Add Another Module
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
             <div className="text-center py-10">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                   <HelpCircle size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Quiz Builder</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">Create interactive quizzes to test learners' knowledge. Add multiple choice, true/false, or coding challenges.</p>
                <button className="px-6 py-3 bg-accent text-white rounded-xl font-bold shadow-lg shadow-accent/20">
                   Add First Question
                </button>
             </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center">
             <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Save size={32} />
             </div>
             <h2 className="text-2xl font-bold text-foreground">Ready to Publish?</h2>
             <p className="text-muted-foreground">Your resource will be reviewed by admins before going live.</p>
             
             <div className="bg-secondary/30 p-6 rounded-xl text-left max-w-md mx-auto mt-6">
               <h4 className="font-bold mb-2">Summary</h4>
               <ul className="space-y-2 text-sm text-muted-foreground">
                 <li className="flex justify-between"><span>Title:</span> <span className="font-medium text-foreground">React Hooks Deep Dive</span></li>
                 <li className="flex justify-between"><span>Modules:</span> <span className="font-medium text-foreground">4</span></li>
                 <li className="flex justify-between"><span>Lessons:</span> <span className="font-medium text-foreground">12</span></li>
                 <li className="flex justify-between"><span>Est. Duration:</span> <span className="font-medium text-foreground">2h 45m</span></li>
               </ul>
             </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
           <button 
             onClick={() => setStep(Math.max(1, step - 1))}
             disabled={step === 1}
             className="px-6 py-2 text-muted-foreground font-medium hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
           >
             <ArrowLeft size={16} />
             Back
           </button>
           
           <button 
             onClick={() => setStep(Math.min(4, step + 1))}
             className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
           >
             {step === 4 ? (
               <>Publish <Upload size={16} /></>
             ) : (
               <>Next Step <ArrowRight size={16} /></>
             )}
           </button>
        </div>
      </div>
    </div>
  );
}
