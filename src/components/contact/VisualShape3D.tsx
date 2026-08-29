"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export const VisualShape3D: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl" />

      {/* Outer Ring */}
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30"
      />

      {/* Middle Rotated Ring */}
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 rounded-full border border-purple-500/30"
      />

      {/* Center 3D Geometric Cube Mockup */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                rotateX: [15, -15, 15],
                rotateY: [25, 65, 25],
                rotateZ: [0, 10, 0],
              }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-slate-900/95 via-slate-800/95 to-cyan-950/95 border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(0,163,255,0.4)] flex items-center justify-center backdrop-blur-md p-4"
      >
        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-950 p-1 border border-white/20 shadow-[0_0_20px_rgba(0,163,255,0.5)]">
          <Image
            src="/android-chrome-192x192.png"
            alt="CoreSetu Logo"
            width={56}
            height={56}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};
