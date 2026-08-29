"use client";

import React from "react";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

interface GlowingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  icon = true,
  type = "button",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl gap-2.5 font-semibold",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#00C2FF] via-[#0072FF] to-[#9353FF] text-white font-bold shadow-[0_0_20px_rgba(0,163,255,0.35)] hover:shadow-[0_0_30px_rgba(0,163,255,0.6)] hover:scale-[1.02] active:scale-[0.98] border border-cyan-300/40",
    secondary:
      "glass-panel text-white hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]",
    outline:
      "border border-white/15 text-slate-200 hover:text-white hover:border-white/30 hover:bg-white/5",
    ghost:
      "text-slate-300 hover:text-white hover:bg-white/5",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && variant === "primary" && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-white" />
      )}
      {icon && variant === "secondary" && (
        <Sparkles className="w-4 h-4 text-cyan-400 transition-transform group-hover:rotate-12" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block group focus-visible:outline-none">
        <MagneticButton
          className={cn(
            "group",
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
        >
          {content}
        </MagneticButton>
      </Link>
    );
  }

  return (
    <MagneticButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {content}
    </MagneticButton>
  );
};
