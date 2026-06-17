export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  summary: string;
  stack?: string[];
  current?: boolean;
};

// DUMMY DATA — replace with your real history.
export const experience: Experience[] = [
  {
    role: "Backend Engineer",
    company: "Acme Systems",
    period: "2024 — Present",
    location: "Remote",
    summary:
      "Building high-throughput services in Go, owning the event pipeline and cutting p99 latency by 40% through caching and query work.",
    stack: ["Go", "PostgreSQL", "Redis", "Docker"],
    current: true,
  },
  {
    role: "Full-Stack Developer",
    company: "Nimbus Labs",
    period: "2023 — 2024",
    location: "Remote",
    summary:
      "Shipped customer-facing features end to end with Next.js and Node, and introduced CI/CD that took deploys from manual to push-to-ship.",
    stack: ["Next.js", "TypeScript", "Node.js", "AWS"],
  },
  {
    role: "Open-Source Contributor",
    company: "Independent",
    period: "2022 — 2023",
    location: "Remote",
    summary:
      "Built and maintained side projects across Rust and Go, contributing fixes upstream and writing about what I learned.",
    stack: ["Rust", "Go", "Linux"],
  },
];
