import {
  BASE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  GITHUB_URL,
  LINKEDIN_URL,
  MAIL_ADDRESS,
} from "./constants";

/**
 * Absolute URL with a trailing slash, so schema URLs match the canonical tag
 * and the sitemap entry for the same page exactly.
 */
export const abs = (path: string) => {
  const url = new URL(path, BASE_URL);
  if (!url.pathname.endsWith("/") && !url.pathname.includes("."))
    url.pathname += "/";
  return url.href;
};

const PERSON_ID = `${BASE_URL}/#person`;
const SITE_ID = `${BASE_URL}/#website`;

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_TITLE,
  url: `${BASE_URL}/`,
  jobTitle: "Full-stack Engineer",
  description: SITE_DESCRIPTION,
  email: `mailto:${MAIL_ADDRESS}`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: [
    "Go",
    "PostgreSQL",
    "TypeScript",
    "Next.js",
    "React",
    "Backend architecture",
    "Real-time systems",
    "Multi-tenant SaaS",
  ],
  // Tells search engines this person sells services, not just writes about code.
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Freelance software engineering",
      serviceType: "Go backend and full-stack product development",
    },
  },
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${BASE_URL}/`,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

/**
 * Trail should not include the home crumb; it is prepended here.
 */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function article(opts: {
  type: "BlogPosting" | "Article";
  path: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags?: string[];
  image?: string;
}) {
  return {
    "@type": opts.type,
    "@id": `${abs(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": SITE_ID },
    mainEntityOfPage: abs(opts.path),
    inLanguage: "en",
    ...(opts.tags?.length ? { keywords: opts.tags.join(", ") } : {}),
    ...(opts.image ? { image: abs(opts.image) } : {}),
  };
}

/**
 * Wraps the nodes a page declares into a single @graph document, with the
 * Person and WebSite nodes always present so @id references resolve.
 */
export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [person, website, ...nodes],
  };
}
