-- Cloudflare D1 Database Schema: mobile-crm-website
-- Database ID: 29ac8dce-f4f3-4878-aa36-53648608b38c
-- Authoritative Schema for Sahyak Official Website (https://sahyak.com)

-- ─────────────────────────────────────────────────────────────
-- 1. INBOUND LEADS & CONTACT INQUIRIES (WITH ATTRIBUTION)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT DEFAULT 'Not specified',
    team_size TEXT DEFAULT '1-5',
    requirement TEXT,
    inquiry_type TEXT DEFAULT 'Book a Demo',
    source TEXT DEFAULT 'Direct',
    utm_source TEXT DEFAULT '',
    utm_medium TEXT DEFAULT '',
    utm_campaign TEXT DEFAULT '',
    utm_term TEXT DEFAULT '',
    utm_content TEXT DEFAULT '',
    landing_page TEXT DEFAULT '/',
    referrer TEXT DEFAULT '',
    visitor_id TEXT DEFAULT '',
    session_id TEXT DEFAULT '',
    status TEXT DEFAULT 'New',
    ip_address TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_visitor ON leads(visitor_id);

-- ─────────────────────────────────────────────────────────────
-- 2. VISITOR IDENTITY (FIRST-PARTY ANONYMOUS INTELLIGENCE)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS visitors (
    visitor_id TEXT PRIMARY KEY,
    first_seen INTEGER NOT NULL,          -- Unix ms timestamp
    last_seen INTEGER NOT NULL,           -- Unix ms timestamp
    total_sessions INTEGER DEFAULT 1,
    total_pageviews INTEGER DEFAULT 1,
    first_source TEXT DEFAULT 'Direct',
    first_referrer TEXT DEFAULT '',
    first_landing_page TEXT DEFAULT '/',
    country TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT 'Desktop',
    browser TEXT DEFAULT 'Other',
    os TEXT DEFAULT 'Other',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_visitors_first_seen ON visitors(first_seen);
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen);
CREATE INDEX IF NOT EXISTS idx_visitors_source ON visitors(first_source);

-- ─────────────────────────────────────────────────────────────
-- 3. BROWSING SESSIONS (ENGAGEMENT & ATTRIBUTION SESSIONS)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    start_time INTEGER NOT NULL,          -- Unix ms timestamp
    last_active INTEGER NOT NULL,         -- Unix ms timestamp
    page_count INTEGER DEFAULT 1,
    duration_sec INTEGER DEFAULT 0,
    entry_page TEXT DEFAULT '/',
    exit_page TEXT DEFAULT '/',
    referrer TEXT DEFAULT '',
    source TEXT DEFAULT 'Direct',
    medium TEXT DEFAULT '',
    campaign TEXT DEFAULT '',
    term TEXT DEFAULT '',
    content TEXT DEFAULT '',
    country TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT 'Desktop',
    browser TEXT DEFAULT 'Other',
    os TEXT DEFAULT 'Other',
    is_bounce INTEGER DEFAULT 1,          -- 1 if single-page session, 0 if navigated
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_sessions_source ON sessions(source);

-- ─────────────────────────────────────────────────────────────
-- 4. PAGE VIEWS & TIME ON PAGE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
    id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    path TEXT NOT NULL,
    title TEXT DEFAULT '',
    referrer TEXT DEFAULT '',
    source TEXT DEFAULT 'Direct',
    utm_campaign TEXT DEFAULT '',
    duration_sec INTEGER DEFAULT 0,
    entry_page TEXT DEFAULT '/',
    country TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT 'Desktop',
    browser TEXT DEFAULT 'Other',
    os TEXT DEFAULT 'Other',
    is_entry INTEGER DEFAULT 0,
    is_exit INTEGER DEFAULT 0,
    ts INTEGER NOT NULL,                  -- Unix ms timestamp
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pv_ts ON page_views(ts);
CREATE INDEX IF NOT EXISTS idx_pv_visitor ON page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_pv_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_pv_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_pv_source ON page_views(source);
CREATE INDEX IF NOT EXISTS idx_pv_country ON page_views(country);

-- ─────────────────────────────────────────────────────────────
-- 5. SECTION ENGAGEMENT (HOMEPAGE DWELL INTELLIGENCE)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS section_engagements (
    id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    page_path TEXT NOT NULL,
    section_id TEXT NOT NULL,             -- e.g. hero, problem, mobile_closer, conduit, roi
    duration_sec INTEGER NOT NULL,        -- Dwell time in seconds
    ts INTEGER NOT NULL,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_se_ts ON section_engagements(ts);
CREATE INDEX IF NOT EXISTS idx_se_section ON section_engagements(section_id);

-- ─────────────────────────────────────────────────────────────
-- 6. LIVE TELEMETRY HEARTBEAT (ACTIVE VISITORS NOW)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS live_visitors (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    current_path TEXT NOT NULL,
    last_seen INTEGER NOT NULL,           -- Unix ms timestamp
    country TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT 'Desktop',
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_live_last_seen ON live_visitors(last_seen);

-- ─────────────────────────────────────────────────────────────
-- 7. AUDIT LOGS & SECURITY TELEMETRY
-- ─────────────────────────────────────────────────────────────
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
