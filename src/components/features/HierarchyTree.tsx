import React from "react";
import { Users, Shield, Award, Sparkles, ChevronDown } from "lucide-react";
import { DEMO_DATA_NOTICE } from "@/lib/demo-data";

export const HierarchyTree: React.FC = () => {
  return (
    <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-2xl">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-purple-500/30 text-xs font-mono text-purple-300 mb-2">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>ENTERPRISE PERMISSIONS & HIERARCHY</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Multi-Tier Sales Governance</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Maintain complete data isolation, managerial oversight, and individual quota visibility.
          </p>
        </div>

        <div className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-950 border border-white/10 text-slate-400">
          {DEMO_DATA_NOTICE}
        </div>
      </div>

      {/* Hierarchy Visual Tree */}
      <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
        {/* Tier 1: Org Owner */}
        <div className="w-full max-w-sm p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-purple-950/70 border border-purple-500/40 text-center shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-purple-300 uppercase">
              Organization Owner / Director
            </span>
          </div>
          <div className="text-sm font-bold text-white">Full Company Workspace Oversight</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Access to all branches, billing, custom routing logic, and global revenue analytics
          </div>
        </div>

        <ChevronDown className="w-5 h-5 text-purple-400/60" />

        {/* Tier 2: Sales Branch Manager */}
        <div className="w-full max-w-md p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-center shadow-md">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
              Sales Branch Manager
            </span>
          </div>
          <div className="text-sm font-bold text-white">Team Lead Distribution & Escalations</div>
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">Team Size</span>
              <span className="font-bold text-white font-mono">8 Reps</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Team Quota</span>
              <span className="font-bold text-cyan-300 font-mono">₹45.0L</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Avg SLA</span>
              <span className="font-bold text-emerald-400 font-mono">1.6 min</span>
            </div>
          </div>
        </div>

        <ChevronDown className="w-5 h-5 text-cyan-400/60" />

        {/* Tier 3: Sales Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {[
            { name: "Sarah Jenkins", leads: 42, won: 11, conv: "26.2%", status: "Active" },
            { name: "Rahul Verma", leads: 38, won: 9, conv: "23.7%", status: "In Call" },
            { name: "Aditi Rao", leads: 31, won: 7, conv: "22.5%", status: "Active" },
          ].map((agent) => (
            <div
              key={agent.name}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/30 transition-colors text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                <span className="font-bold text-white">{agent.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono">● {agent.status}</span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Assigned:</span>
                  <span className="font-mono text-white">{agent.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deals Won:</span>
                  <span className="font-mono text-cyan-300 font-bold">{agent.won}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion:</span>
                  <span className="font-mono text-emerald-400 font-bold">{agent.conv}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
