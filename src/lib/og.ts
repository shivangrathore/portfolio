/**
 * Per-page Open Graph cards, rendered at build time.
 *
 * Every page used to share one static `/og.png`, so four different posts
 * pasted into LinkedIn looked like the same link. These generate a card per
 * page carrying its own title, which is the difference between a link that
 * gets clicked and one that looks like a repost.
 *
 * satori draws the layout as SVG, resvg rasterises it. Both run only during
 * the build: nothing here ships to the browser.
 */
import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import { landings } from "./landings";

// Hex equivalents of the dark oklch values in global.css. satori has no oklch
// support, so these are converted once here and must be updated together.
//
// The card is always dark, whichever theme the visitor is using: a share card
// is pasted onto someone else's timeline, not onto this site, and the dark
// version is the one that holds up as a thumbnail on both.
const COLOR = {
  bg: "#1a1a1e",
  surface: "#212126",
  border: "#4a4b52",
  fg: "#f7f7f7",
  muted: "#a4a5ad",
  faint: "#87888f",
  accent: "#4dc074",
};

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");
const fonts = [
  {
    name: "Geist",
    data: fs.readFileSync(path.join(FONT_DIR, "Geist-Regular.ttf")),
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Geist",
    data: fs.readFileSync(path.join(FONT_DIR, "Geist-SemiBold.ttf")),
    weight: 600 as const,
    style: "normal" as const,
  },
];

export type OgCard = {
  /** Path without leading or trailing slashes, e.g. `blog/refresh-tokens`. */
  route: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Bottom-right line. Defaults to the core stack. */
  stack?: string;
};

/** satori draws no ellipsis of its own, so long text is cut before layout. */
function clamp(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max - 1)).trimEnd() + "...";
}

/**
 * satori takes React elements, but plain objects of the same shape work and
 * keep this file out of the JSX pipeline entirely.
 */
const el = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

function card(data: OgCard) {
  return el(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: COLOR.bg,
      padding: "72px",
      fontFamily: "Geist",
    },
    [
      // Accent rule along the top, the one piece of brand at thumbnail size.
      el("div", {
        position: "absolute",
        top: 0,
        left: 0,
        width: 1200,
        height: 10,
        backgroundColor: COLOR.accent,
      }),
      // Eyebrow
      el("div", { display: "flex", alignItems: "center", gap: 14 }, [
        el("div", {
          width: 14,
          height: 14,
          borderRadius: 999,
          backgroundColor: COLOR.accent,
        }),
        el(
          "div",
          {
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: COLOR.accent,
          },
          clamp(data.eyebrow, 40),
        ),
      ]),
      // Title and subtitle, centred in the space between eyebrow and footer so
      // a short title does not leave a hole halfway down the card.
      el(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          paddingBottom: 24,
        },
        [
          el(
            "div",
            {
              fontSize: data.title.length > 55 ? 58 : 68,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.12,
              color: COLOR.fg,
            },
            clamp(data.title, 95),
          ),
          el(
            "div",
            {
              marginTop: 26,
              fontSize: 28,
              lineHeight: 1.45,
              color: COLOR.muted,
            },
            clamp(data.subtitle, 155),
          ),
        ],
      ),
      // Footer
      el(
        "div",
        {
          display: "flex",
          paddingTop: 32,
          borderTop: `2px solid ${COLOR.border}`,
          alignItems: "center",
          justifyContent: "space-between",
        },
        [
          el(
            "div",
            { fontSize: 26, fontWeight: 600, color: COLOR.fg },
            "shivangrathore.com",
          ),
          el(
            "div",
            { fontSize: 24, color: COLOR.faint },
            data.stack ?? "Go · PostgreSQL · Next.js",
          ),
        ],
      ),
    ],
  );
}

export async function renderOgCard(data: OgCard): Promise<Buffer> {
  const svg = await satori(card(data) as never, {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    background: COLOR.bg,
  })
    .render()
    .asPng();
  return Buffer.from(png);
}

/** Pages with no collection entry behind them. */
const STATIC_CARDS: OgCard[] = [
  {
    route: "services",
    eyebrow: "Services",
    title: "What I can build for you",
    subtitle:
      "MVP builds, Go backends, Node to Go migrations and real-time systems. Scoped projects, fixed milestones, code you own at the end.",
  },
  {
    route: "hire",
    eyebrow: "Hire me",
    title: "Three ways people bring me in",
    subtitle:
      "What each engagement includes, where I have done it before, and when I am the wrong person for it.",
  },
  {
    route: "work",
    eyebrow: "Work",
    title: "Products and systems built end to end",
    subtitle:
      "A live esports tournament platform, a multi-tenant fleet compliance backend, and the smaller builds behind them.",
  },
  {
    route: "case-studies",
    eyebrow: "Case studies",
    title: "The problem, the approach, the trade-offs",
    subtitle:
      "Longer write-ups of what I built, what it had to survive, and the decisions I would defend in a review.",
  },
  {
    route: "blog",
    eyebrow: "Blog",
    title: "Notes on backends that have to hold up",
    subtitle:
      "Auth, permissions, multi-tenancy and systems work, written from things that shipped rather than things I read about.",
  },
  {
    route: "about",
    eyebrow: "About",
    title: "Shivang Rathore",
    subtitle:
      "Freelance full-stack engineer. Go and PostgreSQL for the parts that have to be correct, Next.js for the parts people touch.",
  },
  {
    route: "contact",
    eyebrow: "Start a project",
    title: "Tell me what you are building",
    subtitle:
      "The problem, the deadline and roughly the budget. Reply within 24 hours, and an honest answer on whether I am the right person.",
  },
];

let cached: OgCard[] | undefined;

/** Every route that has a generated card. Memoised: the build asks often. */
export async function ogCards(): Promise<OgCard[]> {
  if (cached) return cached;

  const live = <T extends { data: { draft: boolean } }>(items: T[]) =>
    import.meta.env.DEV ? items : items.filter((i) => !i.data.draft);

  const posts = live(await getCollection("blog")).map((post) => ({
    route: `blog/${post.id}`,
    eyebrow: "Blog",
    title: post.data.title,
    subtitle: post.data.description,
    stack: post.data.tags.slice(0, 3).join(" · ") || undefined,
  }));

  const studies = live(await getCollection("caseStudies")).map((study) => ({
    route: `case-studies/${study.id}`,
    eyebrow: "Case study",
    title: study.data.title,
    subtitle: study.data.description,
    stack: study.data.stack.slice(0, 3).join(" · ") || undefined,
  }));

  const hire = landings.map((landing) => ({
    route: `hire/${landing.slug}`,
    eyebrow: landing.eyebrow,
    title: landing.heading,
    subtitle: landing.metaDescription,
    stack: landing.stack,
  }));

  cached = [...STATIC_CARDS, ...hire, ...posts, ...studies];
  return cached;
}

/**
 * The card for a page, or undefined when it has none and should fall back to
 * the static `/og.png` (the homepage and 404).
 */
export async function ogImageFor(pathname: string): Promise<string | undefined> {
  const route = pathname.replace(/^\/+|\/+$/g, "");
  if (!route) return undefined;
  const cards = await ogCards();
  return cards.some((c) => c.route === route) ? `/og/${route}.png` : undefined;
}
