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
          <div className="flex items-center gap-2 text-xs font-mono text-[#0084ff] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>REAL-TIME ROI TELEMETRY MODEL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
            Calculate Your Pipeline Recovery
          </h3>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] font-mono text-xs font-bold border border-blue-200 self-start sm:self-auto">
          DYNAMIC REVENUE MODEL
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: 3 Interactive Sliders */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Sales Closers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#0084ff]" />
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
                <Zap className="w-3.5 h-3.5 text-[#0084ff]" />
                <span>Monthly Inbound Leads (Ads + Webhooks)</span>
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
                <DollarSign className="w-3.5 h-3.5 text-[#0084ff]" />
                <span>Average Deal / ACV Value</span>
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
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹10,000</span>
              <span>₹5 Lakhs</span>
              <span>₹10 Lakhs+</span>
            </div>
          </div>
        </div>

        {/* Right Side: ROI Revenue Forecast (Light Clean Surface) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200 text-slate-900 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-[#0084ff] font-bold">
              PROJECTED MONTHLY SURGE
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0084ff] font-heading">
              {formatCurrency(monthlyRevenueSurge)}
            </div>
            <div className="text-xs text-slate-600">
              Additional closed pipeline from sub-90s speed-to-lead &amp; zero drop-off.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-200/80 text-xs">
            <div className="p-3 rounded-xl bg-white border border-blue-100 space-y-1">
              <div className="text-slate-500 text-[10px] font-mono font-bold">Recovered Leads</div>
              <div className="text-lg font-bold text-slate-900 font-mono">
                +{baselineLeadsRecovered} deals / mo
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-blue-100 space-y-1">
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
            <span>Unlock This Revenue (14-Day Free Trial)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
