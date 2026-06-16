# Finance & Marketing Dashboard

A static dashboard showing finance and marketing health in one view: revenue,
margin, cash, overdue receivables, ad spend, ROAS, and campaign-level risk.

Currently runs on **mock data** (see `data.js`) so it can be deployed and
viewed immediately.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```
npx serve dashboard
```

## Deploy

This is a static site (no build step) — drag the `dashboard/` folder into
Netlify, or run `vercel deploy` from inside it.

## Make it live

Replace the three functions in `data.js` with real calls to your data
sources, keeping the same return shape:

- `fetchFinanceSummary()` — pull from QuickBooks (P&L, cash flow, AR aging)
- `fetchMarketingSummary()` — pull from Supermetrics (spend/ROAS) and Semrush (organic traffic)
- `fetchRisks()` — derive from the same data, or generate via the
  `finance-marketing-monitoring-orchestrator` skill in the
  `advertising-skills` repo

Since these APIs require secret credentials, the calls should go through a
small backend/serverless function (not directly from the browser) so keys
aren't exposed client-side.
