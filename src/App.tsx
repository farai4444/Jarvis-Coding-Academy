import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ExerciseView } from './components/ExerciseView';
import { ProjectView } from './components/ProjectView';
import { TestView } from './components/TestView';
import { SpecializedModulesView } from './components/SpecializedModulesView';
import { ProgressionOverview } from './components/ProgressionOverview';
import { AntiCheatModal } from './components/AntiCheatModal';
import { EXERCISES } from './data/exercises';
import { PROJECTS } from './data/projects';
import { TESTS } from './data/tests';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { UserProgress } from './types/curriculum';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'exercises' | 'projects' | 'tests' | 'specialized' | 'progression'
  >('exercises');

  const [activeExerciseId, setActiveExerciseId] = useState<number>(1);
  const [activeProjectId, setActiveProjectId] = useState<number>(1);
  const [activeTestId, setActiveTestId] = useState<number>(1);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [isHonorCodeOpen, setIsHonorCodeOpen] = useState(false);

  // Sync progress updates to storage
  const handleUpdateProgress = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Bar Contract Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        progress={progress}
        onOpenHonorCode={() => setIsHonorCodeOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'progression' && (
          <ProgressionOverview
            progress={progress}
            onNavigate={(view) => setCurrentView(view)}
          />
        )}

        {currentView === 'exercises' && (
          <ExerciseView
            exercises={EXERCISES}
            currentExerciseId={activeExerciseId}
            onSelectExercise={(id) => setActiveExerciseId(id)}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentView === 'projects' && (
          <ProjectView
            projects={PROJECTS}
            currentProjectId={activeProjectId}
            onSelectProject={(id) => setActiveProjectId(id)}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentView === 'tests' && (
          <TestView
            tests={TESTS}
            currentTestId={activeTestId}
            onSelectTest={(id) => setActiveTestId(id)}
            progress={progress}
            onUpdateProgress={handleUpdateProgress}
          />
        )}

        {currentView === 'specialized' && (
          <SpecializedModulesView
            progress={progress}
            onNavigateToExercises={() => setCurrentView('exercises')}
          />
        )}
      </main>

      {/* Anti-Cheat & Honor Code Modal */}
      <AntiCheatModal
        isOpen={isHonorCodeOpen}
        onClose={() => setIsHonorCodeOpen(false)}
        violations={progress.antiCheatViolations}
        totalPenalties={progress.totalPenaltiesDeducted}
        currentPoints={progress.points}
      />
    </div>
  );
}
