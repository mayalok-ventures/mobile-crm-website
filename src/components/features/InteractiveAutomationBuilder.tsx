"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Clock,
  Mic,
  Eye,
  Send,
  Bell,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  FileText,
  Sliders,
} from "lucide-react";

interface AutomationTrigger {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  automatedActions: {
    title: string;
    detail: string;
    latency: string;
    icon: React.ElementType;
  }[];
  liveTelemetry: string;
}

const AUTOMATION_TRIGGERS: AutomationTrigger[] = [
  {
    id: "meta-lead",
    name: "Meta / Ad Webhook Submitted",
    category: "Inbound Capture",
    icon: Zap,
    description:
      "When a high-intent prospect submits an Instant Form on Meta Ads, Google Ads, or a landing page webhook.",
    automatedActions: [
      {
        title: "Cryptographic HMAC Verification & Deduplication",
        detail: "Verifies payload signature and checks phone/email against existing accounts in 140ms.",
        latency: "0.14s",
        icon: CheckCircle2,
      },
      {
        title: "Intelligent Round-Robin Closer Assignment",
        detail: "Matches lead to top closer based on territory, budget tier, and active quota.",
        latency: "0.24s",
        icon: Share2,
      },
      {
        title: "1-Tap WhatsApp Verified Proposal Pre-Filled",
        detail: "Closer receives mobile push with pre-filled brochure & personalized proposal ready to send.",
        latency: "0.80s",
        icon: Send,
      },
    ],
    liveTelemetry: "TRIGGER: Meta Webhook #LD-9481 -> Routed to Aditya V. (North Squad) in 380ms",
  },
  {
    id: "stalled-lead",
    name: "Lead Untouched for 3 Minutes",
    category: "SLA Protection",
    icon: Clock,
    description:
      "When an inbound lead has not received an initial WhatsApp outreach or call within 180 seconds.",
    automatedActions: [
      {
        title: "Urgent Mobile Device Buzzer",
        detail: "Fires high-priority push alert with audible ring on the assigned closer's smartphone.",
        latency: "Instant",
        icon: Bell,
      },
      {
        title: "Automated Secondary Re-Assignment",
        detail: "If still untouched at 5 mins, automatically shifts deal to the next available online rep.",
        latency: "5.00m",
        icon: Share2,
      },
      {
        title: "Manager SLA Breach Notification",
        detail: "Logs incident on manager command desk and updates team response SLA metrics.",
        latency: "Real-time",
        icon: CheckCircle2,
      },
    ],
    liveTelemetry: "TRIGGER: SLA Warning #LD-9420 -> Mobile Buzzer Triggered • Escalation Armed",
  },
  {
    id: "voice-note",
    name: "Closer Audio Voice Note Spoken",
    category: "Field AI Telemetry",
    icon: Mic,
    description:
      "When a field rep records a quick audio note right after stepping out of a client meeting.",
    automatedActions: [
      {
        title: "Speech-to-Text Transcription",
        detail: "Transcribes Hindi, English, and Hinglish audio with 99.2% entity recognition accuracy.",
        latency: "1.20s",
        icon: Sparkles,
      },
      {
        title: "Budget & Requirement Parsing",
        detail: "Extracts deal terms (e.g. ₹55L budget, 3BHK unit preference, Tuesday site visit).",
        latency: "0.40s",
        icon: FileText,
      },
      {
        title: "Automatic Pipeline Stage Advance",
        detail: "Updates CRM deal stage from 'Contacted' to 'Site Visit Scheduled' and syncs calendar.",
        latency: "Instant",
        icon: CheckCircle2,
      },
    ],
    liveTelemetry: "TRIGGER: Audio Note (14s) -> Extracted ₹55L Budget • Stage Moved to 'Site Visit'",
  },
  {
    id: "page-view",
    name: "Client Revisits Proposal 3x",
    category: "Buyer Intent Radar",
    icon: Eye,
    description:
      "When an active prospect re-opens the shared digital proposal or PDF brochure multiple times.",
    automatedActions: [
      {
        title: "Live Intent Spike Alert",
        detail: "Notifies closer: 'Rajesh Oberoi is currently viewing Section 3: Commercial Terms'.",
        latency: "0.20s",
        icon: Bell,
      },
      {
        title: "Recommended Closing Action",
        detail: "Prompts closer with 1-tap WhatsApp nudge: 'Hi Rajesh, noticed you had a question on terms?'.",
        latency: "Instant",
        icon: Send,
      },
      {
        title: "Closing Probability Boost",
        detail: "Increases deal health score from 65% to 92% on manager revenue forecast.",
        latency: "Real-time",
        icon: Sparkles,
      },
    ],
    liveTelemetry: "TRIGGER: Proposal View Spike -> Prospect viewing terms • Rep alerted for instant close",
  },
];

export const InteractiveAutomationBuilder: React.FC = () => {
  const [activeTriggerId, setActiveTriggerId] = useState<string>("meta-lead");
  const activeTrigger =
    AUTOMATION_TRIGGERS.find((t) => t.id === activeTriggerId) ||
    AUTOMATION_TRIGGERS[0];

  return (
    <div className="w-full space-y-8">
      {/* Trigger Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {AUTOMATION_TRIGGERS.map((trig) => {
          const Icon = trig.icon;
          const isActive = trig.id === activeTriggerId;

          return (
            <button
              key={trig.id}
              onClick={() => setActiveTriggerId(trig.id)}
              className={`p-4 sm:p-5 rounded-xl text-left transition-all duration-200 relative border cursor-pointer ${
                isActive
                  ? "bg-blue-50/80 text-slate-900 border-[#0084ff] shadow-md shadow-blue-500/10 scale-[1.02]"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isActive
                      ? "bg-[#0084ff] text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-blue-100 text-[#0084ff] border border-blue-200"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {trig.category}
                </span>
              </div>

              <div
                className={`font-bold font-heading text-sm mb-1 ${
                  isActive ? "text-[#0084ff]" : "text-slate-900"
                }`}
              >
                {trig.name}
              </div>

              <div className="text-xs text-slate-500 line-clamp-2">
                {trig.description}
              </div>

              {isActive && (
                <motion.div
                  layoutId="automationTriggerIndicatorLight"
                  className="absolute -bottom-1 left-4 right-4 h-1 bg-[#0084ff] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Trigger Execution Display (100% Light Surface) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTrigger.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 relative overflow-hidden space-y-6 border border-slate-200/90 shadow-xl"
        >
          {/* Header of Active Workflow */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs font-mono text-[#0084ff] font-bold">
                ACTIVE WORKFLOW ENGINE // ZERO HUMAN DELAY
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
                When &quot;{activeTrigger.name}&quot; Fires:
              </h4>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0084ff] text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
              <span>Automated Execution</span>
            </span>
          </div>

          {/* 3 Sequential Automated Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeTrigger.automatedActions.map((action, idx) => {
              const ActionIcon = action.icon;
              return (
                <div
                  key={action.title}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 relative group hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                      Action 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-[#0084ff] bg-white px-2 py-0.5 rounded border border-slate-200">
                      {action.latency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-[#0084ff] flex items-center justify-center shrink-0">
                      <ActionIcon className="w-3 h-3" />
                    </div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm font-heading leading-snug">
                      {action.title}
                    </h5>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {action.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Simulated Edge Telemetry Console */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-[#0084ff] flex items-center gap-2 overflow-x-auto">
            <span className="text-slate-400 select-none">&gt;</span>
            <span className="truncate">{activeTrigger.liveTelemetry}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
