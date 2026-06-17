import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/constants";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog")).filter((p) => !p.data.draft);
  const studies = (await getCollection("caseStudies")).filter((s) => !s.data.draft);

  const items = [
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/blog/${p.id}/`,
      categories: p.data.tags,
    })),
    ...studies.map((s) => ({
      title: s.data.title,
      description: s.data.description,
      pubDate: s.data.pubDate,
      link: `/case-studies/${s.id}/`,
      categories: s.data.tags,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? "https://shivangrathore.com",
    items,
  });
}
