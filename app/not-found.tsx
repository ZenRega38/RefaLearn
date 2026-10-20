import { PaperBackground } from "@/components/sketch/PaperBackground";
import { SketchBox } from "@/components/sketch/SketchBox";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PaperBackground>
      <div className="container-main min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
        <p className="font-[var(--font-kalam)] text-6xl text-[var(--color-line)] mb-4">404</p>
        <h1 className="text-3xl md:text-4xl mb-4">
          Page <SketchBox color="var(--color-accent-coral)">not found</SketchBox>
        </h1>
        <p className="text-[var(--color-ink-soft)] font-[var(--font-inter)] mb-8 max-w-md">
          The page you&apos;re looking for may have moved, or the link may be wrong.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/schedule" variant="secondary">See Schedule</Button>
        </div>
      </div>
    </PaperBackground>
  );
}
