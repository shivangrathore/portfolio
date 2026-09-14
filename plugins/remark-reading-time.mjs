import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

/** Injects `minutesRead` into frontmatter for every md/mdx file. */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    const minutes = Math.max(1, Math.round(readingTime.minutes));
    data.astro.frontmatter.minutesRead = `${minutes} min read`;
  };
}
