# Sahyak CRM — Mobile-First Marketing & Telemetry Website

The official universal marketing, documentation, and telemetry platform for **Sahyak CRM** — the mobile-first CRM engineered for high-velocity sales teams, field closers, and multi-industry revenue squads (Real Estate, Financial Advisory, Performance Agencies, B2B SaaS, Healthcare, and Retail).

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js (App Router) with React 19 & TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism design system & typography
- **Motion & Physics**: Framer Motion with custom cubic-bezier linear easing (`[0.16, 1, 0.3, 1]`) and `layoutId` physics
- **Database & Storage**: Cloudflare D1 Serverless SQL Database (`mobile-crm-website`)
- **Telemetry & Charts**: Recharts dynamically code-split with `ssr: false`
- **Security**: Strict Content Security Policy (CSP), HTTP-only signed session tokens, rate limiting, and SQL injection prevention layers

---

## 🗄️ Cloudflare D1 Database Configuration

- **Database Name**: `mobile-crm-website`
- **Database ID**: `29ac8dce-f4f3-4878-aa36-53648608b38c`
- **Binding**: `DB`

### Initialize Schema
To apply the database schema to your remote Cloudflare D1 instance:

```bash
# Execute remote migration on Cloudflare D1
npx wrangler d1 execute mobile-crm-website --remote --file=./schema.sql

# Or execute locally for development
npx wrangler d1 execute mobile-crm-website --local --file=./schema.sql
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Security Architecture

- **Strict HTTP Headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Strict-Transport-Security: max-age=63072000`.
- **Content Security Policy (CSP)**: Strictly limits execution to trusted sources (`self`, Google Fonts, Cloudflare, `https://crm.sahyak.com`).
- **Input Sanitization & Bot Defense**: RFC 5322 regex validation, sliding-window IP rate limiting, honeypot traps, and timing attack mitigation (`crypto.timingSafeEqual`).
- **SQL Injection Prevention**: All queries to Cloudflare D1 enforce parameterized prepared statements (`.bind(...)`).

---

## 📄 License
Proprietary — Sahyak Technologies Pvt. Ltd.
