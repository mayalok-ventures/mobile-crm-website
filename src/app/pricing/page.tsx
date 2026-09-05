"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Zap,
  Building2,
  Smartphone,
  ChevronDown,
  Users,
  MessageSquare,
  Bot,
  Phone,
  Database,
} from "lucide-react";

interface PlanItem {
  id: string;
  name: string;
  category: "solo" | "company";
  forText: string;
  monthlyPrice: number;
  annualPrice: number;
  usersLimit: string;
  leadsLimit: string;
  storage: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

const SOLO_PLANS: PlanItem[] = [
  {
    id: "solo-starter",
    name: "Solo Starter",
    category: "solo",
    forText: "For starting agents & small operators",
    monthlyPrice: 499,
    annualPrice: 4990,
    usersLimit: "1 user",
    leadsLimit: "1K active leads",
    storage: "2 GB",
    features: [
      "Core CRM & lead management",
      "Follow-ups & reminders",
      "Pipeline & basic dashboard",
      "Basic WhatsApp actions",
      "Industry workspace",
      "Mobile / PWA access",
      "Basic reports · 2 GB storage",
    ],
    ctaText: "Start 14-Day Free Trial",
    ctaHref: "https://crm.sahyak.com/signup/",
  },
  {
    id: "solo-pro",
    name: "Solo Pro",
    category: "solo",
    popular: true,
    badge: "MOST POPULAR",
    forText: "For serious solo professionals",
    monthlyPrice: 999,
    annualPrice: 9990,
    usersLimit: "1 user",
    leadsLimit: "5K active leads",
    storage: "10 GB",
    features: [
      "Everything in Starter",
      "Advanced WhatsApp CRM",
      "Meta Lead integration",
      "Advanced follow-up workflow",
      "Site Visits / industry workflow",
      "Automation & advanced analytics",
      "AI assistance & campaigns",
      "Multiple integrations · 10 GB storage",
    ],
    ctaText: "Start Solo Pro Trial",
    ctaHref: "https://crm.sahyak.com/signup/",
  },
  {
    id: "solo-max",
    name: "Solo Max",
    category: "solo",
    forText: "For high-volume professionals",
    monthlyPrice: 1499,
    annualPrice: 14990,
    usersLimit: "1 user",
    leadsLimit: "15K active leads",
    storage: "25 GB",
    features: [
      "Everything in Pro",
      "Higher AI allowance",
      "Advanced automation & campaigns",
      "Advanced integrations & analytics",
      "Higher API / lead limits",
      "Priority support",
      "25 GB storage",
    ],
    ctaText: "Start Solo Max Trial",
    ctaHref: "https://crm.sahyak.com/signup/",
  },
];

const COMPANY_PLANS: PlanItem[] = [
  {
    id: "company-starter",
    name: "Company Starter",
    category: "company",
    forText: "For small agencies & teams",
    monthlyPrice: 2499,
    annualPrice: 24990,
    usersLimit: "5 users",
    leadsLimit: "10K active leads",
    storage: "25 GB",
    features: [
      "Complete CRM & lead assignment",
      "Follow-ups & pipeline",
      "WhatsApp CRM",
      "Basic automation & analytics",
      "Team dashboard",
      "Roles & permissions",
      "Meta Lead integration · 25 GB storage",
    ],
    ctaText: "Start Company Trial",
    ctaHref: "https://crm.sahyak.com/signup/",
  },
  {
    id: "company-growth",
    name: "Company Growth",
    category: "company",
    popular: true,
    badge: "MOST POPULAR",
    forText: "For growing sales teams",
    monthlyPrice: 4999,
    annualPrice: 49990,
    usersLimit: "15 users",
    leadsLimit: "50K active leads",
    storage: "100 GB",
    features: [
      "Everything in Company Starter",
      "Round-robin & advanced lead distribution",
      "Advanced WhatsApp & campaigns",
      "Advanced automation & analytics",
      "AI assistance",
      "Site Visits · Projects / Inventory",
      "Advanced permissions & manager dashboards",
      "Meta + webhooks · Audit visibility · 100 GB",
    ],
    ctaText: "Start Growth Trial",
    ctaHref: "https://crm.sahyak.com/signup/",
  },
  {
    id: "company-scale",
    name: "Company Scale",
    category: "company",
    forText: "For developers & large operations",
    monthlyPrice: 9999,
    annualPrice: 99990,
    usersLimit: "40 users",
    leadsLimit: "200K active leads",
    storage: "250 GB",
    features: [
      "Everything in Growth",
      "Advanced property & inventory operations",
      "Multiple projects & advanced routing",
      "Advanced automation, AI & campaigns",
      "Advanced APIs / integrations",
      "Advanced security & audit controls",
      "Custom workflow configuration",
      "250 GB storage · Business support",
    ],
    ctaText: "Start Scale Trial",
    ctaHref: "https://crm.sahyak.com/signup/",
  },
];

const SOLO_COMPARISON_ROWS = [
  { capability: "User Allowance", starter: "1 User", pro: "1 User", max: "1 User" },
  { capability: "Active Lead Capacity", starter: "1,000", pro: "5,000", max: "15,000" },
  { capability: "Cloud Storage", starter: "2 GB", pro: "10 GB", max: "25 GB" },
  { capability: "WhatsApp CRM", starter: "Basic 1-Tap", pro: "Advanced CRM", max: "Advanced CRM" },
  { capability: "Meta Lead Ingestion", starter: "Manual / CSV", pro: "Native Webhooks", max: "Native Webhooks" },
  { capability: "Follow-up Workflows", starter: "Reminders", pro: "Advanced Pipeline", max: "Multi-Stage Workflows" },
  { capability: "Site Visits & Workspaces", starter: "Workspace Included", pro: "Full Workflow", max: "Full Workflow" },
  { capability: "Automation & Analytics", starter: "Basic Dashboard", pro: "Advanced Analytics", max: "Custom Advanced Analytics" },
  { capability: "AI Assistance & Campaigns", starter: "—", pro: "Included (Standard)", max: "Included (High Allowance)" },
  { capability: "Integration & API Limits", starter: "Standard", pro: "Standard Integrations", max: "Higher API Limits" },
  { capability: "Support Level", starter: "Standard Email", pro: "Standard Support", max: "Priority Support" },
];

const COMPANY_COMPARISON_ROWS = [
  { capability: "User Allowance Included", starter: "5 Users", growth: "15 Users", scale: "40 Users" },
  { capability: "Additional User Price", starter: "₹399 / user / mo", growth: "₹299 / user / mo", scale: "₹249 / user / mo" },
  { capability: "Active Lead Capacity", starter: "10,000", growth: "50,000", scale: "200,000" },
  { capability: "Cloud Storage", starter: "25 GB", growth: "100 GB", scale: "250 GB" },
  { capability: "Lead Distribution", starter: "Team Assignment", growth: "Round-Robin & Geo", scale: "Multi-Project Routing" },
  { capability: "WhatsApp CRM & Campaigns", starter: "Team WhatsApp", growth: "Campaigns & Templates", scale: "Enterprise Operations" },
  { capability: "Meta Webhook Ingestion", starter: "Included", growth: "Real-Time Edge", scale: "Dedicated Pipelines" },
  { capability: "Projects & Inventory", starter: "—", growth: "Site Visits & Inventory", scale: "Multi-Project Operations" },
  { capability: "Permissions & Audit Logs", starter: "Roles & Permissions", growth: "Manager Desks & RBAC", scale: "Security & Audit Controls" },
  { capability: "Custom Workflow Configuration", starter: "—", growth: "Standard Blueprints", scale: "Custom Configuration" },
  { capability: "Support SLA", starter: "Standard Team Support", growth: "Guided Onboarding", scale: "Dedicated Business Support" },
];

const FAQS = [
  {
    q: "Is there a setup fee or long-term contract?",
    a: "No. Sahyak is 100% pay-as-you-go with zero setup fees or mandatory consulting retainers. You can change or cancel your subscription at any time.",
  },
  {
    q: "How does the annual discount work?",
    a: "When you choose Annual Billing, you pay for 10 months and receive 12 months of access—saving approximately 17% (2 months free) on any Solo or Company plan.",
  },
  {
    q: "What defines an 'active lead'?",
    a: "Active leads are contacts currently moving through your open pipeline stages. Closed, won, lost, or archived leads do not count against your active lead limit.",
  },
  {
    q: "Can I add more users to my Company plan?",
    a: "Yes. Company workspaces can scale with additional user seats billed monthly: Company Starter (₹399/user), Company Growth (₹299/user), and Company Scale (₹249/user).",
  },
  {
    q: "How are WhatsApp API messages billed?",
    a: "Sahyak provides native CRM WhatsApp functionality out of the box. Official Meta WhatsApp Cloud API conversation charges are billed directly at Meta's standard rates on actual usage with zero markup from Sahyak.",
  },
  {
    q: "Can I import existing contacts from Excel or another CRM?",
    a: "Yes. Sahyak includes 1-click CSV and Excel import utilities with automated column mapping and duplicate detection.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<"all" | "solo" | "company">("all");
  const [comparisonCategory, setComparisonCategory] = useState<"solo" | "company">("company");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const customEasing = [0.16, 1, 0.3, 1] as const;

  const sectionRevealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: customEasing },
    },
  };

  const renderCard = (plan: PlanItem) => {
    const effectiveMonthly = isAnnual
      ? Math.round(plan.annualPrice / 12)
      : plan.monthlyPrice;

    return (
      <div
        key={plan.id}
        className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 relative ${
          plan.popular
            ? "bg-white border-2 border-[#0084ff] shadow-xl md:scale-[1.02] z-10"
            : "bg-white border border-slate-200 shadow-sm hover:border-slate-300"
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full brand-gradient-bg text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-sm">
            {plan.badge || "MOST POPULAR"}
          </div>
        )}

        <div className="space-y-4">
          {/* Plan Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {plan.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5 min-h-[32px]">
                {plan.forText}
              </p>
            </div>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 capitalize">
              {plan.category}
            </span>
          </div>

          {/* Pricing Display */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                ₹{effectiveMonthly.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              {isAnnual ? (
                <span className="text-[#0077ff] font-semibold">
                  Billed ₹{plan.annualPrice.toLocaleString("en-IN")} / year (Save ~17%)
                </span>
              ) : (
                <span>Billed monthly</span>
              )}
            </div>
          </div>

          {/* Capacity Limits Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-semibold">
              <Users className="w-3 h-3 text-slate-500" />
              <span>{plan.usersLimit}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0077ff] border border-blue-200/60 text-xs font-mono font-semibold">
              <Zap className="w-3 h-3 text-[#0077ff]" />
              <span>{plan.leadsLimit}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200 text-xs font-mono">
              <Database className="w-3 h-3 text-slate-400" />
              <span>{plan.storage}</span>
            </span>
          </div>

          {/* Feature List */}
          <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#0084ff] shrink-0 mt-0.5 font-bold" />
                <span className={feature.startsWith("Everything in") ? "font-bold text-slate-900" : ""}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href={plan.ctaHref}
            className={`w-full text-center text-xs py-3 font-bold rounded-full transition-all ${
              plan.popular
                ? "btn-pill-brand text-white shadow-md block"
                : "btn-pill-secondary block border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {plan.ctaText}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0077ff] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% LIGHT & AIRY)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-22 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80">
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
            <span className="brand-gradient-text">Built to scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Choose the workspace that fits your business. Start with our 14-day full-feature trial on any plan. No credit card required.
          </motion.p>

          {/* Billing Toggle (Monthly / Annual) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: customEasing }}
            className="pt-2 flex items-center justify-center gap-3"
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
              <span>Yearly Billing</span>
              <span className="bg-blue-50 text-[#0084ff] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-blue-200">
                Save ~17% · 2 Months Free
              </span>
            </span>
          </motion.div>

          {/* Segment Filter (Solo / Company / All) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: customEasing }}
            className="pt-3 flex items-center justify-center"
          >
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All 6 Plans
              </button>
              <button
                onClick={() => setCategoryFilter("solo")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "solo"
                    ? "bg-white text-[#0077ff] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Solo (1 User)
              </button>
              <button
                onClick={() => setCategoryFilter("company")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === "company"
                    ? "bg-white text-[#0077ff] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Company &amp; Teams
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PRICING CARDS SECTION (SOLO & COMPANY ARCHITECTURE)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* SOLO CATEGORY */}
          {(categoryFilter === "all" || categoryFilter === "solo") && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0077ff] flex items-center justify-center font-bold">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      Solo Workspaces
                    </h2>
                    <p className="text-xs text-slate-500">
                      Designed for individual sales professionals, brokers, and independent consultants
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto">
                  1 User License Included
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {SOLO_PLANS.map(renderCard)}
              </div>
            </div>
          )}

          {/* COMPANY CATEGORY */}
          {(categoryFilter === "all" || categoryFilter === "company") && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#6366f1] flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      Company Workspaces
                    </h2>
                    <p className="text-xs text-slate-500">
                      Designed for fast-moving sales squads, agencies, and expanding operations
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-[#6366f1] border border-indigo-200 self-start sm:self-auto">
                  Multi-Seat Team Licenses (5–40 Users)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {COMPANY_PLANS.map(renderCard)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. USAGE & ADD-ONS (TRANSPARENT VARIABLE ECONOMICS)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 font-heading inline-block">
              Transparent Economics
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading">
              Usage &amp; Add-On Information
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              SAHYAK subscription pricing covers core CRM software, team workflows, and cloud storage. Third-party messaging and provider usage are billed transparently on actual consumption.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                WhatsApp Messaging
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full CRM functionality is included. Official Meta WhatsApp Cloud API conversation charges are billed directly at Meta&apos;s standard rates with zero markup from Sahyak.
              </p>
            </div>

            {/* AI Assistance */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-100 text-[#7c3aed] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                AI Assistance &amp; Audio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monthly AI usage allowance is included in Pro, Max, Growth, and Scale plans. Additional AI usage can be purchased as flexible credits whenever needed.
              </p>
            </div>

            {/* Calling & SMS */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0077ff] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                Calling &amp; Telephony
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click-to-call and telephony capabilities depend on your plan. Actual telecom provider minutes and SMS usage are billed separately by your chosen provider.
              </p>
            </div>

            {/* Extra Users */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-heading">
                Additional Team Seats
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Expand your Company workspace anytime: Company Starter (₹399/mo), Growth (₹299/mo), and Scale (₹249/mo) per additional user seat.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-slate-700 leading-relaxed">
            <strong>Important Note:</strong> Meta advertising spend is never included in SAHYAK subscription pricing. Third-party messaging, telephony, and AI provider charges apply based on actual usage.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. DETAILED FEATURE COMPARISON TABLE (RESPONSIVE)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading inline-block">
                Feature Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Compare Plan Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Detailed side-by-side comparison of capabilities across {comparisonCategory === "solo" ? "Solo" : "Company"} workspace tiers.
              </p>
            </div>

            {/* Comparison Category Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-slate-200/80 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setComparisonCategory("solo")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  comparisonCategory === "solo"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Compare Solo Plans
              </button>
              <button
                onClick={() => setComparisonCategory("company")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  comparisonCategory === "company"
                    ? "bg-white text-[#0077ff] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Compare Company Plans
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              {comparisonCategory === "solo" ? (
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[560px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3.5 px-5 text-xs font-bold text-slate-500 uppercase font-mono sticky-table-col bg-slate-50 border-r border-slate-200 sm:border-r-0">
                        Capability
                      </th>
                      <th className="py-3.5 px-5 font-bold text-slate-900">Solo Starter</th>
                      <th className="py-3.5 px-5 bg-blue-50/70 text-[#0084ff] font-bold border-x border-blue-200">
                        Solo Pro (Popular)
                      </th>
                      <th className="py-3.5 px-5 font-bold text-slate-900">Solo Max</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {SOLO_COMPARISON_ROWS.map((row) => (
                      <tr key={row.capability} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-5 font-medium text-slate-900 sticky-table-col bg-white border-r border-slate-200 sm:border-r-0">
                          {row.capability}
                        </td>
                        <td className="py-3.5 px-5">{row.starter}</td>
                        <td className="py-3.5 px-5 bg-blue-50/40 border-x border-blue-200/80 font-semibold text-slate-900">
                          {row.pro}
                        </td>
                        <td className="py-3.5 px-5">{row.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[580px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3.5 px-5 text-xs font-bold text-slate-500 uppercase font-mono sticky-table-col bg-slate-50 border-r border-slate-200 sm:border-r-0">
                        Capability
                      </th>
                      <th className="py-3.5 px-5 font-bold text-slate-900">Company Starter</th>
                      <th className="py-3.5 px-5 bg-blue-50/70 text-[#0084ff] font-bold border-x border-blue-200">
                        Company Growth (Popular)
                      </th>
                      <th className="py-3.5 px-5 font-bold text-slate-900">Company Scale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {COMPANY_COMPARISON_ROWS.map((row) => (
                      <tr key={row.capability} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-5 font-medium text-slate-900 sticky-table-col bg-white border-r border-slate-200 sm:border-r-0">
                          {row.capability}
                        </td>
                        <td className="py-3.5 px-5">{row.starter}</td>
                        <td className="py-3.5 px-5 bg-blue-50/40 border-x border-blue-200/80 font-semibold text-slate-900">
                          {row.growth}
                        </td>
                        <td className="py-3.5 px-5">{row.scale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. FREQUENTLY ASKED QUESTIONS (ACCORDION)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-white border-b border-slate-200/80"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers about workspace limits, billing cycles, and feature onboarding.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 cursor-pointer hover:border-slate-300 transition-colors"
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaqIndex === idx ? "rotate-180 text-[#0084ff]" : ""
                    }`}
                  />
                </div>
                {openFaqIndex === idx && (
                  <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 mt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          6. FINAL CONVERSION BANNER (LIGHT ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-lg">
            <div className="relative z-10 space-y-5 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>14-DAY FULL FEATURE ACCESS • NO CREDIT CARD REQUIRED</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Deploy your workspace in 60 seconds.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Experience high-velocity lead routing, instant WhatsApp closing, and pre-configured industry blueprints today.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="https://crm.sahyak.com/signup/"
                  className="btn-pill-brand text-white px-8 py-3.5 font-bold text-xs shadow-md w-full sm:w-auto"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-pill-secondary px-7 py-3.5 font-semibold text-xs w-full sm:w-auto"
                >
                  Contact Solutions Team
                </Link>
              </div>

              <p className="text-[11px] text-slate-400 font-mono pt-2">
                Industry workspaces available for Real Estate, Education, Financial Services, Solar, Healthcare, and High-Ticket Agencies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
