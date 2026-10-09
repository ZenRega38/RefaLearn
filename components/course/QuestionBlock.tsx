"use client";

import type { Passage, PublicQuestion, Question, Response } from "@/lib/course/types";
import { AudioPlayer } from "@/components/course/AudioPlayer";
import { PassageView } from "@/components/course/PassageView";
import { QuestionInput } from "@/components/course/QuestionInput";
import { Md } from "@/components/course/Md";
import { Picture } from "@/components/course/pictures";
import { useCourseText, useReadAloud } from "@/components/course/lang";
import { ReadAloudButton } from "@/components/course/ReadAloudButton";

/** Prompt + audio/passage + answer area for one question. */
export function QuestionBlock({
  question,
  passages = [],
  value,
  onChange,
  disabled,
  reveal,
  audioOnce = false,
  audioAutoPlay = false,
  onAudioEnded,
  showTranscript = false,
}: {
  question: Question | PublicQuestion;
  passages?: Passage[];
  value: Response | null;
  onChange: (r: Response) => void;
  disabled?: boolean;
  reveal?: Question;
  audioOnce?: boolean;
  audioAutoPlay?: boolean;
  onAudioEnded?: () => void;
  showTranscript?: boolean;
}) {
  const t = useCourseText();
  const readAloud = useReadAloud();
  const passage = question.passageId ? passages.find((p) => p.id === question.passageId) : undefined;

  return (
    <div className={passage ? "grid lg:grid-cols-2 gap-5 items-start" : "space-y-5"}>
      {passage && (
        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <PassageView passage={passage} compact />
        </div>
      )}
      <div className="space-y-5">
        {question.audio && (
          <AudioPlayer
            key={question.id}
            script={question.audio}
            once={audioOnce}
            autoPlay={audioAutoPlay}
            onEnded={onAudioEnded}
            allowTranscript={showTranscript}
          />
        )}
        {question.hots && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider bg-[var(--color-accent-coral)]/15 text-[var(--color-accent-coral)] font-[var(--font-inter)]">
            {t.hots}
          </span>
        )}
        {question.image && (
          <div className="flex justify-center rounded-[var(--radius-card)] bg-[var(--color-accent-yellow)]/10 border-2 border-dashed border-[var(--color-accent-yellow)]/60 p-3">
            <Picture name={question.image} className="h-28 md:h-32 w-auto max-w-full" />
          </div>
        )}
        {question.prompt && (
          <div className="flex items-start gap-2 text-base md:text-lg font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
            {readAloud && <ReadAloudButton text={question.prompt} label={t.readAloud} />}
            <div className="flex-1 min-w-0"><Md text={question.prompt} /></div>
          </div>
        )}
        <QuestionInput key={question.id} question={question} value={value} onChange={onChange} disabled={disabled} reveal={reveal} />
      </div>
    </div>
  );
}
