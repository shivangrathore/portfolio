import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  })
})

const tags = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "content/tags" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    icon: image(),
  })
})


export const collections = { projects, tags }
