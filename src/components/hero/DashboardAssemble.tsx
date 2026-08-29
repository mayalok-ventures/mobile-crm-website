"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  BarChart2,
  Kanban,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Bell,
  MessageSquare,
} from "lucide-react";
import { initialKanbanLeads } from "@/lib/demo-data";

export const DashboardAssemble: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<"all" | "meta" | "whatsapp">("all");

  const leads = initialKanbanLeads.slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30, rotateX: shouldReduceMotion ? 0 : 8, rotateY: shouldReduceMotion ? 0 : -4 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.8,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000">
      {/* Ambient Radial Glow behind dashboard */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-cyan-500/10 rounded-3xl blur-2xl opacity-70 animate-pulse pointer-events-none" />

      {/* Demo watermark tag */}
      <div className="absolute -top-3 right-4 z-20 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
        <span>Interactive demo data</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative rounded-2xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.15)] overflow-hidden backdrop-blur-xl"
      >
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-4 h-4 rounded relative overflow-hidden bg-slate-950">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="CoreSetu Icon"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-slate-400 text-[11px] font-mono font-semibold">crm.coresetu.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 border border-white/5 text-[10px] text-slate-300">
              <Search className="w-3 h-3 text-slate-400" />
              <span>Search leads, pipelines...</span>
            </div>
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 text-slate-950 font-bold text-[9px] flex items-center justify-center shadow-sm">
              SJ
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid: Sidebar + Content */}
        <div className="grid grid-cols-12 min-h-[360px]">
          {/* Mini Sidebar */}
          <motion.div
            variants={itemVariants}
            className="hidden sm:flex col-span-3 bg-slate-900/60 border-r border-white/5 p-3 flex-col justify-between text-xs"
          >
            <div className="space-y-1">
              <div className="px-2 py-1 flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">
                <span>CoreSetu OS</span>
              </div>
              <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 font-medium border border-cyan-500/30 text-left">
                <Kanban className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Pipeline</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 text-left">
                <Users className="w-3.5 h-3.5" />
                <span>Sales Agents</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 text-left">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp SLA</span>
              </button>
              <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 text-left">
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Conversion KPIs</span>
              </button>
            </div>

            {/* Ingestion Status */}
            <div className="p-2 rounded-lg bg-slate-950/70 border border-white/5 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Auto-Distribution ON</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Round-Robin Active</div>
            </div>
          </motion.div>

          {/* Main Dashboard Area */}
          <div className="col-span-12 sm:col-span-9 p-4 space-y-4">
            {/* Top Quick Metric Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Today&apos;s Leads</span>
                  <Zap className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">48</div>
                <div className="text-[10px] text-cyan-400 font-medium mt-0.5">Instant synced</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Avg Response</span>
                  <Clock className="w-3 h-3 text-purple-400" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">1.8 min</div>
                <div className="text-[10px] text-purple-400 font-medium mt-0.5">SLA maintained</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Won This Week</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">₹14.8L</div>
                <div className="text-[10px] text-emerald-400 font-medium mt-0.5">18 Deals closed</div>
              </div>
            </motion.div>

            {/* Mini Kanban Columns Preview */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <span>Incoming Stream</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Live
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-2 py-0.5 rounded ${activeFilter === "all" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter("meta")}
                    className={`px-2 py-0.5 rounded ${activeFilter === "meta" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400"}`}
                  >
                    Meta
                  </button>
                  <button
                    onClick={() => setActiveFilter("whatsapp")}
                    className={`px-2 py-0.5 rounded ${activeFilter === "whatsapp" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400"}`}
                  >
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-2">
                {leads.map((lead, idx) => (
                  <motion.div
                    key={lead.id}
                    variants={itemVariants}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                        {lead.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                            {lead.source}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">{lead.company}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-slate-200">{lead.value}</div>
                      <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1">
                        <span>→ {lead.assignedTo.split(" ")[0]}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Live Activity Toast ticker */}
            <motion.div
              variants={itemVariants}
              className="px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-[11px] text-cyan-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>⚡ Meta Lead &apos;Apex Tech Labs&apos; auto-assigned to Sarah</span>
              </div>
              <span className="text-[10px] text-cyan-400/70">Just now</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
