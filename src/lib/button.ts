import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/*
  v5 buttons.

  Square corners, not rounded. The whole page is built from horizontal rules
  and right angles and a rounded control in the middle of that reads as
  borrowed from a UI kit. Primary is solid vermilion and is the loudest thing
  on any page it appears on, which is the point: there is exactly one of them
  per screen.

  Secondary is deliberately not a bordered box. A bordered button next to a
  filled one makes the reader choose between two things that look equally like
  buttons, and the second choice is never the one worth a click. It is an
  underlined phrase instead, which is what the rest of the page uses for "go
  somewhere else".
*/
const base =
  "group/btn inline-flex items-center justify-center gap-2 text-sm tracking-tight transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent px-6 py-3.5 font-medium text-accent-fg hover:bg-fg hover:text-bg",
  secondary:
    "py-3.5 font-medium text-fg underline decoration-rule decoration-1 underline-offset-[6px] hover:decoration-accent hover:text-accent",
  ghost: "text-muted hover:text-accent",
};

/** Single source of truth for button styling, shared by Astro and React. */
export function buttonClass(variant: ButtonVariant = "secondary", className?: string) {
  return cn(base, variants[variant], className);
}
