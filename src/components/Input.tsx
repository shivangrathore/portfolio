import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/utils";

type InputProps = ComponentPropsWithoutRef<"input">;
export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "p-2 rounded-md border-2 border-gray-500/25 outline-2 outline-transparent transition-colors focus:outline-green-400",
        className,
      )}
    />
  );
}
