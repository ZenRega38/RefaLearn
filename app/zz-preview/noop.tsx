"use client";
// TEMPORARY. Not committed.
import { useState } from "react";
import type { Question, Response } from "@/lib/course/types";
import { QuestionBlock } from "@/components/course/QuestionBlock";

export function NoopQuestion({ question }: { question: Question }) {
  const [value, setValue] = useState<Response | null>(null);
  return <div className="rounded-xl border p-4 bg-white"><QuestionBlock question={question} value={value} onChange={setValue} /></div>;
}
