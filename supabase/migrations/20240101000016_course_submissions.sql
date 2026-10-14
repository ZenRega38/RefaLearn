-- ============================================================================
-- Refa Learn — Work log for interactive courses
--
-- course_progress keeps only the best result per item (it drives unlocking),
-- so a student's actual answers were lost after every chapter pretest,
-- posttest and lesson checkpoint. course_submissions keeps EVERY attempt
-- with the answers given, so the admin can see per course, chapter, item
-- and student what was answered and what was wrong.
--
--   kind = 'level_pretest' | 'level_quiz'  answers: { questionId: Response }
--   kind = 'checkpoint'                    item_id = lesson id; answers are
--                                          the FIRST try of each question
--   kind = 'writing'                       item_id = task id; answers =
--                                          { text, words, lessonId }
--
-- Course pretest / tryout attempts already keep their answers in
-- course_attempts. Content (questions, keys) lives in the repo; the server
-- regrades stored answers against it when the admin opens an attempt.
-- Writes go through server routes (service role) only.
-- ============================================================================

create table if not exists public.course_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_slug text not null,
  item_id text not null,
  kind text not null check (kind in ('level_pretest', 'level_quiz', 'checkpoint', 'writing')),
  score int,
  max_score int,
  passed boolean,
  answers jsonb,
  created_at timestamptz not null default now()
);

create index if not exists course_submissions_created_idx on public.course_submissions (created_at desc);
create index if not exists course_submissions_student_idx on public.course_submissions (student_id, course_slug, created_at desc);
create index if not exists course_submissions_course_idx on public.course_submissions (course_slug, item_id, created_at desc);

alter table public.course_submissions enable row level security;

drop policy if exists "Students can view own course submissions" on public.course_submissions;
create policy "Students can view own course submissions"
  on public.course_submissions for select
  using (auth.uid() = student_id);

drop policy if exists "Admins can manage course submissions" on public.course_submissions;
create policy "Admins can manage course submissions"
  on public.course_submissions for all
  using (public.is_admin())
  with check (public.is_admin());

-- Earlier pretests / posttests: only the best score survived, without
-- answers. Carry them over once so the log isn't empty for them.
insert into public.course_submissions (student_id, course_slug, item_id, kind, score, max_score, passed, answers, created_at)
select p.student_id, p.course_slug, p.item_id, p.kind, p.score, p.max_score, p.passed, null, p.completed_at
from public.course_progress p
where p.kind in ('level_pretest', 'level_quiz')
  and not exists (
    select 1 from public.course_submissions s
    where s.student_id = p.student_id and s.course_slug = p.course_slug and s.item_id = p.item_id
  );
