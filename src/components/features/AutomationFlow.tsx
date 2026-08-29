"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Sparkles,
  Cpu,
  Shuffle,
  UserCheck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const AutomationFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      id: "meta",
      title: "Meta & Web Ads",
      subtitle: "Inbound Prospect",
      desc: "Prospect fills instant lead form on Meta Ads or website widget.",
      icon: Layers,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-950/40",
    },
    {
      id: "ingestion",
      title: "CoreSetu Ingestion",
      subtitle: "Validation & Dedupe",
      desc: "Phone normalized, duplicate checks verified, source tagged automatically.",
      icon: Cpu,
      color: "border-blue-500/40 text-blue-400 bg-blue-950/40",
    },
    {
      id: "distribution",
      title: "Smart Distribution",
      subtitle: "Routing Rules",
      desc: "Round-robin engine assigns lead to next available active agent.",
      icon: Shuffle,
      color: "border-purple-500/40 text-purple-400 bg-purple-950/40",
    },
    {
      id: "agent",
      title: "Sales Agent SLA",
      subtitle: "Instant Alert",
      desc: "Agent receives instant push alert & prefilled WhatsApp template.",
      icon: UserCheck,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-950/40",
    },
  ];

  // Particle traveling step animation cycle
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, steps.length]);

  return (
    <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-2xl">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>LEAD AUTOMATION PIPELINE</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          From ad click to agent outreach <span className="text-gradient-cyan">without delay</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Lead captured automatically • Instant routing • No manual data entry
        </p>
      </div>

      {/* Horizontal Flow Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <div key={step.id} className="relative flex flex-col items-center">
              {/* Card */}
              <div
                onClick={() => setActiveStep(idx)}
                className={`w-full p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 text-center cursor-pointer ${
                  isActive
                    ? "border-cyan-400/80 bg-slate-950/90 shadow-[0_0_25px_rgba(0,240,255,0.25)] scale-[1.02]"
                    : "border-white/10 bg-slate-950/50 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner transition-colors ${
                      isActive ? step.color : "border-white/10 text-slate-400 bg-slate-900"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  Step 0{idx + 1}
                </div>
                <div className="text-sm font-bold text-white mt-1">{step.title}</div>
                <div className="text-xs text-slate-400 mt-1">{step.desc}</div>

                {/* Active Indicator Pulse */}
                {isActive && (
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-cyan-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Lead synced</span>
                  </div>
                )}
              </div>

              {/* Connecting arrow (hidden on mobile and last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-400/60">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Verification Status Strip */}
      <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center gap-2 text-cyan-300">
          <CheckCircle className="w-4 h-4 text-cyan-400" />
          <span>Continuous round-robin failover with automatic absence skip</span>
        </div>
        <div className="font-mono text-[11px] text-slate-500">
          Sync status: Active Webhook Listener
        </div>
      </div>
    </div>
  );
};
