"use client";

import React, { useState, useEffect } from "react";
import { submitContactForm } from "@/lib/api";
import { GlowingButton } from "../buttons/GlowingButton";
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "1-5",
    requirement: "",
    inquiryType: "Book a Demo",
    _hp: "",
  });

  const [mountTime, setMountTime] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestId, setRequestId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMountTime(Date.now());
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = "Valid work email is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errs.phone = "Valid phone number is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    const response = await submitContactForm({
      ...formData,
      _ts: mountTime,
    });

    if (response.success) {
      setStatus("success");
      setRequestId(response.requestId || "req_received");
    } else {
      setStatus("error");
      setErrorMessage(response.error || "Submission failed. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-8 sm:p-10 backdrop-blur-2xl text-center space-y-5 shadow-2xl">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-white">Request Received!</h3>

        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Thanks — your request has been received. We&apos;ll be in touch shortly to schedule your personalized walkthrough.
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-slate-400 inline-block">
          Reference ID: <span className="text-cyan-400">{requestId}</span>
        </div>

        <div className="pt-4">
          <button
            onClick={() => {
              setStatus("idle");
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                teamSize: "1-5",
                requirement: "",
                inquiryType: "Book a Demo",
                _hp: "",
              });
            }}
            className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl space-y-4 shadow-2xl"
      noValidate
    >
      {/* Honeypot field (hidden from real users) */}
      <input
        type="text"
        name="_hp"
        value={formData._hp}
        onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
        <h3 className="text-lg font-bold text-white">Get in Touch</h3>
        <span className="text-[11px] font-mono text-cyan-400">Response within 24h</span>
      </div>

      {/* Error Banner if any */}
      {status === "error" && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Inquiry Type Selector */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300">How can we help?</label>
        <select
          value={formData.inquiryType}
          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors"
        >
          <option value="Book a Demo">Book a Demo Walkthrough</option>
          <option value="Sales Inquiry">Sales & Agency Pricing Inquiry</option>
          <option value="Enterprise Solution">Enterprise Scale & Custom Integrations</option>
          <option value="General Support">General Support & Guidance</option>
        </select>
      </div>

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Vikram Mehta"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: "" });
            }}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-white text-xs placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.name ? "border-rose-500" : "border-white/10 focus:border-cyan-400"
            }`}
          />
          {errors.name && <p className="text-[10px] text-rose-400">{errors.name}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">
            Work Email <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            placeholder="vikram@company.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-white text-xs placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.email ? "border-rose-500" : "border-white/10 focus:border-cyan-400"
            }`}
          />
          {errors.email && <p className="text-[10px] text-rose-400">{errors.email}</p>}
        </div>
      </div>

      {/* Phone & Company Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">
            Phone / WhatsApp <span className="text-rose-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-white text-xs placeholder:text-slate-500 focus:outline-none transition-colors ${
              errors.phone ? "border-rose-500" : "border-white/10 focus:border-cyan-400"
            }`}
          />
          {errors.phone && <p className="text-[10px] text-rose-400">{errors.phone}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Company Name</label>
          <input
            type="text"
            placeholder="Apex Media Labs"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Team Size */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300">Sales Team Size</label>
        <select
          value={formData.teamSize}
          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none transition-colors"
        >
          <option value="1-5">1–5 Sales Agents</option>
          <option value="6-15">6–15 Sales Agents</option>
          <option value="16-50">16–50 Sales Agents</option>
          <option value="50+">50+ Enterprise Team</option>
        </select>
      </div>

      {/* Requirement / Message */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-300">Tell us about your sales setup</label>
        <textarea
          rows={3}
          placeholder="e.g. We run Meta Ads and want automatic distribution to 8 sales reps with WhatsApp follow-ups..."
          value={formData.requirement}
          onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-600 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-slate-950" />
              <span>Submit Request</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[10px] text-slate-500 text-center pt-2">
        We respect your privacy. No spam. Data handled in accordance with our Privacy Policy.
      </p>
    </form>
  );
};
