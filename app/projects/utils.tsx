import { readdir, readFile } from "fs/promises";
import z from "zod";
import { parse } from "yaml";

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  featured: z.boolean().optional(),
  technologies: z.array(z.string()),
  features: z.array(z.string()),
  github: z.string().url().optional(),
  demo: z.string().url().optional(),
  order: z.number().default(0),
  status: z.enum(["completed", "early", "beta"]).default("completed"),
});

export type Project = z.infer<typeof ProjectSchema>;

export async function getProjects() {
  const projects: Project[] = [];
  let dirs;
  try {
    dirs = await readdir("content/projects");
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return projects;
  }
  for (const dir of dirs) {
    const filePath = `content/projects/${dir}`;
    let fileContent;
    try {
      fileContent = await readFile(filePath);
      if (!fileContent) continue;
    } catch (error) {
      console.error(`Error importing project ${dir}:`, error);
      continue;
    }
    const yaml = parse(fileContent.toString());
    const project = await ProjectSchema.parseAsync(yaml);
    projects.push(project);
  }
  return projects.sort((a, b) => b.order - a.order);
}
