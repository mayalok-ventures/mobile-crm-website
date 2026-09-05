import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Enterprise License Agreement | Sahyak CRM",
  description:
    "Master Software-as-a-Service (SaaS) Terms of Service and Commercial Licensing Agreement governing Sahyak CRM, operated by MayaLok Ventures / Sahyak Technologies Pvt. Ltd.",
  alternates: {
    canonical: "https://sahyak.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Background anti-scraping layer */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-white" />

      <article className="max-w-3xl mx-auto space-y-8 font-sans text-xs sm:text-sm leading-relaxed text-slate-800 border-b border-slate-200 pb-16">
        
        {/* Document Header */}
        <header className="border-b border-slate-900 pb-6 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            LEGAL DOCUMENT // SAAS-TOS-2026-V4.2
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading tracking-tight">
            Master Terms of Service & Commercial SaaS Agreement
          </h1>
          <div className="text-xs text-slate-500 font-mono flex flex-wrap gap-4 pt-1">
            <span>Last Updated & Effective: August 29, 2026</span>
            <span>Governing Jurisdiction: Noida, Uttar Pradesh, India</span>
          </div>
        </header>

        {/* Preamble */}
        <section className="space-y-3">
          <p className="font-semibold text-slate-900 uppercase text-xs tracking-wider">
            Important Notice — Legally Binding Commercial Contract
          </p>
          <p>
            PLEASE READ THIS MASTER SOFTWARE-AS-A-SERVICE AGREEMENT (&quot;AGREEMENT&quot;, &quot;TERMS OF SERVICE&quot;, OR &quot;TERMS&quot;) THOROUGHLY BEFORE ACCESSING, SUBSCRIBING TO, OR UTILIZING THE SAHYAK CRM PLATFORM, APPLICATION PROGRAMMING INTERFACES (APIS), DESKTOP DASHBOARDS, MOBILE FIELD APPLICATIONS, OR ASSOCIATED TELEMETRY SERVICES (COLLECTIVELY, THE &quot;SERVICE&quot; OR &quot;PLATFORM&quot;).
          </p>
          <p>
            THIS AGREEMENT IS ENTERED INTO BY AND BETWEEN <strong>MAYALOK VENTURES PRIVATE LIMITED / SAHYAK TECHNOLOGIES PRIVATE LIMITED</strong> (&quot;SAHYAK CRM&quot;, &quot;COMPANY&quot;, &quot;WE&quot;, &quot;US&quot;, OR &quot;OUR&quot;), A COMPANY DULY INCORPORATED UNDER THE PROVISIONS OF THE COMPANIES ACT, 2013, HAVING ITS REGISTERED OFFICE AT SECTOR 62, NOIDA, GAUTAM BUDDHA NAGAR, UTTAR PRADESH 201309, INDIA, AND THE INDIVIDUAL, ENTITY, REAL ESTATE DEVELOPER, BROKERAGE, AGENCY, OR ENTERPRISE REGISTERING FOR OR UTILIZING THE SERVICE (&quot;CUSTOMER&quot;, &quot;CLIENT&quot;, &quot;SUBSCRIBER&quot;, &quot;USER&quot;, OR &quot;YOU&quot;).
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            1. Acceptance of Terms & Authority to Contract
          </h2>
          <p>
            1.1. <strong>Binding Legal Consent:</strong> By creating an account on <code>sahyak.com</code>, <code>crm.sahyak.com</code>, initiating a 14-day evaluation trial, executing an enterprise order form, authenticating via OAuth/SSO, connecting third-party webhooks, or downloading the Sahyak mobile field application, you unconditionally acknowledge, represent, and warrant that you have read, understood, and agreed to be legally bound by these Terms of Service in their entirety, alongside our Global Privacy Policy.
          </p>
          <p>
            1.2. <strong>Corporate Authority Representation:</strong> If you are executing this Agreement on behalf of a corporation, partnership, real estate developer, marketing agency, or other legal entity, you explicitly represent and warrant under penalty of perjury that you possess full legal authority to bind said entity, its affiliates, directors, managers, and all authorized sub-users to the covenants, obligations, and financial commitments set forth herein.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            2. Scope of Service & Multi-Tenant Provisioning
          </h2>
          <p>
            2.1. <strong>SaaS License Grant:</strong> Subject to full compliance with this Agreement and timely payment of all applicable subscription and expansion module fees, Sahyak CRM grants Customer a non-exclusive, non-transferable, non-sublicensable, revocable, worldwide right to access and utilize the Platform during the active subscription term solely for Customer&apos;s internal commercial sales pipeline management.
          </p>
          <p>
            2.2. <strong>Multi-Tenant Logical Partitioning:</strong> The Service is hosted upon distributed cloud and serverless infrastructure (including Cloudflare Edge, Cloudflare D1 SQL networks, and regional data centers in Mumbai/Delhi). Customer data is strictly segregated via tenant identifiers and cryptographically signed session tokens. Customer acknowledges that infrastructure capacity, compute bandwidth, and database queries are shared across multi-tenant clusters subject to fair usage telemetry.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            3. Account Responsibilities, Security & Credential Liability
          </h2>
          <p>
            3.1. <strong>Credential Custodianship:</strong> Customer maintains absolute and sole liability for preserving the confidentiality of all workspace usernames, passwords, multi-factor authentication tokens, API keys, and webhook signing secrets issued to Customer or its authorized representatives.
          </p>
          <p>
            3.2. <strong>Unauthorized Multi-Tenant Access:</strong> Any action, transmission, data manipulation, export, or subscription alteration conducted through Customer&apos;s authenticated credentials shall be deemed conclusively executed by Customer. Sahyak CRM expressly disclaims all liability for unauthorized access, data exfiltration, or financial damages resulting from Customer&apos;s compromised passwords, shared field agent credentials, stolen employee devices, or third-party phishing vectors.
          </p>
          <p>
            3.3. <strong>Immediate Breach Notification:</strong> Customer covenants to notify Sahyak CRM immediately in writing at <code>security@sahyak.com</code> upon discovering or suspecting any unauthorized access, API key leakage, or vulnerability affecting its workspace.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            4. Subscriptions, Seat Scaling, Billing & Strict &quot;No Refund&quot; Policy
          </h2>
          <p>
            4.1. <strong>Recurring Subscription Billing:</strong> Access to Sahyak CRM operates on a pre-paid recurring subscription model (billed on a monthly or annual schedule, as designated in Customer&apos;s workspace). Fees comprise: (a) base subscription plan charges (e.g., Solo or Company tiers as published on our Pricing page), and (b) selected usage expansion modules and additional team seats.
          </p>
          <p>
            4.2. <strong>Dynamic Seat Scaling:</strong> Workspace administrators may add or deactivate field agent seats dynamically. Seat additions are immediately billed on a pro-rated basis for the remainder of the billing cycle. Seat deactivations take effect at the conclusion of the active billing period; no refunds or credits are issued for mid-cycle seat decreases.
          </p>
          <p>
            4.3. <strong>Taxation:</strong> All stated prices are exclusive of applicable taxes, including the Goods and Services Tax (GST at 18%) under Indian Tax Law. Customer is liable for all statutory taxes, levies, and withholdings.
          </p>
          <p>
            4.4. <strong>STRICT AND IRREVOCABLE NO-REFUND POLICY:</strong> ALL PAYMENTS MADE TO SAHYAK CRM, INCLUDING RECURRING SUBSCRIPTIONS, ANNUAL LICENSES, ADD-ON MODULE FEES, SETUP CHARGES, AND TRIAL CONVERSIONS, ARE STRICTLY NON-REFUNDABLE AND NON-CREDITABLE UNDER ANY CIRCUMSTANCES. THIS INCLUDES, WITHOUT LIMITATION, PARTIAL UTILIZATION, WORKSPACE CANCELLATIONS, UNUSED AGENT SEATS, PROJECT DELAYS, MIGRATION DIFFICULTIES, OR SERVICE DOWNTIME.
          </p>
          <p>
            4.5. <strong>Immediate Suspension on Payment Failure:</strong> If recurring automatic billing via credit card, UPI, debit card, or corporate net banking fails, Sahyak CRM reserves the right to immediately suspend workspace access, lock mobile field applications, and halt webhook ingestion until all outstanding invoices are settled in full.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            5. Acceptable Use Policy, Anti-Spam & Regulatory Compliance
          </h2>
          <p>
            5.1. <strong>Prohibited Ingestion & Unsolicited Spam:</strong> Customer covenants that all contact details, prospective buyer inquiries, and lead records ingested into the Platform have been lawfully acquired with explicit opt-in consent. Customer shall NOT utilize Sahyak CRM to transmit unsolicited spam, mass marketing blasts in violation of Telecom Regulatory Authority of India (TRAI) Distributed Ledger Technology (DLT) mandates, phishing communications, fraudulent real estate investment schemes, or malicious payloads.
          </p>
          <p>
            5.2. <strong>WhatsApp Business Policy Adherence:</strong> Customer acknowledges that all automated WhatsApp triggers, brochure deliveries, and chat notifications operate over Meta Graph APIs. Customer warrants strict adherence to Meta&apos;s Business Messaging Policies, Commerce Policies, and template pre-approval requirements. Any suspension or ban imposed on Customer&apos;s WhatsApp Business Account by Meta Platforms, Inc. remains solely Customer&apos;s responsibility and shall not entitle Customer to any fee reduction or refund.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            6. Customer Data Ownership & Telemetry License Grant
          </h2>
          <p>
            6.1. <strong>Customer Data Sovereignty:</strong> As between Customer and Sahyak CRM, Customer exclusively retains all proprietary right, title, and interest in and to all raw customer data, real estate prospect contact lists, call recordings, notes, and deal stages uploaded to or captured within Customer&apos;s workspace (&quot;Customer Data&quot;).
          </p>
          <p>
            6.2. <strong>Platform Operating & Telemetry License:</strong> Customer hereby grants Sahyak CRM, MayaLok Ventures, and our infrastructure partners a worldwide, royalty-free, fully paid-up, perpetual, irrevocable right and license to: (a) host, store, transfer, parse, and process Customer Data strictly to deliver the CRM functionality; and (b) generate, aggregate, anonymize, and extract performance telemetry, query benchmarks, lead ingestion response latencies, and conversion statistics to enhance platform security, train heuristic routing algorithms, and optimize cloud distribution.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            7. Limitation of Liability & Absolute Cap
          </h2>
          <p>
            7.1. <strong>DISCLAIMER OF CONSEQUENTIAL DAMAGES:</strong> TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL SAHYAK CRM, MAYALOK VENTURES PRIVATE LIMITED, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, CONTRACTORS, OR INFRASTRUCTURE SUPPLIERS BE LIABLE TO CUSTOMER OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, EXEMPLARY, OR RELIANCE DAMAGES WHATSOEVER.
          </p>
          <p>
            7.2. <strong>SPECIFIC EXCLUSION OF SALES & PIPELINE LOSSES:</strong> WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, SAHYAK CRM SHALL HAVE ZERO LIABILITY WHATSOEVER FOR: (A) LOST PROFITS, FORFEITED COMMISSIONS, OR MISSED REAL ESTATE TRANSACTIONS; (B) DROPPED, UNASSIGNED, OR UNANSWERED INBOUND LEADS; (C) TELECOMMUNICATION LATENCY, SMS GATEWAY FAILURES, OR WHATSAPP CLOUD API DOWNTIME; (D) SERVER OUTAGES, CLOUDFLARE EDGE ROUTING DELAYS, OR D1 DATABASE MAINTENANCE; OR (E) CORRUPTION OR UNAUTHORIZED EXFILTRATION OF PROSPECT RECORDS BY ROGUE EMPLOYEES OR EXTERNAL THREAT ACTORS.
          </p>
          <p>
            7.3. <strong>ABSOLUTE LIABILITY CAP:</strong> NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THIS AGREEMENT, SAHYAK CRM&apos;S ENTIRE AGGREGATE CUMULATIVE LIABILITY ARISING OUT OF OR RELATED TO THIS AGREEMENT, THE PLATFORM, OR THE SERVICES, WHETHER ARISING IN CONTRACT, TORT (INCLUDING NEGLIGENCE), INDEMNITY, STRICT LIABILITY, OR OTHERWISE, SHALL BE STRICTLY AND ABSOLUTELY CAPPED AT THE EXACT SUM ACTUALLY PAID BY CUSTOMER TO SAHYAK CRM IN THE THIRTY (30) DAYS IMMEDIATELY PRECEDING THE OCCURRENCE OF THE INCIDENT GIVING RISE TO LIABILITY.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            8. Indemnification by Customer
          </h2>
          <p>
            Customer covenants to defend, indemnify, and hold harmless Sahyak CRM, MayaLok Ventures, its parent companies, subsidiaries, directors, founders, employees, and software licensors from and against any and all claims, regulatory penalties, liabilities, losses, judgments, damages, legal costs, and attorney fees arising out of or related to: (a) Customer&apos;s violation of this Agreement; (b) Customer Data infringing upon third-party intellectual property or privacy rights; (c) violation of TRAI, DLT, or consumer protection guidelines; or (d) disputes between Customer and its prospective clients, real estate buyers, or field sales agents.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            9. Term, Termination & Post-Termination Data Purge
          </h2>
          <p>
            9.1. <strong>Term:</strong> This Agreement commences upon Customer&apos;s initial access to the Service and continues until Customer&apos;s subscription is terminated in accordance herewith.
          </p>
          <p>
            9.2. <strong>Termination for Breach:</strong> Sahyak CRM reserves the unilateral right to immediately terminate or suspend Customer&apos;s account without prior notice if Customer: (a) breaches any provision of this Agreement; (b) engages in fraudulent or unlawful activities; or (c) defaults on scheduled subscription payments.
          </p>
          <p>
            9.3. <strong>Data Retrieval & Purge Protocol:</strong> Upon termination or expiration of an active subscription, Customer shall have a grace period of fourteen (14) calendar days to export its Customer Data via standard CSV/JSON export tools. Following the expiration of said fourteen (14) day period, Sahyak CRM shall have no obligation to retain Customer Data and reserves the right to permanently, irreversibly delete all workspace records, logs, and attachments from its Cloudflare D1 nodes.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            10. Governing Law, Exclusive Jurisdiction & Mandatory Arbitration
          </h2>
          <p>
            10.1. <strong>Indian Law Governance:</strong> This Agreement, and any dispute, controversy, proceedings, or claim of whatever nature arising out of or in any way relating to this Agreement, its formation, or its subject matter, shall be governed by and construed strictly in accordance with the laws of the Republic of India, without giving effect to any principles of conflict of laws.
          </p>
          <p>
            10.2. <strong>Exclusive Court Jurisdiction:</strong> Subject to the mandatory arbitration clause below, the courts located in <strong>Noida, District Gautam Buddha Nagar, Uttar Pradesh, India</strong> shall possess sole and exclusive territorial and subject-matter jurisdiction over all disputes arising under or in connection with this Agreement.
          </p>
          <p>
            10.3. <strong>Mandatory Binding Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to this Agreement shall be referred to and finally resolved by binding arbitration administered under the provisions of the Arbitration and Conciliation Act, 1996 (as amended). The arbitral tribunal shall consist of a sole arbitrator appointed mutually by the parties. The seat and venue of arbitration shall be Noida, Uttar Pradesh, India. The arbitration proceedings shall be conducted strictly in the English language.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 font-heading uppercase tracking-tight">
            11. Enterprise Legal Communications & Notices
          </h2>
          <p>
            All formal legal notices, notices of breach, indemnity demands, or dispute communications directed to Sahyak CRM must be transmitted via registered post with acknowledgment due and electronic mail to:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 font-mono text-xs">
            <div className="font-bold text-slate-900">Legal & Compliance Department</div>
            <div>MayaLok Ventures Private Limited / Sahyak CRM</div>
            <div>Sector 62, Noida, Gautam Buddha Nagar, Uttar Pradesh 201309, India</div>
            <div>Legal Inquiries: <code>legal@sahyak.com</code></div>
            <div>Corporate Operations: <code>admin@sahyak.com</code></div>
          </div>
        </section>

      </article>
    </div>
  );
}
