import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types/curriculum';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { TutorDrawer } from './TutorDrawer';
import { executePythonSimulated } from '../utils/codeRunner';
import { applyEvaluationResult } from '../utils/storage';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bot,
  Lightbulb,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExerciseViewProps {
  exercises: Exercise[];
  currentExerciseId: number;
  onSelectExercise: (id: number) => void;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  exercises,
  currentExerciseId,
  onSelectExercise,
  progress,
  onUpdateProgress,
}) => {
  const currentExercise = exercises.find((e) => e.id === currentExerciseId) || exercises[0];

  const [code, setCode] = useState<string>(
    progress.exerciseCode[currentExercise.id] || currentExercise.starterCode
  );
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [exerciseListOpen, setExerciseListOpen] = useState(false);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<number>(currentExercise.moduleId);

  // Sync code when active exercise changes
  useEffect(() => {
    setCode(progress.exerciseCode[currentExercise.id] || currentExercise.starterCode);
    setStdout('');
    setStderr('');
    setEvaluation(null);
    setShowHint(false);
    setSelectedModuleFilter(currentExercise.moduleId);
  }, [currentExercise.id]);

  const isUnlocked = progress.points >= currentExercise.requiredPoints;
  const isCompleted = progress.completedExercises.includes(currentExercise.id);

  // Run code locally in browser sandbox
  const handleRunCode = () => {
    setIsRunning(true);
    setStderr('');
    try {
      const result = executePythonSimulated(code);
      setStdout(result.stdout);
      setStderr(result.stderr);
      setExecutionTimeMs(result.executionTimeMs);
    } catch (err: any) {
      setStderr(err.message || String(err));
    } finally {
      setIsRunning(false);
    }
  };

  // Submit code for grading and anti-cheat inspection
  const handleSubmitCode = async () => {
    setIsEvaluating(true);
    setStderr('');

    // First do a fast local execution
    const runResult = executePythonSimulated(code);
    setStdout(runResult.stdout);
    setStderr(runResult.stderr);
    setExecutionTimeMs(runResult.executionTimeMs);

    try {
      const response = await fetch('/api/check-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          itemType: 'exercise',
          itemId: currentExercise.id,
          itemTitle: currentExercise.title,
          expectedBehavior: currentExercise.sampleExpectedOutput,
          testCases: currentExercise.testCases,
          studentLevel: currentExercise.moduleId,
        }),
      });

      const evalData = await response.json();
      setEvaluation(evalData);

      // Apply scoring / anti-cheat penalties to progress
      const { updated } = applyEvaluationResult(
        progress,
        currentExercise.id,
        'exercise',
        currentExercise.title,
        evalData,
        code
      );
      onUpdateProgress(updated);

      if (evalData.passed && !evalData.isAiGenerated) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } catch (err: any) {
      console.error('Grading submission error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setCode(currentExercise.starterCode);
    setStdout('');
    setStderr('');
    setEvaluation(null);
  };

  const nextExercise = exercises.find((e) => e.id === currentExercise.id + 1);
  const prevExercise = exercises.find((e) => e.id === currentExercise.id - 1);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden text-slate-100">
      {/* Exercise Sub-header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExerciseListOpen(!exerciseListOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exercises Directory ({currentExercise.id}/100)</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-400 hidden sm:inline">{currentExercise.moduleName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => prevExercise && onSelectExercise(prevExercise.id)}
            disabled={!prevExercise}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 transition-colors"
            title="Previous Exercise"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-slate-400">
            #{currentExercise.id} of 100
          </span>

          <button
            onClick={() => nextExercise && onSelectExercise(nextExercise.id)}
            disabled={!nextExercise}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 transition-colors"
            title="Next Exercise"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsTutorOpen(true)}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 border border-cyan-500/50 hover:bg-cyan-600/40 text-cyan-300 font-semibold transition-colors"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Workspace (Two-Zone Split) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Panel: Exercise Objective & Concept Guidance */}
        <div className="w-full lg:w-[420px] xl:w-[460px] bg-slate-900/80 border-r border-slate-800 overflow-y-auto p-5 flex flex-col justify-between shrink-0">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-cyan-400 font-semibold">{currentExercise.concept}</span>
                <span className="font-mono text-amber-400 font-bold">+{currentExercise.points} pts</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {currentExercise.id}. {currentExercise.title}
              </h1>
            </div>

            {/* Locked Warning if not enough points */}
            {!isUnlocked && (
              <div className="p-3.5 bg-amber-950/40 border border-amber-800/80 rounded-xl text-xs space-y-1 text-amber-200">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Module Gated by Points</span>
                </div>
                <p>
                  Requires {currentExercise.requiredPoints} points to unlock (you have {progress.points} pts). Earn points by mastering earlier exercises without AI copying!
                </p>
              </div>
            )}

            {/* Description */}
            <div className="text-xs leading-relaxed text-slate-300 space-y-2">
              <p>{currentExercise.description}</p>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Your Objectives</span>
              </h3>
              <ol className="space-y-2 text-xs text-slate-300">
                {currentExercise.instructions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Target Output Box */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400">Target Output:</div>
              <pre className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                {currentExercise.sampleExpectedOutput}
              </pre>
            </div>

            {/* Solution Hint Accordion */}
            <div className="pt-2">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Need a hint? Click to reveal</span>
                </button>
              ) : (
                <div className="p-3 bg-amber-950/30 border border-amber-900/60 rounded-lg text-xs text-amber-200 space-y-1">
                  <div className="font-semibold text-amber-400 flex items-center justify-between">
                    <span>Guidance Hint:</span>
                    <button onClick={() => setShowHint(false)} className="text-[10px] text-slate-400 hover:text-white">Hide</button>
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-wrap text-amber-100/90">{currentExercise.solutionHint}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Card Navigation */}
          {isCompleted && nextExercise && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Exercise Completed!</span>
              </div>
              <button
                onClick={() => onSelectExercise(nextExercise.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <span>Next Exercise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Code Editor (top) + Console / Tests (bottom) */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden bg-slate-950">
          <div className="flex-1 min-h-[300px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onSubmit={handleSubmitCode}
              onReset={handleReset}
              isRunning={isRunning}
              isEvaluating={isEvaluating}
              disabled={!isUnlocked}
            />
          </div>

          <div className="h-64 sm:h-72 shrink-0">
            <ConsoleOutput
              stdout={stdout}
              stderr={stderr}
              executionTimeMs={executionTimeMs}
              testCases={currentExercise.testCases}
              evaluation={evaluation}
              sampleExpectedOutput={currentExercise.sampleExpectedOutput}
            />
          </div>
        </div>

        {/* Exercises Drawer Modal (Directory) */}
        {exerciseListOpen && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>The 100 Fundamental Programming Exercises</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({progress.completedExercises.length} completed)
                </span>
              </h2>
              <button
                onClick={() => setExerciseListOpen(false)}
                className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Close Directory
              </button>
            </div>

            {/* Module Filter Tabs */}
            <div className="flex items-center gap-1.5 py-3 overflow-x-auto text-xs no-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7].map((mId) => (
                <button
                  key={mId}
                  onClick={() => setSelectedModuleFilter(mId)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    selectedModuleFilter === mId
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Module {mId}
                </button>
              ))}
            </div>

            {/* Exercise Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-2 pr-1">
              {exercises
                .filter((e) => e.moduleId === selectedModuleFilter)
                .map((ex) => {
                  const done = progress.completedExercises.includes(ex.id);
                  const unlocked = progress.points >= ex.requiredPoints;
                  const active = ex.id === currentExercise.id;

                  return (
                    <div
                      key={ex.id}
                      onClick={() => {
                        onSelectExercise(ex.id);
                        setExerciseListOpen(false);
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                        active
                          ? 'border-cyan-500 bg-cyan-950/30'
                          : done
                          ? 'border-emerald-800/60 bg-emerald-950/10 hover:border-emerald-700'
                          : !unlocked
                          ? 'border-slate-800/50 bg-slate-900/30 opacity-60'
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono">Ex #{ex.id}</span>
                          <span className="font-mono text-amber-400">+{ex.points}p</span>
                        </div>
                        <h4 className="font-semibold text-slate-100 line-clamp-1">{ex.title}</h4>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/40 text-[10px]">
                        <span className="text-slate-500">{ex.concept}</span>
                        {done ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        ) : !unlocked ? (
                          <span className="text-amber-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> {ex.requiredPoints}p
                          </span>
                        ) : (
                          <span className="text-cyan-400">Ready</span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Tutor Drawer */}
      <TutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        itemTitle={currentExercise.title}
        itemType="exercise"
        currentCode={code}
      />
    </div>
  );
};
