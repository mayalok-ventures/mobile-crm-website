import React from "react";
import { Layers, MessageSquare, Kanban, Users, BarChart3 } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const capabilities = [
    { label: "Meta Lead Capture", icon: Layers, desc: "Instant ad ingestion" },
    { label: "WhatsApp Automation", icon: MessageSquare, desc: "Direct outreach & SLAs" },
    { label: "Smart Pipelines", icon: Kanban, desc: "Visual deal stages" },
    { label: "Team Hierarchy", icon: Users, desc: "Owner & agent controls" },
    { label: "Sales Analytics", icon: BarChart3, desc: "Conversion tracking" },
  ];

  return (
    <section className="relative py-8 border-y border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs uppercase font-mono tracking-widest text-slate-400 font-semibold whitespace-nowrap">
            Built for modern sales teams:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full md:w-auto">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
