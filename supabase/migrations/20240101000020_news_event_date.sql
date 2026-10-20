-- ============================================================================
-- Refa Learn — Event date on stories
--
-- A story can be about something that happened on another day than the
-- day it was published (a Tech Fest in 2024 written up in 2026). The admin
-- picks the event date; cards, the story header and the list order use it,
-- and the story page shows "Published on …" (published_at) at the bottom.
-- Stories without an event date fall back to their publish date, so the
-- existing ones are filled in with the day they were published (WITA).
-- ============================================================================

alter table public.news_posts
  add column if not exists event_date date;

update public.news_posts
  set event_date = (published_at at time zone 'Asia/Makassar')::date
  where event_date is null and published_at is not null;

create index if not exists news_posts_status_event_date_idx
  on public.news_posts (status, event_date desc, published_at desc);
