import React from "react";
import {
  Zap,
  Share2,
  FileCheck2,
  MessageSquare,
  MapPin,
  Mic,
  Database,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Landmark,
  Megaphone,
  Stethoscope,
  Laptop,
  ShoppingBag,
  Briefcase,
} from "lucide-react";

/**
 * 1. Lead Source Signal Badge
 */
export function LeadSourceSignal({
  source = "Meta Instant Form",
  campaign = "Luxury Penthouse Ad #04",
  className = "",
}: {
  source?: string;
  campaign?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-blue-200/90 shadow-lg shadow-blue-500/10 ${className}`}
    >
      <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0077ff] flex items-center justify-center shrink-0 border border-blue-200">
        <Zap className="w-3.5 h-3.5 fill-[#0077ff]/20 text-[#0077ff]" />
      </div>
      <div className="text-left leading-none space-y-0.5">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
          {source}
        </div>
        <div className="text-xs font-bold text-slate-900 font-heading truncate max-w-[140px]">
          {campaign}
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Smart-Routing Connector Pill
 */
export function SmartRoutingConnector({
  repName = "Aditya V.",
  squad = "North Closer Squad",
  sla = "0.38s Ingest",
  className = "",
}: {
  repName?: string;
  squad?: string;
  sla?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white shadow-md text-xs font-medium ${className}`}
    >
      <Share2 className="w-3 h-3 text-[#00a3ff]" />
      <span>
        Routed to <strong className="text-white font-bold">{repName}</strong> ({squad})
      </span>
      <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono font-bold text-blue-200">
        {sla}
      </span>
    </div>
  );
}

/**
 * 3. Verified Proposal / Document Card (Transparent Floating Card)
 */
export function FloatingProposalCard({
  title = "Proposal_Luxury_Unit402.pdf",
  size = "1.4 MB",
  verified = true,
  className = "",
}: {
  title?: string;
  size?: string;
  verified?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`p-3 sm:p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 space-y-2 text-left transition-transform hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-slate-900 font-heading truncate max-w-[150px]">
              {title}
            </div>
            <div className="text-[10px] font-mono text-slate-400">{size} • 1-Tap Ready</div>
          </div>
        </div>
        {verified && (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-300">
            VERIFIED
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * 4. Action / Message Card
 */
export function FloatingActionMessageCard({
  recipient = "Vikram Malhotra",
  actionText = "1-Tap Proposal Dispatched via Verified Channel",
  timeAgo = "Just now",
  className = "",
}: {
  recipient?: string;
  actionText?: string;
  timeAgo?: string;
  className?: string;
}) {
  return (
    <div
      className={`p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl space-y-1.5 text-left ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="font-semibold text-slate-700">{recipient}</span>
        <span>{timeAgo}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-800">
        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3 h-3" />
        </div>
        <span className="leading-snug">{actionText}</span>
      </div>
    </div>
  );
}

/**
 * 5. Location / Site-Visit Chip
 */
export function LocationSiteVisitChip({
  location = "Tower 4, Golf Course Ext.",
  time = "11:30 AM Tomorrow",
  className = "",
}: {
  location?: string;
  time?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-xs text-slate-800 ${className}`}
    >
      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
      <span className="font-semibold truncate max-w-[140px]">{location}</span>
      <span className="text-[10px] font-mono text-slate-400">({time})</span>
    </div>
  );
}

/**
 * 6. Voice-Note Audio Waveform Strip
 */
export function VoiceNoteWaveformStrip({
  duration = "0:18",
  transcript = "Client confirmed budget ₹2.4 Cr, needs sanction letter",
  className = "",
}: {
  duration?: string;
  transcript?: string;
  className?: string;
}) {
  return (
    <div
      className={`p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg space-y-1.5 text-left ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
          <Mic className="w-3 h-3" />
        </div>
        {/* Waveform bars */}
        <div className="flex items-center gap-0.5 flex-1 h-3">
          {[4, 8, 12, 6, 14, 10, 8, 14, 12, 6, 10, 4, 8, 12, 10, 6, 4].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-indigo-400/80"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-500">{duration}</span>
      </div>
      <div className="text-[11px] text-slate-600 italic line-clamp-1 pl-1 border-l-2 border-indigo-400">
        &ldquo;{transcript}&rdquo;
      </div>
    </div>
  );
}

/**
 * 7. Offline / Local SQLite Sync Indicator
 */
export function OfflineSyncIndicator({
  status = "Offline Cache Active (SQLite)",
  records = "42 Leads Synced",
  className = "",
}: {
  status?: string;
  records?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-md text-[11px] font-mono ${className}`}
    >
      <Database className="w-3.5 h-3.5 text-cyan-400" />
      <span>{status}</span>
      <span className="text-slate-400">|</span>
      <span className="text-emerald-400 font-bold">{records}</span>
    </div>
  );
}

/**
 * 8. Deal Outcome / Success Marker
 */
export function DealOutcomeMarker({
  amount = "₹48,00,000",
  stage = "Closed Won",
  timeToClose = "4.2 Days",
  className = "",
}: {
  amount?: string;
  stage?: string;
  timeToClose?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 shadow-md text-slate-900 ${className}`}
    >
      <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
        <Trophy className="w-3.5 h-3.5" />
      </div>
      <div className="text-left leading-tight">
        <div className="text-xs font-bold text-emerald-800 font-numeric">{amount}</div>
        <div className="text-[10px] font-mono text-emerald-600 font-semibold">
          {stage} • {timeToClose}
        </div>
      </div>
    </div>
  );
}

/**
 * 9. Lead-Route SVG Vector Connector ("Lead Thread")
 */
export function LeadRouteConnector({
  className = "",
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  if (orientation === "vertical") {
    return (
      <svg
        className={`w-6 h-16 pointer-events-none ${className}`}
        viewBox="0 0 24 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0V64"
          stroke="url(#leadThreadGradV)"
          strokeWidth="2"
          className="lead-thread-animated"
        />
        <circle cx="12" cy="32" r="3" fill="#0077ff" />
        <defs>
          <linearGradient id="leadThreadGradV" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00a3ff" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={`h-6 w-24 pointer-events-none ${className}`}
      viewBox="0 0 96 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12H96"
        stroke="url(#leadThreadGradH)"
        strokeWidth="2"
        className="lead-thread-animated"
      />
      <circle cx="48" cy="12" r="3" fill="#0077ff" />
      <defs>
        <linearGradient id="leadThreadGradH" x1="0" y1="0" x2="96" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00a3ff" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * 10. Industry Specific SVG Workflow Icons
 */
export const IndustryIcons = {
  RealEstate: Building,
  Finance: Landmark,
  Agencies: Megaphone,
  Healthcare: Stethoscope,
  SaaS: Laptop,
  Retail: ShoppingBag,
  Consulting: Briefcase,
};
