// Data layer for the Finance & Marketing Monitor dashboard.
//
// Everything here is mock data. To make the dashboard live, replace each
// fetch* function below with a real call to your backend/API proxy for
// QuickBooks, Supermetrics, Semrush, and Bitly. Keep the same return shape
// so app.js doesn't need to change.

async function fetchFinanceSummary() {
  return {
    period: "Last 30 days",
    revenue: { value: 48200, deltaPct: 6 },
    expenses: { value: 31900, deltaPct: 2 },
    netMargin: { value: 34, deltaPct: 0 },
    cash: { value: 22400, deltaPct: -3 },
    revenueTrend: {
      labels: ["W1", "W2", "W3", "W4"],
      values: [10800, 11500, 12200, 13700],
    },
    overdueReceivables: [
      { customer: "Acme Retail", amount: 3200, daysOverdue: 45 },
      { customer: "Brightline Co", amount: 1800, daysOverdue: 12 },
      { customer: "Verve Studio", amount: 1100, daysOverdue: 5 },
    ],
  };
}

async function fetchMarketingSummary() {
  return {
    period: "Last 7 days",
    spend: { value: 4300, deltaPct: 12 },
    roas: { value: 2.8, deltaPct: -18 },
    conversions: { value: 96, deltaPct: -4 },
    organicTraffic: { value: 3, deltaPct: 3 },
    roasTrend: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [3.4, 3.2, 3.0, 2.9, 2.7, 2.8, 2.8],
    },
    campaigns: [
      { name: "retarget-warm-list", spend: 900, roas: 5.1, status: "scale" },
      { name: "lookalike-1pct", spend: 1400, roas: 2.6, status: "hold" },
      { name: "cold-prospecting-v2", spend: 2000, roas: 1.1, status: "cut" },
    ],
  };
}

async function fetchRisks() {
  return [
    "\"cold-prospecting-v2\" campaign burning spend at 1.1x ROAS — pause or rework creative",
    "$6,100 AR overdue, one invoice 45+ days — follow up before chasing new spend",
    "Cash position down 3% while spend is up 12% — watch runway if the trend continues",
  ];
}
