"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ReviewList } from "@/components/course/ReviewList";
import { SkillIcon, SKILL_LABEL } from "@/components/course/skill";
import type { ExamResult, Passage, Skill } from "@/lib/course/types";
import { Trophy, Info } from "lucide-react";

const SECTION_MAX: Record<Skill, number> = { listening: 68, structure: 68, reading: 67 };

function band(score: number) {
  if (score >= 550) return "Mahir — memenuhi syarat banyak beasiswa & program pascasarjana";
  if (score >= 500) return "Menengah atas — memenuhi syarat umum S1/S2 dalam negeri";
  if (score >= 450) return "Menengah — fondasi sudah baik, perkuat Structure & Reading";
  if (score >= 400) return "Dasar — fokus pada pola soal yang paling sering muncul";
  return "Pemula — mulai dari Level 1 secara berurutan";
}

export function ExamResultView({
  result,
  sections,
  slug,
}: {
  result: ExamResult;
  sections: { skill: Skill; title: string; questionIds: string[]; passages: Passage[] }[];
  slug: string;
}) {
  const weakest = [...result.sections].sort((a, b) => a.correct / a.total - b.correct / b.total)[0];

  return (
    <div className="space-y-8">
      <Card variant="sketch" className="text-center space-y-3 py-8">
        <Trophy className="w-14 h-14 mx-auto text-[var(--color-accent-yellow)]" />
        <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] uppercase tracking-wider">
          Estimasi skor {result.kind === "pretest" ? "pretest" : "tryout"}
        </p>
        <p className="text-6xl font-bold font-[var(--font-inter)] text-[var(--color-brand-blue)]">{result.totalScore}</p>
        <p className="text-sm text-[var(--color-ink)] font-[var(--font-inter)]">{band(result.totalScore)}</p>
        {result.overtime && <p className="text-xs text-[var(--color-danger-red)] font-[var(--font-inter)]">Catatan: ujian dikumpulkan melewati batas waktu.</p>}
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {result.sections.map((s) => (
          <Card key={s.skill} className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              <SkillIcon skill={s.skill} /> {SKILL_LABEL[s.skill]}
            </p>
            <p className="text-3xl font-bold font-[var(--font-inter)] text-[var(--color-ink)]">
              {s.converted}<span className="text-base text-[var(--color-ink-soft)]">/{SECTION_MAX[s.skill]}</span>
            </p>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">{s.correct} dari {s.total} benar</p>
            <div className="h-2 rounded-full bg-[var(--color-paper-bg-alt)] overflow-hidden">
              <div className="h-full bg-[var(--color-brand-blue)]" style={{ width: `${(s.correct / s.total) * 100}%` }} />
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-[var(--radius-card)] bg-[var(--color-brand-blue)]/5 border border-[var(--color-brand-blue)]/20 text-sm font-[var(--font-inter)] text-[var(--color-ink)]">
        <Info className="w-5 h-5 text-[var(--color-brand-blue)] shrink-0 mt-0.5" />
        <p>
          Skor dihitung dengan tabel konversi umum TOEFL ITP (310–677), jadi merupakan <strong>estimasi</strong> — skor resmi ETS bisa sedikit berbeda.
          {weakest && <> Bagian yang paling perlu diperkuat: <strong>{SKILL_LABEL[weakest.skill]}</strong>.</>}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button href={`/learn/${slug}`}>Kembali ke Kursus</Button>
      </div>

      {sections.map((sec) => {
        const items = sec.questionIds.map((id) => result.review.find((r) => r.id === id)!).filter(Boolean);
        return (
          <div key={sec.skill} className="space-y-3">
            <h2 className="text-2xl flex items-center gap-2"><SkillIcon skill={sec.skill} className="w-6 h-6" /> Pembahasan {sec.title}</h2>
            <ReviewList items={items} passages={sec.passages} />
          </div>
        );
      })}
    </div>
  );
}
