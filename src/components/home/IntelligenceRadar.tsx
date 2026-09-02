"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  AlertTriangle,
  Mic,
  Trophy,
  CheckCircle2,
  Zap,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Radar,
  Send,
  Calendar,
} from "lucide-react";

interface RadarSignal {
  id: string;
  title: string;
  type: "hot" | "risk" | "voice" | "win";
  icon: React.ElementType;
  badge: string;
  badgeStyle: string;
  leadName: string;
  detectedEvent: string;
  sahyakAction: string;
  impact: string;
  timestamp: string;
}

const RADAR_SIGNALS: RadarSignal[] = [
  {
    id: "sig-1",
    title: "High-Ticket Inbound Signal",
    type: "hot",
    icon: Flame,
    badge: "HIGH-INTENT INBOUND",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    leadName: "Vikram Malhotra (Apex Luxury)",
    detectedEvent: "Submitted inquiry form with ₹48L budget for 4BHK Penthouse via Meta Ads.",
    sahyakAction: "Bypassed general queue, auto-assigned to senior closer Aditya V., and armed 2-minute WhatsApp proposal SLA.",
    impact: "Closer dispatched verified PDF proposal in 1m 14s.",
    timestamp: "18s ago",
  },
  {
    id: "sig-2",
    title: "SLA Deal-Stall Warning",
    type: "risk",
    icon: AlertTriangle,
    badge: "SLA DEAL RISK",
    badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
    leadName: "Sunil Joshi (Joshi Exports)",
    detectedEvent: "No initial outreach logged 4 minutes after quote request was ingested.",
    sahyakAction: "Triggered priority mobile notification on closer's device and armed secondary manager escalation timer.",
    impact: "Prevented deal abandonment before prospect contacted another vendor.",
    timestamp: "2m ago",
  },
  {
    id: "sig-3",
    title: "Voice Note Deal Extraction",
    type: "voice",
    icon: Mic,
    badge: "AI AUDIO PARSING",
    badgeStyle: "bg-blue-50 text-[#0084ff] border-blue-200",
    leadName: "Dr. Arvind Rao (CarePlus)",
    detectedEvent: "Closer recorded a 14-second voice memo: 'Client approved ₹24L package, scheduled Tuesday site visit'.",
    sahyakAction: "AI parsed deal value, updated pipeline stage to 'Site Visit Confirmed', and scheduled calendar sync.",
    impact: "Saved 15 minutes of manual post-meeting CRM data entry.",
    timestamp: "12m ago",
  },
  {
    id: "sig-4",
    title: "Milestone Won & Edge Sync",
    type: "win",
    icon: Trophy,
    badge: "CLOSED WON EVENT",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    leadName: "Kavita Singhania (Logistics)",
    detectedEvent: "Advance token payment of ₹5,00,000 received via payment gateway webhook.",
    sahyakAction: "Moved deal to 'Closed Won', credited commission to rep leaderboard, and archived contract record.",
    impact: "Synced to executive revenue dashboard in real time.",
    timestamp: "24m ago",
  },
];

export const IntelligenceRadar: React.FC = () => {
  const [activeSignalId, setActiveSignalId] = useState<string>("sig-1");
  const activeSignal =
    RADAR_SIGNALS.find((s) => s.id === activeSignalId) || RADAR_SIGNALS[0];

  return (
    <div className="w-full space-y-8">
      {/* 4 Radar Signal Trigger Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {RADAR_SIGNALS.map((sig) => {
          const Icon = sig.icon;
          const isActive = sig.id === activeSignalId;

          return (
            <button
              key={sig.id}
              onClick={() => setActiveSignalId(sig.id)}
              className={`p-4 rounded-xl text-left transition-all duration-200 relative border cursor-pointer ${
                isActive
                  ? "bg-blue-50/80 text-slate-900 border-[#0084ff] shadow-md shadow-blue-500/10 ring-1 ring-[#0084ff]"
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
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${sig.badgeStyle}`}
                >
                  {sig.timestamp}
                </span>
              </div>

              <div
                className={`font-bold font-heading text-sm mb-1 ${
                  isActive ? "text-[#0084ff]" : "text-slate-900"
                }`}
              >
                {sig.title}
              </div>

              <div className="text-xs text-slate-500 truncate">
                {sig.leadName}
              </div>

              {isActive && (
                <motion.div
                  layoutId="radarActiveSignalLight"
                  className="absolute -bottom-1 left-4 right-4 h-1 bg-[#0084ff] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Signal HUD Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSignal.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 space-y-6 shadow-xl relative overflow-hidden border border-slate-200/90"
        >
          {/* Signal Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0084ff] font-bold">
                <Radar className="w-4 h-4 text-[#0084ff]" />
                <span>SIGNAL TELEMETRY REPORT</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {activeSignal.title} &bull; {activeSignal.leadName}
              </h4>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${activeSignal.badgeStyle}`}
            >
              {activeSignal.badge}
            </span>
          </div>

          {/* 3 Step Action Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                01. Detected Event
              </div>
              <div className="text-xs text-slate-800 leading-relaxed font-medium">
                {activeSignal.detectedEvent}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="text-[10px] font-mono text-[#0084ff] uppercase font-bold">
                02. Automated Sahyak Action
              </div>
              <div className="text-xs text-slate-800 leading-relaxed font-medium">
                {activeSignal.sahyakAction}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="text-[10px] font-mono text-emerald-800 uppercase font-bold">
                03. Revenue Outcome
              </div>
              <div className="text-xs text-slate-800 leading-relaxed font-medium">
                {activeSignal.impact}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
