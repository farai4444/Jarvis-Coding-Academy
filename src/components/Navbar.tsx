import React from 'react';
import { UserProgress } from '../types/curriculum';
import { ShieldCheck, Flame, Trophy, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  currentView: 'exercises' | 'projects' | 'tests' | 'specialized' | 'progression';
  onSelectView: (view: 'exercises' | 'projects' | 'tests' | 'specialized' | 'progression') => void;
  progress: UserProgress;
  onOpenHonorCode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  progress,
  onOpenHonorCode,
}) => {
  // Compute Rank based on points
  const getRank = (pts: number) => {
    if (pts >= 1800) return 'Master Architect';
    if (pts >= 1350) return 'Senior Apprentice';
    if (pts >= 750) return 'Junior Coder';
    if (pts >= 300) return 'Code Initiate';
    return 'Novice Learner';
  };

  const rank = getRank(progress.points);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element, no extraneous pills) */}
        <button
          onClick={() => onSelectView('progression')}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span>JARVIS Code Academy</span>
        </button>

        {/* Zone 2: 4-5 single-line nav links with hover underlines */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => onSelectView('exercises')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              currentView === 'exercises' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            100 Exercises ({progress.completedExercises.length}/100)
          </button>
          <button
            onClick={() => onSelectView('projects')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              currentView === 'projects' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            40 Projects ({progress.completedProjects.length}/40)
          </button>
          <button
            onClick={() => onSelectView('tests')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              currentView === 'tests' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            25 Tests ({progress.completedTests.length}/25)
          </button>
          <button
            onClick={() => onSelectView('specialized')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              currentView === 'specialized' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Advanced Modules
          </button>
          <button
            onClick={onOpenHonorCode}
            className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            title="Anti-Cheat & Human Learning Policy"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Cheat Policy</span>
          </button>
        </nav>

        {/* Zone 3: Points, Rank & Primary Metric action */}
        <div className="flex items-center gap-3 shrink-0">
          {progress.antiCheatViolations.length > 0 && (
            <div
              onClick={onOpenHonorCode}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/80 rounded-md whitespace-nowrap shrink-0"
              title="Click to view AI plagiarism penalty logs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>-{progress.totalPenaltiesDeducted} pts penalty</span>
            </div>
          )}

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap shrink-0">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono tabular-nums font-bold text-amber-300 text-sm">
              {progress.points}
            </span>
            <span className="text-slate-500">pts</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-medium">{rank}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs text-orange-400 font-medium bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0">
            <Flame className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">{progress.streakDays}d streak</span>
          </div>
        </div>
      </div>
    </header>
  );
};
