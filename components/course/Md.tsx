import { Fragment, type ReactNode } from "react";

/**
 * Tiny, safe renderer for the course's lesson text: **bold**, *italic*,
 * line breaks, and numbered/bulleted lines. Builds React nodes — never
 * injects HTML.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2]) out.push(<strong key={`${keyBase}-b${i++}`}>{m[2]}</strong>);
    else out.push(<em key={`${keyBase}-i${i++}`}>{m[3]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Md({ text, className = "" }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className={`space-y-3 ${className}`}>
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        const numbered = lines.every((l) => /^\d+\.\s/.test(l));
        const bulleted = lines.every((l) => /^[-•]\s/.test(l));
        if (numbered || bulleted) {
          const Tag = numbered ? "ol" : "ul";
          return (
            <Tag key={pi} className={`${numbered ? "list-decimal" : "list-disc"} pl-5 space-y-1`}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^(\d+\.|[-•])\s/, ""), `${pi}-${li}`)}</li>
              ))}
            </Tag>
          );
        }
        return (
          <p key={pi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {inline(l, `${pi}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
