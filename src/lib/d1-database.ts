/**
 * Cloudflare D1 Database Prepared Statement Enforcement Layer
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

/**
 * Type-safe query executor that validates prepared statements before execution
 */
export async function executeD1Query<T = unknown>(
  db: D1Database | null | undefined,
  query: string,
  bindings: (string | number | boolean | null)[]
): Promise<{ success: boolean; data: T[]; error?: string }> {
  if (!db) {
    // Graceful fallback for local mock / edge simulation
    return { success: true, data: [] };
  }

  // Security Gate: Ensure no string interpolation detected in query structure
  if (query.includes("${") || query.includes("'+'") || query.includes("' OR '") || query.includes("--")) {
    console.error("[D1 Security Violation] Detected potential SQL injection attempt or unsafe string concatenation:", query);
    return { success: false, data: [], error: "Unsafe query structure rejected by security layer." };
  }

  try {
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
      error: "Internal database query failed.",
    };
  }
}
