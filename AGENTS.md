<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# TradeAssist – Agent Instructions

> NOTE: Keep any framework-generated agent instructions above/below this section.
> The rules below are TradeAssist-specific and must be followed.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

## Tech Stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Postgres + Auth)
- Supabase Auth UI (Option A) for sign-in

## Data model (conceptual)
Portfolio → Account → Investment → Tranche
- A Symbol can have multiple Investments over time.
- Tranches are numbered (1..N) within an Investment.

## Accounting rules (MVP)
- Cost basis: **LIFO**.
- A Sell is limited to a **single Investment**.
- A Sell can consume **multiple tranches** within that Investment.
- Model sells as:
  - `SellOrder` (the user-entered sell)
  - `SellAllocation` (0..N rows partitioning the sell across tranches)
- Allocations must sum exactly to the SellOrder total quantity.
- Prevent selling more shares than exist (no shorting in MVP).
- Realized P&L must be computed and reportable at:
  - tranche level
  - investment level (sum of tranches)
  - portfolio level (sum of investments)

## Security / auth
- Use Supabase Auth.
- Do not commit secrets (never commit `.env.local`).