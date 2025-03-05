import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import MiniSearch from "minisearch";

export const GET: APIRoute = async () => {
  const miniSearch = new MiniSearch({
    fields: ["title", "description", "tags"],
    storeFields: ["title", "description"],
  });
  const blog = await getCollection("blog");
  const data = blog.map(p => {
    return {
      id: p.id,
      ...p.data,
      tags: Object.values(p.data.tags).map(t => t.id).join(" "),
    }
  });
  miniSearch.addAll(data);
  return new Response(JSON.stringify(miniSearch))
};
