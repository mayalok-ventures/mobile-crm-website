"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Check,
  Zap,
  Sliders,
  Workflow,
  Compass,
} from "lucide-react";

export const CompetitivePositioning: React.FC = () => {
  const customEasing = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      data-analytics-section="positioning"
      className="py-16 lg:py-24 bg-white border-b border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* ─────────────────────────────────────────────────────────────
            1. SECTION HEADER (RESTRAINED, EDITORIAL, CONCISE)
        ───────────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-[#0077ff]" />
            <span className="font-heading uppercase tracking-wider text-[11px] text-slate-600">
              Architectural Positioning
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-[1.15]"
          >
            Every CRM category makes a trade-off.{" "}
            <span className="text-slate-500 font-normal block sm:inline">
              SAHYAK was built for the space between them.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: customEasing }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Enterprise systems offer deep governance but introduce administrative complexity.
            Basic tools are simple to adopt but can reach operational limits.
            Vertical CRMs specialize deeply but can be difficult to adapt.
            Sahyak is engineered at the intersection.
          </motion.p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. THE THREE CATEGORY TENSIONS (FACTUAL, DEFENSIBLE)
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 relative">
          {/* 01: ENTERPRISE CRM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15, ease: customEasing }}
            className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">01 / CATEGORY</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 text-slate-700 border border-slate-300/50">
                  Depth vs. Complexity
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Enterprise CRM
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  High governance, heavy operational overhead
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>Comprehensive data models with extensive customization capabilities.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>Often requires dedicated administrators and prolonged implementation cycles.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span>Desktop-oriented interfaces can create logging friction for active sales reps.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>TRADE-OFF</span>
                <span className="font-semibold text-slate-700">Governance → Administrative Friction</span>
              </div>
            </div>
          </motion.div>

          {/* 02: BASIC CRM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.22, ease: customEasing }}
            className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">02 / CATEGORY</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200/60">
                  Simplicity vs. Scale
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Basic CRM
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Fast onboarding, potential capability ceilings
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-1.5 shrink-0" />
                  <span>Intuitive visual boards that individual reps can start using in minutes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-1.5 shrink-0" />
                  <span>Frequently relies on third-party connector tools for multi-step automations.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-1.5 shrink-0" />
                  <span>Can encounter operational limits as lead volumes, teams, and SLAs expand.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>TRADE-OFF</span>
                <span className="font-semibold text-slate-700">Simplicity → Operational Limits</span>
              </div>
            </div>
          </motion.div>

          {/* 03: VERTICAL CRM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.29, ease: customEasing }}
            className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between space-y-6 hover:border-slate-300 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">03 / CATEGORY</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-100/80 text-violet-800 border border-violet-200/60">
                  Specialization vs. Agility
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Vertical CRM
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Deep niche terminology, constrained adaptability
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/80 mt-1.5 shrink-0" />
                  <span>Pre-tailored out of the box for a specific industry pipeline.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/80 mt-1.5 shrink-0" />
                  <span>Workflows can be rigid when expanding into new channels or business models.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500/80 mt-1.5 shrink-0" />
                  <span>Customizations outside the predefined industry flow can be difficult to implement.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>TRADE-OFF</span>
                <span className="font-semibold text-slate-700">Specialization → Workflow Rigidity</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. DIRECTIONAL TRANSITION CONDUIT
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center gap-1.5 -my-4 sm:-my-6 text-slate-400">
          <div className="h-6 w-px bg-gradient-to-b from-slate-200 to-slate-300" />
          <div className="p-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-[#0077ff]">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500">
            The Balancing Point
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. THE SAHYAK PLATFORM RESOLUTION (THE SWEET SPOT)
        ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.35, ease: customEasing }}
          className="rounded-2xl border-2 border-blue-200/90 bg-gradient-to-b from-blue-50/30 via-white to-white p-6 sm:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Subtle top gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0084ff] via-[#6366f1] to-[#7c3aed]" />

          <div className="space-y-8">
            {/* Resolution Headline Block */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-200/80">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0077ff] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#0077ff]" />
                  <span>THE SAHYAK PLATFORM ARCHITECTURE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  Engineered for operational balance.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  Sahyak combines the usability frontline sales teams require with the operational depth and workflow adaptability modern businesses demand.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 self-start md:self-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100/70 border border-blue-200 text-xs font-semibold text-slate-800">
                  <Check className="w-3.5 h-3.5 text-[#0077ff] font-bold" />
                  <span>Simplicity + Depth + Adaptability</span>
                </div>
              </div>
            </div>

            {/* Three Pillars Counter-Balancing the Three Tensions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Pillar 1: Usability (vs Enterprise Complexity) */}
              <div className="space-y-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0077ff] font-heading">
                  <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0077ff] flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>LOW-FRICTION ADOPTION</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Usable for Frontline Teams
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mobile-friendly interface, streamlined messaging actions, and rapid lead updates designed so field reps log activity without administrative friction.
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Streamlined for fast frontline adoption</span>
                </div>
              </div>

              {/* Pillar 2: Operational Depth (vs Basic Limitations) */}
              <div className="space-y-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#6366f1] font-heading">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 text-[#6366f1] flex items-center justify-center shrink-0">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <span>BUILT-IN OPERATIONAL DEPTH</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Serious for Revenue Operations
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-channel lead capture, automated round-robin assignment, team activity tracking, and role-based permissions integrated directly into the core platform.
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Built-in operational automation</span>
                </div>
              </div>

              {/* Pillar 3: Adaptability (vs Vertical Rigidity) */}
              <div className="space-y-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7c3aed] font-heading">
                  <div className="w-6 h-6 rounded-md bg-violet-50 text-[#7c3aed] flex items-center justify-center shrink-0">
                    <Workflow className="w-3.5 h-3.5" />
                  </div>
                  <span>MODULAR ADAPTABILITY</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  Flexible as Business Evolves
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pre-configured industry blueprints that provide immediate workflow relevance, combined with custom deal stages and fields that adapt as your business expands.
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Adapts as sales models evolve</span>
                </div>
              </div>
            </div>

            {/* Bottom Summary Bar */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <Compass className="w-4 h-4 text-[#0077ff] shrink-0" />
                <span>
                  <strong>The Sahyak Principle:</strong> Software should empower frontline execution while providing clear operational visibility.
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-500 shrink-0">
                Architectural Fit &bull; Operational Balance
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
