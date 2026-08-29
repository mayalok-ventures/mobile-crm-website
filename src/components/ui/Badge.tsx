import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "purple" | "emerald" | "amber" | "neutral";
  className?: string;
  icon?: React.ReactNode;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "cyan",
  className,
  icon,
  pulse = false,
}) => {
  const variantStyles = {
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    neutral: "bg-slate-800/80 text-slate-300 border-white/10",
  };

  const dotColors = {
    cyan: "bg-cyan-400 shadow-[0_0_8px_#00F0FF]",
    purple: "bg-purple-400 shadow-[0_0_8px_#8A2BE2]",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#10B981]",
    amber: "bg-amber-400 shadow-[0_0_8px_#F59E0B]",
    neutral: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              dotColors[variant]
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              dotColors[variant]
            )}
          />
        </span>
      )}
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </span>
  );
};
