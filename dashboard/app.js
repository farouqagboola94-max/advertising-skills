function renderCard({ label, value, deltaPct }) {
  const dir = deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "";
  const arrow = deltaPct > 0 ? "▲" : deltaPct < 0 ? "▼" : "—";
  return `
    <div class="card">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
      <div class="delta ${dir}">${arrow} ${Math.abs(deltaPct)}%</div>
    </div>`;
}

async function renderFinance() {
  const data = await fetchFinanceSummary();
  document.getElementById("finance-period").textContent = `(${data.period})`;
  document.getElementById("finance-cards").innerHTML =
    renderCard(data.revenue) + renderCard(data.expenses) + renderCard(data.margin) + renderCard(data.cash);
  document.getElementById("finance-callout").textContent = data.callout;
}

async function renderMarketing() {
  const data = await fetchMarketingSummary();
  document.getElementById("marketing-period").textContent = `(${data.period})`;
  document.getElementById("marketing-cards").innerHTML =
    renderCard(data.spend) + renderCard(data.roas) + renderCard(data.conversions) + renderCard(data.traffic);
  document.getElementById("marketing-callout").textContent = data.callout;
}

async function renderRisks() {
  const risks = await fetchRisks();
  document.getElementById("risks-list").innerHTML = risks.map((r) => `<li>${r}</li>`).join("");
}

renderFinance();
renderMarketing();
renderRisks();
