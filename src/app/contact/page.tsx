"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  CheckCircle2,
  Building2,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "5-20 Closers",
    industry: "Real Estate",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      // Capture visitor attribution metadata
      let vid = "";
      let sid = "";
      let landingPage = "/";
      try {
        vid = localStorage.getItem("_sahyak_vid") || "";
        sid = sessionStorage.getItem("_sahyak_sid") || "";
        landingPage = sessionStorage.getItem("_sahyak_landing") || "/";
      } catch {}

      const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const utmSource = searchParams?.get("utm_source") || "";
      const utmMedium = searchParams?.get("utm_medium") || "";
      const utmCampaign = searchParams?.get("utm_campaign") || "";
      const utmTerm = searchParams?.get("utm_term") || "";
      const utmContent = searchParams?.get("utm_content") || "";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          vid,
          sid,
          landing_page: landingPage,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_term: utmTerm,
          utm_content: utmContent,
          _ts: Date.now(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // Sync to client-side localStorage so it appears in /admin dashboard immediately
        try {
          const currentLeads = JSON.parse(localStorage.getItem("sahyak_live_leads") || "[]");
          const newLead = {
            id: data.lead?.id || `lead_${Date.now()}`,
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            teamSize: formData.teamSize,
            message: formData.message || `${formData.industry} vertical consultation request`,
            status: "New",
          };
          localStorage.setItem("sahyak_live_leads", JSON.stringify([newLead, ...currentLeads]));
        } catch {
          // localStorage unavailable
        }

        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          teamSize: "5-20 Closers",
          industry: "Real Estate",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Submission failed. Please check your inputs and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const customEasing = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0077ff] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% LIGHT & AIRY)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-16 lg:pt-22 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-[#0077ff] animate-pulse" />
            <span>DIRECT SALES &amp; ARCHITECT CONSULTATION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Talk with a <br />
            <span className="brand-gradient-text">solutions architect.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Schedule a personalized walkthrough, discuss custom webhook integrations, or explore dedicated multi-tenant database isolation.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TWO-COLUMN INTAKE FORM & SUPPORT SLA CONTAINER (SOFT SURFACE #F8FAFC)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
            {/* Left Column: Direct Consultation & Live SLA Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0084ff] text-xs font-bold font-heading border border-blue-200">
                  <Clock className="w-3.5 h-3.5 text-[#0084ff]" />
                  <span>&lt; 15-Min Response SLA Guarantee</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  We practice what we build.
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed">
                  When you submit an inquiry, our automated webhook router assigns a senior solution architect who contacts you on WhatsApp or phone in under 15 minutes.
                </p>
              </div>

              {/* 3 Contact Support Channels */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0084ff] border border-blue-200 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm font-heading">WhatsApp Direct Line</div>
                    <div className="text-xs text-slate-500 font-mono">+91 98201 99481</div>
                    <div className="text-[11px] text-[#0084ff] font-semibold">Live Mon-Sat (09:00 - 20:00 IST)</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0084ff] border border-blue-200 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm font-heading">Direct Email</div>
                    <div className="text-xs text-slate-500 font-mono">support@sahyak.com</div>
                    <div className="text-[11px] text-slate-400">Guaranteed response within 4 hours</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0084ff] border border-blue-200 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-sm font-heading">Sahyak CRM Headquarters</div>
                    <div className="text-xs text-slate-500">Sector 62, Noida, Delhi NCR, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Demo Intake Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              {status === "success" ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0084ff] border border-blue-200 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Inquiry Routed to Solutions Architect
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Our automated router has dispatched your details to an enterprise architect. You will receive a WhatsApp message and calendar invite shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-pill-secondary text-xs px-6 py-2.5 font-semibold cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Malhotra"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98201 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Realty"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Sales Closers Count</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                      >
                        <option value="1-4 Closers">1-4 Closers (Solo / Boutique)</option>
                        <option value="5-20 Closers">5-20 Closers (Growth Squad)</option>
                        <option value="20-50 Closers">20-50 Closers (Scale Squad)</option>
                        <option value="50+ Closers">50+ Closers (Enterprise Vault)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Industry Vertical</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                      >
                        <option value="Real Estate">Real Estate &amp; Construction</option>
                        <option value="Finance & Wealth">Finance, Wealth &amp; Loans</option>
                        <option value="Agency & Media">Agency, Media &amp; Retainers</option>
                        <option value="Healthcare & Clinics">Healthcare &amp; Clinics</option>
                        <option value="SaaS & Tech">SaaS &amp; Tech Sales</option>
                        <option value="Retail & Distribution">Retail &amp; Distribution</option>
                        <option value="Other">Other Industry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">How can we help your sales pipeline?</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your current ad volume, lead leakage, or integration requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-[#0077ff] focus:border-[#0077ff] transition-all bg-slate-50/50"
                    />
                  </div>

                  {/* Error Alert Banner */}
                  {status === "error" && errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-pill-brand text-white w-full text-center text-xs sm:text-sm py-3.5 font-bold cursor-pointer shadow-lg"
                  >
                    {status === "sending" ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Routing to Architect...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>Submit &amp; Schedule Walkthrough</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>

                  <div className="text-[11px] text-center text-slate-400">
                    By submitting, you agree to receive a 1-tap WhatsApp consultation. Zero spam.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
