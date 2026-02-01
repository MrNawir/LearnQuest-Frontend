import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, Shield, Crown, Lock } from 'lucide-react';
import clsx from 'clsx';

export function Gamification() {
  const leaderboardData = [
    { rank: 1, name: "Jessica Wong", xp: "24,500", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", change: "up" },
    { rank: 2, name: "David Kim", xp: "22,150", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", change: "same" },
    { rank: 3, name: "Sarah Jenkins", xp: "21,800", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", change: "down" },
    { rank: 4, name: "Michael Chen", xp: "19,200", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", change: "up" },
    { rank: 5, name: "Emily Davis", xp: "18,950", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", change: "same" },
  ];

  const badges = [
    { id: 1, name: "Early Bird", description: "Complete a lesson before 8 AM", icon: Star, unlocked: true, color: "text-yellow-500", bg: "bg-yellow-100" },
    { id: 2, name: "Week Warrior", description: "Maintain a 7-day streak", icon: Flame, unlocked: true, color: "text-orange-500", bg: "bg-orange-100" },
    { id: 3, name: "Quiz Master", description: "Score 100% on 5 quizzes", icon: Brain, unlocked: true, color: "text-purple-500", bg: "bg-purple-100" },
    { id: 4, name: "Social Butterfly", description: "Post 10 discussions", icon: MessageCircle, unlocked: false, color: "text-gray-400", bg: "bg-gray-100" },
    { id: 5, name: "Code Ninja", description: "Complete 50 coding challenges", icon: Code, unlocked: false, color: "text-gray-400", bg: "bg-gray-100" },
    { id: 6, name: "Mentor", description: "Help 10 other students", icon: Heart, unlocked: false, color: "text-gray-400", bg: "bg-gray-100" },
  ];

  // Helper icons since I missed importing some
  function Flame(props: any) { return <span {...props}>🔥</span> }
  function Brain(props: any) { return <span {...props}>🧠</span> }
  function MessageCircle(props: any) { return <span {...props}>💬</span> }
  function Code(props: any) { return <span {...props}>💻</span> }
  function Heart(props: any) { return <span {...props}>❤️</span> }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Leaderboard Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
             <Trophy className="text-yellow-500" />
             Global Leaderboard
           </h2>
           <div className="flex bg-secondary p-1 rounded-lg">
             <button className="px-4 py-1.5 bg-card text-foreground rounded-md shadow-sm text-sm font-medium">Weekly</button>
             <button className="px-4 py-1.5 text-muted-foreground text-sm font-medium hover:text-foreground">All Time</button>
           </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/30 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-6">User</div>
            <div className="col-span-4 text-right">XP Earned</div>
          </div>
          
          <div className="divide-y divide-border">
            {leaderboardData.map((user, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={clsx(
                  "grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/20 transition-colors",
                  i === 0 ? "bg-gradient-to-r from-yellow-50 to-transparent" : ""
                )}
              >
                <div className="col-span-2 flex justify-center">
                  {user.rank <= 3 ? (
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm",
                      user.rank === 1 ? "bg-yellow-400" :
                      user.rank === 2 ? "bg-slate-400" :
                      "bg-orange-400"
                    )}>
                      {user.rank}
                    </div>
                  ) : (
                    <span className="font-bold text-muted-foreground">#{user.rank}</span>
                  )}
                </div>
                
                <div className="col-span-6 flex items-center gap-3">
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-card" />
                    {user.rank === 1 && (
                      <div className="absolute -top-2 -right-1 text-yellow-500 bg-card rounded-full p-0.5 shadow-sm">
                        <Crown size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{user.name}</h4>
                    <p className="text-xs text-muted-foreground">Level {20 - i}</p>
                  </div>
                </div>
                
                <div className="col-span-4 text-right font-mono font-bold text-accent">
                  {user.xp}
                </div>
              </motion.div>
            ))}
            
            {/* User's Rank Row (Sticky at bottom or separated) */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center bg-primary/10 border-t-2 border-primary/20">
              <div className="col-span-2 text-center font-bold text-primary">#402</div>
              <div className="col-span-6 flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    ME
                 </div>
                 <h4 className="font-bold text-foreground">You</h4>
              </div>
              <div className="col-span-4 text-right font-mono font-bold text-foreground">
                12,450
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">Your Achievements</h2>
        
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, i) => (
             <motion.div
               key={badge.id}
               whileHover={{ scale: 1.05 }}
               className={clsx(
                 "bg-card p-4 rounded-xl border flex flex-col items-center text-center gap-3 relative overflow-hidden",
                 badge.unlocked ? "border-border shadow-sm" : "border-dashed border-border opacity-70 bg-secondary/10"
               )}
             >
               <div className={clsx(
                 "w-16 h-16 rounded-full flex items-center justify-center mb-1",
                 badge.unlocked ? badge.bg : "bg-gray-100"
               )}>
                 <badge.icon size={32} className={badge.unlocked ? badge.color : "text-gray-300"} />
               </div>
               
               <div>
                 <h4 className="font-bold text-sm text-foreground">{badge.name}</h4>
                 <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{badge.description}</p>
               </div>

               {!badge.unlocked && (
                 <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                   <div className="bg-card/90 p-2 rounded-full shadow-sm">
                     <Lock size={16} className="text-muted-foreground" />
                   </div>
                 </div>
               )}
             </motion.div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-accent to-primary p-6 rounded-2xl text-white shadow-lg shadow-accent/20 relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="font-bold text-lg mb-1">Level 12 Scholar</h3>
             <p className="text-white/80 text-sm mb-4">550 XP to Level 13</p>
             
             <div className="h-3 bg-black/20 rounded-full overflow-hidden mb-2">
               <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
             </div>
             <p className="text-xs text-white/70 text-right">75% Complete</p>
           </div>
           
           <Medal className="absolute -bottom-4 -right-4 text-white/20 w-32 h-32 rotate-12" />
        </div>
      </div>
    </div>
  );
}
