"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  Building2,
  ShieldCheck,
  Smartphone,
  ChevronDown,
  HelpCircle,
  Clock,
  MessageSquare,
  Users,
} from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const customEasing = [0.16, 1, 0.3, 1] as const;

  const sectionRevealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: customEasing },
    },
  };

  const FAQS = [
    {
      q: "Is there a setup fee or long-term contract?",
      a: "No. Sahyak is 100% pay-as-you-go with zero onboarding or consultant setup fees. You can cancel or change your plan at any time.",
    },
    {
      q: "How fast can my team be onboarded?",
      a: "In under 60 seconds. Simply select your industry vertical blueprint (Real Estate, Finance, Agency, etc.) to immediately get pre-configured deal stages and 1-tap WhatsApp proposal templates.",
    },
    {
      q: "Do you charge extra for WhatsApp API messages?",
      a: "Sahyak connects natively to the official Meta WhatsApp Cloud API. You only pay standard Meta per-conversation rates with zero markup from Sahyak.",
    },
    {
      q: "Can I import my existing contacts from Excel or another CRM?",
      a: "Yes. We offer 1-click CSV, Excel, and HubSpot/Zoho migration tools with automatic field mapping and duplicate detection.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0077ff] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% LIGHT & AIRY)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-22 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
            <span>TRANSPARENT, VALUE-ALIGNED PRICING</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Simple pricing. <br />
            <span className="brand-gradient-text">Zero hidden fees.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Deploy Sahyak in 60 seconds. Start with our 14-day free trial on any plan. No credit card required.
          </motion.p>

          {/* Billing Toggle (Monthly / Annual) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: customEasing }}
            className="pt-4 flex items-center justify-center gap-3"
          >
            <span
              className={`text-xs sm:text-sm font-semibold transition-colors ${
                !isAnnual ? "text-slate-900 font-bold" : "text-slate-500"
              }`}
            >
              Monthly Billing
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-slate-200 rounded-full p-1 transition-colors relative cursor-pointer border border-slate-300"
              aria-label="Toggle Annual Billing"
            >
              <motion.div
                className="w-6 h-6 bg-[#0084ff] rounded-full shadow-md"
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>

            <span
              className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                isAnnual ? "text-slate-900 font-bold" : "text-slate-500"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-blue-50 text-[#0084ff] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. 3 PRIMARY PRICING TIER CARDS (100% LIGHT SURFACES)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* TIER 1: SOLO CLOSER */}
            <div className="saas-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white border border-slate-200 shadow-md">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-heading">
                  <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                  <span>Solo Closer</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                      ₹{isAnnual ? "639" : "799"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {isAnnual ? "Billed ₹7,668 annually" : "Billed monthly"}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  For individual sales professionals, real estate brokers, and independent consultants closing on the move.
                </p>

                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Native iOS &amp; Android Mobile Field App</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>1-Tap WhatsApp Proposal &amp; PDF Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Offline Local Caching for Field Work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Voice Note AI Audio Transcription</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Unlimited Inbound Leads &amp; Contacts</span>
                  </div>
                </div>
              </div>

              <Link
                href="https://crm.sahyak.com/signup/"
                className="btn-pill-secondary w-full text-center text-xs py-3 font-bold"
              >
                Start Solo Free Trial
              </Link>
            </div>

            {/* TIER 2: SALES SQUAD (MOST POPULAR HIGHLIGHTED CRISP WHITE) */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 text-slate-900 shadow-xl relative border-2 border-[#0084ff] scale-[1.02]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full brand-gradient-bg text-white font-extrabold text-[11px] uppercase tracking-wider font-mono shadow-md">
                MOST POPULAR FOR TEAMS
              </div>

              <div className="space-y-4 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] text-xs font-bold font-heading border border-blue-200">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Sales Squad</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                      ₹{isAnnual ? "1,199" : "1,499"}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ user / mo</span>
                  </div>
                  <div className="text-[11px] text-[#0084ff] font-mono font-semibold">
                    {isAnnual ? "Billed annually (Save 20%)" : "Billed monthly"}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  For growing sales teams and performance agencies requiring automated lead routing and manager visibility.
                </p>

                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span><strong>Everything in Solo Closer, plus:</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Automated Skill &amp; Geo Round-Robin Routing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Manager Command Desk &amp; Live SLA Monitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Multi-Tier Role Isolation (RBAC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>7 Pre-Configured Industry Blueprints</span>
                  </div>
                </div>
              </div>

              <Link
                href="https://crm.sahyak.com/signup/"
                className="btn-pill-brand text-white w-full text-center text-xs py-3.5 font-bold shadow-md"
              >
                Deploy Sales Squad in 60s
              </Link>
            </div>

            {/* TIER 3: ENTERPRISE CUSTOM */}
            <div className="saas-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white border border-slate-200 shadow-md">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-heading">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                  <span>Enterprise</span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                    Custom
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Volume pricing for 50+ closers
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  For large brokerages, financial institutions, and multi-branch sales organizations with dedicated compliance needs.
                </p>

                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span><strong>Everything in Sales Squad, plus:</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Dedicated Isolated Database Vault</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Custom ERP, SAP &amp; Accounting Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Dedicated Solution Architect &amp; SLA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                    <span>Custom Security &amp; SOC 2 Review</span>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="btn-pill-secondary w-full text-center text-xs py-3 font-bold"
              >
                Talk to Enterprise Architect
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. DETAILED FEATURE COMPARISON TABLE (PURE WHITE #FFFFFF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Compare Plan Capabilities
            </h2>
            <p className="text-slate-600 text-sm">
              Detailed technical breakdown of capabilities included in each tier.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[580px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase font-mono sticky-table-col bg-slate-50 border-r border-slate-200 sm:border-r-0">
                      Feature / SLA
                    </th>
                    <th className="py-4 px-6 font-bold text-slate-900">Solo Closer</th>
                    <th className="py-4 px-6 bg-blue-50/70 text-[#0084ff] font-bold border-x border-blue-200">
                      Sales Squad
                    </th>
                    <th className="py-4 px-6 font-bold text-slate-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-4 px-6 font-medium sticky-table-col bg-white border-r border-slate-200 sm:border-r-0">Sub-2s Webhook Ingestion</td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                    <td className="py-4 px-6 bg-blue-50/40 border-x border-blue-200"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium sticky-table-col bg-white border-r border-slate-200 sm:border-r-0">1-Tap WhatsApp Proposals</td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                    <td className="py-4 px-6 bg-blue-50/40 border-x border-blue-200"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Automated Round-Robin Routing</td>
                    <td className="py-4 px-6 text-slate-400"><X className="w-4 h-4 text-slate-300" /></td>
                    <td className="py-4 px-6 bg-blue-50/40 border-x border-blue-200"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Manager Live SLA Command Desk</td>
                    <td className="py-4 px-6 text-slate-400"><X className="w-4 h-4 text-slate-300" /></td>
                    <td className="py-4 px-6 bg-blue-50/40 border-x border-blue-200"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Dedicated Database Vault</td>
                    <td className="py-4 px-6 text-slate-400"><X className="w-4 h-4 text-slate-300" /></td>
                    <td className="py-4 px-6 bg-blue-50/40 border-x border-blue-200 text-slate-400"><X className="w-4 h-4 text-slate-300" /></td>
                    <td className="py-4 px-6"><Check className="w-4 h-4 text-[#0084ff] font-bold" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. FREQUENTLY ASKED QUESTIONS (COOL BLUE SURFACE #F5F9FF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F5F9FF] border-b border-slate-200/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about pricing, billing, and onboarding.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs cursor-pointer"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-bold text-sm sm:text-base text-slate-900">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaqIndex === idx ? "rotate-180 text-[#0084ff]" : ""
                    }`}
                  />
                </div>
                {openFaqIndex === idx && (
                  <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. FINAL CTA BANNER (LIGHT ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>14-DAY FULL FEATURE ACCESS • NO CREDIT CARD REQUIRED</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Start accelerating your sales today.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Experience the immediate difference of sub-2s speed-to-lead and 1-tap WhatsApp closing.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://crm.sahyak.com/signup/"
                  className="btn-pill-brand text-white px-8 py-3.5 font-extrabold text-sm shadow-lg w-full sm:w-auto"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-pill-secondary px-7 py-3.5 font-semibold text-sm w-full sm:w-auto"
                >
                  Schedule Architecture Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
