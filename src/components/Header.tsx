import React from 'react';
import { AppTab } from '../types';
import { Compass, GraduationCap, Briefcase, Home, Award, LayoutDashboard, Search, Bell } from 'lucide-react';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onSignUpClick: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
}

export default function Header({ currentTab, onTabChange, onSignUpClick, onLoginClick, isLoggedIn }: HeaderProps) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant shadow-sm z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-17 flex justify-between items-center">
        {/* Title Logo Group */}
        <div 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2 cursor-pointer group"
          id="logo-container"
        >
          <div className="w-9 h-9 bg-primary text-on-primary rounded-xl flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            CL
          </div>
          <span className="font-headline text-xl font-bold text-primary group-hover:text-primary-container transition-colors">
            Career Lift System
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 items-center h-full">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'careers', label: 'Explore Careers', icon: Compass },
            { id: 'test', label: 'Skill Test', icon: Award },
            { id: 'jobs', label: 'Job Search', icon: Briefcase },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onTabChange(item.id as AppTab)}
                className={`flex items-center gap-1.5 h-17 px-1 font-label text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  isActive
                    ? 'text-primary border-primary font-bold shadow-[0_1px_0_0_#06104c]'
                    : 'text-secondary border-transparent hover:text-primary hover:border-outline-variant'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls Side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Profile icon */}
              <button 
                onClick={() => onTabChange('dashboard')}
                className="w-8 h-8 rounded-full bg-secondary-container text-primary font-bold flex items-center justify-center text-sm cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                id="header-user-avatar"
              >
                JD
              </button>
              <button 
                onClick={() => onTabChange('dashboard')}
                className="font-label text-sm text-secondary hover:text-primary font-medium cursor-pointer"
              >
                Jordan
              </button>
              <button 
                id="btn-header-notif"
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-error rounded-full"></span>
              </button>
            </div>
          ) : (
            <>
              <button 
                id="btn-login"
                onClick={onLoginClick}
                className="text-secondary hover:bg-surface-container-low transition-all px-4 py-2 rounded-lg font-label text-sm font-medium cursor-pointer"
              >
                Login
              </button>
              <button 
                id="btn-signup"
                onClick={onSignUpClick}
                className="bg-white text-primary border border-primary font-bold px-5 py-2.5 rounded-full hover:scale-95 hover:bg-surface-container transition-all active:opacity-90 font-label text-sm cursor-pointer shadow-sm"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Tab Helper Bar */}
      <div className="md:hidden bg-surface flex justify-around border-t border-outline-variant py-2">
        {[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'careers', label: 'Explore', icon: Compass },
          { id: 'test', label: 'Skill', icon: Award },
          { id: 'jobs', label: 'Jobs', icon: Briefcase },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as AppTab)}
              className={`flex flex-col items-center gap-1 px-3 py-1 cursor-pointer transition-all ${
                isActive ? 'text-primary' : 'text-outline hover:text-secondary'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
