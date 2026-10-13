import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Lessons, quizzes and exams need a login; the course outline (/learn/<course>) stays crawlable.
      disallow: ["/admin", "/dashboard", "/api", "/auth", "/reset-password", "/live", "/learn/*/lesson/", "/learn/*/quiz/", "/learn/*/exam/"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
