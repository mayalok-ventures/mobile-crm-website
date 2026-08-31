"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";
import Link from "next/link";

export const VelocityCalculator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [monthlyLeads, setMonthlyLeads] = useState<number>(300);
  const [avgDealValue, setAvgDealValue] = useState<number>(50000);

  // Speed-to-Lead Economic Multipliers
  const baselineLeadsRecovered = Math.round(monthlyLeads * 0.18); // 18% recovered from < 90s SLA
  const monthlyRevenueSurge = baselineLeadsRecovered * avgDealValue;
  const hoursSavedPerRep = 14; // Hours saved per rep per month via 1-tap proposals & voice logging
  const totalHoursSaved = teamSize * hoursSavedPerRep;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-10 text-slate-900 shadow-xl border border-slate-200/90 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0077ff] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>ROI ESTIMATION MODEL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            Quantify Your Sales Velocity Surge
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Estimate potential pipeline recovery based on team size, monthly lead volume, and average deal size.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] font-mono text-xs font-bold border border-blue-200 self-start sm:self-auto">
          DYNAMIC FORECAST
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: 3 Interactive Sliders */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Sales Closers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0077ff]" />
                <span>Sales Closers &amp; Field Reps</span>
              </span>
              <span className="font-mono text-sm text-[#0084ff] font-extrabold">
                {teamSize} Reps
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="velocity-slider"
              aria-label="Sales Closers count"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Rep</span>
              <span>25 Reps</span>
              <span>50+ Reps</span>
            </div>
          </div>

          {/* Slider 2: Monthly Inbound Leads */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#0077ff]" />
                <span>Monthly Inbound Leads (Ads &amp; Portals)</span>
              </span>
              <span className="font-mono text-sm text-[#0084ff] font-extrabold">
                {monthlyLeads.toLocaleString()} Leads / mo
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={5000}
              step={50}
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(Number(e.target.value))}
              className="velocity-slider"
              aria-label="Monthly Inbound Leads"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50</span>
              <span>2,500</span>
              <span>5,000+</span>
            </div>
          </div>

          {/* Slider 3: Average Deal Value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#0077ff]" />
                <span>Average Deal Value (ACV / Ticket Size)</span>
              </span>
              <span className="font-mono text-sm text-[#0084ff] font-extrabold">
                {formatCurrency(avgDealValue)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={avgDealValue}
              onChange={(e) => setAvgDealValue(Number(e.target.value))}
              className="velocity-slider"
              aria-label="Average Deal Value"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹10,000</span>
              <span>₹5 Lakhs</span>
              <span>₹10 Lakhs+</span>
            </div>
          </div>

          {/* Assumptions Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Calculation Basis:</strong> Models an estimated 18% pipeline catch improvement from sub-90s response latency and ~14 administrative hours saved per rep each month via 1-tap WhatsApp proposals.
            </div>
          </div>
        </div>

        {/* Right Side: ROI Revenue Forecast */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200 text-slate-900 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#0084ff] font-bold">
              PROJECTED MONTHLY RECOVERY
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0084ff] font-heading">
              {formatCurrency(monthlyRevenueSurge)}
            </div>
            <div className="text-xs text-slate-600">
              Estimated closed revenue from eliminating lead response delays and manual hand-off friction.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-200/80 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-blue-100 space-y-1">
              <div className="text-slate-500 text-[10px] font-mono font-bold">Recovered Leads</div>
              <div className="text-lg font-bold text-slate-900 font-mono">
                +{baselineLeadsRecovered} deals / mo
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-blue-100 space-y-1">
              <div className="text-slate-500 text-[10px] font-mono font-bold">Rep Admin Time Saved</div>
              <div className="text-lg font-bold text-slate-900 font-mono">
                {totalHoursSaved} hrs / mo
              </div>
            </div>
          </div>

          <Link
            href="https://crm.sahyak.com/signup/"
            className="btn-pill-brand text-white w-full text-center text-xs py-3.5 font-bold shadow-md flex items-center justify-center gap-2"
          >
            <span>Start 14-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
