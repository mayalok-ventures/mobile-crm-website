"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Kanban,
  ShieldCheck,
  TrendingUp,
  Zap,
  CheckCircle2,
  Clock,
  Send,
  PhoneCall,
  UserCheck,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Filter,
  DollarSign,
  Layers,
} from "lucide-react";

type SandboxTab = "mobile" | "kanban" | "manager";

interface KanbanCard {
  id: string;
  leadName: string;
  company: string;
  value: string;
  source: string;
  timeAgo?: string;
  slaStatus: "optimal" | "urgent" | "closed";
}

export const InteractiveHeroSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SandboxTab>("mobile");
  const [proposalSent, setProposalSent] = useState(false);
  const [activeLeadId, setActiveLeadId] = useState("ld-1");

  const kanbanStages: { title: string; count: number; deals: KanbanCard[] }[] = [
    {
      title: "New Ingested",
      count: 3,
      deals: [
        {
          id: "ld-1",
          leadName: "Vikram Malhotra",
          company: "Apex Luxury Realty",
          value: "₹48,00,000",
          source: "Meta Ads • 42s ago",
          slaStatus: "urgent",
        },
        {
          id: "ld-2",
          leadName: "Ananya Sharma",
          company: "Zenith Capital",
          value: "₹18,50,000",
          source: "Google Search • 2m ago",
          slaStatus: "optimal",
        },
      ],
    },
    {
      title: "WhatsApp Contacted",
      count: 4,
      deals: [
        {
          id: "ld-3",
          leadName: "Sunil Joshi",
          company: "Joshi Exports",
          value: "₹35,00,000",
          source: "WhatsApp Direct • 14m ago",
          slaStatus: "optimal",
        },
      ],
    },
    {
      title: "Site Visit / Demo",
      count: 2,
      deals: [
        {
          id: "ld-4",
          leadName: "Dr. Arvind Rao",
          company: "CarePlus MedTech",
          value: "₹24,00,000",
          source: "Referral • Today 3PM",
          slaStatus: "optimal",
        },
      ],
    },
    {
      title: "Closed Won",
      count: 8,
      deals: [
        {
          id: "ld-5",
          leadName: "Kavita Singhania",
          company: "Singhania Logistics",
          value: "₹65,00,000",
          source: "HNI Campaign • Won",
          slaStatus: "closed",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 text-slate-900 relative shadow-xl border border-slate-200/90 overflow-hidden">
      {/* Top Header & Interactive Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0084ff] animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
            SAHYAK VELOCITY COCKPIT v3.2
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
            • 380ms Speed-to-Lead Engine
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "mobile"
                ? "bg-white text-[#0084ff] shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Closer</span>
          </button>

          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "kanban"
                ? "bg-white text-[#0084ff] shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Live Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab("manager")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "manager"
                ? "bg-white text-[#0084ff] shadow-sm font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Manager Desk</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="pt-4 min-h-[360px] sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* TAB 1: MOBILE FIELD CLOSER INTERFACE (LIGHT CLEAN APP) */}
          {activeTab === "mobile" && (
            <motion.div
              key="mobile-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side: Mobile Phone Simulation (Light Silver Frame) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-[340px] rounded-3xl bg-slate-50 p-3.5 border-2 border-slate-200 shadow-lg text-slate-900">
                  {/* Phone Notch & Status Bar */}
                  <div className="flex justify-between items-center px-3 py-1 text-[10px] text-slate-500 font-mono">
                    <span>09:41</span>
                    <div className="w-16 h-3 bg-slate-200 rounded-full" />
                    <span>5G • 100%</span>
                  </div>

                  {/* App Inner Body */}
                  <div className="mt-2.5 space-y-3">
                    {/* Live Lead Inbound Alert Header */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-[#0084ff] font-bold">⚡ INBOUND META LEAD</span>
                        <span className="text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 font-bold">
                          SLA: 01:18 left
                        </span>
                      </div>
                      <div className="font-bold text-sm text-slate-900">Vikram Malhotra</div>
                      <div className="text-[11px] text-slate-600 flex items-center justify-between">
                        <span>₹48L • 4BHK Penthouse</span>
                        <span className="text-slate-500 font-medium">Sector 150</span>
                      </div>
                    </div>

                    {/* 1-Tap Action Card */}
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                      <div className="text-[11px] text-slate-600 flex items-center justify-between">
                        <span className="font-medium">Pre-Filled WhatsApp Proposal:</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-mono font-bold">
                          PDF Attached
                        </span>
                      </div>

                      <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-slate-700 leading-relaxed font-mono">
                        &quot;Hi Vikram, here is the verified brochure and floor plans for Palm Residences...&quot;
                      </div>

                      <button
                        onClick={() => {
                          setProposalSent(true);
                          setTimeout(() => setProposalSent(false), 3000);
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          proposalSent
                            ? "bg-emerald-600 text-white shadow-md"
                            : "btn-pill-brand text-white shadow-md"
                        }`}
                      >
                        {proposalSent ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>1-Tap WhatsApp Dispatched! (0.8s)</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Tap to Send WhatsApp Proposal</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Field Tools Mini Bar */}
                    <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono font-medium shadow-2xs">
                        🎙️ Voice Note AI Log
                      </div>
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono font-medium shadow-2xs">
                        📍 GPS Site Visit Check-in
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Field Closer Value Proposition */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0084ff] text-xs font-mono font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>NATIVE FIELD ARCHITECTURE</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                  Engineered for closers who live on WhatsApp &amp; the road.
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  No bulky forms. When a high-ticket lead arrives, your sales closer gets an instant mobile alert with pre-filled WhatsApp proposals, PDF brochures, and offline voice logging.
                </p>

                <div className="space-y-2.5 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0" />
                    <span><strong>1-Tap Proposal Dispatch:</strong> Send verified PDFs without saving phone numbers.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0" />
                    <span><strong>Voice Note AI Transcription:</strong> Speak notes while driving; auto-extracts deal budget.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0" />
                    <span><strong>Offline Local Caching:</strong> Zero data loss in basements, elevators, or remote sites.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: LIVE KANBAN PIPELINE (LIGHT CLEAN INTERFACE) */}
          {activeTab === "kanban" && (
            <motion.div
              key="kanban-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Active Squad Pipeline (Real-Time Synchronized)</span>
                <span className="text-[#0084ff] font-mono font-bold">17 Active Deals • ₹1.88 Cr MTD</span>
              </div>

              {/* Kanban Columns Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {kanbanStages.map((stage) => (
                  <div
                    key={stage.title}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{stage.title}</span>
                      <span className="bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-mono">
                        {stage.count}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {stage.deals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => setActiveLeadId(deal.id)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            activeLeadId === deal.id
                              ? "bg-white border-[#0084ff] shadow-md shadow-blue-500/10 scale-[1.02]"
                              : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                            <span>{deal.source}</span>
                            {deal.slaStatus === "urgent" && (
                              <span className="text-amber-700 bg-amber-50 px-1 rounded border border-amber-200 font-bold">
                                &lt; 90s SLA
                              </span>
                            )}
                            {deal.slaStatus === "closed" && (
                              <span className="text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200 font-bold">
                                WON
                              </span>
                            )}
                          </div>
                          <div className="font-bold text-xs text-slate-900 leading-snug">
                            {deal.leadName}
                          </div>
                          <div className="text-[11px] text-slate-600">{deal.company}</div>
                          <div className="mt-2 flex items-center justify-between text-xs font-mono font-bold text-[#0084ff]">
                            <span>{deal.value}</span>
                            <span className="text-[10px] text-slate-400 font-normal">1-Tap WA &rarr;</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: MANAGER COMMAND COCKPIT (LIGHT CLEAN INTERFACE) */}
          {activeTab === "manager" && (
            <motion.div
              key="manager-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5"
            >
              {/* Telemetry Stat Cards */}
              <div className="lg:col-span-4 space-y-3.5">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Team Response Velocity</div>
                  <div className="text-2xl font-extrabold text-[#0084ff] font-heading">1m 14s</div>
                  <div className="text-[11px] text-slate-500 font-mono">98.2% within &lt; 90s SLA</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">MTD Pipeline Closed</div>
                  <div className="text-2xl font-extrabold text-slate-900 font-heading">₹4,28,50,000</div>
                  <div className="text-[11px] text-emerald-700 font-mono font-semibold">+38.4% vs previous CRM</div>
                </div>
              </div>

              {/* Rep Leaderboard */}
              <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Live Rep Velocity Leaderboard</span>
                  <span className="text-[#0084ff] font-mono">Auto Round-Robin Active</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0084ff] border border-blue-200 font-mono font-bold flex items-center justify-center text-[10px]">
                        01
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">Aditya Verma (North Squad)</div>
                        <div className="text-[10px] text-slate-500 font-mono">Avg SLA: 48s • 14 Closures</div>
                      </div>
                    </div>
                    <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ₹1.45 Cr Won
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-mono font-bold flex items-center justify-center text-[10px]">
                        02
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">Pooja Nair (West Mumbai)</div>
                        <div className="text-[10px] text-slate-500 font-mono">Avg SLA: 1m 05s • 11 Closures</div>
                      </div>
                    </div>
                    <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ₹98.0 Lakhs Won
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
