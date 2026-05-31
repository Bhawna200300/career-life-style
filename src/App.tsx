import React, { useState } from 'react';
import { AppTab, ActivityLog } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import ExploreCareersView from './components/ExploreCareersView';
import SkillTestView from './components/SkillTestView';
import JobSearchView from './components/JobSearchView';
import InstitutionFinderView from './components/InstitutionFinderView';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Pre-logged in as Jordan to match UI state
  const [userName, setUserName] = useState('Jordan');
  
  // Custom dialog state for overlays
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('signup');
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Profile strength & chronological log milestones state
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [appliedJobsList, setAppliedJobsList] = useState<string[]>([]);
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>([]);
  const [bookmarkedCareerIds, setBookmarkedCareerIds] = useState<string[]>([]);

  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: 'act_1',
      type: 'test_completed',
      title: 'Skill Test Completed: UX Strategy',
      description: 'Scored 94% on General Academic UX query parameters',
      timestamp: '2 hours ago',
      badge: { text: 'PASSED', type: 'success' }
    },
    {
      id: 'act_2',
      type: 'career_viewed',
      title: 'Viewed Career Path: Product Manager',
      description: 'Browsed core salaries & program listings near Berkeley, CA',
      timestamp: '1 day ago'
    },
    {
      id: 'act_3',
      type: 'goal_updated',
      title: 'Updated Target Career Goal',
      description: 'Set target primary goal path to focus on technical UI Architecture',
      timestamp: '2 days ago'
    }
  ]);

  // Append new logs programmatically on client execution
  const addActivity = (type: ActivityLog['type'], title: string, description: string, badgeText?: string) => {
    const freshLog: ActivityLog = {
      id: `act_gen_${Date.now()}`,
      type,
      title,
      description,
      timestamp: 'Just now',
      badge: badgeText ? { text: badgeText, type: 'success' } : undefined
    };
    setActivities([freshLog, ...activities]);
  };

  const handleApplyJob = (title: string, company: string) => {
    // Append to applied list
    if (!appliedJobsList.includes(title)) {
      setAppliedJobsList([...appliedJobsList, title]);
      addActivity('job_applied', `Applied for ${title}`, `Submitted application to ${company} for initial verification cycle.`);
      showFlashNotification(`Application submitted for ${title}!`);
    }
  };

  // Callback from job search specific ID apply clicks
  const handleApplyJobId = (title: string, company: string) => {
    const mockId = `job_${Date.now()}`;
    setAppliedJobIds([...appliedJobIds, mockId]);
    handleApplyJob(title, company);
  };

  const handleViewCareerCallback = (title: string) => {
    addActivity('career_viewed', `Viewed Career Path: ${title}`, `Reviewed details for ${title} salary guidelines.`);
  };

  const handleTestCompleteCallback = (score: number) => {
    addActivity('test_completed', 'General Academic Competence Test', `Finished standard assessment mapping with score of ${score}%`, 'PASSED');
    showFlashNotification(`Certified skill score of ${score}% saved!`);
  };

  const handleToggleBookmarkJob = (id: string) => {
    if (bookmarkedJobIds.includes(id)) {
      setBookmarkedJobIds(bookmarkedJobIds.filter(x => x !== id));
    } else {
      setBookmarkedJobIds([...bookmarkedJobIds, id]);
    }
  };

  const handleToggleBookmarkCareer = (id: string) => {
    if (bookmarkedCareerIds.includes(id)) {
      setBookmarkedCareerIds(bookmarkedCareerIds.filter(x => x !== id));
    } else {
      setBookmarkedCareerIds([...bookmarkedCareerIds, id]);
    }
  };

  const showFlashNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authType === 'signup' && tempName.trim()) {
      setUserName(tempName);
    } else if (tempEmail.trim()) {
      setUserName(tempEmail.split('@')[0]);
    }
    setIsLoggedIn(true);
    setShowAuthModal(false);
    showFlashNotification(`Welcome to Career Lift System!`);
    setTempName('');
    setTempEmail('');
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView 
            onNavigate={(tab) => setCurrentTab(tab)}
            activities={activities}
            onApplyJob={handleApplyJob}
            appliedJobsList={appliedJobsList}
          />
        );
      case 'careers':
        return (
          <ExploreCareersView 
            onNavigate={(tab) => setCurrentTab(tab)}
            onViewCareer={handleViewCareerCallback}
            bookmarkedCareerIds={bookmarkedCareerIds}
            onToggleBookmark={handleToggleBookmarkCareer}
          />
        );
      case 'test':
        return (
          <SkillTestView 
            onNavigate={(tab) => setCurrentTab(tab)}
            onTestComplete={handleTestCompleteCallback}
          />
        );
      case 'jobs':
        return (
          <JobSearchView 
            onNavigate={(tab) => setCurrentTab(tab)}
            onApply={handleApplyJobId}
            appliedJobIds={appliedJobIds}
            bookmarkedJobIds={bookmarkedJobIds}
            onToggleBookmark={handleToggleBookmarkJob}
          />
        );
      case 'institutions':
        return (
          <InstitutionFinderView 
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        );
      case 'home':
      default:
        return (
          <HomeView 
            onNavigate={(tab) => setCurrentTab(tab)}
            onSignUpClick={() => { setAuthType('signup'); setShowAuthModal(true); }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background-custom text-on-background-custom font-sans flex flex-col justify-start">
      
      {/* Top sticky app navigation bar */}
      <Header 
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        onSignUpClick={() => { setAuthType('signup'); setShowAuthModal(true); }}
        onLoginClick={() => { setAuthType('login'); setShowAuthModal(true); }}
        isLoggedIn={isLoggedIn}
      />

      {/* Flash Action feedback toasts */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-primary text-white border border-secondary px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-bold text-xs"
          >
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white stroke-[3.5px]" />
            </div>
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main active layout viewport wrapping */}
      <main className="flex-grow">
        {currentTab === 'home' ? (
          <div>
            {renderActiveView()}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            {renderActiveView()}
          </div>
        )}
      </main>

      {/* Simple high-trust semantic footer */}
      <footer className="bg-surface-container border-t border-outline-variant py-10 mt-20 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-secondary">
          <p>© 2026 Career Lift System. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => { e.preventDefault(); setCurrentTab('home'); }} className="hover:text-primary transition-colors">Home</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* REGISTER / SIGNUP popup Dialog overlay */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/45 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest max-w-sm w-full rounded-2xl border border-outline-variant p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer p-1 rounded-full hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-headline text-xl text-primary font-bold mb-2">
                {authType === 'signup' ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className="text-secondary text-xs mb-6">
                Lift your career potential. Register to sync and unlock test badges immediately.
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
                {authType === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="e.g. Jordan" 
                      className="w-full text-sm p-3 border border-outline-variant rounded-xl bg-surface focus:border-primary outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    placeholder="you@domain.com" 
                    className="w-full text-sm p-3 border border-outline-variant rounded-xl bg-surface focus:border-primary outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-outline uppercase tracking-wider mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••" 
                    className="w-full text-sm p-3 border border-outline-variant rounded-xl bg-surface focus:border-primary outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-white text-primary border border-primary font-bold text-xs rounded-xl shadow-sm hover:bg-surface-container transition-all cursor-pointer mt-4"
                >
                  {authType === 'signup' ? 'Sign Up' : 'Log In'}
                </button>
              </form>

              <div className="mt-6 border-t border-outline-variant/50 pt-5 text-center">
                <button 
                  onClick={() => setAuthType(authType === 'signup' ? 'login' : 'signup')}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer"
                >
                  {authType === 'signup' ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
