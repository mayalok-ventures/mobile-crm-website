"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Share2,
  MessageSquare,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  Smartphone,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  slaTime: string;
  icon: React.ElementType;
  description: string;
  cardData: {
    title: string;
    subtext: string;
    metrics: { label: string; value: string }[];
    statusPill: string;
    liveLog: string;
  };
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "ingest",
    stepNumber: "01",
    title: "Sub-2s Webhook Ingestion",
    tagline: "Zero Lead Drop-off",
    badge: "Meta • Google • Webhooks",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slaTime: "0.4s Ingestion",
    icon: Zap,
    description:
      "Captures high-intent leads milliseconds after they submit a form across Meta Ads, Google Ads, website popups, or property portals.",
    cardData: {
      title: "Inbound Meta Lead Form Ingested",
      subtext: "Campaign: Q3 High-Ticket Expansion (ID: #LD-94821)",
      metrics: [
        { label: "Lead Name", value: "Rajesh Oberoi" },
        { label: "Phone", value: "+91 98201 •••••" },
        { label: "Budget Tier", value: "₹45L - ₹60L" },
        { label: "Source", value: "Meta Ads Instant Form" },
      ],
      statusPill: "⚡ Ingested via Edge Webhook in 380ms",
      liveLog: "POST /api/v1/webhooks/meta-lead -> 200 OK (Cryptographic HMAC verified)",
    },
  },
  {
    id: "route",
    stepNumber: "02",
    title: "Intelligent Round-Robin",
    tagline: "Right Closer, Instantly",
    badge: "Smart Skill & Geo Routing",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    slaTime: "0.6s Assignment",
    icon: Share2,
    description:
      "Instantly matches the account with the highest-performing available closer based on geography, budget tier, language, and current quota.",
    cardData: {
      title: "Automated Round-Robin Rule Executed",
      subtext: "Routing Matrix: High-Ticket Real Estate Squad (North Zone)",
      metrics: [
        { label: "Assigned Rep", value: "Aditya Verma (Senior Closer)" },
        { label: "Rep Workload", value: "3 Active Deals (82% Win-Rate)" },
        { label: "Routing Latency", value: "140ms" },
        { label: "Escalation Timer", value: "5 min SLA Armed" },
      ],
      statusPill: "🎯 Rep Mobile Push Triggered",
      liveLog: "ROUTER: Matched rule 'Tier-1 High Ticket' -> Assigned Rep #Rep-104",
    },
  },
  {
    id: "whatsapp",
    stepNumber: "03",
    title: "1-Tap WhatsApp Dispatch",
    tagline: "Instant Personalized Outreach",
    badge: "Official Meta Cloud API",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    slaTime: "1.2s Delivery",
    icon: MessageSquare,
    description:
      "The closer receives a push notification and dispatches a verified WhatsApp proposal with brochure attachment in a single tap.",
    cardData: {
      title: "WhatsApp Interactive Template Dispatched",
      subtext: "Sender: Sahyak Verified Official Business Line",
      metrics: [
        { label: "Recipient", value: "Rajesh Oberoi (+91 98201...)" },
        { label: "Attached Asset", value: "Villa_Brochure_Q3.pdf (2.4MB)" },
        { label: "Message Status", value: "Delivered & Read (Double-Blue)" },
        { label: "Closer Action", value: "1-Tap Mobile Trigger" },
      ],
      statusPill: "💬 WhatsApp Template Read by Prospect",
      liveLog: "WHATSAPP_API: Template 'proposal_high_ticket' delivered in 1.1s",
    },
  },
  {
    id: "close",
    stepNumber: "04",
    title: "Live Pipeline Velocity & Win",
    tagline: "Revenue Recorded",
    badge: "Automated Deal Telemetry",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    slaTime: "< 48h Cycle",
    icon: Trophy,
    description:
      "Stage progresses automatically from 'Contacted' to 'Proposal Sent' to 'Won'. Real-time revenue telemetry updates the manager dashboard.",
    cardData: {
      title: "Deal Closed & Commission Logged",
      subtext: "Pipeline Stage: CLOSED WON (Deal #DL-4820)",
      metrics: [
        { label: "Deal Value", value: "₹52,00,000" },
        { label: "Total Speed-to-Lead", value: "1 min 14 sec" },
        { label: "Commission Earned", value: "₹1,04,000" },
        { label: "Manager Telemetry", value: "Synced to Cloudflare Edge" },
      ],
      statusPill: "🏆 Closed Won • Zero Drop-off",
      liveLog: "PIPELINE: Moved from 'Negotiation' to 'Closed Won' (Revenue Verified)",
    },
  },
];

export const SpeedToLeadWorkflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  return (
    <div className="w-full">
      {/* Horizontal Step Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative border cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white border-slate-800 shadow-xl shadow-slate-900/10 scale-[1.02]"
                  : "bg-white text-slate-700 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/70"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-slate-800 text-emerald-400 border border-slate-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {step.slaTime}
                </span>
              </div>

              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                Step {step.stepNumber}
              </div>
              <div
                className={`font-bold font-heading text-sm sm:text-base mb-1 ${
                  isActive ? "text-white" : "text-slate-900"
                }`}
              >
                {step.title}
              </div>
              <div
                className={`text-xs truncate ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {step.tagline}
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeStepIndicator"
                  className="absolute -bottom-1 left-6 right-6 h-1 bg-emerald-500 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Interactive Sandbox Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="obsidian-panel rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Context & Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>STEP {activeStep.stepNumber} EXECUTION ENGINE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight leading-snug">
                {activeStep.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeStep.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-second webhook execution with zero queue lag</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated deduplication and phone format normalization</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-400 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Eliminates 99% of speed-to-lead drop-off</span>
                </div>
              </div>

              {/* Navigation Indicator */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() =>
                    setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length)
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  Step {activeStepIndex + 1} of {WORKFLOW_STEPS.length}
                </span>
              </div>
            </div>

            {/* Right Column: Simulated Live Telemetry Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
                {/* Header of Simulated Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white font-heading">
                      {activeStep.cardData.title}
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {activeStep.cardData.subtext}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold">
                    {activeStep.cardData.statusPill}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  {activeStep.cardData.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80"
                    >
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                        {m.label}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-100 truncate">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Live Console Log */}
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-[11px] text-emerald-400/90 flex items-center gap-2 overflow-x-auto">
                  <span className="text-slate-500 select-none">&gt;</span>
                  <span className="truncate">{activeStep.cardData.liveLog}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
