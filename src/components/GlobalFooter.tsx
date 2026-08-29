import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Lock, Activity } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 text-slate-600 font-sans text-xs">

      {/* Telemetry / Live Status Strip */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All Systems Operational
            </span>
            <span className="text-slate-300">|</span>
            <span>Mobile Latency &lt;35ms</span>
            <span className="text-slate-300">|</span>
            <span>AES-256 Encryption Active</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span>Sahyak CRM v3.2 Production</span>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white flex items-center justify-center">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="Sahyak CRM"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight font-heading">
                Sahyak<span className="text-slate-400 font-normal text-xs ml-0.5">crm</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              The universal mobile-first CRM engineered to stop sales leakage across Agencies, Finance, Healthcare, Retail, SaaS, Consulting, and High-Velocity Markets.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center text-[11px] font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                ⚡ Zero Admin Overhead
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
              Platform & Features
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/features" className="text-slate-500 hover:text-slate-900 transition-colors">
                  All Platform Features
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Resources & Documentation
                </Link>
              </li>
              <li>
                <Link href="/features#mobile" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Mobile Field Engine
                </Link>
              </li>
              <li>
                <Link href="/features#automation" className="text-slate-500 hover:text-slate-900 transition-colors">
                  WhatsApp & Call Automation
                </Link>
              </li>
            </ul>
          </div>

          {/* Scale & Pricing */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
              Infrastructure & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/pricing" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Pricing Plans & ROI
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Bank-Grade Security (SOC 2)
                </Link>
              </li>
              <li>
                <Link href="/security#compliance" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Data Isolation & Compliance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Contact Architecture Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
              Governance & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Data Deletion Request
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Enterprise Support SLA
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sahyak CRM, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-700 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-700 transition-colors">
              Terms
            </Link>
            <Link href="/security" className="hover:text-slate-700 transition-colors">
              Security
            </Link>
            <Link href="/contact" className="hover:text-slate-700 transition-colors">
              Contact
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
}
