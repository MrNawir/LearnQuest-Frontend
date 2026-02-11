import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Palette, Check, Sun, Moon, User, Mail, Save, Award, Flame, BookOpen, Clock, Trophy, Star, Shield, Edit3 } from 'lucide-react';
import clsx from 'clsx';
import { useThemeStore } from '../stores/themeStore';
import { useAuthStore } from '../stores/authStore';
import { userService } from '../services/userService';
import { gamificationService } from '../services/gamificationService';
import { learningPathService } from '../services/learningPathService';
import { toast } from 'sonner';
import type { UserBadge, LearningPath, UserProgress } from '../types';

export function Settings() {
  const { theme, themes, setTheme } = useThemeStore();
  const { user, updateUser } = useAuthStore();
  const [filterCategory, setFilterCategory] = useState<'All' | 'Light' | 'Dark'>('All');
  const [activeSection, setActiveSection] = useState<'profile' | 'appearance'>('profile');
  const [bio, setBio] = useState(user?.bio || '');
  const [username, setUsername] = useState(user?.username || '');
  const [saving, setSaving] = useState(false);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [myPaths, setMyPaths] = useState<(LearningPath & { progress: UserProgress })[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const [badgesData, pathsData] = await Promise.all([
          gamificationService.getUserBadges(user.id).catch(() => []),
          learningPathService.getMyPaths().catch(() => []),
        ]);
        setBadges(badgesData);
        setMyPaths(pathsData);
      } catch { /* ignore */ }
    };
    load();
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await userService.updateProfile({ username, bio });
      updateUser({ username, bio });
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const filteredThemes = filterCategory === 'All' ? themes : themes.filter(t => t.category === filterCategory);
  const completedPaths = myPaths.filter(p => p.progress?.status === 'completed');

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-base-content">Settings & Profile</h1>
        <p className="text-base-content/60 mt-1">Manage your profile and customize your experience</p>
      </div>

      <div className="flex gap-2">
        {[{ id: 'profile' as const, label: 'Profile', icon: User }, { id: 'appearance' as const, label: 'Appearance', icon: Palette }].map(tab => (
          <button key={tab.id} onClick={() => setActiveSection(tab.id)} className={clsx("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all", activeSection === tab.id ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "bg-base-200 text-base-content/60 hover:bg-base-300")}>
            <tab.icon size={16} />{tab.label}
          </button>
        ))}
      </div>

      {activeSection === 'profile' && (
        <div className="space-y-6">
          <div className="bg-base-200 rounded-2xl border border-base-300 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
              <div className="absolute -bottom-12 left-6">
                <div className="w-24 h-24 rounded-2xl border-4 border-base-200 bg-base-300 overflow-hidden shadow-xl">
                  <img src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="pt-16 px-6 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-base-content">{user?.username}</h2>
                  <p className="text-base-content/60 flex items-center gap-2 mt-1"><Mail size={14} />{user?.email}</p>
                  <span className={clsx("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mt-2", user?.role === 'admin' ? 'bg-red-100 text-red-700' : user?.role === 'contributor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700')}>
                    <Shield size={10} />{user?.role}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{user?.xp?.toLocaleString() || 0} XP</div>
                  <div className="text-sm text-base-content/60">{user?.points?.toLocaleString() || 0} points</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'XP Earned', value: user?.xp?.toLocaleString() || '0', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100' },
              { label: 'Day Streak', value: user?.streak_days || 0, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
              { label: 'Hours Learned', value: Math.round(user?.hours_learned || 0), icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100' },
              { label: 'Paths Done', value: completedPaths.length, icon: Trophy, color: 'text-green-500', bg: 'bg-green-100' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-base-200 rounded-xl border border-base-300 p-4">
                <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center mb-3", s.bg)}><s.icon size={20} className={s.color} /></div>
                <div className="text-2xl font-bold text-base-content">{s.value}</div>
                <div className="text-xs text-base-content/60 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
            <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2"><Award size={20} className="text-primary" />My Badges ({badges.length})</h3>
            {badges.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {badges.map(ub => (
                  <div key={ub.id} className="text-center group">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-base-300 border border-base-300 p-2 group-hover:scale-110 transition-transform">
                      <img src={ub.badge?.icon_url || 'https://api.dicebear.com/7.x/icons/svg?seed=badge'} alt={ub.badge?.name} className="w-full h-full" />
                    </div>
                    <p className="text-xs font-medium text-base-content mt-2 truncate">{ub.badge?.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base-content/60 text-sm">Complete lessons and challenges to earn badges!</p>
            )}
          </div>

          <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
            <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2"><BookOpen size={20} className="text-primary" />Learning Progress</h3>
            {myPaths.length > 0 ? (
              <div className="space-y-4">
                {myPaths.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-base-300 overflow-hidden shrink-0">
                      <img src={p.image_url || ''} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-base-content truncate">{p.title}</h4>
                        <span className="text-xs font-bold text-primary ml-2 shrink-0">{Math.round(p.progress?.progress_percentage || 0)}%</span>
                      </div>
                      <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progress?.progress_percentage || 0}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base-content/60 text-sm">Enroll in a learning path to track your progress!</p>
            )}
          </div>

          <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
            <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2"><Edit3 size={20} className="text-primary" />Edit Profile</h3>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="text-sm font-bold text-base-content mb-1 block">Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-base-300/30 border border-base-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="text-sm font-bold text-base-content mb-1 block">Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full px-4 py-3 bg-base-300/30 border border-base-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" placeholder="Tell us about yourself..." />
              </div>
              <button onClick={handleSaveProfile} disabled={saving} className="px-6 py-3 bg-primary text-primary-content rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-2">
                <Save size={16} />{saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'appearance' && (
        <div className="bg-base-200 rounded-2xl border border-base-300 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg"><Palette size={20} className="text-primary" /></div>
            <div>
              <h2 className="text-xl font-bold text-base-content">Appearance</h2>
              <p className="text-sm text-base-content/60">Choose a theme for the interface</p>
            </div>
          </div>
          <div className="flex gap-2 mb-6">
            {(['All', 'Light', 'Dark'] as const).map(cat => (
              <button key={cat} onClick={() => setFilterCategory(cat)} className={clsx("px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2", filterCategory === cat ? "bg-primary text-primary-content" : "bg-base-300/30 text-base-content/60 hover:bg-base-300/50")}>
                {cat === 'Light' && <Sun size={14} />}{cat === 'Dark' && <Moon size={14} />}{cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredThemes.map(t => (
              <motion.button key={t.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTheme(t.name)} className={clsx("relative rounded-xl border-2 overflow-hidden transition-all", theme === t.name ? "border-primary shadow-lg shadow-primary/20" : "border-base-300 hover:border-primary/50")}>
                <div data-theme={t.name} className="p-3 bg-base-100">
                  <div className="flex gap-1 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary" /><div className="w-2 h-2 rounded-full bg-secondary" /><div className="w-2 h-2 rounded-full bg-accent" /><div className="w-2 h-2 rounded-full bg-neutral" />
                  </div>
                  <div className="space-y-1"><div className="h-1.5 w-full rounded bg-base-content/20" /><div className="h-1.5 w-3/4 rounded bg-base-content/10" /></div>
                </div>
                <div className="px-3 py-2 bg-base-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-base-content truncate">{t.label}</span>
                  {theme === t.name && <Check size={14} className="text-primary shrink-0" />}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
