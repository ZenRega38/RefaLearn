// TEMPORARY: renders part of the picture library to a PNG contact sheet. Not committed.
import { it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { PICTURES } from "@/components/course/pictures";
import { PICTURE_NAMES } from "@/lib/course/pictures";

it("renders contact sheet", async () => {
  const out = process.env.PREVIEW_OUT ?? "C:/Users/MyBook Hype AMD/.claude/jobs/1ab2be6e/tmp/sheet.png";
  const from = process.env.PREVIEW_FROM ?? "eye";
  const to = process.env.PREVIEW_TO;
  const start = PICTURE_NAMES.indexOf(from as never);
  const end = to ? PICTURE_NAMES.indexOf(to as never) + 1 : PICTURE_NAMES.length;
  const names = PICTURE_NAMES.slice(start, end);
  const cols = 9;
  const cell = 130;
  const rows = Math.ceil(names.length / cols);
  const cells = names.map((n, i) => {
    const inner = renderToStaticMarkup(createElement("g", { stroke: "#3B3340", strokeWidth: 2.6, strokeLinejoin: "round", strokeLinecap: "round" }, PICTURES[n]()));
    const x = (i % cols) * cell;
    const y = Math.floor(i / cols) * (cell + 18);
    return `<g transform="translate(${x + 5} ${y + 5}) scale(${(cell - 10) / 100})">${inner}</g><text x="${x + cell / 2}" y="${y + cell + 11}" font-size="12" text-anchor="middle" font-family="Arial">${n}</text>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * cell}" height="${rows * (cell + 18)}" font-family="Arial"><rect width="100%" height="100%" fill="#FBF7EF"/>${cells.join("")}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
}, 60000);
