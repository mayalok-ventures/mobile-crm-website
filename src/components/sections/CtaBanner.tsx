import React from "react";
import { GlowingButton } from "../buttons/GlowingButton";
import { Sparkles, Shield, Check } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background glow halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-cyan-500/15 via-purple-600/15 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-8 sm:p-12 lg:p-16 backdrop-blur-2xl text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.12)]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTANT DEPLOYMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to <span className="text-gradient-cyan">eliminate lead leakage</span> and accelerate conversions?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
            Equip your sales team with automated lead capture, instant distribution, and connected WhatsApp outreach today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <GlowingButton href={siteConfig.appSignupUrl} size="lg" variant="primary">
              Start Free 14-Day Trial
            </GlowingButton>
            <GlowingButton href="/contact?intent=demo" size="lg" variant="secondary">
              Schedule Live Walkthrough
            </GlowingButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 mt-8 pt-6 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" />
              Instant workspace creation
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              Enterprise data security
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
