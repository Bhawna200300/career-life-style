import React, { useState, useMemo } from 'react';
import { AppTab, JobListing } from '../types';
import { MOCK_JOBS } from '../data';
import { Search, MapPin, Briefcase, Filter, Check, Bookmark, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JobSearchViewProps {
  onNavigate: (tab: AppTab) => void;
  onApply: (title: string, company: string) => void;
  appliedJobIds: string[];
  bookmarkedJobIds: string[];
  onToggleBookmark: (id: string) => void;
}

export default function JobSearchView({ onNavigate, onApply, appliedJobIds, bookmarkedJobIds, onToggleBookmark }: JobSearchViewProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  
  const handleQuickApply = (jobId: string, title: string, company: string) => {
    if (appliedJobIds.includes(jobId)) return;
    onApply(title, company);
  };

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchText.toLowerCase()) ||
                          job.tags.some(t => t.toLowerCase().includes(searchText.toLowerCase()));
      
      const matchType = selectedType === 'All' || job.type === selectedType || (selectedType === 'Remote' && job.isRemote);
      const matchLoc = selectedLocation === 'All' || 
                       (selectedLocation === 'Remote' && job.isRemote) ||
                       (selectedLocation === 'On-site' && !job.isRemote);

      return matchSearch && matchType && matchLoc;
    });
  }, [searchText, selectedType, selectedLocation]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header panel */}
      <section>
        <h1 className="font-headline text-4xl text-primary font-bold mb-4">
          Job Search Hub
        </h1>
        <p className="font-sans text-secondary text-base">
          Connect directly with premium enterprises offering fast-tracked, verified career matching paths synchronized with your Skill Assessment badges.
        </p>
      </section>

      {/* Dual Search bar with remote selection */}
      <section className="bg-surface-container-low border border-outline-variant p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search keywords, job titles, or skills (e.g. React, Analyst, Figma)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-outline-variant bg-white text-sm focus:border-primary outline-none transition-all"
          />
        </div>

        {/* Quick type dropdown */}
        <div className="w-full md:w-52 flex shrink-0 gap-2">
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-outline-variant bg-white font-sans text-sm text-secondary-container-highest focus:border-primary focus:outline-none transition-colors cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time Only</option>
            <option value="Remote">Remote Only</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Quick location filter dropdown */}
        <div className="w-full md:w-52 flex shrink-0 gap-2">
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-outline-variant bg-white font-sans text-sm text-secondary-container-highest focus:border-primary focus:outline-none transition-colors cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Remote">100% Remote</option>
            <option value="On-site">On-site / Hybrid</option>
          </select>
        </div>
      </section>

      {/* Two columns layout: Job Listing details vs Quick checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Result cards (8 cols) */}
        <section className="lg:col-span-8 space-y-5">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-headline text-md font-bold text-primary">
              Enterprise Openings
            </h3>
            <p className="text-xs text-secondary font-medium">
              Showing <span className="text-primary font-bold">{filteredJobs.length}</span> positions match your assessment
            </p>
          </div>

          <div className="space-y-5">
            <AnimatePresence initial={false}>
              {filteredJobs.map((job) => {
                const isApplied = appliedJobIds.includes(job.id);
                const isBookmarked = bookmarkedJobIds.includes(job.id);
                
                return (
                  <motion.div 
                    layout
                    key={job.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm hover:border-primary transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  >
                    {/* Brand Logo box with ReferrerPolicy safe headers */}
                    <div className="w-14 h-14 bg-surface rounded-xl select-none flex items-center justify-center border border-outline-variant/35 overflow-hidden shrink-0">
                      <img src={job.logoUrl} alt={job.company} className="w-10 h-10 object-contain text-xs text-center" referrerPolicy="no-referrer" />
                    </div>

                    {/* Meta Group */}
                    <div className="flex-grow text-left space-y-1.5">
                      <div className="flex flex-wrap gap-2.5 items-center">
                        <span className="font-sans text-sm font-bold text-primary">{job.company}</span>
                        <span className="inline-block w-1 h-1 bg-outline rounded-full"></span>
                        <span className="text-xs text-secondary font-semibold">{job.location}</span>
                      </div>

                      <h4 className="font-headline text-base font-bold text-primary leading-tight">
                        {job.title}
                      </h4>

                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {job.tags.map(tag => (
                          <span key={tag} className="bg-surface-container text-secondary text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right action area */}
                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-outline-variant/40 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-44 gap-4 sm:gap-3">
                      
                      <div className="text-left sm:text-right">
                        <p className="text-[9px] font-bold text-outline uppercase tracking-wide">Est. Salary</p>
                        <p className="text-sm font-bold text-on-surface">{job.salaryStr}</p>
                      </div>

                      <button 
                        onClick={() => handleQuickApply(job.id, job.title, job.company)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold w-full transition-all cursor-pointer ${
                          isApplied 
                            ? 'bg-green-600 text-white cursor-default' 
                            : 'bg-white text-primary border border-primary hover:bg-surface-container'
                        }`}
                      >
                        {isApplied ? (
                          <span className="flex items-center justify-center gap-1 font-extrabold text-white">
                            <Check className="w-3.5 h-3.5 stroke-[2.5px]" />
                            Applied
                          </span>
                        ) : (
                          "Quick Apply"
                        )}
                      </button>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Right Side: Quick tips and Stats (4 cols) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl text-left space-y-4">
            <h4 className="font-headline text-sm font-extrabold text-primary">Fast-Track Hiring Tips</h4>
            <ul className="space-y-4 text-xs text-secondary leading-relaxed font-semibold">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <span>Complete the **General Academic** Skill Test to unlock 4 more elite placements.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <span>Profiles with confirmed verified credentials enjoy **3x high priority recruitment callbacks** inside remote partners.</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary text-on-primary p-7 rounded-2xl relative overflow-hidden text-left">
            <h4 className="font-headline text-lg font-bold mb-2">Verified Placements</h4>
            <p className="text-on-primary-container/85 text-xs leading-relaxed mb-6">
              Connect your verified academic profiles to trigger high-probability salary multipliers with zero friction.
            </p>
            <button 
              onClick={() => onNavigate('test')}
              className="bg-white text-primary px-5 py-2.5 rounded-xl text-xs font-bold hover:scale-95 transition-transform"
            >
              Verify Skills Now
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
