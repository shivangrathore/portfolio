import Link from "next/link";
import { Mail, Heart, Code, Coffee, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Github from "@/assets/icons/github.svg";
import Linkedin from "@/assets/icons/linkedin.svg";
import { GITHUB_URL, LINKEDIN_URL, MAIL_ADDRESS } from "@/data/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
                <div className="relative p-2 bg-gradient-to-br from-primary to-blue-500 rounded-xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <div className="font-bold text-xl gradient-text">
                  Shivang Rathore
                </div>
                <div className="text-sm text-muted-foreground">
                  Software Engineer
                </div>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Passionate about building scalable applications and contributing
              to open-source projects. Always learning, always coding.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="glass" asChild>
                <Link href={GITHUB_URL} target="_blank" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="glass" asChild>
                <Link href={LINKEDIN_URL} target="_blank" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="glass" asChild>
                <Link href={`mailto:${MAIL_ADDRESS}`} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">
              Current Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">
                  Available for opportunities
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Currently learning Rust
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Powered by coffee
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Shivang Rathore. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>using Next.js, TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const quickLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Resume", href: "/resume.pdf" },
];

const technologies = [
  "Go",
  "Rust",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Linux",
  "AWS",
  "Git",
  "Tailwind CSS",
];
