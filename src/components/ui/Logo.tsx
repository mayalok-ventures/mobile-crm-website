import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  asLink?: boolean;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  className,
  asLink = false,
  href = "/",
}) => {
  const sizeMap = {
    sm: { img: 24, container: "w-6 h-6", text: "text-base", badge: "text-[9px] px-1 py-0.2" },
    md: { img: 32, container: "w-8 h-8", text: "text-lg sm:text-xl", badge: "text-[10px] px-1.5 py-0.5" },
    lg: { img: 40, container: "w-10 h-10", text: "text-2xl sm:text-3xl", badge: "text-xs px-2 py-0.5" },
    xl: { img: 56, container: "w-14 h-14", text: "text-3xl sm:text-4xl", badge: "text-sm px-2.5 py-1" },
  };

  const selectedSize = sizeMap[size];

  const logoContent = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      {/* Crisp Logo Container */}
      <div className={cn("relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm", selectedSize.container)}>
        <Image
          src="/android-chrome-192x192.png"
          alt="Sahyak CRM Logo"
          width={selectedSize.img}
          height={selectedSize.img}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center gap-1.5">
          <span className="font-heading font-extrabold tracking-tight text-slate-900 group-hover:text-[#0077ff] transition-colors">
            Sahyak<span className="text-slate-400 font-normal text-xs ml-0.5">crm</span>
          </span>
          <span className="text-[10px] font-medium font-mono text-[#0077ff] bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 rounded-full">
            Mobile-First
          </span>
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-block focus-visible:outline-none" aria-label="Sahyak CRM Home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
