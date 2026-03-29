# TradeAssist

TradeAssist is a personal portfolio and investment-trade tracking app focused on:
- **Investments** (separate “campaigns” per symbol over time)
- **Tranches** (numbered adds within an investment)
- **LIFO cost basis**
- **Sell Orders** that can be allocated across multiple tranches (within a single investment)
- Realized/unrealized P&L rollups (tranche → investment → portfolio)

## Key Concepts

### Investment
An Investment represents one instance/campaign of trading a symbol in an account. If you trade in/out of the same symbol multiple times over months, those can be separate Investments.

### Tranche
A Tranche is a numbered sub-position within an Investment (1..N). Tranches can be created as needed.

### Sell Orders and Allocations
A sell is recorded as a `SellOrder` and partitioned into one or more `SellAllocations` across tranches.
- A SellOrder is limited to a **single Investment**
- A SellOrder may consume **multiple tranches** within that Investment
- Allocation quantities must sum to the SellOrder total quantity

### Cost Basis
Default cost basis method is **LIFO**. Matching occurs within the tranche(s) referenced by allocations.

## Tech Stack
- Next.js (App Router) + TypeScript + Tailwind
- Supabase (Postgres + Auth UI)
- Deployment: Vercel (planned)

## Getting Started (Codespaces / Local)

### 1) Install
```bash
npm install
```

### 2) Configure environment variables
Create `.env.local` in the repo root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Do not commit `.env.local`.

### 3) Run the dev server
```bash
npm run dev
```

Open `http://localhost:3000` (Codespaces will forward the port).

## Deploy (Vercel)
This app is intended to be deployed on Vercel and connected to Supabase.
Vercel environment variables should include the same values as `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Notes
This project was bootstrapped with `create-next-app`.