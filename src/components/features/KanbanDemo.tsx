"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Phone,
  Flame,
  ArrowRight,
  DollarSign,
} from "lucide-react";
import { initialKanbanLeads, DemoLead, DEMO_DATA_NOTICE } from "@/lib/demo-data";

const COLUMNS: { id: DemoLead["stage"]; title: string; color: string; badgeColor: string }[] = [
  { id: "new", title: "New Lead", color: "border-cyan-500/30", badgeColor: "bg-cyan-950 text-cyan-300" },
  { id: "contacted", title: "Contacted", color: "border-blue-500/30", badgeColor: "bg-blue-950 text-blue-300" },
  { id: "qualified", title: "Qualified", color: "border-purple-500/30", badgeColor: "bg-purple-950 text-purple-300" },
  { id: "proposal", title: "Proposal", color: "border-amber-500/30", badgeColor: "bg-amber-950 text-amber-300" },
  { id: "converted", title: "Converted", color: "border-emerald-500/40", badgeColor: "bg-emerald-950 text-emerald-300" },
];

export const KanbanDemo: React.FC = () => {
  const [leads, setLeads] = useState<DemoLead[]>(initialKanbanLeads);
  const [celebration, setCelebration] = useState<{ name: string; value: string } | null>(null);

  const stageOrder: DemoLead["stage"][] = ["new", "contacted", "qualified", "proposal", "converted"];

  const moveLead = (id: string, direction: "next" | "prev") => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const currentIndex = stageOrder.indexOf(lead.stage);
        const nextIndex =
          direction === "next"
            ? Math.min(currentIndex + 1, stageOrder.length - 1)
            : Math.max(currentIndex - 1, 0);
        const nextStage = stageOrder[nextIndex];

        // Trigger conversion event
        if (nextStage === "converted" && lead.stage !== "converted") {
          setCelebration({ name: lead.name, value: lead.value });
          setTimeout(() => setCelebration(null), 4000);
        }

        return { ...lead, stage: nextStage };
      })
    );
  };

  return (
    <div className="relative rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-2xl">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white">Visual Sales Pipeline Simulator</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click &quot;→ Advance Stage&quot; on any card to move deals through your sales funnel.
          </p>
        </div>

        <div className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300">
          {DEMO_DATA_NOTICE}
        </div>
      </div>

      {/* Celebration Banner */}
      <AnimatePresence>
        {celebration && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <div className="font-bold text-white text-sm">Deal Won & Closed!</div>
                <div className="text-emerald-300">
                  {celebration.name} successfully converted • {celebration.value} revenue logged
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-2 py-1 rounded bg-emerald-900/60">
              Pipeline Target Updated
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kanban Board 5 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {COLUMNS.map((col) => {
          const columnLeads = leads.filter((l) => l.stage === col.id);
          return (
            <div
              key={col.id}
              className={`rounded-2xl bg-slate-900/60 border ${col.color} p-3.5 flex flex-col justify-between min-w-[210px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <span className="text-xs font-semibold text-white">{col.title}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                  {columnLeads.length}
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 min-h-[220px]">
                {columnLeads.map((lead) => (
                  <motion.div
                    layout
                    key={lead.id}
                    className="p-3.5 rounded-xl bg-slate-950/90 border border-white/10 hover:border-cyan-500/40 shadow-lg text-xs space-y-2.5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white">{lead.name}</div>
                        <div className="text-[11px] text-slate-400">{lead.company}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-cyan-300">{lead.value}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                      <span>{lead.source}</span>
                      <span className="text-slate-300">👤 {lead.assignedTo.split(" ")[0]}</span>
                    </div>

                    {/* Stage shift buttons */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                      {lead.stage !== "new" && (
                        <button
                          onClick={() => moveLead(lead.id, "prev")}
                          className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[10px] flex items-center gap-0.5 hover:bg-slate-700 cursor-pointer"
                        >
                          <ChevronLeft className="w-3 h-3" />
                          <span>Back</span>
                        </button>
                      )}

                      {lead.stage !== "converted" && (
                        <button
                          onClick={() => moveLead(lead.id, "next")}
                          className="ml-auto px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}

                      {lead.stage === "converted" && (
                        <span className="w-full text-center py-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/50 rounded border border-emerald-500/30">
                          Closed Won ✓
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {columnLeads.length === 0 && (
                  <div className="h-full flex items-center justify-center p-4 border border-dashed border-white/5 rounded-xl text-center text-slate-400 text-[11px]">
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
