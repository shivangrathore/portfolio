import { Metadata } from "next";
import { Terminal, Code, Server, Database, Zap, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate developer with a deep love for technology, clean code,
            and building things that make a difference.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16 animate-slide-up">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a full-stack developer who has been passionate about
              technology for over 12 years, with the last 3-4 years focused on
              professional development. My journey began with Linux, and I've
              been a dedicated Linux user ever since, appreciating its power,
              flexibility, and the philosophy of open-source software.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              While I'm technically a fresher in terms of professional
              experience, I've spent years honing my skills, contributing to
              open-source projects, and building applications that solve real
              problems. I have a strong foundation in web development
              technologies and a growing expertise in system-level programming.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm particularly drawn to Go and Rust for their performance
              characteristics and elegant approaches to system programming. I
              believe in writing clean, well-documented code that not only works
              but is maintainable and scalable. Performance optimization and
              creating efficient solutions are aspects of development that I
              find especially rewarding.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card
                key={skill.category}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <skill.icon className="h-5 w-5 text-primary" />
                    <span className="text-lg">{skill.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What I Value</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <value.icon className="h-6 w-6 text-primary" />
                    <span>{value.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Current Focus</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            I'm currently focusing on deepening my expertise in system
            programming with Go and Rust, while continuing to build modern web
            applications. I'm actively seeking opportunities to contribute to
            meaningful projects and grow as a developer.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {currentFocus.map((focus) => (
              <Badge
                key={focus}
                variant="outline"
                className="text-sm px-3 py-1"
              >
                {focus}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const skills = [
  {
    category: "Frontend",
    icon: Code,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    technologies: [
      "Go",
      "Python",
      "Node.js",
      "Express",
      "RESTful APIs",
      "GraphQL",
    ],
  },
  {
    category: "Database",
    icon: Database,
    technologies: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Prisma", "SQL"],
  },
  {
    category: "DevOps",
    icon: Terminal,
    technologies: ["Linux", "Docker", "AWS", "Git", "CI/CD", "Nginx"],
  },
  {
    category: "Systems",
    icon: Zap,
    technologies: [
      "System Programming",
      "Performance Optimization",
      "Concurrency",
      "Memory Management",
    ],
  },
  {
    category: "Tools",
    icon: Users,
    technologies: [
      "Git",
      "VS Code",
      "Vim",
      "Bash",
      "Testing",
      "Documentation",
      "Copilot",
      "Neovim",
    ],
  },
];

const values = [
  {
    title: "Clean Code",
    icon: Code,
    description:
      "I believe in writing code that is readable, maintainable, and follows best practices. Code should tell a story and be easy for others to understand and modify.",
  },
  {
    title: "Performance",
    icon: Zap,
    description:
      "Building efficient applications that perform well under load is crucial. I focus on optimization and choosing the right tools for the job.",
  },
  {
    title: "Open Source",
    icon: Users,
    description:
      "I'm passionate about contributing to and learning from the open-source community. Sharing knowledge and collaborating with others drives innovation.",
  },
  {
    title: "Continuous Learning",
    icon: Terminal,
    description:
      "Technology evolves rapidly, and I'm committed to staying current with new tools, languages, and best practices in software development.",
  },
];

const currentFocus = [
  "System Programming with Go",
  "Rust Development",
  "Linux System Administration",
  "Performance Optimization",
  "Open Source Contributions",
  "Full Stack Development",
  "DevOps Practices",
];
