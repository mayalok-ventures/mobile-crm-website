"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  FileSpreadsheet,
  Zap,
  Clock,
  Shuffle,
  Users2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export const WhyCoreSetu: React.FC = () => {
  const [activeView, setActiveView] = useState<"both" | "old" | "coresetu">("both");

  const oldWayItems = [
    {
      title: "Fragmented Excel & Google Sheets",
      desc: "Leads sit in offline sheets or CSV dumps without instant notification or accountability.",
      icon: FileSpreadsheet,
    },
    {
      title: "Manual & Unclear Assignment",
      desc: "Managers manually paste numbers into group chats, causing confusion and duplicate outreach.",
      icon: Shuffle,
    },
    {
      title: "Delayed Follow-ups & Lost SLAs",
      desc: "Hot ad inquiries go cold after hours of delay before an agent finally makes contact.",
      icon: Clock,
    },
    {
      title: "Scattered WhatsApp Chats",
      desc: "Customer chat history stays locked on personal agent phones without team visibility.",
      icon: XCircle,
    },
  ];

  const coresetuWayItems = [
    {
      title: "Instant Multi-Channel Capture",
      desc: "Meta Lead Ads, website webhooks, and WhatsApp inquiries sync straight into your pipeline.",
      icon: Zap,
    },
    {
      title: "Automated Round-Robin Routing",
      desc: "Leads are assigned immediately to available agents with instant alerts and ownership locks.",
      icon: Layers,
    },
    {
      title: "Sub-Minute Response SLAs",
      desc: "Track agent first-contact speed in real-time with automated SLA escalation alerts.",
      icon: Clock,
    },
    {
      title: "Unified Team CRM & Hierarchy",
      desc: "Complete visibility into stage progression, follow-up logs, and individual conversion rates.",
      icon: Users2,
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-cyan-300">
            <span>OPERATIONAL TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Your leads shouldn&apos;t disappear between{" "}
            <span className="text-gradient-cyan">spreadsheets, WhatsApp, and delays</span>.
          </h2>
          <p className="text-base text-slate-400">
            Compare the friction of manual sales processes against the speed of an automated sales operating system.
          </p>

          {/* View Filter Switcher on Mobile/Tablet */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-white/10 mt-4 md:hidden">
            <button
              onClick={() => setActiveView("both")}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                activeView === "both" ? "bg-white/10 text-white" : "text-slate-400"
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setActiveView("old")}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                activeView === "old" ? "bg-rose-950/80 text-rose-300 border border-rose-500/30" : "text-slate-400"
              }`}
            >
              Old Way
            </button>
            <button
              onClick={() => setActiveView("coresetu")}
              className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                activeView === "coresetu" ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30" : "text-slate-400"
              }`}
            >
              CoreSetu
            </button>
          </div>
        </div>

        {/* Split Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* THE OLD WAY (Problem State) */}
          {(activeView === "both" || activeView === "old") && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-slate-950/70 border border-rose-500/20 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-6 border-b border-rose-500/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
                      The Old Way
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">High Leakage • Friction</span>
                </div>

                <div className="space-y-4">
                  {oldWayItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-4 rounded-2xl bg-rose-950/10 border border-rose-500/10 flex items-start gap-3.5"
                      >
                        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-xs text-rose-400/80 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Result: Slower response times and unrecovered marketing spend.</span>
              </div>
            </motion.div>
          )}

          {/* THE CORESETU WAY (Success State) */}
          {(activeView === "both" || activeView === "coresetu") && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-slate-950/80 border border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.08)]"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-6 border-b border-cyan-500/20 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]" />
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                      The CoreSetu Way
                    </span>
                  </div>
                  <span className="text-xs text-cyan-400 font-medium">Automated • Real-Time</span>
                </div>

                <div className="space-y-4">
                  {coresetuWayItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors flex items-start gap-3.5"
                      >
                        <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-cyan-500/20 text-xs text-cyan-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Result: Predictable lead response and clear pipeline visibility.</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
