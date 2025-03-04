import { MAX_WIDTH_CLASSES } from "../lib/constants";
import { cn } from "../lib/utils";

const Links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  return (
    <header className="bg-black sticky z-50 top-0">
      <div
        className={cn(
          MAX_WIDTH_CLASSES,
          "flex justify-between items-center p-4",
        )}
      >
        <a href="/">
          <h1 className="font-black flex items-center text-3xl gap-2 pointer-events-none select-none">
            <span className="text-gray-500">{"{"}</span>
            <span>{"S"}</span>
            <span className="text-gray-500">{"}"}</span>
          </h1>
        </a>
        <ul className="flex gap-4">
          {Links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="bg-transparent hover:bg-stone-900 py-2 px-4 transition-colors rounded"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
