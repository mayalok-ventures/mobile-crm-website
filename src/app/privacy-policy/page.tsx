import React from "react";
import type { Metadata } from "next";
import PrivacyPolicyPage from "../privacy/page";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Governance Standards | Sahyak CRM",
  description:
    "Comprehensive Privacy Policy, Data Processing Taxonomy, and Compliance Architecture governing Sahyak CRM, operated by MayaLok Ventures / Sahyak Technologies Pvt. Ltd.",
  alternates: {
    canonical: "https://sahyak.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyAliasPage() {
  return <PrivacyPolicyPage />;
}
