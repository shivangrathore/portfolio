export const SITE_TITLE = "Shivang Rathore";
export const SITE_DESCRIPTION =
  "Freelance full-stack engineer. I take founders from idea to MVP and build the Go and PostgreSQL backends that keep it standing as it grows.";
export const BASE_URL = "https://shivangrathore.com";

export const GITHUB_URL = "https://github.com/shivangrathore";
export const LINKEDIN_URL = "https://www.linkedin.com/in/shivangrathore";
export const X_URL = "https://x.com/wiper_dev";
export const X_HANDLE = "@wiper_dev";
export const MAIL_ADDRESS = "hello@shivangrathore.com";

export const GA_ID = "G-QJ71GZCPK6";

/**
 * Search engine ownership tokens. Both render a meta tag only once set, so an
 * empty string is safe to ship.
 *
 * Google: Search Console -> Add property (URL prefix, https://shivangrathore.com)
 *   -> HTML tag. Paste only the `content` value here, not the whole tag.
 * Bing: Webmaster Tools -> Add site -> HTML Meta Tag, or import from Google,
 *   which skips this entirely.
 */
export const GOOGLE_SITE_VERIFICATION = "";
export const BING_SITE_VERIFICATION = "";

/**
 * Cal.com booking link. Leave empty to fall the CTA back to the contact form
 * rather than render a dead button.
 */
export const BOOKING_URL = "https://cal.com/shivangrathore/20min";
/** Kept next to the link so the copy and the actual slot cannot drift apart. */
export const BOOKING_LENGTH = "20-minute";

/** Shown under every CTA. Keep it true, and update it when it stops being true. */
export const AVAILABILITY = "Available now · one project at a time";

// Contact form -> Google Forms
export const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfm_NLUn-uZMUNX4afVfP1O4V5RkD2HlTFfkpN_axfRbn9PKA/formResponse";
export const CONTACT_FORM_FIELDS = {
  name: "entry.880464617",
  email: "entry.954503115",
  subject: "entry.1862102079",
  message: "entry.1927721418",
  // Optional on the site, so they must stay optional on the Google Form too.
  // A required question that arrives empty makes Google reject the whole
  // submission, and the no-cors post cannot see the rejection: the visitor
  // reads "Sent" and the lead is gone.
  projectType: "entry.1003593163",
  budget: "entry.2134409229",
  timeline: "entry.1019092497",
} as const;

export const NAV_ITEMS = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;
