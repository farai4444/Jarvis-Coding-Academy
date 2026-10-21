import React from 'react';
import { UserProgress } from '../types/curriculum';
import {
  Trophy,
  Flame,
  ShieldCheck,
  Award,
  BookOpen,
  FolderKanban,
  Box,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface ProgressionOverviewProps {
  progress: UserProgress;
  onNavigate: (view: 'exercises' | 'projects' | 'tests' | 'specialized') => void;
}

export const ProgressionOverview: React.FC<ProgressionOverviewProps> = ({
  progress,
  onNavigate,
}) => {
  const roadmapMilestones = [
    { pts: 0, label: 'Level 1: Genesis & Module 1', type: 'Unlocked at Start', ready: true },
    { pts: 120, label: 'Module 2: Math, Operators & User Input', type: 'Core Curriculum', ready: progress.points >= 120 },
    { pts: 150, label: 'Tier 1 Practical Projects (Projects 1 - 10)', type: 'Projects Unlock', ready: progress.points >= 150 },
    { pts: 300, label: 'Module 3: Strings, Slicing & Methods', type: 'Core Curriculum', ready: progress.points >= 300 },
    { pts: 480, label: 'Tier 2 Interactive Games (Hangman, Dungeon, Tic-Tac-Toe)', type: 'Projects Unlock', ready: progress.points >= 480 },
    { pts: 500, label: 'Module 4: Conditionals, Boolean Logic & If-Else', type: 'Core Curriculum', ready: progress.points >= 500 },
    { pts: 750, label: 'Module 5: Loops & Repetition (While, For, Range)', type: 'Core Curriculum', ready: progress.points >= 750 },
    { pts: 880, label: 'Tier 3 Data Processors & Algorithms (Projects 21 - 30)', type: 'Projects Unlock', ready: progress.points >= 880 },
    { pts: 1050, label: 'Module 6: Functions, Parameters & Return Scope', type: 'Core Curriculum', ready: progress.points >= 1050 },
    { pts: 1200, label: 'Specialized Module 1: Object-Oriented Programming (OOP)', type: 'Mastery Content', ready: progress.points >= 1200 },
    { pts: 1280, label: 'Tier 4 Advanced Software Engines & Capstones', type: 'Projects Unlock', ready: progress.points >= 1280 },
    { pts: 1350, label: 'Module 7: Lists, Dictionaries & Collections', type: 'Core Curriculum', ready: progress.points >= 1350 },
    { pts: 1400, label: 'Specialized Module 2: File Systems & Persistent I/O', type: 'Mastery Content', ready: progress.points >= 1400 },
    { pts: 1600, label: 'Specialized Module 3: Defensive Engineering & Exceptions', type: 'Mastery Content', ready: progress.points >= 1600 },
    { pts: 1800, label: 'Specialized Module 4: Autonomous Bot & Agent Architecture', type: 'Mastery Content', ready: progress.points >= 1800 },
  ];

  return (
    <div className="flex-1 bg-slate-950 p-6 sm:p-10 overflow-y-auto text-slate-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>JARVIS Programming Academy · Beginner to Software Architect</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master Programming From Absolute Zero
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            100 step-by-step exercises, 40 real-world projects, and 25 rigorous certification assessments. Your code is inspected for genuine human craftsmanship—copying external AI models costs points!
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('exercises')}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-cyan-950"
            >
              <span>Resume 100 Exercises</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 border border-slate-700"
            >
              <span>Explore 40 Projects</span>
            </button>
            <button
              onClick={() => onNavigate('tests')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center gap-2 border border-slate-700"
            >
              <span>Take 25 Certification Tests</span>
            </button>
          </div>
        </div>

        {/* 4 Core Pillars Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('exercises')}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Fundamental Exercises</span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {progress.completedExercises.length}
              <span className="text-base text-slate-500 font-normal"> / 100</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-cyan-400 h-full transition-all duration-500"
                style={{ width: `${progress.completedExercises.length}%` }}
              ></div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('projects')}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Software Projects</span>
              <FolderKanban className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {progress.completedProjects.length}
              <span className="text-base text-slate-500 font-normal"> / 40</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-emerald-400 h-full transition-all duration-500"
                style={{ width: `${(progress.completedProjects.length / 40) * 100}%` }}
              ></div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('tests')}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Certification Tests</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {progress.completedTests.length}
              <span className="text-base text-slate-500 font-normal"> / 25</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${(progress.completedTests.length / 25) * 100}%` }}
              ></div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('specialized')}
            className="p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold">Specialized Modules</span>
              <Box className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
              {progress.points >= 1800 ? '4/4' : progress.points >= 1600 ? '3/4' : progress.points >= 1400 ? '2/4' : progress.points >= 1200 ? '1/4' : '0/4'}
              <span className="text-base text-slate-500 font-normal"> Unlocked</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className="bg-purple-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (progress.points / 1800) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Roadmap Progression Tree */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Points Unlock Progression Roadmap</span>
            </h2>
            <span className="text-xs text-slate-400">
              Current Points: <span className="font-mono text-amber-400 font-bold">{progress.points} pts</span>
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3.5">
            {roadmapMilestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  m.ready
                    ? 'bg-slate-950/80 border-cyan-800/60 text-slate-100'
                    : 'bg-slate-950/30 border-slate-800/40 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                      m.ready
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">{m.label}</div>
                    <div className="text-[11px] text-slate-400">{m.type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-amber-400">{m.pts} pts</span>
                  {m.ready ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-500">
                      <Lock className="w-3.5 h-3.5" /> Locked
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Showcase */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>Honors & Achievement Badges</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {progress.badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  b.unlockedAt
                    ? 'bg-slate-900 border-cyan-500/40 text-slate-200'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    b.unlockedAt ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-950 text-slate-600'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{b.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.description}</p>
                  {b.unlockedAt && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                      Unlocked on {b.unlockedAt}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
