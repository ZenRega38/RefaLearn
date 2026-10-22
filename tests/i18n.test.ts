import { describe, expect, it } from "vitest";
import { asLang, pickLocalized, requestLang, translator } from "@/lib/i18n";
import { buildContractTemplate, buildContractTemplateEn } from "@/lib/contract-template";

describe("interface language", () => {
  it("defaults to Indonesian", () => {
    expect(asLang(undefined)).toBe("id");
    expect(asLang("fr")).toBe("id");
    expect(asLang("en")).toBe("en");
  });

  it("reads the lang cookie of a request", () => {
    const req = (cookie?: string) => new Request("https://refalearn.web.id/api/x", { headers: cookie ? { cookie } : {} });
    expect(requestLang(req())).toBe("id");
    expect(requestLang(req("sb-token=abc; lang=en"))).toBe("en");
    expect(requestLang(req("lang=id; other=1"))).toBe("id");
    expect(requestLang(req("notlang=en"))).toBe("id");
  });

  it("picks the wording for the language", () => {
    expect(translator("id")("Masuk", "Log in")).toBe("Masuk");
    expect(translator("en")("Masuk", "Log in")).toBe("Log in");
  });
});

describe("admin texts written in both languages", () => {
  const value = { text: "Visi kami", text_en: "Our vision", name: "Rega", title: "Pendiri", title_en: " " };

  it("gives English visitors the English text", () => {
    expect(pickLocalized(value, "text", "en")).toBe("Our vision");
    expect(pickLocalized(value, "text", "id")).toBe("Visi kami");
  });

  it("falls back to the Indonesian text when the English one is missing", () => {
    expect(pickLocalized(value, "title", "en")).toBe("Pendiri");
    expect(pickLocalized(value, "name", "en")).toBe("Rega");
  });

  it("is empty for a setting that was never filled", () => {
    expect(pickLocalized(undefined, "text", "en")).toBe("");
    expect(pickLocalized({ text: 3 }, "text", "id")).toBe("");
  });
});

describe("agreement translation", () => {
  const params = { ownerName: "Rega", address: "Jl. Contoh", email: "a@b.c", whatsapp: "0812" };

  it("has the same articles as the Indonesian agreement", () => {
    const count = (html: string, re: RegExp) => (html.match(re) || []).length;
    const id = buildContractTemplate(params);
    const en = buildContractTemplateEn(params);
    expect(count(en, /<h3>Article \d+/g)).toBe(count(id, /<h3>Pasal \d+/g));
    expect(count(en, /<li>/g)).toBe(count(id, /<li>/g));
    expect(en).not.toMatch(/\[[A-Z]/);
  });
});
