# Yalla Falastini 🇵🇸

Learn Palestinian Arabic. Play. Speak. Connect.

A gamified Palestinian Arabic learning app for English speakers, built with
Next.js, TypeScript, Tailwind CSS, and Supabase.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — custom Yalla Falastini design tokens (forest green, olive, gold, cream)
- **Supabase** — Postgres database, Auth, Row Level Security, Storage
- **Vercel** — deployment target

## Project structure

```
app/
  page.tsx                     Landing page
  (auth)/login, (auth)/signup  Supabase email/password auth
  (app)/dashboard              Home screen: streak, XP, continue-learning card
  (app)/learn                  Vertical learning path (units + lessons)
  (app)/learn/[unitId]/[lessonId]   Lesson runner: vocabulary + quiz flow
  (app)/profile                Stats + achievements
  (app)/leaderboard            XP leaderboard
components/
  ui/                          Button, ProgressBar, StatCard, XPDisplay, StreakDisplay, HeartDisplay
  learning/                    LessonCard, VocabularyCard, QuestionCard, AnswerOption,
                                AudioPlayer, PronunciationRecorder, CharacterIllustration,
                                LeaderboardCard, AchievementBadge
  layout/                      BottomNavigation (mobile), DesktopSidebar (desktop)
lib/supabase/                  Browser + server Supabase clients
middleware.ts                  Refreshes the Supabase session, guards protected routes
types/database.ts              Hand-written types mirroring the schema
supabase/migrations/
  0001_init.sql                Tables, indexes, RLS policies, leaderboard view, signup trigger
  0002_seed_unit1.sql           Unit 1 content: 5 lessons, vocabulary, quiz questions, achievements
```

## Getting started

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a project, then in the SQL
editor run the two migration files in order:

```
supabase/migrations/0001_init.sql
supabase/migrations/0002_seed_unit1.sql
```

(Or, with the Supabase CLI installed and linked to your project: `supabase db push`.)

Copy your project URL and anon key from **Project Settings → API**.

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Install and run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Sign up for an account — the `handle_new_user`
trigger in `0001_init.sql` automatically creates your profile, XP, and streak
rows.

### 4. Deploy

Push this repo to GitHub, then import it into [Vercel](https://vercel.com).
Add the same two `NEXT_PUBLIC_*` environment variables in the Vercel project
settings. Vercel will build and deploy on every push to `main`.

## Data model

Thirteen tables, all behind Row Level Security:

- **Content** (readable by any authenticated user): `courses`, `units`,
  `lessons`, `questions`, `question_options`, `vocabulary`, `achievements`
- **Per-user data** (each user can only read/write their own rows):
  `profiles`, `user_progress`, `user_lesson_progress`, `user_xp`,
  `user_streaks`, `user_achievements`
- `leaderboard_view` exposes just `display_name` + `total_xp` publicly to
  authenticated users, so the leaderboard works without opening up the full
  `profiles`/`user_xp` tables to other users.

## What's implemented (Phase 1 MVP)

- Landing page, Supabase auth (signup/login), middleware-protected routes
- Dashboard pulling live streak/XP/vocab from Supabase
- Learning path with completed/current/locked lesson states
- Lesson runner: vocabulary teaching cards → multiple-choice quiz → XP award
  → progress written to `user_lesson_progress` and `user_xp`
- Profile page (stats, achievements) and leaderboard (live ranking)
- Responsive layout: bottom nav on mobile, sidebar on desktop

## What's next (Phase 2 / 3, per the original brief)

- Real audio files in `public/audio/` wired to `AudioPlayer` (currently a
  no-op if `audio_url` is null — swap in Supabase Storage URLs)
- Listening exercise screen using `PronunciationRecorder` (already scaffolded
  with MediaRecorder — needs a scoring endpoint)
- Sentence-arrangement and matching-game exercise types (schema already
  supports `question_type: 'arrange' | 'matching'`; UI components not yet built)
- Hearts persistence (currently resets each lesson attempt; wire to a
  `user_hearts` table + regen timer if you want cross-session hearts)
- Move the XP increment in `LessonRunner.tsx` into a Postgres RPC
  (`increment_xp(user_id, amount)`) to make it atomic under concurrent writes
- Achievement-unlock triggers (award `first_lesson`, `streak_7`, etc.
  automatically via a Postgres function or Edge Function)
- AI conversation practice, pronunciation feedback, personalized lessons

## Design system

- **Colors**: forest green `#1F4A38` (primary), olive `#8A9A5B`, gold
  `#D4A24C`, cream `#FBF7EC` background, soft red `#C1503F` for hearts/errors
- **Type**: Cairo (display + Arabic text) paired with Inter (English body)
- **Signature motif**: a tatreez-inspired (Palestinian embroidery) diagonal
  stripe pattern, used sparingly on achievement badge frames and as a
  connector style on the learning path, instead of a plain flag motif
- Every Arabic vocabulary item is always shown with Arabic script +
  Latin transliteration + English translation together

See `prototype.html` for a clickable visual reference of every screen.
