"use client";
import React, { useEffect } from "react";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/constants";
import { cn } from "@/lib/utils";
import {
  BookOpenIcon,
  CodeIcon,
  FolderOpenIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Github from "@/assets/icons/github.svg";
import Linkedin from "@/assets/icons/linkedin.svg";
import { Button } from "@/components/ui/button";
const navItems = [
  { name: "Home", href: "/", icon: CodeIcon },
  { name: "About", href: "/about", icon: UserIcon },
  { name: "Projects", href: "/projects", icon: FolderOpenIcon },
  { name: "Blog", href: "/blog", icon: BookOpenIcon },
  { name: "Contact", href: "/contact", icon: MailIcon },
];
export default function Navbar() {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const control = new AbortController();
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { signal: control.signal });
    return () => {
      control.abort();
    };
  }, []);

  return (
    <div
      className={cn(
        "left-0 right-0 fixed top-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        hasScrolled
          ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-lg"
          : "bg-transparent",
      )}
    >
      <header className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
        <Link className="flex gap-3 cursor-pointer" href="/">
          <div className="rounded-lg text-foreground size-12 items-center justify-center flex bg-gradient-to-br from-primary to-blue-500">
            <CodeIcon className="size-8" />
          </div>
          <div>
            <h4 className="text-2xl font-semibold gradient-text">Shivang</h4>
            <p className="text-xs text-gray-500">Full Stack Developer</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "text-primary bg-primary/10 shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-transform group-hover:scale-110",
                    isActive && "text-primary",
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="size-10 p-0" asChild>
            <Link href={GITHUB_URL} target="_blank">
              <Github className="size-5 text-white" />
            </Link>
          </Button>
          <Button size="sm" variant="ghost" className="size-10 p-0" asChild>
            <Link href={LINKEDIN_URL} target="_blank">
              <Linkedin className="size-5 text-white" />
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
}
