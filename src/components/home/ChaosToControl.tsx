"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  PhoneOff,
  ShieldAlert,
  Zap,
  Smartphone,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const ChaosToControl: React.FC = () => {
  const [viewState, setViewState] = useState<"chaos" | "control">("chaos");

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Side: Editorial Story */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading inline-block">
              The Operational Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
              High-ticket leads die in the hand-off.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              When an ad lead comes in, every minute of delay increases the likelihood of a lost sale. Manual CSV downloads, unassigned WhatsApp chats, and disconnected spreadsheets create silent revenue leakage.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
            <div className="text-xs font-bold text-slate-900 font-heading">
              Why Traditional Sales Workflows Fail:
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>Ad leads sit untouched in portal CSVs for hours before manual distribution.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>Reps lack pre-filled WhatsApp proposals, leading to inconsistent communication.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>Managers have zero live telemetry on call response times or deal progression.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Reality Switcher */}
        <div className="lg:col-span-7 space-y-6">
          {/* Toggle Control */}
          <div className="flex items-center justify-between gap-4 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewState("chaos")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewState === "chaos"
                  ? "bg-white text-rose-900 shadow-sm border border-rose-200 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-rose-500" />
              <span>Spreadsheet &amp; Manual Chaos</span>
            </button>

            <button
              onClick={() => setViewState("control")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewState === "control"
                  ? "bg-white text-[#0084ff] shadow-sm border border-blue-200 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="w-4 h-4 text-[#0084ff]" />
              <span>Sahyak Automated Pipeline</span>
            </button>
          </div>

          {/* Transformation Content Cards */}
          <AnimatePresence mode="wait">
            {viewState === "chaos" ? (
              <motion.div
                key="view-chaos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/40 rounded-2xl border-2 border-rose-200 text-slate-900 space-y-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-rose-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      <TrendingDown className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                        Manual Spreadsheets &amp; Unassigned Inquiries
                      </h3>
                      <p className="text-xs text-rose-700 font-medium">
                        Typical Speed-to-Lead: <strong>45 mins – 4 hours</strong>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                    STATUS: LEAKING
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-rose-600 text-xs font-bold font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>DELAYED INGEST</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs font-heading">
                      Ad Leads Wait in CSVs
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Portals require manual downloads before reps get notified, letting buyer intent cool off.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-bold font-mono">
                      <PhoneOff className="w-3.5 h-3.5" />
                      <span>NO ACCOUNTABILITY</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs font-heading">
                      Zero SLA Tracking
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Managers have no visibility into whether reps called in 5 minutes or 5 days.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-rose-700 text-xs font-bold font-mono">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>DATA THEFT RISK</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs font-heading">
                      Unprotected Customer Lists
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Spreadsheets get copied and downloaded to personal laptops with zero audit trails.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-100/70 border border-rose-200 flex items-center justify-between text-xs text-rose-950">
                  <span>Ad spend is wasted when lead response takes hours.</span>
                  <button
                    onClick={() => setViewState("control")}
                    className="font-bold text-rose-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>See Sahyak Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view-control"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/40 rounded-2xl border-2 border-blue-200 text-slate-900 space-y-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0084ff] flex items-center justify-center font-bold">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                        Sub-2s Webhook Routing &amp; 1-Tap Mobile Dispatch
                      </h3>
                      <p className="text-xs text-[#0084ff] font-medium">
                        Typical Speed-to-Lead: <strong>&lt; 90 seconds</strong>
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 text-[#0084ff] border border-blue-300">
                    STATUS: OPTIMIZED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-[#0084ff] text-xs font-bold font-mono">
                      <Zap className="w-3.5 h-3.5" />
                      <span>INSTANT INGESTION</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs font-heading">
                      Automatic Webhook Capture
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Meta &amp; Google ad leads are instantly deduplicated and assigned to available closers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-[#6366f1] text-xs font-bold font-mono">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>1-TAP OUTREACH</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs font-heading">
                      Verified WhatsApp Proposals
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Closers send official PDF brochures and pricing in a single tap without saving numbers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-[#7c3aed] text-xs font-bold font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>DATA PROTECTION</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs font-heading">
                      Role-Based Access (RBAC)
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Contact numbers are masked, exports locked, and actions tracked with immutable logs.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center justify-between text-xs text-slate-800">
                  <span>Zero lead leakage with verified response monitoring.</span>
                  <span className="font-mono text-xs font-bold text-[#0084ff]">
                    Deploy in 60s
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
