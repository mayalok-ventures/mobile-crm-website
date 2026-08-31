"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Smartphone,
  ShieldCheck,
  Building2,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Target,
  HeartHandshake,
  Compass,
} from "lucide-react";

const PRINCIPLES = [
  {
    number: "01",
    title: "Zero Operational Latency",
    tagline: "Every millisecond counts in sales.",
    description:
      "When a buyer shows high intent, minutes of delay cause massive revenue leakage. Our entire system is engineered around sub-2-second edge webhooks and instant push delivery.",
    icon: Zap,
  },
  {
    number: "02",
    title: "Native Mobile Truth",
    tagline: "Deals happen in WhatsApp and in the field.",
    description:
      "Sales closers don't sit at desks filling out 40-field forms. We build mobile-first with 1-tap WhatsApp dispatches, voice note AI transcription, and full offline caching.",
    icon: Smartphone,
  },
  {
    number: "03",
    title: "Bank-Grade Tenant Isolation",
    tagline: "Your lead data is sacred and protected.",
    description:
      "We enforce strict cryptographic role-based access control (RBAC), phone number masking, and zero cross-tenant AI training. Departing employees can never scrape your contact base.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Radical Transparency & Economics",
    tagline: "No hostage pricing or surprise consultant bills.",
    description:
      "We believe CRM software should be predictable and cost-effective. Flat per-user pricing, zero setup fees, and 60-second industry onboarding.",
    icon: Compass,
  },
];

export default function AboutPage() {
  const customEasing = [0.16, 1, 0.3, 1] as const;

  const sectionRevealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: customEasing },
    },
  };

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
            <span className="w-2 h-2 rounded-full bg-[#0077ff] animate-pulse" />
            <span>THE SAHYAK CRM MISSION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Engineered to eliminate <br />
            <span className="brand-gradient-text">sales friction forever.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Sahyak was created by CoreSetu to solve a universal pain point: high-ticket leads slipping through the cracks between scattered ad dashboards, messy Excel sheets, and disconnected WhatsApp chats.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE ORIGIN STORY & NARRATIVE (SOFT SURFACE #F8FAFC)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold font-heading border border-rose-200">
                <span>The Industry Reality</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                Millions in ad spend wasted on 4-hour response delays.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                When performance marketing agencies, real estate developers, and wealth advisors run campaigns, they generate valuable intent. But in 85% of companies, those leads sit unattended in spreadsheets for hours.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                By the time a sales rep manually copies the phone number and opens WhatsApp, the buyer has already moved on to a competitor.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 space-y-4 shadow-xl border border-slate-200/90">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0084ff] font-bold">
                <Sparkles className="w-4 h-4" />
                <span>THE SAHYAK PARADIGM SHIFT</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 font-heading leading-snug">
                &ldquo;We replaced manual copy-pasting with sub-2s edge webhooks and 1-tap WhatsApp proposals.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                Eliminating lead drop-off across performance marketing agencies, real estate developers, financial firms, and B2B revenue squads.
              </div>
            </div>
          </div>

          {/* CoreSetu Bridge Architecture Animation Video */}
          <div className="max-w-5xl mx-auto rounded-2xl bg-white p-4 sm:p-8 border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="relative w-full aspect-[1672/941] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center select-none">
              <video
                src="/videos/about-coresetu-bridge.mp4"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
              {/* Transparent shield layer preventing right-click, touch, dragging or download */}
              <div
                className="absolute inset-0 z-10 select-none bg-transparent cursor-default"
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. 4 CORE ENGINEERING PRINCIPLES (PURE WHITE #FFFFFF)
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
              Our Core Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              The 4 Pillars of Sahyak Architecture.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Every feature, API webhook, and mobile workflow is built against these four non-negotiable engineering principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PRINCIPLES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.number}
                  className="saas-card p-6 sm:p-8 bg-white border border-slate-200 shadow-md space-y-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0084ff] border border-blue-200 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      PILLAR {p.number}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                      {p.title}
                    </h3>
                    <div className="text-xs font-mono text-[#0084ff] font-semibold">
                      {p.tagline}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. PLATFORM TELEMETRY STATS STRIP (COOL BLUE SURFACE #F5F9FF)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F5F9FF] border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">₹450Cr+</div>
              <div className="text-xs text-slate-500 font-mono">Deals Managed</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0084ff] font-heading">&lt; 90s</div>
              <div className="text-xs text-slate-500 font-mono">Speed-to-Lead SLA</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">500+</div>
              <div className="text-xs text-slate-500 font-mono">Active Field Closers</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-1 shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-heading">99.99%</div>
              <div className="text-xs text-slate-500 font-mono">Edge Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. FINAL CTA BANNER (LIGHT ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>JOIN THE REVENUE VELOCITY REVOLUTION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Ready to transform your sales pipeline?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Experience the difference of a CRM designed for actual speed, mobile truth, and zero administrative delay.
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
