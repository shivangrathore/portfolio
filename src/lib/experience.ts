export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  summary: string;
  /** A few concrete pieces of work, for roles where the summary can't carry it. */
  highlights?: string[];
  /** "Contract", "Freelance" and so on. Employment reads differently to a
      client than a year-long contract engagement does. */
  engagement?: string;
  /**
   * Slug of a case study in src/content/case-studies.
   *
   * When one exists the timeline links to it instead of unfolding the rest of
   * the highlights inline. Nine paragraphs behind a "6 more" toggle is a wall
   * of text either way; the write-up is where that depth belongs, and it is a
   * better page to land on than a longer list.
   */
  caseStudy?: string;
  stack?: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "Full Stack Engineer",
    company: "Hauldrive",
    companyUrl: "https://hauldrive.com",
    period: "Jul 2025 - Present",
    location: "Remote",
    engagement: "Contract",
    caseStudy: "hauldrive",
    summary:
      "Designed and built every generation of the backend behind a multi-tenant fleet compliance and maintenance platform for UK transport operators: the original Go service, the domain-separated rewrite, and the current split into five services behind one gateway. 600+ endpoints and 192 migrations today, serving three front-ends (fleet, workshop, platform admin) and the driver mobile API. In production with four operators running 80+ vehicles and 60+ drivers.",
    highlights: [
      "Owned the first backend end to end, schema upward: vehicles, drivers, operating centres and pools, walkaround checks and defects, work orders, maintenance templates, incidents, insurance, driver training and toolbox talks, holidays and audit logging, behind email OTP login with TOTP 2FA and trusted devices.",
      "Re-architected it into domain, app and ports layering with a schema per domain in Postgres and sqlc-generated queries. That separation is what later made the service split tractable rather than a rewrite.",
      "Split the result into identity, platform, fleet, workshop and tacho services plus an internal documents service, behind a Traefik gateway on one origin. Existing clients kept working: the old path prefixes are rewritten at the gateway rather than every service serving two contracts for a year.",
      "Moved authorization out of the token. Identity owns the account and issues every token with JWKS for verification, but the token carries no permission claim, because one baked into a JWT outlives its own revocation. Each product owns its own roles and a 133-key permission catalogue defined in Go, and resolves them from its own tables.",
      "Put the internal plane on gRPC rather than services calling each other's REST APIs: Protocol Buffers contracts for identity provisioning and terms, platform billing and documents, with generated clients in a shared module. Clients still get REST through the gateway, so the public contract never had to change.",
      "Built the cross-service consistency layer that stands in for foreign keys once the data is in separate databases: events over RabbitMQ with a transactional outbox on publish, an idempotent inbox on consume, and a nightly reconcile for what neither caught. Every internal call authenticates with a per-call Ed25519 JWT against pinned keys.",
      "Built the billing engine on Stripe primitives rather than Stripe Subscriptions: per-vehicle pricing, base fee in advance with usage in arrears, mid-cycle proration through a ledger, BACS mandates, versioned trial policies and dunning.",
      "Built and still own the compliance core: PMI and brake-test cycles, schedules that book a workshop over branded email, per-task document policies, driver walkaround defects into fault workflows, and DVLA vehicle enquiry plus MOT history sync.",
      "Added AI invoice ingestion for parts and labour (tiered OCR into LLM extraction, alias resolution, anti-fraud checks that flag rather than block) on top of the usual infrastructure work: Redis, RabbitMQ, a WebSocket hub for realtime job updates, S3-compatible object storage, Gotenberg PDFs and Twilio SMS.",
      "Kept a written decision log, 59 entries deep, including the decisions that were reversed and the reasoning that reversed them.",
    ],
    stack: [
      "Go",
      "gRPC",
      "PostgreSQL",
      "RabbitMQ",
      "Traefik",
      "Redis",
      "Next.js",
      "Stripe",
    ],
    current: true,
  },
  {
    role: "Independent Developer",
    company: "Self-directed",
    period: "Aug 2024 - Jun 2025",
    location: "Remote",
    summary:
      "Built and shipped full-stack products and real-time multiplayer systems. These included a Monopoly-style game backed by dynamically managed Go game servers, a Discord game platform, a browser-based compiler, and a small language that targets WebAssembly.",
    stack: ["Go", "Next.js", "PostgreSQL", "Redis", "Docker", "WebSockets"],
  },
  {
    role: "Lead Developer",
    company: "Pokémon Discord Bot",
    companyUrl: "https://pokemonbot.com",
    period: "2020 - 2022",
    location: "Remote",
    summary:
      "Sole developer of a Pokémon collection Discord bot that players moved to after Pokécord was shut down by its developer, reaching 132,000 Discord servers and over a million registered players. Built the whole game and its economy: PvP duels, player-to-player trading, a market and an auction house. Python (discord.py) on a MongoDB and Redis microservice backend, with Rust handling the image processing for character cards, all containerized with Docker.",
    stack: ["Python", "MongoDB", "Redis", "Rust", "Docker"],
  },
];
