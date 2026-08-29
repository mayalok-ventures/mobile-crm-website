"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Smartphone,
  Zap,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Clock,
  ShieldCheck,
  Send,
  GitFork,
  Activity,
  Layers,
  Search,
  Filter,
  Check,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: customEasing },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: customEasing },
  },
};

const FEATURE_CATEGORIES = [
  { id: "mobile", label: "Mobile Field Ops", icon: Smartphone },
  { id: "automation", label: "Lead Automation", icon: Zap },
  { id: "telemetry", label: "Managerial Telemetry", icon: Activity },
  { id: "security", label: "Security & Data", icon: Lock },
];

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("mobile");

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. MINIMALIST HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-22 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <span>PLATFORM ARCHITECTURE & CAPABILITIES</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Engineered for pure sales velocity.
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6"
          >
            From instant lead ingestion to automated WhatsApp follow-ups. Explore the architecture that powers high-performing sales teams.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: customEasing }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              href="https://crm.sahyak.com/signup/"
              className="btn-pill-primary text-sm py-3 px-8 font-semibold group w-full sm:w-auto"
            >
              <span>Deploy Sahyak Now</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/pricing"
              className="btn-pill-secondary text-sm py-3 px-7 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>View Pricing Plans</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. STICKY INTERACTIVE FEATURE NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-1 max-w-full no-scrollbar">
            {FEATURE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE FEATURE SECTIONS (Images First + Staggered Reveals)
      ───────────────────────────────────────────────────────────── */}
      <div className="divide-y divide-slate-200/70">
        
        {/* ─── SECTION A: MOBILE FIELD OPS ─── */}
        <motion.section
          id="mobile-field-ops"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionRevealVariants}
          className="py-20 lg:py-28 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Copy & Feature Bullet Matrix */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>01 / MOBILE FIELD OPERATIONS</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
                  Your entire pipeline, in your pocket.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Engineered specifically for field agents, brokers, and mobile closers. Eliminate 10+ hours of evening data entry with one-thumb CRM interactions.
                </p>

                {/* Feature Highlights */}
                <motion.div variants={staggerContainerVariants} className="space-y-4 pt-2">
                  <motion.div variants={cardItemVariants} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">1-Tap WhatsApp Outreach</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Deliver pre-approved brochures, floor plans, and quotation PDFs to new prospects in under 2 seconds.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={cardItemVariants} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">Instant Push Lead Alerts</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Real-time alerts with sound profiles that cut through notification noise when high-intent prospects inquire.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={cardItemVariants} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">Offline Field Cache</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Log site visits and deal updates in basements, elevators, and transit with zero network dropouts.</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column: Tall Rounded Mobile App UI Image with Floating Badges */}
              <div className="lg:col-span-6 flex justify-center relative">
                {/* Ambient glow backdrop */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 via-slate-100 to-indigo-100 rounded-full blur-3xl opacity-70 -z-10 pointer-events-none" />

                <div className="relative w-full max-w-[360px] aspect-[9/18] rounded-3xl overflow-hidden border-4 border-slate-900 bg-slate-900 shadow-2xl shadow-slate-900/20 group">
                  <Image
                    src="/images/features/mobile-app-ui.png"
                    alt="Sahyak Mobile Field App Interface"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-mono font-semibold text-white shadow-md">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live Inbound Alert</span>
                    </span>
                    <span className="text-emerald-400 font-bold">02:45 SLA</span>
                  </div>

                  {/* Bottom Action Badge */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 shadow-lg space-y-1">
                    <div className="flex items-center justify-between font-bold font-heading text-[11px]">
                      <span>⚡ 1-Tap WhatsApp Sent</span>
                      <span className="text-emerald-600 font-mono">1.8s</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">Offline GPS Site Check-in Active</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* ─── SECTION B: INGESTION & AUTOMATION ─── */}
        <motion.section
          id="automation"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionRevealVariants}
          className="py-20 lg:py-28 bg-[#FAFAFA]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Wide Lead Automation Dashboard Image */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-2xl group">
                  <Image
                    src="/images/features/lead-automation-dashboard.png"
                    alt="Sub-Second Lead Routing & Pipeline Ingestion Dashboard"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />

                  {/* Browser Chrome Header Overlay */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="ml-1 font-mono text-[11px] text-slate-400">rules.sahyak.crm / routing-engine</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      240ms LATENCY
                    </span>
                  </div>

                  {/* Bottom Pipeline Status Pill */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-xs text-white shadow-xl">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Round-Robin: 100% Balanced • Inbound Tier-1</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">Auto-Enriched & Dispatched</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Copy & Value Proposition */}
              <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>02 / SPEED TO LEAD ENGINE</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
                  Zero manual data entry.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Eliminate copy-pasting lead spreadsheets. Sahyak automatically pulls inquiries from ads, webhooks, and phone forms, instantly distributing them to active reps.
                </p>

                <div className="space-y-3.5 pt-2 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span><strong>Meta & Google Ads Webhooks:</strong> Ingest leads in sub-second time directly from ad campaigns.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span><strong>Automated Round-Robin Routing:</strong> Distribute leads equitably by rep capacity, shift hours, and geography.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span><strong>Real-Time Duplicate Removal:</strong> Merge returning prospects without creating cluttered double-records.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* ─── SECTION C: MANAGERIAL TELEMETRY ─── */}
        <motion.section
          id="telemetry"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionRevealVariants}
          className="py-20 lg:py-28 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Copy & Governance Highlights */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <span>03 / ENTERPRISE COMMAND DESK</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
                  Bird&apos;s-eye visibility across your entire sales floor.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Multi-tier team hierarchy designed for executives, regional directors, and team leads. See who is closing, which territories are lagging, and where deals stall.
                </p>

                <div className="space-y-3.5 pt-2 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span><strong>Multi-Tier Hierarchy:</strong> Executives oversee zones, managers manage squads, agents see assigned deals only.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span><strong>SLA Breach Detection:</strong> Get alerted the instant a high-value lead is left unattended for over 5 minutes.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      <Check className="w-3 h-3" />
                    </div>
                    <span><strong>Real-Time Leaderboards:</strong> Transparent revenue attribution that drives healthy competition among reps.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Managerial Telemetry Dashboard Image */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-2xl group">
                  <Image
                    src="/images/features/managerial-telemetry.png"
                    alt="National Sales Floor Telemetry & Managerial Cockpit"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />

                  {/* Browser Chrome Header */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="w-2 h-2 rounded-full bg-slate-600" />
                      <span className="ml-1 font-mono text-[11px] text-slate-400">telemetry.sahyak.crm / national-floor</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-500/40 px-2 py-0.5 rounded-full">
                      42 REPS ACTIVE
                    </span>
                  </div>

                  {/* Bottom Metric Strip */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-xs text-white shadow-xl">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Activity className="w-3.5 h-3.5 text-indigo-400" />
                      <span>MTD Attainment: ₹4.28 Cr</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">98.4% SLA Adherence</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* ─── SECTION D: SECURITY & DATA GOVERNANCE ─── */}
        <motion.section
          id="security"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionRevealVariants}
          className="py-20 lg:py-28 bg-[#FAFAFA]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Security Console Image */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-2xl group">
                  <Image
                    src="/images/features/security-rbac-console.png"
                    alt="Role-Based Access Control & Cryptographic Governance Console"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />

                  {/* Browser Chrome Header */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono text-[11px] text-slate-400">vault.sahyak.crm / cryptographic-rbac</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
                      SOC 2 TYPE II
                    </span>
                  </div>

                  {/* Bottom Security Assurance Strip */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-xs text-white shadow-xl">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AES-256 Partition Key Enforced</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">Zero Cross-Tenant Leakage</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Security Copy */}
              <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                  <span>04 / DATA SOVEREIGNTY</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
                  Bank-grade security. Zero customer database leakage.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Protect your most valuable asset: your customer database. Prevent reps from exporting lead sheets, enforce strict privacy, and maintain complete audit trails.
                </p>

                <div className="pt-2">
                  <Link
                    href="/security"
                    className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors group"
                  >
                    <span>Read Full Security Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM CONVERSION CTA SECTION
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-t border-slate-200/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
              <span>ZERO MIGRATION DOWNTIME</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight font-heading">
              Stop reading. Start closing.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Deploy Sahyak across your sales floor today. 14 days free, no credit card required.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://crm.sahyak.com/signup/"
                className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-3.5 rounded-full text-sm font-bold hover:bg-slate-100 transition-all shadow-lg w-full sm:w-auto"
              >
                <span>Deploy Sahyak Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-slate-800 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-700 transition-all border border-slate-700 w-full sm:w-auto"
              >
                View Pricing
              </Link>
            </div>

            <div className="text-xs text-slate-400 pt-2">
              Setup in under 60 seconds • iOS, Android, and Web
            </div>

          </div>
        </div>
      </motion.section>

    </div>
  );
}
