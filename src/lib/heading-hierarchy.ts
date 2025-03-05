export type Heading = {
  depth: number;
  slug: string;
  text: string;
}

export type HeadingWithSubheadings = Heading & {
  subheadings: HeadingWithSubheadings[];
}

export function buildHeadingHierarchy(headings: Heading[]) {
  const toc: HeadingWithSubheadings[] = [];
  const parentHeadings = new Map();

  if (!headings) {
    return toc;
  }
  headings.forEach((h) => {
    const heading: HeadingWithSubheadings = { ...h, subheadings: [] };
    if (heading.depth === 2) {
      toc.push(heading);
    }
    else {
      let searchDepth = heading.depth - 1;
      let parent = parentHeadings.get(searchDepth);
      while (!parent && searchDepth > 1) {
        searchDepth--;
        parent = parentHeadings.get(searchDepth);
      }
      if (parent) {
        parent.subheadings.push(heading);
      }
      else {
        toc.push(heading);
      }
    }
    parentHeadings.set(heading.depth, heading);
  });

  return toc;
}
