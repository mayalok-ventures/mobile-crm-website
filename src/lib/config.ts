export interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number | "Custom";
  yearlyPrice: number | "Custom";
  billingPeriod: string;
  popular?: boolean;
  ctaText: string;
  ctaHref: string;
  features: PlanFeature[];
}

export const siteConfig = {
  name: "Sahyak CRM",
  tagline: "Mobile-First CRM for High-Velocity Sales",
  description:
    "The ultimate mobile-first CRM for high-velocity sales teams in Noida and Delhi NCR. Zero setup chaos, instant WhatsApp automation, and dynamic industry pipelines.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sahyak.com",
  ogImage: "/android-chrome-512x512.png",
  appLoginUrl: "https://crm.sahyak.com/login/",
  appSignupUrl: "https://crm.sahyak.com/signup/",
  contactEmail: "support@sahyak.com",
  salesEmail: "sales@sahyak.com",
  socials: {
    linkedin: "https://linkedin.com/company/sahyakcrm",
    twitter: "https://twitter.com/sahyakcrm",
  },
  legal: {
    companyNamePlaceholder: "Sahyak Technologies Pvt. Ltd.",
    registeredAddressPlaceholder: "Sector 62, Noida, Uttar Pradesh 201309, India",
    legalEmailPlaceholder: "legal@sahyak.com",
    privacyEmailPlaceholder: "privacy@sahyak.com",
    jurisdictionPlaceholder: "Noida / Gautam Buddha Nagar, Uttar Pradesh, India",
    effectiveDate: "August 2026",
  },
};

export const pricingConfig = {
  disclaimer: "Pricing shown is illustrative and subject to configuration.",
  currencySymbol: "₹",
  yearlyDiscountPercent: 20,
  plans: [
    {
      id: "starter",
      name: "Starter",
      description: "Essential CRM tooling for solo consultants, brokers, and compact sales setups.",
      monthlyPrice: 999,
      yearlyPrice: 799, // ~20% discount billed annually
      billingPeriod: "per user / month",
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        { text: "1–2 Active Users", included: true },
        { text: "Visual Sales Pipeline Kanban", included: true },
        { text: "Manual & CSV Lead Import", included: true },
        { text: "Basic Activity & Task Tracking", included: true },
        { text: "Standard Email Notifications", included: true },
        { text: "Automated Round-Robin Distribution", included: false },
        { text: "Multi-Level Team Hierarchy", included: false },
        { text: "Custom Webhook & API Ingestion", included: false },
      ],
    },
    {
      id: "agency",
      name: "Agency",
      badge: "MOST POPULAR",
      popular: true,
      description: "Full-scale distribution and outreach engine for fast-moving sales teams and agencies.",
      monthlyPrice: 2999,
      yearlyPrice: 2399,
      billingPeriod: "per team / month (up to 10 users)",
      ctaText: "Start Free Agency Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        { text: "Up to 10 Team Members", included: true, highlight: true },
        { text: "Instant Multi-Channel Lead Ingestion", included: true, highlight: true },
        { text: "Automated Lead Assignment Engine", included: true, highlight: true },
        { text: "Multi-Level Hierarchy (Owner/Manager/Agent)", included: true },
        { text: "Connected WhatsApp Outreach Workflows", included: true },
        { text: "Real-Time Agent SLA & Activity Tracking", included: true },
        { text: "Custom Deal Stages & Fields", included: true },
        { text: "Standard API & Webhook Access", included: true },
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "SCALE & COMPLIANCE",
      description: "Custom SLAs, dedicated onboarding, security governance, and multi-tenant scaling.",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      billingPeriod: "tailored billing schedule",
      ctaText: "Talk to Solutions Team",
      ctaHref: "/contact?plan=enterprise",
      features: [
        { text: "Unlimited Users & High-Volume Queues", included: true },
        { text: "Custom Lead Routing & Failover Logic", included: true },
        { text: "Enterprise Multi-Tenant Controls", included: true },
        { text: "Dedicated Success Manager & SLA", included: true },
        { text: "Custom API & ERP Integrations", included: true },
        { text: "Audit Logs & Role-Based Permissions", included: true },
        { text: "Guided Onboarding & Data Migration", included: true },
        { text: "Custom Data Retention Policies", included: true },
      ],
    },
  ] as PricingPlan[],
};

export const capabilityBadges = [
  { id: "meta-capture", label: "Meta Lead Capture", icon: "Layers" },
  { id: "whatsapp", label: "WhatsApp Automation", icon: "MessageSquare" },
  { id: "pipelines", label: "Smart Pipelines", icon: "Kanban" },
  { id: "teams", label: "Team Hierarchy", icon: "Users" },
  { id: "analytics", label: "Sales Analytics", icon: "BarChart3" },
];
