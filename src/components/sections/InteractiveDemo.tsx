"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Kanban,
  Users,
  BarChart3,
  ListOrdered,
  Sparkles,
  Phone,
  Clock,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { initialKanbanLeads, demoAgents, demoAnalyticsData, DEMO_DATA_NOTICE } from "@/lib/demo-data";
import { GlowingButton } from "../buttons/GlowingButton";

export const InteractiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pipeline" | "leads" | "team" | "analytics">("pipeline");

  const tabs = [
    { id: "pipeline", label: "Pipeline", icon: Kanban },
    { id: "leads", label: "Live Leads", icon: ListOrdered },
    { id: "team", label: "Team Leaderboard", icon: Users },
    { id: "analytics", label: "Analytics & KPIs", icon: BarChart3 },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-950/80">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE PRODUCT DEMO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            See your sales operation in <span className="text-gradient-cyan">one screen</span>.
          </h2>
          <p className="text-base text-slate-400">
            Test the interface below. Toggle between pipelines, real-time incoming leads, agent SLAs, and attribution analytics.
          </p>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demo Frame Card */}
        <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 overflow-hidden min-h-[440px]">
          {/* Watermark Notice */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-cyan-300 uppercase tracking-wider text-[11px]">
                {activeTab.toUpperCase()} VIEW
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              {DEMO_DATA_NOTICE}
            </div>
          </div>

          {/* Dynamic Content based on active tab */}
          <AnimatePresence mode="wait">
            {/* TAB 1: PIPELINE */}
            {activeTab === "pipeline" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-2"
              >
                {[
                  { title: "New Lead", count: 12, color: "border-cyan-500/40" },
                  { title: "Contacted", count: 8, color: "border-blue-500/40" },
                  { title: "Qualified", count: 6, color: "border-purple-500/40" },
                  { title: "Proposal", count: 4, color: "border-amber-500/40" },
                  { title: "Converted", count: 18, color: "border-emerald-500/40" },
                ].map((col, idx) => {
                  const columnLeads = initialKanbanLeads.filter((l, i) => i % 5 === idx);
                  return (
                    <div
                      key={col.title}
                      className="rounded-2xl bg-slate-950/60 border border-white/5 p-3.5 flex flex-col justify-between min-w-[200px]"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                        <span className="text-xs font-semibold text-slate-200">{col.title}</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {col.count}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {columnLeads.map((lead) => (
                          <div
                            key={lead.id}
                            className={`p-3 rounded-xl bg-slate-900/90 border ${col.color} text-xs space-y-1.5 shadow-md`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{lead.name}</span>
                              <span className="text-[10px] text-cyan-400 font-mono">{lead.value}</span>
                            </div>
                            <div className="text-[11px] text-slate-400">{lead.company}</div>
                            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-slate-500">
                              <span>{lead.source}</span>
                              <span>{lead.assignedTo.split(" ")[0]}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-2 text-center text-[10px] text-slate-500">
                        + {col.count - columnLeads.length} more leads
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* TAB 2: LEADS */}
            {activeTab === "leads" && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="overflow-x-auto"
              >
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="pb-3 px-3">Lead / Contact</th>
                      <th className="pb-3 px-3">Deal Value</th>
                      <th className="pb-3 px-3">Source Channel</th>
                      <th className="pb-3 px-3">Assigned Agent</th>
                      <th className="pb-3 px-3">Lead Score</th>
                      <th className="pb-3 px-3 text-right">Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {initialKanbanLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-semibold text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">{lead.company} • {lead.phone}</div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-cyan-300">{lead.value}</td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-cyan-300 border border-cyan-500/20">
                            {lead.source}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">{lead.assignedTo}</td>
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                            <span className="font-mono text-[10px] text-emerald-400">{lead.score}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <span className="capitalize px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            {lead.stage}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* TAB 3: TEAM */}
            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {demoAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-slate-950 font-bold flex items-center justify-center text-sm shadow-md">
                            {agent.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{agent.name}</div>
                            <div className="text-xs text-slate-400">{agent.role}</div>
                          </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/5 text-xs">
                        <div>
                          <div className="text-slate-500 text-[10px]">Assigned Leads</div>
                          <div className="font-mono font-bold text-white text-sm mt-0.5">{agent.assignedLeads}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-[10px]">Conversion Rate</div>
                          <div className="font-mono font-bold text-emerald-400 text-sm mt-0.5">{agent.conversionRate}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-[10px]">Deals Won</div>
                          <div className="font-mono font-bold text-cyan-300 text-sm mt-0.5">{agent.dealsWon}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-[10px]">Avg Response SLA</div>
                          <div className="font-mono font-bold text-purple-300 text-sm mt-0.5">{agent.avgResponseTime}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Status: In Queue</span>
                      <span className="text-cyan-400 font-medium">Round-Robin Active</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: ANALYTICS */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Metrics Summary */}
                <div className="md:col-span-4 space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                    <div className="text-xs text-slate-400">Total Pipeline Value</div>
                    <div className="text-2xl font-extrabold text-white font-mono mt-1">
                      {demoAnalyticsData.summary.totalPipelineValue}
                    </div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{demoAnalyticsData.summary.leadVelocity} velocity this month</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                    <div className="text-xs text-slate-400">Avg Closing Cycle</div>
                    <div className="text-2xl font-extrabold text-cyan-300 font-mono mt-1">
                      {demoAnalyticsData.summary.avgCloseCycle}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">From initial sync to closed deal</div>
                  </div>
                </div>

                {/* Source Attribution Bars */}
                <div className="md:col-span-8 p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4">
                  <div className="text-xs font-semibold text-slate-200">
                    Lead Source Distribution & Ingestion Volume
                  </div>

                  <div className="space-y-3 text-xs">
                    {demoAnalyticsData.sources.map((src) => (
                      <div key={src.name} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-300">{src.name}</span>
                          <span className="font-mono text-slate-400">{src.leads} leads ({src.percentage}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${src.percentage}%`,
                              backgroundColor: src.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA underneath Demo */}
        <div className="mt-10 text-center">
          <GlowingButton href="/contact" size="md" variant="primary">
            Explore Full Demo with Your Team
          </GlowingButton>
        </div>
      </div>
    </section>
  );
};
