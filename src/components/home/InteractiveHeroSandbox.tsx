"use client";

import React, { useEffect, useRef, useState } from "react";
import { Zap, ShieldCheck, Play, Pause, Smartphone } from "lucide-react";
import {
  LeadSourceSignal,
  FloatingProposalCard,
} from "@/components/ui/LeadDepthAssets";

export const InteractiveHeroSandbox: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
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

  return (
    <div className="w-full relative group">
      {/* 1. Ambient Lighting Behind Product Stage */}
      <div
        className="absolute inset-0 sm:-inset-6 rounded-3xl stage-ambient-glow pointer-events-none -z-10 blur-xl opacity-80"
        aria-hidden="true"
      />

      {/* 2. Top-Left Floating Lead Source Signal (Desktop Depth Layer) */}
      <div className="hidden lg:block absolute -top-5 -left-4 z-20 animate-fade-in pointer-events-none">
        <LeadSourceSignal
          source="Meta Ads Webhook"
          campaign="High-Ticket Lead #9481"
          className="shadow-xl"
        />
      </div>

      {/* 3. Main Desktop CRM Studio Frame */}
      <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden relative z-10">
        {/* Desktop Header & Window Controls */}
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Window Traffic Lights */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400/40" />
              <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400/40" />
              <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400/40" />
            </div>

            {/* URL bar representation */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-500 text-xs font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>https://crm.sahyak.com/pipeline/speed-to-lead</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-slate-700">SUB-2S ENGINE</span>
            </div>

            {/* Play/Pause Control */}
            <button
              onClick={togglePlayback}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              aria-label={isPlaying ? "Pause hero product demo" : "Play hero product demo"}
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="hidden md:inline font-mono text-[10px] uppercase">
                {isPlaying ? "Pause" : "Play"}
              </span>
            </button>
          </div>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src="/videos/sahyak-speed-to-lead-hero-loop.mp4"
            autoPlay={!isReducedMotion}
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover select-none"
            aria-label="Sahyak CRM speed-to-lead interactive pipeline demo"
          />

          {/* Telemetry caption strip */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-3 sm:p-4 flex items-center justify-between text-white text-xs pointer-events-none">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <Zap className="w-3.5 h-3.5 text-[#0077ff]" />
              <span className="font-semibold text-slate-200">Webhook Ingest &rarr; Round-Robin Routing &rarr; WhatsApp</span>
            </div>
            <div className="hidden sm:inline-flex items-center text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-md">
              Speed-to-Lead: &lt; 90s
            </div>
          </div>
        </div>

        {/* Bottom Capability Bar */}
        <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0077ff]" />
            <span className="font-semibold">Instant Meta &amp; Google Ingestion</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0077ff]" />
            <span className="font-semibold">Skill &amp; Territory Round-Robin</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0077ff]" />
            <span className="font-semibold">1-Tap Verified WhatsApp Outreach</span>
          </div>
        </div>
      </div>

      {/* 4. Lower-Right Floating Proposal Card (Breaks Container Boundary on Desktop) */}
      <div className="hidden lg:block absolute -bottom-6 -right-5 z-30 pointer-events-none">
        <FloatingProposalCard
          title="Verified_Proposal_V402.pdf"
          size="1.4 MB"
          className="w-72 shadow-2xl border-slate-200/90"
        />
      </div>
    </div>
  );
};
