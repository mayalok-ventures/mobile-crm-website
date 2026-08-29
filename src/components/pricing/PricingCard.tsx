"use client";

import React from "react";
import { PricingPlan } from "@/lib/config";
import { GlowingButton } from "../buttons/GlowingButton";
import { AnimatedCounter } from "../ui/AnimatedCounter";
import { Check, X, Sparkles } from "lucide-react";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isYearly }) => {
  const isNumericPrice = typeof plan.monthlyPrice === "number";
  const currentPrice = isNumericPrice
    ? isYearly
      ? (plan.yearlyPrice as number)
      : (plan.monthlyPrice as number)
    : "Custom";

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? "bg-slate-900/90 border-2 border-cyan-400/80 shadow-[0_0_50px_rgba(0,240,255,0.15)] scale-[1.03] z-10"
          : "bg-slate-950/70 border border-white/10 hover:border-white/25 backdrop-blur-xl"
      }`}
    >
      {/* Popular Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-950 font-mono font-bold text-xs shadow-lg tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-slate-950" />
          <span>{plan.badge}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
          <p className="text-xs text-slate-400 mt-1 min-h-[36px] leading-relaxed">
            {plan.description}
          </p>
        </div>

        {/* Pricing Figures */}
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-1">
            {isNumericPrice ? (
              <>
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  ₹<AnimatedCounter value={currentPrice as number} />
                </span>
                <span className="text-xs text-slate-400">/ mo</span>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-white">Custom</span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {isNumericPrice
              ? isYearly
                ? "Billed annually (~20% savings)"
                : "Billed monthly"
              : "Tailored to volume and team scope"}
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
            Included Capabilities
          </div>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs">
              {feature.included ? (
                <div
                  className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                    feature.highlight
                      ? "bg-cyan-400 text-slate-950 font-bold"
                      : "bg-cyan-500/20 text-cyan-300"
                  }`}
                >
                  <Check className="w-3 h-3" />
                </div>
              ) : (
                <div className="p-0.5 rounded-full mt-0.5 shrink-0 bg-slate-800 text-slate-600">
                  <X className="w-3 h-3" />
                </div>
              )}
              <span
                className={
                  feature.included
                    ? feature.highlight
                      ? "text-white font-semibold"
                      : "text-slate-300"
                    : "text-slate-500 line-through"
                }
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <GlowingButton
        href={plan.ctaHref}
        size="md"
        variant={plan.popular ? "primary" : "secondary"}
        className="w-full justify-center"
      >
        {plan.ctaText}
      </GlowingButton>
    </div>
  );
};
