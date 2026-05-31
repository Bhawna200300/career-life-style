import React, { useState } from 'react';
import { AppTab } from '../types';
import { IMAGES } from '../data';
import { ArrowRight, Brain, Compass, Award, Briefcase, FileCheck, CheckCircle2, Search, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (tab: AppTab) => void;
  onSignUpClick: () => void;
}

export default function HomeView({ onNavigate, onSignUpClick }: HomeViewProps) {
  const [skillInput, setSkillInput] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAiAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      // Realistic high-quality computed suggestions based on keywords
      const upper = skillInput.toUpperCase();
      let recommendations = ["Product Manager (A+ Match)", "UX Researcher", "Operations Lead"];
      if (upper.includes("JAVASCRIPT") || upper.includes("REACT") || upper.includes("PYTHON") || upper.includes("CODE")) {
        recommendations = ["Senior UI/UX Engineer", "AI Integrator Consultant", "Distributed Systems Engineer"];
      } else if (upper.includes("FINANCE") || upper.includes("INVEST") || upper.includes("DATA") || upper.includes("SQL")) {
        recommendations = ["Data Scientist Lead", "Quantitative Risk Architect", "Corporate Strategy Manager"];
      }
      setAiSuggestions(recommendations);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[620px] md:min-h-[720px] lg:min-h-[820px] flex items-center overflow-hidden">
        {/* Background Image & Ambient Blur Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover select-none" 
            src={IMAGES.heroAtrium} 
            alt="Career Lift modern atrium office background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/92 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="max-w-2xl">
            {/* Animated Pill Tag */}
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
            >
              Your Future Starts Now
            </motion.span>
            
            {/* Display Typography Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-headline text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-6 leading-tight select-none tracking-tight"
            >
              Lift Your Career to <br />
              <span className="text-primary-container relative">
                New Heights
                <span className="absolute left-0 bottom-1 w-full h-1.5 bg-secondary-container/50 -z-10"></span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-lg text-secondary mb-10 leading-relaxed max-w-xl"
            >
              Navigate the complexities of the modern job market with AI-driven insights, state-of-the-art skill assessment tools, and a global network of opportunities tailored just for you.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => onNavigate('dashboard')}
                className="bg-white text-primary border border-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('careers')}
                className="bg-surface-container-lowest border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-low hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
              >
                View Career Paths
              </button>
            </motion.div>

            {/* Elevated Professionals Avatars Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex items-center gap-4 border-t border-outline-variant/50 pt-8"
            >
              <div className="flex -space-x-3 select-none">
                <img className="w-10 h-10 rounded-full border-2 border-surface-container-lowest object-cover" src={IMAGES.user1} alt="User One" referrerPolicy="no-referrer" />
                <img className="w-10 h-10 rounded-full border-2 border-surface-container-lowest object-cover" src={IMAGES.user2} alt="User Two" referrerPolicy="no-referrer" />
                <img className="w-10 h-10 rounded-full border-2 border-surface-container-lowest object-cover" src={IMAGES.user3} alt="User Three" referrerPolicy="no-referrer" />
              </div>
              <p className="text-secondary text-sm font-medium">
                <span className="text-primary font-bold">50k+</span> professionals already elevated
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section in Solid Navy Accent */}
      <section className="bg-primary text-on-primary py-12 relative shadow-inner overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { score: '12,000+', title: 'Career Paths' },
              { score: '85%', title: 'Success Rate' },
              { score: '200+', title: 'Skill Tests' },
              { score: '500k', title: 'Active Jobs' }
            ].map((stat, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-on-primary mb-1 mt-1 group-hover:scale-105 transition-transform duration-350">
                  {stat.score}
                </div>
                <div className="font-sans text-xs uppercase tracking-wider text-on-primary-container/70 font-semibold">
                  {stat.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid layout */}
      <section className="py-24 bg-surface-bright">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-4">
              Precision Tools for Modern Professionals
            </h2>
            <p className="font-sans text-secondary max-w-2xl mx-auto">
              Our high-trust ecosystem combines cutting-edge data science with institutional academic rigor to provide a targeted, step-by-step roadmap for your professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
            
            {/* LARGE Bento Card: AI Suggestions interactive panel */}
            <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              
              {/* Background network visualization accent */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-18 pointer-events-none">
                <img className="w-full h-full object-contain filter saturate-105 select-none" src={IMAGES.aiSuggestionsNet} alt="Neural nodes" referrerPolicy="no-referrer" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-secondary-container text-primary rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 stroke-[2.2px]" />
                </div>
                <h3 className="font-headline text-2xl text-primary font-bold mb-4">
                  AI Recommendations Engine
                </h3>
                <p className="text-secondary max-w-md text-sm leading-relaxed mb-6">
                  Our proprietary intelligence engine analyzes your current skill sets, education, and professional background to instantly recommend high-growth career pivots you haven't considered.
                </p>

                {/* Micro interactive skill inputs form */}
                <form onSubmit={handleAiAnalyze} className="relative max-w-md flex gap-2">
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Enter skills (e.g. React, SQL, Management)..."
                    className="flex-grow px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-sm focus:border-primary focus:ring-3 focus:outline-none focus:ring-secondary-container transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-primary border border-primary px-4 py-2 rounded-xl text-xs font-bold hover:scale-95 transition-transform"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? "Processing..." : "Analyze"}
                  </button>
                </form>

                {aiSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-surface-container-low p-3.5 rounded-xl border border-outline-variant max-w-md"
                  >
                    <p className="text-xs font-bold text-primary mb-2">Recommended Paths matched to you:</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSuggestions.map((rec, idx) => (
                        <span key={idx} className="bg-surface-container-lowest text-primary font-semibold text-xs px-2.5 py-1 rounded-lg border border-outline-variant">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t border-outline-variant/30 pt-4 mt-6">
                <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-[11px] font-bold tracking-wide">
                  POPULAR
                </span>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="text-primary font-bold text-sm flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Try AI Matcher <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bento Card: Career Explorer Navigation Link */}
            <div 
              onClick={() => onNavigate('careers')}
              className="md:col-span-4 md:row-span-1 group rounded-2xl border border-outline-variant bg-surface-container-low p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer flex flex-col justify-between h-auto"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-white text-primary rounded-xl shadow-sm">
                  <Compass className="w-5 h-5 stroke-[2.2px]" />
                </div>
                <ArrowRight className="w-5 h-5 text-outline/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-primary mb-1 group-hover:text-primary-container">
                  Career Explorer
                </h4>
                <p className="text-secondary text-xs leading-relaxed">
                  Discover 12,000+ detailed job profiles with actual localized salary ranges and requirements.
                </p>
              </div>
            </div>

            {/* Bento Card: Skill Testing Navigation Link */}
            <div 
              onClick={() => onNavigate('test')}
              className="md:col-span-4 md:row-span-1 group rounded-2xl border border-outline-variant bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md cursor-pointer flex flex-col justify-between h-auto"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-secondary-container text-primary rounded-xl">
                  <Award className="w-5 h-5 stroke-[2.2px]" />
                </div>
                <ArrowRight className="w-5 h-5 text-outline/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-primary mb-1 group-hover:text-primary-container">
                  Skill Assessment
                </h4>
                <p className="text-secondary text-xs leading-relaxed">
                  Verify your technical competence using rigorous, industry-standard assessments.
                </p>
              </div>
            </div>

            {/* Bento Card: Job Search panel */}
            <div 
              onClick={() => onNavigate('jobs')}
              className="md:col-span-4 md:row-span-1 group rounded-2xl bg-primary p-7 text-on-primary flex flex-col justify-between hover:scale-[1.01] hover:shadow-lg transition-all cursor-pointer"
            >
              <div>
                <h4 className="font-headline text-lg font-bold mb-2">Job Search Hub</h4>
                <p className="text-on-primary-container/85 text-xs leading-relaxed">
                  Direct pathways to top-tier enterprise employers searching for candidates with verified skill profiles.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-white/10 rounded-lg text-[9px] border border-white/20 font-bold tracking-wider">STANFORD</div>
                <div className="px-2 py-1 bg-white/10 rounded-lg text-[9px] border border-white/20 font-bold tracking-wider">GOOGLE</div>
                <div className="px-2 py-1 bg-white/10 rounded-lg text-[9px] border border-white/20 font-bold tracking-wider">HORIZON</div>
              </div>
            </div>

            {/* Bento Card: Check Match Demonstration */}
            <div className="md:col-span-8 md:row-span-1 glass-card border border-outline-variant rounded-2xl p-6.5 flex items-center gap-6 shadow-sm">
              <div className="hidden sm:block shrink-0 relative">
                <div className="w-22 h-22 rounded-full border-4 border-secondary-container flex items-center justify-center">
                  <span className="font-headline font-bold text-xl text-primary">94%</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-600 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Great Match
                  </span>
                  <span className="bg-surface-container text-secondary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    DATA SCIENCE
                  </span>
                </div>
                <h4 className="font-headline text-lg text-primary font-bold mb-1">
                  Senior Data Analyst
                </h4>
                <p className="text-secondary text-xs leading-relaxed">
                  Your skill profile matches 94% of this role's key requirements based on your certified SQL assessment score.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Accent Banner */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/30 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/15 blur-[100px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl text-primary font-bold mb-6">
            Ready to Accelerate Your Journey?
          </h2>
          <p className="font-sans text-secondary mb-10 max-w-2xl mx-auto text-base">
            Join thousands of ambitious professionals who have successfully verified their expertise, discovered new roles, and unlocked dynamic salary gains.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onSignUpClick}
              className="bg-white text-primary border border-primary px-8 py-3.5 rounded-xl font-bold hover:shadow-xl hover:bg-surface transition-all cursor-pointer font-label"
            >
              Create Free Account
            </button>
            <button 
              onClick={() => onNavigate('careers')}
              className="bg-surface-container-lowest border border-outline text-secondary px-8 py-3.5 rounded-xl font-bold hover:bg-surface-container-low hover:scale-[1.02] transition-all cursor-pointer"
            >
              Explore Programs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
