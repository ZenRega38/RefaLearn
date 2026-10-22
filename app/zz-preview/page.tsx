// TEMPORARY visual preview of catalog lessons. Not committed.
import { getCourse } from "@/lib/course/content";
import { LessonBlocks } from "@/components/course/LessonBlocks";
import { CourseLangProvider } from "@/components/course/lang";
import { QuestionBlock } from "@/components/course/QuestionBlock";
import { NoopQuestion } from "./noop";

export default async function Preview({ searchParams }: { searchParams: Promise<{ c?: string; m?: string; l?: string; s?: string; q?: string }> }) {
  const { c = "english-sd-1", m = "0", l = "0", s = "0", q } = await searchParams;
  const course = getCourse(c)!;
  const lesson = course.levels[Number(m)].lessons[Number(l)];
  const section = lesson.sections[Number(s)];
  return (
    <CourseLangProvider lang="en" readAloud>
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-10 space-y-4">
        <h1 className="text-3xl">{lesson.title}</h1>
        <h2 className="text-xl text-[var(--color-brand-blue)]">{section.title}</h2>
        <LessonBlocks blocks={section.blocks} />
        {q !== undefined && <NoopQuestion question={lesson.checkpoint[Number(q)]} />}
      </div>
    </CourseLangProvider>
  );
}
void QuestionBlock;
