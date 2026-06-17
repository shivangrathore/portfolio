# shivangrathore.com

Personal portfolio built with [Astro](https://astro.build). Minimalist
dark design, single green accent. Content-driven: projects, case studies,
and a blog.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

| Command         | Action                                |
| --------------- | ------------------------------------- |
| `pnpm dev`      | Start the dev server                  |
| `pnpm build`    | Build the static site to `dist/`      |
| `pnpm preview`  | Preview the production build locally  |

## Content

All content lives in `src/content/`:

- **`projects/*.yml`** — short project cards shown under `/work`. Set
  `caseStudy: "<slug>"` to link a project to its full write-up.
- **`case-studies/*.mdx`** — long-form write-ups under `/case-studies`.
  Supports `role`, `timeline`, `stack`, `github`, `demo`, `tags`.
- **`blog/*.mdx`** — articles under `/blog`.

MDX/Markdown gets a generated reading time, a table of contents (from `h2`/`h3`),
and Shiki code highlighting (`tokyo-night`). Set `draft: true` to hide an entry
from production (drafts are still visible in `pnpm dev`).

Schemas are defined in `src/content.config.ts`.

## Architecture

- **Layouts** — `src/layouts/Base.astro` (shell), `Post.astro` (blog +
  case-study article template with TOC).
- **Components** — `src/components/` (Nav, Footer, ProjectCard, icons). The
  contact form is the only React island (`ContactForm.tsx`, posts to Google
  Forms).
- **Styling** — Tailwind v4 via `@tailwindcss/vite`; design tokens and prose
  styles in `src/styles/global.css`.
- **SEO** — sitemap (`@astrojs/sitemap`), `rss.xml`, `robots.txt`, OpenGraph
  tags in `BaseHead.astro`.

## Deploy

Static output. The `Dockerfile` builds the site and serves `dist/` with nginx
on port `3000` (wired to Traefik in `compose.yml`).

```bash
docker compose up --build
```
