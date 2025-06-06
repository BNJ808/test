export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  notes?: string;
  isDeleted?: boolean;
  order: number;
}

export interface Set {
  weight: number;
  reps: number;
  timestamp: Date;
}

export interface Category {
  id: string;
  name: string;
  exercises: Exercise[];
  isDeleted?: boolean;
  order: number;
}

export interface WorkoutDay {
  id: string;
  name: string;
  categories: Category[];
  order: number;
}

export interface WorkoutData {
  days: WorkoutDay[];
  timestamp: any; // Firebase Timestamp
}

export interface PersonalRecord {
  weight: number;
  date: Date;
  reps: number;
}

export interface ExerciseHistory {
  exerciseName: string;
  sessions: Array<{
    date: Date;
    sets: Set[];
  }>;
  personalRecord?: PersonalRecord;
  lastSession?: {
    date: Date;
    sets: Set[];
  };
}

export type ActiveTab = 'workout' | 'timer' | 'history';

export interface AppState {
  workoutData: WorkoutData;
  isEditMode: boolean;
  isAdvancedMode: boolean;
  activeTab: ActiveTab;
  undoStack: WorkoutData[];
  redoStack: WorkoutData[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}