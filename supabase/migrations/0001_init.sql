-- ============================================================
-- YALLA FALASTINI — CORE SCHEMA
-- ============================================================
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- PROFILES (1:1 with auth.users)
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Learner',
  avatar_url text,
  level int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- LEARNING CONTENT (read-only to end users)
-- ------------------------------------------------------------
create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,             -- e.g. 'palestinian-arabic'
  title text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.units (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,                   -- 'Getting Started'
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default uuid_generate_v4(),
  unit_id uuid not null references public.units(id) on delete cascade,
  title text not null,                   -- 'Greetings'
  lesson_type text not null default 'quiz' check (lesson_type in ('quiz','listening','arrange','matching','vocabulary')),
  sort_order int not null default 0,
  xp_reward int not null default 10,
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  prompt_en text not null,               -- "What does يلا mean?"
  arabic_text text,                      -- يلا
  transliteration text,                  -- Yalla
  question_type text not null default 'multiple_choice'
    check (question_type in ('multiple_choice','listening','arrange','matching')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.question_options (
  id uuid primary key default uuid_generate_v4(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  sort_order int not null default 0
);

create table public.vocabulary (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid references public.lessons(id) on delete cascade,
  arabic_text text not null,             -- كيفك؟
  transliteration text not null,         -- Kifak?
  english_translation text not null,     -- How are you?
  gender_note text,                      -- 'male' | 'female' | null
  audio_url text,
  tip text,                              -- cultural / usage tip
  sort_order int not null default 0
);

-- ------------------------------------------------------------
-- USER PROGRESS + GAMIFICATION (owned by each user)
-- ------------------------------------------------------------
create table public.user_lesson_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started','in_progress','completed')),
  score int not null default 0,
  progress_pct int not null default 0,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table public.user_progress (
  -- rolled-up per-course progress, e.g. current unit/lesson pointer
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  current_unit_id uuid references public.units(id),
  current_lesson_id uuid references public.lessons(id),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table public.user_xp (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_xp int not null default 0,
  updated_at timestamptz not null default now()
);

create table public.user_streaks (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_activity_date date,
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,             -- 'first_lesson', 'streak_7', 'words_100'
  title text not null,
  description text,
  icon text,                             -- emoji or icon key
  created_at timestamptz not null default now()
);

create table public.user_achievements (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (user_id, achievement_id)
);

-- ------------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------------
create index idx_units_course on public.units(course_id);
create index idx_lessons_unit on public.lessons(unit_id);
create index idx_questions_lesson on public.questions(lesson_id);
create index idx_options_question on public.question_options(question_id);
create index idx_vocab_lesson on public.vocabulary(lesson_id);
create index idx_ulp_user on public.user_lesson_progress(user_id);
create index idx_ua_user on public.user_achievements(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.vocabulary enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.user_xp enable row level security;
alter table public.user_streaks enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

-- Profiles: users manage only their own row
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- Learning content: readable by any authenticated user, no writes from clients
create policy "courses_read_auth" on public.courses for select using (auth.role() = 'authenticated');
create policy "units_read_auth" on public.units for select using (auth.role() = 'authenticated');
create policy "lessons_read_auth" on public.lessons for select using (auth.role() = 'authenticated');
create policy "questions_read_auth" on public.questions for select using (auth.role() = 'authenticated');
create policy "options_read_auth" on public.question_options for select using (auth.role() = 'authenticated');
create policy "vocabulary_read_auth" on public.vocabulary for select using (auth.role() = 'authenticated');
create policy "achievements_read_auth" on public.achievements for select using (auth.role() = 'authenticated');

-- User progress / XP / streaks / achievements: strictly own-row only
create policy "progress_all_own" on public.user_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "lesson_progress_all_own" on public.user_lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "xp_all_own" on public.user_xp
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "streaks_all_own" on public.user_streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "user_achievements_all_own" on public.user_achievements
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Leaderboard needs to read *other* users' XP + display name.
-- Expose a narrow, safe view instead of opening up the base tables.
create view public.leaderboard_view as
  select p.id as user_id, p.display_name, p.avatar_url, coalesce(x.total_xp, 0) as total_xp
  from public.profiles p
  left join public.user_xp x on x.user_id = p.id;

alter view public.leaderboard_view set (security_invoker = true);

create policy "profiles_read_for_leaderboard" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "xp_read_for_leaderboard" on public.user_xp
  for select using (auth.role() = 'authenticated');

-- ============================================================
-- FUNCTION + TRIGGER: auto-create profile/xp/streak rows on signup
-- ============================================================
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
    values (new.id, coalesce(new.raw_user_meta_data->>'display_name', 'Learner'));
  insert into public.user_xp (user_id) values (new.id);
  insert into public.user_streaks (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
