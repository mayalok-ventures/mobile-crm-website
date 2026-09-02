-- Cloudflare D1 Database Schema: mobile-crm-website
-- Database ID: 29ac8dce-f4f3-4878-aa36-53648608b38c

-- 1. Inbound Leads & Contact Inquiries
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT DEFAULT 'Not specified',
    team_size TEXT DEFAULT '1-5',
    requirement TEXT,
    inquiry_type TEXT DEFAULT 'Book a Demo',
    source TEXT DEFAULT 'WEBSITE',
    status TEXT DEFAULT 'new',
    ip_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- 2. Audit Logs & Security Telemetry
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_event ON audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- 3. Real Visitor Analytics — Page View Events
CREATE TABLE IF NOT EXISTS page_views (
    id TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    referrer TEXT DEFAULT '',
    country TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT 'Desktop',
    browser TEXT DEFAULT 'Other',
    visitor_hash TEXT NOT NULL,    -- anonymised SHA-256 prefix (16 hex chars)
    session_hash TEXT NOT NULL,    -- per-tab session identifier
    ts INTEGER NOT NULL,           -- Unix timestamp ms (for fast range queries)
    created_at TEXT NOT NULL       -- ISO-8601 string
);

CREATE INDEX IF NOT EXISTS idx_pv_ts ON page_views(ts);
CREATE INDEX IF NOT EXISTS idx_pv_visitor ON page_views(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_pv_page ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_pv_country ON page_views(country);

