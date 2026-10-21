import React, { useState, useEffect } from 'react';
import { CertificationTest, UserProgress } from '../types/curriculum';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { executePythonSimulated } from '../utils/codeRunner';
import { applyEvaluationResult } from '../utils/storage';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Lock,
  FileQuestion,
  Code2,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TestViewProps {
  tests: CertificationTest[];
  currentTestId: number;
  onSelectTest: (id: number) => void;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const TestView: React.FC<TestViewProps> = ({
  tests,
  currentTestId,
  onSelectTest,
  progress,
  onUpdateProgress,
}) => {
  const currentTest = tests.find((t) => t.id === currentTestId) || tests[0];

  // Stage: 'questions' | 'challenge' | 'certificate'
  const [stage, setStage] = useState<'questions' | 'challenge'>('questions');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [questionAnswersSubmitted, setQuestionAnswersSubmitted] = useState(false);
  const [code, setCode] = useState<string>(currentTest.codingChallenge.starterCode);
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [testDirectoryOpen, setTestDirectoryOpen] = useState(false);

  useEffect(() => {
    setStage('questions');
    setSelectedAnswers({});
    setQuestionAnswersSubmitted(false);
    setCode(currentTest.codingChallenge.starterCode);
    setStdout('');
    setStderr('');
    setEvaluation(null);
  }, [currentTest.id]);

  const isUnlocked = progress.points >= currentTest.requiredPoints;
  const isCompleted = progress.completedTests.includes(currentTest.id);

  // Compute question score
  const correctCount = currentTest.questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const allAnswered = currentTest.questions.every((q) => selectedAnswers[q.id] !== undefined);

  const handleRunChallenge = () => {
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

  const handleSubmitChallenge = async () => {
    setIsEvaluating(true);
    setStderr('');

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
          itemType: 'test',
          itemId: currentTest.id,
          itemTitle: currentTest.title,
          expectedBehavior: currentTest.codingChallenge.expectedOutput,
          testCases: [{ expected: currentTest.codingChallenge.expectedOutput, description: currentTest.codingChallenge.prompt }],
          studentLevel: Math.ceil(currentTest.id / 3),
        }),
      });

      const evalData = await response.json();
      setEvaluation(evalData);

      const { updated } = applyEvaluationResult(
        progress,
        currentTest.id,
        'test',
        currentTest.title,
        evalData,
        code
      );
      onUpdateProgress(updated);

      if (evalData.passed && !evalData.isAiGenerated) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
        });
      }
    } catch (err: any) {
      console.error('Test grading error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextTest = tests.find((t) => t.id === currentTest.id + 1);
  const prevTest = tests.find((t) => t.id === currentTest.id - 1);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden text-slate-100">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTestDirectoryOpen(!testDirectoryOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>25 Certification Tests ({progress.completedTests.length}/25)</span>
          </button>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-400 hidden sm:inline">{currentTest.difficulty}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => prevTest && onSelectTest(prevTest.id)}
            disabled={!prevTest}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-slate-400">
            Test #{currentTest.id} of 25
          </span>

          <button
            onClick={() => nextTest && onSelectTest(nextTest.id)}
            disabled={!nextTest}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 bg-slate-850 px-2.5 py-1 rounded-md text-xs font-mono ml-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTest.timeLimitMinutes} min limit</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Side: Test Stage Controller & Details */}
        <div className="w-full lg:w-[460px] xl:w-[500px] bg-slate-900/80 border-r border-slate-800 overflow-y-auto p-5 space-y-5 shrink-0">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-cyan-400 font-semibold">{currentTest.difficulty} Certification</span>
              <span className="font-mono text-amber-400 font-bold text-sm">+{currentTest.points} pts</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {currentTest.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {currentTest.description}
            </p>
          </div>

          {!isUnlocked && (
            <div className="p-3.5 bg-amber-950/40 border border-amber-800/80 rounded-xl text-xs space-y-1 text-amber-200">
              <div className="flex items-center gap-1.5 font-bold">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Certification Test Locked</span>
              </div>
              <p>
                Requires {currentTest.requiredPoints} points to unlock (you have {progress.points} pts). Complete exercises honestly to earn access!
              </p>
            </div>
          )}

          {/* Phase Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setStage('questions')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors ${
                stage === 'questions' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileQuestion className="w-3.5 h-3.5" />
              <span>Part 1: Concepts ({currentTest.questions.length})</span>
            </button>
            <button
              onClick={() => setStage('challenge')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors ${
                stage === 'challenge' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Part 2: Practical Code</span>
            </button>
          </div>

          {/* Part 1: Multiple Choice Questions */}
          {stage === 'questions' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Answer all conceptual questions to verify your theoretical understanding:
              </div>

              {currentTest.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
                  <div className="text-xs font-semibold text-slate-200">
                    {idx + 1}. {q.question}
                  </div>

                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let optionClasses = 'border-slate-800 hover:border-slate-700 text-slate-300';

                      if (questionAnswersSubmitted) {
                        if (isCorrect) optionClasses = 'border-emerald-700 bg-emerald-950/40 text-emerald-200';
                        else if (isSelected && !isCorrect) optionClasses = 'border-rose-700 bg-rose-950/40 text-rose-200';
                      } else if (isSelected) {
                        optionClasses = 'border-cyan-500 bg-cyan-950/30 text-white font-medium';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => {
                            if (!questionAnswersSubmitted) {
                              setSelectedAnswers({ ...selectedAnswers, [q.id]: optIdx });
                            }
                          }}
                          className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-2 ${optionClasses}`}
                        >
                          <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] shrink-0 font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {questionAnswersSubmitted && (
                    <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                      <span className="font-semibold text-cyan-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center">
                {!questionAnswersSubmitted ? (
                  <button
                    onClick={() => setQuestionAnswersSubmitted(true)}
                    disabled={!allAnswered}
                    className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Check Theory Answers
                  </button>
                ) : (
                  <button
                    onClick={() => setStage('challenge')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Part 2: Practical Challenge ({correctCount}/{currentTest.questions.length} Correct)</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Part 2: Practical Challenge Info */}
          {stage === 'challenge' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Live Coding Task
                </span>
                <h3 className="text-sm font-bold text-white">
                  {currentTest.codingChallenge.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentTest.codingChallenge.prompt}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-400">Strict Output Specification:</div>
                <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 whitespace-pre-wrap">
                  {currentTest.codingChallenge.expectedOutput}
                </pre>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-1 text-slate-400">
                <div className="font-semibold text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Certification Requirements:</span>
                </div>
                <p>
                  Your code will be evaluated by the anti-cheat inspector. You must solve this task in authentic beginner code without external AI copying.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Challenge Code Editor & Tester */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden bg-slate-950">
          <div className="flex-1 min-h-[300px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunChallenge}
              onSubmit={handleSubmitChallenge}
              onReset={() => setCode(currentTest.codingChallenge.starterCode)}
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
              testCases={[]}
              evaluation={evaluation}
              sampleExpectedOutput={currentTest.codingChallenge.expectedOutput}
            />
          </div>
        </div>

        {/* Test Directory Drawer */}
        {testDirectoryOpen && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>The 25 Certification Assessments</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({progress.completedTests.length} certified)
                </span>
              </h2>
              <button
                onClick={() => setTestDirectoryOpen(false)}
                className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Close Directory
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4 pr-1">
              {tests.map((t) => {
                const done = progress.completedTests.includes(t.id);
                const unlocked = progress.points >= t.requiredPoints;
                const active = t.id === currentTest.id;

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTest(t.id);
                      setTestDirectoryOpen(false);
                    }}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
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
                        <span className="font-mono">Test #{t.id}</span>
                        <span className="font-mono text-amber-400 font-bold">+{t.points}p</span>
                      </div>
                      <h4 className="font-semibold text-slate-100 line-clamp-1">{t.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{t.description}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/40 text-[10px]">
                      <span className="text-slate-500">{t.timeLimitMinutes} mins</span>
                      {done ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Certified
                        </span>
                      ) : !unlocked ? (
                        <span className="text-amber-400 flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t.requiredPoints}p
                        </span>
                      ) : (
                        <span className="text-cyan-400">Available</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
