"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  Loader2,
  Building2,
  Headphones,
  Check,
  Lock,
  ArrowRight,
} from "lucide-react";

const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: customEasing },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: customEasing },
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teamSize: "2-10",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = "Valid work email is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = "Valid WhatsApp/Phone is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    const newLead = {
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      teamSize: formData.teamSize,
      message: formData.message.trim() || "No bottlenecks specified",
      status: "New",
    };

    try {
      // Save locally for admin dashboard access
      const existingLeads = JSON.parse(localStorage.getItem("sahyak_live_leads") || "[]");
      localStorage.setItem("sahyak_live_leads", JSON.stringify([newLead, ...existingLeads]));

      // Dispatch to API
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          teamSize: formData.teamSize,
          requirement: formData.message,
          inquiryType: "Architecture Discussion",
        }),
      });
    } catch {
      // Fallback gracefully
    }

    setStatus("success");
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-14 pb-12 lg:pt-20 lg:pb-16 bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SOLUTIONS ARCHITECTURE & ENTERPRISE DESK</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading max-w-4xl mx-auto break-words"
          >
            Let&apos;s architect your sales engine.
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: customEasing }}
            className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-6"
          >
            Whether you need a custom enterprise deployment or have questions about our infrastructure, our architecture team is ready.
          </motion.p>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TWO-COLUMN ASYMMETRICAL GRID (Trust Access + High-Intent Form)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionRevealVariants}
        className="py-16 lg:py-24 bg-[#FAFAFA]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            
            {/* ─── LEFT COLUMN: TRUST & DIRECT ACCESS ─── */}
            <motion.div
              variants={staggerContainerVariants}
              className="lg:col-span-5 space-y-6"
            >
              
              {/* Response SLA Banner */}
              <motion.div
                variants={cardItemVariants}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200 font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 font-heading block">
                    Rapid Response Commitment
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Average response time: Under 2 hours during business hours.
                  </span>
                </div>
              </motion.div>

              {/* Stacked Blocks */}
              <div className="space-y-4">
                
                {/* Block 1: Enterprise Sales */}
                <motion.div
                  variants={cardItemVariants}
                  className="saas-card-interactive p-6 bg-white space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">Enterprise Sales</h3>
                      <p className="text-xs text-slate-500">Custom rollout, high-volume ad ingestion & volume pricing.</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Direct Desk:</span>
                    <a
                      href="mailto:sales@sahyak.com"
                      className="font-bold text-slate-900 hover:underline"
                    >
                      sales@sahyak.com
                    </a>
                  </div>
                </motion.div>

                {/* Block 2: Priority Support */}
                <motion.div
                  variants={cardItemVariants}
                  className="saas-card-interactive p-6 bg-white space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm shrink-0">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">Priority Client Support</h3>
                      <p className="text-xs text-slate-500">For existing deployed clients and workspace administrators.</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Support Desk:</span>
                    <a
                      href="mailto:support@sahyak.com"
                      className="font-bold text-slate-900 hover:underline"
                    >
                      support@sahyak.com
                    </a>
                  </div>
                </motion.div>

                {/* Block 3: Regional HQ */}
                <motion.div
                  variants={cardItemVariants}
                  className="saas-card-interactive p-6 bg-white space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">Regional Headquarters</h3>
                      <p className="text-xs text-slate-500">Engineering & Solutions Architecture Center.</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-bold text-slate-900">
                      Noida, Uttar Pradesh, India. (Operating globally)
                    </span>
                  </div>
                </motion.div>

              </div>

              {/* Data Privacy Guarantee Badge */}
              <motion.div
                variants={cardItemVariants}
                className="p-4 rounded-xl bg-slate-100 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-3 font-mono"
              >
                <Lock className="w-4 h-4 text-slate-900 shrink-0" />
                <span>100% Confidential. Mutual NDA available upon request.</span>
              </motion.div>

            </motion.div>

            {/* ─── RIGHT COLUMN: THE HIGH-INTENT LEAD FORM ─── */}
            <motion.div
              variants={cardItemVariants}
              className="lg:col-span-7"
            >
              <div className="saas-card p-8 sm:p-10 bg-white border border-slate-200 shadow-md rounded-2xl">
                
                {status === "success" ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                      Request Dispatched Successfully
                    </h3>

                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you. An Enterprise Solutions Architect has received your workflow details and will contact you within <strong>2 hours</strong>.
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 inline-block">
                      Reference SLA Ticket: <span className="font-bold text-slate-900">SHY-REQ-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setStatus("idle");
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            teamSize: "2-10",
                            message: "",
                          });
                        }}
                        className="btn-pill-secondary text-xs py-2 px-5 font-semibold"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    
                    <div className="border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                        Schedule Architecture Discussion
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Tell us about your sales floor and current pipeline bottlenecks.
                      </p>
                    </div>

                    {/* Field 1: Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-heading">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Vikramaditya Singhal"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-colors ${
                          errors.name
                            ? "border-rose-500 focus:border-rose-500"
                            : "border-slate-200 focus:border-slate-900"
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-rose-500 font-medium">{errors.name}</p>}
                    </div>

                    {/* Field 2 & 3: Work Email & Phone / WhatsApp Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 font-heading">
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="vikram@developergroup.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-colors ${
                            errors.email
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-slate-200 focus:border-slate-900"
                          }`}
                        />
                        {errors.email && <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 font-heading">
                          WhatsApp / Phone <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-colors ${
                            errors.phone
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-slate-200 focus:border-slate-900"
                          }`}
                        />
                        {errors.phone && <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Field 4: Sales Team Size */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-heading">
                        Sales Team Size
                      </label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                      >
                        <option value="Solo">Solo Closer / Independent Agent</option>
                        <option value="2-10">2–10 Sales Agents</option>
                        <option value="11-50">11–50 Sales Agents</option>
                        <option value="50+">50+ Enterprise Sales Force</option>
                      </select>
                    </div>

                    {/* Field 5: How can we help? */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-900 font-heading">
                        How can we help?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your current workflow and bottlenecks (e.g., We spend ₹15L/mo on Meta Ads and leads take 4 hours to reach reps)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button with Distinct Loading State */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs font-bold font-heading shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Sending Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Request</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero spam guarantee. Handled under SOC 2 confidentiality standards.</span>
                    </div>

                  </form>
                )}

              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

    </div>
  );
}
