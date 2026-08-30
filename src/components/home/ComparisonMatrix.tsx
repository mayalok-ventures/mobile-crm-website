"use client";

import React from "react";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface MatrixRow {
  capability: string;
  category: string;
  sahyak: string;
  sahyakPositive: boolean;
  spreadsheets: string;
  legacyCrm: string;
}

const MATRIX_DATA: MatrixRow[] = [
  {
    capability: "Speed-to-Lead Response Latency",
    category: "Lead Ingestion",
    sahyak: "Sub-2 Seconds (Edge Webhook)",
    sahyakPositive: true,
    spreadsheets: "45 Mins – 4 Hours (Manual CSV)",
    legacyCrm: "15 – 30 Mins (Zapier / Heavy Cron)",
  },
  {
    capability: "1-Tap WhatsApp Proposal Dispatch",
    category: "Mobile Closing",
    sahyak: "Native Official Cloud API (Pre-filled)",
    sahyakPositive: true,
    spreadsheets: "Manual copy-paste (Error prone)",
    legacyCrm: "Expensive 3rd-party marketplace add-on",
  },
  {
    capability: "Offline Mobile Caching & Voice Notes",
    category: "Field Operations",
    sahyak: "Full Offline SQLite + AI Audio Parsing",
    sahyakPositive: true,
    spreadsheets: "Impossible offline; sheet breaks",
    legacyCrm: "Slow desktop-first web wrappers",
  },
  {
    capability: "Deployment & Team Onboarding SLA",
    category: "Implementation",
    sahyak: "60 Seconds (Pre-built vertical pipelines)",
    sahyakPositive: true,
    spreadsheets: "1 Day (Fragile formulas & tabs)",
    legacyCrm: "3 – 6 Months ($10k+ consultant fees)",
  },
  {
    capability: "Pricing Transparency & Economics",
    category: "Value",
    sahyak: "Flat ₹639/mo (Predictable growth)",
    sahyakPositive: true,
    spreadsheets: "Free (Costs 38% lost marketing revenue)",
    legacyCrm: "₹8,000+/user/mo + mandatory tier upsells",
  },
  {
    capability: "Data Protection & Role Isolation (RBAC)",
    category: "Enterprise Trust",
    sahyak: "Bank-Grade RBAC & Cryptographic Masking",
    sahyakPositive: true,
    spreadsheets: "Zero Isolation (Anyone can export all leads)",
    legacyCrm: "Complex multi-month IAM configuration",
  },
];

export const ComparisonMatrix: React.FC = () => {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-lg">
        {/* Table View (Desktop & Tablet) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Capability &amp; Architecture
                </th>
                <th className="py-4 px-6 bg-blue-50/80 text-[#0084ff] border-x border-blue-200/80 relative">
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
              {MATRIX_DATA.map((row) => (
                <tr
                  key={row.capability}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div>{row.capability}</div>
                    <span className="text-[10px] text-slate-400 font-mono font-normal">
                      {row.category}
                    </span>
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
                      <X className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{row.legacyCrm}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Row */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 text-center sm:text-left">
            <span>Deploy in 60 seconds. Import your existing contacts via 1-click CSV.</span>
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
