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
  ArrowRight,
  Sparkles,
  Layers,
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
}

const INDUSTRIES_DATA: IndustryData[] = [
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Building2,
    headline: "Engineered for High-Ticket Property Developers & Brokerages",
    subheadline:
      "Eliminate lead leakage from 99acres, MagicBricks & Meta Ads. Auto-schedule site visits, track unit inventories, and calculate broker commissions in real time.",
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
      { label: "Payment Milestone", example: "CLP 20:80 Subvention" },
      { label: "Site Visit Driver", example: "Assigned (Cab Booking SLA: 20m)" },
    ],
    impactMetric: "41% Higher Site Visit-to-Booking Ratio",
    prebuiltAssets: [
      "Dynamic PDF Floor Plan Generator",
      "1-Tap WhatsApp Location Pin Dispatch",
      "Broker Commission Auto-Split Matrix",
    ],
  },
  {
    id: "finance",
    name: "Finance & Advisory",
    icon: DollarSign,
    headline: "Compliance-Ready CRM for Wealth Managers & Loan Advisors",
    subheadline:
      "Manage high-value portfolio inquiries, track KYC documentation stages, and automate loan sanction workflows with strict role-based data masking.",
    stages: [
      "Lead Ingested",
      "KYC & CIBIL Check",
      "Financial Proposal Sent",
      "Sanction Letter Issued",
      "Disbursement Completed",
    ],
    customFields: [
      { label: "AUM / Loan Request", example: "₹1.50 Crore" },
      { label: "CIBIL Score", example: "784 (Pre-Approved)" },
      { label: "Lending Partner", example: "HDFC Bank / ICICI Bank" },
      { label: "KYC Vault Status", example: "Cryptographically Verified" },
    ],
    impactMetric: "3.2x Faster Loan Sanction Velocity",
    prebuiltAssets: [
      "Automated CIBIL Pre-Qualification API",
      "WhatsApp KYC Document Upload Bot",
      "End-to-End Audit Trail Logging",
    ],
  },
  {
    id: "agencies",
    name: "Agencies & Media",
    icon: Megaphone,
    headline: "High-Velocity Retainer Pipeline for Growth & Creative Agencies",
    subheadline:
      "Track incoming client briefs, send customized scope-of-work proposals, automate contract renewals, and prevent deal stalls.",
    stages: [
      "Discovery Form Ingested",
      "Audit Deck Delivered",
      "Scope & Retainer Sent",
      "Contract Signed",
      "Onboarding Kickoff",
    ],
    customFields: [
      { label: "Monthly Ad Spend", example: "₹15 Lakhs / month" },
      { label: "Primary Objective", example: "Meta Ads ROAS Scaling" },
      { label: "Retainer Bracket", example: "₹1,25,00,00 / mo" },
      { label: "Audit Turnaround SLA", example: "Under 4 Hours" },
    ],
    impactMetric: "2.8x Faster Pitch-to-Close Velocity",
    prebuiltAssets: [
      "Dynamic Pitch Deck Delivery Pipeline",
      "1-Click Scope of Work PDF Dispatch",
      "Client Retainer Renewal Radar",
    ],
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
    impactMetric: "88% Reduction in Patient No-Shows",
    prebuiltAssets: [
      "Encrypted Consultation Intake Form",
      "Automated Calendar SMS & WhatsApp Sync",
      "Post-Consultation Prescription Vault",
    ],
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
      { label: "Tech Stack In Use", example: "Next.js, Supabase, Cloudflare" },
      { label: "Contract Value (ACV)", example: "₹18,00,000 / year" },
      { label: "Security Review", example: "SOC 2 Type II Approved" },
    ],
    impactMetric: "44% Faster Enterprise Deal Cycles",
    prebuiltAssets: [
      "Product Usage Webhook Trigger Engine",
      "Enterprise Security Pack Dispatch",
      "Multi-Stakeholder Champion Mapper",
    ],
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
    impactMetric: "35% Increase in Dealer Repeat Orders",
    prebuiltAssets: [
      "WhatsApp Product Catalog Sync",
      "1-Tap GST Verification API",
      "Distributor Re-Order WhatsApp Cadence",
    ],
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
    impactMetric: "3.5x Faster NDA-to-Retainer Velocity",
    prebuiltAssets: [
      "Automated Digital NDA Execution Bot",
      "1-Click Strategic Proposal Generator",
      "Encrypted Legal Matter Document Vault",
    ],
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
                    ? "bg-white text-[#0084ff] shadow-md border border-blue-200 font-bold"
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

      {/* Active Industry Pipeline Blueprint Display (100% Light Surface) */}
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0084ff] text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PRE-CONFIGURED VERTICAL BLUEPRINT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                {activeIndustry.headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeIndustry.subheadline}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center shrink-0 self-start md:self-auto space-y-1">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Verified Velocity Surge</div>
              <div className="text-base sm:text-lg font-extrabold text-[#0084ff] font-heading">
                {activeIndustry.impactMetric}
              </div>
            </div>
          </div>

          {/* Deal Stage Flow Progression */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-slate-500 font-bold">
              Configured Deal Stages (Zero-Setup Workflow)
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
