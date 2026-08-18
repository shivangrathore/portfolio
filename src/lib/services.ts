export type Service = {
  slug: string;
  name: string;
  tagline: string;
  /** Concrete deliverables, not skills. */
  includes: string[];
  /** The situation a client is in when this is the right call. */
  goodFit: string;
  timeline: string;
  icon: "server" | "shuffle" | "rocket" | "zap" | "search" | "layers";
};

export const services: Service[] = [
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
    icon: "layers",
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
    icon: "server",
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
    icon: "search",
  },
];

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

export const faqs = [
  {
    q: "How do you charge?",
    a: "Fixed price per milestone for defined scope, or a weekly rate for open-ended work. You will know the number before anything starts, and it does not move unless the scope does.",
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
