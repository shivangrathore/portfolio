import { type HeadingWithSubheadings } from "@/lib/heading-hierarchy";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Props = { headings: HeadingWithSubheadings[], isRoot?: boolean };

export function Group({ headings, isRoot = false }: Props) {
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
    <ol className={cn("text-gray-400", { "pl-4 mt-0": !isRoot })}>
      {headings.map((heading) => (
        <li key={heading.slug}>
          <a
            href={`#${heading.slug}`}
            className="toc"
            data-slug={heading.slug}
            onClick={(e) => {
              const active = document.querySelector(`.toc.active`);
              if (active) {
                active.classList.remove(`active`);
              }
              if (e.target) {
                (e.target as HTMLAnchorElement).classList.add(`active`);
              }
            }}
          >
            {heading.text}
          </a>
          {heading.subheadings && <Group headings={heading.subheadings} />}
        </li>
      ))}
    </ol>
  );
}
