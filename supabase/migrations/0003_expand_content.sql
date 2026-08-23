-- ============================================================
-- SEED: Palestinian Arabic course, Unit 2 "Everyday Life"
--                                  Unit 3 "Around Town"
-- ============================================================

-- ------------------------------------------------------------
-- UNIT 2 — Everyday Life
-- ------------------------------------------------------------
insert into public.units (id, course_id, title, sort_order)
values ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Everyday Life', 1);

insert into public.lessons (id, unit_id, title, lesson_type, sort_order, xp_reward) values
  ('55555555-5555-5555-5555-555555555551', '22222222-2222-2222-2222-222222222223', 'Numbers', 'vocabulary', 0, 10),
  ('55555555-5555-5555-5555-555555555552', '22222222-2222-2222-2222-222222222223', 'Family', 'vocabulary', 1, 10),
  ('55555555-5555-5555-5555-555555555553', '22222222-2222-2222-2222-222222222223', 'Colors', 'vocabulary', 2, 10),
  ('55555555-5555-5555-5555-555555555554', '22222222-2222-2222-2222-222222222223', 'Food & Drink', 'vocabulary', 3, 10),
  ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222223', 'Everyday Life Quiz', 'quiz', 4, 15);

-- Lesson: Numbers
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, sort_order) values
  ('55555555-5555-5555-5555-555555555551', 'واحد', 'Wahad', 'One', 0),
  ('55555555-5555-5555-5555-555555555551', 'اثنين', 'Tnein', 'Two', 1),
  ('55555555-5555-5555-5555-555555555551', 'ثلاثة', 'Tlaate', 'Three', 2),
  ('55555555-5555-5555-5555-555555555551', 'أربعة', 'Arba''a', 'Four', 3),
  ('55555555-5555-5555-5555-555555555551', 'خمسة', 'Khamse', 'Five', 4);

-- Lesson: Family
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, gender_note, sort_order) values
  ('55555555-5555-5555-5555-555555555552', 'أم', 'Imm', 'Mother', null, 0),
  ('55555555-5555-5555-5555-555555555552', 'أب / بابا', 'Ab / Baba', 'Father', null, 1),
  ('55555555-5555-5555-5555-555555555552', 'أخ', 'Akhu', 'Brother', 'male', 2),
  ('55555555-5555-5555-5555-555555555552', 'أخت', 'Ukht', 'Sister', 'female', 3),
  ('55555555-5555-5555-5555-555555555552', 'بيت', 'Beit', 'House / Home', null, 4);

-- Lesson: Colors
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, sort_order) values
  ('55555555-5555-5555-5555-555555555553', 'أحمر', 'Ahmar', 'Red', 0),
  ('55555555-5555-5555-5555-555555555553', 'أزرق', 'Azraq', 'Blue', 1),
  ('55555555-5555-5555-5555-555555555553', 'أخضر', 'Akhdar', 'Green', 2),
  ('55555555-5555-5555-5555-555555555553', 'أصفر', 'Asfar', 'Yellow', 3),
  ('55555555-5555-5555-5555-555555555553', 'أسود', 'Aswad', 'Black', 4);

-- Lesson: Food & Drink
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, tip, sort_order) values
  ('55555555-5555-5555-5555-555555555554', 'خبز', 'Khubez', 'Bread', null, 0),
  ('55555555-5555-5555-5555-555555555554', 'مي', 'Mai', 'Water', null, 1),
  ('55555555-5555-5555-5555-555555555554', 'قهوة', 'Ahwe', 'Coffee', 'Palestinian coffee culture — offering ahwe to guests is a sign of hospitality.', 2),
  ('55555555-5555-5555-5555-555555555554', 'مسخّن', 'Musakhan', 'Musakhan (traditional dish)', 'A beloved Palestinian dish of roasted chicken, sumac, and onions over taboon bread.', 3),
  ('55555555-5555-5555-5555-555555555554', 'كنافة', 'Knafeh', 'Knafeh (sweet dessert)', 'Famously associated with the city of Nablus.', 4);

-- Lesson: Everyday Life Quiz
insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('66666666-6666-6666-6666-666666666661', '55555555-5555-5555-5555-555555555555', 'What does ثلاثة mean?', 'ثلاثة', 'Tlaate', 'multiple_choice', 0),
  ('66666666-6666-6666-6666-666666666662', '55555555-5555-5555-5555-555555555555', 'What does أم mean?', 'أم', 'Imm', 'multiple_choice', 1),
  ('66666666-6666-6666-6666-666666666663', '55555555-5555-5555-5555-555555555555', 'What does أخضر mean?', 'أخضر', 'Akhdar', 'multiple_choice', 2),
  ('66666666-6666-6666-6666-666666666664', '55555555-5555-5555-5555-555555555555', 'What does خبز mean?', 'خبز', 'Khubez', 'multiple_choice', 3);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('66666666-6666-6666-6666-666666666661', 'Two', false, 0),
  ('66666666-6666-6666-6666-666666666661', 'Three', true, 1),
  ('66666666-6666-6666-6666-666666666661', 'Five', false, 2),
  ('66666666-6666-6666-6666-666666666661', 'Ten', false, 3),

  ('66666666-6666-6666-6666-666666666662', 'Father', false, 0),
  ('66666666-6666-6666-6666-666666666662', 'Sister', false, 1),
  ('66666666-6666-6666-6666-666666666662', 'Mother', true, 2),
  ('66666666-6666-6666-6666-666666666662', 'House', false, 3),

  ('66666666-6666-6666-6666-666666666663', 'Red', false, 0),
  ('66666666-6666-6666-6666-666666666663', 'Green', true, 1),
  ('66666666-6666-6666-6666-666666666663', 'Yellow', false, 2),
  ('66666666-6666-6666-6666-666666666663', 'Black', false, 3),

  ('66666666-6666-6666-6666-666666666664', 'Water', false, 0),
  ('66666666-6666-6666-6666-666666666664', 'Coffee', false, 1),
  ('66666666-6666-6666-6666-666666666664', 'Bread', true, 2),
  ('66666666-6666-6666-6666-666666666664', 'Sweets', false, 3);

-- ------------------------------------------------------------
-- UNIT 3 — Around Town
-- ------------------------------------------------------------
insert into public.units (id, course_id, title, sort_order)
values ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'Around Town', 2);

insert into public.lessons (id, unit_id, title, lesson_type, sort_order, xp_reward) values
  ('77777777-7777-7777-7777-777777777771', '22222222-2222-2222-2222-222222222224', 'Directions', 'vocabulary', 0, 10),
  ('77777777-7777-7777-7777-777777777772', '22222222-2222-2222-2222-222222222224', 'Time', 'vocabulary', 1, 10),
  ('77777777-7777-7777-7777-777777777773', '22222222-2222-2222-2222-222222222224', 'Shopping', 'vocabulary', 2, 10),
  ('77777777-7777-7777-7777-777777777774', '22222222-2222-2222-2222-222222222224', 'Common Phrases', 'vocabulary', 3, 10),
  ('77777777-7777-7777-7777-777777777775', '22222222-2222-2222-2222-222222222224', 'Around Town Quiz', 'quiz', 4, 15);

-- Lesson: Directions
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, sort_order) values
  ('77777777-7777-7777-7777-777777777771', 'يمين', 'Yamin', 'Right', 0),
  ('77777777-7777-7777-7777-777777777771', 'شمال', 'Shmal', 'Left', 1),
  ('77777777-7777-7777-7777-777777777771', 'دغري', 'Doghri', 'Straight ahead', 2),
  ('77777777-7777-7777-7777-777777777771', 'قريب', 'Qarib', 'Near', 3),
  ('77777777-7777-7777-7777-777777777771', 'بعيد', 'Ba''id', 'Far', 4);

-- Lesson: Time
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, sort_order) values
  ('77777777-7777-7777-7777-777777777772', 'اليوم', 'Ilyoum', 'Today', 0),
  ('77777777-7777-7777-7777-777777777772', 'بكرا', 'Bukra', 'Tomorrow', 1),
  ('77777777-7777-7777-7777-777777777772', 'مبارح', 'Mbareh', 'Yesterday', 2),
  ('77777777-7777-7777-7777-777777777772', 'هلق', 'Halla''', 'Now', 3),
  ('77777777-7777-7777-7777-777777777772', 'بعدين', 'Ba''dein', 'Later', 4);

-- Lesson: Shopping
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, tip, sort_order) values
  ('77777777-7777-7777-7777-777777777773', 'قديش؟', 'Addesh?', 'How much?', 'The essential question for any souq or shop.', 0),
  ('77777777-7777-7777-7777-777777777773', 'غالي', 'Ghali', 'Expensive', null, 1),
  ('77777777-7777-7777-7777-777777777773', 'رخيص', 'Rkhis', 'Cheap', null, 2),
  ('77777777-7777-7777-7777-777777777773', 'مصاري', 'Masari', 'Money', null, 3),
  ('77777777-7777-7777-7777-777777777773', 'سوق', 'Souq', 'Market', 'Try the Old City souqs in Nablus, Hebron, or Jerusalem.', 4);

-- Lesson: Common Phrases
insert into public.vocabulary (lesson_id, arabic_text, transliteration, english_translation, tip, sort_order) values
  ('77777777-7777-7777-7777-777777777774', 'لو سمحت', 'Law samaht', 'Excuse me / Please', 'Used to politely get someone''s attention.', 0),
  ('77777777-7777-7777-7777-777777777774', 'آسف', 'Asef', 'Sorry', null, 1),
  ('77777777-7777-7777-7777-777777777774', 'مبروك', 'Mabrouk', 'Congratulations', 'Said at weddings, graduations, and good news of any kind.', 2),
  ('77777777-7777-7777-7777-777777777774', 'إن شاء الله', 'Inshallah', 'God willing', 'Used constantly to talk about future plans or hopes.', 3),
  ('77777777-7777-7777-7777-777777777774', 'مع السلامة', 'Ma''a salame', 'Goodbye', null, 4);

-- Lesson: Around Town Quiz
insert into public.questions (id, lesson_id, prompt_en, arabic_text, transliteration, question_type, sort_order) values
  ('88888888-8888-8888-8888-888888888881', '77777777-7777-7777-7777-777777777775', 'What does دغري mean?', 'دغري', 'Doghri', 'multiple_choice', 0),
  ('88888888-8888-8888-8888-888888888882', '77777777-7777-7777-7777-777777777775', 'What does بكرا mean?', 'بكرا', 'Bukra', 'multiple_choice', 1),
  ('88888888-8888-8888-8888-888888888883', '77777777-7777-7777-7777-777777777775', 'What does قديش؟ mean?', 'قديش؟', 'Addesh?', 'multiple_choice', 2),
  ('88888888-8888-8888-8888-888888888884', '77777777-7777-7777-7777-777777777775', 'What does إن شاء الله mean?', 'إن شاء الله', 'Inshallah', 'multiple_choice', 3);

insert into public.question_options (question_id, option_text, is_correct, sort_order) values
  ('88888888-8888-8888-8888-888888888881', 'Right', false, 0),
  ('88888888-8888-8888-8888-888888888881', 'Straight ahead', true, 1),
  ('88888888-8888-8888-8888-888888888881', 'Near', false, 2),
  ('88888888-8888-8888-8888-888888888881', 'Far', false, 3),

  ('88888888-8888-8888-8888-888888888882', 'Today', false, 0),
  ('88888888-8888-8888-8888-888888888882', 'Yesterday', false, 1),
  ('88888888-8888-8888-8888-888888888882', 'Tomorrow', true, 2),
  ('88888888-8888-8888-8888-888888888882', 'Now', false, 3),

  ('88888888-8888-8888-8888-888888888883', 'How much?', true, 0),
  ('88888888-8888-8888-8888-888888888883', 'Where is it?', false, 1),
  ('88888888-8888-8888-8888-888888888883', 'What is this?', false, 2),
  ('88888888-8888-8888-8888-888888888883', 'Who are you?', false, 3),

  ('88888888-8888-8888-8888-888888888884', 'Goodbye', false, 0),
  ('88888888-8888-8888-8888-888888888884', 'Congratulations', false, 1),
  ('88888888-8888-8888-8888-888888888884', 'Sorry', false, 2),
  ('88888888-8888-8888-8888-888888888884', 'God willing', true, 3);
