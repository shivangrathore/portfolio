export type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  summary: string;
  stack?: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: "Full Stack Engineer",
    company: "Hauldrive",
    companyUrl: "https://hauldrive.com",
    period: "Jul 2025 — Present",
    location: "Remote",
    summary:
      "Building the v2 fleet-compliance platform on a Go (Gin, sqlc, pgx) backend and Next.js frontend, leading the migration off the legacy Node.js stack. Shipped multi-tenant RBAC with dual-persona auth and 2FA, DVLA/MOT integrations, and Redis/RabbitMQ/WebSocket infrastructure.",
    stack: ["Go", "Gin", "Next.js", "PostgreSQL", "Redis", "RabbitMQ"],
    current: true,
  },
  {
    role: "Independent Developer",
    company: "Self-directed",
    period: "Aug 2024 — Jun 2025",
    location: "Remote",
    summary:
      "Built and launched full-stack products and real-time multiplayer systems — a Monopoly-style game backed by dynamically managed Go game servers, a Discord game platform, a browser-based compiler, and a WebAssembly-targeting toy language.",
    stack: ["Go", "Next.js", "PostgreSQL", "Redis", "Docker", "WebSockets"],
  },
  {
    role: "Lead Developer",
    company: "Pokémon Discord Bot",
    companyUrl: "https://pokemonbot.com",
    period: "2020 — 2022",
    location: "Remote",
    summary:
      "Sole developer of a Pokémon collection Discord bot, owning the full codebase as effective tech lead. Built it in Python (discord.py) on a MongoDB/Redis microservice backend, with Rust-powered image processing for character cards, all containerized with Docker.",
    stack: ["Python", "MongoDB", "Redis", "Rust", "Docker"],
  },
];
