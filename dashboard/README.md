# Business Health Dashboard

One page, two sections: Finance and Marketing. Each shows four key numbers
plus a one-line callout on what matters most right now. A "What needs
attention" list sits at the bottom with the top risks across both.

Currently runs on **mock data** (see `data.js`) so it can be deployed and
viewed immediately.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```
npx serve dashboard
```

## Deploy

Static site, no build step — drag the `dashboard/` folder into Netlify, or
run `vercel deploy` from inside it.

## Make it live

Replace the three functions in `data.js` with real calls to your data
sources, keeping the same return shape:

- `fetchFinanceSummary()` — pull from QuickBooks (P&L, cash flow, AR aging)
- `fetchMarketingSummary()` — pull from Supermetrics (spend/ROAS) and Semrush (organic traffic)
- `fetchRisks()` — derive from the same data, or generate via the
  `finance-marketing-monitoring-orchestrator` skill in this repo

Since these APIs require secret credentials, route the calls through a
small backend/serverless function rather than calling them directly from
the browser, so keys aren't exposed client-side.
