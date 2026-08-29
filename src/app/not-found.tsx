import React from "react";
import Link from "next/link";
import { GlowingButton } from "@/components/buttons/GlowingButton";
import { Logo } from "@/components/ui/Logo";
import { Sparkles, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col items-center justify-center px-4 tech-grid-bg text-center py-32">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center mb-2">
          <Logo size="lg" showText={true} />
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ERROR 404</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-white font-mono">
          <span className="text-gradient-cyan">404</span>
        </h1>

        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>

        <p className="text-sm text-slate-400 leading-relaxed">
          The requested page route could not be found or may have been moved. Return to the CoreSetu OS homepage or check out our features.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <GlowingButton href="/" size="md" variant="primary">
            Return to Homepage
          </GlowingButton>
          <GlowingButton href="/features" size="md" variant="secondary">
            Explore Features
          </GlowingButton>
        </div>
      </div>
    </main>
  );
}
