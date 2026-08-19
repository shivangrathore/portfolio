import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

/*
  v4 buttons are rectangular and tight. The rest of the page is built from
  hairlines and right angles, and a pill-shaped button in the middle of that
  reads as borrowed from another site.
*/
const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium tracking-tight transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border text-fg hover:border-accent hover:text-accent",
  ghost: "px-0 text-muted hover:text-accent",
};

/** Single source of truth for button styling, shared by Astro and React. */
export function buttonClass(variant: ButtonVariant = "secondary", className?: string) {
  return cn(base, variants[variant], className);
}
