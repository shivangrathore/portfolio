import type { Price, Region } from "@/lib/region";
export { usd, inr, priceIn } from "@/lib/region";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  /** Concrete deliverables, not skills. */
  includes: string[];
  /** The situation a client is in when this is the right call. */
  goodFit: string;
  timeline: string;
  /**
   * Floor price for the smallest honest version of this work, shown as
   * "From X" in whichever currency the visitor's region uses. A number on the
   * page filters out the buyers who were never going to pay before they reach
   * the calendar, which is worth more than the handful of enquiries it costs.
   */
  startingAt: Price;
  icon:
    | "server"
    | "shuffle"
    | "rocket"
    | "zap"
    | "search"
    | "layers"
    | "brain"
    | "gauge";
};

/**
 * Ordered deliberately. AI work and backend performance sit first because
 * they are what I want to be hired for and what the last two years of work
 * actually evidence. The build engagements follow, because someone shopping
 * for an MVP scrolls anyway.
 */
export const services: Service[] = [
  {
    slug: "ai-engineering",
    name: "AI engineering",
    tagline:
      "LLM features that survive contact with real documents, real users and a real bill at the end of the month.",
    includes: [
      "Document and invoice extraction: OCR tiered into LLM parsing, with structured output you can store rather than prose you have to re-parse",
      "Retrieval over your own data with pgvector, including the chunking and ranking work that decides whether answers are right",
      "Confidence thresholds and human review queues, so a low-certainty result is flagged for a person instead of silently written to the database",
      "Cost and latency control: model tiering, caching, batching, and a token budget you can see per feature",
      "Evaluation sets and regression checks, so a prompt or model change does not quietly break last month's accuracy",
    ],
    goodFit:
      "You have a manual process built on documents, tickets or messages, and you want a model doing the first pass without it inventing things nobody catches.",
    timeline: "3 to 10 weeks",
    startingAt: { usd: 3000, inr: 75000 },
    icon: "brain",
  },
  {
    slug: "backend-performance",
    name: "Backend performance and optimization",
    tagline:
      "The slow endpoints fixed at the query and the schema, not hidden behind another cache layer.",
    includes: [
      "Profiling against production-shaped data to find where the time actually goes, before anything is changed",
      "Query plans read endpoint by endpoint: indexes chosen from the plan, N+1s removed, hot paths rewritten",
      "Schema and migration fixes for the queries that cannot be made fast as the tables stand",
      "Connection pooling, caching and background work moved off the request path",
      "Before and after numbers per endpoint, written down, so the improvement is measured rather than claimed",
    ],
    goodFit:
      "Your product works but pages hang, the database is the bottleneck, and adding servers has stopped helping.",
    timeline: "1 to 4 weeks",
    startingAt: { usd: 1800, inr: 20000 },
    icon: "gauge",
  },
  {
    slug: "go-backend",
    name: "Go backend development",
    tagline:
      "APIs, auth and data models built to hold up once real traffic and real customers arrive.",
    includes: [
      "REST APIs in Go with Gin, sqlc and pgx",
      "Multi-tenant data models and role-based access control",
      "Authentication, sessions, 2FA and permission systems",
      "PostgreSQL schema design, migrations and query tuning",
    ],
    goodFit:
      "You have a product that works but the backend is becoming the thing that slows every release down.",
    timeline: "4 to 12 weeks",
    startingAt: { usd: 3500, inr: 100000 },
    icon: "server",
  },
  {
    slug: "idea-to-mvp",
    name: "Idea to MVP",
    tagline:
      "The smallest version that proves the idea, in front of real users in weeks rather than quarters.",
    includes: [
      "A scoping call that cuts the idea down to what actually has to ship first",
      "Next.js frontend, Go backend, deployed and running on your accounts",
      "Sign-up, payments and the one or two flows the product lives or dies on",
      "Analytics from day one so you can see what users actually do",
    ],
    goodFit:
      "You have an idea and a deadline, no product yet, and you need something real to put in front of users or investors.",
    timeline: "4 to 8 weeks",
    startingAt: { usd: 3500, inr: 110000 },
    icon: "rocket",
  },
  {
    slug: "mvp-build",
    name: "Full-stack product build",
    tagline:
      "The full version, once you know what you are building and the MVP is behind you.",
    includes: [
      "Next.js and TypeScript frontend, Go backend",
      "Payments, file uploads, email and third-party integrations",
      "Admin tooling so you can run the product without me",
      "Deployment, CI and handover documentation",
    ],
    goodFit:
      "You have validation or a written spec, and you need the real product built by one person who can own the whole stack.",
    timeline: "6 to 14 weeks",
    startingAt: { usd: 6500, inr: 200000 },
    icon: "layers",
  },
  {
    slug: "node-to-go",
    name: "Node to Go migration",
    tagline:
      "Move off a legacy Node service without stopping feature work or taking the product down.",
    includes: [
      "Audit of the existing service and a staged migration plan",
      "Endpoint-by-endpoint port with both stacks running side by side",
      "Data layer rebuilt on sqlc and pgx with typed queries",
      "Cutover plan and rollback path for each stage",
    ],
    goodFit:
      "Your Node backend has outgrown its structure and you want type safety and predictable performance without a rewrite that freezes the roadmap.",
    timeline: "6 to 16 weeks",
    startingAt: { usd: 5000, inr: 150000 },
    icon: "shuffle",
  },
  {
    slug: "realtime",
    name: "Real-time and event systems",
    tagline:
      "WebSockets, queues and background jobs that stay correct when things fail.",
    includes: [
      "WebSocket services with reconnect and presence handling",
      "RabbitMQ and Redis for queues, caching and pub/sub",
      "Transactional outbox so events never drift from your database",
      "Job scheduling, retries and dead-letter handling",
    ],
    goodFit:
      "You need live updates, notifications or integrations that cannot silently drop events.",
    timeline: "3 to 8 weeks",
    startingAt: { usd: 3000, inr: 75000 },
    icon: "zap",
  },
  {
    slug: "advisory",
    name: "Architecture review",
    tagline:
      "A short, focused engagement when you need a second opinion before committing.",
    includes: [
      "Review of the codebase, schema and infrastructure",
      "Written findings ranked by risk and effort",
      "Concrete recommendations with trade-offs spelled out",
      "A call to walk through it and answer questions",
    ],
    goodFit:
      "You are about to make a decision that is expensive to reverse and want it pressure-tested first.",
    timeline: "1 to 2 weeks",
    startingAt: { usd: 1000, inr: 15000 },
    icon: "search",
  },
];

/** Open-ended work, billed by the week. Kept here so the FAQ cannot drift. */
export const WEEKLY_RATE: Price = { usd: 900, inr: 30000 };

const bySlug = (slug: string) => services.find((s) => s.slug === slug)!;

/**
 * The three numbers on the rate card, derived rather than typed twice. The
 * review sits on its own row because it is far below the build floor and a
 * single "from" number that low misrepresents what a project costs.
 */
export const REVIEW_FROM = bySlug("advisory").startingAt;
export const PROJECT_FROM = services
  .filter((s) => s.slug !== "advisory")
  .reduce((low, s) => (s.startingAt.usd < low.usd ? s.startingAt : low), {
    usd: Infinity,
    inr: Infinity,
  } as Price);

export const process = [
  {
    step: "Call",
    detail:
      "20 minutes to understand the problem, the constraints and the deadline. No charge, no pitch.",
  },
  {
    step: "Proposal",
    detail:
      "A written scope with milestones, a fixed price or rate, and what is explicitly out of scope.",
  },
  {
    step: "Build",
    detail:
      "Work in short milestones with something running you can look at. Weekly update, direct access to me.",
  },
  {
    step: "Handover",
    detail:
      "Documented code, deployment you control, and a support window after launch.",
  },
];

/**
 * FAQs, some of which only make sense to one side of the world. A US buyer
 * needs the timezone answer and does not care about GST; an Indian buyer needs
 * the opposite. `region` marks the ones that are audience-specific, and the
 * page renders both sets with CSS showing only the matching one.
 */
export type Faq = { q: string; a: string; region?: Region };

export const faqs: Faq[] = [
  {
    q: "How do you charge?",
    a: "Fixed price per milestone for defined scope, or a weekly rate for open-ended work. You will know the number before anything starts, and it does not move unless the scope does. Payment runs 40 percent up front, 30 percent at the midpoint, 30 percent on handover.",
  },
  {
    q: "Why is the Indian rate card different from the international one?",
    a: "Because the two markets are not the same market. An Indian founder is comparing me against local studios; a US or UK client is comparing me against an agency at $150 an hour. Quoting one number would price me out of one side and undersell the other. Same engineer, same code, same process, priced against where the work is being bought.",
  },
  {
    q: "Do you work with Indian startups?",
    a: "Yes, and increasingly. Invoiced in INR by NEFT, IMPS or UPI. Full IST working hours instead of a shifted schedule, which in practice means you get same-day answers rather than next-morning ones. Same contract and the same handover.",
    region: "in",
  },
  {
    q: "You are in India. How does that work for a US client?",
    a: "I keep four hours of daily overlap with US Eastern, so you get a live window every working day rather than a 12-hour round trip on every question. Everything else runs async: Slack or email, a written update every week, and code you can pull and read whenever you like. Invoiced in USD, paid by bank transfer or Wise.",
    region: "intl",
  },
  {
    q: "What about UK and European clients?",
    a: "Easier than the US, not harder. IST gives four and a half hours of overlap with UK working hours and most of the European afternoon. The production backend I work on daily serves UK transport operators, so this is the schedule I already run.",
    region: "intl",
  },
  {
    q: "Can we start with something smaller?",
    a: "Yes. A one-week scoping sprint at the weekly rate gets you the spec, the database schema and a milestone plan with real numbers against it. If you decide not to continue, you keep all of it and owe nothing further. Most builds start this way.",
  },
  {
    q: "What is your availability?",
    a: "I work on contract and take one project at a time, so whoever I am working with gets my full attention rather than a slice of it. I can usually start within a week or two. Tell me your deadline and I will tell you straight whether I can meet it.",
  },
  {
    q: "Do you work with existing teams?",
    a: "Yes. I have worked as the backend engineer inside a product team and as the only developer on a project. Both work.",
  },
  {
    q: "Who owns the code?",
    a: "You do, in full, on final payment. It ships in your repository, on your infrastructure, with documentation.",
  },
  {
    q: "What if the project is not a fit?",
    a: "I will say so on the first call and point you somewhere better. It costs us both less than finding out six weeks in.",
  },
];
