import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    "",
    "/features",
    "/pricing",
    "/security",
    "/resources",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/data-deletion",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/features" || route === "/pricing" || route === "/resources" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/features" || route === "/pricing" || route === "/resources" || route === "/contact" ? 0.9 : 0.6,
  }));
}
