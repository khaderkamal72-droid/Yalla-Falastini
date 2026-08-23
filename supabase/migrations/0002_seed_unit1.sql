-- ============================================================
-- SEED: Palestinian Arabic course, Unit 1 "Getting Started"
-- ============================================================
insert into public.courses (id, slug, title, description, sort_order)
values ('11111111-1111-1111-1111-111111111111', 'palestinian-arabic', 'Palestinian Arabic', 'Learn Palestinian Arabic dialect through fun, gamified lessons.', 0);

insert into public.units (id, course_id, title, sort_order)
values ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Getting Started', 0);

insert into public.lessons (id, unit_id, title, lesson_type, sort_order, xp_reward) values
  ('33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222222', 'Hello', 'vocabulary', 0, 10),
  ('33333333-3333-3333-3333-333333333332', '22222222-2222-2222-2222-222222222222', 'How are you?', 'vocabulary', 1, 10),
  ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Greetings', 'quiz', 2, 10),
  ('33333333-3333-3333-3333-333333333334', '22222222-2222-2222-2222-222222222222', 'Introducing Yourself', 'quiz', 3, 10),
  ('33333333-3333-3333-3333-333333333335', '22222222-2222-2222-2222-222222222222', 'Basic Questions', 'quiz', 4, 10);

-- Lesson 1: Hello — vocabulary
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, sort_order) values
  ('33333333-3333-3333-3333-333333333331', 'مرحبا', 'Marhaba', 'Hello', 0),
  ('33333333-3333-3333-3333-333333333331', 'أهلا', 'Ahlan', 'Hi / Welcome', 1);

-- Lesson 2: How are you? — vocabulary (with gendered forms)
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, gender_note, tip, sort_order) values
  ('33333333-3333-3333-3333-333333333332', 'كيفك؟', 'Kifak?', 'How are you?', 'male', 'Use "Kifak?" when talking to a male.', 0),
  ('33333333-3333-3333-3333-333333333332', 'كيفكِ؟', 'Kifik?', 'How are you?', 'female', 'Use "Kifik?" when talking to a female.', 1),
  ('33333333-3333-3333-3333-333333333332', 'منيح', 'Mnih', 'Good', null, null, 2),
  ('33333333-3333-3333-3333-333333333332', 'الحمد لله', 'Alhamdulillah', 'I''m good', null, 'Literally "praise be to God" — a common way to say you''re doing well.', 3);

-- Lesson 3: Greetings — vocabulary + quiz questions
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, sort_order) values
  ('33333333-3333-3333-3333-333333333333', 'يلا', 'Yalla', 'Let''s go / Come on', 0),
  ('33333333-3333-3333-3333-333333333333', 'شكراً', 'Shukran', 'Thank you', 1),
  ('33333333-3333-3333-3333-333333333333', 'تشرفنا', 'Tsharrafna', 'Nice to meet you', 2);

insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('44444444-4444-4444-4444-444444444441', '33333333-3333-3333-3333-333333333333', 'What does يلا mean?', 'يلا', 'Yalla', 'multiple_choice', 0);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('44444444-4444-4444-4444-444444444441', 'Thank you', false, 0),
  ('44444444-4444-4444-4444-444444444441', 'Let''s go / Come on', true, 1),
  ('44444444-4444-4444-4444-444444444441', 'Goodbye', false, 2),
  ('44444444-4444-4444-4444-444444444441', 'House', false, 3);

insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('44444444-4444-4444-4444-444444444442', '33333333-3333-3333-3333-333333333333', 'What does شكراً mean?', 'شكراً', 'Shukran', 'multiple_choice', 1);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('44444444-4444-4444-4444-444444444442', 'Thank you', true, 0),
  ('44444444-4444-4444-4444-444444444442', 'Please', false, 1),
  ('44444444-4444-4444-4444-444444444442', 'Sorry', false, 2),
  ('44444444-4444-4444-4444-444444444442', 'Welcome', false, 3);

-- Achievements
insert into public.achievements (code, title, description, icon) values
  ('first_lesson', 'First Lesson', 'Completed your very first lesson', 'sprout'),
  ('streak_7', '7 Day Streak', 'Practiced 7 days in a row', 'flame'),
  ('words_100', '100 Words', 'Learned 100 vocabulary words', 'book'),
  ('perfect_lesson', 'Perfect!', 'Finished a lesson with 100% accuracy', 'star');
