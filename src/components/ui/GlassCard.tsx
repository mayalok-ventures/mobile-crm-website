"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "purple" | "none";
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = "none",
  interactive = false,
  ...props
}) => {
  const glowClasses = {
    none: "",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)]",
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(138,43,226,0.15)]",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 shadow-xl transition-all duration-300",
        interactive && "cursor-pointer hover:-translate-y-1 hover:border-white/20",
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
