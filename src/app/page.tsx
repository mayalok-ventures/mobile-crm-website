"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Check,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Layers,
  BarChart3,
  Flame,
  Kanban,
  CheckCircle2,
} from "lucide-react";

import { InteractiveHeroSandbox } from "@/components/home/InteractiveHeroSandbox";
import { ChaosToControl } from "@/components/home/ChaosToControl";
import { LeadVelocityConduit } from "@/components/home/LeadVelocityConduit";
import { IntelligenceRadar } from "@/components/home/IntelligenceRadar";
import { IndustryPipelines } from "@/components/home/IndustryPipelines";
import { VelocityCalculator } from "@/components/home/VelocityCalculator";
import { ComparisonMatrix } from "@/components/home/ComparisonMatrix";

export default function Home() {
  const [currentHighlight, setCurrentHighlight] = useState<string>("Sales Velocity");

  const highlights = [
    "Sales Velocity",
    "Instant WhatsApp Action",
    "Zero Lead Leakage",
    "Field Mobile Closers",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => {
        const nextIndex = (highlights.indexOf(prev) + 1) % highlights.length;
        return highlights[nextIndex];
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const customEasing = [0.16, 1, 0.3, 1] as const;

  const sectionRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: customEasing },
    },
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0077ff] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% LIGHT & AIRY WITH SUBTLE ATMOSPHERIC TINT)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-medium text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-[#0077ff] animate-pulse" />
              <span>⚡ Sub-2s Speed-to-Lead</span>
              <span className="text-slate-300">|</span>
              <span>WhatsApp &amp; Meta Native</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-mono text-[11px]">v3.4 Engine</span>
            </div>
          </motion.div>

          {/* Main Hero Typography */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEasing }}
              className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.08] font-heading break-words"
            >
              The Sales CRM Engineered For{" "}
              <span className="inline-block relative min-w-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentHighlight}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.22, ease: customEasing }}
                    className="inline-block brand-gradient-text"
                  >
                    {currentHighlight}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEasing }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Stop losing high-ticket deals to slow response times and messy spreadsheets. Sahyak arms solo closers and high-growth revenue squads with instant WhatsApp actions, automated round-robin routing, and live deal telemetry.
            </motion.p>

            {/* High-Contrast Dual Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: customEasing }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <Link
                href="https://crm.sahyak.com/signup/"
                className="btn-pill-brand text-white text-sm py-3 px-8 font-semibold group w-full sm:w-auto"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/features"
                className="btn-pill-secondary text-sm py-3 px-7 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Explore All Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </motion.div>

            {/* Friction Reduction Trust Tokens */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#0077ff] font-bold" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#0077ff] font-bold" /> Setup in 60 seconds
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#0077ff] font-bold" /> Native iOS, Android &amp; Desktop
              </span>
            </motion.div>
          </div>

          {/* Interactive Multi-View Hero Sandbox Stage */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: customEasing }}
            className="pt-4 max-w-6xl mx-auto"
          >
            <InteractiveHeroSandbox />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE CORE PROBLEM TO TRANSFORMATION (SOFT SURFACE #F8FAFC)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Why Deals Slip Through
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              High-Ticket Leads Die in the Hand-Off.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              When a buyer submits an inquiry, the chance of closing drops by 391% after just 5 minutes. See how Sahyak eliminates operational friction.
            </p>
          </div>

          <ChaosToControl />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. REAL-TIME DATA CONDUIT (PURE WHITE #FFFFFF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading">
              Edge Speed Pipeline
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Sub-2-Second Speed-to-Lead Conduit.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              From Meta Ad form submission to verified WhatsApp proposal in the customer&apos;s hands before they can leave your page.
            </p>
          </div>

          <LeadVelocityConduit />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. SIGNAL TELEMETRY RADAR (COOL BLUE SURFACE #F5F9FF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F5F9FF] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Active Deal Radar
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Intelligent Pipeline Radar.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Never let a hot deal go cold. Our proactive telemetry monitors every inbound lead, proposal click, and SLA threshold in real time.
            </p>
          </div>

          <IntelligenceRadar />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. 7 PRE-CONFIGURED INDUSTRY PIPELINES (PURE WHITE #FFFFFF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading">
              Vertical Blueprints
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Tailored for High-Ticket Industries.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Pre-configured deal stages, custom schema fields, and 1-tap WhatsApp PDF proposals built for your exact sales model.
            </p>
          </div>

          <IndustryPipelines />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          6. INTERACTIVE REVENUE CALCULATOR (SOFT LAVENDER SURFACE #F8F7FF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F8F7FF] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Measurable ROI
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Quantify Your Revenue Recovery.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Adjust your team size, monthly lead volume, and average deal size to forecast the exact monthly revenue surge Sahyak delivers.
            </p>
          </div>

          <VelocityCalculator />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          7. DIRECT COMPARISON MATRIX (PURE WHITE #FFFFFF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading">
              Architectural Showdown
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Why High-Growth Teams Choose Sahyak.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Compare Sahyak head-to-head against error-prone spreadsheets and bloated legacy enterprise systems.
            </p>
          </div>

          <ComparisonMatrix />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          8. FINAL CONVERSION BANNER (LIGHT, AIRY ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>60-SECOND ONBOARDING • NO CREDIT CARD REQUIRED</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Ready to turn incoming leads into instant conversations?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Join hundreds of high-ticket closers and growing revenue squads closing deals faster with Sahyak CRM.
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
