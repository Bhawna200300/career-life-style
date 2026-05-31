import React, { useState, useMemo } from 'react';
import { AppTab, Institution } from '../types';
import { MOCK_INSTITUTIONS } from '../data';
import { MapPin, Search, ZoomIn, ZoomOut, Layers, School, GraduationCap, Building, Star, DollarSign, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstitutionFinderViewProps {
  onNavigate: (tab: AppTab) => void;
}

export default function InstitutionFinderView({ onNavigate }: InstitutionFinderViewProps) {
  const [searchUniversity, setSearchUniversity] = useState('');
  const [maxTuition, setMaxTuition] = useState(50000);
  const [selectedInstId, setSelectedInstId] = useState<string>('inst_1');
  const [hoveredInstId, setHoveredInstId] = useState<string | null>(null);
  
  // Interactive Map Controls state
  const [mapZoom, setMapZoom] = useState(1.0);
  const [satelliteView, setSatelliteView] = useState(false);

  const handleZoomIn = () => {
    if (mapZoom < 2.0) setMapZoom(prev => Math.round((prev + 0.2) * 10) / 10);
  };

  const handleZoomOut = () => {
    if (mapZoom > 0.8) setMapZoom(prev => Math.round((prev - 0.2) * 10) / 10);
  };

  // Filter institutions lists
  const filteredColleges = useMemo(() => {
    return MOCK_INSTITUTIONS.filter(inst => {
      const matchQuery = inst.name.toLowerCase().includes(searchUniversity.toLowerCase()) ||
                          inst.location.toLowerCase().includes(searchUniversity.toLowerCase());
      const matchTuition = inst.tuition <= maxTuition;
      return matchQuery && matchTuition;
    });
  }, [searchUniversity, maxTuition]);

  const activeInstitution = useMemo(() => {
    return MOCK_INSTITUTIONS.find(i => i.id === selectedInstId) || MOCK_INSTITUTIONS[0];
  }, [selectedInstId]);

  const getCollegeIcon = (type: string) => {
    switch (type) {
      case 'school':
        return <School className="w-5 h-5 text-primary" />;
      case 'account_balance':
        return <GraduationCap className="w-5 h-5 text-primary" />;
      case 'architecture':
      default:
        return <Building className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <section className="text-left">
        <h1 className="font-headline text-4xl text-primary font-bold mb-4">
          Institution & Campus Finder
        </h1>
        <p className="font-sans text-secondary text-base">
          Locate prestigious physical universities, academic centers, and career progression programs mapped to your geographical matching coordinates.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand list column (4 cols) */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-2xl shadow-sm space-y-6 text-left">
            
            <h3 className="font-headline text-lg font-bold text-primary mb-1">
              Find Academic Centers
            </h3>
            
            {/* Search University field */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input 
                type="text"
                value={searchUniversity}
                onChange={(e) => setSearchUniversity(e.target.value)}
                placeholder="Search universities (e.g. Stanford)..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-outline-variant text-[13px] bg-white text-on-surface focus:border-primary outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Tuition slider */}
            <div className="space-y-2 pb-2">
              <div className="flex justify-between items-center text-xs font-bold text-outline uppercase tracking-wider">
                <span>Tuition Cap</span>
                <span className="text-primary font-bold">${(maxTuition / 1000).toFixed(0)}k/Year</span>
              </div>
              <input 
                type="range"
                min="20000"
                max="50000"
                step="2000"
                value={maxTuition}
                onChange={(e) => setMaxTuition(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary-container rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

          </div>

          {/* College Items selection list */}
          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2">
            {filteredColleges.map((inst) => {
              const isSelected = inst.id === selectedInstId;
              const isHovered = inst.id === hoveredInstId;
              
              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInstId(inst.id)}
                  onMouseEnter={() => setHoveredInstId(inst.id)}
                  onMouseLeave={() => setHoveredInstId(null)}
                  className={`p-4.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-surface-container-low border-primary ring-1 ring-primary/20 shadow-sm' 
                      : 'bg-surface-container-lowest border-outline-variant/65 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm">
                        {getCollegeIcon(inst.iconType)}
                      </div>
                      <span className="font-headline text-sm font-bold text-primary max-w-[200px] line-clamp-1">
                        {inst.name}
                      </span>
                    </div>
                    {inst.matchScore && (
                      <span className="bg-white/95 px-2 py-0.5 border border-outline-variant rounded-md text-primary font-bold text-[10px] shadow-xs">
                        {inst.matchScore}% affinity
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-secondary mb-3 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{inst.location}</span>
                  </p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-secondary pt-2.5 border-t border-outline-variant/35">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-primary" />
                      <span>{inst.tuitionStr}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{inst.rating} Rating</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredColleges.length === 0 && (
              <p className="text-center text-xs text-secondary py-10">No institutions match parameters.</p>
            )}
          </div>
        </section>

        {/* Right Hand stateful Satellite map coordinate plotter (8 cols) */}
        <section className="lg:col-span-8 flex flex-col justify-between h-auto min-h-[500px] bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm relative">
          
          {/* Map Image container holding overlay coordinate points */}
          <div className="relative flex-grow h-[380px] overflow-hidden select-none">
            
            {/* Map image with zoom scaling effect applied */}
            <motion.div 
              className="w-full h-full"
              animate={{ scale: mapZoom }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            >
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC0quoAUrUZDTFHCdnCDJLmWQH4E8Sy9Lex_AaCeZVLK2iMxshd5ttKTcy8TNQOW1d85-Vnfppg8rlunmnDQE_kMkz-XsePHpuLW-5Mv94diXTdAYbxIfBUA61cq0bfO1ClKER-Bu4-XRZHg0cflCrXswoLOJR-9N_OOwa5tD0_4cUaxM9ep553tlUVebhe02aYseCrw8gzOioL-qgF53RfSxkj4YdI79LPAcZD8rnbIwbfMXIDa-5BdpSbw5p6AuA0gFWQYyHeSA" 
                alt="Silicon Valley Satellite Telemetry Backdrop" 
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-500 bg-surface-dim ${
                  satelliteView ? 'grayscale-0 brightness-110 saturate-140' : 'grayscale brightness-90 filter hue-rotate-15 animate-pulse'
                }`}
              />
            </motion.div>

            {/* Static Simulated Grid overlay details */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-15 border border-white pointer-events-none">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-t border-l border-white/40"></div>
              ))}
            </div>

            {/* Micro Coordinates Pin Plot Overlay mapping */}
            {MOCK_INSTITUTIONS.map((inst) => {
              const isActive = inst.id === selectedInstId;
              const isHovered = inst.id === hoveredInstId;
              
              return (
                <div
                  key={inst.id}
                  className="absolute"
                  style={{ left: `${inst.coords.x}%`, top: `${inst.coords.y}%` }}
                >
                  <button
                    onClick={() => setSelectedInstId(inst.id)}
                    className="group relative -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                    id={`map-pin-${inst.id}`}
                  >
                    {/* Ring scale pulses for selected pins */}
                    {(isActive || isHovered) && (
                      <span className="absolute -inset-4 rounded-full bg-primary/20 border border-primary/45 animate-ping opacity-75"></span>
                    )}

                    <div className={`p-2 rounded-xl transition-all shadow-md ${
                      isActive 
                        ? 'bg-primary text-white scale-120' 
                        : isHovered 
                          ? 'bg-secondary text-white scale-110' 
                          : 'bg-white text-primary hover:bg-surface-container hover:scale-105'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>

                    {/* Pop-up hover label tooltip */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none transition-all opacity-0 group-hover:opacity-100 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded w-max shadow-lg z-30">
                      {inst.name}
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Floating Telemetry controls toolbar */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-outline-variant rounded-xl p-2 flex items-center gap-1 shadow-md z-20">
              <button 
                onClick={handleZoomIn}
                className="p-2 hover:bg-surface rounded-lg text-secondary hover:text-primary transition-all cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-2 hover:bg-surface rounded-lg text-secondary hover:text-primary transition-all cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4.5 h-4.5" />
              </button>
              <div className="h-6 w-px bg-outline-variant/65 mx-1"></div>
              <button 
                onClick={() => setSatelliteView(p => !p)}
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  satelliteView ? 'bg-primary text-white' : 'hover:bg-surface text-secondary'
                }`}
                title="Toggle Satellite Telemetry view layer"
              >
                <Layers className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Active map corner coordinate status card */}
            <div className="absolute top-4 left-4 bg-primary/95 text-white p-3 rounded-xl border border-white/20 shadow-md text-left select-none max-w-xs z-20 font-mono text-[10px]">
              <p className="text-on-primary-container font-extrabold uppercase mb-1">Telemetry Status</p>
              <p className="leading-snug">Grid Area: SV_ZONE-94</p>
              <p className="leading-snug">Coordinate: 37°24'N 122°10'W</p>
            </div>

          </div>

          {/* Bottom active details layout panel */}
          <div className="bg-surface-container p-6.5 border-t border-outline-variant text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-[10px] font-bold text-outline uppercase">Active Selection</p>
              <h4 className="font-headline text-lg font-bold text-primary mb-1">{activeInstitution.name}</h4>
              <p className="text-secondary text-xs font-semibold">{activeInstitution.location} • Tuitions: {activeInstitution.tuitionStr}</p>
            </div>

            <button 
              onClick={() => onNavigate('test')}
              className="bg-white hover:bg-surface-container text-primary border border-primary px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
            >
              <span>Explore Certifications</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}
