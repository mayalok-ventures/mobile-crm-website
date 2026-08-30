import { executeD1Query, D1Database } from "@/lib/d1-database";

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
  status: "New" | "Contacted" | "Qualified" | "In Pipeline";
  ip?: string;
}

// Global edge in-memory store (Edge runtime compatible)
const globalEdgeLeads: StoredLead[] = [];

/**
 * Fetch all stored leads from Cloudflare D1 or Edge memory
 */
export async function getAllLeads(db?: D1Database | null): Promise<StoredLead[]> {
  // 1. If Cloudflare D1 database is present, query D1
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
        status: string;
        created_at: string;
      }>(
        db,
        "SELECT id, name, email, phone, company, team_size, requirement, inquiry_type, status, created_at FROM leads ORDER BY created_at DESC LIMIT 100",
        []
      );

      if (result.success && result.data && result.data.length > 0) {
        return result.data.map((row) => ({
          id: row.id,
          requestId: row.id,
          submittedAt: row.created_at || new Date().toISOString(),
          name: row.name,
          email: row.email,
          phone: row.phone,
          company: row.company || "Not specified",
          teamSize: row.team_size || "5-20 Closers",
          requirement: row.requirement || "",
          inquiryType: row.inquiry_type || "Book a Demo",
          status: (row.status === "new" ? "New" : (row.status as StoredLead["status"])) || "New",
        }));
      }
    } catch (d1Err) {
      console.error("[LeadsStore] D1 read error:", d1Err);
    }
  }

  // 2. Return edge memory leads
  return globalEdgeLeads;
}

/**
 * Save a new lead to Cloudflare D1 and Edge memory
 */
export async function saveLead(lead: StoredLead, db?: D1Database | null): Promise<void> {
  // 1. Save to Cloudflare D1 if available
  if (db) {
    try {
      await executeD1Query(
        db,
        `INSERT INTO leads (id, name, email, phone, company, team_size, requirement, inquiry_type, source, status, ip_address, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'WEBSITE', 'New', ?, ?)`,
        [
          lead.id,
          lead.name,
          lead.email,
          lead.phone,
          lead.company,
          lead.teamSize,
          lead.requirement,
          lead.inquiryType,
          lead.ip || "127.0.0.1",
          lead.submittedAt,
        ]
      );
    } catch (err) {
      console.error("[LeadsStore] D1 insert failed:", err);
    }
  }

  // 2. Add to edge memory cache
  const existingIdx = globalEdgeLeads.findIndex(
    (l) => l.id === lead.id || l.requestId === lead.requestId
  );
  if (existingIdx >= 0) {
    globalEdgeLeads[existingIdx] = lead;
  } else {
    globalEdgeLeads.unshift(lead);
  }
  if (globalEdgeLeads.length > 500) globalEdgeLeads.pop();
}

/**
 * Clear all leads (for admin reset)
 */
export async function clearLeads(db?: D1Database | null): Promise<void> {
  if (db) {
    try {
      await executeD1Query(db, "DELETE FROM leads", []);
    } catch (err) {
      console.error("[LeadsStore] D1 delete failed:", err);
    }
  }

  globalEdgeLeads.length = 0;
}
