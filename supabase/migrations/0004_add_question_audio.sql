-- Add audio_url to questions so quiz prompts can have AI-generated pronunciation too
-- (vocabulary already had this column from the start).
alter table public.questions add column if not exists audio_url text;
