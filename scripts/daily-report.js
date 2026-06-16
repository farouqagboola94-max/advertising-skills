#!/usr/bin/env node
// Daily finance + marketing health check.
//
// Each fetch* function reads its credentials from environment variables
// (set as GitHub Actions secrets). If the required secret isn't set, the
// function returns null and the report notes that source as "not
// configured" instead of failing the whole run.
//
// Run: node scripts/daily-report.js > report.md

async function fetchBitlySummary() {
  const token = process.env.BITLY_TOKEN;
  const bitlink = process.env.BITLY_LINK; // e.g. "bit.ly/abc123"
  if (!token || !bitlink) return null;

  const res = await fetch(
    `https://api-ssl.bitly.com/v4/bitlinks/${encodeURIComponent(bitlink)}/clicks/summary?unit=day&units=7`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) return { error: `Bitly API error: ${res.status}` };
  const data = await res.json();
  return { totalClicks: data.total_clicks };
}

async function fetchSemrushOverview() {
  const key = process.env.SEMRUSH_API_KEY;
  const domain = process.env.SEMRUSH_DOMAIN;
  if (!key || !domain) return null;

  const res = await fetch(
    `https://api.semrush.com/?type=domain_ranks&key=${key}&domain=${encodeURIComponent(domain)}&database=us&export_columns=Or,Ot,Oc`
  );
  if (!res.ok) return { error: `Semrush API error: ${res.status}` };
  const text = await res.text();
  const [, dataLine] = text.trim().split("\n");
  if (!dataLine) return { error: "Semrush returned no data row" };
  const [organicKeywords, organicTraffic, organicCost] = dataLine.split(";");
  return { organicKeywords, organicTraffic, organicCost };
}

// QuickBooks uses OAuth2 (access token + refresh token + realm/company ID).
// Set up the OAuth flow once, store the resulting tokens as secrets, then
// implement the call here, e.g.:
//   GET https://quickbooks.api.intuit.com/v3/company/{realmId}/reports/ProfitAndLoss
// See: https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account
async function fetchQuickBooksSummary() {
  const accessToken = process.env.QUICKBOOKS_ACCESS_TOKEN;
  if (!accessToken) return null;
  return { error: "QuickBooks fetch not implemented yet — add the report call above." };
}

// Supermetrics requires an API key plus a per-query JSON payload (data
// source, accounts, fields). Use the Supermetrics MCP discovery tools to
// find the right ds_id/fields for your accounts, then hardcode the query
// here. See: https://supermetrics.com/docs/produkt-api-getting-started
async function fetchSupermetricsSummary() {
  const apiKey = process.env.SUPERMETRICS_API_KEY;
  if (!apiKey) return null;
  return { error: "Supermetrics fetch not implemented yet — add the query call above." };
}

function section(title, data, render) {
  if (data === null) {
    return `### ${title}\n\nNot configured — add the required secret(s) to enable this section.\n`;
  }
  if (data.error) {
    return `### ${title}\n\n⚠️ ${data.error}\n`;
  }
  return `### ${title}\n\n${render(data)}\n`;
}

async function main() {
  const [bitly, semrush, quickbooks, supermetrics] = await Promise.all([
    fetchBitlySummary(),
    fetchSemrushOverview(),
    fetchQuickBooksSummary(),
    fetchSupermetricsSummary(),
  ]);

  const date = new Date().toISOString().slice(0, 10);

  const report = `# Daily Business Health Check — ${date}

${section("Finance (QuickBooks)", quickbooks, (d) => JSON.stringify(d))}
${section("Ad Performance (Supermetrics)", supermetrics, (d) => JSON.stringify(d))}
${section("SEO / Organic Traffic (Semrush)", semrush, (d) =>
  `- Organic keywords: ${d.organicKeywords}\n- Organic traffic (est.): ${d.organicTraffic}\n- Organic traffic cost (est.): $${d.organicCost}`
)}
${section("Link Engagement (Bitly)", bitly, (d) => `- Total clicks (last 7 days): ${d.totalClicks}`)}

---
_Generated automatically. See \`scripts/daily-report.js\` to wire up the sections marked "not configured"._
`;

  process.stdout.write(report);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
