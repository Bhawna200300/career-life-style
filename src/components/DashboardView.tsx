import React, { useState } from 'react';
import { AppTab, ActivityLog, JobListing } from '../types';
import { IMAGES } from '../data';
import { 
  Rocket, 
  Award, 
  Brain, 
  CheckCircle2, 
  Eye, 
  ChevronRight, 
  Info, 
  ArrowRight,
  Briefcase,
  Search,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardViewProps {
  onNavigate: (tab: AppTab) => void;
  activities: ActivityLog[];
  onApplyJob: (jobTitle: string, company: string) => void;
  appliedJobsList: string[];
}

export default function DashboardView({ onNavigate, activities, onApplyJob, appliedJobsList }: DashboardViewProps) {
  const [profileStrength, setProfileStrength] = useState(85);
  const [isApplying, setIsApplying] = useState(false);
  const [demoApplied, setDemoApplied] = useState(appliedJobsList.includes('Senior Experience Lead'));

  const handleApplyDemoJob = () => {
    if (demoApplied) return;
    setIsApplying(true);
    setTimeout(() => {
      onApplyJob('Senior Experience Lead', 'TechNova Systems');
      setDemoApplied(true);
      setIsApplying(false);
      setProfileStrength(88); // Boost profile strength on action
    }, 900);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'test_completed':
        return (
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case 'career_viewed':
        return (
          <div className="w-12 h-12 rounded-full bg-blue-50 text-primary flex items-center justify-center">
            <Eye className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case 'goal_updated':
        return (
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Rocket className="w-6 h-6 stroke-[2px]" />
          </div>
        );
      case 'job_applied':
      default:
        return (
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
            <Briefcase className="w-6 h-6 stroke-[2px]" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Hero header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/35">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-2">
            Welcome back, Jordan!
          </h1>
          <p className="text-secondary text-sm md:text-base">
            You're making great progress towards your <span className="font-bold text-primary">Senior Architect</span> target career goal.
          </p>
        </div>

        {/* Profile Completion indicator Card */}
        <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm w-full md:w-[340px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Profile Strength</span>
            <span className="text-primary font-extrabold text-sm">{profileStrength}%</span>
          </div>
          {/* Progress track */}
          <div className="w-full bg-secondary-container h-2.5 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="bg-primary h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${profileStrength}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <button 
            onClick={() => setProfileStrength(100)}
            className="text-primary text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Complete your profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Quick Nav Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Core Explore module */}
        <div 
          onClick={() => onNavigate('careers')}
          className="md:col-span-2 group bg-primary-container text-on-primary p-8 rounded-2xl elevation-1 flex flex-col justify-between hover:shadow-md cursor-pointer relative overflow-hidden h-64"
        >
          {/* Ambient Rocket icon decoration */}
          <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Rocket className="w-40 h-40" />
          </div>

          <div className="relative z-10">
            <span className="bg-secondary-container text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">
              EXPLORE
            </span>
            <h3 className="font-headline text-2xl text-white font-bold mb-2">
              Explore Career Paths
            </h3>
            <p className="text-white/80 text-xs leading-relaxed max-w-xs">
              Discover over 12,000+ detailed job tracks mapped against your psychometric credentials.
            </p>
          </div>
          
          <div className="relative z-10 text-white group-hover:translate-x-1.5 transition-transform duration-300">
            <ArrowRight className="w-6 h-6 stroke-[2px]" />
          </div>
        </div>

        {/* Challenge/Skill assessment panel */}
        <div 
          onClick={() => onNavigate('test')}
          className="group bg-surface-container-lowest p-8 rounded-2xl border-l-4 border-primary elevation-1 flex flex-col justify-between hover:shadow-md cursor-pointer h-64"
        >
          <div>
            <div className="w-12 h-12 bg-secondary-container text-primary rounded-xl flex items-center justify-center mb-5">
              <Award className="w-6 h-6 stroke-[2px]" />
            </div>
            <h3 className="font-headline text-lg font-bold text-primary mb-1">
              Test Certified Skills
            </h3>
            <p className="text-secondary text-xs leading-normal">
              Validate your core expertise using industry-standard certified queries.
            </p>
          </div>
          <span className="text-xs text-primary font-bold inline-flex items-center gap-1 group-hover:underline">
            Launch Test <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Personal Suggestions Roadmap Module */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="group bg-surface-container-lowest p-8 rounded-2xl border-l-4 border-secondary elevation-1 flex flex-col justify-between hover:shadow-md cursor-pointer h-64"
        >
          <div>
            <div className="w-12 h-12 bg-surface-container-high text-secondary rounded-xl flex items-center justify-center mb-5">
              <Brain className="w-6 h-6 stroke-[2px]" />
            </div>
            <h3 className="font-headline text-lg font-bold text-primary mb-1">
              AI Recommendations
            </h3>
            <p className="text-secondary text-xs leading-normal">
              Get intelligent progression tracks optimized specifically around your profile.
            </p>
          </div>
          <span className="text-xs text-secondary font-bold inline-flex items-center gap-1 group-hover:underline">
            View Analytics <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </section>

      {/* Main activities list and sidebar matches panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Recent Activity log items list */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-xl font-bold text-primary">
              Recent Career Progress Activities
            </h2>
            <button className="text-secondary hover:text-primary transition-all text-xs font-bold">
              View All History
            </button>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {activities.map((activity) => (
                <motion.div 
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-surface-container-lowest p-4.5 rounded-xl border border-outline-variant/50 flex items-center gap-4 hover:bg-surface-container-low transition-all"
                >
                  {getActivityIcon(activity.type)}
                  
                  <div className="flex-grow">
                    <h4 className="font-sans text-sm font-bold text-primary leading-snug">
                      {activity.title}
                    </h4>
                    <p className="text-secondary text-xs mt-0.5 font-medium">
                      {activity.description} • {activity.timestamp}
                    </p>
                  </div>

                  {activity.badge && (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      activity.badge.type === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-primary-container text-on-primary-container'
                    }`}>
                      {activity.badge.text}
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Right Side: Sidebar Top Matches highlight card */}
        <section className="lg:col-span-4 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-headline text-xl font-bold text-primary">
              Smart Top Match
            </h2>
            <Info className="w-5 h-5 text-secondary cursor-help" />
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden group">
            {/* Ambient Office image header with match overlay */}
            <div className="h-28 bg-primary-container relative overflow-hidden select-none">
              <img 
                src={IMAGES.officeInterior} 
                alt="Modern corporate office preview" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-xl text-primary font-extrabold text-xs shadow-sm">
                98% Match
              </div>
            </div>

            <div className="p-5">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                TECH • FULL-TIME
              </span>
              <h4 className="font-headline text-md font-bold text-primary mb-1 leading-snug">
                Senior Experience Lead
              </h4>
              <p className="text-xs text-secondary mb-5 font-semibold">
                TechNova Systems • Silicon Valley (Remote eligible)
              </p>
              
              <button 
                onClick={handleApplyDemoJob}
                disabled={demoApplied || isApplying}
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  demoApplied 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-white text-primary border border-primary hover:bg-surface-container'
                }`}
              >
                {isApplying ? (
                  "Sending Application..."
                ) : demoApplied ? (
                  <span className="flex items-center justify-center gap-1.5 font-extrabold text-white">
                    <Check className="w-4 h-4 stroke-[2.5px]" />
                    Applied via System
                  </span>
                ) : (
                  "Apply Now"
                )}
              </button>
            </div>
          </div>

          {/* Nav shortcut button to discover more matching listings */}
          <button 
            onClick={() => onNavigate('jobs')}
            className="w-full h-18 border-2 border-dashed border-outline-variant rounded-xl text-secondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Search className="w-4.5 h-4.5 group-hover:animate-pulse" />
            <span className="text-xs font-bold font-label">Search Careers & Jobs</span>
          </button>
        </section>

      </div>
    </div>
  );
}
