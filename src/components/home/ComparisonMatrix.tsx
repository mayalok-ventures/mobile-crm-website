"use client";

import React from "react";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Zap,
  Smartphone,
  ShieldCheck,
  Clock,
  DollarSign,
  Layers,
  Send,
} from "lucide-react";
import Link from "next/link";

interface MatrixRow {
  capability: string;
  category: string;
  icon: React.ElementType;
  sahyak: string;
  spreadsheets: string;
  legacyCrm: string;
}

const MATRIX_DATA: MatrixRow[] = [
  {
    capability: "Speed-to-Lead Response Latency",
    category: "Lead Ingestion",
    icon: Zap,
    sahyak: "Sub-2 Seconds (Edge Webhook)",
    spreadsheets: "45 Mins – 4 Hours (Manual CSV)",
    legacyCrm: "15 – 30 Mins (Zapier / Batch Cron)",
  },
  {
    capability: "1-Tap WhatsApp Proposal Dispatch",
    category: "Mobile Closing",
    icon: Send,
    sahyak: "Native Official Cloud API (Pre-filled)",
    spreadsheets: "Manual copy-paste (High error risk)",
    legacyCrm: "Expensive 3rd-party marketplace add-on",
  },
  {
    capability: "Offline Mobile Caching & Voice Notes",
    category: "Field Operations",
    icon: Smartphone,
    sahyak: "Offline Local SQLite + AI Audio Parsing",
    spreadsheets: "Impossible offline; sheets break",
    legacyCrm: "Heavy desktop-first web wrappers",
  },
  {
    capability: "Deployment & Onboarding SLA",
    category: "Implementation",
    icon: Clock,
    sahyak: "60 Seconds (Pre-built vertical blueprints)",
    spreadsheets: "1+ Days (Fragile formula setup)",
    legacyCrm: "3 – 6 Months (Costly consultant fees)",
  },
  {
    capability: "Pricing Transparency & Economics",
    category: "Value",
    icon: DollarSign,
    sahyak: "From ₹999/mo (Per Team, Zero Setup Fees)",
    spreadsheets: "Free (Costs lost ad pipeline revenue)",
    legacyCrm: "₹8,000+/user/mo + mandatory tier upsells",
  },
  {
    capability: "Data Protection & Role Isolation (RBAC)",
    category: "Enterprise Trust",
    icon: ShieldCheck,
    sahyak: "Role-Based Access & Cryptographic Masking",
    spreadsheets: "Zero Isolation (Anyone can export all leads)",
    legacyCrm: "Complex multi-month enterprise IAM setup",
  },
];

export const ComparisonMatrix: React.FC = () => {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-lg">
        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono sticky-table-col bg-slate-50 border-r border-slate-200 sm:border-r-0">
                  Capability &amp; Architecture
                </th>
                <th className="py-4 px-6 bg-blue-50/90 text-[#0084ff] border-x border-blue-200 relative">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                    <span className="font-extrabold font-heading text-sm sm:text-base text-slate-900">
                      Sahyak CRM
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#0084ff] block font-semibold mt-0.5">
                    Sub-2s Speed-to-Lead
                  </span>
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Excel / Google Sheets
                </th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Legacy Enterprise CRMs
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {MATRIX_DATA.map((row) => {
                const Icon = row.icon;
                return (
                  <tr
                    key={row.capability}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold text-slate-900 sticky-table-col bg-white border-r border-slate-200 sm:border-r-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div>{row.capability}</div>
                          <span className="text-[10px] text-slate-400 font-mono font-normal">
                            {row.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Sahyak Column */}
                    <td className="py-4 px-6 bg-blue-50/40 border-x border-blue-200/60 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#0084ff] shrink-0 font-bold" />
                        <span>{row.sahyak}</span>
                      </div>
                    </td>

                    {/* Spreadsheets Column */}
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.spreadsheets}</span>
                      </div>
                    </td>

                    {/* Legacy CRM Column */}
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{row.legacyCrm}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 text-center sm:text-left space-y-0.5">
            <div>Deploy in 60 seconds. Import your existing contacts via 1-click CSV.</div>
            <Link
              href="/features"
              className="text-[#0084ff] font-semibold hover:underline inline-flex items-center gap-1 text-[11px]"
            >
              <span>Explore full architectural breakdown</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <Link
            href="https://crm.sahyak.com/signup/"
            className="btn-pill-brand text-white text-xs py-2.5 px-6 font-bold shadow-md w-full sm:w-auto text-center"
          >
            <span>Switch to Sahyak (14-Day Free Trial)</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 inline" />
          </Link>
        </div>
      </div>
    </div>
  );
};
