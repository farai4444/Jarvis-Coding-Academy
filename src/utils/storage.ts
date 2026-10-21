import { UserProgress, Badge, AntiCheatViolation } from '../types/curriculum';

const STORAGE_KEY = 'jarvis_academy_progress_v1';

export const INITIAL_BADGES: Badge[] = [
  { id: 'b_first_run', name: 'First Pulse', icon: 'Terminal', description: 'Executed Python code in the sandbox for the first time.' },
  { id: 'b_first_solve', name: 'Hello World', icon: 'CheckCircle', description: 'Successfully completed your very first exercise.' },
  { id: 'b_human_craft', name: 'Genuine Human Mind', icon: 'ShieldCheck', description: 'Passed 5 exercises with 100% authentic human learner verification.' },
  { id: 'b_mod1_clear', name: 'Foundations Master', icon: 'Award', description: 'Completed all exercises in Module 1: Foundations & Printing.' },
  { id: 'b_first_proj', name: 'Project Builder', icon: 'Layers', description: 'Shipped your first complete real-world software project.' },
  { id: 'b_first_test', name: 'Certified Novice', icon: 'BookmarkCheck', description: 'Achieved passing certification on your first assessment test.' },
  { id: 'b_half_century', name: '50 Milestone', icon: 'Zap', description: 'Conquered 50 full programming exercises.' },
  { id: 'b_century_club', name: 'Century Club', icon: 'Trophy', description: 'Completed all 100 fundamentals programming exercises!' },
  { id: 'b_jarvis_architect', name: 'Master Architect', icon: 'Sparkles', description: 'Reached 1,800 points and unlocked the Autonomous Bot Architecture module!' },
];

export const INITIAL_PROGRESS: UserProgress = {
  points: 0,
  completedExercises: [],
  completedProjects: [],
  completedTests: [],
  exerciseCode: {},
  projectCode: {},
  testScores: {},
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: INITIAL_BADGES,
  antiCheatViolations: [],
  totalPenaltiesDeducted: 0,
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      badges: INITIAL_BADGES.map((b) => {
        const existing = parsed.badges?.find((eb: Badge) => eb.id === b.id);
        return existing || b;
      }),
    };
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress:', err);
  }
}

/**
 * Record code submission results, award points or apply anti-cheat penalty
 */
export function applyEvaluationResult(
  prev: UserProgress,
  itemId: number,
  itemType: 'exercise' | 'project' | 'test',
  itemTitle: string,
  result: {
    passed: boolean;
    isAiGenerated: boolean;
    aiConfidence: number;
    detectionReasoning: string;
    pointsDelta: number;
  },
  submittedCode: string
): { updated: UserProgress; alertType: 'penalty' | 'success' | 'retry'; message: string } {
  let points = prev.points;
  let totalPenalties = prev.totalPenaltiesDeducted;
  const violations = [...prev.antiCheatViolations];
  const completedEx = new Set(prev.completedExercises);
  const completedProj = new Set(prev.completedProjects);
  const completedT = new Set(prev.completedTests);
  const exCode = { ...prev.exerciseCode };
  const projCode = { ...prev.projectCode };

  let alertType: 'penalty' | 'success' | 'retry' = 'retry';
  let message = '';

  // 1. Anti-Cheat AI Plagiarism Detected
  if (result.isAiGenerated) {
    const penaltyAmount = Math.abs(result.pointsDelta || 25);
    points = Math.max(0, points - penaltyAmount);
    totalPenalties += penaltyAmount;

    violations.unshift({
      id: 'viol_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      itemId,
      itemType,
      title: itemTitle,
      reason: result.detectionReasoning,
      aiConfidence: result.aiConfidence,
      pointsDeducted: penaltyAmount,
    });

    alertType = 'penalty';
    message = `AI-Generated Solution Detected! -${penaltyAmount} points deducted. Copying external AI solutions cheats your own brain. Write code yourself to recover points!`;
  } else if (result.passed) {
    // 2. Genuine Human Pass
    let awarded = 0;
    if (itemType === 'exercise') {
      if (!completedEx.has(itemId)) {
        completedEx.add(itemId);
        awarded = result.pointsDelta > 0 ? result.pointsDelta : 20;
        points += awarded;
      }
      exCode[itemId] = submittedCode;
    } else if (itemType === 'project') {
      if (!completedProj.has(itemId)) {
        completedProj.add(itemId);
        awarded = result.pointsDelta > 0 ? result.pointsDelta : 80;
        points += awarded;
      }
      projCode[itemId] = submittedCode;
    } else if (itemType === 'test') {
      if (!completedT.has(itemId)) {
        completedT.add(itemId);
        awarded = result.pointsDelta > 0 ? result.pointsDelta : 120;
        points += awarded;
      }
    }

    alertType = 'success';
    message = `Verified Human Solution! +${awarded} points awarded toward your next unlock!`;
  } else {
    // 3. Human attempt, but didn't pass tests yet
    if (itemType === 'exercise') exCode[itemId] = submittedCode;
    if (itemType === 'project') projCode[itemId] = submittedCode;
    alertType = 'retry';
    message = 'Not quite there yet. Check the test output and tutor hints!';
  }

  // Check Badge Unlocks
  const updatedBadges = prev.badges.map((b) => {
    if (b.unlockedAt) return b;
    let unlocked = false;

    if (b.id === 'b_first_solve' && completedEx.size >= 1) unlocked = true;
    if (b.id === 'b_mod1_clear' && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].every((id) => completedEx.has(id))) unlocked = true;
    if (b.id === 'b_first_proj' && completedProj.size >= 1) unlocked = true;
    if (b.id === 'b_first_test' && completedT.size >= 1) unlocked = true;
    if (b.id === 'b_half_century' && completedEx.size >= 50) unlocked = true;
    if (b.id === 'b_century_club' && completedEx.size >= 100) unlocked = true;
    if (b.id === 'b_jarvis_architect' && points >= 1800) unlocked = true;
    if (b.id === 'b_human_craft' && completedEx.size >= 5 && violations.length === 0) unlocked = true;

    return unlocked ? { ...b, unlockedAt: new Date().toLocaleDateString() } : b;
  });

  const updated: UserProgress = {
    ...prev,
    points,
    totalPenaltiesDeducted: totalPenalties,
    completedExercises: Array.from(completedEx),
    completedProjects: Array.from(completedProj),
    completedTests: Array.from(completedT),
    exerciseCode: exCode,
    projectCode: projCode,
    badges: updatedBadges,
    antiCheatViolations: violations,
  };

  saveUserProgress(updated);
  return { updated, alertType, message };
}
