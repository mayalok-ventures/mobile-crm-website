"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Send,
  Mic,
  Database,
  Play,
  Pause,
} from "lucide-react";
import {
  FloatingProposalCard,
  LocationSiteVisitChip,
  VoiceNoteWaveformStrip,
} from "@/components/ui/LeadDepthAssets";

export const MobileFirstSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

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

  const OUTCOMES = [
    {
      id: 0,
      icon: Send,
      color: "text-[#0077ff] bg-blue-50 border-blue-200",
      title: "1-Tap Verified WhatsApp Proposals",
      detail:
        "Dispatch official PDF brochures and customized pricing quotes instantly without manually saving numbers to personal phone contacts.",
    },
    {
      id: 1,
      icon: Mic,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      title: "Voice Note AI Meeting Summaries",
      detail:
        "Speak a 15-second audio note while walking to your car. Sahyak extracts budget, decision timelines, and next meeting dates automatically.",
    },
    {
      id: 2,
      icon: Database,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      title: "Offline Local SQLite Caching",
      detail:
        "Access prospect records and log site visits in basements or remote project sites with seamless background cloud sync on reconnection.",
    },
  ];

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Narrative & Outcomes */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0077ff] font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>FIELD-FIRST ARCHITECTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
              Engineered for closers in the field, not at desks.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Eliminate bulky forms and desktop friction. Sahyak turns mobile devices into high-velocity closing engines with 1-tap WhatsApp PDF proposals, offline SQLite caching, and AI voice memo parsing.
            </p>
          </div>

          {/* Desktop 3 Outcome Cards */}
          <div className="hidden sm:block space-y-3 pt-2">
            {OUTCOMES.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeTab === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-white border-[#0077ff] shadow-md shadow-blue-500/5"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h3 className="font-bold text-sm text-slate-900 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Compact Tab Switcher (Prevents long vertical scroll blocks) */}
          <div className="sm:hidden space-y-3 pt-2">
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {OUTCOMES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all font-heading ${
                    activeTab === idx
                      ? "bg-white text-[#0077ff] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  0{idx + 1} {idx === 0 ? "Proposals" : idx === 1 ? "Voice AI" : "Offline"}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2.5">
                {React.createElement(OUTCOMES[activeTab].icon, {
                  className: "w-4 h-4 text-[#0077ff]",
                })}
                <h3 className="font-bold text-sm text-slate-900 font-heading">
                  {OUTCOMES[activeTab].title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {OUTCOMES[activeTab].detail}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Mobile Phone Demo Stage */}
        <div className="lg:col-span-6 flex justify-center relative">
          {/* Subtle Ambient Background Lighting */}
          <div
            className="absolute inset-0 rounded-full stage-ambient-glow pointer-events-none -z-10 blur-2xl opacity-60"
            aria-hidden="true"
          />

          {/* Floating Location Chip (Top-Left Cut-Out Layer) */}
          <div className="hidden lg:block absolute -top-4 -left-4 z-20 pointer-events-none">
            <LocationSiteVisitChip
              location="Tower 4, Golf Course Ext."
              time="11:30 AM"
            />
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[310px] sm:max-w-[330px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 relative z-10">
            {/* Phone Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
              <div className="w-2 h-2 rounded-full bg-blue-900/60" />
            </div>

            {/* Video Canvas inside phone */}
            <div className="w-full aspect-[9/18.5] bg-slate-900 rounded-[34px] overflow-hidden relative border border-slate-800">
              <video
                ref={videoRef}
                src="/videos/sahyak-mobile-closer-demo.mp4"
                autoPlay={!isReducedMotion}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover select-none"
                aria-label="Sahyak CRM mobile closer demonstration video"
              />

              {/* Play / Pause Toggle Button */}
              <button
                onClick={togglePlayback}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-slate-950/80 text-white border border-white/20 hover:bg-slate-950 transition-colors cursor-pointer text-xs z-10"
                aria-label={isPlaying ? "Pause mobile demo video" : "Play mobile demo video"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Floating Voice-Note Waveform Strip (Lower-Right Cut-Out Layer) */}
          <div className="hidden lg:block absolute -bottom-5 -right-6 z-20 w-72 pointer-events-none">
            <VoiceNoteWaveformStrip
              duration="0:18"
              transcript="Client confirmed budget ₹2.4 Cr, ready to review sanction."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
