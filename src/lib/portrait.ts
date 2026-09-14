import type { ImageMetadata } from "astro";

/**
 * Optional portrait.
 *
 * Drop a file at `src/assets/portrait.jpg` (or .jpeg/.png/.webp/.avif) and
 * every slot that reserves room for a photo starts rendering it: the
 * homepage hero rail, the about page and the contact page. No import to add,
 * no flag to flip. Remove the file and the layouts close up again.
 *
 * The glob is eager so the resolved metadata (width, height, format) is
 * available at build time, which is what `astro:assets` needs to emit the
 * optimised variants. Zero matches is a valid result, not an error.
 */
const matches = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/portrait.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

export const portrait: ImageMetadata | null =
  Object.values(matches)[0]?.default ?? null;

export const hasPortrait = portrait !== null;

/** Describes the person, not the file: this is read out by screen readers. */
export const PORTRAIT_ALT = "Shivang Rathore";
