import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      name: "Shivang",
    }),
    { headers: { "content-type": "application/json" } },
  );
};
