import { describe, expect, it } from "vitest";
import { youtubeEmbedUrl, youtubeId } from "@/lib/youtube";

describe("youtubeId", () => {
  it("reads every common link shape", () => {
    const id = "dQw4w9WgXcQ";
    for (const url of [
      `https://www.youtube.com/watch?v=${id}`,
      `https://youtube.com/watch?v=${id}&t=42s`,
      `https://m.youtube.com/watch?v=${id}`,
      `https://youtu.be/${id}`,
      `https://youtu.be/${id}?si=abc`,
      `https://www.youtube.com/shorts/${id}`,
      `https://www.youtube.com/live/${id}?feature=share`,
      `https://www.youtube.com/embed/${id}`,
      `youtube.com/watch?v=${id}`,
    ]) {
      expect(youtubeId(url), url).toBe(id);
    }
  });

  it("rejects other sites, missing ids and junk", () => {
    expect(youtubeId("https://vimeo.com/123456")).toBeNull();
    expect(youtubeId("https://www.youtube.com/watch")).toBeNull();
    expect(youtubeId("https://www.youtube.com/channel/UC123")).toBeNull();
    expect(youtubeId("https://youtu.be/short")).toBeNull();
    expect(youtubeId("not a link")).toBeNull();
    expect(youtubeId("")).toBeNull();
    expect(youtubeId(null)).toBeNull();
  });

  it("embeds without autoplay", () => {
    expect(youtubeEmbedUrl("dQw4w9WgXcQ")).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0");
  });
});
