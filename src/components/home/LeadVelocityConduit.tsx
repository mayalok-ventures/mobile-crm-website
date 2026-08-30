"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Share2,
  MessageSquare,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  Building2,
  DollarSign,
} from "lucide-react";

interface ConduitStage {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  time: string;
  telemetry: string;
  metric: string;
  stageColor: string;
}

const CONDUIT_STAGES: ConduitStage[] = [
  {
    id: 1,
    label: "Meta Webhook Ingest",
    sublabel: "Sub-2s Instant Capture",
    icon: Zap,
    time: "0.38s",
    telemetry: "POST /webhooks/meta -> 200 OK (HMAC-SHA256 Verified)",
    metric: "High-Ticket Lead: Rajesh Oberoi (₹45L Budget)",
    stageColor: "text-[#00a3ff]",
  },
  {
    id: 2,
    label: "Skill & Geo Routing",
    sublabel: "Best Closer Assigned",
    icon: Share2,
    time: "0.14s",
    telemetry: "ROUTER: North Squad Rep #Rep-104 (Aditya V.)",
    metric: "Rep Workload: 3 Deals • 82% Win Rate",
    stageColor: "text-[#0077ff]",
  },
  {
    id: 3,
    label: "1-Tap WhatsApp Proposal",
    sublabel: "Official Cloud API",
    icon: MessageSquare,
    time: "1.10s",
    telemetry: "WHATSAPP_API: Template + PDF Brochure Delivered",
    metric: "Double-Blue Read Receipt Confirmed",
    stageColor: "text-[#6366f1]",
  },
  {
    id: 4,
    label: "Stage Progression",
    sublabel: "Site Visit Scheduled",
    icon: Clock,
    time: "4.20m",
    telemetry: "PIPELINE: Auto-Moved to 'Site Visit Confirmed'",
    metric: "GPS Check-In & Voice Log Configured",
    stageColor: "text-[#7c3aed]",
  },
  {
    id: 5,
    label: "Closed Won & Commission",
    sublabel: "Revenue Recorded",
    icon: Trophy,
    time: "< 48h",
    telemetry: "REVENUE: ₹52,00,000 Deal Won • Commission Logged",
    metric: "Synced to Cloudflare Edge Telemetry",
    stageColor: "text-[#9333ea]",
  },
];

export const LeadVelocityConduit: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setActiveStage(1);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (activeStage < CONDUIT_STAGES.length) {
      const timer = setTimeout(() => {
        setActiveStage((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
    }
  }, [isSimulating, activeStage]);

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-10 text-slate-900 relative shadow-xl border border-slate-200/90 space-y-8">
      {/* Top Header & Simulation Trigger Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0084ff] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>INTERACTIVE VELOCITY SIMULATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            Watch a Lead Travel at Edge Speed
          </h3>
        </div>

        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs font-heading transition-all cursor-pointer ${
            isSimulating
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "btn-pill-brand text-white shadow-md"
          }`}
        >
          {isSimulating ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>Simulating Pipeline Pulse...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Simulate Inbound High-Ticket Lead</span>
            </>
          )}
        </button>
      </div>

      {/* Horizontal 5-Station Data Conduit Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {CONDUIT_STAGES.map((st) => {
          const Icon = st.icon;
          const isPassed = st.id <= activeStage;
          const isCurrent = st.id === activeStage;

          return (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer ${
                isCurrent
                  ? "bg-blue-50/70 border-[#0084ff] shadow-md shadow-blue-500/10 scale-[1.02]"
                  : isPassed
                  ? "bg-slate-50 border-slate-200 text-slate-800"
                  : "bg-slate-50/40 border-slate-100 text-slate-400 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isCurrent
                      ? "bg-[#0084ff] text-white"
                      : isPassed
                      ? "bg-white text-[#0084ff] border border-slate-200"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isCurrent
                      ? "bg-blue-100 text-[#0084ff] font-bold border border-blue-200"
                      : "bg-white border border-slate-200 text-slate-500"
                  }`}
                >
                  {st.time}
                </span>
              </div>

              <div className="font-bold text-xs text-slate-900 leading-snug mb-1 font-heading">
                {st.label}
              </div>

              <div className="text-[10px] text-slate-500 line-clamp-1">
                {st.sublabel}
              </div>

              {isCurrent && (
                <motion.div
                  layoutId="conduitActiveStationLight"
                  className="absolute -bottom-1 left-4 right-4 h-1 bg-[#0084ff] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Real-time Telemetry Terminal Display (Light Clean Console) */}
      {(() => {
        const currentData = CONDUIT_STAGES.find((s) => s.id === activeStage) || CONDUIT_STAGES[0];
        return (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 font-mono text-xs space-y-2 text-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-200">
              <span className="text-[#0084ff] font-bold">
                STATION 0{currentData.id} TELEMETRY FEED // CLOUDFLARE EDGE
              </span>
              <span>Latency: {currentData.time}</span>
            </div>
            <div className="text-slate-700 flex items-center gap-2">
              <span className="text-[#0084ff] font-bold select-none">&gt;</span>
              <span>{currentData.telemetry}</span>
            </div>
            <div className="text-[#0084ff] text-[11px] font-semibold">
              &bull; {currentData.metric}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
