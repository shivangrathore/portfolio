/**
 * Buyer-intent landing pages.
 *
 * `/services` describes everything I do, which is the right page for someone
 * already on the site and the wrong page for someone typing "hire a go
 * developer" into Google. These are the entry points for that search: one
 * page per thing a client is actually shopping for, each with its own proof,
 * its own objections and its own FAQ. Same person, same work, narrower answer.
 *
 * Rule for anything added here: it has to be a real offer with real evidence
 * behind it. Three honest pages beat thirty keyword variants.
 */
export type Landing = {
  slug: string;
  /** Shows in the pill above the h1, and on the generated OG card. */
  eyebrow: string;
  /** The h1. Written for a person, close to what they searched. */
  heading: string;
  /** <title>, minus the site name the layout appends. */
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** What the engagement actually delivers. */
  offer: { name: string; detail: string }[];
  /** Proof, with numbers where numbers exist. */
  proof: { name: string; detail: string; href?: string }[];
  fit: { good: string[]; bad: string[] };
  faqs: { q: string; a: string }[];
  /** Where to send someone who wants more depth. */
  related: { label: string; href: string }[];
  /** Stack line under the footer of the OG card. */
  stack: string;
};

export const landings: Landing[] = [
  {
    slug: "ai-engineer",
    eyebrow: "AI engineering",
    heading: "Hire a freelance AI engineer who ships to production",
    metaTitle: "Hire a Freelance AI Engineer",
    metaDescription:
      "Freelance AI engineer for document extraction, RAG over your own data and LLM features that hold up under real load. Go, Python and PostgreSQL. Rates in USD or INR.",
    intro:
      "Most LLM demos work on the happy path and fall apart on the third real document. I build the unglamorous half: the extraction that survives a bad scan, the retrieval that returns the right chunk, the confidence threshold that sends an uncertain answer to a person, and the cost ceiling that stops a feature quietly becoming your largest bill.",
    offer: [
      {
        name: "Document and invoice extraction",
        detail:
          "OCR tiered into LLM parsing so the cheap path handles the clean scans and the expensive one only runs when it has to. Structured output you can write straight to a table, not prose you have to re-parse.",
      },
      {
        name: "Retrieval over your own data",
        detail:
          "pgvector in the database you already run rather than a second system to operate. The work that decides whether answers are right is the chunking, the metadata filters and the ranking, and that is where the time goes.",
      },
      {
        name: "Wrong answers caught before a user sees them",
        detail:
          "Confidence thresholds, validation against what is already in your database, and a review queue for anything below the line. A model that flags is worth more than a model that guesses well.",
      },
      {
        name: "Cost and latency you can predict",
        detail:
          "Model tiering, prompt caching, batching, and per-feature token accounting so the finance question has an answer before it is asked.",
      },
      {
        name: "Evaluation that catches regressions",
        detail:
          "A labelled set from your real data and a check that runs on change, so swapping a model or editing a prompt does not silently undo last month's accuracy.",
      },
    ],
    proof: [
      {
        name: "AI invoice ingestion, running in production",
        detail:
          "Parts and labour invoices for a UK fleet platform: tiered OCR into LLM extraction, supplier and part alias resolution against existing records, and anti-fraud checks that flag a suspect line for review rather than blocking the invoice. Live with paying operators, not a pilot.",
        href: "/about",
      },
      {
        name: "Retrieval over a production Postgres",
        detail:
          "Vector search built on pgvector inside the same database the application already uses, so retrieval respects the tenancy and permission rules rather than sitting outside them in a separate index nobody audits.",
      },
      {
        name: "The infrastructure an AI feature actually needs",
        detail:
          "Queues, retries, dead-letter handling, object storage and a WebSocket hub, because an extraction pipeline is a background job system with a model in the middle. That part is the same work it has always been.",
        href: "/hire/go-developer",
      },
    ],
    fit: {
      good: [
        "You have a manual process over documents, tickets or messages and want a model doing the first pass with a person reviewing the uncertain ones",
        "You have a working prototype and need it to hold up on real data, real volume and a real budget",
        "You want retrieval over your own data without standing up a second database to keep in sync",
      ],
      bad: [
        "You want a model fine-tuned or trained from scratch, which is a different job and not mine",
        "You want a chatbot bolted to a marketing site with no data behind it",
        "The success criterion is that it uses AI, rather than that a specific process gets faster or cheaper",
      ],
    },
    faqs: [
      {
        q: "Which models do you build on?",
        a: "Whichever fits the task and the budget, usually a tiered setup where a small fast model handles most calls and a larger one is reserved for the cases that need it. The application is written so the model is a swappable dependency, because the one that is best today will not be in six months.",
      },
      {
        q: "How do you stop it making things up?",
        a: "Constrain the output shape, ground it in retrieved or existing records, validate the result against your database, and score confidence. Anything below the threshold goes to a review queue instead of being written. The goal is not a model that is never wrong, it is a system where being wrong is visible.",
      },
      {
        q: "What does it cost to run?",
        a: "That is a design input, not an afterthought. I size it during scoping with real volumes and build the tiering, caching and batching around the number. You get per-feature token accounting so you can see where spend actually goes.",
      },
      {
        q: "Do you work with Indian startups on this?",
        a: "Yes, on an INR rate card rather than a converted dollar one. Same engineer and the same process, priced against the market you are buying in, with full IST overlap instead of a shifted schedule.",
      },
    ],
    related: [
      { label: "Full service list and pricing", href: "/services" },
      { label: "Backend performance work", href: "/hire/backend-optimization" },
      { label: "Hire me for Go backend work", href: "/hire/go-developer" },
    ],
    stack: "Go · Python · pgvector · PostgreSQL",
  },
  {
    slug: "backend-optimization",
    eyebrow: "Backend performance",
    heading: "Backend performance engineer for slow APIs and databases",
    metaTitle: "Hire a Backend Performance Engineer",
    metaDescription:
      "Freelance backend performance engineer. Slow PostgreSQL queries, N+1s and hot endpoints fixed at the query and the schema, with before and after numbers per endpoint.",
    intro:
      "Slow backends are rarely slow because the language is slow. They are slow because a query has no index it can use, because one endpoint makes forty round trips, or because work that belongs in a job queue is happening while a user waits. I find which one it is with a profiler and a query plan, then fix it there rather than putting a cache in front of the symptom.",
    offer: [
      {
        name: "Measurement before anything changes",
        detail:
          "Profiling against production-shaped data, with the slow endpoints ranked by total time rather than worst case. Optimising the wrong thing is the most common way this work gets wasted.",
      },
      {
        name: "Query plans, read one by one",
        detail:
          "EXPLAIN ANALYZE on the queries that matter, indexes chosen from what the planner actually does, and the sequential scans that only showed up once the table passed a million rows.",
      },
      {
        name: "N+1s and round trips removed",
        detail:
          "The loop issuing a query per row, the serialiser lazily loading a relation, the endpoint calling three services in sequence that could have gone in parallel.",
      },
      {
        name: "Schema and migration work where the query cannot be saved",
        detail:
          "Sometimes the query is fine and the table is wrong. Denormalisation with a clear owner, partitioning, or a computed column, migrated in order on a live database.",
      },
      {
        name: "Work moved off the request path",
        detail:
          "PDF generation, email, third-party calls and anything else a user should not be waiting on, moved into queues with retries and dead-letter handling.",
      },
      {
        name: "Before and after, written down",
        detail:
          "Per endpoint, p50 and p95, measured the same way both times. You get numbers you can check rather than an assurance that it feels faster.",
      },
    ],
    proof: [
      {
        name: "570 endpoints on one Postgres, in production",
        detail:
          "A multi-tenant fleet platform serving three front-ends and a mobile API from one database, with a schema per domain and around 120 migrations. Keeping that fast is the daily job, not a one-off engagement.",
        href: "/about",
      },
      {
        name: "Rebuilt rather than cached over",
        detail:
          "Both generations of that backend: the original Go service, then the rewrite into domain-separated Go with sqlc-generated queries, which is what made the tenancy enforceable in the data layer instead of remembered in every query.",
      },
      {
        name: "Written up in public",
        detail:
          "Schema design, computed status, tenant isolation and the timezone bug that skipped a month of invoices, documented with the reasoning intact so you can judge how I work before hiring me.",
        href: "/blog",
      },
    ],
    fit: {
      good: [
        "Pages hang, the database is pinned, and adding instances has stopped helping",
        "You have an endpoint or a report that everyone has quietly agreed to stop using because it takes 30 seconds",
        "You are about to add a caching layer and want someone to check whether the query can just be made fast",
      ],
      bad: [
        "You want a rewrite in a faster language before anyone has measured where the time goes",
        "You need Kubernetes tuning, SRE on-call or cluster capacity planning, which is not what I do",
        "Nobody can give me access to production-shaped data or a realistic staging environment",
      ],
    },
    faqs: [
      {
        q: "How long does this take?",
        a: "One to four weeks for most. The first few days are measurement, and by the end of that I can tell you what is fixable, what it will cost and roughly what it buys. If the answer is that your backend is already fine, you get that in writing and we stop.",
      },
      {
        q: "Do you need production access?",
        a: "Not necessarily production itself, but I need production-shaped data. Query plans on a 500-row development database are fiction. A restored anonymised dump is usually enough.",
      },
      {
        q: "Is this only for Go backends?",
        a: "No. The Postgres half is the same work whatever calls it, and I have done it against Node and Python services. If the answer turns out to be a staged move to Go I will say so, with a reason, rather than assuming it.",
      },
      {
        q: "What if the fix is bigger than the budget?",
        a: "You get the findings ranked by cost against benefit and you decide what to do with them. Plenty of engagements end with two indexes shipped and a written plan for the rest, which is a fine outcome.",
      },
    ],
    related: [
      { label: "Full service list and pricing", href: "/services" },
      { label: "Hire me for Go backend work", href: "/hire/go-developer" },
      { label: "AI engineering", href: "/hire/ai-engineer" },
    ],
    stack: "Go · PostgreSQL · Redis",
  },
  {
    slug: "go-developer",
    eyebrow: "Go backend development",
    heading: "Hire a freelance Go developer",
    metaTitle: "Hire a Freelance Go Developer",
    metaDescription:
      "Freelance Go developer for APIs, multi-tenant SaaS backends and PostgreSQL schema work. Gin, sqlc and pgx in production today. Fixed scope, code you own.",
    intro:
      "I build Go services that carry real products: multi-tenant data models, permission systems, billing, and the integrations that cannot silently fail. Not a first Go project on your budget. The backend I work on daily runs in production for UK transport operators.",
    offer: [
      {
        name: "APIs in Go you can hand to a frontend team",
        detail:
          "Gin, sqlc and pgx, typed end to end, with the request and error shapes consistent enough that nobody has to read the handler to know what comes back.",
      },
      {
        name: "Multi-tenant data models that hold",
        detail:
          "Schema per domain in PostgreSQL, tenancy enforced in the data layer rather than remembered in every query, and permissions carried in the token so a missing check is a compile problem rather than a leak.",
      },
      {
        name: "Auth that covers the boring cases",
        detail:
          "Email OTP or password login, refresh token rotation, TOTP 2FA, trusted devices, sessions you can revoke, and roles that map to what people in the business actually do.",
      },
      {
        name: "Postgres work, not just Postgres usage",
        detail:
          "Schema design, migrations that run in order on a live database, indexes chosen from query plans, and the slow endpoints fixed at the query rather than behind a cache.",
      },
      {
        name: "The infrastructure around it",
        detail:
          "Redis, RabbitMQ, WebSocket hubs, background jobs with retries and dead-letter handling, S3 uploads, transactional email and PDF generation.",
      },
    ],
    proof: [
      {
        name: "Fleet compliance platform, in production",
        detail:
          "Both generations of the backend: the original Go service, then the rewrite into domain-separated Go with a schema per domain. Around 570 endpoints and 120 migrations, serving three front-ends and a driver mobile API from one codebase and one database. Four operators, 80+ vehicles, 60+ drivers.",
        href: "/about",
      },
      {
        name: "A billing engine, built rather than bought",
        detail:
          "Per-vehicle pricing with base fee in advance and usage in arrears, mid-cycle proration through a ledger, BACS mandates, versioned trial policies and dunning. Stripe underneath, but the pricing rules live in the database where they can be audited.",
      },
      {
        name: "Permissions written up in public",
        detail:
          "The JWT and permission work is documented in a three-part series, so you can read how I think about it before paying me to do it.",
        href: "/blog",
      },
    ],
    fit: {
      good: [
        "You have a product working in another language and the backend is now what slows every release down",
        "You are starting a SaaS backend and want the tenancy and permission model right before there are customers in it",
        "You need one person who can own schema, API and deployment rather than three who own a third each",
      ],
      bad: [
        "You want a Go rewrite of something that works fine, because the rewrite is the fun part",
        "You need Kubernetes platform engineering or SRE on-call, which is not what I do",
        "You want someone to add endpoints to a design you have already fixed and do not want questioned",
      ],
    },
    faqs: [
      {
        q: "Which Go stack do you use?",
        a: "Gin for HTTP, sqlc and pgx for the data layer, PostgreSQL underneath. Redis and RabbitMQ where queues or caching earn their place. I will use what your team already runs if you have made that call, as long as it is not actively fighting you.",
      },
      {
        q: "Can you work inside our existing Go codebase?",
        a: "Yes. That is most of the work. I read the code and the schema first, tell you what I found, and then work in the style already there rather than reformatting the repository around my preferences.",
      },
      {
        q: "Do you do the frontend too?",
        a: "Yes, Next.js and TypeScript. Plenty of clients hire me for the backend and keep their own frontend team. Both arrangements work, and the API is better when the person building it has to consume it.",
      },
      {
        q: "How do we start?",
        a: "Send me the problem, the deadline and roughly the budget. You get a reply within 24 hours with an honest read on fit, a rough timeline and a price range. If it is not a fit I will say so on the first call.",
      },
    ],
    related: [
      { label: "Full service list and pricing", href: "/services" },
      { label: "Backend performance work", href: "/hire/backend-optimization" },
      { label: "AI engineering", href: "/hire/ai-engineer" },
    ],
    stack: "Go · Gin · sqlc · PostgreSQL",
  },
  {
    slug: "mvp-developer",
    eyebrow: "Idea to MVP",
    heading: "MVP developer for startups",
    metaTitle: "MVP Developer for Startups",
    metaDescription:
      "Freelance developer who builds startup MVPs end to end in 4 to 8 weeks. Next.js and Go, deployed on your accounts, built so version two is not a rewrite.",
    intro:
      "You have an idea, a deadline, and no product. I build the smallest version that proves the idea and put it in front of real users, on a backend that does not have to be thrown away the month it works.",
    offer: [
      {
        name: "A scoping call that cuts the idea down",
        detail:
          "Most first specs contain three products. We find the one flow the idea lives or dies on and build that first. This conversation is free and usually saves more money than anything else in the project.",
      },
      {
        name: "Something real in 4 to 8 weeks",
        detail:
          "Next.js frontend, Go backend, running on your accounts and your domain, not a demo on my laptop. Sign-up, payments and the core flow working end to end.",
      },
      {
        name: "Milestones you can see",
        detail:
          "Short milestones with something running you can click at the end of each, a weekly update, and direct access to me rather than an account manager.",
      },
      {
        name: "Analytics from day one",
        detail:
          "Wired up before launch, so the decision about what to build next comes from what users did rather than what the loudest person in the room thinks.",
      },
      {
        name: "Foundations that survive the pivot",
        detail:
          "Tenancy, auth and the data model done properly even in the MVP. It is the cheap part now and the expensive part later, and it is why version two is usually an extension rather than a rewrite.",
      },
    ],
    proof: [
      {
        name: "Finalist, an esports tournament platform",
        detail:
          "Built end to end and used by real organizers running real events: brackets, match reporting, and results flowing back to the community where players already are.",
        href: "/case-studies",
      },
      {
        name: "A Discord game that reached scale",
        detail:
          "Sole developer of a Pokémon collection bot players moved to after Pokécord shut down: 132,000 Discord servers and over a million registered players, with PvP duels, trading, a market and an auction house. Shipped fast, then held up under load.",
        href: "/about",
      },
      {
        name: "A production SaaS, after the MVP stage",
        detail:
          "I currently build the backend for a fleet compliance platform in production with UK operators. That is what the far side of a successful MVP looks like, and it is why I build the foundations the way I do.",
        href: "/about",
      },
    ],
    fit: {
      good: [
        "You need something in front of users or investors on a date that is already fixed",
        "You are non-technical, or technical but out of time, and want one person accountable for shipping",
        "You would rather cut scope than cut quality on the parts that are expensive to redo",
      ],
      bad: [
        "You want a fixed quote for a 40-page specification without a scoping conversation first",
        "You need a mobile app in Swift or Kotlin, which I do not build",
        "You want the cheapest possible build and plan to rebuild it properly later anyway",
      ],
    },
    faqs: [
      {
        q: "How long does an MVP take?",
        a: "Four to eight weeks for most, depending on how many flows survive scoping. I will tell you on the first call whether your deadline is real, and I would rather lose the project than agree to a date I cannot hit.",
      },
      {
        q: "What does it cost?",
        a: "Fixed price per milestone once the scope is written down, so you know the number before anything starts and it only moves if the scope does. Send me the idea and the budget and I will tell you straight whether they meet.",
      },
      {
        q: "Who owns the code and the accounts?",
        a: "You do, in full, on final payment. It ships in your repository, deployed on your accounts, with documentation. Nothing important runs on a login only I have.",
      },
      {
        q: "What happens after launch?",
        a: "Most clients continue into a build phase for the full product. If you would rather take it in-house, the handover includes documented code and a walkthrough with whoever picks it up.",
      },
    ],
    related: [
      { label: "Full service list and pricing", href: "/services" },
      { label: "Products I have shipped", href: "/work" },
      { label: "AI engineering", href: "/hire/ai-engineer" },
    ],
    stack: "Next.js · Go · PostgreSQL",
  },
  {
    slug: "nextjs-developer",
    eyebrow: "Full-stack product build",
    heading: "Hire a Next.js developer who also builds the backend",
    metaTitle: "Hire a Next.js Developer With a Real Backend",
    metaDescription:
      "Freelance Next.js and TypeScript developer who owns the API and database too. Go or Node backends, PostgreSQL, Stripe, deployed and documented.",
    intro:
      "Most Next.js work stalls at the same place: the interface is done and the API behind it cannot do what the interface promised. I build both sides, so the contract between them is a decision rather than an argument.",
    offer: [
      {
        name: "Next.js and TypeScript frontend",
        detail:
          "App Router, server components where they help, TanStack Query for the client state that actually needs it, and Tailwind. Typed against the API rather than against hope.",
      },
      {
        name: "The API behind it",
        detail:
          "Go when the domain is complicated or throughput matters, Node and TypeScript when sharing types across the monorepo matters more. I will tell you which one your project is, and why.",
      },
      {
        name: "The integrations that eat weeks",
        detail:
          "Stripe payments and billing, OAuth, file uploads to S3, transactional email, PDF generation, Twilio SMS, and third-party APIs wrapped so their outages do not become yours.",
      },
      {
        name: "Admin tooling so you can run it",
        detail:
          "The internal screens that stop every refund, correction and support question from turning into a database query and a message to me.",
      },
      {
        name: "Deployment, CI and handover",
        detail:
          "Pipelines, environments and documentation, on infrastructure you control. Vercel where it fits, containers where it does not.",
      },
    ],
    proof: [
      {
        name: "A Next.js monorepo over one Go backend",
        detail:
          "Three front-ends and a driver mobile API served from a single codebase and database: fleet, workshop and platform admin, with per-product personas bound at login and permissions carried in the token.",
        href: "/about",
      },
      {
        name: "Realtime that stays correct",
        detail:
          "A WebSocket hub for live job updates, with a transactional outbox so the events the frontend receives never drift from what is in the database.",
      },
      {
        name: "Commerce and payments",
        detail:
          "Stripe billing built on the raw API rather than Stripe Subscriptions, because the pricing rules needed to be auditable, plus an e-commerce build front to back.",
        href: "/work",
      },
    ],
    fit: {
      good: [
        "Your frontend is blocked on an API nobody owns",
        "You want one person accountable for the whole feature rather than a handoff in the middle of it",
        "You are adding payments, permissions or realtime to an existing Next.js app",
      ],
      bad: [
        "You want pixel work against a Figma file with no backend involved, which other people do better and cheaper",
        "You need a marketing site or a WordPress theme",
        "The API is fixed, owned elsewhere, and the answer to every question about it is no",
      ],
    },
    faqs: [
      {
        q: "Go or Node for the backend?",
        a: "Go when the domain has real rules, the schema is large, or throughput and predictable latency matter. Node when the product is mostly CRUD and sharing types across a monorepo saves more time than Go's guarantees are worth. Either way I write down the reason.",
      },
      {
        q: "Can you take over an existing Next.js project?",
        a: "Yes. I start by reading the code and telling you what I found, including the parts that are fine. You get an honest picture before anyone commits to a plan.",
      },
      {
        q: "Do you work with our designer or design team?",
        a: "Yes. I build from designs when they exist and design plainly when they do not, which is enough for internal tooling and admin screens but not a substitute for a designer on a consumer product.",
      },
      {
        q: "Can you migrate our Node backend to Go?",
        a: "Yes, endpoint by endpoint with both stacks running side by side and a rollback path at every stage, rather than a rewrite that freezes the roadmap for a quarter. That is the migration I have actually run.",
      },
    ],
    related: [
      { label: "Full service list and pricing", href: "/services" },
      { label: "Projects I have built", href: "/work" },
      { label: "Hire me for Go backend work", href: "/hire/go-developer" },
    ],
    stack: "Next.js · TypeScript · Go",
  },
];

export const landingBySlug = (slug: string) =>
  landings.find((l) => l.slug === slug);
