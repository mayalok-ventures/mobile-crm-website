"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Users,
  Database,
  Globe,
  Clock,
  Download,
  Trash2,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Activity,
  Shield,
  LogOut,
  List,
  Columns,
  X,
  Phone,
  Unlock,
  Menu,
  Inbox,
  Layers,
  Compass,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";
import { AdminAnalyticsData } from "@/lib/analytics-store";

// Dynamically import Recharts to prevent SSR hydration mismatches
const TrafficAreaChart = dynamic(
  () => import("@/components/admin/AdminTelemetryCharts").then((mod) => mod.TrafficAreaChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs font-mono text-slate-400">Loading Telemetry Stream...</span>
      </div>
    ),
  }
);

const HorizontalMetricBarChart = dynamic(
  () => import("@/components/admin/AdminTelemetryCharts").then((mod) => mod.HorizontalMetricBarChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-60 w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs font-mono text-slate-400">Loading Chart...</span>
      </div>
    ),
  }
);

export interface LeadSubmission {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  requirement: string;
  inquiryType: string;
  source: string;
  utmSource?: string;
  utmCampaign?: string;
  landingPage?: string;
  visitorId?: string;
  status: "New" | "Contacted" | "Qualified" | "In Pipeline";
}

const PIPELINE_STAGES: LeadSubmission["status"][] = [
  "New",
  "Contacted",
  "Qualified",
  "In Pipeline",
];

const INITIAL_ANALYTICS: AdminAnalyticsData = {
  range: "7d",
  overview: {
    uniqueVisitors: 0,
    newVisitors: 0,
    returningVisitors: 0,
    returningRate: "0%",
    liveVisitors: 0,
    totalPageviews: 0,
    todayVisitors: 0,
    todayPageviews: 0,
    avgTimeOnPageSec: 0,
    totalLeads: 0,
    overallConversionRate: "0.0%",
  },
  trafficSeries: [],
  topChannels: [],
  utmBreakdown: [],
  referrerBreakdown: [],
  topReferrers: [],
  topCampaigns: [],
  topPages: [],
  sectionEngagement: [],
  topCountries: [],
  topCities: [],
  deviceBreakdown: [],
  browserBreakdown: [],
  osBreakdown: [],
  conversionAttribution: [],
};

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authKeyInput, setAuthKeyInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Navigation State
  const [activeTab, setActiveTab] = useState<"overview" | "submissions" | "traffic" | "audience" | "settings">("overview");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Date Range Filter State
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "1y">("7d");

  // Export State
  const [isExporting, setIsExporting] = useState<"csv" | "json" | null>(null);

  // Leads Data State
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Real Analytics State
  const [analytics, setAnalytics] = useState<AdminAnalyticsData>(INITIAL_ANALYTICS);
  const [analyticsLoading, setAnalyticsLoading] = useState<boolean>(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ── Fetch Leads from /api/contact (D1 Authoritative) ──────────────────────────
  const fetchLiveLeads = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        const formatted: LeadSubmission[] = data.leads.map((l: {
          id?: string;
          submittedAt: string;
          name: string;
          email: string;
          phone: string;
          company?: string;
          teamSize?: string;
          requirement?: string;
          inquiryType?: string;
          source?: string;
          utmSource?: string;
          utmCampaign?: string;
          landingPage?: string;
          visitorId?: string;
          status?: LeadSubmission["status"];
        }) => ({
          id: l.id || `lead_${Date.now()}`,
          date: new Date(l.submittedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          name: l.name,
          email: l.email,
          phone: l.phone,
          company: l.company || "Not specified",
          teamSize: l.teamSize || "1-5",
          requirement: l.requirement || "",
          inquiryType: l.inquiryType || "General Inquiry",
          source: l.source || "Direct",
          utmSource: l.utmSource,
          utmCampaign: l.utmCampaign,
          landingPage: l.landingPage,
          visitorId: l.visitorId,
          status: l.status || "New",
        }));
        setLeads(formatted);
      }
    } catch {
      // Non-blocking
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // ── Fetch Analytics Telemetry from /api/admin/analytics ─────────────────────
  const fetchAnalytics = useCallback(async (range: "7d" | "30d" | "1y") => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setAnalytics(json.data);
        }
      }
    } catch {
      // Non-blocking
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  // ── Polling and Session Verification ─────────────────────────────────────────
  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch("/api/admin/session");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchAnalytics(dateRange);
        }
      } catch {}
    }
    verifySession();
    fetchLiveLeads();

    // Auto-poll leads every 6s, analytics every 25s
    const leadsInterval = setInterval(fetchLiveLeads, 6000);
    const analyticsInterval = setInterval(() => {
      if (isAuthenticated) fetchAnalytics(dateRange);
    }, 25000);

    return () => {
      clearInterval(leadsInterval);
      clearInterval(analyticsInterval);
    };
  }, [fetchLiveLeads, fetchAnalytics, dateRange, isAuthenticated]);

  // When date range changes, refetch analytics
  const handleDateRangeChange = (range: "7d" | "30d" | "1y") => {
    setDateRange(range);
    fetchAnalytics(range);
  };

  // ── Export Analytics Telemetry (CSV / JSON) ──────────────────────────────────
  const handleExportAnalytics = async (format: "csv" | "json") => {
    if (isExporting) return;
    setIsExporting(format);

    try {
      const res = await fetch(`/api/admin/analytics/export?range=${dateRange}&format=${format}`);
      if (!res.ok) {
        showToast(`Export failed (${res.status}). Try again.`);
        return;
      }

      const blob = await res.blob();
      const dateStr = new Date().toISOString().split("T")[0];
      const filename = `sahyak-analytics-${dateRange}-${dateStr}.${format}`;

      const blobUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);

      showToast(`Analytics ${format.toUpperCase()} (${dateRange.toUpperCase()}) exported successfully`);
    } catch {
      showToast(`Export error for ${format.toUpperCase()}`);
    } finally {
      setIsExporting(null);
    }
  };

  // ── Login Handler ────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authKeyInput }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError("");
        await fetchLiveLeads();
        await fetchAnalytics(dateRange);
        showToast("Authenticated into Sahyak Admin Command Desk");
      } else {
        setAuthError(data.error || "Authentication failed. Invalid master key.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    }
  };

  // ── Logout Handler ───────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    setAuthKeyInput("");
    showToast("Admin session terminated");
  };

  // ── Lead Status Update Handler (PATCH /api/contact) ──────────────────────────
  const updateLeadStatus = async (leadId: string, newStatus: LeadSubmission["status"]) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (!res.ok) {
        console.warn("[Admin] PATCH failed:", await res.text());
      }
    } catch (err) {
      console.warn("[Admin] PATCH network error:", err);
    }

    showToast(`Lead status updated to ${newStatus}`);
  };

  // ── Clear All Leads (DELETE /api/contact) ─────────────────────────────────────
  const clearAllLeads = async () => {
    if (!window.confirm("Are you sure you want to purge all lead records from D1?")) return;
    try {
      await fetch("/api/contact", { method: "DELETE" });
      setLeads([]);
      showToast("All leads purged from database");
    } catch {
      showToast("Purge failed");
    }
  };

  // ── Export Leads CSV Handler ─────────────────────────────────────────────────
  const exportLeadsCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Date", "Name", "Email", "Phone", "Company", "Team Size", "Source", "Campaign", "Status", "Requirement"];
    const rows = leads.map((l) => [
      l.id,
      l.date,
      `"${l.name.replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.company.replace(/"/g, '""')}"`,
      l.teamSize,
      l.source,
      l.utmCampaign || "None",
      l.status,
      `"${l.requirement.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sahyak_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads CSV export initiated");
  };

  // ── Filter & Search Leads ────────────────────────────────────────────────────
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.source.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage]);

  // ─────────────────────────────────────────────────────────────
  // 0. SECURITY LOGIN GATE
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 font-sans text-slate-900">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center mx-auto overflow-hidden p-2">
              <Image
                src="/android-chrome-192x192.png"
                alt="Sahyak CRM"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 font-heading tracking-tight">
              Sahyak Admin Command Desk
            </h1>
            <p className="text-xs text-slate-500">
              Restricted internal intelligence route. Authenticate with your enterprise token.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                Admin Access Token
              </label>
              <input
                type="password"
                placeholder="Enter master key"
                value={authKeyInput}
                onChange={(e) => setAuthKeyInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-heading shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Authenticate &amp; Enter</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>D1 SQL Vault</span>
            <span className="text-emerald-600 font-bold">256-Bit Encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // AUTHENTICATED COMMAND DESK
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row font-sans text-slate-900 antialiased selection:bg-[#0077ff] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE TOPBAR */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
            <Image
              src="/android-chrome-192x192.png"
              alt="Sahyak CRM"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading font-extrabold text-sm text-slate-900">
            Sahyak<span className="text-slate-400 text-xs font-normal">crm</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 sticky top-[57px] z-40 shadow-lg">
          <button
            onClick={() => { setActiveTab("overview"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === "overview" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            <Activity className="w-4 h-4" />
            <span>Overview &amp; KPIs</span>
          </button>
          <button
            onClick={() => { setActiveTab("submissions"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === "submissions" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4" />
              <span>Pipeline Leads</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">{leads.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab("traffic"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === "traffic" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            <Globe className="w-4 h-4" />
            <span>Traffic &amp; Sources</span>
          </button>
          <button
            onClick={() => { setActiveTab("audience"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === "audience" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            <Compass className="w-4 h-4" />
            <span>Audience &amp; Geo</span>
          </button>
          <button
            onClick={() => { setActiveTab("settings"); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-left ${activeTab === "settings" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            <Shield className="w-4 h-4" />
            <span>D1 Vault &amp; Infra</span>
          </button>

          {/* Mobile Export Group */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-2 block">Export Analytics</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleExportAnalytics("csv")}
                disabled={isExporting !== null}
                className="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold font-mono flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExportAnalytics("json")}
                disabled={isExporting !== null}
                className="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold font-mono flex items-center justify-center gap-1.5"
              >
                <FileCode className="w-3.5 h-3.5 text-slate-600" />
                <span>JSON</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 text-left pt-3 border-t border-slate-100"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen sticky top-0 h-screen">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white flex items-center justify-center">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="Sahyak CRM"
                  width={28}
                  height={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight text-slate-900">
                Sahyak<span className="text-slate-400 text-xs font-normal ml-0.5">crm</span>
              </span>
            </Link>
            <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
              ADMIN
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${activeTab === "overview" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Activity className="w-4 h-4" />
              <span>Overview &amp; KPIs</span>
            </button>

            <button
              onClick={() => setActiveTab("submissions")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${activeTab === "submissions" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4" />
                <span>Pipeline Leads</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${activeTab === "submissions" ? "bg-white text-slate-900" : "bg-slate-200 text-slate-700"}`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("traffic")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${activeTab === "traffic" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Globe className="w-4 h-4" />
              <span>Traffic &amp; Sources</span>
            </button>

            <button
              onClick={() => setActiveTab("audience")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${activeTab === "audience" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Compass className="w-4 h-4" />
              <span>Audience &amp; Geo</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${activeTab === "settings" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <Shield className="w-4 h-4" />
              <span>D1 Vault &amp; Infra</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-heading">
              AD
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">Lead Closer Admin</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">admin@sahyak.com</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-600 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-4">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading tracking-tight capitalize">
              {activeTab === "overview" && "Executive Telemetry & Performance"}
              {activeTab === "submissions" && "Sales Pipeline & Lead Management"}
              {activeTab === "traffic" && "Traffic Acquisition & Conversion"}
              {activeTab === "audience" && "Visitor Audience & Geographic Telemetry"}
              {activeTab === "settings" && "Cloudflare D1 Infrastructure"}
            </h2>
          </div>

          {/* Controls: Date Range & Export Analytics */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Date Range Selector */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => handleDateRangeChange("7d")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${dateRange === "7d" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
              >
                7 Days
              </button>
              <button
                onClick={() => handleDateRangeChange("30d")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${dateRange === "30d" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
              >
                30 Days
              </button>
              <button
                onClick={() => handleDateRangeChange("1y")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${dateRange === "1y" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
              >
                1 Year
              </button>
            </div>

            {/* Dedicated Export Analytics Buttons */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold items-center">
              <span className="px-2 text-slate-500 font-mono text-[10px] uppercase font-bold hidden lg:inline">Export:</span>
              <button
                onClick={() => handleExportAnalytics("csv")}
                disabled={isExporting !== null}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-900 shadow-2xs font-mono font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50 transition-all"
                title="Download structured business CSV report"
              >
                <Download className="w-3 h-3 text-slate-600" />
                <span>{isExporting === "csv" ? "..." : "CSV"}</span>
              </button>
              <button
                onClick={() => handleExportAnalytics("json")}
                disabled={isExporting !== null}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-900 shadow-2xs font-mono font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50 transition-all ml-1"
                title="Download machine-readable JSON report"
              >
                <Download className="w-3 h-3 text-slate-600" />
                <span>{isExporting === "json" ? "..." : "JSON"}</span>
              </button>
            </div>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* ─────────────────────────────────────────────────────────────
              1. EXECUTIVE KPI CARDS (OVERVIEW TAB)
          ───────────────────────────────────────────────────────────── */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1: Live Visitors Now */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium font-heading">
                <span>LIVE VISITORS NOW</span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {analytics.overview.liveVisitors}
              </div>
              <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                <span>Active within last 2.5 mins</span>
              </div>
            </div>

            {/* KPI 2: Total Unique Visitors */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium font-heading">
                <span>UNIQUE VISITORS ({dateRange.toUpperCase()})</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {analyticsLoading ? "..." : analytics.overview.uniqueVisitors}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                <span>{analytics.overview.newVisitors} New &bull; {analytics.overview.returningRate} Returning</span>
              </div>
            </div>

            {/* KPI 3: Pipeline Leads */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium font-heading">
                <span>CAPTURED LEADS</span>
                <Database className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0077ff] font-heading">
                {leads.length}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                <span>{analytics.overview.overallConversionRate} Overall Visitor Conversion</span>
              </div>
            </div>

            {/* KPI 4: Total Pageviews */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium font-heading">
                <span>TOTAL PAGEVIEWS</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {analytics.overview.totalPageviews}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                <span>{analytics.overview.todayPageviews} views today &bull; {analytics.overview.avgTimeOnPageSec}s avg dwell</span>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────────────────────
              2. TRAFFIC & OVERVIEW CHARTS
          ───────────────────────────────────────────────────────────── */}
          {(activeTab === "overview" || activeTab === "traffic") && (
            <div className="space-y-8">
              {/* Traffic Area Chart */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-heading">
                      Unique Visitors &amp; Pageviews ({dateRange.toUpperCase()})
                    </h3>
                    <p className="text-xs text-slate-500">Real-time daily volume from Cloudflare D1 telemetry.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium font-mono">
                    <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                      <span className="w-3 h-3 rounded-sm bg-[#0077ff] inline-block" />
                      Visitors ({analytics.overview.uniqueVisitors})
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-3 h-3 rounded-sm bg-slate-400 inline-block" />
                      Pageviews ({analytics.overview.totalPageviews})
                    </span>
                  </div>
                </div>

                <TrafficAreaChart data={analytics.trafficSeries} />
              </div>

              {/* Acquisition Channels & Top Pages Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Channels Table (7 Cols) */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                        Acquisition Channels &amp; Conversion
                      </h4>
                      <p className="text-[11px] text-slate-500">Source attribution linked directly to lead conversion.</p>
                    </div>
                  </div>

                  {analytics.topChannels.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px] uppercase">
                          <tr>
                            <th className="py-2.5 px-3">Channel Source</th>
                            <th className="py-2.5 px-3">Visitors</th>
                            <th className="py-2.5 px-3">Traffic Share</th>
                            <th className="py-2.5 px-3">Leads</th>
                            <th className="py-2.5 px-3 text-right">Conv. Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-sans">
                          {analytics.topChannels.map((c) => (
                            <tr key={c.channel} className="hover:bg-slate-50/70">
                              <td className="py-3 px-3 font-bold text-slate-900">{c.channel}</td>
                              <td className="py-3 px-3 font-mono text-slate-600">{c.visitors}</td>
                              <td className="py-3 px-3 font-mono text-slate-500">{c.share}</td>
                              <td className="py-3 px-3 font-mono font-bold text-[#0077ff]">{c.leads}</td>
                              <td className="py-3 px-3 font-mono font-bold text-emerald-600 text-right">{c.conversionRate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      Awaiting initial acquisition telemetry
                    </div>
                  )}
                </div>

                {/* Top Visited Routes Bar Chart (5 Cols) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                      Top Visited Pages
                    </h4>
                    <p className="text-[11px] text-slate-500">Pageview count by URL route path.</p>
                  </div>

                  <HorizontalMetricBarChart
                    data={analytics.topPages.map((p) => ({
                      label: p.page === "/" ? "Home" : p.page.replace(/^\//, ""),
                      value: p.views,
                    }))}
                    metricName="Views"
                    color="#0077ff"
                  />
                </div>
              </div>

              {/* Section Engagement Dwell (5 Cols) */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                    Homepage Section Attention &amp; Dwell Seconds
                  </h4>
                  <p className="text-[11px] text-slate-500">Average visitor dwell time captured via IntersectionObserver.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {analytics.sectionEngagement.length > 0 ? (
                    analytics.sectionEngagement.map((s) => (
                      <div key={s.section} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="text-[11px] font-mono font-bold uppercase text-slate-500">
                          {s.section.replace(/_/g, " ")}
                        </div>
                        <div className="text-xl font-extrabold text-slate-900 font-heading">
                          {s.avgDwellSec}s <span className="text-xs font-normal text-slate-400">avg</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {s.visitors} engaged visitors
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                      Awaiting section scroll dwell events
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              3. AUDIENCE & GEOGRAPHY TAB
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "audience" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Countries (6 Cols) */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900 font-heading">Top Countries</h4>
                  <p className="text-[11px] text-slate-500">Derived from Cloudflare Edge request metadata.</p>
                </div>

                <div className="space-y-3">
                  {analytics.topCountries.length > 0 ? (
                    analytics.topCountries.map((c) => (
                      <div key={c.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{c.name}</span>
                          <span className="font-mono text-slate-600 font-semibold">{c.visitors} visitors ({c.percentage}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-slate-900 rounded-full" style={{ width: `${Math.max(c.percentage, 5)}%` }} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">No geo events recorded yet</div>
                  )}
                </div>
              </div>

              {/* Devices & Browsers (6 Cols) */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900 font-heading">Device &amp; Platform Breakdown</h4>
                  <p className="text-[11px] text-slate-500">Coarse client environment telemetry.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 uppercase font-mono">Devices</span>
                    {analytics.deviceBreakdown.map((d) => (
                      <div key={d.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between">
                        <span className="font-bold text-slate-800">{d.name}</span>
                        <span className="font-mono text-slate-500">{d.count} ({d.percentage}%)</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 uppercase font-mono">Browsers</span>
                    {analytics.browserBreakdown.map((b) => (
                      <div key={b.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between">
                        <span className="font-bold text-slate-800">{b.name}</span>
                        <span className="font-mono text-slate-500">{b.count} ({b.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              4. PIPELINE LEADS (SUBMISSIONS TAB)
          ───────────────────────────────────────────────────────────── */}
          {(activeTab === "overview" || activeTab === "submissions") && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
              {/* Header Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 font-heading">
                      Pipeline Leads &amp; Conversion Ingestion
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                      D1 DATABASE CONNECTED
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Authoritative records captured from `/contact` form and API.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewMode("table")}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${viewMode === "table" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Table</span>
                    </button>
                    <button
                      onClick={() => setViewMode("kanban")}
                      className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${viewMode === "kanban" ? "bg-white text-[#0084ff] shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kanban</span>
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors w-36 sm:w-48"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="all">All Stages</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="In Pipeline">In Pipeline</option>
                  </select>

                  <button
                    onClick={() => { fetchLiveLeads(); showToast("Synced from D1 database"); }}
                    disabled={isRefreshing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0084ff] border border-blue-200 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">Sync</span>
                  </button>

                  {leads.length > 0 && (
                    <button
                      onClick={clearAllLeads}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold cursor-pointer"
                      title="Purge all leads"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={exportLeadsCSV}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-heading transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Leads</span>
                  </button>
                </div>
              </div>

              {/* KANBAN VIEW */}
              {viewMode === "kanban" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {PIPELINE_STAGES.map((stage) => {
                    const stageLeads = filteredLeads.filter((l) => l.status === stage);
                    return (
                      <div key={stage} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 space-y-3 flex flex-col justify-between min-h-[320px]">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <span className="font-bold text-xs font-heading text-slate-800 uppercase tracking-wider">{stage}</span>
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">{stageLeads.length}</span>
                          </div>

                          <div className="space-y-2.5">
                            {stageLeads.map((lead) => (
                              <div
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer space-y-2"
                              >
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-bold text-slate-900 font-heading">{lead.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{lead.date}</span>
                                </div>
                                <div className="text-[11px] text-slate-600 truncate">{lead.requirement || `${lead.company} inquiry`}</div>
                                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                                  <a
                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-emerald-600 font-mono font-semibold hover:underline flex items-center gap-1"
                                  >
                                    <Phone className="w-3 h-3" />
                                    <span>WhatsApp</span>
                                  </a>
                                  <select
                                    value={lead.status}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      updateLeadStatus(lead.id, e.target.value as LeadSubmission["status"]);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-[10px] font-mono bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 cursor-pointer"
                                  >
                                    {PIPELINE_STAGES.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            ))}
                            {stageLeads.length === 0 && (
                              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                                No leads in {stage}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="pt-2 text-[10px] font-mono text-slate-400 text-center">Tap card for detail inspection</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TABLE VIEW */}
              {viewMode === "table" && (
                <>
                  {paginatedLeads.length > 0 ? (
                    <>
                      <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px]">
                            <tr>
                              <th className="py-3 px-4">Date / ID</th>
                              <th className="py-3 px-4">Prospect</th>
                              <th className="py-3 px-4">Direct Contact</th>
                              <th className="py-3 px-4">Attribution Source</th>
                              <th className="py-3 px-4">Requirement</th>
                              <th className="py-3 px-4">Stage</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                            {paginatedLeads.map((lead) => (
                              <tr
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                              >
                                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                                  <div className="text-slate-900 font-bold">{lead.date}</div>
                                  <span className="text-[10px] text-slate-400">{lead.id}</span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-slate-900 font-heading">{lead.name}</div>
                                  <span className="text-slate-500 font-mono text-[11px]">{lead.email}</span>
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-800">
                                  <a
                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="hover:underline flex items-center gap-1.5 text-emerald-700 font-semibold"
                                  >
                                    <Phone className="w-3 h-3 text-emerald-600" />
                                    <span>{lead.phone}</span>
                                  </a>
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold font-mono">
                                    {lead.source}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 max-w-xs text-slate-600 text-[11px] leading-relaxed truncate">
                                  {lead.requirement || `${lead.company} - ${lead.inquiryType}`}
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      updateLeadStatus(lead.id, e.target.value as LeadSubmission["status"]);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border cursor-pointer ${
                                      lead.status === "New"
                                        ? "bg-amber-50 text-amber-800 border-amber-200"
                                        : lead.status === "Qualified"
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                        : lead.status === "In Pipeline"
                                        ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                                        : "bg-slate-100 text-slate-700 border-slate-200"
                                    }`}
                                  >
                                    {PIPELINE_STAGES.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLead(lead);
                                    }}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                                  >
                                    Inspect
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono pt-2 gap-3">
                        <span>Showing {paginatedLeads.length} of {filteredLeads.length} total inquiries</span>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-slate-900">Page {currentPage} of {totalPages || 1}</span>
                          <button
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-16 text-center space-y-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto shadow-2xs">
                        <Inbox className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 max-w-sm mx-auto">
                        <h4 className="text-sm font-bold text-slate-900 font-heading">No Lead Inquiries Yet</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          When a visitor submits the contact form at{" "}
                          <Link href="/contact" target="_blank" className="text-[#0084ff] font-bold underline">
                            /contact
                          </Link>
                          , their submission will immediately appear here in real-time.
                        </p>
                      </div>
                      <div className="pt-2">
                        <Link
                          href="/contact"
                          target="_blank"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Test Form Submission</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              5. SETTINGS & D1 INFRASTRUCTURE TAB
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-slate-900" />
                    <h3 className="text-sm font-extrabold text-slate-900 font-heading">
                      Cloudflare D1 Serverless SQL Vault
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ONLINE &bull; D1 BOUND
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono text-slate-600">
                  <div className="flex justify-between border-b border-slate-100 py-1.5">
                    <span className="text-slate-400">Database Name:</span>
                    <span className="font-bold text-slate-900">mobile-crm-website</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 py-1.5">
                    <span className="text-slate-400">Database ID:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">29ac8dce-f4f3-4878-aa36-53648608b38c</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 py-1.5">
                    <span className="text-slate-400">Environment Binding:</span>
                    <span className="font-bold text-emerald-700">env.DB</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 py-1.5">
                    <span className="text-slate-400">Database Tables:</span>
                    <span className="font-bold text-slate-900">leads, visitors, sessions, page_views, section_engagements, live_visitors</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Edge Isolation:</span>
                    <span className="font-bold text-slate-900">Global Cloudflare Pages (v8 Isolate)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-900 font-heading">Security &amp; Encryption Standards</h3>
                  <p className="text-[11px] text-slate-500">Security gates active on all administrative routes.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                    <div className="font-bold font-heading">HMAC-SHA256 Session Cookie</div>
                    <div className="text-[11px] text-emerald-700">Signed admin authentication prevents session tampering.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
                    <div className="font-bold font-heading">Parameterized SQL Enforcement</div>
                    <div className="text-[11px] text-blue-700">All queries execute via D1 .bind() statements.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 space-y-1">
                    <div className="font-bold font-heading">Export Sanitization &amp; Protection</div>
                    <div className="text-[11px] text-slate-600">Automated CSV formula injection prevention and MIME attachment headers.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* LEAD DETAIL INSPECTION MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{selectedLead.id}</span>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading">{selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">DIRECT WHATSAPP</span>
                  <a href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`} target="_blank" className="font-bold text-emerald-600 hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">CORPORATE EMAIL</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-slate-900 hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">COMPANY &bull; TEAM SCALE</span>
                  <span className="font-bold text-slate-900">{selectedLead.company} ({selectedLead.teamSize})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">ACQUISITION SOURCE</span>
                  <span className="font-bold text-blue-600">{selectedLead.source}</span>
                </div>
              </div>

              {selectedLead.utmCampaign && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] font-mono">
                  <span className="text-blue-500 block text-[10px]">UTM CAMPAIGN ATTRIBUTION</span>
                  <span className="font-bold text-blue-900">{selectedLead.utmCampaign} ({selectedLead.landingPage || "/"})</span>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-slate-500 font-bold block text-[11px]">REQUIREMENT BRIEF:</span>
                <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-sans text-xs">
                  {selectedLead.requirement || "No detailed message provided."}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-500 font-bold block text-[11px]">PIPELINE STAGE:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadSubmission["status"])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-xs cursor-pointer"
                >
                  {PIPELINE_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                className="btn-pill-brand text-white text-xs px-5 py-2 font-bold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Launch WhatsApp</span>
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
