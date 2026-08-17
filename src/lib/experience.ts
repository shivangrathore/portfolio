export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  summary: string;
  /** A few concrete pieces of work, for roles where the summary can't carry it. */
  highlights?: string[];
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
    summary:
      "Designed and built both generations of the backend behind a multi-tenant fleet compliance and maintenance platform for UK transport operators: the original Go service, then the current rewrite into domain-separated Go (Gin, sqlc, pgx) with a Next.js monorepo. Around 570 endpoints and 120 migrations today, serving three front-ends (fleet, workshop, platform admin) and the driver mobile API from one codebase, one database and one login. In production with four operators running 80+ vehicles and 60+ drivers.",
    highlights: [
      "Owned the first backend end to end, schema upward: vehicles, drivers, operating centres and pools, walkaround checks and defects, work orders, maintenance templates, incidents, insurance, driver training and toolbox talks, holidays and audit logging, behind email OTP login with TOTP 2FA and trusted devices.",
      "Re-architected it into the current platform: domain, app and ports layering with a schema per domain in Postgres and sqlc-generated queries. That separation is what let a second product share one database without the two fighting over tables.",
      "Shipped that second product (workshop) on the same backend: per-product personas bound at login, permissions carried in the JWT, and a handshake that links an independent workshop tenant to a fleet without merging their data.",
      "Built the billing engine on Stripe rather than Stripe Subscriptions: per-vehicle pricing, base fee in advance with usage in arrears, mid-cycle proration through a ledger, BACS mandates, versioned trial policies and dunning.",
      "Built and still own the compliance core: PMI and brake-test cycles, schedules that book a workshop over branded email, per-task document policies, driver walkaround defects into fault workflows, and DVLA vehicle enquiry plus MOT history sync.",
      "Added AI invoice ingestion for parts and labour (tiered OCR into LLM extraction, alias resolution, anti-fraud checks that flag rather than block) on top of the usual infrastructure work: Redis, RabbitMQ, a WebSocket hub for realtime job updates, S3 uploads, Gotenberg PDFs and Twilio SMS.",
    ],
    stack: [
      "Go",
      "Gin",
      "sqlc",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
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
      "Sole developer of a Pokémon collection Discord bot that reached 132,000 Discord servers and over a million registered players, running the whole codebase as the de facto tech lead. Built in Python (discord.py) on a MongoDB and Redis microservice backend, with Rust handling the image processing for character cards, all containerized with Docker.",
    stack: ["Python", "MongoDB", "Redis", "Rust", "Docker"],
  },
];
