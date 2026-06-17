import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent font-medium text-accent-fg hover:opacity-90",
  secondary: "border border-border text-muted hover:border-accent/50 hover:text-fg",
  ghost: "text-muted hover:text-fg",
};

/** Single source of truth for button styling, shared by Astro and React. */
export function buttonClass(variant: ButtonVariant = "secondary", className?: string) {
  return cn(base, variants[variant], className);
}
