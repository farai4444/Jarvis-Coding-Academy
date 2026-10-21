import React, { useState, useEffect } from 'react';
import { Project, UserProgress } from '../types/curriculum';
import { CodeEditor } from './CodeEditor';
import { ConsoleOutput } from './ConsoleOutput';
import { TutorDrawer } from './TutorDrawer';
import { executePythonSimulated } from '../utils/codeRunner';
import { applyEvaluationResult } from '../utils/storage';
import {
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  Bot,
  Lightbulb,
  CheckCircle2,
  Lock,
  Target,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectViewProps {
  projects: Project[];
  currentProjectId: number;
  onSelectProject: (id: number) => void;
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  projects,
  currentProjectId,
  onSelectProject,
  progress,
  onUpdateProgress,
}) => {
  const currentProject = projects.find((p) => p.id === currentProjectId) || projects[0];

  const [code, setCode] = useState<string>(
    progress.projectCode[currentProject.id] || currentProject.starterTemplate
  );
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [executionTimeMs, setExecutionTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showHints, setShowHints] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [projectListOpen, setProjectListOpen] = useState(false);
  const [selectedTierFilter, setSelectedTierFilter] = useState<number>(currentProject.tier);

  useEffect(() => {
    setCode(progress.projectCode[currentProject.id] || currentProject.starterTemplate);
    setStdout('');
    setStderr('');
    setEvaluation(null);
    setShowHints(false);
    setSelectedTierFilter(currentProject.tier);
  }, [currentProject.id]);

  const isUnlocked = progress.points >= currentProject.requiredPoints;
  const isCompleted = progress.completedProjects.includes(currentProject.id);

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

  const handleSubmitProject = async () => {
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
          itemType: 'project',
          itemId: currentProject.id,
          itemTitle: currentProject.title,
          expectedBehavior: currentProject.deliverables.join('; '),
          testCases: [],
          studentLevel: currentProject.tier * 2,
        }),
      });

      const evalData = await response.json();
      setEvaluation(evalData);

      const { updated } = applyEvaluationResult(
        progress,
        currentProject.id,
        'project',
        currentProject.title,
        evalData,
        code
      );
      onUpdateProgress(updated);

      if (evalData.passed && !evalData.isAiGenerated) {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } catch (err: any) {
      console.error('Project submission error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setCode(currentProject.starterTemplate);
    setStdout('');
    setStderr('');
    setEvaluation(null);
  };

  const nextProject = projects.find((p) => p.id === currentProject.id + 1);
  const prevProject = projects.find((p) => p.id === currentProject.id - 1);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden text-slate-100">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setProjectListOpen(!projectListOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium"
          >
            <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
            <span>Projects Directory ({currentProject.id}/40)</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="text-slate-400 hidden sm:inline">{currentProject.tierName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => prevProject && onSelectProject(prevProject.id)}
            disabled={!prevProject}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-slate-400">
            Project #{currentProject.id} of 40
          </span>

          <button
            onClick={() => nextProject && onSelectProject(nextProject.id)}
            disabled={!nextProject}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsTutorOpen(true)}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/30 border border-cyan-500/50 hover:bg-cyan-600/40 text-cyan-300 font-semibold transition-colors"
          >
            <Bot className="w-4 h-4" />
            <span>Project Coach</span>
          </button>
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Specification Column */}
        <div className="w-full lg:w-[440px] xl:w-[480px] bg-slate-900/80 border-r border-slate-800 overflow-y-auto p-5 space-y-5 shrink-0">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-cyan-400 font-semibold">{currentProject.category}</span>
              <span className="font-mono text-amber-400 font-bold">+{currentProject.points} pts</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {currentProject.id}. {currentProject.title}
            </h1>
          </div>

          {!isUnlocked && (
            <div className="p-3.5 bg-amber-950/40 border border-amber-800/80 rounded-xl text-xs space-y-1 text-amber-200">
              <div className="flex items-center gap-1.5 font-bold">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Project Tier Locked</span>
              </div>
              <p>
                Requires {currentProject.requiredPoints} points to unlock. Solve foundational exercises honestly to earn points.
              </p>
            </div>
          )}

          <div className="text-xs leading-relaxed text-slate-300">
            <p>{currentProject.overview}</p>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Project Deliverables & Milestones</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentProject.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rubrics */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400">Grading Rubric Breakdown:</div>
            <div className="space-y-1.5 text-xs">
              {currentProject.rubrics.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-950 rounded border border-slate-800/80">
                  <span className="text-slate-300">{r.criterion}</span>
                  <span className="font-mono text-cyan-400 font-semibold">{r.weight}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hints */}
          <div className="pt-2">
            {!showHints ? (
              <button
                onClick={() => setShowHints(true)}
                className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>View Architecture Hints</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-950/30 border border-amber-900/60 rounded-lg text-xs text-amber-200 space-y-1.5">
                <div className="font-semibold text-amber-400 flex items-center justify-between">
                  <span>Implementation Hints:</span>
                  <button onClick={() => setShowHints(false)} className="text-[10px] text-slate-400 hover:text-white">Hide</button>
                </div>
                {currentProject.hints.map((h, i) => (
                  <p key={i} className="text-amber-100/90 leading-relaxed">• {h}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Editor & Console */}
        <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden bg-slate-950">
          <div className="flex-1 min-h-[300px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunCode}
              onSubmit={handleSubmitProject}
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
              testCases={[]}
              evaluation={evaluation}
              sampleExpectedOutput={currentProject.deliverables[0]}
            />
          </div>
        </div>

        {/* Project Directory Modal */}
        {projectListOpen && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>The 40 Practical Beginner Software Projects</span>
                <span className="text-xs text-slate-400 font-normal">
                  ({progress.completedProjects.length} completed)
                </span>
              </h2>
              <button
                onClick={() => setProjectListOpen(false)}
                className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Close Directory
              </button>
            </div>

            {/* Tier Filter Tabs */}
            <div className="flex items-center gap-2 py-3 overflow-x-auto text-xs no-scrollbar">
              {[1, 2, 3, 4].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTierFilter(tier)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                    selectedTierFilter === tier
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tier {tier}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2 pr-1">
              {projects
                .filter((p) => p.tier === selectedTierFilter)
                .map((proj) => {
                  const done = progress.completedProjects.includes(proj.id);
                  const unlocked = progress.points >= proj.requiredPoints;
                  const active = proj.id === currentProject.id;

                  return (
                    <div
                      key={proj.id}
                      onClick={() => {
                        onSelectProject(proj.id);
                        setProjectListOpen(false);
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
                          <span className="font-mono">Proj #{proj.id}</span>
                          <span className="font-mono text-amber-400 font-bold">+{proj.points}p</span>
                        </div>
                        <h4 className="font-semibold text-slate-100 line-clamp-1">{proj.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{proj.overview}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/40 text-[10px]">
                        <span className="text-slate-500">{proj.category}</span>
                        {done ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        ) : !unlocked ? (
                          <span className="text-amber-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> {proj.requiredPoints}p
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

      <TutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        itemTitle={currentProject.title}
        itemType="project"
        currentCode={code}
      />
    </div>
  );
};
