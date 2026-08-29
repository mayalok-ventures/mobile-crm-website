import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Privacy Policy & Data Governance Standards | Sahyak CRM",
  description:
    "Comprehensive Privacy Policy, Data Processing Taxonomy, and Compliance Architecture governing Sahyak CRM, operated by MayaLok Ventures / Sahyak Technologies Pvt. Ltd.",
  alternates: {
    canonical: "https://sahyak.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Background anti-scraping layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-white" />

      <article className="max-w-3xl mx-auto space-y-8 font-sans text-xs sm:text-sm leading-relaxed text-slate-800 border-b border-slate-200 pb-16">
        
        {/* Document Header */}
        <header className="border-b border-slate-900 pb-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            PRIVACY & DATA GOVERNANCE POLICY // PRIV-2026-V4.2
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
            Global Data Protection & Privacy Governance Policy
          </h1>
          <div className="text-xs text-slate-500 font-mono flex flex-wrap gap-4 pt-1">
            <span>Last Revised & Effective: August 29, 2026</span>
            <span>Entity: MayaLok Ventures Pvt. Ltd. / Sahyak CRM (Noida, India)</span>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="space-y-3">
          <p className="font-semibold text-slate-900 uppercase text-xs tracking-wider">
            1. Overview & Data Controller Identification
          </p>
          <p>
            This Privacy Policy (&quot;Policy&quot;) details the rigorous principles, data processing taxonomy, cryptographic storage standards, and cross-border routing protocols implemented by <strong>MAYALOK VENTURES PRIVATE LIMITED / SAHYAK TECHNOLOGIES PRIVATE LIMITED</strong> (&quot;Sahyak CRM&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) in relation to the collection, ingestion, segregation, and processing of Personally Identifiable Information (PII) across <code>sahyak.com</code>, <code>crm.sahyak.com</code>, our API endpoints, and our mobile applications.
          </p>
          <p>
            Under the provisions of the Digital Personal Data Protection Act, 2023 (India), the General Data Protection Regulation (EU GDPR), and international data privacy statutes, Sahyak CRM functions primarily as a <strong>Data Processor</strong> (processing lead records and customer communications on behalf of our enterprise subscribers) and as a <strong>Data Fiduciary / Controller</strong> with respect to direct account holder telemetry and billing data.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            2. Comprehensive Data Collection Taxonomy
          </h2>
          <p>
            We classify and process data across three discrete architectural categories:
          </p>
          
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider font-heading">
                A. Account Holder & Administrator Credentials
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                <li>Full legal name, corporate email address, verified phone number, and physical office address.</li>
                <li>Hashed passwords (utilizing salted Argon2/bcrypt algorithms) and Multi-Factor Authentication (MFA) seeds.</li>
                <li>Enterprise billing records, GSTIN identification, credit/debit card tokens (stored via PCI-DSS Level 1 payment gateways).</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider font-heading">
                B. Prospect & Inbound Lead Data (Customer Processed Data)
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                <li>Prospect Name, personal/work email, WhatsApp and telephone contact numbers.</li>
                <li>Meta Lead Ad Webhook JSON payloads (campaign IDs, form IDs, Ad Set parameters, leadgen timestamps).</li>
                <li>Google Ads Click Identifiers (GCLID) and UTM tracking attributes.</li>
                <li>Real estate property preferences, investment budget brackets, floor plan requests, and consultation notes.</li>
                <li>Field sales agent GPS check-in coordinates (logged exclusively during active field visit dispatches).</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider font-heading">
                C. Automated Device, Network & Telemetry Logs
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                <li>Internet Protocol (IP) addresses, Autonomous System Numbers (ASN), and coarse geo-location (City/Country).</li>
                <li>Browser User-Agent strings, operating system versions, and unique mobile hardware identifiers (UUID).</li>
                <li>API query response latencies, server error logs, rate-limiting counters, and honeypot bot trap triggers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            3. Cloudflare Edge Architecture & D1 Serverless Storage
          </h2>
          <p>
            3.1. <strong>Edge Computing & TLS 1.3 Routing:</strong> All incoming HTTP requests and API calls are routed through Cloudflare&apos;s global Anycast edge network. Traffic is terminated over TLS 1.3 encryption with strict HTTP Strict Transport Security (HSTS) and Web Application Firewall (WAF) rule enforcement.
          </p>
          <p>
            3.2. <strong>Serverless SQL Nodes (Cloudflare D1):</strong> Lead records, deal stages, and customer form submissions are processed and stored upon Cloudflare D1 distributed serverless SQL databases. Primary database replication occurs within regional data nodes situated in Mumbai (BOM) and New Delhi (DEL), India.
          </p>
          <p>
            3.3. <strong>Encryption at Rest & In Transit:</strong> All customer data stored in database partitions is encrypted at rest using AES-256 bit encryption algorithms. Database connection strings, API tokens, and session secrets are managed via cryptographically isolated hardware security modules.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            4. Third-Party Integrations & External Sub-Processors
          </h2>
          <p>
            Sahyak CRM integrates with selected third-party service providers solely to execute contracted features. We require all sub-processors to maintain SOC 2 Type II or ISO/IEC 27001 certifications:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>
              <strong>Meta Platforms, Inc. (Meta Graph API & WhatsApp Cloud API):</strong> Used to ingest Facebook/Instagram lead ads and execute automated WhatsApp message/brochure dispatches. Data passed includes recipient phone numbers, template payloads, and message status callbacks.
            </li>
            <li>
              <strong>Google Cloud Platform & Analytics:</strong> Used for aggregate conversion tracking, server telemetry, and Google Ads integration.
            </li>
            <li>
              <strong>Cloudflare, Inc.:</strong> Used for DNS management, edge caching, DDoS mitigation, and serverless SQL database execution.
            </li>
            <li>
              <strong>Authorized Payment Gateways (Razorpay / Stripe):</strong> Used for secure subscription billing processing without Sahyak storing raw credit card details.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            5. Strict Multi-Tenant Isolation Guarantee
          </h2>
          <p>
            5.1. <strong>Cryptographic & Logical Schema Isolation:</strong> Sahyak CRM operates on a zero-trust multi-tenant architecture. Every database query, webhook ingestion, and read operation is strictly scoped by an immutable <code>tenant_id</code> and authenticated via ephemeral JWT/session tokens.
          </p>
          <p>
            5.2. <strong>Zero Cross-Tenant Leakage:</strong> No sales representative, administrator, or sub-account of Tenant A can access, query, index, or decrypt the customer leads, deals, or metrics of Tenant B under any circumstance. Automated anti-scraping and data isolation monitors constantly evaluate query execution plans to prevent multi-tenant data bleed.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            6. User Rights, Data Portability & Complete Deletion Protocol
          </h2>
          <p>
            6.1. <strong>Statutory User Rights:</strong> In accordance with the Indian DPDP Act 2023 and global privacy frameworks, customers and data principals possess the right to: (a) request access to all stored PII; (b) demand correction of inaccurate records; (c) export data in standard structured formats (CSV/JSON); and (d) revoke processing consent.
          </p>
          <p>
            6.2. <strong>Immutable Workspace Deletion:</strong> Upon formal termination of an enterprise account or receipt of a verified deletion request submitted via <code>privacy@sahyak.com</code> or our dedicated <code>/data-deletion</code> portal, Sahyak CRM executes an immutable purge routine within thirty (30) calendar days. This routine cascades through all primary tables, indexes, backups, and edge caches to permanently eradicate Customer Data.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            7. Cookies, LocalStorage & Tracking Technologies
          </h2>
          <p>
            We utilize essential session cookies, HTTP-only tokens, and client-side <code>localStorage</code> objects exclusively to: (a) authenticate logged-in administrators and field reps; (b) remember active interface workspace preferences; and (c) detect and prevent automated credential stuffing attacks. We do not sell customer PII or lead lists to third-party data brokers or behavioral advertising networks.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            8. Data Protection Officer (DPO) & Grievance Redressal
          </h2>
          <p>
            In compliance with Rule 5(9) of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and the DPDP Act 2023, the designated Grievance Officer and Data Protection Officer for Sahyak CRM is:
          </p>
          
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 font-mono text-xs">
            <div className="font-bold text-slate-900">Grievance & Data Protection Officer</div>
            <div>MayaLok Ventures Private Limited / Sahyak CRM</div>
            <div>Sector 62, Noida, Gautam Buddha Nagar, Uttar Pradesh 201309, India</div>
            <div>Privacy Redressal Desk: <code>privacy@sahyak.com</code></div>
            <div>Security Audits: <code>security@sahyak.com</code></div>
            <div>Response SLA: Under 48 Business Hours</div>
          </div>
        </section>

      </article>
    </div>
  );
}
