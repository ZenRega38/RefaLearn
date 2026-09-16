// Goes in: components/ui/CredentialBadge.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

interface CredentialBadgeProps {
    /** e.g. "IELTS 7.0" or "CEFR C1 (Advanced)" */
    label: string;
    /** Path to the certificate image, e.g. "/certificates/ielts.jpg" */
    imageSrc: string;
    /** Describes the certificate for screen readers / alt text */
    imageAlt: string;
    icon?: ReactNode;
}

/**
 * A pill badge that:
 *  - on hover (desktop/mouse only) shows a small chat-bubble-style preview
 *    of the certificate
 *  - on click always opens the certificate full-screen, on any device
 *
 * Touch devices don't reliably fire hover events on tap, so click is the
 * one behavior guaranteed to work everywhere — the hover bubble is a bonus
 * for mouse users, not the only way in.
 */
export function CredentialBadge({ label, imageSrc, imageAlt, icon }: CredentialBadgeProps) {
    const [showPreview, setShowPreview] = useState(false);
    const [showFullscreen, setShowFullscreen] = useState(false);

    // Lock page scroll while the fullscreen viewer is open, and let Escape
    // close it — both are things people expect from any image lightbox.
    useEffect(() => {
        if (!showFullscreen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setShowFullscreen(false);
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [showFullscreen]);

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
                onClick={() => {
                    setShowPreview(false);
                    setShowFullscreen(true);
                }}
                className="flex items-center gap-2 text-sm font-[var(--font-inter)] bg-white px-3 py-1.5 rounded-full border border-[var(--color-line)] shadow-sm hover:shadow-md hover:border-[var(--color-brand-blue)] transition-all cursor-pointer"
                aria-label={`Lihat sertifikat ${label}`}
            >
                {icon}
                <span>{label}</span>
            </button>

            {/* Hover preview bubble — small, chat-bubble style, mouse-only */}
            {showPreview && (
                <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-[90] pointer-events-none"
                    role="tooltip"
                >
                    <div className="bg-white rounded-[var(--radius-card)] border-2 border-[var(--color-line)] shadow-[var(--shadow-float)] p-2 w-48">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="w-full h-32 object-cover rounded-[calc(var(--radius-card)-4px)]"
                        />
                        <p className="text-center text-xs text-[var(--color-ink-soft)] mt-1.5 font-[var(--font-inter)]">
                            Klik untuk perbesar
                        </p>
                    </div>
                    {/* Chat-bubble tail */}
                    <div className="w-4 h-4 bg-white border-r-2 border-b-2 border-[var(--color-line)] rotate-45 mx-auto -mt-2.5" />
                </div>
            )}

            {/* Fullscreen viewer */}
            {showFullscreen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 sm:p-10"
                    onClick={() => setShowFullscreen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setShowFullscreen(false)}
                        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-full max-h-full object-contain rounded-[var(--radius-card)] shadow-2xl"
                    />
                </div>
            )}
        </div>
    );
}