"use client";

import { useEffect, useState } from "react";
import { Flame, LogIn, Zap, Trophy, Gift } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { nextMilestone, XP, XP_EVENT, type GamificationStats } from "@/lib/gamification";

const WEEKDAYS = ["S", "S", "R", "K", "J", "S", "M"];

/** Dashboard card: level, XP, study and login streaks, and the last four weeks. */
export function ProgressCard() {
  const [stats, setStats] = useState<GamificationStats | null>(null);

  useEffect(() => {
    const load = () =>
      fetch("/api/me/gamification", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => j?.stats && setStats(j.stats))
        .catch(() => {});
    load();
    window.addEventListener(XP_EVENT, load);
    return () => window.removeEventListener(XP_EVENT, load);
  }, []);

  if (!stats) return null;

  const { level, study, login } = stats;
  const milestone = nextMilestone(study.current);
  // Monday-first grid: pad the first week so columns line up with weekdays.
  const first = new Date(`${stats.recent[0].day}T00:00:00Z`).getUTCDay();
  const pad = (first + 6) % 7;

  return (
    <Card variant="sketch" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 shrink-0 rounded-full bg-[var(--color-brand-blue)] text-white flex flex-col items-center justify-center shadow-[var(--shadow-card)]">
            <span className="text-[0.6rem] uppercase tracking-wider opacity-80 font-[var(--font-inter)]">Level</span>
            <span className="text-2xl font-bold leading-none font-[var(--font-inter)]">{level.level}</span>
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="font-bold text-lg text-[var(--color-ink)] font-[var(--font-inter)] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[var(--color-accent-yellow)]" /> {stats.title}
            </p>
            <div className="h-3 rounded-full bg-[var(--color-paper-bg-alt)] overflow-hidden border border-[var(--color-line)]">
              <div className="h-full bg-[var(--color-accent-yellow)] transition-all duration-700" style={{ width: `${Math.round(level.progress * 100)}%` }} />
            </div>
            <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">
              {level.intoLevel} / {level.levelSize} XP · {level.toNext} XP lagi ke Level {level.level + 1}
            </p>
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
          <p className="text-3xl font-bold text-[var(--color-brand-blue)] font-[var(--font-inter)] flex items-center gap-1">
            <Zap className="w-6 h-6 fill-[var(--color-accent-yellow)] text-[var(--color-warning-amber)]" /> {stats.totalXp.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">total XP · +{stats.xpToday} hari ini</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className={`rounded-[var(--radius-card)] border-2 p-4 space-y-1 ${study.doneToday ? "border-[var(--color-accent-coral)] bg-[var(--color-accent-coral)]/5" : "border-[var(--color-line)]"}`}>
          <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5">
            <Flame className={`w-4 h-4 ${study.doneToday ? "text-[var(--color-accent-coral)] fill-[var(--color-accent-yellow)]" : ""}`} /> Streak belajar
          </p>
          <p className="text-3xl font-bold text-[var(--color-ink)] font-[var(--font-inter)]">
            {study.current} <span className="text-base font-medium text-[var(--color-ink-soft)]">hari</span>
          </p>
          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">Terbaik: {study.best} hari</p>
          <p className={`text-xs font-[var(--font-inter)] ${study.atRisk ? "text-[var(--color-danger-red)] font-semibold" : "text-[var(--color-ink-soft)]"}`}>
            {study.doneToday
              ? "Sudah belajar hari ini — mantap!"
              : study.atRisk
                ? "Baca atau kerjakan satu materi hari ini supaya streak tidak putus!"
                : "Baca atau kerjakan materi untuk memulai streak."}
          </p>
        </div>
        <div className={`rounded-[var(--radius-card)] border-2 p-4 space-y-1 ${login.doneToday ? "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5" : "border-[var(--color-line)]"}`}>
          <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)] flex items-center gap-1.5">
            <LogIn className="w-4 h-4 text-[var(--color-brand-blue)]" /> Streak login
          </p>
          <p className="text-3xl font-bold text-[var(--color-ink)] font-[var(--font-inter)]">
            {login.current} <span className="text-base font-medium text-[var(--color-ink-soft)]">hari</span>
          </p>
          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">Terbaik: {login.best} hari</p>
          <p className="text-xs text-[var(--color-ink-soft)] font-[var(--font-inter)]">Masuk setiap hari: +{XP.dailyLogin} XP</p>
        </div>
      </div>

      {milestone && (
        <p className="flex items-center gap-2 text-sm text-[var(--color-ink)] font-[var(--font-inter)] rounded-[var(--radius-card)] bg-[var(--color-accent-yellow)]/15 border border-[var(--color-accent-yellow)]/40 px-3 py-2">
          <Gift className="w-4 h-4 text-[var(--color-accent-coral)] shrink-0" />
          <span>
            {milestone.days - study.current} hari lagi menuju bonus <strong>+{milestone.xp} XP</strong> (streak belajar {milestone.days} hari).
          </span>
        </p>
      )}

      <div className="space-y-2">
        <p className="text-sm font-semibold text-[var(--color-ink-soft)] font-[var(--font-inter)]">4 minggu terakhir</p>
        <div className="grid grid-cols-7 gap-1.5 max-w-xs">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="text-[0.65rem] text-center text-[var(--color-ink-soft)] font-[var(--font-inter)]">{d}</span>
          ))}
          {Array.from({ length: pad }, (_, i) => <span key={`pad-${i}`} />)}
          {stats.recent.map((d) => (
            <span
              key={d.day}
              title={`${d.day}: ${d.studied ? "belajar" : d.loggedIn ? "login" : "tidak aktif"}${d.xp ? ` · +${d.xp} XP` : ""}`}
              className={`aspect-square rounded-md border ${d.day === stats.today ? "border-[var(--color-ink)] border-2" : "border-[var(--color-line)]"} ${
                d.studied ? "bg-[var(--color-accent-coral)]" : d.loggedIn ? "bg-[var(--color-brand-blue)]/30" : "bg-[var(--color-paper-bg-alt)]"
              }`}
            />
          ))}
        </div>
        <p className="flex flex-wrap gap-3 text-[0.7rem] text-[var(--color-ink-soft)] font-[var(--font-inter)]">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[var(--color-accent-coral)]" /> belajar</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[var(--color-brand-blue)]/30" /> login saja</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[var(--color-paper-bg-alt)] border border-[var(--color-line)]" /> tidak aktif</span>
        </p>
      </div>

      <details className="text-sm font-[var(--font-inter)] text-[var(--color-ink-soft)]">
        <summary className="cursor-pointer font-semibold text-[var(--color-ink)]">Cara mendapatkan XP</summary>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>Login harian: +{XP.dailyLogin} XP</li>
          <li>Membaca materi pertama kali: +{XP.lessonRead} XP</li>
          <li>Menyelesaikan materi (checkpoint): +{XP.lessonDone} XP</li>
          <li>Mengerjakan pretest: +{XP.pretest} XP</li>
          <li>Mengerjakan quiz: +{XP.quizDone} XP, lulus quiz: +{XP.quizPassed} XP lagi</li>
          <li>Menyelesaikan ujian (pretest/tryout penuh): +{XP.exam} XP</li>
          <li>Bonus streak belajar 3, 7, 14, 30, 60, dan 100 hari</li>
        </ul>
        <p className="mt-2">Setiap aksi hanya memberi XP sekali. Streak belajar dihitung dari hari kamu membaca atau mengerjakan materi.</p>
      </details>
    </Card>
  );
}
