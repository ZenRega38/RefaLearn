// Structured data (schema.org JSON-LD) shared by pages, so search engines
// connect Refa Learn, its founder and its content. Server-side only.

import { siteUrl } from "@/lib/site";

export const FOUNDER = {
  name: "Rega Rizkan Azizan",
  alternateName: ["Rega R. Azizan", "Rega Azizan"],
  jobTitle: "Founder & Lead Tutor",
  url: "https://zenrega.my.id/",
  sameAs: ["https://zenrega.my.id/"],
};

export function organizationLd() {
  const base = siteUrl();
  return {
    "@type": "EducationalOrganization",
    "@id": `${base}/#organization`,
    name: "Refa Learn",
    url: base,
    logo: `${base}/RefaLearn-Logo.png`,
    slogan: "Bridging Borders, Embracing The World!",
    areaServed: "ID",
    founder: { "@id": `${base}/#founder` },
  };
}

export function founderLd(description?: string) {
  const base = siteUrl();
  return {
    "@type": "Person",
    "@id": `${base}/#founder`,
    name: FOUNDER.name,
    alternateName: FOUNDER.alternateName,
    jobTitle: FOUNDER.jobTitle,
    url: FOUNDER.url,
    sameAs: FOUNDER.sameAs,
    worksFor: { "@id": `${base}/#organization` },
    ...(description ? { description } : {}),
  };
}

/** Site-wide graph: the organisation, its founder and the website. */
export function siteGraphLd() {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd(),
      founderLd(),
      { "@type": "WebSite", "@id": `${base}/#website`, name: "Refa Learn", url: base, inLanguage: "id", publisher: { "@id": `${base}/#organization` } },
    ],
  };
}

/** A course or material in the store, for search engines (works without JavaScript). */
export function courseLd(opts: { name: string; description: string; url: string; price?: number | null; image?: string | null }) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: ["en", "id"],
    provider: { "@type": "EducationalOrganization", "@id": `${base}/#organization`, name: "Refa Learn", sameAs: base },
    ...(opts.image ? { image: opts.image } : {}),
    ...(typeof opts.price === "number"
      ? {
          offers: {
            "@type": "Offer",
            category: opts.price === 0 ? "Free" : "Paid",
            price: opts.price,
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
            url: opts.url,
          },
        }
      : {}),
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "PT1H" },
  };
}

/** JSON for a <script type="application/ld+json">, safe to inline. */
export function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
