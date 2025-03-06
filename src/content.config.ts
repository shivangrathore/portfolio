import { glob, file } from "astro/loaders"
import { defineCollection, reference, z } from "astro:content"
import { parse as parseToml } from "@iarna/toml"

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "content/projects" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(reference("tags")),
    image: image(),
    sourceUrl: z.string().optional(),
    liveUrl: z.string().optional(),
  })
})

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(reference("tags")),
    image: image(),
  })
})

const tags = defineCollection({
  loader: file("content/tags.toml", {
    parser: (text) => {
      const p = parseToml(text) as Record<string, any>;
      const data: Record<string, any> = [];
      Object.keys(p).forEach(key => {
        data.push({
          id: key,
          ...p[key]
        })
      })
      return data;
    }
  }),
  schema: z.object(
    {
      text: z.string(),
      className: z.string(),
      icon: z.string()
    }
  )
})

export const collections = { projects, tags, blog }
