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
      "Leading the rewrite of a multi-tenant fleet compliance and maintenance platform for UK transport operators, off the legacy Node.js stack and onto Go (Gin, sqlc, pgx) with a Next.js monorepo. The backend is now around 570 endpoints and 120 migrations across schema-separated domains, serving three front-ends (fleet, workshop, platform admin) plus the driver mobile API from one codebase, one database and one login.",
    highlights: [
      "Shipped a second product (workshop) on the same backend: per-product personas bound at login, permissions carried in the JWT, and a handshake that links an independent workshop tenant to a fleet without merging their data.",
      "Built the billing engine on Stripe rather than Stripe Subscriptions: per-vehicle pricing, base fee in advance with usage in arrears, mid-cycle proration through a ledger, BACS mandates, versioned trial policies and dunning.",
      "Owned the compliance core: PMI and brake-test cycles, schedules that book a workshop over branded email, per-task document policies, driver walkaround defects into fault workflows, and DVLA vehicle enquiry plus MOT history sync.",
      "Added AI invoice ingestion for parts and labour, tiered OCR into LLM extraction with alias resolution and anti-fraud checks that flag rather than block.",
      "Infrastructure work throughout: Redis caching, RabbitMQ, a WebSocket hub for realtime job updates, S3 uploads, Gotenberg PDF generation, TOTP 2FA and an audited platform admin app.",
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
      "Sole developer of a Pokémon collection Discord bot, running the whole codebase as the de facto tech lead. Built in Python (discord.py) on a MongoDB and Redis microservice backend, with Rust handling the image processing for character cards, all containerized with Docker.",
    stack: ["Python", "MongoDB", "Redis", "Rust", "Docker"],
  },
];
