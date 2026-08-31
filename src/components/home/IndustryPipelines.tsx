"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  DollarSign,
  Megaphone,
  HeartPulse,
  Laptop,
  ShoppingBag,
  Briefcase,
  CheckCircle2,
  FileText,
  Calendar,
  Shield,
  Layers,
  Sparkles,
  MapPin,
  TrendingUp,
  CreditCard,
  FileCheck,
  Package,
} from "lucide-react";

interface IndustryData {
  id: string;
  name: string;
  icon: React.ElementType;
  headline: string;
  subheadline: string;
  stages: string[];
  customFields: { label: string; example: string }[];
  impactMetric: string;
  prebuiltAssets: string[];
  renderVectorCue: () => React.ReactNode;
}

const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    headline: "Pre-Configured for High-Ticket Property Developers & Brokerages",
    subheadline:
      "Eliminate lead leakage from property portals and Meta Ads. Auto-schedule site visits, track unit inventory, and coordinate broker commissions.",
    stages: [
      "Inbound Portal Lead",
      "WhatsApp Brochure Sent",
      "Site Visit Scheduled",
      "Unit Token Blocked",
      "Registry & Agreement",
      "Commission Dispatched",
    ],
    customFields: [
      { label: "Unit Configuration", example: "3BHK Luxury + Servant Room" },
      { label: "Carpet Area", example: "1,850 sq.ft (Tower B, 14th Floor)" },
      { label: "Payment Milestone", example: "Construction Linked 20:80" },
      { label: "Site Visit Driver", example: "Assigned (Cab Booking SLA: 20m)" },
    ],
    impactMetric: "Higher Site Visit-to-Booking Ratio",
    prebuiltAssets: [
      "Dynamic PDF Floor Plan Generator",
      "1-Tap WhatsApp Location Pin Dispatch",
      "Broker Commission Auto-Split Matrix",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-[#0077ff]">
            <Building2 className="w-3.5 h-3.5" />
            <span>REALTY BLUEPRINT CUE</span>
          </span>
          <span className="text-slate-400">Unit #B-1402</span>
        </div>
        <div className="h-20 bg-white rounded-lg border border-dashed border-slate-300 p-2.5 flex items-center justify-around text-center text-[10px] text-slate-500">
          <div className="p-2 border border-slate-200 rounded bg-slate-50">
            <div className="font-bold text-slate-800">Master Suite</div>
            <div>14x16 ft</div>
          </div>
          <div className="p-2 border border-blue-200 rounded bg-blue-50/50 text-[#0077ff]">
            <div className="font-bold">Living Balcony</div>
            <div>North-East View</div>
          </div>
          <div className="p-2 border border-slate-200 rounded bg-slate-50">
            <div className="font-bold text-slate-800">Modular Kitchen</div>
            <div>10x12 ft</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "finance",
    name: "Finance & Advisory",
    icon: DollarSign,
    headline: "Compliance-Ready Pipeline for Wealth Managers & Loan Advisors",
    subheadline:
      "Manage high-value portfolio inquiries, track KYC documentation stages, and automate loan sanction workflows with role-based data masking.",
    stages: [
      "Inquiry Ingested",
      "KYC & CIBIL Check",
      "Financial Proposal Sent",
      "Sanction Letter Issued",
      "Disbursement Completed",
    ],
    customFields: [
      { label: "Requested Amount", example: "₹1.50 Crore Portfolio" },
      { label: "CIBIL Score", example: "784 (Pre-Approved)" },
      { label: "Lending Partner", example: "HDFC Bank / ICICI Bank" },
      { label: "KYC Vault Status", example: "Cryptographically Verified" },
    ],
    impactMetric: "Faster Loan Sanction Velocity",
    prebuiltAssets: [
      "Automated CIBIL Pre-Qualification API",
      "WhatsApp KYC Document Upload Bot",
      "End-to-End Audit Trail Logging",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-emerald-600">
            <CreditCard className="w-3.5 h-3.5" />
            <span>FINANCIAL SANCTION VAULT</span>
          </span>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[10px]">
            CIBIL 784
          </span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">Sanction Letter #SN-9482</div>
            <div className="text-[10px] text-slate-500 font-mono">Disbursement: ₹1.50 Cr • 8.4% p.a.</div>
          </div>
          <FileCheck className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
    ),
  },
  {
    id: "agencies",
    name: "Agencies & Media",
    icon: Megaphone,
    headline: "High-Velocity Retainer Pipeline for Growth & Creative Agencies",
    subheadline:
      "Track incoming client briefs, send customized scope-of-work proposals, automate contract renewals, and prevent deal stalls.",
    stages: [
      "Discovery Brief Ingested",
      "Audit Deck Delivered",
      "Scope & Retainer Sent",
      "Contract Signed",
      "Onboarding Kickoff",
    ],
    customFields: [
      { label: "Monthly Ad Spend", example: "₹15 Lakhs / month" },
      { label: "Primary Objective", example: "Meta Ads ROAS Scaling" },
      { label: "Retainer Bracket", example: "₹1,25,000 / month" },
      { label: "Audit Turnaround SLA", example: "Under 4 Hours" },
    ],
    impactMetric: "Faster Pitch-to-Close Velocity",
    prebuiltAssets: [
      "Dynamic Pitch Deck Delivery Pipeline",
      "1-Click Scope of Work PDF Dispatch",
      "Client Retainer Renewal Radar",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-indigo-600">
            <Megaphone className="w-3.5 h-3.5" />
            <span>AGENCY SOW &amp; BRIEF</span>
          </span>
          <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono text-[10px]">
            Retainer Active
          </span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">Performance Growth Retainer</div>
            <div className="text-[10px] text-slate-500 font-mono">Q3 Deliverables: Meta Ads + Creative Sprints</div>
          </div>
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    ),
  },
  {
    id: "healthcare",
    name: "Healthcare & Clinics",
    icon: HeartPulse,
    headline: "Patient Intake & Procedure Booking Engine for Premium Clinics",
    subheadline:
      "Automate consultation reminders, track treatment plan follow-ups, and maintain encrypted patient inquiry confidentiality.",
    stages: [
      "Inquiry Ingested",
      "Consultation Booked",
      "Treatment Quoted",
      "Procedure Scheduled",
      "Post-Op Follow-up",
    ],
    customFields: [
      { label: "Specialty Requested", example: "Advanced Aesthetic Dental" },
      { label: "Consultant Doctor", example: "Dr. Arvind Rao" },
      { label: "Procedure Estimate", example: "₹1,85,000" },
      { label: "WhatsApp Reminder", example: "Automated (24h & 2h Before)" },
    ],
    impactMetric: "Reduction in Patient No-Shows",
    prebuiltAssets: [
      "Encrypted Consultation Intake Form",
      "Automated Calendar SMS & WhatsApp Sync",
      "Post-Consultation Prescription Vault",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-rose-600">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>CLINICAL INTAKE SCHEDULE</span>
          </span>
          <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-mono text-[10px]">
            Confirmed
          </span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">Dr. Arvind Rao Consultation</div>
            <div className="text-[10px] text-slate-500 font-mono">Tuesday 11:30 AM • Aesthetic Dental</div>
          </div>
          <Calendar className="w-6 h-6 text-rose-600" />
        </div>
      </div>
    ),
  },
  {
    id: "saas",
    name: "SaaS & Tech Sales",
    icon: Laptop,
    headline: "Product-Led Inbound Demo & Enterprise Pilot Pipeline",
    subheadline:
      "Convert signups into enterprise contracts. Track product usage spikes, automate demo cadences, and arm sales reps with live buyer intent.",
    stages: [
      "Product Signup",
      "Intent Spike Detected",
      "Discovery Call Done",
      "Enterprise Pilot Live",
      "Annual Contract Won",
    ],
    customFields: [
      { label: "Active Seats Tier", example: "50-100 Users" },
      { label: "Tech Stack In Use", example: "Next.js, PostgreSQL, Edge APIs" },
      { label: "Contract Value (ACV)", example: "₹18,00,000 / year" },
      { label: "Security Review", example: "SOC 2 Type II Approved" },
    ],
    impactMetric: "Faster Enterprise Deal Velocity",
    prebuiltAssets: [
      "Product Usage Webhook Trigger Engine",
      "Enterprise Security Pack Dispatch",
      "Multi-Stakeholder Champion Mapper",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-cyan-600">
            <Laptop className="w-3.5 h-3.5" />
            <span>ENTERPRISE PILOT MAPPER</span>
          </span>
          <span className="text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded font-mono text-[10px]">
            50 Seats Live
          </span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">ACV: ₹18,00,000 / year</div>
            <div className="text-[10px] text-slate-500 font-mono">SOC 2 Approved • Security Review Cleared</div>
          </div>
          <Shield className="w-6 h-6 text-cyan-600" />
        </div>
      </div>
    ),
  },
  {
    id: "retail",
    name: "Retail & Distribution",
    icon: ShoppingBag,
    headline: "Wholesale B2B Distribution & Channel Partner Management",
    subheadline:
      "Manage dealer networks, streamline re-orders, and track field distributor visits with offline catalog synchronization.",
    stages: [
      "Dealer Ingested",
      "KYC & GST Verified",
      "Wholesale Catalog Shared",
      "Purchase Order Placed",
      "Logistics Dispatched",
    ],
    customFields: [
      { label: "GSTIN Number", example: "07AAAAA0000A1Z5 (Active)" },
      { label: "Territory Region", example: "North India (Punjab & Haryana)" },
      { label: "Initial PO Value", example: "₹8,50,000" },
      { label: "Credit Term", example: "30-Day Revolving Line" },
    ],
    impactMetric: "Increase in Dealer Repeat Orders",
    prebuiltAssets: [
      "WhatsApp Product Catalog Sync",
      "1-Tap GST Verification API",
      "Distributor Re-Order WhatsApp Cadence",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-amber-600">
            <Package className="w-3.5 h-3.5" />
            <span>DISTRIBUTOR PO &amp; GST CUE</span>
          </span>
          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono text-[10px]">
            GST Verified
          </span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">PO #ORD-7481: ₹8,50,000</div>
            <div className="text-[10px] text-slate-500 font-mono">Dispatched to Punjab Territory Warehouse</div>
          </div>
          <ShoppingBag className="w-6 h-6 text-amber-600" />
        </div>
      </div>
    ),
  },
  {
    id: "consulting",
    name: "Consulting & Legal",
    icon: Briefcase,
    headline: "High-Trust Retainer & Project Advisory Pipeline",
    subheadline:
      "Seamlessly manage corporate client engagements, protect sensitive legal notes with cryptographic RBAC, and track billing milestones.",
    stages: [
      "Inquiry Ingested",
      "NDA Executed",
      "Strategy Deck Presented",
      "Retainer Signed",
      "Milestone Invoiced",
    ],
    customFields: [
      { label: "Practice Area", example: "Corporate M&A & Tax Strategy" },
      { label: "Engagement Type", example: "Quarterly Retainer" },
      { label: "Estimated Fee", example: "₹12,00,000" },
      { label: "Data Masking", example: "Partner-Only Access Active" },
    ],
    impactMetric: "Faster NDA-to-Retainer Velocity",
    prebuiltAssets: [
      "Automated Digital NDA Execution Bot",
      "1-Click Strategic Proposal Generator",
      "Encrypted Legal Matter Document Vault",
    ],
    renderVectorCue: () => (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
          <span className="flex items-center gap-1.5 text-violet-600">
            <Briefcase className="w-3.5 h-3.5" />
            <span>LEGAL MATTER &amp; NDA VAULT</span>
          </span>
          <span className="text-violet-700 bg-violet-50 px-2 py-0.5 rounded font-mono text-[10px]">
            NDA Signed
          </span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-slate-900">Corporate M&amp;A Advisory</div>
            <div className="text-[10px] text-slate-500 font-mono">Retainer: ₹12,00,000 • Encrypted Vault</div>
          </div>
          <FileText className="w-6 h-6 text-violet-600" />
        </div>
      </div>
    ),
  },
];

export const IndustryPipelines: React.FC = () => {
  const [activeIndustryId, setActiveIndustryId] = useState<string>("real-estate");
  const activeIndustry =
    INDUSTRIES_DATA.find((ind) => ind.id === activeIndustryId) ||
    INDUSTRIES_DATA[0];

  return (
    <div className="w-full space-y-8">
      {/* Industry Ribbon Bar */}
      <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 gap-1.5">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = ind.icon;
            const isActive = ind.id === activeIndustryId;

            return (
              <button
                key={ind.id}
                onClick={() => setActiveIndustryId(ind.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#0084ff] shadow-sm border border-blue-200 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0084ff]" : "text-slate-500"}`} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Industry Pipeline Blueprint Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndustry.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-6 sm:p-10 text-slate-900 space-y-8 shadow-xl relative overflow-hidden border border-slate-200/90"
        >
          {/* Header & Impact Metric */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0084ff] text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VERTICAL SALES BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {activeIndustry.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeIndustry.subheadline}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center shrink-0 self-start md:self-auto space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                Proven Impact
              </div>
              <div className="text-sm sm:text-base font-extrabold text-[#0084ff] font-heading">
                {activeIndustry.impactMetric}
              </div>
            </div>
          </div>

          {/* Industry Vector Workflow Cue Banner */}
          <div>
            {activeIndustry.renderVectorCue()}
          </div>

          {/* Deal Stage Flow Progression */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-slate-500 font-bold">
              Configured Deal Stages (Zero Setup Chaos)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {activeIndustry.stages.map((stage, idx) => (
                <div
                  key={stage}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1"
                >
                  <span className="text-[10px] font-mono text-[#0084ff] font-bold">0{idx + 1}</span>
                  <div className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                    {stage}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Custom Fields & Pre-built Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Custom Schema Fields */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-600 font-bold">
                Vertical-Specific Schema Fields
              </div>
              <div className="space-y-2">
                {activeIndustry.customFields.map((field) => (
                  <div
                    key={field.label}
                    className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-500">{field.label}:</span>
                    <span className="font-mono font-bold text-slate-900">{field.example}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prebuilt Operational Assets */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-600 font-bold">
                Included Automation &amp; PDF Assets
              </div>
              <div className="space-y-2.5">
                {activeIndustry.prebuiltAssets.map((asset) => (
                  <div key={asset} className="flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0084ff] shrink-0 mt-0.5" />
                    <span>{asset}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
