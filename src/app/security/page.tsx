"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Database,
  Key,
  Server,
  FileCheck2,
  Users,
  EyeOff,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe2,
  FileText,
} from "lucide-react";

interface SecurityLayer {
  step: string;
  title: string;
  subtitle: string;
  tag: string;
  detail: string;
  specs: string[];
}

const SECURITY_LAYERS: SecurityLayer[] = [
  {
    step: "01",
    title: "Edge Transport Perimeter",
    subtitle: "TLS 1.3 & DDoS Defenses",
    tag: "EDGE ENCRYPTED",
    detail: "Every webhook packet from Meta, Google, and your website is cryptographically verified via HMAC-SHA256 signatures at Cloudflare edge nodes before reaching our API servers.",
    specs: [
      "Strict TLS 1.3 encryption for all data in transit",
      "Cryptographic HMAC-SHA256 webhook signature validation",
      "Global edge rate-limiting and DDoS mitigation",
    ],
  },
  {
    step: "02",
    title: "Strict Multi-Tenant Isolation",
    subtitle: "Zero Shared Memory Data Leaks",
    tag: "LOGICALLY ISOLATED",
    detail: "Customer lead databases are logically separated using Row-Level Security (RLS) policies. No user or tenant can ever query or access records from another organization.",
    specs: [
      "PostgreSQL Row-Level Security (RLS) enforcement",
      "Dedicated schema and partition isolation options",
      "Zero cross-tenant data exposure in AI parsing pipelines",
    ],
  },
  {
    step: "03",
    title: "Storage Cryptographic Vault",
    subtitle: "AES-256 Envelope Encryption",
    tag: "REST ENCRYPTION",
    detail: "All customer phone numbers, voice recordings, and commercial contract PDFs are encrypted at rest using AES-256 keys managed through hardware security modules.",
    specs: [
      "AES-256 GCM encryption for database disks and blob storage",
      "Customer-managed encryption key (CMEK) options for Enterprise",
      "Automated daily encrypted backups with Point-in-Time recovery",
    ],
  },
  {
    step: "04",
    title: "Granular RBAC Execution Client",
    subtitle: "Anti-Theft Data Masking",
    tag: "RBAC ENFORCED",
    detail: "Field sales agents only access deals assigned directly to them. Customer phone numbers and emails can be masked to prevent unauthorized database scraping.",
    specs: [
      "Role-Based Access Control: Executive, Branch Manager, Closer",
      "Anti-leak phone number and email data masking",
      "Immutable audit trail logging every user view and export",
    ],
  },
];

const COMPLIANCE_ITEMS = [
  {
    title: "India DPDP Act 2023 Compliant",
    detail: "Strict consent tracking, explicit purpose limitation, and automated data principal erasure workflows.",
  },
  {
    title: "SOC 2 Type II Infrastructure Alignment",
    detail: "Rigorous operational controls covering security, confidentiality, availability, and processing integrity.",
  },
  {
    title: "GDPR Data Residency & Sovereignty",
    detail: "Full support for EU/UK and Indian data residency options with zero third-party telemetry leakage.",
  },
  {
    title: "Zero Cross-Tenant Data Training",
    detail: "Your proprietary customer records, voice notes, and proposals are never used to train shared public AI models.",
  },
];

export default function SecurityPage() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const activeLayer = SECURITY_LAYERS[activeLayerIndex];

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
          1. SECURITY HERO SECTION (100% LIGHT & AIRY)
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
            <span>ENTERPRISE DATA GOVERNANCE &amp; PRIVACY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Bank-grade security. <br />
            <span className="brand-gradient-text">Zero data leakage.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            How Sahyak protects mission-critical sales pipelines across wealth advisory firms, real estate developers, and high-growth enterprise squads.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. INTERACTIVE 4-LAYER SECURITY VAULT ARCHITECTURE (SOFT SURFACE #F8FAFC)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Architectural Defense
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              The 4-Tier Security Vault Architecture.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore how every lead record, customer phone number, and commercial document is protected from perimeter to database rest.
            </p>
          </div>

          {/* Security Vault Architecture Animation Video */}
          <div className="max-w-5xl mx-auto rounded-2xl bg-white p-4 sm:p-8 border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="relative w-full aspect-[1672/941] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center select-none">
              <video
                src="/videos/security-vault-architecture.mp4"
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

          {/* 4-Layer Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto">
            {SECURITY_LAYERS.map((layer, idx) => {
              const isActive = idx === activeLayerIndex;

              return (
                <button
                  key={layer.step}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? "bg-blue-50/80 text-slate-900 border-[#0084ff] shadow-md shadow-blue-500/10 scale-[1.02]"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-blue-100 text-[#0084ff] border border-blue-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      LAYER {layer.step}
                    </span>
                    <Lock className={`w-3.5 h-3.5 ${isActive ? "text-[#0084ff]" : "text-slate-400"}`} />
                  </div>

                  <div
                    className={`font-bold font-heading text-sm sm:text-base leading-snug mb-1 ${
                      isActive ? "text-[#0084ff]" : "text-slate-900"
                    }`}
                  >
                    {layer.title}
                  </div>

                  <div className="text-xs text-slate-500 line-clamp-1">
                    {layer.subtitle}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeLayerIndicatorLight"
                      className="absolute -bottom-1 left-4 right-4 h-1 bg-[#0084ff] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Layer Deep Dive Blueprint (100% Light Surface) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-6 sm:p-10 text-slate-900 max-w-6xl mx-auto shadow-xl space-y-6 border border-slate-200/90"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-[#0084ff] font-bold">
                    SECURITY SPECIFICATION // LAYER {activeLayer.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                    {activeLayer.title}
                  </h3>
                </div>

                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0084ff] text-xs font-mono font-bold">
                  {activeLayer.tag}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeLayer.detail}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="text-xs font-mono uppercase text-slate-500 font-bold">
                  Technical Safeguards &amp; Verification
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeLayer.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. REGULATORY COMPLIANCE & DATA SOVEREIGNTY (PURE WHITE #FFFFFF)
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
              Governance Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Data Privacy &amp; Regulatory Compliance.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We design our infrastructure to satisfy enterprise legal audits, financial regulator frameworks, and Indian data sovereignty standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {COMPLIANCE_ITEMS.map((item) => (
              <div
                key={item.title}
                className="saas-card p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0084ff] border border-blue-200 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-11">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. FINAL CTA BANNER (LIGHT ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>ENTERPRISE DEDICATED VAULT AVAILABLE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Need a custom compliance review?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Our solutions architects can walk your security and legal team through our DPA, tenant isolation models, and encryption keys.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-pill-brand text-white px-8 py-3.5 font-extrabold text-sm shadow-lg w-full sm:w-auto"
                >
                  <span>Request Security Architecture Review</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="https://crm.sahyak.com/signup/"
                  className="btn-pill-secondary px-7 py-3.5 font-semibold text-sm w-full sm:w-auto"
                >
                  Start 14-Day Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
