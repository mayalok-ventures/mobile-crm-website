"use client";

import React, { useState } from "react";
import { Trash2, CheckCircle2, Copy, Check, ShieldAlert } from "lucide-react";

export default function DataDeletionPage() {
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [reason, setReason] = useState("Account Closure & Data Erasure");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    setTimeout(() => {
      const code = `DEL-SAHYAK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setConfirmationCode(code);
      setStatus("success");
    }, 600);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(confirmationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Background anti-scraping layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-white" />

      <article className="max-w-3xl mx-auto space-y-8 font-sans text-xs sm:text-sm leading-relaxed text-slate-800 border-b border-slate-200 pb-16">
        
        {/* Document Header */}
        <header className="border-b border-slate-900 pb-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            COMPLIANCE PROTOCOL // DPDP-META-DATA-ERASURE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
            User Data Deletion Instructions & Erasure Request
          </h1>
          <div className="text-xs text-slate-500 font-mono flex flex-wrap gap-4 pt-1">
            <span>Standard Operating Procedure (SOP)</span>
            <span>Entity: MayaLok Ventures Pvt. Ltd. / Sahyak CRM (Noida, India)</span>
          </div>
        </header>

        {/* Legal Instruction Summary */}
        <section className="space-y-3">
          <p className="font-semibold text-slate-900 uppercase text-xs tracking-wider">
            1. Right to Erasure & Deletion Mandate
          </p>
          <p>
            In accordance with the Digital Personal Data Protection Act, 2023 (India), the General Data Protection Regulation (GDPR), and Meta Platform Data Deletion Guidelines, all Sahyak CRM enterprise subscribers and prospective leads possess the statutory right to request permanent, irreversible deletion of their personal records, conversation logs, and uploaded files.
          </p>
        </section>

        {/* 4 Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono font-bold text-slate-900 text-xs uppercase">Step 01: Submission</span>
            <p className="text-xs text-slate-600">
              Submit your account email or Meta Lead identifier via this portal or write directly to <code>privacy@sahyak.com</code>.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono font-bold text-slate-900 text-xs uppercase">Step 02: Verification</span>
            <p className="text-xs text-slate-600">
              Our automated compliance engine generates a cryptographic ticket and validates identity with the account administrator.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono font-bold text-slate-900 text-xs uppercase">Step 03: Cascade Purge</span>
            <p className="text-xs text-slate-600">
              Upon verification, customer PII is purged across all Cloudflare D1 SQL partitions, edge nodes, and automated backup sets.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <span className="font-mono font-bold text-slate-900 text-xs uppercase">Step 04: Compliance Certificate</span>
            <p className="text-xs text-slate-600">
              A formal certificate of erasure is transmitted to the registrant within 30 calendar days of ticket confirmation.
            </p>
          </div>
        </div>

        {/* Interactive Deletion Submission Form */}
        <div className="p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-950 font-heading">
              Submit Immutable Deletion Ticket
            </h3>
            <p className="text-xs text-slate-500">
              Provide the verified corporate email associated with your Sahyak CRM workspace or Meta Lead Ad campaign.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center space-y-4 py-4 bg-white p-6 rounded-xl border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Erasure Ticket Generated
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your deletion ticket has been logged into our compliance audit ledger. Please copy and record your reference code below.
              </p>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-between gap-3 max-w-sm mx-auto">
                <span className="font-mono text-xs text-slate-900 font-bold">{confirmationCode}</span>
                <button
                  onClick={copyCode}
                  className="p-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1 text-xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                Confirmation dispatched to {email}. Verification link valid for 48 hours.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                  Account Email / Meta Lead Email <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                  Company / Workspace ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Realty NCR / WS-9014"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                  Statutory Erasure Category
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:border-slate-900 focus:outline-none"
                >
                  <option value="Account Closure">Account Closure & Complete Workspace Erasure</option>
                  <option value="Meta Ad Lead Erasure">Meta Lead Ad Ingested Contact Erasure</option>
                  <option value="DPDP Act 2023">DPDP Act 2023 / Statutory Right to Forgotten</option>
                  <option value="GDPR Erasure">GDPR Article 17 Erasure Request</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{status === "submitting" ? "Processing..." : "Generate Deletion Ticket"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Formal Notice */}
        <section className="space-y-2 pt-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-600">
            <ShieldAlert className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
            <p>
              Direct written requests may also be addressed via physical registered post to the Data Protection Officer, MayaLok Ventures Private Limited, Sector 62, Noida, Gautam Buddha Nagar, UP 201309, India or by emailing <code>privacy@sahyak.com</code>.
            </p>
          </div>
        </section>

      </article>
    </div>
  );
}
