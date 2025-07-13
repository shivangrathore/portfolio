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
  MenuIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Github from "@/assets/icons/github.svg";
import Linkedin from "@/assets/icons/linkedin.svg";
import { Button } from "@/components/ui/button";
import { isAbsolute } from "path";
const navItems = [
  { name: "Home", href: "/", icon: CodeIcon },
  { name: "About", href: "/about", icon: UserIcon },
  { name: "Projects", href: "/projects", icon: FolderOpenIcon },
  { name: "Blog", href: "/blog", icon: BookOpenIcon },
  { name: "Contact", href: "/contact", icon: MailIcon },
];
export default function Navbar() {
  // Add scroll progress effect to the navbar top
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  // Update scroll progress on scroll
  useEffect(() => {
    const control = new AbortController();
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { signal: control.signal });
    return () => {
      control.abort();
    };
  }, []);

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
        isOpen && "max-lg:bg-background/95 max-lg:backdrop-blur-xl",
      )}
    >
      <div
        className="h-1 bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 ease-in-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <header className="flex flex-col items-center  max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center w-full px-8 py-4">
          <Link className="flex gap-3 cursor-pointer" href="/">
            <div className="rounded-lg text-foreground size-12 items-center justify-center flex bg-gradient-to-br from-primary to-blue-500">
              <CodeIcon className="size-8" />
            </div>
            <div>
              <h4 className="text-2xl font-semibold gradient-text">Shivang</h4>
              <p className="text-xs text-gray-500">Software Engineer</p>
            </div>
          </Link>
          <div className="hidden lg:flex items-center space-x-1">
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
          <div className="gap-2 hidden lg:flex">
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
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XIcon className="size-6" />
              ) : (
                <MenuIcon className="size-6" />
              )}
            </Button>
          </div>
        </div>
        {isOpen && (
          <div className="lg:hidden w-full px-2">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-background/95 backdrop-blur-xl rounded-2xl mt-2 border border-border/50 shadow-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  asChild
                >
                  <a href={GITHUB_URL} target="_blank">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0"
                  asChild
                >
                  <a href={LINKEDIN_URL} target="_blank">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
