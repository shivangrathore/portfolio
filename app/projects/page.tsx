import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProjects } from "./utils";
import ProjectsGrid from "./projects-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my projects including web applications, system tools, and open-source contributions.",
};

export default async function Projects() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my work spanning web development, system
            programming, and open-source contributions. Each project represents
            a learning journey and a step forward in my development career.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <ProjectsGrid projects={featuredProjects} />
        </div>

        {/* Other Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <ProjectsGrid projects={otherProjects} />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to working on interesting projects and learning from
            other developers. Feel free to reach out if you'd like to
            collaborate or have any questions about my work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://github.com/shivangrathore">
                View My GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
