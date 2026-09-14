// @ts-check
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { remarkReadingTime } from "./plugins/remark-reading-time.mjs";

// Last-modified dates for content pages, read straight from the frontmatter so
// the sitemap reports when a post actually changed rather than when it built.
function contentLastmod() {
  const map = {};
  for (const [dir, base] of [
    ["src/content/blog", "/blog"],
    ["src/content/case-studies", "/case-studies"],
  ]) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue;
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const date =
        raw.match(/^updatedDate:\s*["']?([\d-]+)/m)?.[1] ??
        raw.match(/^pubDate:\s*["']?([\d-]+)/m)?.[1];
      if (date) map[`${base}/${file.replace(/\.mdx?$/, "")}/`] = date;
    }
  }
  return map;
}

const LASTMOD = contentLastmod();

// Sections crawlers should revisit most often, and how important each is
// relative to the rest of the site.
const PRIORITY = [
  [/^\/$/, 1.0, "weekly"],
  [/^\/(services|contact)\/$/, 0.9, "monthly"],
  // Buyer-intent landing pages: the entry points for search, so they rank
  // alongside /services rather than below the blog.
  [/^\/hire\/.+/, 0.9, "monthly"],
  [/^\/hire\/$/, 0.8, "monthly"],
  [/^\/(work|blog|case-studies)\/$/, 0.9, "weekly"],
  [/^\/about\/$/, 0.7, "monthly"],
  [/^\/(blog|case-studies)\/.+/, 0.8, "monthly"],
];

// https://astro.build/config
export default defineConfig({
  site: "https://shivangrathore.com",
  // Canonicals and the sitemap have always emitted a trailing slash, while
  // every internal href omitted one, so every link on the site and every
  // crawl hop paid a 301. Declaring it here makes the dev server behave like
  // production, so the mismatch cannot come back silently.
  trailingSlash: "always",
  /*
    Retired posts.

    infinite-scroll-react-js was a 523-word React tutorial from 2024. It was
    the most-visited page on the site and the least useful: it brought
    developers looking for a snippet, none of whom were ever going to hire
    anyone, and its thinness dragged on the quality signal for everything
    else. Deleting it outright would strand whatever links point at it, so it
    redirects to the index instead.

    Astro emits these as meta-refresh pages on a static host, which Google
    follows and treats as a permanent redirect. Good enough for a page whose
    traffic is being deliberately given up.
  */
  redirects: {
    "/blog/infinite-scroll-react-js/": "/blog/",
  },
  build: {
    // One stylesheet, ~7KB over the wire, needed before anything paints.
    // Inlining it trades a little repeat-visit caching for one fewer round
    // trip on the first view, which is the view that decides whether someone
    // on mobile data stays.
    inlineStylesheets: "always",
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const rule = PRIORITY.find(([re]) => re.test(pathname));
        if (rule) {
          item.priority = rule[1];
          item.changefreq = rule[2];
        }
        const lastmod = LASTMOD[pathname];
        if (lastmod) item.lastmod = new Date(lastmod).toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: "tokyo-night",
      wrap: false,
    },
  },
});
