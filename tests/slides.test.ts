import { describe, expect, it } from "vitest";
import { slideEmbed } from "@/lib/slides";

const ID = "1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789";

describe("slideEmbed", () => {
  it("embeds Google Slides share links", () => {
    for (const url of [
      `https://docs.google.com/presentation/d/${ID}/edit?usp=sharing`,
      `https://docs.google.com/presentation/d/${ID}/edit#slide=id.p1`,
      `https://docs.google.com/presentation/d/${ID}`,
      `docs.google.com/presentation/d/${ID}/view`,
    ]) {
      expect(slideEmbed(url), url).toEqual({
        embedUrl: `https://docs.google.com/presentation/d/${ID}/preview`,
        openUrl: `https://docs.google.com/presentation/d/${ID}/view`,
        shape: "wide",
      });
    }
  });

  it("embeds published Google Slides", () => {
    expect(slideEmbed(`https://docs.google.com/presentation/d/e/2PACX-${ID}/pub?start=false`)?.embedUrl).toBe(
      `https://docs.google.com/presentation/d/e/2PACX-${ID}/embed?start=false&loop=false`
    );
  });

  it("embeds Google Drive files (PDF, PPTX…) in every link shape", () => {
    for (const url of [
      `https://drive.google.com/file/d/${ID}/view?usp=sharing`,
      `https://drive.google.com/file/d/${ID}/view?usp=drive_link`,
      `https://drive.google.com/open?id=${ID}`,
      `https://drive.google.com/uc?id=${ID}&export=download`,
    ]) {
      expect(slideEmbed(url)?.embedUrl, url).toBe(`https://drive.google.com/file/d/${ID}/preview`);
    }
  });

  it("embeds Canva designs and direct files", () => {
    expect(slideEmbed("https://www.canva.com/design/DAF123abc/xyzKey/view?utm_source=share")?.embedUrl).toBe(
      "https://www.canva.com/design/DAF123abc/xyzKey/view?embed"
    );
    expect(slideEmbed("https://example.com/files/module-1.pdf")).toMatchObject({ embedUrl: "https://example.com/files/module-1.pdf", shape: "tall" });
    expect(slideEmbed("https://example.com/files/module-1.pptx")?.embedUrl).toBe(
      "https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fexample.com%2Ffiles%2Fmodule-1.pptx"
    );
  });

  it("rejects links it cannot show", () => {
    expect(slideEmbed("https://drive.google.com/drive/folders/" + ID)).toBeNull();
    expect(slideEmbed("https://docs.google.com/presentation/d/short/edit")).toBeNull();
    expect(slideEmbed("https://example.com/page")).toBeNull();
    expect(slideEmbed("http://example.com/module.pdf")).toBeNull();
    expect(slideEmbed("javascript:alert(1)")).toBeNull();
    expect(slideEmbed("not a link")).toBeNull();
    expect(slideEmbed("")).toBeNull();
    expect(slideEmbed(null)).toBeNull();
  });
});
