import React from 'react';
import { ShieldAlert, X, AlertTriangle, BookOpen, Brain, Zap } from 'lucide-react';
import { AntiCheatViolation } from '../types/curriculum';

interface AntiCheatModalProps {
  isOpen: boolean;
  onClose: () => void;
  violations: AntiCheatViolation[];
  totalPenalties: number;
  currentPoints: number;
}

export const AntiCheatModal: React.FC<AntiCheatModalProps> = ({
  isOpen,
  onClose,
  violations,
  totalPenalties,
  currentPoints,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Honor Code & AI Plagiarism Policy</h2>
              <p className="text-xs text-slate-400">Why authentic human learning is mandatory at JARVIS Academy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-400">
              <Brain className="w-4 h-4" />
              <span>Building Real Synapses</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Copying AI code bypasses the productive struggle that builds intuitive mental models of state, memory, and logic.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Point Penalties</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If an AI-generated solution is detected, you lose -25 to -50 points. This directly affects your progression tier.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-400">
              <Zap className="w-4 h-4" />
              <span>Dynamic Unlock Gating</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If your score drops below module or project thresholds due to penalties, advanced content locks until points are earned back!
            </p>
          </div>
        </div>

        {/* Penalties Log */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Anti-Cheat Audit Log</span>
            <span className="text-rose-400 font-mono">
              Total Penalties Incurred: -{totalPenalties} pts
            </span>
          </div>

          {violations.length === 0 ? (
            <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-center space-y-1">
              <div className="text-emerald-300 font-semibold text-xs">Clean Record Verified</div>
              <p className="text-[11px] text-slate-400">
                You have not triggered any AI plagiarism flags. 100% of your {currentPoints} points were earned through genuine human problem-solving!
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {violations.map((v) => (
                <div
                  key={v.id}
                  className="p-3 bg-rose-950/30 border border-rose-900/60 rounded-xl flex items-start justify-between text-xs gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-rose-300">{v.title}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{v.timestamp}</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">{v.reason}</p>
                    <div className="text-[10px] text-rose-400">AI Confidence: {v.aiConfidence}%</div>
                  </div>
                  <span className="font-mono font-bold text-rose-400 shrink-0">
                    -{v.pointsDeducted} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
          >
            I Understand — Back to Coding
          </button>
        </div>
      </div>
    </div>
  );
};
