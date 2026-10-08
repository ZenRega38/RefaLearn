"use client";

import type { Passage, PublicQuestion, Question, Response } from "@/lib/course/types";
import { AudioPlayer } from "@/components/course/AudioPlayer";
import { PassageView } from "@/components/course/PassageView";
import { QuestionInput } from "@/components/course/QuestionInput";
import { Md } from "@/components/course/Md";

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
        {question.prompt && (
          <div className="text-base md:text-lg font-semibold text-[var(--color-ink)] font-[var(--font-inter)]">
            <Md text={question.prompt} />
          </div>
        )}
        <QuestionInput key={question.id} question={question} value={value} onChange={onChange} disabled={disabled} reveal={reveal} />
      </div>
    </div>
  );
}
