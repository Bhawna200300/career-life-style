import React, { useState, useMemo } from 'react';
import { AppTab, CareerPath } from '../types';
import { MOCK_CAREER_PATHS } from '../data';
import { Search, Grid, List, ChevronRight, X, Briefcase, GraduationCap, DollarSign, ArrowUpRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExploreCareersViewProps {
  onNavigate: (tab: AppTab) => void;
  onViewCareer: (title: string) => void;
  bookmarkedCareerIds: string[];
  onToggleBookmark: (id: string) => void;
}

export default function ExploreCareersView({ onNavigate, onViewCareer, bookmarkedCareerIds, onToggleBookmark }: ExploreCareersViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>(['Tech']); // Pre-check Tech to match mockup screenshot
  const [educationLevel, setEducationLevel] = useState('Any Level');
  const [salaryLimit, setSalaryLimit] = useState(250000);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);

  // Field checklist toggles
  const handleFieldToggle = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleClearFilters = () => {
    setSelectedFields([]);
    setEducationLevel('Any Level');
    setSalaryLimit(250000);
    setSearchTerm('');
  };

  // Filter career paths based on search + selected criteria
  const filteredCareers = useMemo(() => {
    return MOCK_CAREER_PATHS.filter(career => {
      // Search matches
      const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            career.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Field matches: If nothing selected, show all fields. Otherwise, check match.
      const matchesField = selectedFields.length === 0 || 
                           selectedFields.some(f => {
                             if (f === 'Law' || f === 'Finance') {
                               return career.field === 'Finance' || career.field === 'Finance & Law';
                             }
                             return career.field === f;
                           });
      
      // Education level matches
      const matchesEdu = educationLevel === 'Any Level' || career.education === educationLevel;
      
      // Salary matches (within range limit)
      const matchesSalary = career.salaryNum <= salaryLimit || career.salaryNum >= 400000; // surgeons high bracket

      return matchesSearch && matchesField && matchesEdu && matchesSalary;
    });
  }, [searchTerm, selectedFields, educationLevel, salaryLimit]);

  const handleOpenDetails = (career: CareerPath) => {
    setSelectedCareer(career);
    onViewCareer(career.title); // Logs achievement callback for Activity log
  };

  const handleShowInstitutions = () => {
    setSelectedCareer(null);
    onNavigate('institutions'); // Switch to institutions finder map
  };

  return (
    <div className="space-y-10">
      {/* Header discover bar */}
      <section className="mb-12">
        <h1 className="font-headline text-4xl text-primary font-bold mb-4 select-none tracking-tight">
          Discover Your Future
        </h1>
        <p className="font-sans text-secondary text-base md:text-lg max-w-2xl">
          Browse hundreds of career paths, analyze real academic/financial salary records, and find the perfect match aligned with your skills and aspirations.
        </p>

        {/* Floating search input bar */}
        <div className="relative max-w-3xl mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search career titles (e.g. UX Designer, Surgeon, Financial Analyst...)..."
            className="w-full pl-12 pr-28 py-4.5 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-secondary-container transition-all outline-none font-sans text-sm shadow-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-primary border border-primary px-6 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-surface-container transition-transform cursor-pointer">
            Search
          </button>
        </div>
      </section>

      {/* Grid search with filters sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Traditional high-trust academic Filters sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-8 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6.5 shadow-sm h-fit">
          <div>
            <h3 className="font-headline text-lg font-bold text-primary mb-6">
              Filters
            </h3>

            {/* Field industrial area checkboxes */}
            <div className="space-y-3.5 mb-8">
              <label className="block text-xs font-bold text-outline uppercase tracking-wider">
                Industrial Field
              </label>
              <div className="space-y-2.5">
                {['Tech', 'Healthcare', 'Finance', 'Law'].map((field) => (
                  <label key={field} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedFields.includes(field)}
                      onChange={() => handleFieldToggle(field)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container/30"
                    />
                    <span className="font-sans text-sm text-on-surface font-medium group-hover:text-primary transition-colors">
                      {field}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Education selectors filter */}
            <div className="space-y-3 mb-8">
              <label className="block text-xs font-bold text-outline uppercase tracking-wider">
                Education Target
              </label>
              <select 
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full p-3 rounded-lg border border-outline-variant bg-surface font-sans text-sm text-on-surface focus:border-primary outline-none focus:ring-2 focus:ring-secondary-container transition-all"
              >
                <option>Any Level</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Doctorate / Professional</option>
                <option>Associate / Certificate</option>
              </select>
            </div>

            {/* Salary budget range limit */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-outline uppercase tracking-wider">
                Salary Range Limit
              </label>
              <div className="px-1">
                <input 
                  type="range"
                  min="30000"
                  max="250000"
                  step="10000"
                  value={salaryLimit}
                  onChange={(e) => setSalaryLimit(Number(e.target.value))}
                  className="w-full h-2 bg-secondary-container rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between items-center mt-2 text-[11px] text-outline font-semibold">
                  <span>$30k</span>
                  <span className="text-primary font-bold">Max: ${(salaryLimit/1000).toFixed(0)}k</span>
                  <span>$250k+</span>
                </div>
              </div>
            </div>

          </div>

          <button 
            onClick={handleClearFilters}
            className="w-full py-3 border-2 border-primary text-primary font-bold text-xs rounded-xl hover:bg-surface-container-low transition-all cursor-pointer"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Right Side: Matches grids panel */}
        <div className="flex-grow">
          
          {/* List stats metadata header */}
          <div className="flex justify-between items-center mb-6">
            <p className="font-sans text-sm text-secondary font-medium">
              Showing <span className="text-on-surface font-extrabold">{filteredCareers.length}</span> high probability paths
            </p>
            
            {/* View layout selectors */}
            <div className="flex gap-2">
              <button 
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  isGridView ? 'bg-secondary-container text-primary' : 'hover:bg-surface-container text-outline'
                }`}
                title="Grid layout"
              >
                <Grid className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-lg cursor-pointer transition-all ${
                  !isGridView ? 'bg-secondary-container text-primary' : 'hover:bg-surface-container text-outline'
                }`}
                title="List layout"
              >
                <List className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {filteredCareers.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
              <p className="text-secondary text-sm font-semibold mb-2">No matching career paths located.</p>
              <button 
                onClick={handleClearFilters}
                className="text-primary font-bold text-xs hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : isGridView ? (
            /* Grid display view */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.map((career) => (
                <motion.div 
                  layoutId={`career-card-${career.id}`}
                  key={career.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant elevation-1 flex flex-col group overflow-hidden transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <div className="h-40 w-full overflow-hidden bg-surface-container relative select-none">
                    <img 
                      src={career.image} 
                      alt={career.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {career.matchScore && (
                      <span className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg text-primary font-extrabold text-[11px] shadow-sm">
                        {career.matchScore}% Match
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-secondary-container text-primary font-bold text-[10px] rounded-full uppercase tracking-wider mb-3">
                        {career.field}
                      </span>
                      <h4 className="font-headline text-base font-bold text-primary mb-2 line-clamp-1">
                        {career.title}
                      </h4>
                      <p className="text-secondary text-xs leading-relaxed line-clamp-3 mb-6">
                        {career.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4.5 border-t border-outline-variant/40">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-outline">Avg Salary</p>
                        <p className="text-sm font-extrabold text-on-surface">{career.avgSalary}</p>
                      </div>
                      <button 
                        onClick={() => handleOpenDetails(career)}
                        className="bg-white text-primary border border-primary px-4 py-2 rounded-xl text-xs font-bold hover:scale-95 transition-transform cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Traditional sequential horizontal list layout */
            <div className="space-y-4">
              {filteredCareers.map((career) => (
                <motion.div 
                  layoutId={`career-row-${career.id}`}
                  key={career.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 flex flex-col sm:flex-row items-center gap-5 hover:border-primary hover:shadow-sm"
                >
                  <div className="h-24 w-24 rounded-xl overflow-hidden bg-surface-container shrink-0 select-none">
                    <img src={career.image} alt={career.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5 justify-center sm:justify-start">
                      <h4 className="font-headline text-lg font-bold text-primary">
                        {career.title}
                      </h4>
                      <span className="inline-block px-2.5 py-0.5 bg-secondary-container text-primary font-bold text-[9px] rounded-full uppercase w-fit mx-auto sm:mx-0">
                        {career.field}
                      </span>
                    </div>
                    <p className="text-secondary text-xs line-clamp-2 pr-4 leading-normal">
                      {career.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-outline-variant/50 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-36 flex flex-row sm:flex-col justify-between sm:justify-center gap-1">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-outline">Avg Salary</p>
                      <p className="text-sm font-extrabold text-primary">{career.avgSalary}</p>
                    </div>
                    <button 
                      onClick={() => handleOpenDetails(career)}
                      className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* OVERLAY DETAILS MODAL DESIGN */}
      <AnimatePresence>
        {selectedCareer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/45 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-surface-container-lowest border border-outline-variant max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedCareer(null)}
                className="absolute top-4 right-4 bg-white/70 hover:bg-white p-2 rounded-full text-secondary shadow-md hover:text-primary transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-56 relative select-none">
                <img src={selectedCareer.image} alt={selectedCareer.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <span className="bg-secondary-container text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {selectedCareer.field}
                  </span>
                  <p className="font-headline text-2xl font-bold">{selectedCareer.title}</p>
                </div>
              </div>

              <div className="p-8 text-left space-y-6">
                
                <div>
                  <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Role Overview</h4>
                  <p className="text-secondary text-sm leading-relaxed font-medium">
                    {selectedCareer.description} Under standard pathways, professionals undergo structured certifications to verify their competence, leading directly over 1.5x median career multiplier targets inside elite partner enterprises.
                  </p>
                </div>

                {/* Requirements stats block row */}
                <div className="grid grid-cols-3 gap-4 border-y border-outline-variant/40 py-4.5">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase">Credential</p>
                      <p className="text-xs font-extrabold text-primary leading-tight">{selectedCareer.education}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase">Compensation</p>
                      <p className="text-xs font-extrabold text-primary leading-tight">{selectedCareer.avgSalary}/Yr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[10px] font-bold text-outline uppercase">Verify Option</p>
                      <span className="text-xs font-extrabold text-green-700 leading-tight">Skill Exam Live</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={handleShowInstitutions}
                    className="flex-1 bg-white text-primary border border-primary px-6 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-container transition-all cursor-pointer shadow-md"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Find Campuses Near You</span>
                  </button>
                  <button 
                    onClick={() => { setSelectedCareer(null); onNavigate('test'); }}
                    className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all cursor-pointer"
                  >
                    <span>Launch Certified Exam</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
