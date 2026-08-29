import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { GlobalNavbar } from "@/components/GlobalNavbar";
import { GlobalFooter } from "@/components/GlobalFooter";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sahyak.com"),
  title: {
    default: "Universal Mobile-First CRM for High-Velocity Sales Teams | Sahyak CRM | Delhi NCR",
    template: "%s | Sahyak CRM | Noida & Delhi NCR",
  },
  description:
    "The universal mobile-first CRM for high-velocity sales teams across Agencies, Finance, Healthcare, Retail, SaaS, Consulting, and Real Estate. Zero setup chaos, instant WhatsApp triggers, and automated lead routing.",
  keywords: [
    "Sahyak CRM",
    "Mobile-First CRM",
    "Multi-Industry Sales CRM",
    "WhatsApp CRM Automation India",
    "Field Sales Tracker App",
    "Enterprise Lead Routing Software",
    "Meta Ads Lead Ingestion CRM",
    "Sales Pipeline Software Delhi NCR",
    "B2B Sales Operating System",
    "High-Velocity Lead Distribution CRM",
  ],
  authors: [{ name: "Sahyak Product & Solutions Team" }],
  creator: "Sahyak CRM",
  publisher: "Sahyak Technologies Pvt. Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://sahyak.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahyak.com",
    title: "Universal Mobile-First CRM for High-Velocity Sales Teams | Sahyak CRM",
    description:
      "The universal mobile-first CRM for high-velocity sales teams across Agencies, Finance, Healthcare, Retail, SaaS, Consulting, and Real Estate.",
    siteName: "Sahyak CRM",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Sahyak CRM Universal Mobile-First Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Mobile-First CRM for High-Velocity Sales Teams | Sahyak CRM",
    description:
      "The universal mobile-first CRM for high-velocity sales teams across Agencies, Finance, Healthcare, Retail, SaaS, Consulting, and Real Estate.",
    images: ["/android-chrome-512x512.png"],
    creator: "@sahyakcrm",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data for AI & Search Engine Rich Results
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://sahyak.com/#software",
      "name": "Sahyak CRM",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "CRM & Sales Pipeline Automation",
      "operatingSystem": "Web, iOS, Android",
      "description":
        "The ultimate mobile-first CRM for high-velocity sales teams in Noida, Greater Noida, and Delhi NCR. Zero setup chaos, instant WhatsApp automation, and dynamic industry pipelines.",
      "url": "https://sahyak.com",
      "image": "https://sahyak.com/android-chrome-512x512.png",
      "offers": {
        "@type": "Offer",
        "price": "999",
        "priceCurrency": "INR",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "142",
        "bestRating": "5",
        "worstRating": "1",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://sahyak.com/#organization",
      "name": "Sahyak CRM",
      "legalName": "Sahyak Technologies Pvt. Ltd.",
      "url": "https://sahyak.com",
      "logo": "https://sahyak.com/android-chrome-512x512.png",
      "sameAs": [
        "https://linkedin.com/company/sahyakcrm",
        "https://twitter.com/sahyakcrm",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-98112-34567",
        "contactType": "sales",
        "email": "sales@sahyak.com",
        "areaServed": ["IN", "AE"],
        "availableLanguage": ["English", "Hindi"],
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 62",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201309",
        "addressCountry": "IN",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://sahyak.com/#localbusiness",
      "name": "Sahyak CRM — Regional HQ & Sales Technology Desk",
      "image": "https://sahyak.com/android-chrome-512x512.png",
      "url": "https://sahyak.com",
      "telephone": "+91-98112-34567",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 62",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201309",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.628,
        "longitude": 77.3649,
      },
      "areaServed": [
        { "@type": "City", "name": "Noida" },
        { "@type": "City", "name": "Greater Noida" },
        { "@type": "City", "name": "Gurugram" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" },
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        "opens": "09:00",
        "closes": "20:00",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth antialiased overflow-x-clip`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white overflow-x-clip max-w-full">
        <GlobalNavbar />
        <main className="flex-1 flex flex-col w-full overflow-x-clip max-w-full">
          <PageTransition>{children}</PageTransition>
        </main>
        <GlobalFooter />
      </body>
    </html>
  );
}
