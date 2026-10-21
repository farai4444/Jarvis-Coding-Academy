import React from 'react';
import { SPECIALIZED_MODULES } from '../data/modules';
import { UserProgress } from '../types/curriculum';
import { Lock, Unlock, CheckCircle2, Box, FileText, ShieldAlert, Bot, ArrowRight, Sparkles } from 'lucide-react';

interface SpecializedModulesViewProps {
  progress: UserProgress;
  onNavigateToExercises: () => void;
}

export const SpecializedModulesView: React.FC<SpecializedModulesViewProps> = ({
  progress,
  onNavigateToExercises,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box':
        return <Box className="w-5 h-5 text-cyan-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 sm:p-10 overflow-y-auto text-slate-100">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Point-Gated Advanced Curriculum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Specialized Advanced Master Modules
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
            These specialized modules transition you from beginner syntax into industrial-grade software engineering. Unlocking each module strictly requires high human-earned points. If points are lost due to external AI copying, locked status is immediately reinstated.
          </p>
        </div>

        {/* Current Standing Card */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-base font-bold">
              {progress.points} pts
            </div>
            <div>
              <div className="font-semibold text-white">Your Current Human Score</div>
              <div className="text-slate-400">
                {progress.antiCheatViolations.length === 0
                  ? 'Zero AI plagiarism violations on record. Pure human mastery!'
                  : `Accumulated ${progress.totalPenaltiesDeducted} penalty points. Solve exercises to recover!`}
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToExercises}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Earn More Points in Exercises</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPECIALIZED_MODULES.map((mod) => {
            const isUnlocked = progress.points >= mod.requiredPoints;
            const ptsNeeded = Math.max(0, mod.requiredPoints - progress.points);
            const progressPct = Math.min(100, Math.round((progress.points / mod.requiredPoints) * 100));

            return (
              <div
                key={mod.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {getIcon(mod.iconName)}
                    </div>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-2.5 py-1 rounded-full">
                        <Unlock className="w-3 h-3" /> Unlocked & Accessible
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800 px-2.5 py-1 rounded-full">
                        <Lock className="w-3 h-3" /> Requires {mod.requiredPoints} pts
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">{mod.tagline}</p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{mod.description}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Unlock Progress:</span>
                      <span className="font-mono">{progressPct}% ({progress.points}/{mod.requiredPoints} pts)</span>
                    </div>
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isUnlocked ? 'bg-cyan-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Topics List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="text-xs font-semibold text-slate-400">Core Syllabus Topics:</div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {mod.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 shrink-0">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Capstone Preview */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs">
                    <span className="font-semibold text-amber-400 block mb-1">Capstone Lab Project:</span>
                    <span className="text-slate-300">{mod.capstoneLab}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  {isUnlocked ? (
                    <button className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                      <span>Launch Specialized Sandbox</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="text-center text-xs text-slate-500 py-1 font-mono">
                      🔒 Need {ptsNeeded} more points to unlock
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
