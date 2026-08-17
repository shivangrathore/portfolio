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
  [/^\/(work|blog|case-studies)\/$/, 0.9, "weekly"],
  [/^\/about\/$/, 0.7, "monthly"],
  [/^\/(blog|case-studies)\/.+/, 0.8, "monthly"],
];

// https://astro.build/config
export default defineConfig({
  site: "https://shivangrathore.com",
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
