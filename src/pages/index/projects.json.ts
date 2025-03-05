import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import MiniSearch from "minisearch";

export const GET: APIRoute = async () => {
  const miniSearch = new MiniSearch({
    fields: ["title"],
    storeFields: ["title", "description", "pubDate", "image", "tags"],
  });
  const projects = await getCollection("projects");
  const data = projects.map(p => {
    return {
      id: p.id,
      ...p.data
    }
  });
  miniSearch.addAll(data);
  return new Response(JSON.stringify(miniSearch))
};
