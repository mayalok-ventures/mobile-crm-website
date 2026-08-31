"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  ArrowRight,
  ChevronRight,
  Check,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Clock,
  Sparkles,
} from "lucide-react";

import { InteractiveHeroSandbox } from "@/components/home/InteractiveHeroSandbox";
import { ChaosToControl } from "@/components/home/ChaosToControl";
import { MobileFirstSection } from "@/components/home/MobileFirstSection";
import { LeadVelocityConduit } from "@/components/home/LeadVelocityConduit";
import { IntelligenceRadar } from "@/components/home/IntelligenceRadar";
import { IndustryPipelines } from "@/components/home/IndustryPipelines";
import { VelocityCalculator } from "@/components/home/VelocityCalculator";
import { ComparisonMatrix } from "@/components/home/ComparisonMatrix";

export default function Home() {
  const customEasing = [0.16, 1, 0.3, 1] as const;

  const sectionRevealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: customEasing },
    },
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0077ff] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% LIGHT & AIRY WITH LAYERED COMPOSITE)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-16 lg:pt-18 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-medium text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-[#0077ff] animate-pulse" />
              <span className="font-semibold text-slate-900">Sub-2s Speed-to-Lead</span>
              <span className="text-slate-300">|</span>
              <span>WhatsApp &amp; Meta Native</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 font-mono text-[11px]">Mobile Field Closer</span>
            </div>
          </motion.div>

          {/* Main Hero Typography */}
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading"
            >
              The sales CRM engineered for{" "}
              <span className="brand-gradient-text">speed-to-lead</span> and mobile closers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Stop losing high-ticket deals to slow response times and messy spreadsheets. Sahyak arms field closers and revenue teams with instant WhatsApp actions, automated round-robin routing, and real-time pipeline telemetry.
            </motion.p>

            {/* Dual Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: customEasing }}
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

            {/* Trust Badges */}
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

          {/* Layered Composite Product Sandbox Stage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: customEasing }}
            className="pt-2 max-w-6xl mx-auto"
          >
            <InteractiveHeroSandbox />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE CORE PROBLEM TO TRANSFORMATION (SPLIT EDITORIAL SECTION)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChaosToControl />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. DEDICATED MOBILE-FIRST CLOSER ENGINE (PRODUCT-LED SPLIT)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MobileFirstSection />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. SPEED-TO-LEAD EVENT CONDUIT (FULL-WIDTH WORKFLOW)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#F5F9FF] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadVelocityConduit />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. SIGNAL TELEMETRY RADAR (COMPACT DATA FEED & HUD)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading inline-block">
              Live Pipeline Telemetry
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Active Deal Radar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Proactive alerts monitor inbound leads, proposal interactions, and response SLA thresholds in real time.
            </p>
          </div>

          <IntelligenceRadar />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          6. 7 PRE-CONFIGURED INDUSTRY PIPELINES (TABBED BLUEPRINTS)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading inline-block">
              Vertical Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Pre-Configured for High-Ticket Industries
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tailored deal stages, custom schema fields, and 1-tap WhatsApp PDF proposals built for your exact sales model.
            </p>
          </div>

          <IndustryPipelines />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          7. INTERACTIVE REVENUE ROI CALCULATOR (TWO-COLUMN SPLIT)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#F8F7FF] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VelocityCalculator />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          8. DIRECT COMPARISON MATRIX (STRUCTURED DATA TABLE)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading inline-block">
              Platform Comparison
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Why High-Growth Teams Choose Sahyak
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Compare Sahyak head-to-head against error-prone spreadsheets and bloated legacy enterprise systems.
            </p>
          </div>

          <ComparisonMatrix />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          9. FINAL CONVERSION BANNER (ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>60-SECOND ONBOARDING &bull; NO CREDIT CARD REQUIRED</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Ready to turn incoming leads into instant conversations?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Join high-ticket closers and growing revenue squads closing deals faster with Sahyak CRM.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://crm.sahyak.com/signup/"
                  className="btn-pill-brand text-white px-8 py-3.5 font-extrabold text-sm shadow-md w-full sm:w-auto"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-pill-secondary px-7 py-3.5 font-semibold text-sm w-full sm:w-auto"
                >
                  Schedule Product Walkthrough
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
