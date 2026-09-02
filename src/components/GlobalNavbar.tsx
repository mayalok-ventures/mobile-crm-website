"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavLinkItem {
  name: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Security", href: "/security" },
  { name: "Resources", href: "/resources" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function GlobalNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left: Bold Rounded Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white flex items-center justify-center">
              <Image
                src="/android-chrome-192x192.png"
                alt="Sahyak CRM"
                width={32}
                height={32}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                priority
              />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 group-hover:opacity-90 transition-opacity">
              Sahyak<span className="text-slate-400 font-normal text-sm ml-0.5">crm</span>
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 bg-slate-50">
            Mobile-First
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-slate-900 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Login Text Link & Pill CTA */}
        <div className="hidden sm:flex items-center gap-5">
          <Link
            href="https://crm.sahyak.com/login/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-2 py-1"
          >
            Log in
          </Link>
          <Link
            href="https://crm.sahyak.com/signup/"
            className="btn-pill-brand text-white text-xs py-2 px-5 font-semibold shadow-sm"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors touch-target-44 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3 pb-3 border-b border-slate-100">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium py-2 px-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-2 pt-1">
            <Link
              href="https://crm.sahyak.com/login/"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 py-2 px-3"
            >
              Log in
            </Link>
            <Link
              href="https://crm.sahyak.com/signup/"
              onClick={() => setMobileOpen(false)}
              className="btn-pill-primary text-xs py-2.5 w-full text-center justify-center"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
