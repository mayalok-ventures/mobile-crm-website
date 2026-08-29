"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export const PricingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can I upgrade or change my plan later?",
      a: "Yes. You can upgrade from Starter to Agency or Enterprise at any time. When upgrading mid-cycle, your billing will automatically adjust on a prorated basis.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes. CoreSetu OS does not impose lock-in contracts for standard monthly or annual self-serve tiers. You can manage or cancel your subscription anytime via your account settings.",
    },
    {
      q: "Is our sales and lead data secure?",
      a: "Absolutely. CoreSetu OS isolates tenant data with strict workspace boundaries, encrypts data in transit (TLS 1.3) and at rest, and provides role-based permission controls for all team members.",
    },
    {
      q: "How does the lead capture automation work?",
      a: "CoreSetu OS provides authenticated webhook endpoints and API connectors for Meta Lead Ads, website contact forms, and third-party tools. Inbound leads are instantly validated, deduplicated, and routed to your team.",
    },
    {
      q: "Can I connect multiple managers and agents to one account?",
      a: "Yes. The Agency and Enterprise plans feature our multi-tier sales hierarchy, allowing you to define Organization Owners, Sales Branch Managers, and Individual Sales Agents with custom visibility.",
    },
    {
      q: "Do you offer tailored Enterprise plans and custom SLAs?",
      a: "Yes. For high-volume lead pipelines, multi-branch brokerages, and organizations with specialized compliance requirements, our solutions team crafts custom onboarding, dedicated SLAs, and private webhook endpoints.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">Got questions about pricing?</h3>
        <p className="text-xs sm:text-sm text-slate-400">Everything you need to know about our plans and billing.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/60 border border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
