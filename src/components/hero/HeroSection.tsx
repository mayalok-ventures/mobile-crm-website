"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlowingButton } from "../buttons/GlowingButton";
import { DashboardAssemble } from "./DashboardAssemble";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden tech-grid-bg">
      {/* Background ambient radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-center lg:text-left space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tracking-wide">THE MODERN SALES OPERATING SYSTEM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Stop Losing Leads. <br />
              <span className="text-gradient-cyan">Automate Your Pipeline</span>{" "}
              with <span className="text-gradient-purple">CoreSetu OS</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The all-in-one CRM for modern agencies and sales teams. Capture leads from digital channels, automate instant agent distribution, manage visual pipelines, connect WhatsApp, and close deals faster.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <GlowingButton href={siteConfig.appSignupUrl} size="lg" variant="primary">
                Start Free Trial
              </GlowingButton>
              <GlowingButton href="/contact?intent=demo" size="lg" variant="secondary">
                Book a Demo
              </GlowingButton>
            </div>

            {/* Micro-copy */}
            <div className="flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-cyan-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-cyan-400" />
                14-day full access
              </span>
            </div>
          </motion.div>

          {/* Right Column: Self-Assembling Interactive 3D CRM Mockup */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <DashboardAssemble />
          </div>
        </div>
      </div>
    </section>
  );
};
