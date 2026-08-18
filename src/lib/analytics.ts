/**
 * Thin wrapper over the `track` helper installed in BaseHead, for code that
 * runs inside an island rather than in the page shell. Safe to call before
 * gtag loads, or with analytics blocked: it does nothing and never throws.
 */
declare global {
  interface Window {
    track?: (name: string, params?: Record<string, unknown>) => void;
  }
}

export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.track?.(name, params);
}
