// These types mirror supabase/migrations/0001_init.sql.
// Once your Supabase project is live, regenerate with:
//   npm run db:types
// (requires SUPABASE_PROJECT_ID in your env)

export type LessonType = "quiz" | "listening" | "arrange" | "matching" | "vocabulary";
export type QuestionType = "multiple_choice" | "listening" | "arrange" | "matching";
export type LessonStatus = "not_started" | "in_progress" | "completed";
export type GenderNote = "male" | "female" | null;

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  level: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface Unit {
  id: string;
  course_id: string;
  title: string;
  sort_order: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  lesson_type: LessonType;
  sort_order: number;
  xp_reward: number;
  created_at: string;
}

export interface Question {
  id: string;
  lesson_id: string;
  prompt_en: string;
  arabic_text: string | null;
  transliteration: string | null;
  question_type: QuestionType;
  audio_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  sort_order: number;
}

export interface VocabularyItem {
  id: string;
  lesson_id: string | null;
  arabic_text: string;
  transliteration: string;
  english_translation: string;
  gender_note: GenderNote;
  audio_url: string | null;
  tip: string | null;
  sort_order: number;
}

export interface UserLessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: LessonStatus;
  score: number;
  progress_pct: number;
  completed_at: string | null;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  current_unit_id: string | null;
  current_lesson_id: string | null;
  updated_at: string;
}

export interface UserXp {
  user_id: string;
  total_xp: number;
  updated_at: string;
}

export interface UserStreak {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  updated_at: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

export interface LeaderboardRow {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  total_xp: number;
}

// Composite shapes used by the UI (joined queries)
export interface LessonWithProgress extends Lesson {
  progress?: UserLessonProgress;
}

export interface UnitWithLessons extends Unit {
  lessons: LessonWithProgress[];
}
