"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  MessageSquare,
  PhoneOff,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const ChaosToControl: React.FC = () => {
  const [viewState, setViewState] = useState<"chaos" | "control">("chaos");

  return (
    <div className="w-full">
      {/* Interactive Toggle Switch Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0084ff] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ARCHITECTURAL TRANSFORMATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            Toggle the Reality of Sales Operations
          </h3>
        </div>

        {/* Interactive Mode Slider Switch */}
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 relative">
          <button
            onClick={() => setViewState("chaos")}
            className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewState === "chaos"
                ? "text-rose-900 bg-white shadow-md border border-rose-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>The Spreadsheet Chaos</span>
          </button>

          <button
            onClick={() => setViewState("control")}
            className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewState === "control"
                ? "text-[#0084ff] bg-white shadow-md border border-blue-200"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#0084ff]" />
            <span>The Sahyak Control Engine</span>
          </button>
        </div>
      </div>

      {/* Dynamic Animated Transformation Stage */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300">
        <AnimatePresence mode="wait">
          {viewState === "chaos" ? (
            /* ─── CHAOS STATE: SPREADSHEET & SCATTERED LOSS (LIGHT ROSE) ─── */
            <motion.div
              key="state-chaos"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-10 bg-gradient-to-br from-rose-50/90 via-slate-50 to-amber-50/50 border-2 border-rose-200/80 text-slate-900 space-y-8"
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-rose-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                      Manual Spreadsheets, Missed Calls &amp; Stalled WhatsApps
                    </h4>
                    <p className="text-xs text-rose-700 font-medium">
                      Average Speed-to-Lead: <strong>45 mins - 4 hours</strong> • Lead Drop-off: <strong>38%</strong>
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 font-mono text-xs font-bold border border-rose-300">
                  REVENUE LEAKAGE: HIGH
                </span>
              </div>

              {/* 3 Real-world Friction Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-xl bg-white border border-rose-200/90 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-rose-600 text-xs font-bold font-mono">
                    <Clock className="w-4 h-4" />
                    <span>DELAYED SPEED-TO-LEAD</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm font-heading">
                    Ad Leads Sit in CSVs for Hours
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Meta ad submissions wait for a manager to download CSVs, manually reformat, and email to reps. High-intent buyers grow cold.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-rose-200/90 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-600 text-xs font-bold font-mono">
                    <PhoneOff className="w-4 h-4" />
                    <span>NO REP ACCOUNTABILITY</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm font-heading">
                    Zero SLA or Follow-Up Visibility
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Managers have no way to know if reps called within 5 mins or 5 days. Deals die in silent WhatsApp chats without telemetry.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border-2 border-dashed border-rose-300 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-rose-700 text-xs font-bold font-mono">
                    <ShieldAlert className="w-4 h-4" />
                    <span>CLIENT DATA LEAKAGE</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm font-heading">
                    Reps Walk Away with Contact Lists
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Spreadsheet links get shared, downloaded to personal laptops, and stolen by departing sales agents with zero audit trail.
                  </p>
                </div>
              </div>

              {/* Callout Summary */}
              <div className="p-4 rounded-xl bg-rose-100/80 border border-rose-300/80 flex items-center justify-between gap-4 text-xs text-rose-950">
                <span className="font-medium">
                  Result: <strong>38% of your monthly marketing ad spend</strong> is lost before reps even say hello.
                </span>
                <button
                  onClick={() => setViewState("control")}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-900 text-white font-bold text-xs hover:bg-rose-800 transition-colors shrink-0 cursor-pointer"
                >
                  See Sahyak Fix &rarr;
                </button>
              </div>
            </motion.div>
          ) : (
            /* ─── CONTROL STATE: SAHYAK AUTOMATED COCKPIT (100% LIGHT & AIRY) ─── */
            <motion.div
              key="state-control"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-10 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 border-2 border-blue-200/80 text-slate-900 space-y-8"
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0084ff] flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                      Sub-2s Webhooks, 1-Tap WhatsApp &amp; Manager Telemetry
                    </h4>
                    <p className="text-xs text-[#0084ff] font-medium">
                      Average Speed-to-Lead: <strong>&lt; 90 seconds</strong> • Deal Catch Rate: <strong>99.8%</strong>
                    </p>
                  </div>
                </div>

                <span className="px-3.5 py-1 rounded-full bg-blue-100 text-[#0084ff] font-mono text-xs font-bold border border-blue-300">
                  PIPELINE RECOVERY: +38% SURGE
                </span>
              </div>

              {/* 3 Controlled Execution Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-xl bg-white border border-blue-200/80 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[#0084ff] text-xs font-bold font-mono">
                    <Zap className="w-4 h-4" />
                    <span>SUB-2S WEBHOOK INGEST</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm font-heading">
                    Instant Round-Robin Routing
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Meta &amp; Google ad leads are instantly deduplicated and routed directly to the active field closer&apos;s phone in under 2 seconds.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-blue-200/80 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[#6366f1] text-xs font-bold font-mono">
                    <Smartphone className="w-4 h-4" />
                    <span>1-TAP WHATSAPP DISPATCH</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm font-heading">
                    Pre-Filled Verified Proposals
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Closer taps once on mobile to send official PDF brochures and customized pricing without saving numbers or typing templates.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-blue-200/80 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 text-[#7c3aed] text-xs font-bold font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    <span>CRYPTOGRAPHIC ISOLATION</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm font-heading">
                    Zero-Theft Role Access (RBAC)
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customer phone numbers are masked, exports locked, and immutable audit logs record every deal action with zero data leakage.
                  </p>
                </div>
              </div>

              {/* Callout Summary */}
              <div className="p-4 rounded-xl bg-blue-100/70 border border-blue-300/80 flex items-center justify-between gap-4 text-xs text-slate-800">
                <span className="font-medium">
                  Result: <strong>Zero lead leakage</strong>, &lt; 90s speed-to-lead, and a 38% increase in qualified pipeline conversion.
                </span>
                <span className="text-xs font-mono font-bold text-[#0084ff] shrink-0">
                  Ready to deploy in 60s
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
