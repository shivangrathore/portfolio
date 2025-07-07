import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Github from "@/assets/icons/github.svg";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my projects including web applications, system tools, and open-source contributions.",
};

export default function Projects() {
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
          <div className="md:columns-2 break-inside-avoid space-y-4">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.title}
                className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={project.github} aria-label="View on GitHub">
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                      {project.demo && (
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={project.demo} aria-label="View live demo">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {project.date}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card
                key={project.title}
                className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={project.github} aria-label="View on GitHub">
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                      {project.demo && (
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={project.demo} aria-label="View live demo">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {project.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

const featuredProjects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce solution with user authentication, payment processing, and admin dashboard.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    github: "https://github.com/shivangrathore",
    demo: "https://example.com",
    date: "2024",
    features: [
      "User authentication and authorization",
      "Stripe payment integration",
      "Product catalog with search and filtering",
      "Admin dashboard for inventory management",
      "Responsive design with dark mode",
    ],
  },
  {
    title: "System Monitor",
    description:
      "A cross-platform system monitoring application built with Rust and Tauri, providing real-time system metrics.",
    technologies: [
      "Rust",
      "Tauri",
      "React",
      "TypeScript",
      "Chart.js",
      "SQLite",
    ],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2024",
    features: [
      "Real-time CPU, memory, and disk usage monitoring",
      "Process management and system information",
      "Historical data visualization",
      "Cross-platform compatibility (Windows, Linux, macOS)",
      "Low resource usage and high performance",
    ],
  },
  {
    title: "Go Microservice API",
    description:
      "A high-performance REST API microservice built with Go, featuring clean architecture and comprehensive testing.",
    technologies: ["Go", "Gin", "PostgreSQL", "Redis", "Docker", "JWT"],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2024",
    features: [
      "RESTful API with OpenAPI documentation",
      "JWT-based authentication",
      "Redis caching for improved performance",
      "Docker containerization",
      "Comprehensive test coverage",
    ],
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team collaboration features.",
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express",
      "Tailwind CSS",
    ],
    github: "https://github.com/shivangrathore",
    demo: "https://example.com",
    date: "2023",
    features: [
      "Real-time collaboration with Socket.io",
      "Drag-and-drop task management",
      "Team member assignment and notifications",
      "Project timeline and progress tracking",
      "Mobile-responsive design",
    ],
  },
];

const otherProjects = [
  {
    title: "Weather CLI Tool",
    description:
      "A command-line weather application written in Rust with location-based forecasts.",
    technologies: ["Rust", "Clap", "Tokio", "Serde"],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2024",
  },
  {
    title: "Portfolio Website",
    description:
      "This very website! Built with Next.js, TypeScript, and Tailwind CSS.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    github: "https://github.com/shivangrathore",
    demo: "https://shivangrathore.dev",
    date: "2024",
  },
  {
    title: "Linux Dotfiles",
    description:
      "My personal Linux configuration files and setup scripts for a productive development environment.",
    technologies: ["Bash", "Vim", "Tmux", "Zsh"],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2023",
  },
  {
    title: "URL Shortener",
    description:
      "A simple URL shortening service with analytics and custom short codes.",
    technologies: ["Go", "PostgreSQL", "HTML", "CSS"],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2023",
  },
  {
    title: "Chat Application",
    description: "Real-time chat application with rooms and message history.",
    technologies: ["Node.js", "Socket.io", "Express", "MongoDB"],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2023",
  },
  {
    title: "File Organizer Script",
    description:
      "A Python script to automatically organize files in directories based on type and date.",
    technologies: ["Python", "OS", "Pathlib"],
    github: "https://github.com/shivangrathore",
    demo: null,
    date: "2023",
  },
];
