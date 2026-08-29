"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Check,
  Zap,
  Building2,
  Lock,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Smartphone,
  HelpCircle,
  Layers,
  Sparkles,
  Plus,
  Minus,
  Users,
  Activity,
  Database,
  ArrowUpRight,
} from "lucide-react";

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

interface AddonModule {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  icon: React.ElementType;
}

const ADDON_MODULES: AddonModule[] = [
  {
    id: "ingestion",
    name: "High-Velocity Ingestion",
    tagline: "Sub-2s automated webhook pipeline & lead deduplication.",
    targetAudience: "For Marketing & Agencies",
    monthlyPrice: 1499,
    annualPrice: 1199,
    features: [
      "Unlimited Meta & Google Ads webhook listeners",
      "Instant round-robin lead distribution",
      "Real-time phone/email duplicate merging",
      "Automated WhatsApp proposal, deck & brochure trigger engine",
    ],
    icon: Zap,
  },
  {
    id: "telemetry",
    name: "Enterprise Telemetry",
    tagline: "Multi-tier hierarchy, SLA tracking & territory dashboards.",
    targetAudience: "For Multi-Branch Sales Teams",
    monthlyPrice: 2999,
    annualPrice: 2399,
    features: [
      "Advanced multi-tier RBAC (Executive -> Manager -> Agent)",
      "Managerial command desk & real-time leaderboard",
      "SLA breach notifications & response time audit",
      "Territory P&L performance graphs",
    ],
    icon: Activity,
  },
  {
    id: "vault",
    name: "Data Vault & Compliance",
    tagline: "Dedicated isolation, extended logs & custom export APIs.",
    targetAudience: "For Finance & Healthcare",
    monthlyPrice: 4999,
    annualPrice: 3999,
    features: [
      "Dedicated multi-tenant database schema isolation",
      "7-year immutable compliance audit trail",
      "Custom REST & Webhook export data APIs",
      "Strict field masking & anti-theft RBAC locking",
    ],
    icon: Database,
  },
];

const FAQS = [
  {
    question: "How are Industry & Usage Add-on Modules billed?",
    answer:
      "Expansion modules are billed as a flat workspace add-on, regardless of how many users you have. For example, if you have 5 reps and add 'High-Velocity Ingestion', you pay ₹999/user for seats plus a single ₹1,499/workspace fee.",
  },
  {
    question: "How do team seats work? Can I add or remove reps anytime?",
    answer:
      "Yes. You can invite new sales reps or remove inactive seats at any time directly from your settings. Billing is automatically pro-rated down to the exact day on your next cycle.",
  },
  {
    question: "What happens after my 14-day free trial ends?",
    answer:
      "During your 14-day trial, you get full access to the Mobile Field App and all core capabilities. At the end of the trial, simply select your desired seat count and optional modules to continue. No data is lost.",
  },
  {
    question: "Can I export my data if I ever decide to cancel?",
    answer:
      "Absolutely. You maintain 100% data sovereignty. Workspace admins can export all deals, customer logs, contact history, and notes as standard CSV/JSON files anytime with a single click.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [userSeats, setUserSeats] = useState(3);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["ingestion"]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const basePricePerUser = isAnnual ? 799 : 999;
  const seatsSubtotal = userSeats * basePricePerUser;
  
  const addonsSubtotal = selectedAddons.reduce((acc, addonId) => {
    const mod = ADDON_MODULES.find((m) => m.id === addonId);
    if (!mod) return acc;
    return acc + (isAnnual ? mod.annualPrice : mod.monthlyPrice);
  }, 0);

  const estimatedMonthlyTotal = seatsSubtotal + addonsSubtotal;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION & BILLING TOGGLE
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-22 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-slate-900" />
            <span>TRANSPARENT VALUE-BASED PRICING</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Pay for the value you extract.
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6"
          >
            Start with our core engine. Add industry-specific data pipelines only when your volume demands it.
          </motion.p>

          {/* Billing Switch Toggle with Fluid layoutId Physics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: customEasing }}
            className="mt-8 sm:mt-10 flex items-center justify-center gap-3 px-2"
          >
            <div className="inline-flex items-center p-1 sm:p-1.5 bg-slate-100 rounded-full border border-slate-200/80 max-w-full relative">
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                  !isAnnual ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {!isAnnual && (
                  <motion.div
                    layoutId="activeBillingPill"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-sm -z-10"
                    transition={{ duration: 0.45, ease: customEasing }}
                  />
                )}
                <span className="relative z-10">Monthly Billing</span>
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
                  isAnnual ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isAnnual && (
                  <motion.div
                    layoutId="activeBillingPill"
                    className="absolute inset-0 bg-slate-900 rounded-full shadow-sm -z-10"
                    transition={{ duration: 0.45, ease: customEasing }}
                  />
                )}
                <span className="relative z-10">Annual Billing</span>
                <span className="relative z-10 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE CORE LICENSE CARD (Centered, Clean)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto">
            {/* Primary Base License Card */}
            <div className="saas-card p-8 sm:p-12 relative border-2 border-slate-900 shadow-xl bg-white overflow-hidden">
              
              {/* Top Pill Tag */}
              <div className="absolute top-0 right-0 bg-slate-900 text-white font-mono text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl">
                FOUNDATION CORE
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                    BASE PLATFORM SEAT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight mt-1">
                    Core Sahyak License
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Everything an active dealmaker needs to capture leads, make 1-tap calls, and execute sales from their phone.
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading">
                        ₹{basePricePerUser}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ user / month</span>
                    </div>
                    {isAnnual && (
                      <span className="text-[11px] font-semibold text-emerald-600 block mt-1">
                        Billed annually (₹{basePricePerUser * 12}/user/yr)
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full">
                    14-Day Trial
                  </span>
                </div>

                {/* Included Core Capabilities */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading">
                    Included in Base License:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Full Mobile Field App (iOS/Android)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Unified Desktop Command View</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Standard WhatsApp 1-Tap Triggers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Up to 1,000 Active Pipeline Leads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Offline Field Operation & Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Voice Note Audio Transcription</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-4">
                  <Link
                    href="https://crm.sahyak.com/signup/"
                    className="btn-pill-primary w-full text-center justify-center text-sm py-3.5 font-bold shadow-md"
                  >
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    No credit card required • Instant setup in under 60 seconds
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. INDUSTRY & USAGE ADD-ON MODULES (The Scalability Engine)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#FAFAFA] border-y border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              EXPANSION ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Custom Expansion Modules
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Toggle specific automation modules to tailor Sahyak to your exact sales floor requirements.
            </p>
          </div>

          {/* 3 Toggleable Module Cards Grid */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch"
          >
            {ADDON_MODULES.map((mod) => {
              const isSelected = selectedAddons.includes(mod.id);
              const price = isAnnual ? mod.annualPrice : mod.monthlyPrice;
              const Icon = mod.icon;

              return (
                <motion.div
                  key={mod.id}
                  variants={cardItemVariants}
                  onClick={() => toggleAddon(mod.id)}
                  className={`saas-card p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-2 border-slate-900 bg-white shadow-lg scale-[1.02]"
                      : "border border-slate-200/80 bg-white/70 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Header Row with Icon & Checkbox */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                        {mod.targetAudience}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 font-heading tracking-tight mt-1">
                        {mod.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {mod.tagline}
                      </p>
                    </div>

                    {/* Price Pill */}
                    <div className="py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-baseline justify-between font-mono text-xs">
                      <span className="text-slate-500 font-sans">Workspace Fee</span>
                      <span className="font-bold text-slate-900">
                        + ₹{price} <span className="text-[10px] font-normal text-slate-500">/ mo</span>
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 text-xs text-slate-700">
                      {mod.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Bottom Toggle Status */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? "text-slate-900" : "text-slate-400"}>
                      {isSelected ? "✓ Module Active" : "+ Click to Include"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono uppercase">
                      Workspace Add-on
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>

          {/* Interactive Live Investment Estimator Bar */}
          <div className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* User Seat Stepper */}
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                  Configure Your Sales Floor:
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-900 font-heading">Active Rep Seats:</span>
                  <div className="inline-flex items-center gap-2 border border-slate-200 rounded-lg p-1 bg-slate-50">
                    <button
                      onClick={() => setUserSeats(Math.max(1, userSeats - 1))}
                      className="w-7 h-7 rounded bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center font-bold text-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm text-slate-900">
                      {userSeats}
                    </span>
                    <button
                      onClick={() => setUserSeats(userSeats + 1)}
                      className="w-7 h-7 rounded bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center font-bold text-xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0">
                <span className="text-xs text-slate-500 font-medium block">
                  Estimated Total Monthly Investment:
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-0.5">
                  ₹{estimatedMonthlyTotal.toLocaleString("en-IN")}{" "}
                  <span className="text-xs font-normal text-slate-500 font-mono">/ mo</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Includes {userSeats} {userSeats === 1 ? "seat" : "seats"} + {selectedAddons.length} expansion {selectedAddons.length === 1 ? "module" : "modules"}
                </span>
              </div>

              <Link
                href="https://crm.sahyak.com/signup/"
                className="btn-pill-primary text-xs py-3 px-6 font-semibold w-full md:w-auto text-center justify-center shrink-0"
              >
                <span>Deploy This Setup</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>

            </div>
          </div>

        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. CUSTOM ENTERPRISE BANNER
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-slate-800 px-3 py-1 rounded-full">
                ENTERPRISE & DEVELOPER CONGLOMERATES
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading leading-snug">
                Handling over 10,000 leads a month? Need custom ERP deployment?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Get dedicated Cloudflare tenant isolation, on-premise data residency, custom SAP/Salesforce bridges, and a 24/7 dedicated solutions engineering lead.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-slate-900 px-7 py-3.5 rounded-full text-xs font-bold hover:bg-slate-100 transition-all shadow-lg shrink-0"
            >
              <span>Contact Solutions Team</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. FAQ ACCORDION
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#FAFAFA] border-t border-slate-200/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
              COMMON QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Pricing Questions
            </h3>
            <p className="text-slate-600 text-sm">
              Everything you need to know about our billing model and expansion modules.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="saas-card rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-slate-900" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: customEasing }}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </motion.section>

    </div>
  );
}
