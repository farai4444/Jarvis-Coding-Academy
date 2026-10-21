export type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Intermediate' | 'Advanced' | 'Assessment' | 'Exam' | 'Capstone';

export interface TestCase {
  input?: string;
  expected: string;
  description: string;
}

export interface Exercise {
  id: number;
  moduleId: number;
  moduleName: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  requiredPoints: number;
  concept: string;
  description: string;
  instructions: string[];
  starterCode: string;
  solutionHint: string;
  sampleExpectedOutput: string;
  testCases: TestCase[];
}

export interface ProjectRubric {
  criterion: string;
  weight: number;
}

export interface Project {
  id: number;
  tier: 1 | 2 | 3 | 4;
  tierName: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  requiredPoints: number;
  category: string;
  overview: string;
  deliverables: string[];
  starterTemplate: string;
  rubrics: ProjectRubric[];
  hints: string[];
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CertificationTest {
  id: number;
  title: string;
  difficulty: Difficulty;
  points: number;
  requiredPoints: number;
  timeLimitMinutes: number;
  description: string;
  questions: TestQuestion[];
  codingChallenge: {
    title: string;
    prompt: string;
    starterCode: string;
    expectedOutput: string;
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface AntiCheatViolation {
  id: string;
  timestamp: string;
  itemId: number;
  itemType: 'exercise' | 'project' | 'test';
  title: string;
  reason: string;
  aiConfidence: number;
  pointsDeducted: number;
}

export interface UserProgress {
  points: number;
  completedExercises: number[];
  completedProjects: number[];
  completedTests: number[];
  exerciseCode: Record<number, string>;
  projectCode: Record<number, string>;
  testScores: Record<number, { score: number; passed: boolean }>;
  streakDays: number;
  lastActiveDate: string;
  badges: Badge[];
  antiCheatViolations: AntiCheatViolation[];
  totalPenaltiesDeducted: number;
}

export interface ModuleInfo {
  id: number;
  name: string;
  tagline: string;
  exerciseRange: [number, number];
  requiredPoints: number;
  isSpecialized?: boolean;
}
