import { type HeadingWithSubheadings } from "@/lib/heading-hierarchy";
import { useEffect } from "react";

type Props = { headings: HeadingWithSubheadings[] };

export function Group({ headings }: Props) {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const active = document.querySelector(`.toc.active`);
            if (active) {
              active.classList.remove(`active`);
            }
            const nextActive = document.querySelector(`[data-slug="${id}"]`);
            if (nextActive) {
              nextActive.classList.add(`active`);
            }
          }
        });
      },
      { rootMargin: `-40% 0% -40% 0%`, threshold: 0.5 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        intersectionObserver.observe(element);
      }
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, [headings]);

  return (
    <ol className="ml-4 text-gray-400">
      {headings.map((heading) => (
        <li key={heading.slug}>
          <a
            href={`#${heading.slug}`}
            className="toc"
            data-slug={heading.slug}
          >
            {heading.text}
          </a>
          {heading.subheadings && <Group headings={heading.subheadings} />}
        </li>
      ))}
    </ol>
  );
}
