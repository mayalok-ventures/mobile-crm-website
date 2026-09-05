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
  disclaimer: "Pricing shown is transparent. No setup fees or long-term contracts.",
  currencySymbol: "₹",
  yearlyDiscountPercent: 17,
  plans: [
    // Solo Plans
    {
      id: "solo-starter",
      category: "solo",
      name: "Solo Starter",
      description: "For starting agents & small operators.",
      monthlyPrice: 499,
      annualPrice: 4990,
      usersLimit: "1 user",
      leadsLimit: "1K active leads",
      storage: "2 GB",
      billingPeriod: "per month",
      ctaText: "Start 14-Day Free Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        "Core CRM & lead management",
        "Follow-ups & reminders",
        "Pipeline & basic dashboard",
        "Basic WhatsApp actions",
        "Industry workspace",
        "Mobile / PWA access",
        "Basic reports · 2 GB storage",
      ],
    },
    {
      id: "solo-pro",
      category: "solo",
      name: "Solo Pro",
      badge: "MOST POPULAR",
      popular: true,
      description: "For serious solo professionals.",
      monthlyPrice: 999,
      annualPrice: 9990,
      usersLimit: "1 user",
      leadsLimit: "5K active leads",
      storage: "10 GB",
      billingPeriod: "per month",
      ctaText: "Start Solo Pro Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        "Everything in Starter",
        "Advanced WhatsApp CRM",
        "Meta Lead integration",
        "Advanced follow-up workflow",
        "Site Visits / industry workflow",
        "Automation & advanced analytics",
        "AI assistance & campaigns",
        "Multiple integrations · 10 GB storage",
      ],
    },
    {
      id: "solo-max",
      category: "solo",
      name: "Solo Max",
      description: "For high-volume professionals.",
      monthlyPrice: 1499,
      annualPrice: 14990,
      usersLimit: "1 user",
      leadsLimit: "15K active leads",
      storage: "25 GB",
      billingPeriod: "per month",
      ctaText: "Start Solo Max Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        "Everything in Pro",
        "Higher AI allowance",
        "Advanced automation & campaigns",
        "Advanced integrations & analytics",
        "Higher API / lead limits",
        "Priority support",
        "25 GB storage",
      ],
    },
    // Company Plans
    {
      id: "company-starter",
      category: "company",
      name: "Company Starter",
      description: "For small agencies & teams.",
      monthlyPrice: 2499,
      annualPrice: 24990,
      usersLimit: "5 users",
      leadsLimit: "10K active leads",
      storage: "25 GB",
      billingPeriod: "per month",
      ctaText: "Start Company Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        "Complete CRM & lead assignment",
        "Follow-ups & pipeline",
        "WhatsApp CRM",
        "Basic automation & analytics",
        "Team dashboard",
        "Roles & permissions",
        "Meta Lead integration · 25 GB storage",
      ],
    },
    {
      id: "company-growth",
      category: "company",
      name: "Company Growth",
      badge: "MOST POPULAR",
      popular: true,
      description: "For growing sales teams.",
      monthlyPrice: 4999,
      annualPrice: 49990,
      usersLimit: "15 users",
      leadsLimit: "50K active leads",
      storage: "100 GB",
      billingPeriod: "per month",
      ctaText: "Start Growth Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        "Everything in Company Starter",
        "Round-robin & advanced lead distribution",
        "Advanced WhatsApp & campaigns",
        "Advanced automation & analytics",
        "AI assistance",
        "Site Visits · Projects / Inventory",
        "Advanced permissions & manager dashboards",
        "Meta + webhooks · Audit visibility · 100 GB",
      ],
    },
    {
      id: "company-scale",
      category: "company",
      name: "Company Scale",
      description: "For developers & large operations.",
      monthlyPrice: 9999,
      annualPrice: 99990,
      usersLimit: "40 users",
      leadsLimit: "200K active leads",
      storage: "250 GB",
      billingPeriod: "per month",
      ctaText: "Start Scale Trial",
      ctaHref: "https://crm.sahyak.com/signup/",
      features: [
        "Everything in Growth",
        "Advanced property & inventory operations",
        "Multiple projects & advanced routing",
        "Advanced automation, AI & campaigns",
        "Advanced APIs / integrations",
        "Advanced security & audit controls",
        "Custom workflow configuration",
        "250 GB storage · Business support",
      ],
    },
  ],
  addOns: {
    whatsapp: "CRM functionality included. Meta / provider messaging charges billed on actual usage.",
    ai: "Monthly allowance included. Additional AI usage can be purchased as credits.",
    calling: "Capability depends on plan. Actual telecom/provider usage is separate.",
    extraUsers: {
      starter: 399,
      growth: 299,
      scale: 249,
    },
  },
};

export const capabilityBadges = [
  { id: "meta-capture", label: "Meta Lead Capture", icon: "Layers" },
  { id: "whatsapp", label: "WhatsApp Automation", icon: "MessageSquare" },
  { id: "pipelines", label: "Smart Pipelines", icon: "Kanban" },
  { id: "teams", label: "Team Hierarchy", icon: "Users" },
  { id: "analytics", label: "Sales Analytics", icon: "BarChart3" },
];
