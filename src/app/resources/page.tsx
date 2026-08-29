"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Play,
  FileText,
  Download,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  DollarSign,
  Megaphone,
  ShoppingBag,
  Activity,
  Code2,
  ChevronRight,
  ExternalLink,
  Layers,
  Zap,
  Briefcase,
} from "lucide-react";

const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: customEasing },
  },
};

interface IndustryResource {
  id: string;
  name: string;
  icon: React.ElementType;
  tagline: string;
  videoTitle: string;
  videoDuration: string;
  videoDescription: string;
  quickStartDesc: string;
  advancedDesc: string;
  keyWorkflows: string[];
  samplePayload: string;
}

const INDUSTRY_RESOURCES: IndustryResource[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    tagline: "High-ticket property closings, project brochure delivery, and on-site field visits.",
    videoTitle: "Real Estate Masterclass: From Meta Ad Lead to Site Visit in Under 10 Mins",
    videoDuration: "14:20 mins",
    videoDescription:
      "Watch how top Noida and Mumbai developers configure automated WhatsApp brochures, schedule site visits, and lock agent pipeline visibility.",
    quickStartDesc: "Step-by-step setup for Meta Lead Ads webhook, 2-tap floor plan dispatch, and offline field visit logs.",
    advancedDesc: "Multi-tier developer hierarchy, round-robin team distribution by unit size, and anti-leakage lead locking.",
    keyWorkflows: [
      "Sub-2s WhatsApp brochure delivery upon Meta Lead Ad submit",
      "Field visit GPS check-in and voice note transcription",
      "Automated lead re-assignment if no response in 5 minutes",
    ],
    samplePayload: `// Real Estate Webhook Schema (Palm Residences)
{
  "lead_source": "META_ADS_NCR_SECTOR_150",
  "project_name": "Luxury Palm Penthouses",
  "budget_bracket": "₹2.5Cr - ₹4.0Cr",
  "auto_dispatch_pdf": "brochure_v3_compressed.pdf",
  "assigned_rep": "Rohan Varma (NCR West)"
}`,
  },
  {
    id: "finance",
    name: "Finance & Wealth",
    icon: DollarSign,
    tagline: "Client confidentiality, portfolio advisory schedules, and audit compliance.",
    videoTitle: "Wealth Advisory Engine: End-to-End KYC & Client Onboarding Flow",
    videoDuration: "11:45 mins",
    videoDescription:
      "Configure encrypted client intake pipelines, automated meeting reminders, and strict compliance export controls.",
    quickStartDesc: "Configuring financial lead tags, automated NDA dispatch, and phone verification.",
    advancedDesc: "7-year immutable audit log configuration, SOC 2 compliance reporting, and custom portfolio bridges.",
    keyWorkflows: [
      "Encrypted investor inquiry ingestion with automated KYC link",
      "Meeting reminder triggers with calendar webhook sync",
      "Masked client phone numbers for advisor outbound dialing",
    ],
    samplePayload: `// Financial Advisory Webhook Schema
{
  "lead_source": "WEALTH_ADVISORY_LP",
  "investment_bracket": "₹50L+",
  "compliance_tier": "SEBI_ACCREDITED",
  "nda_status": "AUTO_DISPATCHED",
  "data_retention_years": 7
}`,
  },
  {
    id: "agencies",
    name: "Agencies & Performance",
    icon: Megaphone,
    tagline: "Multi-client routing, speed-to-lead SLAs, and conversion attribution.",
    videoTitle: "Agency Blueprint: Managing 20+ Client Ad Accounts from One Glass Cockpit",
    videoDuration: "16:10 mins",
    videoDescription:
      "How growth agencies route leads directly to their clients' sales teams while maintaining master telemetry and SLA tracking.",
    quickStartDesc: "Setting up multi-workspace sub-accounts, client webhook bridges, and custom notification webhooks.",
    advancedDesc: "Custom white-label reporting, cross-account conversion benchmarking, and agency revenue attribution.",
    keyWorkflows: [
      "Multi-tenant client workspace partitioning with custom branding",
      "Sub-second round-robin distribution to client sales reps",
      "Real-time SLA breach alerts to agency account managers",
    ],
    samplePayload: `// Agency Multi-Client Webhook Schema
{
  "agency_id": "APEX_GROWTH_MEDIA",
  "client_workspace_id": "WS_CLIENT_948",
  "campaign_id": "GOOG_SEARCH_B2B_Q3",
  "sla_threshold_seconds": 180,
  "notification_channel": "WHATSAPP_DISPATCH"
}`,
  },
  {
    id: "retail",
    name: "Retail & Franchise",
    icon: ShoppingBag,
    tagline: "Store inquiries, high-ticket distributor onboarding, and regional inventory alerts.",
    videoTitle: "Franchise Growth: Automated Inquiry Triage & Territory Assignment",
    videoDuration: "09:50 mins",
    videoDescription:
      "Automate retail store lead routing, catalog dispatch via WhatsApp, and regional franchisee onboarding.",
    quickStartDesc: "Store locator webhook setup, automated catalog delivery, and WhatsApp order triggers.",
    advancedDesc: "Territory exclusivity mapping, wholesale discount tier workflows, and franchisee analytics.",
    keyWorkflows: [
      "Automated product catalog delivery via interactive WhatsApp buttons",
      "Geo-location based lead assignment to nearest franchise store",
      "Bulk inventory arrival notifications to pre-qualified buyers",
    ],
    samplePayload: `// Franchise Lead Schema
{
  "lead_source": "FRANCHISE_EXPANSION_INQUIRY",
  "target_city": "Chandigarh",
  "investment_readiness": "Ready within 30 days",
  "assigned_territory_manager": "North Zone Desk"
}`,
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    icon: Activity,
    tagline: "Patient consultation booking, doctor availability alerts, and strict HIPAA privacy.",
    videoTitle: "Clinic Pipeline: Zero-Wait Patient Booking & Doctor Telemetry",
    videoDuration: "12:30 mins",
    videoDescription:
      "Streamline clinic appointment requests, pre-consultation medical questionnaires, and automated reminder broadcasts.",
    quickStartDesc: "Consultation booking form integration, WhatsApp confirmation alerts, and doctor slot routing.",
    advancedDesc: "HIPAA-compliant data partitioning, doctor schedule synchronization, and follow-up cadence automation.",
    keyWorkflows: [
      "Instant WhatsApp confirmation with appointment calendar link",
      "Pre-consultation symptom questionnaire automated collection",
      "Strict medical record privacy with role-based masking",
    ],
    samplePayload: `// Healthcare Appointment Schema
{
  "service_type": "DENTAL_IMPLANT_CONSULT",
  "patient_urgency": "High",
  "preferred_slot": "Saturday Morning",
  "privacy_mode": "ENCRYPTED_ISOLATION"
}`,
  },
  {
    id: "saas",
    name: "SaaS & Tech",
    icon: Code2,
    tagline: "Demo scheduling, enterprise trial qualification, and CRM data enrichment.",
    videoTitle: "SaaS Sales Engine: Converting High-Intent Signups into Closed Won ARR",
    videoDuration: "15:00 mins",
    videoDescription:
      "Learn how B2B software companies route product-qualified leads, trigger VIP demo calendar links, and track pipeline velocity.",
    quickStartDesc: "Connecting website signup webhooks, domain enrichment, and instant Slack/WhatsApp alerts.",
    advancedDesc: "Product-Qualified Lead (PQL) score triggers, enterprise contract routing, and executive pipeline reviews.",
    keyWorkflows: [
      "Instant calendar scheduling link dispatch upon signup",
      "Lead domain enrichment to identify company revenue and headcount",
      "Automated executive escalation for enterprise-tier signups",
    ],
    samplePayload: `// SaaS Inbound Signup Schema
{
  "signup_source": "PRICING_PAGE_TRIAL",
  "company_domain": "enterprise-tech.io",
  "estimated_seats": 25,
  "pql_score": 92,
  "assigned_ae": "Enterprise Desk"
}`,
  },
  {
    id: "consulting",
    name: "Consulting & Advisory",
    icon: Briefcase,
    tagline: "Partner triage, retainer proposals, and high-ticket client engagement.",
    videoTitle: "Consulting Practice: Converting Inbound Audits into ₹50L+ Retainers",
    videoDuration: "13:15 mins",
    videoDescription:
      "Configure automated discovery questionnaire triggers, partner-level lead assignment, and confidential proposal dispatches.",
    quickStartDesc: "Discovery intake form webhooks, automated NDA generation, and executive calendar booking.",
    advancedDesc: "Multi-partner revenue attribution, practice area routing, and conflict-of-interest screening logs.",
    keyWorkflows: [
      "Sub-second discovery call confirmation with calendar integration",
      "Automated proposal deck and credential kit WhatsApp dispatch",
      "Executive client confidentiality tagging and access masking",
    ],
    samplePayload: `// Consulting Advisory Lead Schema
{
  "lead_source": "ENTERPRISE_AUDIT_REQUEST",
  "client_industry": "FinTech / Payments",
  "projected_retainer": "₹50L - ₹1Cr",
  "engagement_type": "Q3_TRANSFORMATION",
  "assigned_partner": "Strategy Practice Desk"
}`,
  },
];

export default function ResourcesPage() {
  const [activeIndustryId, setActiveIndustryId] = useState<string>("real-estate");
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const activeIndustry =
    INDUSTRY_RESOURCES.find((r) => r.id === activeIndustryId) || INDUSTRY_RESOURCES[0];

  const handleDownload = (docName: string) => {
    setDownloadingDoc(docName);
    setTimeout(() => {
      // Create a mock clean download trigger
      const element = document.createElement("a");
      const file = new Blob([
        `Sahyak CRM — ${activeIndustry.name} Architecture Blueprint\nDocument: ${docName}\nDate: ${new Date().toLocaleDateString()}\nStatus: Verified Production Guide\n\n1. Webhook Configuration\n2. WhatsApp Automation Setup\n3. Role-Based Permissions\n4. Field App Deployment\n\nVisit: https://crm.sahyak.com/`,
      ], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `Sahyak_${activeIndustry.name.replace(/\s+/g, "_")}_${docName.replace(/\s+/g, "_")}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingDoc(null);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-12 lg:pt-20 lg:pb-16 bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-6"
          >
            <BookOpen className="w-4 h-4 text-slate-900" />
            <span>KNOWLEDGE BASE & INDUSTRY BLUEPRINTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Platform Mastery.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6"
          >
            Explore industry-specific workflows, deployment guides, and best practices to maximize your sales velocity.
          </motion.p>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE INTERACTIVE INDUSTRY LAYOUT (Sidebar + Main Content)
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ─── LEFT SIDEBAR (Industry Navigation) ─── */}
          <aside className="lg:col-span-3 bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5 sm:p-4 lg:sticky lg:top-24 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-heading block">
                Select Industry Vertical
              </span>
              <span className="text-[10px] font-mono text-slate-400 lg:hidden">Swipe ➔</span>
            </div>

            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 lg:gap-1 pb-1 lg:pb-0 no-scrollbar relative">
              {INDUSTRY_RESOURCES.map((industry) => {
                const Icon = industry.icon;
                const isActive = activeIndustryId === industry.id;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndustryId(industry.id)}
                    className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-200 text-left shrink-0 lg:shrink lg:w-full ${
                      isActive
                        ? "text-white font-bold"
                        : "bg-white lg:bg-transparent text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200/60 lg:border-transparent"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndustrySidebarPill"
                        className="absolute inset-0 bg-slate-900 rounded-xl shadow-sm -z-10"
                        transition={{ duration: 0.45, ease: customEasing }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{industry.name}</span>
                    </div>
                    {isActive && <ChevronRight className="relative z-10 w-3.5 h-3.5 text-slate-400 hidden lg:inline-block" />}
                  </button>
                );
              })}
            </nav>

            <div className="hidden lg:block pt-3 mt-3 border-t border-slate-200/80 px-1 space-y-2 text-xs text-slate-500">
              <span className="font-bold text-slate-900 block font-heading">Need a custom schema?</span>
              <p className="text-[11px] leading-relaxed">Our architecture team models custom fields for your specific pipeline.</p>
              <Link
                href="/contact"
                className="inline-flex items-center text-[11px] font-bold text-slate-900 hover:underline pt-1"
              >
                <span>Request Custom Blueprint</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </aside>

          {/* ─── MAIN CONTENT AREA (Dynamic based on selected industry) ─── */}
          <main className="lg:col-span-9 space-y-10 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: customEasing }}
                className="space-y-10"
              >
                
                {/* Header of Active Industry */}
                <div className="border-b border-slate-200 pb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800 uppercase">
                      {activeIndustry.name} Blueprint
                    </span>
                    <span className="text-xs text-slate-400 font-mono">v3.2 Production Ready</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                    {activeIndustry.name} End-to-End Sales Architecture
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {activeIndustry.tagline}
                  </p>
                </div>

                {/* ─── SECTION A: VIDEO WALKTHROUGH PLACEHOLDER ─── */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Mastery Video Walkthrough
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {activeIndustry.videoDuration}
                    </span>
                  </div>

                  {/* 16:9 Aspect Ratio Dark Slate Video Wrapper */}
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center group cursor-pointer">
                    
                    {/* Background Video Thumbnail Image */}
                    <Image
                      src="/images/resources/video-thumbnail.png"
                      alt={activeIndustry.videoTitle}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 900px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 pointer-events-none" />

                    {/* Top Status Bar */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono font-semibold text-white shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>4K UHD • {activeIndustry.name} Masterclass</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-300 bg-slate-900/90 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
                        {activeIndustry.videoDuration}
                      </span>
                    </div>

                    {/* Play Icon Button with Pulse Animation */}
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-4 text-center p-6">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 animate-ping pointer-events-none" />
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
                        </div>
                      </div>

                      <div className="space-y-1 max-w-lg">
                        <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                          {activeIndustry.videoTitle}
                        </h4>
                        <p className="text-xs text-slate-300 hidden sm:block">
                          Click to play interactive video overview (HD 1080p).
                        </p>
                      </div>
                    </div>

                    {/* Bottom Chapter Scrubber Bar */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-[11px] font-mono text-slate-300 shadow-xl">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Chapter 1: Ingestion ➔ Chapter 2: WhatsApp Triggers ➔ Chapter 3: RBAC</span>
                      </span>
                      <span className="text-emerald-400 font-bold hidden sm:inline-block">Ready to Stream</span>
                    </div>

                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    {activeIndustry.videoDescription}
                  </p>
                </div>

                {/* ─── SECTION B: ARCHITECTURE BLUEPRINTS (PDF DOWNLOADS) ─── */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Architecture Blueprints & Guides
                    </h3>
                    <p className="text-xs text-slate-500">
                      Official PDF documentation ready for your engineering and sales ops teams.
                    </p>
                  </div>

                  {/* 2-Column Minimalist Physical Document Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Card 1: Quick Start Guide */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-5 hover:border-slate-300 transition-all">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                          DOCUMENT // 01
                        </span>
                        <h4 className="text-base font-bold text-slate-900 font-heading">
                          Quick Start Guide ({activeIndustry.name})
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {activeIndustry.quickStartDesc}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDownload("Quick_Start_Guide")}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-heading transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>
                          {downloadingDoc === "Quick_Start_Guide" ? "Generating PDF..." : "Download PDF (3.2 MB)"}
                        </span>
                      </button>
                    </div>

                    {/* Card 2: Advanced Automation Workflows */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-5 hover:border-slate-300 transition-all">
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center">
                          <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                          DOCUMENT // 02
                        </span>
                        <h4 className="text-base font-bold text-slate-900 font-heading">
                          Advanced Automation Workflows
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {activeIndustry.advancedDesc}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDownload("Advanced_Automation_Workflows")}
                        className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 text-xs font-bold font-heading transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        <span>
                          {downloadingDoc === "Advanced_Automation_Workflows" ? "Generating PDF..." : "Download PDF (5.8 MB)"}
                        </span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* ─── SECTION C: KEY INDUSTRY WORKFLOWS & SCHEMA ─── */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Core Operational Automations Included:
                  </h3>

                  <div className="space-y-2.5">
                    {activeIndustry.keyWorkflows.map((flow, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{flow}</span>
                      </div>
                    ))}
                  </div>

                  {/* Schema Preview */}
                  <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 space-y-2 font-mono text-xs overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                      <span>AUTOMATION WEBHOOK PAYLOAD SCHEMA</span>
                      <span className="text-emerald-400">JSON VALIDATED</span>
                    </div>
                    <pre className="text-[11px] text-slate-300 leading-relaxed overflow-x-auto">
                      {activeIndustry.samplePayload}
                    </pre>
                  </div>
                </div>

                {/* Direct CTA */}
                <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-bold font-heading text-white">
                      Ready to deploy the {activeIndustry.name} workflow?
                    </h4>
                    <p className="text-xs text-slate-300">
                      Get set up with this exact schema in under 60 seconds.
                    </p>
                  </div>
                  <Link
                    href="https://crm.sahyak.com/signup/"
                    className="btn-pill-primary bg-white text-slate-900 hover:bg-slate-100 text-xs py-2.5 px-6 font-bold shrink-0"
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

    </div>
  );
}
