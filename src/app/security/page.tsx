"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Database,
  Users,
  Activity,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Server,
  Key,
  Globe,
  Download,
  Check,
  Sparkles,
} from "lucide-react";

const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: customEasing },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: customEasing },
  },
};

const FLOW_STEPS = [
  {
    step: "01",
    title: "Meta / Ad Webhook",
    subtitle: "Inbound Lead Ingestion",
    tag: "TLS 1.3 ENCRYPTED",
    detail: "Webhook payload validated via cryptographic HMAC-SHA256 signature.",
  },
  {
    step: "02",
    title: "Cloudflare Edge WAF",
    subtitle: "Web Application Firewall",
    tag: "DDOS MITIGATION",
    detail: "Automated rate limiting, anomaly inspection & zero-day packet filtering.",
  },
  {
    step: "03",
    title: "Partitioned Database",
    subtitle: "AES-256 Storage Engine",
    tag: "TENANT ISOLATION",
    detail: "Zero cross-workspace leakage with logical row-level security (RLS).",
  },
  {
    step: "04",
    title: "Authenticated App",
    subtitle: "Field Agent Execution",
    tag: "RBAC ENFORCED",
    detail: "Granular permission masking: export locked, screenshot disabled.",
  },
];

export default function SecurityPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. THE TRUST HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-22 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Pill Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            <span>ENTERPRISE DATA SOVEREIGNTY & ISOLATION</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Your leads. Your data. <br className="hidden sm:inline" />
            Absolute isolation.
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6"
          >
            Sahyak CRM is engineered with bank-grade encryption and strict multi-tenant data isolation. We ensure your proprietary sales pipelines remain completely impenetrable.
          </motion.p>

          {/* ─────────────────────────────────────────────────────────────
              HERO VISUAL: Minimalist Structural Grid with Shield
          ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: customEasing }}
            className="mt-14 max-w-3xl mx-auto"
          >
            <div className="relative rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-10 shadow-xl overflow-hidden">
              
              {/* Unbreakable Structural Blueprint Grid */}
              <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-5 text-center">
                
                {/* Shield Anchor Icon */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl border-4 border-white">
                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                <div className="space-y-1 max-w-md">
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                    Cryptographic Tenant Boundary Active
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    AES-256-GCM • TLS 1.3 • Row-Level Logical Partitioning
                  </p>
                </div>

                {/* Telemetry Checkpoints */}
                <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-700">
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>0% Cross-Tenant Leakage</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Immutable Audit Trails</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SOC 2 Type II Compliant</span>
                  </span>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE CORE SECURITY PILLARS (2x2 Bento Grid Layout)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#FAFAFA] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              SECURITY PILLARS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Four Layers of Uncompromising Defense
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Every sales lead, financial note, and customer phone number is guarded by deterministic security primitives.
            </p>
          </div>

          {/* 2x2 Bento Grid */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          >
            {/* Pillar 1: Strict Data Isolation */}
            <motion.div
              variants={cardItemVariants}
              className="saas-card-interactive p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Database className="w-6 h-6" />
                </div>
                
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  PILLAR 01 // DATA PARTITIONING
                </span>

                <h3 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
                  Strict Data Isolation
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Zero cross-tenant data leakage. Your customer records, deal pipelines, and proprietary lead data are walled off in dedicated logical partitions. Nobody sees your workspace but you.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Row-Level Security (RLS)</span>
                <span className="text-slate-900 font-bold">100% Partitioned</span>
              </div>
            </motion.div>

            {/* Pillar 2: End-to-End Encryption */}
            <motion.div
              variants={cardItemVariants}
              className="saas-card-interactive p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  PILLAR 02 // CRYPTOGRAPHY
                </span>

                <h3 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
                  End-to-End Encryption
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  AES-256 encryption at rest and TLS 1.3 in transit. Every WhatsApp trigger, API webhook, and customer detail is cryptographically secured.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>AES-256-GCM at Rest</span>
                <span className="text-slate-900 font-bold">TLS 1.3 Verified</span>
              </div>
            </motion.div>

            {/* Pillar 3: Granular Access Control (RBAC) */}
            <motion.div
              variants={cardItemVariants}
              className="saas-card-interactive p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  PILLAR 03 // ACCESS GOVERNANCE
                </span>

                <h3 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
                  Granular Access Control (RBAC)
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  You control the keys. Restrict your sales agents from exporting data, taking screenshots, or viewing leads outside their assigned territory.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Anti-Theft Lead Locking</span>
                <span className="text-slate-900 font-bold">Export Prohibited</span>
              </div>
            </motion.div>

            {/* Pillar 4: 99.99% Uptime & Redundancy */}
            <motion.div
              variants={cardItemVariants}
              className="saas-card-interactive p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  PILLAR 04 // HIGH AVAILABILITY
                </span>

                <h3 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
                  99.99% Uptime & Redundancy
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Deployed on enterprise-edge infrastructure. Continuous database backups and automated failover ensure your sales engine never goes dark.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Cloudflare Global Edge</span>
                <span className="text-slate-900 font-bold">99.99% SLA</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. INFRASTRUCTURE & COMPLIANCE DIAGRAM (Minimalist Flow-Chart)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading">
              ZERO-TRUST ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              How a Lead Travels Through Sahyak
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Every transaction passes through 4 layers of cryptographic verification before reaching your agent&apos;s mobile phone.
            </p>
          </div>

          {/* Minimalist Tailwind Flow Diagram */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {FLOW_STEPS.map((step, idx) => (
                <div key={step.step} className="relative flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm space-y-4">
                  
                  {/* Step Tag */}
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                      {step.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 font-heading">
                      {step.title}
                    </h4>
                    <span className="text-xs font-semibold text-slate-500 block">
                      {step.subtitle}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1.5">
                      {step.detail}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED STEP</span>
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Diagram Legend */}
            <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center font-mono text-xs text-slate-500">
              ⚡ End-to-End Latency: &lt; 280ms from Ad Click to Encrypted Agent Notification
            </div>

          </div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. PENETRATION TESTING & AUDITING BANNER
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                CONTINUOUS THREAT MONITORING
              </span>
            </div>

            <div className="max-w-3xl space-y-3">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading leading-snug">
                Continuous Security Auditing.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Our architecture undergoes regular vulnerability scanning, external penetration tests, and protocol reviews to neutralize zero-day threats before they emerge.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 text-emerald-400" /> Automated Dependency Auditing
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 text-emerald-400" /> Daily Encrypted Snapshot Backups
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <Check className="w-4 h-4 text-emerald-400" /> Webhook Replay Protection
              </span>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. CONVERSION FOOTER
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#FAFAFA] border-t border-slate-200/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
            <span>READY FOR ENTERPRISE DEPLOYMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight max-w-2xl mx-auto">
            Build your sales machine on an unbreakable foundation.
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Experience bank-grade security, anti-theft lead protection, and zero-leakage data governance across your entire organization.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://crm.sahyak.com/signup/"
              className="btn-pill-primary text-sm py-3.5 px-8 font-semibold w-full sm:w-auto shadow-md"
            >
              <span>Deploy Securely Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="btn-pill-secondary text-sm py-3.5 px-7 font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Download Security Whitepaper</span>
            </Link>
          </div>

          <div className="text-xs text-slate-400 pt-2 font-mono">
            SOC 2 Type II Compliant • 99.99% Contractual SLA • Dedicated Isolation
          </div>

        </div>
      </motion.section>

    </div>
  );
}
