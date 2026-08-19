/**
 * The numbers, in one place.
 *
 * The homepage previously asked a founder to take "backends that don't buckle"
 * on faith until they reached the work section. These are the same claims with
 * evidence attached, and every one of them traces to something already
 * described in `experience.ts` or a project entry. Nothing rounded up.
 *
 * Rule for anything added here: a number you would be comfortable being asked
 * about on a call.
 */
export type ProofPoint = {
  /** Kept short. It renders at display size. */
  value: string;
  /** What the number counts. */
  label: string;
  /** Which piece of work it came from. */
  source: string;
};

export const proof: ProofPoint[] = [
  {
    value: "1M+",
    label: "registered players on a game I built and ran alone",
    source: "Pokémon Discord bot",
  },
  {
    value: "132k",
    label: "Discord servers it reached after Pokécord shut down",
    source: "Pokémon Discord bot",
  },
  {
    value: "570",
    label: "endpoints serving three products from one Go backend",
    source: "Hauldrive",
  },
  {
    value: "4",
    label: "UK fleet operators running it in production today",
    source: "Hauldrive",
  },
];
