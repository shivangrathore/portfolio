export const SITE_TITLE = "Shivang Rathore";
// Kept to roughly 155 characters. Longer than that and Google rewrites the tail
// itself, usually with something less useful than the ask.
export const SITE_DESCRIPTION =
  "Full stack engineer in India: TypeScript, React and Next.js on Go, Python and PostgreSQL backends. Open to full-time remote roles.";
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

/**
 * Shown under every CTA. Keep it true, and update it when it stops being true.
 *
 * The site now leads with the job search; freelance work is the secondary path
 * (/services, /hire, /contact). The notice period is here because it is the
 * first thing a recruiter filters on, and the only one this line can answer.
 */
export const AVAILABILITY = "Open to full-time remote roles · 30 days' notice";

/** The resume every "Resume" button points at. Rebuilt from ~/Development/resume. */
export const RESUME_URL = "/resume.pdf";

/**
 * Web3Forms, the primary contact endpoint.
 *
 * This key is public by design. It ships in the client bundle the same way it
 * would in a plain HTML form, and it only authorises posting to this one
 * destination. Rotate it from the Web3Forms dashboard if it ever gets abused.
 *
 * The reason for moving here from Google Forms: a Google Forms POST has to be
 * sent with `mode: "no-cors"`, which makes the response unreadable, so a
 * rejected submission is indistinguishable from an accepted one and the visitor
 * is told "Sent" either way. Web3Forms answers with CORS headers and a JSON
 * body, so the form can finally tell the truth about whether it worked.
 */
export const WEB3FORMS_URL = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "77d8a466-2b2c-4bfe-b467-69747c60a6d5";

// Contact form -> Google Forms, kept as a mirror so the existing responses
// spreadsheet carries on filling. Fire and forget: it can never fail the
// submission, because Web3Forms is the one that decides what the visitor sees.
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

// Services moved to the footer's Freelance column: the masthead is for the
// visitor the site is now built for, a hiring manager.
export const NAV_ITEMS = [
  { name: "Work", href: "/work/" },
  { name: "Case studies", href: "/case-studies/" },
  { name: "Writing", href: "/blog/" },
  { name: "About", href: "/about/" },
] as const;
