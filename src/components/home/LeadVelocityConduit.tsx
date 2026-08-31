"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Share2,
  Send,
  Clock,
  Trophy,
  Play,
  RotateCcw,
  Pause,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  LeadSourceSignal,
  SmartRoutingConnector,
  FloatingProposalCard,
  FloatingActionMessageCard,
  DealOutcomeMarker,
} from "@/components/ui/LeadDepthAssets";

interface ConduitStage {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  time: string;
  telemetry: string;
  metric: string;
}

const CONDUIT_STAGES: ConduitStage[] = [
  {
    id: 1,
    label: "Ingest",
    sublabel: "Sub-2s Webhook Capture",
    icon: Zap,
    time: "0.38s",
    telemetry: "POST /api/v1/webhooks/meta-lead -> 200 OK (HMAC-SHA256 Verified)",
    metric: "Inbound Lead: Vikram Malhotra (₹45L - ₹60L Budget Tier)",
  },
  {
    id: 2,
    label: "Route",
    sublabel: "Smart Skill Matching",
    icon: Share2,
    time: "0.14s",
    telemetry: "ROUTER: Matched rule 'Tier-1 Luxury' -> Assigned Closer Aditya V.",
    metric: "Closer Workload: 3 Active Deals • 82% Historical Win Rate",
  },
  {
    id: 3,
    label: "Propose",
    sublabel: "1-Tap Verified WhatsApp",
    icon: Send,
    time: "1.10s",
    telemetry: "WHATSAPP_API: Pre-filled PDF Brochure Delivered to Recipient",
    metric: "PDF brochure & personalized pricing quote dispatched in one tap",
  },
  {
    id: 4,
    label: "Engage",
    sublabel: "Read Receipt SLA",
    icon: Clock,
    time: "4.2m",
    telemetry: "STATUS_WEBHOOK: Read receipt received • Proposal link opened",
    metric: "Automated calendar invitation dispatched for private site visit",
  },
  {
    id: 5,
    label: "Win",
    sublabel: "Closed Won Milestone",
    icon: Trophy,
    time: "< 48h",
    telemetry: "PIPELINE: Moved from 'Negotiation' to 'Closed Won' (Verified)",
    metric: "₹48,00,000 deal recorded • Manager telemetry updated in real time",
  },
];

export const LeadVelocityConduit: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsPlaying(false);
      videoRef.current?.pause();
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
        videoRef.current?.pause();
      } else {
        setIsPlaying(true);
        videoRef.current?.play().catch(() => {});
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setActiveStage(1);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (activeStage < CONDUIT_STAGES.length) {
      const timer = setTimeout(() => {
        setActiveStage((prev) => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    } else {
      setIsSimulating(false);
    }
  }, [isSimulating, activeStage]);

  const currentData = CONDUIT_STAGES.find((s) => s.id === activeStage) || CONDUIT_STAGES[0];

  return (
    <div ref={sectionRef} className="w-full space-y-8 relative">
      {/* Header & Simulation Trigger */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077ff] px-3 py-1 bg-blue-50 rounded-full border border-blue-200 font-heading inline-block">
            5-Stage Event Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
            Sub-2-Second Speed-to-Lead Conduit
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From Meta Ad form submission to verified WhatsApp proposal in the prospect&apos;s hands.
          </p>
        </div>

        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="btn-pill-brand text-white text-xs py-2.5 px-5 font-bold shadow-sm self-start md:self-auto flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        >
          {isSimulating ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating Pipeline Flow...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Lead Journey</span>
            </>
          )}
        </button>
      </div>

      {/* Horizontal Stage Progress Rail (Desktop & Mobile Swipeable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CONDUIT_STAGES.map((stage) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeStage;
          const isPast = stage.id < activeStage;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 shrink-0 ${
                isActive
                  ? "bg-blue-50/90 border-[#0077ff] shadow-sm text-slate-900"
                  : isPast
                  ? "bg-slate-50 border-slate-200 text-slate-700"
                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-500"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                  isActive
                    ? "bg-[#0077ff] text-white"
                    : isPast
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight truncate">
                <div className="font-bold font-heading text-xs text-slate-900 truncate">
                  0{stage.id} {stage.label}
                </div>
                <div className="text-[10px] font-mono text-slate-400 font-semibold">{stage.time}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Telemetry & Dynamic Artifact Reveal + Conduit Video */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Active Stage Detail & Dynamic Cut-Out Artifact */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0077ff] animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-900 uppercase">
                  Stage 0{currentData.id}: {currentData.label}
                </span>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0077ff] border border-blue-200">
                Latency: {currentData.time}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              {currentData.metric}
            </p>

            {/* Dynamic Stage Artifact Preview */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-bold">
                Generated Event Artifact
              </div>
              {activeStage === 1 && (
                <LeadSourceSignal
                  source="Meta Instant Form"
                  campaign="Luxury Penthouse Lead #9481"
                  className="w-full"
                />
              )}
              {activeStage === 2 && (
                <SmartRoutingConnector
                  repName="Aditya V."
                  squad="North Luxury Closer"
                  sla="0.14s"
                  className="w-full"
                />
              )}
              {activeStage === 3 && (
                <FloatingProposalCard
                  title="Proposal_Vikram_Penthouse.pdf"
                  size="1.4 MB"
                  className="w-full"
                />
              )}
              {activeStage === 4 && (
                <FloatingActionMessageCard
                  recipient="Vikram Malhotra"
                  actionText="WhatsApp Proposal Opened • Site Visit Link Clicked"
                  timeAgo="4m ago"
                  className="w-full"
                />
              )}
              {activeStage === 5 && (
                <DealOutcomeMarker
                  amount="₹48,00,000"
                  stage="Closed Won"
                  timeToClose="1.8 Days"
                  className="w-full"
                />
              )}
            </div>
          </div>

          {/* Real-time Telemetry Terminal Strip */}
          <div className="p-4 rounded-xl bg-slate-950 text-slate-100 space-y-2 shadow-lg text-left">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>LIVE CONDUIT STREAM</span>
              <span className="text-emerald-400">HTTP 200 OK</span>
            </div>
            <div className="font-mono text-xs text-cyan-400 leading-relaxed truncate">
              {currentData.telemetry}
            </div>
          </div>
        </div>

        {/* Right Side: Lead Conduit Video Proof Stage */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between relative">
          <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#0077ff] animate-pulse" />
              <span>CONDUIT WORKFLOW VISUALIZER</span>
            </div>
            <button
              onClick={togglePlayback}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-xs flex items-center gap-1"
              aria-label={isPlaying ? "Pause workflow video" : "Play workflow video"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          <div className="relative aspect-[16/10] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/sahyak-lead-velocity-conduit-loop.mp4"
              autoPlay={!isReducedMotion}
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover select-none"
              aria-label="Sahyak lead velocity conduit workflow loop"
            />
          </div>

          <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span>Latency SLA Target: &lt; 90 Seconds</span>
            <span className="text-emerald-400 font-bold">Zero Lead Leakage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
