/**
 * Cloudflare D1 Database Prepared Statement Enforcement & Self-Healing Migration Layer
 *
 * Strict Rule: Never concatenate raw user input into SQL queries.
 * All queries MUST use parameterized prepared statements (.bind(...)).
 */

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[]; success: boolean; meta?: unknown }>;
  run(): Promise<{ success: boolean; meta?: unknown }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
  exec(query: string): Promise<unknown>;
}

// Track whether schema initialization has completed for this isolate
let schemaInitialized = false;

const INIT_SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS leads (
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
  )`,
  `CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)`,
  `CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`,
  `CREATE TABLE IF NOT EXISTS visitors (
    visitor_id TEXT PRIMARY KEY,
    first_seen INTEGER NOT NULL,
    last_seen INTEGER NOT NULL,
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
  )`,
  `CREATE INDEX IF NOT EXISTS idx_visitors_first_seen ON visitors(first_seen)`,
  `CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen)`,
  `CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    start_time INTEGER NOT NULL,
    last_active INTEGER NOT NULL,
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
    is_bounce INTEGER DEFAULT 1,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON sessions(visitor_id)`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_start_time ON sessions(start_time)`,
  `CREATE TABLE IF NOT EXISTS page_views (
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
    ts INTEGER NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_pv_ts ON page_views(ts)`,
  `CREATE INDEX IF NOT EXISTS idx_pv_visitor ON page_views(visitor_id)`,
  `CREATE INDEX IF NOT EXISTS idx_pv_session ON page_views(session_id)`,
  `CREATE INDEX IF NOT EXISTS idx_pv_path ON page_views(path)`,
  `CREATE TABLE IF NOT EXISTS section_engagements (
    id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    page_path TEXT NOT NULL,
    section_id TEXT NOT NULL,
    duration_sec INTEGER NOT NULL,
    ts INTEGER NOT NULL,
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_se_ts ON section_engagements(ts)`,
  `CREATE INDEX IF NOT EXISTS idx_se_section ON section_engagements(section_id)`,
  `CREATE TABLE IF NOT EXISTS live_visitors (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    current_path TEXT NOT NULL,
    last_seen INTEGER NOT NULL,
    country TEXT DEFAULT '',
    city TEXT DEFAULT '',
    device TEXT DEFAULT 'Desktop',
    created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_live_last_seen ON live_visitors(last_seen)`,
  `CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
];

/**
 * Ensures all D1 tables and indexes exist.
 * Runs once per isolate automatically.
 */
export async function ensureD1Schema(db: D1Database): Promise<void> {
  if (schemaInitialized) return;
  try {
    const stmts = INIT_SCHEMA_STATEMENTS.map((sql) => db.prepare(sql));
    await db.batch(stmts);
    schemaInitialized = true;
  } catch (err) {
    // If batch fails, try sequentially
    try {
      for (const sql of INIT_SCHEMA_STATEMENTS) {
        await db.prepare(sql).run().catch(() => {});
      }
      schemaInitialized = true;
    } catch (fallbackErr) {
      console.error("[D1 Schema Init Error]:", fallbackErr);
    }
  }
}

/**
 * Type-safe query executor for SELECT statements
 */
export async function executeD1Query<T = unknown>(
  db: D1Database | null | undefined,
  query: string,
  bindings: (string | number | boolean | null)[]
): Promise<{ success: boolean; data: T[]; error?: string }> {
  if (!db) {
    return { success: true, data: [] };
  }

  // Security gate
  if (query.includes("${") || query.includes("'+'") || query.includes("' OR '") || query.includes("--")) {
    console.error("[D1 Security Violation] Unsafe query pattern:", query);
    return { success: false, data: [], error: "Unsafe query pattern rejected." };
  }

  try {
    await ensureD1Schema(db);
    const stmt = db.prepare(query).bind(...bindings);
    const result = await stmt.all<T>();
    return {
      success: result.success,
      data: result.results || [],
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Database execution error";
    console.error("[D1 Database Execution Error]:", errorMessage);
    return {
      success: false,
      data: [],
      error: errorMessage,
    };
  }
}

/**
 * Type-safe executor for INSERT / UPDATE / DELETE statements
 */
export async function executeD1Run(
  db: D1Database | null | undefined,
  query: string,
  bindings: (string | number | boolean | null)[]
): Promise<{ success: boolean; error?: string }> {
  if (!db) {
    return { success: true };
  }

  if (query.includes("${") || query.includes("'+'") || query.includes("' OR '") || query.includes("--")) {
    console.error("[D1 Security Violation] Unsafe query pattern:", query);
    return { success: false, error: "Unsafe query pattern rejected." };
  }

  try {
    await ensureD1Schema(db);
    const stmt = db.prepare(query).bind(...bindings);
    const result = await stmt.run();
    return {
      success: result.success,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Database run error";
    console.error("[D1 Run Error]:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
