import fs from "fs";
import path from "path";
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

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

// In-memory fallback
let memoryLeadsCache: StoredLead[] = [];

// Ensure .data directory and leads.json file exist
function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("[LeadsStore] Failed to initialize .data directory:", err);
  }
}

/**
 * Fetch all stored leads from disk and memory
 */
export async function getAllLeads(db?: D1Database | null): Promise<StoredLead[]> {
  // 1. If Cloudflare D1 database is present, query D1
  if (db) {
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
  }

  // 2. Local Node.js filesystem persistence
  try {
    ensureDataFile();
    if (fs.existsSync(DATA_FILE)) {
      const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed)) {
        memoryLeadsCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error("[LeadsStore] Error reading .data/leads.json:", err);
  }

  return memoryLeadsCache;
}

/**
 * Save a new lead to disk and Cloudflare D1
 */
export async function saveLead(lead: StoredLead, db?: D1Database | null): Promise<void> {
  // 1. Save to Cloudflare D1 if available
  if (db) {
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
  }

  // 2. Save to local disk in Node.js environment
  try {
    ensureDataFile();
    const existing = await getAllLeads();
    const updated = [lead, ...existing.filter((l) => l.id !== lead.id && l.requestId !== lead.requestId)];
    memoryLeadsCache = updated;
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("[LeadsStore] Error writing to .data/leads.json:", err);
    memoryLeadsCache.unshift(lead);
  }
}

/**
 * Clear all leads (for admin reset)
 */
export async function clearLeads(db?: D1Database | null): Promise<void> {
  if (db) {
    await executeD1Query(db, "DELETE FROM leads", []);
  }

  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    memoryLeadsCache = [];
  } catch (err) {
    console.error("[LeadsStore] Error clearing .data/leads.json:", err);
    memoryLeadsCache = [];
  }
}
