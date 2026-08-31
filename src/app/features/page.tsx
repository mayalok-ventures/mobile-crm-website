"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Bot,
  Layers,
  ArrowRight,
  Sparkles,
  Check,
  CheckCircle2,
  Share2,
  Clock,
  Mic,
  Eye,
  Send,
  Database,
  Lock,
  ChevronRight,
} from "lucide-react";

import { InteractiveAutomationBuilder } from "@/components/features/InteractiveAutomationBuilder";

const FEATURE_CATEGORIES = [
  { id: "capture", label: "Sub-2s Webhook Ingestion", icon: Zap },
  { id: "mobile", label: "Field Mobile Closer Suite", icon: Smartphone },
  { id: "telemetry", label: "Live Manager Telemetry", icon: BarChart3 },
  { id: "security", label: "Cryptographic Vault & RBAC", icon: ShieldCheck },
];

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("capture");

  const customEasing = [0.16, 1, 0.3, 1] as const;

  const sectionRevealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: customEasing },
    },
  };

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0077ff] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% LIGHT & AIRY)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-22 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-[#0077ff] animate-pulse" />
            <span>FULL ARCHITECTURAL CAPABILITY BREAKDOWN</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Engineered for pure sales velocity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Discover the technical infrastructure behind Sahyak CRM: sub-2-second Meta webhooks, native mobile execution, offline caching, and bank-grade data isolation.
          </motion.p>

          {/* Quick Category Navigation Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: customEasing }}
            className="pt-4 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto"
          >
            {FEATURE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? "bg-blue-50 text-[#0084ff] border-blue-200 shadow-xs font-bold"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0084ff]" : "text-slate-500"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. SIGNATURE INTERACTION: INTERACTIVE AUTOMATION FLOW BUILDER (SOFT SURFACE #F8FAFC)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 px-3 py-1 bg-white rounded-full border border-slate-200 font-heading">
              Trigger-to-Action Engine
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Interactive Automation Builder.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore how incoming webhooks, stalled deals, voice notes, and buyer intent automatically trigger precision closing sequences.
            </p>
          </div>

          <InteractiveAutomationBuilder />
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          3. FEATURE DEEP-DIVE 01: SUB-2S WEBHOOK INGESTION (PURE WHITE #FFFFFF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        id="capture"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] text-xs font-bold font-heading border border-blue-200">
                <Zap className="w-3.5 h-3.5" />
                <span>Pillar 01 // Inbound Capture</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                Zero CSVs. Sub-2-second Meta &amp; Ad Webhook Capture.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When a high-intent prospect clicks submit on Meta Instant Forms, Google Ads, or custom landing pages, Sahyak receives the payload in under 380ms.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Cryptographic HMAC Verification:</strong> Prevents spam bot injections and verifies authentic ad signatures.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Intelligent Deduplication:</strong> Identifies returning prospects and updates existing deal histories without duplicate clutter.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Smart Round-Robin Routing:</strong> Instantly allocates deals to the best active closer based on territory and active quota.</span>
                </div>
              </div>
            </div>

            {/* Right Technical Console (Light Clean Panel) */}
            <div className="lg:col-span-6 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 pb-3 border-b border-slate-200">
                <span className="text-[#0084ff] font-bold">EDGE INGESTION LOG // LATENCY: 0.38s</span>
                <span>STATUS: 200 OK</span>
              </div>
              <div className="space-y-2 text-slate-700">
                <div className="text-[#0084ff] font-semibold">&gt; POST /api/v1/webhooks/meta-instant-lead</div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-[11px] text-slate-600">
                  <div>&#123;</div>
                  <div className="pl-4">&quot;lead_id&quot;: &quot;LD-94812&quot;,</div>
                  <div className="pl-4">&quot;campaign&quot;: &quot;Luxury_Penthouses_NCR&quot;,</div>
                  <div className="pl-4">&quot;budget_tier&quot;: &quot;INR 45,00,000&quot;,</div>
                  <div className="pl-4">&quot;closer_assigned&quot;: &quot;Aditya Verma (Rep-104)&quot;,</div>
                  <div className="pl-4">&quot;whatsapp_proposal_armed&quot;: true</div>
                  <div>&#125;</div>
                </div>
                <div className="text-emerald-700 text-[11px] font-semibold">
                  &bull; Lead successfully dispatched to mobile closer in 0.38s.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          4. FEATURE DEEP-DIVE 02: FIELD MOBILE CLOSER SUITE (COOL BLUE SURFACE #F5F9FF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        id="mobile"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F5F9FF] border-b border-slate-200/80 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Mobile Preview (Light Silver Frame) */}
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="w-full max-w-[340px] rounded-3xl bg-white p-4 border-2 border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pb-2 border-b border-slate-100">
                  <span>Sahyak Mobile Closer</span>
                  <span>Native Mobile App</span>
                </div>

                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#0084ff] font-bold">1-TAP PROPOSAL DISPATCH</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Cloud API
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900">Dr. Arvind Rao</div>
                  <div className="text-[11px] text-slate-600">CarePlus MedTech • ₹24L Project</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="text-slate-500 text-[10px] font-mono uppercase">Verified PDF Attached</div>
                  <div className="text-slate-800 font-medium font-mono text-[11px]">
                    &quot;CarePlus_Enterprise_Proposal_v2.pdf&quot;
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Dispatched on official WhatsApp business channel in 0.8s.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] text-xs font-bold font-heading border border-blue-200">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Pillar 02 // Field Execution</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                Built for Closers Who Live on the Move.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Field sales professionals don&apos;t sit in front of laptops filling out 30-field forms. Sahyak gives them 1-tap WhatsApp PDF dispatches, voice note audio transcription, and full offline caching.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>1-Tap Verified WhatsApp Dispatch:</strong> Send official company brochures without saving client numbers to phonebook.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Voice Note AI Transcription:</strong> Speak notes while driving; auto-extracts deal budget and advances deal stage.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Offline Local Caching:</strong> Zero lag or data loss during basement site visits or low-network client offices.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          5. FEATURE DEEP-DIVE 03: LIVE MANAGER TELEMETRY (PURE WHITE #FFFFFF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        id="telemetry"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-white border-b border-slate-200/80 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] text-xs font-bold font-heading border border-blue-200">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Pillar 03 // Manager Cockpit</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
                Live Rep SLA Telemetry &amp; Anti-Stall Alarms.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Never wonder whether your sales squad is calling leads on time. Sahyak tracks every response milestone, highlights deal bottlenecks, and automates secondary escalation.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Sub-90-Second SLA Monitor:</strong> Real-time countdown on every inbound deal with automatic rep re-routing if untouched.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Rep Velocity Leaderboard:</strong> Track individual speed-to-lead, call volume, and won revenue in real time.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                  <span><strong>Deal Health Scoring:</strong> Identifies high-intent prospects viewing proposals multiple times.</span>
                </div>
              </div>
            </div>

            {/* Right Telemetry Stat Grid (Light Clean Cards) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-sm">
                <div className="text-xs font-mono text-slate-500 uppercase">Speed-to-Lead Benchmark</div>
                <div className="text-3xl font-extrabold text-[#0084ff] font-heading">&lt; 90s</div>
                <div className="text-xs text-slate-600">Sub-90-second SLA target on every inbound lead.</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-sm">
                <div className="text-xs font-mono text-slate-500 uppercase">Inbound Protection</div>
                <div className="text-3xl font-extrabold text-emerald-600 font-heading">Zero Loss</div>
                <div className="text-xs text-slate-600">No ad leads lost in CSVs or delayed inboxes.</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-sm">
                <div className="text-xs font-mono text-slate-500 uppercase">Field Velocity</div>
                <div className="text-3xl font-extrabold text-indigo-600 font-heading">1-Tap</div>
                <div className="text-xs text-slate-600">Instant proposal dispatch without phonebook saves.</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 shadow-sm">
                <div className="text-xs font-mono text-slate-500 uppercase">Edge Availability</div>
                <div className="text-3xl font-extrabold text-slate-900 font-heading">99.99%</div>
                <div className="text-xs text-slate-600">Global Cloudflare edge infrastructure uptime.</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          6. UNIVERSAL INTEGRATION ECOSYSTEM ARCHITECTURE (SOFT BLUE SURFACE #F5F9FF)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={sectionRevealVariants}
        className="py-20 lg:py-28 bg-[#F5F9FF] border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-[#0084ff] text-xs font-bold font-heading shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNIVERSAL STACK CONNECTIVITY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-heading">
              Plug Into Your Existing Revenue Stack.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Sahyak serves as your central speed-to-lead conduit, seamlessly bridging ad webhooks, verified WhatsApp Cloud channels, and payment gateways with zero custom middleware.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-2xl bg-white p-4 sm:p-8 border border-slate-200/90 shadow-xl overflow-hidden">
            <div className="relative w-full aspect-[1672/941] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center select-none">
              <video
                src="/videos/features-integration-ecosystem.mp4"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
              {/* Transparent shield layer preventing right-click, touch, dragging or download */}
              <div
                className="absolute inset-0 z-10 select-none bg-transparent cursor-default"
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          7. FINAL CTA BANNER (LIGHT ATMOSPHERIC PASTEL GRADIENT)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="atmospheric-cta-bg rounded-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-blue-200 text-xs font-semibold text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#0084ff] animate-pulse" />
                <span>60-SECOND ONBOARDING • PRE-CONFIGURED BLUEPRINTS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight font-heading">
                Ready to accelerate your deal pipeline?
              </h2>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Join hundreds of high-velocity closers and revenue teams deploying Sahyak CRM to eliminate lead leakage and scale revenue.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://crm.sahyak.com/signup/"
                  className="btn-pill-brand text-white px-8 py-3.5 font-extrabold text-sm shadow-lg w-full sm:w-auto"
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-pill-secondary px-7 py-3.5 font-semibold text-sm w-full sm:w-auto"
                >
                  Schedule Architecture Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
