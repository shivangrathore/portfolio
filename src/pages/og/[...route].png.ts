import type { APIRoute } from "astro";
import { ogCards, renderOgCard, type OgCard } from "@/lib/og";

export async function getStaticPaths() {
  const cards = await ogCards();
  return cards.map((card) => ({
    params: { route: card.route },
    props: { card },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgCard(props.card as OgCard);
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
