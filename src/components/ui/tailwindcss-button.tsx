"use client";
import React from "react";
import { Clipboard } from "lucide-react"; // Using Lucide icons
import { cn } from "@/lib/utils";
// import { IconClipboard } from "@tabler/icons-react";

export const ButtonsCard = ({
  children,
  className,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "h-60 w-full bg-white rounded-xl border border-neutral-100 dark:bg-black dark:border-white/[0.2] hover:border-neutral-200 group/btn overflow-hidden relative flex items-center justify-center",
        className
      )}>
      <div className="absolute inset-0 dark:bg-dot-white/[0.1] bg-dot-black/[0.1]" />
      <Clipboard
        className="absolute top-2 right-2 text-neutral-300 group-hover/btn:block hidden h-4 w-4 transition duration-200" />
      <div className="relative z-40">{children}</div>
    </div>
  );
};
