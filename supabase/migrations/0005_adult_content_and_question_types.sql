-- ============================================================
-- SEED: Unit 4 "Expressions & Idioms" — adult-level content,
-- and new question-type examples (translate / listening / arrange)
-- ============================================================

insert into public.units (id, course_id, title, sort_order)
values ('22222222-2222-2222-2222-222222222225', '11111111-1111-1111-1111-111111111111', 'Expressions & Idioms', 3);

insert into public.lessons (id, unit_id, title, lesson_type, sort_order, xp_reward) values
  ('99999999-9999-9999-9999-999999999991', '22222222-2222-2222-2222-222222222225', 'Work & Introductions', 'vocabulary', 0, 10),
  ('99999999-9999-9999-9999-999999999992', '22222222-2222-2222-2222-222222222225', 'Common Idioms', 'vocabulary', 1, 10),
  ('99999999-9999-9999-9999-999999999993', '22222222-2222-2222-2222-222222222225', 'Small Talk', 'vocabulary', 2, 10),
  ('99999999-9999-9999-9999-999999999994', '22222222-2222-2222-2222-222222222225', 'Mixed Review', 'quiz', 3, 20);

-- Lesson: Work & Introductions
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, tip, sort_order) values
  ('99999999-9999-9999-9999-999999999991', 'شو بتشتغل؟', 'Shu btishtghel?', 'What do you do (for work)?', null, 0),
  ('99999999-9999-9999-9999-999999999991', 'أنا بشتغل...', 'Ana bishtghel...', 'I work as...', null, 1),
  ('99999999-9999-9999-9999-999999999991', 'شرفنا', 'Sharrafna', 'Pleased to meet you', 'Literally "you honored us" — a formal, respectful greeting on first meeting.', 2),
  ('99999999-9999-9999-9999-999999999991', 'تشرفنا', 'Tsharrafna', 'The pleasure is ours (reply)', 'The standard reply to Sharrafna.', 3),
  ('99999999-9999-9999-9999-999999999991', 'اجتماع', 'Ijtima''', 'Meeting', null, 4);

-- Lesson: Common Idioms (genuinely adult content — nuance and cultural context, not just vocab)
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, tip, sort_order) values
  ('99999999-9999-9999-9999-999999999992', 'على عيني وراسي', 'Ala aini w rasi', 'Consider it done', 'Literally "on my eye and head" — a warm way to say you''ll gladly take care of something.', 0),
  ('99999999-9999-9999-9999-999999999992', 'يعطيك العافية', 'Ya''tik al-afye', 'Thank you / well done (for effort)', 'Said to anyone doing or finishing work — a shopkeeper, a cook, a colleague.', 1),
  ('99999999-9999-9999-9999-999999999992', 'الله يسلمك', 'Allah ysalmak', 'Bless you / reply to thanks', 'A common, warm reply to "ya''tik al-afye."', 2),
  ('99999999-9999-9999-9999-999999999992', 'دخلك', 'Dakhlak', 'Please / I''m asking you sincerely', 'Stronger and more personal than "law samaht" — used between people who know each other.', 3),
  ('99999999-9999-9999-9999-999999999992', 'يلا بينا', 'Yalla beina', 'Let''s go / let''s get moving', 'Casual and energetic — used to rally a group into action.', 4);

-- Lesson: Small Talk
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, tip, sort_order) values
  ('99999999-9999-9999-9999-999999999993', 'كيف الأحوال؟', 'Kif al-ahwal?', 'How are things?', 'A step more formal than "kifak," good for acquaintances.', 0),
  ('99999999-9999-9999-9999-999999999993', 'الحمد لله تمام', 'Alhamdulillah tamam', 'All good, thank God', 'The default upbeat answer — even a neutral day is usually "tamam."', 1),
  ('99999999-9999-9999-9999-999999999993', 'شو الأخبار؟', 'Shu al-akhbar?', 'What''s new?', null, 2),
  ('99999999-9999-9999-9999-999999999993', 'ولا شي جديد', 'Wala shi jdid', 'Nothing new', null, 3),
  ('99999999-9999-9999-9999-999999999993', 'نورتنا', 'Nawwartna', 'You brightened our place (welcoming a guest)', 'Said to a visitor — literally "you lit us up." A hallmark of Palestinian hospitality.', 4);

-- ------------------------------------------------------------
-- Mixed Review quiz — demonstrates all four question types:
-- multiple_choice, translate, listening, arrange
-- ------------------------------------------------------------

-- Multiple choice
insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '99999999-9999-9999-9999-999999999994', 'What does يعطيك العافية mean?', 'يعطيك العافية', 'Ya''tik al-afye', 'multiple_choice', 0);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Goodbye', false, 0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Thank you for your effort', true, 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'How are you?', false, 2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Congratulations', false, 3);

-- Translate (type the answer). is_correct rows are the accepted variants.
insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '99999999-9999-9999-9999-999999999994', 'Type the English translation.', 'شرفنا', 'Sharrafna', 'translate', 1);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'pleased to meet you', true, 0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'nice to meet you', true, 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'honored to meet you', true, 2);

-- Listening (Arabic text used only as TTS fallback; not shown until after answering)
insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', '99999999-9999-9999-9999-999999999994', 'What did you hear?', 'نورتنا', 'Nawwartna', 'listening', 2);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'You brightened our place', true, 0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Nothing new', false, 1),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'What do you do for work?', false, 2),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Consider it done', false, 3);

-- Arrange (build the sentence from shuffled word tiles)
insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4', '99999999-9999-9999-9999-999999999994', 'Arrange the sentence: "What do you do for work?"', 'شو بتشتغل؟', 'Shu btishtghel?', 'arrange', 3);
