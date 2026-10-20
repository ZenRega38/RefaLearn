-- ============================================================================
-- Refa Learn — Starting over keeps everything else
--
-- Out of attempts, a student starts over by studying the quiz's chapter
-- again. Instead of clearing lesson progress (which, in courses that open
-- chapter by chapter, also locked every later chapter), the round's
-- attempts get a timestamp: the chapter's lessons finished before it must be
-- studied again before a new round opens. Other chapters and saved results
-- are untouched. Also tells a real restart apart from older tryout attempts
-- that simply don't count toward the limit.
-- ============================================================================

alter table public.course_quiz_attempts
  add column if not exists restarted_at timestamptz;

alter table public.course_attempts
  add column if not exists restarted_at timestamptz;
