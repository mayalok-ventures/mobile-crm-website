"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Kanban, Users, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export const FeatureHighlights: React.FC = () => {
  const features = [
    {
      id: "capture",
      number: "01",
      title: "ZERO-DELAY LEAD CAPTURE",
      headline: "Capture leads directly from your channels",
      description:
        "Capture leads from your advertising and digital channels directly into your CRM. Instant webhook ingestion ensures new inquiries land in your workspace without manual copy-pasting.",
      icon: Zap,
      accent: "from-cyan-500 to-blue-600",
      badge: "Instant Sync",
    },
    {
      id: "pipeline",
      number: "02",
      title: "SMART SALES PIPELINE",
      headline: "Move every lead through a visual sales journey",
      description:
        "Move every lead through a clear visual sales journey. Drag and drop deal stages, prioritize high-value prospects, and identify bottlenecks before they impact your monthly targets.",
      icon: Kanban,
      accent: "from-purple-500 to-indigo-600",
      badge: "Visual Kanban",
    },
    {
      id: "hierarchy",
      number: "03",
      title: "TEAM & HIERARCHY",
      headline: "Manage agents, managers, and assignments",
      description:
        "Manage agents, managers, assignments, and performance from one place. Implement round-robin routing, role-based controls, and track individual closing ratios effortlessly.",
      icon: Users,
      accent: "from-emerald-500 to-teal-600",
      badge: "Role-Based Access",
    },
    {
      id: "outreach",
      number: "04",
      title: "WHATSAPP & OUTREACH",
      headline: "Keep conversations and follow-ups connected",
      description:
        "Keep conversations, follow-ups, and sales activity connected. Log interaction histories, trigger contextual message templates, and maintain full team visibility across deal cycles.",
      icon: MessageSquare,
      accent: "from-amber-500 to-rose-600",
      badge: "Connected Workflow",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-gradient-cyan">speed, clarity, and control</span>.
          </h2>
          <p className="text-base text-slate-400">
            Four foundational pillars designed to eliminate sales operational chaos and boost conversion rates.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative rounded-3xl p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_10px_40px_-10px_rgba(0,240,255,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Ambient Card Corner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-full blur-2xl transition-all pointer-events-none" />

                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800/80 border border-white/10 text-slate-300">
                        {feat.badge}
                      </span>
                      <span className="text-xl font-mono font-black text-slate-700 group-hover:text-cyan-400/40 transition-colors">
                        {feat.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono tracking-wider text-cyan-400 font-semibold uppercase">
                      {feat.title}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {feat.headline}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed pt-2">
                      {feat.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Link */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-300">
                  <Link href={`/features#${feat.id}`} className="inline-flex items-center gap-1.5 focus-visible:outline-none">
                    <span>Explore {feat.title.toLowerCase()} workflow</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
