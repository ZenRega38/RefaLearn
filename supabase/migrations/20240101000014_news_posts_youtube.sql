-- ============================================================================
-- Optional YouTube video under a story
--
-- Shown below the story content (not autoplayed). A link that doesn't parse,
-- or a video that is gone, private or not embeddable, is simply not shown to
-- readers; the admin sees a warning on the form and a "!" in the list.
-- ============================================================================

alter table public.news_posts
  add column if not exists youtube_url text;

alter table public.news_posts drop constraint if exists news_posts_youtube_url_length;
alter table public.news_posts add constraint news_posts_youtube_url_length
  check (youtube_url is null or length(youtube_url) <= 500);
