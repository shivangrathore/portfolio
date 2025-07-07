import { readdir, readFile } from "fs/promises";
import { z } from "zod";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import path from "path";
import rehypeShiki from "@shikijs/rehype";

// TODO: Add hero image support and parsing, imports
const BlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  slug: z.string(),
  tags: z.array(z.string()).default(() => []),
  heroImage: z.string().optional(),
});

type Blog = z.infer<typeof BlogSchema>;

export async function getBlogs(): Promise<Blog[]> {
  const blogs: Blog[] = [];
  let dirs;
  try {
    dirs = await readdir("content/blog");
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return blogs;
  }

  for (const dir of dirs) {
    try {
      const filePath = `content/blog/${dir}/index.mdx`;
      let fileContent;
      try {
        fileContent = await readFile(filePath, "utf-8");
      } catch (error) {
        continue;
      }
      const { data } = matter(fileContent);
      const blog = await BlogSchema.parseAsync({
        ...data,
        slug: dir,
      });
      blogs.push(blog);
    } catch (error) {
      console.error(`Error processing blog ${dir}:`, error);
    }
  }
  return blogs;
}

export async function getBlog(slug: string) {
  const basePath = `content/blog/${slug}`;
  const filePath = path.join(basePath, "index.mdx");
  const fileContent = await readFile(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  const frontmatter = await BlogSchema.parseAsync({ ...data, slug });
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins: [[rehypeShiki, { theme: "tokyo-night" }]] },
    },
    components: {
      img: ({ src, ...props }) => (
        <img
          {...props}
          src={"/" + path.join(basePath, src)}
          className="aspect-auto w-fit mx-auto h-auto"
        />
      ),
    },
  });
  return {
    content: compiledContent,
    frontmatter: {
      ...frontmatter,
      slug,
    },
  };
}
