"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Smartphone,
  Building2,
  ArrowRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Lock,
  Star,
  Check,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";

const INDUSTRIES = [
  "Real Estate",
  "Finance",
  "Retail",
  "Healthcare",
  "SaaS",
  "Consulting",
  "Agencies",
] as const;

type IndustryType = (typeof INDUSTRIES)[number];

const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Animation System (The "Opening Up" Reveal Effect)
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

const TESTIMONIALS = [
  {
    quote:
      "Sahyak eliminated lead drop-off completely. Our speed-to-lead fell from 45 minutes to under 90 seconds, and conversion velocity surged by 38% across our regional sales squads.",
    author: "Vikramaditya Singhal",
    role: "Managing Director",
    company: "Apex Growth Media",
    metricBadge: "38% Surged Closing Rate",
    initials: "VS",
    rating: 5,
  },
  {
    quote:
      "Spreadsheets were bleeding our deal pipeline dry. With Sahyak's mobile-first workflow and instant WhatsApp triggers, our advisors qualify high-ticket accounts in one tap.",
    author: "Pooja Deshmukh",
    role: "VP of Revenue Operations",
    company: "Capital Advisory Partners",
    metricBadge: "10+ Hours Saved / Week",
    initials: "PD",
    rating: 5,
  },
  {
    quote:
      "As an active field closer, I don't need an over-engineered desktop dashboard. Sahyak on mobile is all I need to manage ₹15Cr+ in pipeline volume with zero admin headache.",
    author: "Rohan Varma",
    role: "Principal Consultant",
    company: "Skyline Enterprise Solutions",
    metricBadge: "₹15Cr+ Pipeline Velocity",
    initials: "RV",
    rating: 5,
  },
];

export default function SahyakHomePage() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const [activeArch, setActiveArch] = useState<"solo" | "team">("solo");

  // Rotating Industry Effect (Framer Motion Loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndustryIndex((prev) => (prev + 1) % INDUSTRIES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const currentRotatingIndustry = INDUSTRIES[industryIndex];

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. THE DYNAMIC "PAIN & GREED" HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: customEasing }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>⚡ Mobile-First Sales Infrastructure</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">v3.2 Released</span>
            </div>
          </motion.div>

          {/* Dynamic Rotating Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEasing }}
              className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15] sm:leading-[1.08] font-heading break-words"
            >
              The Mobile-First CRM Engineered For{" "}
              <span className="inline-block relative min-w-0 text-slate-900">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentRotatingIndustry}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.22, ease: customEasing }}
                    className="inline-block underline decoration-2 underline-offset-8 decoration-slate-900"
                  >
                    {currentRotatingIndustry}.
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
              Stop losing deals to messy spreadsheets. Capture leads instantly and scale revenue across your entire team.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: customEasing }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <Link
                href="https://crm.sahyak.com/signup/"
                className="btn-pill-primary text-sm py-3 px-8 font-semibold group w-full sm:w-auto"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/features"
                className="btn-pill-secondary text-sm py-3 px-7 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </motion.div>

            {/* Trust Micro Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs text-slate-500 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> Setup in 60 seconds
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" /> WhatsApp & Meta Ready
              </span>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              IMAGE PLACEHOLDER 1 (Hero Visual: 3D Mobile Overlapping Laptop)
          ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: customEasing }}
            className="mt-14 max-w-5xl mx-auto"
          >
            {/* Subtle Floating Animation Wrapper */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-4 shadow-2xl shadow-slate-900/10 overflow-hidden"
            >
              {/* Subtle ambient backdrop glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 via-slate-100 to-indigo-100 rounded-3xl blur-xl opacity-50 -z-10 pointer-events-none" />

              {/* Image Container with Object Cover & Overflow Hidden */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center group shadow-inner">
                <Image
                  src="/images/hero-3d-mockup.png"
                  alt="Sahyak Universal Mobile Field App & Desktop Command Center"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                />

                {/* Dark subtle gradient scrim for high text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                {/* Top-Left: Live Inbound Telemetry Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono font-semibold text-white shadow-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
                  <span>Meta & Google Ads Webhooks • Sub-2s Ingest</span>
                </motion.div>

                {/* Top-Right: Response SLA Pill */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono font-semibold text-emerald-400 shadow-lg"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Avg Speed-to-Lead: 1.8s</span>
                </motion.div>

                {/* Bottom-Left: Live Deal Notification Card Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 shadow-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="font-sans">
                    <span className="font-bold font-heading">New Tier-1 Deal Ingested</span>
                    <span className="text-slate-500 font-mono ml-2 text-[11px]">• ₹24L Account (WhatsApp Dispatched)</span>
                  </div>
                </motion.div>

                {/* Bottom-Right: Platform Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm"
                >
                  <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                  <span>Native Mobile + Desktop Command</span>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. [NEW] SOCIAL PROOF & AUTHORITY SECTION (Staggered Scroll Reveal)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-slate-50/70 border-y border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Proven Closing Velocity
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Powering high-velocity sales across high-growth enterprise teams.
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              From performance marketing agencies to financial advisors, healthcare clinics, SaaS, and real estate teams — see how high-performing closers deploy Sahyak.
            </p>
          </div>

          {/* 3-Column Staggered Testimonial Cards */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.author}
                variants={cardItemVariants}
                className="saas-card-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-white"
              >
                <div className="space-y-4">
                  {/* Top Rating Stars & Metric Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {t.metricBadge}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Credentials & Placeholder Headshot Slot */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                  {/* Headshot Slot Container */}
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-900 border-2 border-white shadow-md shrink-0 flex items-center justify-center text-white font-bold text-xs group">
                    {/* 
                      ============================================================
                      HEADSHOT PLACEHOLDER
                      Replace with: <Image src={`/images/headshot-${idx+1}.jpg`} alt={t.author} fill className="object-cover" />
                      ============================================================
                    */}
                    <span className="font-heading">{t.initials}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 font-heading truncate">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {t.role}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                      {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Aggregate Telemetry Strip */}
          <motion.div
            variants={cardItemVariants}
            className="mt-12 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-slate-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span><strong>₹450Cr+</strong> In Deals Managed</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-700" />
              <span><strong>&lt; 2 Minutes</strong> Lead Follow-Up SLA</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-700" />
              <span><strong>500+</strong> Daily Active Closers</span>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. ARCHITECTURE SELECTOR (Solo vs. Company)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading">
              Operational Modes
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Two Ways to Deploy. Zero Compromise.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Select your operating scale to preview how Sahyak adapts to your exact day-to-day sales workflow.
            </p>
          </div>

          {/* Interactive Sliding Toggle Switch */}
          <div className="flex justify-center mb-12 px-2">
            <div className="inline-flex p-1 sm:p-1.5 bg-slate-200/70 rounded-full border border-slate-300/60 relative max-w-full">
              <button
                onClick={() => setActiveArch("solo")}
                className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                  activeArch === "solo" ? "text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {activeArch === "solo" && (
                  <motion.div
                    layoutId="archSelectorPill"
                    className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-md shadow-slate-900/15"
                    transition={{ duration: 0.45, ease: customEasing }}
                  />
                )}
                <Smartphone className="w-3.5 h-3.5" />
                <span>I&apos;m a Solo Closer</span>
              </button>

              <button
                onClick={() => setActiveArch("team")}
                className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                  activeArch === "team" ? "text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {activeArch === "team" && (
                  <motion.div
                    layoutId="archSelectorPill"
                    className="absolute inset-0 bg-slate-900 rounded-full -z-10 shadow-md shadow-slate-900/15"
                    transition={{ duration: 0.45, ease: customEasing }}
                  />
                )}
                <Building2 className="w-3.5 h-3.5" />
                <span>We&apos;re a Sales Team</span>
              </button>
            </div>
          </div>

          {/* Dynamic State Swap (Single Bold Value Prop + Specific Image Placeholder) */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {activeArch === "solo" ? (
                /* ─── SOLO CLOSER STATE ─── */
                <motion.div
                  key="solo-arch-container"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {/* Single Bold Value Proposition Sentence */}
                  <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-heading">
                      &ldquo;Dominate your pipeline on the move with instant WhatsApp actions, zero manager overhead, and pure sales velocity.&rdquo;
                    </p>
                  </div>

                  {/* ─────────────────────────────────────────────────────────────
                      IMAGE 2 (Solo: Professional Using Mobile App in Field)
                  ───────────────────────────────────────────────────────────── */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl group">
                    <Image
                      src="/images/solo-field-closer.png"
                      alt="Professional Closing Deals on Mobile in the Field"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                    />

                    {/* Dark gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                    {/* Top Floating Tag */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-semibold text-white shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Single-Agent Execution Mode Active</span>
                    </div>

                    {/* Floating Quick Action Chip */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 hidden sm:flex items-center gap-2 bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-md">
                      <span>⚡ 1-Tap WhatsApp Proposal Sent</span>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 shadow-lg">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Zero Administrative Overhead • Offline Field Cache Active</span>
                      </span>
                      <Link href="/features" className="text-slate-900 font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>See Mobile Workflows</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ─── SALES TEAM STATE ─── */
                <motion.div
                  key="team-arch-container"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {/* Single Bold Value Proposition Sentence */}
                  <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-heading">
                      &ldquo;Scale your sales engine with bird&apos;s-eye manager telemetry, automated lead routing, and strict role-based access control.&rdquo;
                    </p>
                  </div>

                  {/* ─────────────────────────────────────────────────────────────
                      IMAGE 3 (Team: Enterprise Desktop Dashboard & Hierarchy)
                  ───────────────────────────────────────────────────────────── */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl group">
                    <Image
                      src="/images/enterprise-dashboard.png"
                      alt="Managerial Command Center & Multi-Tier Hierarchy"
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-95"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                    {/* Top Floating Tag */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-semibold text-white shadow-md">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                      <span>Enterprise Sales Cockpit • 42 Active Reps</span>
                    </div>

                    {/* Floating Metric Chip */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono font-semibold text-emerald-400 shadow-md">
                      <span>MTD: ₹4.28 Cr • 98.4% SLA</span>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 shadow-lg">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        <span>Multi-Tier Team Governance & Automated Round-Robin Active</span>
                      </span>
                      <Link href="/pricing" className="text-slate-900 font-bold hover:underline flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Compare Team Tiers</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. TRUST & ROUTING SECTION (Clean Navigation Gateway)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#FAFAFA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Headline */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Built for speed. Secured for enterprise.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore our specialized industry capabilities, transparent infrastructure economics, and compliance framework.
            </p>
          </div>

          {/* 3 High-Trust Routing Cards with Staggered Scroll Reveal */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {/* Card 1: Deep Industry Workflows -> /features */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="saas-card-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white hover:shadow-2xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Card 1 Image (Automation & Industry Workflows) */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm">
                  <Image
                    src="/images/card-features.png"
                    alt="Deep Industry Workflows & Automation"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1.5">
                    <Zap className="w-3 h-3" />
                    <span>7 Industry Adapters</span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 z-10 text-[10px] font-mono text-slate-300 truncate">
                    Real Estate • Finance • SaaS • Agencies
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-heading tracking-tight group-hover:text-slate-950">
                  Deep Industry Workflows
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Pre-configured data schemas for Real Estate, Finance, Retail, Healthcare, and SaaS. Eliminate weeks of custom setup delays.
                </p>
              </div>

              <Link
                href="/features"
                className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors pt-2 group"
              >
                <span>See All Features</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Card 2: Transparent Infrastructure -> /pricing */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="saas-card-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white hover:shadow-2xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Card 2 Image (Growth & Charts / ROI) */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm">
                  <Image
                    src="/images/card-pricing.png"
                    alt="Transparent Infrastructure & Pricing ROI"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1.5">
                    <DollarSign className="w-3 h-3" />
                    <span>Flat-Rate Economics</span>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5 z-10 text-[10px] font-mono text-slate-300 truncate">
                    Zero Per-Lead Tax • ₹799 / user / mo
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-heading tracking-tight group-hover:text-slate-950">
                  Transparent Infrastructure
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Predictable economics for high-velocity teams. No hidden add-ons, user traps, or extortionate consulting fees.
                </p>
              </div>

              <Link
                href="/pricing"
                className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors pt-2 group"
              >
                <span>View Pricing</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Card 3: Bank-Grade Compliance -> /security */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="saas-card-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white hover:shadow-2xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div className="space-y-4">
                
                {/* Card 3 Image (Vault / Lock Shield / Security) */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm">
                  <Image
                    src="/images/card-security.png"
                    alt="Bank-Grade Cryptographic Security Vault"
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-heading tracking-tight">
                  Bank-Grade Compliance
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  SOC 2 Type II isolation, cryptographic role-based access control, and 99.99% Cloudflare Edge SLA guarantee.
                </p>
              </div>

              <Link
                href="/security"
                className="inline-flex items-center text-xs font-bold text-slate-900 hover:text-slate-700 transition-colors pt-2 group"
              >
                <span>Read Security Docs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. HIGH-CONVERTING FINAL PSYCHOLOGICAL CONVERSION BANNER
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
              <span>ZERO MIGRATION DELAY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight font-heading">
              Stop losing deals in cluttered spreadsheets.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Join hundreds of high-velocity closers and revenue teams deploying Sahyak CRM to automate follow-ups and scale revenue.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://crm.sahyak.com/signup/"
                className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-3.5 rounded-full text-sm font-bold hover:bg-slate-100 transition-all shadow-lg w-full sm:w-auto"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-slate-800 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-700 transition-all border border-slate-700 w-full sm:w-auto"
              >
                Schedule VIP Architecture Demo
              </Link>
            </div>

            <div className="text-xs text-slate-400 pt-2">
              No credit card required • Instant setup on iOS & Android
            </div>

          </div>
        </div>
      </motion.section>

    </div>
  );
}
