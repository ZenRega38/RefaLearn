// Goes in: components/ui/FeaturedNewsCard.tsx
import Link from "next/link";

type PostCardProps = {
    type: "post";
    title: string;
    slug: string;
    category?: string | null;
    imageUrl: string;
};

type QuoteCardProps = {
    type: "quote";
    quote: string;
    imageUrl: string;
};

type FeaturedNewsCardProps = PostCardProps | QuoteCardProps;

/**
 * Full-bleed image card: photo fills the whole card, a dark gradient sits
 * over the bottom third, and the title (or, for an empty slot, a rotating
 * quote) sits in white text on top of that gradient. Deliberately not the
 * "half photo / half text box" card used elsewhere — this one asked for
 * something closer to a magazine/editorial tile.
 *
 * cover_image_url is free-text the admin pastes in (no domain allowlist),
 * so this uses a plain <img> rather than next/image — same choice already
 * made for CredentialBadge and the /news pages themselves.
 */
export function FeaturedNewsCard(props: FeaturedNewsCardProps) {
    const card = (
        <div className="relative aspect-[3/4] rounded-[var(--radius-card)] overflow-hidden border-2 border-[var(--color-line)] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={props.imageUrl}
                alt={props.type === "post" ? props.title : "Kutipan motivasi"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
                {props.type === "post" ? (
                    <>
                        {props.category && (
                            <span className="inline-block text-[10px] uppercase tracking-wide font-bold text-white/90 bg-white/15 backdrop-blur-sm px-2 py-0.5 rounded-full mb-2 font-[var(--font-inter)]">
                                {props.category}
                            </span>
                        )}
                        <p className="text-white font-bold font-[var(--font-inter)] leading-snug line-clamp-3">
                            {props.title}
                        </p>
                    </>
                ) : (
                    <p className="text-white/90 italic font-[var(--font-inter)] text-sm leading-snug">
                        &ldquo;{props.quote}&rdquo;
                    </p>
                )}
            </div>
        </div>
    );

    if (props.type === "post") {
        return (
            <Link href={`/news/${props.slug}`} className="block">
                {card}
            </Link>
        );
    }

    // Placeholder slots aren't clickable — there's nothing behind them yet.
    return <div className="cursor-default">{card}</div>;
}