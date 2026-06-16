// Data layer for the Business Health dashboard.
//
// Everything here is mock data. To make the dashboard live, replace the
// three functions below with real calls to your backend/API proxy for
// QuickBooks (finance) and Supermetrics/Semrush (marketing). Keep the same
// return shape so app.js doesn't need to change.

async function fetchFinanceSummary() {
  return {
    period: "last 30 days",
    revenue: { label: "Revenue", value: "$48,200", deltaPct: 6 },
    expenses: { label: "Expenses", value: "$31,900", deltaPct: 2 },
    margin: { label: "Net Margin", value: "34%", deltaPct: 0 },
    cash: { label: "Cash", value: "$22,400", deltaPct: -3 },
    callout: "Biggest concern: $3,200 overdue from Acme Retail, 45 days past due.",
  };
}

async function fetchMarketingSummary() {
  return {
    period: "last 7 days",
    spend: { label: "Spend", value: "$4,300", deltaPct: 12 },
    roas: { label: "ROAS", value: "2.8x", deltaPct: -18 },
    conversions: { label: "Conversions", value: "96", deltaPct: -4 },
    traffic: { label: "Organic Traffic", value: "+3%", deltaPct: 3 },
    callout: "Best: retarget-warm-list (5.1x ROAS) — Worst: cold-prospecting-v2 (1.1x ROAS, recommend cutting).",
  };
}

async function fetchRisks() {
  return [
    "\"cold-prospecting-v2\" campaign is spending at 1.1x ROAS — pause or rework the creative.",
    "$6,100 in overdue invoices, one 45+ days — follow up before increasing ad spend.",
    "Cash is down 3% while ad spend is up 12% — watch this if the trend continues.",
  ];
}
