import React from "react";
import { Sparkles, Target, Zap, Users2, ShieldCheck } from "lucide-react";
import { GlowingButton } from "@/components/buttons/GlowingButton";
import { Logo } from "@/components/ui/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — CoreSetu OS",
  description:
    "Discover the mission and vision behind CoreSetu OS — building the modern sales operating system for high-velocity agencies, sales teams, and brokers.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col pt-32 pb-20 tech-grid-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <Logo size="lg" showText={true} />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OUR MISSION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Building the modern bridge between <br />
            <span className="text-gradient-cyan">marketing leads and sales revenue</span>.
          </h1>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CoreSetu OS was created to solve a universal pain point in modern sales operations: leads slipping through the cracks between scattered ad dashboards, offline spreadsheets, and disconnected messaging apps.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">The Problem We Solve</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When sales teams rely on manual copy-pasting from Meta Ads or landing pages, response times inflate from minutes to hours. In high-intent sales, delayed response leads to lost revenue.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">The Operating System Approach</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of bulky, generic enterprise CRMs that require months of complex setup, CoreSetu OS focuses on speed, clarity, instant distribution, and frictionless sales rep adoption.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-8 text-center space-y-6">
          <h3 className="text-2xl font-bold text-white">Experience CoreSetu OS in Action</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            See how our automated lead capture and pipeline workflows can power your organization.
          </p>
          <div className="flex justify-center gap-4">
            <GlowingButton href="/contact" size="md" variant="primary">
              Get Started Free
            </GlowingButton>
          </div>
        </div>
      </div>
    </main>
  );
}
