import React, { useState } from 'react';
import { Terminal, CheckCircle2, XCircle, ShieldAlert, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { TestCase } from '../types/curriculum';

interface EvaluationFeedback {
  passed: boolean;
  isAiGenerated: boolean;
  aiConfidence: number;
  detectionReasoning: string;
  pointsDelta: number;
  feedback: string;
  testResults: { name: string; passed: boolean; details: string }[];
}

interface ConsoleOutputProps {
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  testCases: TestCase[];
  evaluation: EvaluationFeedback | null;
  sampleExpectedOutput: string;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  stdout,
  stderr,
  executionTimeMs,
  testCases,
  evaluation,
  sampleExpectedOutput,
}) => {
  const [activeTab, setActiveTab] = useState<'console' | 'tests' | 'anticheat'>('console');

  // Auto-switch to anticheat if evaluation just completed
  React.useEffect(() => {
    if (evaluation) {
      if (evaluation.isAiGenerated) {
        setActiveTab('anticheat');
      } else {
        setActiveTab('tests');
      }
    }
  }, [evaluation]);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl text-slate-200">
      {/* Tabs Bar */}
      <div className="flex items-center justify-between px-3 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-1.5 px-3 py-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'console'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
            {stdout && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1"></span>}
            {stderr && <span className="w-1.5 h-1.5 rounded-full bg-rose-400 ml-1"></span>}
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-1.5 px-3 py-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'tests'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Test Verification</span>
            {evaluation && (
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  evaluation.passed ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                }`}
              >
                {evaluation.passed ? 'PASSED' : 'FAILED'}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('anticheat')}
            className={`flex items-center gap-1.5 px-3 py-2.5 font-medium border-b-2 transition-colors ${
              activeTab === 'anticheat'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {evaluation?.isAiGenerated ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>AI Plagiarism Audit</span>
            {evaluation?.isAiGenerated && (
              <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded text-[10px] font-bold">
                FLAGGED
              </span>
            )}
          </button>
        </div>

        {executionTimeMs > 0 && (
          <span className="text-[11px] text-slate-500 font-mono tabular-nums">
            {executionTimeMs}ms
          </span>
        )}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-slate-900/90">
        {activeTab === 'console' && (
          <div className="space-y-3">
            {stderr ? (
              <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-lg text-rose-200 whitespace-pre-wrap">
                <div className="flex items-center gap-1.5 font-semibold text-rose-400 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Execution Error:</span>
                </div>
                {stderr}
              </div>
            ) : null}

            {stdout ? (
              <div className="space-y-1">
                <div className="text-slate-500 text-[11px] select-none font-sans">Output stream:</div>
                <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 whitespace-pre-wrap leading-relaxed">
                  {stdout}
                </pre>
              </div>
            ) : !stderr ? (
              <div className="text-slate-500 italic py-8 text-center font-sans text-xs">
                Click "Run Code" or press Ctrl+Enter to execute and view stdout stream here.
              </div>
            ) : null}
          </div>
        )}

        {activeTab === 'tests' && (
          <div className="space-y-4 font-sans text-sm">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Expected Benchmark Output
              </div>
              <pre className="font-mono text-xs text-amber-200/90 bg-slate-900 p-2.5 rounded border border-slate-800 whitespace-pre-wrap">
                {sampleExpectedOutput || 'Output match expected'}
              </pre>
            </div>

            {evaluation ? (
              <div className="space-y-3">
                <div
                  className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                    evaluation.passed
                      ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                  }`}
                >
                  {evaluation.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-sm">
                      {evaluation.passed ? 'Solution Passed!' : 'Requirements Not Met'}
                    </h4>
                    <p className="text-xs mt-1 text-slate-300">{evaluation.feedback}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400">Test Cases:</div>
                  {evaluation.testResults?.map((tr, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded text-xs"
                    >
                      <span className="font-mono text-slate-300">{tr.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                          tr.passed
                            ? 'bg-emerald-900/50 text-emerald-300'
                            : 'bg-rose-900/50 text-rose-300'
                        }`}
                      >
                        {tr.passed ? 'Pass' : 'Fail'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs text-slate-400">Registered Test Specifications:</div>
                {testCases.map((tc, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded text-xs">
                    <div className="text-slate-300 font-medium">{tc.description}</div>
                    <div className="font-mono text-slate-500 mt-1">Expected: {tc.expected}</div>
                  </div>
                ))}
                <p className="text-xs text-slate-500 italic mt-3">
                  Click "Submit for Grading" to run through official verification and anti-cheat audit.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'anticheat' && (
          <div className="space-y-4 font-sans text-sm">
            {evaluation ? (
              <div className="space-y-4">
                {/* Status Box */}
                <div
                  className={`p-4 rounded-xl border ${
                    evaluation.isAiGenerated
                      ? 'bg-rose-950/60 border-rose-800 text-rose-100'
                      : 'bg-emerald-950/40 border-emerald-800 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    {evaluation.isAiGenerated ? (
                      <ShieldAlert className="w-6 h-6 text-rose-400" />
                    ) : (
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    )}
                    <div>
                      <h3 className="font-bold text-base">
                        {evaluation.isAiGenerated
                          ? 'AI-Generated Solution Detected'
                          : 'Authentic Human Learner Verified'}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {evaluation.isAiGenerated
                          ? 'Points deducted for copying code from external AI/web sources.'
                          : 'Full points and progress streak awarded.'}
                      </p>
                    </div>
                  </div>

                  {/* Meter Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-300">AI Plagiarism Probability:</span>
                      <span
                        className={`font-mono font-bold ${
                          evaluation.isAiGenerated ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {evaluation.aiConfidence}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${
                          evaluation.isAiGenerated ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(5, evaluation.aiConfidence))}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs leading-relaxed text-slate-200 bg-slate-950/80 p-3 rounded-lg border border-slate-800/60">
                    <span className="font-semibold text-slate-400">Inspector Analysis: </span>
                    {evaluation.detectionReasoning}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300">Point Adjustment:</span>
                    <span
                      className={`font-mono text-sm ${
                        evaluation.pointsDelta > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {evaluation.pointsDelta > 0 ? `+${evaluation.pointsDelta} pts` : `${evaluation.pointsDelta} pts`}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1.5 text-slate-400">
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Why We Enforce Anti-Cheat & Plagiarism Penalties</span>
                  </div>
                  <p>
                    At JARVIS Code Academy, our goal is for you to develop genuine neural intuition for programming. Copying solutions from ChatGPT or web scrapers deprives your brain of the struggle that builds true mastery.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <ShieldCheck className="w-10 h-10 text-cyan-400/80 mx-auto" />
                <h4 className="font-semibold text-slate-200">Anti-Cheat Inspection Ready</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  When you submit your code for grading, JARVIS inspects syntax style, naming patterns, and construct sophistication to ensure the solution was crafted by you.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
