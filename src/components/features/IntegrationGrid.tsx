import React from "react";
import { Layers, MessageSquare, Globe, Webhook, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const IntegrationGrid: React.FC = () => {
  const integrations = [
    {
      id: "meta",
      name: "Meta Ads & Lead Forms",
      category: "Ad Ingestion",
      desc: "Capture Facebook & Instagram instant form submissions directly into your CRM queue without third-party delay.",
      icon: Layers,
      status: "Direct Webhook Supported",
      accent: "border-cyan-500/30 text-cyan-400",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Sales Outreach",
      category: "Outreach & SLAs",
      desc: "Trigger pre-configured message templates, maintain interaction logs, and track initial contact response speed.",
      icon: MessageSquare,
      status: "Workflow Ready",
      accent: "border-emerald-500/30 text-emerald-400",
    },
    {
      id: "google",
      name: "Google Ads & Landing Pages",
      category: "Traffic Conversion",
      desc: "Connect your website landing page lead forms and Google Ads lead extensions with standardized REST endpoints.",
      icon: Globe,
      status: "Endpoint Ready",
      accent: "border-blue-500/30 text-blue-400",
    },
    {
      id: "webhooks",
      name: "Custom REST Webhooks",
      category: "Developer Ingestion",
      desc: "Ingest leads from custom portals, mobile apps, or proprietary databases with authenticated JSON webhooks.",
      icon: Webhook,
      status: "Available via API",
      accent: "border-purple-500/30 text-purple-400",
    },
  ];

  return (
    <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 sm:p-10 overflow-hidden shadow-2xl">
      <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-white/10 text-xs font-mono text-cyan-300">
          <span>ECOSYSTEM CONNECTIVITY</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Connect your sales ecosystem seamlessly
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Connect supported lead sources and bring new enquiries into your sales workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300">
                    {item.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-1">{item.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-mono text-cyan-400">{item.category}</span>
                <Link href="/contact" className="hover:text-cyan-300 flex items-center gap-1">
                  <span>Learn setup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
