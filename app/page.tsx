import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowRightIcon,
  Code,
  CodeIcon,
  Database,
  Download,
  ExternalLink,
  GitFork,
  Server,
  Star,
  Terminal,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import Github from "@/assets/icons/github.svg";
import { GITHUB_URL, MAIL_ADDRESS } from "@/data/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "./projects/utils";
import { toTitleCase } from "@/lib/utils";
import { getBlogs } from "./blog/utils";

const stats = [
  { label: "Projects", value: "15+" },
  { label: "Languages", value: "5+" },
  { label: "Years of Experience", value: "3" },
  { label: "Open Source Contributions", value: "4+" },
];

const skills = [
  { name: "Python", level: 100 },
  { name: "Go", level: 90 },
  { name: "Rust", level: 80 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 75 },
];

const techStack = [
  {
    name: "Frontend",
    description: "React, Next.js, TypeScript",
    icon: Code,
  },
  {
    name: "Backend",
    description: "Go, Rust, Node.js",
    icon: Server,
  },
  {
    name: "Database",
    description: "PostgreSQL, MongoDB, Redis",
    icon: Database,
  },
  {
    name: "Systems",
    description: "Linux, Docker, AWS",
    icon: Terminal,
  },
];

const latestPosts = [
  {
    title: "Building High-Performance APIs with Go",
    excerpt:
      "Learn how to create scalable and efficient REST APIs using Go's powerful standard library and best practices.",
    tags: ["Go", "Backend", "Performance"],
    date: "Jan 15, 2024",
    slug: "building-high-performance-apis-with-go",
    readTime: "8 min read",
  },
  {
    title: "Rust vs Go: A Developer's Perspective",
    excerpt:
      "Comparing two powerful languages for system programming and their use cases in modern development.",
    tags: ["Rust", "Go", "Comparison"],
    date: "Jan 10, 2024",
    slug: "rust-vs-go-developer-perspective",
    readTime: "12 min read",
  },
  {
    title: "Linux Command Line Productivity Tips",
    excerpt:
      "Essential command-line tools and techniques for boosting your productivity on Linux systems.",
    tags: ["Linux", "CLI", "Productivity"],
    date: "Jan 5, 2024",
    slug: "linux-command-line-productivity-tips",
    readTime: "6 min read",
  },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="inset-0 absolute bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <Badge
              className="px-4 py-2 text-sm font-medium glass"
              variant="outline"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for opportunities
            </Badge>
          </div>
          <h1 className="text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Hi, I'm <span className="gradient-text">Shivang Rathore</span>
          </h1>
          <p className="text-2xl max-w-4xl mx-auto text-muted-foreground mb-12">
            Software Engineer passionate about{" "}
            <span className="text-green-500">system-level programming</span>,
            clean code, and building performant web applications with{" "}
            <span className="text-sky-500 font-semibold">Go</span>,{" "}
            <span className="text-orange-400 font-semibold">Rust</span>, and
            modern web technologies.
          </p>
          <div className="flex justify-center gap-6 mb-16 flex-col md:flex-row">
            <Button className="group" size="lg" asChild>
              <Link href="/projects">
                <CodeIcon className="size-5 group-hover:rotate-12 transition-transform" />
                View My Work
                <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button className="group glass" size="lg" variant="outline" asChild>
              <Link href={`/contact`}>
                <UsersIcon className="mr-2 size-5 group-hover:scale-110 transition-transform" />
                Get in Touch
              </Link>
            </Button>
            <Button className="group" size="lg" variant="ghost" asChild>
              <Link href={GITHUB_URL}>
                <Github className="mr-2 size-5 group-hover:scale-110 transition-transform" />
                Github Profile
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-dots-pattern opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in">
            <Badge variant="secondary" className="mb-4">
              About Me
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Passionate Developer with interest in{" "}
              <span className="gradient-text">Backend Technologies</span>{" "}
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                I'm a passionate developer with 3-4 years in the field and 2+
                years as a Linux enthusiast. I specialize in building scalable
                web applications and have a deep interest in system-level
                programming with Go and Rust.
              </p>
              <p>
                I believe in writing clean, well-documented code and creating
                software that performs well and scales gracefully. My experience
                spans from frontend development to backend systems and
                infrastructure.
              </p>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.2}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <Button size="lg" className="btn-glow group" asChild>
                <Link href="/about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-glow glow group"
                asChild
              >
                <Link href="resume.pdf" target="_blank" download>
                  Download Resume
                  <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="animate-slide-up">
            <div className="grid  sm:grid-cols-2 gap-6">
              {techStack.map((tech, index) => (
                <Card
                  key={tech.name}
                  className="glass-card card-hover group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <tech.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function Portfolio() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((project) => project.featured);
  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in web
            development, system programming, and open-source contributions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.title}
              className="glass-card card-hover group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      {project.github && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto font-medium group-hover:text-primary"
                          asChild
                        >
                          <Link href={project.github} target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            View on GitHub
                          </Link>
                        </Button>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {toTitleCase(project.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="glass btn-glow"
            asChild
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

async function Blogs() {
  const blogs = await getBlogs();
  const latestPosts = blogs
    .filter((post) => post.published)
    .sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )
    .slice(0, 3);
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Blog
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I write about web development, system programming, Linux, and my
            experiences with Go and Rust. Join me on this technical journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post, index) => (
            <Card
              key={post.title}
              className="glass-card card-hover group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.readingTime}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.pubDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-base">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-medium group-hover:text-primary"
                  asChild
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="glass btn-glow"
            asChild
          >
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Let's Build Something <span className="gradient-text">Amazing</span>{" "}
          Together
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always excited to work on interesting projects and collaborate
          with fellow developers. Whether it's a startup idea, open-source
          contribution, or just a technical discussion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="btn-glow" asChild>
            <Link href={`mailto:${MAIL_ADDRESS}`}>
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="glass" asChild>
            <Link href="/resume.pdf" target="_blank">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <Blogs />
      <CTA />
    </div>
  );
}
