import React, { useState, useEffect, useRef } from 'react';
import { AppTab, QuizQuestion } from '../types';
import { getAllMockQuestions } from '../data';
import { Award, Clock, ArrowRight, CheckCircle2, Bookmark, Home, Calendar, RefreshCcw, BarChart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillTestViewProps {
  onNavigate: (tab: AppTab) => void;
  onTestComplete: (score: number) => void;
}

export default function SkillTestView({ onNavigate, onTestComplete }: SkillTestViewProps) {
  const quizQuestions = useRef<QuizQuestion[]>(getAllMockQuestions()).current;
  const [currentIndex, setCurrentIndex] = useState(11); // Pre-sets to question index 11 (which is Question #12)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>(() => {
    // Prefill questions 1 to 11 to simulate partial completion
    const initial: Record<number, 'A' | 'B' | 'C' | 'D'> = {
      1: 'A', 2: 'B', 3: 'B', 4: 'A', 5: 'C', 6: 'B', 7: 'D', 8: 'A', 9: 'C', 10: 'B', 11: 'A',
      12: 'B' // Question 12 pre-filled with Option B matching design
    };
    return initial;
  });
  
  const [markedReviews, setMarkedReviews] = useState<Record<number, boolean>>({
    4: true, // Preset question 4 as review matching typical mock assessment
    9: true
  });

  // Dynamic countdown timer in state
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 44, seconds: 58 });
  const [quizScoreResult, setQuizScoreResult] = useState<number | null>(null);
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Run countdown loop
  useEffect(() => {
    if (testSubmitted) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(interval);
          handleSubmitAssessment(); // Auto-submit when time is up
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [testSubmitted]);

  const currentQuestion = quizQuestions[currentIndex];

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option
    });
  };

  const handleToggleReview = () => {
    setMarkedReviews({
      ...markedReviews,
      [currentQuestion.id]: !markedReviews[currentQuestion.id]
    });
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitAssessment = () => {
    setTestSubmitted(true);
    // Grade exam client-side
    let score = 0;
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    // Calculate percentage
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    setQuizScoreResult(finalScore);
    onTestComplete(finalScore); // Triggers parent callbacks to append to Jordan progress
  };

  const handleResetQuiz = () => {
    setCurrentIndex(11);
    setAnswers({ 12: 'B' });
    setMarkedReviews({});
    setTimeRemaining({ minutes: 44, seconds: 58 });
    setTestSubmitted(false);
    setQuizScoreResult(null);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {!testSubmitted ? (
          /* ACTIVE ASSESSMENT VIEW */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Test question pane (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Exam Header card */}
              <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                    CERTIFIED SKILL CREDENTIAL
                  </span>
                  <h1 className="font-headline text-xl font-bold text-primary">
                    General Academic Competence
                  </h1>
                </div>

                {/* Micro Timer block */}
                <div className="flex items-center gap-2.5 bg-primary/95 text-white px-4.5 py-2.5 rounded-xl self-start sm:self-center shadow-md select-none">
                  <Clock className="w-5 h-5 text-on-primary-container animate-pulse" />
                  <div className="font-mono text-sm font-extrabold tracking-widest">
                    Time Remaining:{' '}
                    <span>{timeRemaining.minutes.toString().padStart(2, '0')}</span>:
                    <span>{timeRemaining.seconds.toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Active question card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8.5 shadow-sm space-y-8 min-h-[440px] flex flex-col justify-between">
                <div>
                  {/* Top bar indicators */}
                  <div className="flex justify-between items-center pb-5 border-b border-outline-variant/40 mb-6">
                    <span className="text-sm font-bold text-primary">
                      Question <span className="text-secondary">{currentQuestion.id}</span> of {quizQuestions.length}
                    </span>
                    <button 
                      onClick={handleToggleReview}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        markedReviews[currentQuestion.id]
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-surface hover:bg-surface-container text-secondary'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{markedReviews[currentQuestion.id] ? "Marked for Review" : "Mark for Review"}</span>
                    </button>
                  </div>

                  {/* Question Stem Statement */}
                  <p className="font-headline text-lg md:text-xl text-primary font-semibold mb-8 text-left leading-relaxed">
                    {currentQuestion.questionStr}
                  </p>

                  {/* Multi Choice list options */}
                  <div className="space-y-4">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = answers[currentQuestion.id] === opt.key;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          className={`w-full p-4.5 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer flex items-start gap-4 ${
                            isSelected
                              ? 'border-primary bg-surface-container-low text-primary ring-2 ring-primary/10 font-bold shadow-[0_4px_6px_-1px_rgba(6,16,76,0.06)]'
                              : 'border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-secondary hover:text-primary'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg font-bold flex items-center justify-center text-xs shrink-0 transition-colors ${
                            isSelected ? 'bg-primary text-white' : 'bg-surface text-outline'
                          }`}>
                            {opt.key}
                          </div>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom navigation buttons controls */}
                <div className="flex justify-between items-center border-t border-outline-variant/40 pt-6 mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1.5 border border-outline px-4 py-2 rounded-lg text-xs font-bold text-secondary hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === quizQuestions.length - 1}
                    className="flex items-center gap-1.5 border border-outline px-4 py-2 rounded-lg text-xs font-bold text-secondary hover:bg-surface-container disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Right Column: Numbers navigation grid (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="font-headline text-md font-bold text-primary mb-1">
                    Assessment Navigation
                  </h3>
                  <p className="text-xs text-secondary leading-snug">
                    Answered questions show checked tiles. Hover elements for query information.
                  </p>
                </div>

                {/* 30 block clickable grid */}
                <div className="grid grid-cols-5 gap-2 select-none">
                  {quizQuestions.map((q, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isAnswered = !!answers[q.id];
                    const isFlagged = !isAnswered && markedReviews[q.id];
                    const isDoubleFlagged = isAnswered && markedReviews[q.id];

                    let btnClass = 'bg-surface border-transparent text-secondary';
                    if (isCurrent) {
                      btnClass = 'bg-none border-2 border-primary text-primary font-extrabold scale-105 shadow';
                    } else if (isDoubleFlagged) {
                      btnClass = 'bg-amber-100 border border-amber-300 text-amber-900 font-bold';
                    } else if (isFlagged) {
                      btnClass = 'bg-amber-100 border-transparent text-amber-800';
                    } else if (isAnswered) {
                      btnClass = 'bg-primary text-white font-bold';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`aspect-square w-11 h-11 rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer relative ${btnClass}`}
                      >
                        {q.id}
                        {isAnswered && !isCurrent && (
                          <span className="absolute bottom-0.5 right-0.5 bg-green-500 rounded-full p-0.5">
                            <Check className="w-1.5 h-1.5 text-white stroke-[4px]" />
                          </span>
                        )}
                        {markedReviews[q.id] && !isCurrent && (
                          <span className="absolute top-0.5 right-0.5 bg-amber-500 rounded-full w-1.5 h-1.5"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-outline-variant/40 pt-5 space-y-3 text-xs">
                  <div className="flex items-center gap-2.5 font-semibold text-secondary">
                    <span className="w-3.5 h-3.5 rounded bg-primary"></span>
                    <span>Answered ({Object.keys(answers).length})</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-semibold text-secondary">
                    <span className="w-3.5 h-3.5 rounded border border-primary"></span>
                    <span>Active question</span>
                  </div>
                  <div className="flex items-center gap-2.5 font-semibold text-secondary">
                    <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300"></span>
                    <span>Flagged review</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitAssessment}
                  className="w-full bg-white text-primary border border-primary py-4 rounded-xl font-bold text-xs hover:bg-surface-container hover:shadow-lg transition-transform cursor-pointer"
                >
                  Submit Assessment
                </button>
              </div>

            </div>

          </motion.div>
        ) : (
          /* COMPLETED SCREEN CARD DESIGN */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-surface-container-lowest border border-outline-variant p-10 rounded-2xl shadow-xl space-y-8"
          >
            <div className="inline-flex w-20 h-20 bg-green-100 text-green-700 rounded-full items-center justify-center shadow-inner mb-2">
              <CheckCircle2 className="w-10 h-10 stroke-[2px]" />
            </div>

            <div>
              <h2 className="font-headline text-3xl font-extrabold text-primary mb-2">
                Assessment Complete!
              </h2>
              <p className="text-secondary text-sm">
                Your credentials have been successfully certified and archived inside your candidate profile databases.
              </p>
            </div>

            {/* Score box display */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
              <div>
                <p className="text-[10px] uppercase font-bold text-outline">Score Achieved</p>
                <p className="font-headline text-3xl font-extrabold text-primary">{quizScoreResult}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-outline">Rating Status</p>
                <p className="font-headline text-3xl font-extrabold text-green-700">PASSED</p>
              </div>
            </div>

            {/* Next career opportunities recommendation block */}
            <div className="bg-surface-container border border-outline-variant p-5.5 rounded-xl text-left space-y-3">
              <div className="flex gap-2">
                <span className="bg-primary text-on-primary text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">STANFORD SYNCED</span>
                <span className="bg-purple-100 text-purple-800 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">ROLE INCREASE</span>
              </div>
              <h4 className="font-headline text-sm font-bold text-primary">Credential Added to Your Profile</h4>
              <p className="text-secondary text-xs leading-normal font-medium">
                Your 12-factor certified competency score of {quizScoreResult}% has directly boosted your search match affinity across 3 separate Enterprise roles including **Senior Experience Lead**.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 shrink-0 max-w-sm mx-auto">
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex-1 bg-white text-primary border border-primary py-3.5 rounded-xl font-bold text-xs hover:bg-surface-container transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleResetQuiz}
                className="flex-1 border border-outline text-secondary py-3.5 rounded-xl font-bold text-xs hover:bg-surface-container-low transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Reset Assessment</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
