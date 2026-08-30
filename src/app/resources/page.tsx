"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileCode2,
  Building2,
  DollarSign,
  Megaphone,
  Laptop,
  Check,
  Copy,
  ArrowRight,
  Sparkles,
  Download,
  Code2,
  CheckCircle2,
  Play,
} from "lucide-react";

interface IndustryResource {
  id: string;
  name: string;
  icon: React.ElementType;
  masterclassTitle: string;
  duration: string;
  description: string;
  keyPlaybookSteps: string[];
  samplePayload: string;
}

const INDUSTRY_RESOURCES: IndustryResource[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    masterclassTitle: "The Sub-90s Speed-to-Lead Real Estate Masterclass",
    duration: "14 Min Architecture Walkthrough",
    description:
      "Learn how premium developers and brokerages configure sub-2s Meta webhook capture, auto-assign site visit cabs, and send pre-filled WhatsApp brochures with floor plans.",
    keyPlaybookSteps: [
      "Meta Ads instant form webhook HMAC integration",
      "Dynamic PDF brochure and floor plan generator",
      "Round-robin closer routing with site visit calendar push",
    ],
    samplePayload: `// POST https://crm.sahyak.com/api/v1/webhooks/real-estate
{
  "lead_source": "Meta_Instant_Form_Ad",
  "project_name": "Godrej Palm Retreat",
  "unit_preference": "3BHK Luxury Penthouse",
  "budget_inr": 4800000,
  "client_name": "Vikram Malhotra",
  "phone": "+91 98201 99481",
  "auto_route": {
    "squad": "North_NCR",
    "send_whatsapp_brochure": true,
    "sla_timeout_seconds": 90
  }
}`,
  },
  {
    id: "finance",
    name: "Finance & Wealth",
    icon: DollarSign,
    masterclassTitle: "Encrypted Wealth Advisory & Loan Sanction Playbook",
    duration: "18 Min Architecture Walkthrough",
    description:
      "A complete technical blueprint for managing high-net-worth portfolio inquiries, automated CIBIL pre-qualification scoring, and encrypted loan sanction stages.",
    keyPlaybookSteps: [
      "Instant KYC document upload on WhatsApp Cloud API",
      "Automated credit score rating & bank partner routing",
      "Role-Based phone number masking for data theft prevention",
    ],
    samplePayload: `// POST https://crm.sahyak.com/api/v1/webhooks/finance-inquiry
{
  "applicant_name": "Rajesh Singhal",
  "phone": "+91 98112 44321",
  "inquiry_type": "Home_Loan_Balance_Transfer",
  "requested_aum_inr": 12500000,
  "cibil_score": 784,
  "compliance": {
    "dpdp_consent_logged": true,
    "rbac_mask_phone": true
  }
}`,
  },
  {
    id: "agencies",
    name: "Agencies & Media",
    icon: Megaphone,
    masterclassTitle: "Performance Marketing Agency High-Ticket Retainer Pipeline",
    duration: "12 Min Architecture Walkthrough",
    description:
      "How top digital agencies automate brief intake forms, deliver audit pitch decks within 2 hours, and close quarterly retainer contracts with zero deal stalls.",
    keyPlaybookSteps: [
      "Discovery form intake with automated ad spend categorization",
      "Dynamic Scope of Work (SOW) PDF proposal dispatch",
      "Retainer renewal countdown and deal health monitoring",
    ],
    samplePayload: `// POST https://crm.sahyak.com/api/v1/webhooks/agency-brief
{
  "brand_name": "Organic Greens D2C",
  "monthly_ad_spend_inr": 1500000,
  "target_channel": "Meta_and_Google_Performance",
  "requested_retainer_tier": "Growth_Squad",
  "closer_assigned": "Pooja Nair",
  "auto_generate_audit_deck": true
}`,
  },
  {
    id: "saas",
    name: "SaaS & Tech",
    icon: Laptop,
    masterclassTitle: "Product-Led Demo to Enterprise Pilot Velocity",
    duration: "16 Min Architecture Walkthrough",
    description:
      "A deep dive into converting product signup spikes into 7-figure enterprise contracts with automated intent alerts and multi-stakeholder mapping.",
    keyPlaybookSteps: [
      "Product usage spike trigger to sales closer WhatsApp alert",
      "Enterprise security pack and SOC 2 whitepaper dispatch",
      "Multi-seat pricing tier contract generation",
    ],
    samplePayload: `// POST https://crm.sahyak.com/api/v1/webhooks/product-intent-spike
{
  "workspace_id": "ws_94812",
  "company_domain": "fintechcorp.io",
  "active_seats": 85,
  "spike_event": "Invited_Security_Officer",
  "deal_action_recommended": "Nudge_Enterprise_Pilot",
  "assigned_ae": "Aditya Verma"
}`,
  },
];

export default function ResourcesPage() {
  const [activeResourceIndex, setActiveResourceIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeResource = INDUSTRY_RESOURCES[activeResourceIndex];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeResource.samplePayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span>PLAYBOOKS, API SCHEMAS &amp; MASTERCLASSES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Sales velocity playbooks <br />
            <span className="brand-gradient-text">&amp; webhook blueprints.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Explore pre-built integration schemas, copy-paste webhook code snippets, and masterclass blueprints engineered for high-ticket industries.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. INDUSTRY PLAYBOOK BLUEPRINT EXPLORER (SOFT SURFACE #F8FAFC)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Industry Ribbon */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 gap-1.5">
              {INDUSTRY_RESOURCES.map((res, idx) => {
                const Icon = res.icon;
                const isActive = idx === activeResourceIndex;

                return (
                  <button
                    key={res.id}
                    onClick={() => setActiveResourceIndex(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-[#0084ff] shadow-md border border-blue-200 font-bold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0084ff]" : "text-slate-500"}`} />
                    <span>{res.name} Blueprint</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Blueprint Content Container (100% Light Surfaces) */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeResource.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Masterclass & Key Steps */}
                <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] text-xs font-bold font-heading border border-blue-200">
                      <Play className="w-3 h-3 text-[#0084ff]" />
                      <span>{activeResource.duration}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      {activeResource.masterclassTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {activeResource.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Key Execution Workflows
                    </div>
                    {activeResource.keyPlaybookSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="https://crm.sahyak.com/signup/"
                    className="btn-pill-brand text-white w-full text-center text-xs py-3 font-bold shadow-md"
                  >
                    <span>Deploy This Blueprint (Free 14-Day Trial)</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
                  </Link>
                </div>

                {/* Right Column: Copyable Webhook Code Sandbox (Light Clean Panel) */}
                <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 text-slate-900 space-y-4 shadow-xl border border-slate-200/90">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#0084ff] font-bold">
                      <Code2 className="w-4 h-4" />
                      <span>LIVE WEBHOOK INGESTION PAYLOAD</span>
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors cursor-pointer border border-slate-200"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-500" />
                          <span>Copy Payload</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-800 overflow-x-auto leading-relaxed whitespace-pre">
                    {activeResource.samplePayload}
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                    <span>Compatible with cURL, Node.js, Python, &amp; Postman</span>
                    <span className="text-[#0084ff] font-mono font-semibold">HMAC-SHA256 Ready</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. FINAL CTA BANNER (LIGHT ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>PRE-CONFIGURED BLUEPRINTS AVAILABLE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Start with a blueprint tailored to your pipeline.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Choose your industry and deploy pre-configured deal stages, schema fields, and 1-tap WhatsApp proposals in 60 seconds.
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
