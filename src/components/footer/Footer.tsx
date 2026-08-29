import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/config";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/90 tech-grid-bg pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info (2 cols wide on desktop) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <Logo size="md" asLink href="/" />
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">
                The modern sales operating system for fast-moving agencies, brokers, and sales teams. Capture leads, automate distribution, manage pipelines, and close deals faster.
              </p>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Enterprise Multi-Tenant Security Ready</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/features" className="hover:text-cyan-300 transition-colors">
                  Features Overview
                </Link>
              </li>
              <li>
                <Link href="/features#automation" className="hover:text-cyan-300 transition-colors">
                  Lead Automation Flow
                </Link>
              </li>
              <li>
                <Link href="/features#kanban" className="hover:text-cyan-300 transition-colors">
                  Visual Pipeline Kanban
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-300 transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-cyan-300 transition-colors">
                  Security Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  About CoreSetu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Book a Product Demo
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  Contact Sales
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-cyan-300 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Compliance & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-cyan-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="hover:text-cyan-300 transition-colors">
                  Meta Data Deletion
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-500 block pt-1">
                  Draft documents include configurable legal placeholders.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} CoreSetu OS. All rights reserved. Built for modern sales workflows.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms
            </Link>
            <Link href="/data-deletion" className="hover:text-slate-300">
              Data Deletion
            </Link>
            <Link href="/security" className="hover:text-slate-300">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
