import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center px-4 text-center py-32 selection:bg-slate-900 selection:text-white">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white flex items-center justify-center">
            <Image
              src="/android-chrome-192x192.png"
              alt="Sahyak CRM"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>ERROR 404 • ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold text-slate-950 font-heading tracking-tight">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
          Page Not Found
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The requested page could not be located or may have been moved. Return to the Sahyak CRM homepage or explore our speed-to-lead capabilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="btn-pill-primary text-xs py-3 px-6 font-bold w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/features"
            className="btn-pill-secondary text-xs py-3 px-6 font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <span>Explore Features</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
