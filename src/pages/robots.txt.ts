import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const sitemap = new URL("sitemap-index.xml", context.site).href;
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
