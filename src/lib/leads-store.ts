import { executeD1Query, executeD1Run, D1Database } from "@/lib/d1-database";

export interface StoredLead {
  id: string;
  requestId: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  requirement: string;
  inquiryType: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
  visitorId?: string;
  sessionId?: string;
  status: "New" | "Contacted" | "Qualified" | "In Pipeline";
  ip?: string;
}

// In-memory fallback ring buffer for local development only
const globalForLeads = globalThis as unknown as { __globalEdgeLeads?: StoredLead[] };
if (!globalForLeads.__globalEdgeLeads) {
  globalForLeads.__globalEdgeLeads = [];
}
const globalEdgeLeads = globalForLeads.__globalEdgeLeads;

/**
 * Fetch all stored leads from Cloudflare D1 (or dev fallback)
 */
export async function getAllLeads(db?: D1Database | null): Promise<StoredLead[]> {
  if (db) {
    try {
      const result = await executeD1Query<{
        id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
        team_size: string;
        requirement: string;
        inquiry_type: string;
        source: string;
        utm_source: string;
        utm_medium: string;
        utm_campaign: string;
        utm_term: string;
        utm_content: string;
        landing_page: string;
        referrer: string;
        visitor_id: string;
        session_id: string;
        status: string;
        created_at: string;
      }>(
        db,
        `SELECT id, name, email, phone, company, team_size, requirement, inquiry_type, 
                source, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
                landing_page, referrer, visitor_id, session_id, status, created_at 
         FROM leads 
         ORDER BY created_at DESC 
         LIMIT 200`,
        []
      );

      if (result.success && result.data) {
        return result.data.map((row) => ({
          id: row.id,
          requestId: row.id,
          submittedAt: row.created_at || new Date().toISOString(),
          name: row.name,
          email: row.email,
          phone: row.phone,
          company: row.company || "Not specified",
          teamSize: row.team_size || "1-5",
          requirement: row.requirement || "",
          inquiryType: row.inquiry_type || "Book a Demo",
          source: row.source || "Direct",
          utmSource: row.utm_source || "",
          utmMedium: row.utm_medium || "",
          utmCampaign: row.utm_campaign || "",
          utmTerm: row.utm_term || "",
          utmContent: row.utm_content || "",
          landingPage: row.landing_page || "/",
          referrer: row.referrer || "",
          visitorId: row.visitor_id || "",
          sessionId: row.session_id || "",
          status: (row.status === "new" ? "New" : (row.status as StoredLead["status"])) || "New",
        }));
      }
    } catch (d1Err) {
      console.error("[LeadsStore] D1 read error:", d1Err);
    }
  }

  // Local development fallback
  return globalEdgeLeads;
}

/**
 * Save a new lead to Cloudflare D1 with full attribution fields
 */
export async function saveLead(
  lead: StoredLead,
  db?: D1Database | null
): Promise<{ success: boolean; error?: string }> {
  if (db) {
    const res = await executeD1Run(
      db,
      `INSERT INTO leads (
         id, name, email, phone, company, team_size, requirement, inquiry_type,
         source, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
         landing_page, referrer, visitor_id, session_id, status, ip_address, created_at, updated_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lead.id,
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.teamSize,
        lead.requirement,
        lead.inquiryType,
        lead.source,
        lead.utmSource || "",
        lead.utmMedium || "",
        lead.utmCampaign || "",
        lead.utmTerm || "",
        lead.utmContent || "",
        lead.landingPage || "/",
        lead.referrer || "",
        lead.visitorId || "",
        lead.sessionId || "",
        lead.status,
        lead.ip || "",
        lead.submittedAt,
        lead.submittedAt,
      ]
    );

    if (!res.success) {
      console.error("[LeadsStore] D1 insert failed:", res.error);
      return { success: false, error: res.error || "Failed to persist lead to database." };
    }
  }

  // Also update local memory cache
  const existingIdx = globalEdgeLeads.findIndex(
    (l) => l.id === lead.id || l.requestId === lead.requestId
  );
  if (existingIdx >= 0) {
    globalEdgeLeads[existingIdx] = lead;
  } else {
    globalEdgeLeads.unshift(lead);
  }
  if (globalEdgeLeads.length > 500) globalEdgeLeads.pop();

  return { success: true };
}

/**
 * Update a lead's status in D1 and memory
 */
export async function updateLeadStatus(
  leadId: string,
  newStatus: StoredLead["status"],
  db?: D1Database | null
): Promise<{ success: boolean; error?: string }> {
  if (db) {
    const res = await executeD1Run(
      db,
      "UPDATE leads SET status = ?, updated_at = ? WHERE id = ?",
      [newStatus, new Date().toISOString(), leadId]
    );
    if (!res.success) {
      console.error("[LeadsStore] D1 status update error:", res.error);
      return { success: false, error: res.error || "Database status update failed." };
    }
  }

  // Update memory store
  const idx = globalEdgeLeads.findIndex((l) => l.id === leadId);
  if (idx >= 0) {
    globalEdgeLeads[idx] = { ...globalEdgeLeads[idx], status: newStatus };
  }

  return { success: true };
}

/**
 * Clear all leads (admin purge)
 */
export async function clearLeads(db?: D1Database | null): Promise<void> {
  if (db) {
    await executeD1Run(db, "DELETE FROM leads", []).catch(() => {});
  }
  globalEdgeLeads.length = 0;
}
