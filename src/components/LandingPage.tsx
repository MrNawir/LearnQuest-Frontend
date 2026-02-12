import { motion } from 'motion/react';
import {
  BookOpen,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenContact: () => void;
  onOpenAbout?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export function LandingPage({ onOpenAuth, onOpenContact, onOpenAbout, onOpenPrivacy, onOpenTerms }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col font-sans text-base-content">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-xl">
            L
          </div>
          <span className="font-bold text-xl tracking-tight">LearnQuest</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-base-content/60">
          <a href="#features" className="hover:text-base-content transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-base-content transition-colors">How it Works</a>
          <a href="#community" className="hover:text-base-content transition-colors">Community</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onOpenAuth('login')}
            className="text-sm font-medium text-base-content/60 hover:text-base-content hidden sm:block"
          >
            Log In
          </button>
          <button 
            onClick={() => onOpenAuth('signup')}
            className="px-5 py-2.5 bg-primary text-primary-content rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-extrabold tracking-tight text-base-content leading-[1.1] mb-6">
                Master any skill, <br/>
                <span className="text-primary">one quest</span> at a time.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg text-base-content/60 mb-8 max-w-lg leading-relaxed">
                Join the community-driven platform where learning feels like a game. Earn XP, unlock badges, and climb the leaderboards while mastering new skills.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="px-8 py-4 bg-primary text-primary-content rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Start Your Journey <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="px-8 py-4 bg-base-100 border border-base-300 text-base-content rounded-xl font-bold text-lg hover:bg-base-300/50 transition-colors"
                >
                  Explore Courses
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-4 text-sm text-base-content/60">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-base-100 bg-base-300 overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : i === 3 ? '1507003211169-0a1dd7228f2d' : '1438761681033-6461ffad8d80'}?w=60&h=60&fit=crop`} alt="User" />
                    </div>
                  ))}
                </div>
                <p><span className="font-bold text-base-content">10,000+</span> learners joined this week</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-base-300 bg-base-200"
            >
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=1000&fit=crop" 
                alt="Students Learning Together" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Floating Cards */}
              <div className="absolute bottom-8 left-8 right-8 grid gap-4">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">New Achievement!</h3>
                    <p className="text-xs text-muted-foreground">You unlocked "Code Ninja"</p>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 ml-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Daily Goal Met</h3>
                    <div className="w-32 h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                      <div className="w-full h-full bg-green-500"></div>
                    </div>
                    </div>
                  </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-base-200 border-y border-base-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">Learning Reinvented</h2>
               <p className="text-base-content/60 text-lg">We've combined the best parts of online education with the addictiveness of gaming to keep you motivated.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                 {
                   icon: Trophy,
                   title: "Gamified Progress",
                   desc: "Earn XP, level up, and unlock badges as you complete lessons and quizzes.",
                   color: "bg-yellow-100 text-yellow-600"
                 },
                 {
                   icon: Users,
                   title: "Community Driven",
                   desc: "Learn from peer-created content and get help from mentors worldwide.",
                   color: "bg-blue-100 text-blue-600"
                 },
                 {
                   icon: BookOpen,
                   title: "Adaptive Paths",
                   desc: "Structured learning paths that adapt to your pace and learning style.",
                   color: "bg-green-100 text-green-600"
                 }
               ].map((feature, i) => (
                 <div key={i} className="p-8 rounded-2xl bg-base-100 border border-base-300 hover:border-primary transition-colors group cursor-default">
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                       <feature.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-3">{feature.title}</h3>
                    <p className="text-base-content/60 leading-relaxed">
                      {feature.desc}
                    </p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
           <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-base-content mb-6">Ready to start your quest?</h2>
              <p className="text-xl text-base-content/60 mb-10">Join thousands of learners today and turn your study time into game time.</p>
              <button 
                onClick={() => onOpenAuth('signup')}
                className="px-10 py-4 bg-primary text-primary-content rounded-full font-bold text-xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all"
              >
                Join for Free
              </button>
              <p className="mt-4 text-sm text-base-content/60">No credit card required • Cancel anytime</p>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral text-neutral-content">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="border border-neutral-content/10 rounded-2xl p-10 md:p-14">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-lg">
                L
              </div>
              <span className="font-bold text-xl text-neutral-content">LearnQuest</span>
            </div>

            {/* Column Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-10">
              {/* Platform */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-content/40 mb-5">Platform</h4>
                <ul className="space-y-3 text-sm">
                  <li><button onClick={() => onOpenAuth('signup')} className="text-neutral-content/70 hover:text-neutral-content transition-colors">Learning Paths</button></li>
                  <li><button onClick={() => onOpenAuth('signup')} className="text-neutral-content/70 hover:text-neutral-content transition-colors">Challenges</button></li>
                  <li><button onClick={() => onOpenAuth('signup')} className="text-neutral-content/70 hover:text-neutral-content transition-colors">Leaderboard</button></li>
                  <li><button onClick={() => onOpenAuth('signup')} className="text-neutral-content/70 hover:text-neutral-content transition-colors">Creator Studio</button></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-content/40 mb-5">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li><button onClick={onOpenAbout} className="text-neutral-content/70 hover:text-neutral-content transition-colors">About us</button></li>
                  <li><button onClick={onOpenPrivacy} className="text-neutral-content/70 hover:text-neutral-content transition-colors">Privacy policy</button></li>
                  <li><button onClick={onOpenTerms} className="text-neutral-content/70 hover:text-neutral-content transition-colors">Terms of service</button></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-content/40 mb-5">Resources</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#features" className="text-neutral-content/70 hover:text-neutral-content transition-colors">Features</a></li>
                  <li><a href="#how-it-works" className="text-neutral-content/70 hover:text-neutral-content transition-colors">How it Works</a></li>
                  <li><a href="#community" className="text-neutral-content/70 hover:text-neutral-content transition-colors">Community</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-content/10 py-5 text-center text-xs text-neutral-content/30">
          &copy; {new Date().getFullYear()} LearnQuest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
