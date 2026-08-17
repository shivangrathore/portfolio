import type { APIContext } from "astro";

/**
 * `@astrojs/sitemap` emits `sitemap-index.xml` + `sitemap-0.xml`, but
 * `/sitemap.xml` is the conventional URL people and tools reach for. This
 * serves a sitemap index pointing at the same chunk, so either URL works.
 *
 * Note: assumes a single chunk. The integration only splits past 45,000 URLs,
 * which this site is a long way from.
 */
export function GET(context: APIContext) {
  const chunk = new URL("sitemap-0.xml", context.site).href;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${chunk}</loc></sitemap>
</sitemapindex>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
