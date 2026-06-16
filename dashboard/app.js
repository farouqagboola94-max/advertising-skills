function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function renderCard(label, value, deltaPct) {
  const dir = deltaPct > 0 ? "up" : deltaPct < 0 ? "down" : "";
  const arrow = deltaPct > 0 ? "▲" : deltaPct < 0 ? "▼" : "—";
  return `
    <div class="card">
      <div class="label">${label}</div>
      <div class="value">${value}</div>
      <div class="delta ${dir}">${arrow} ${Math.abs(deltaPct)}%</div>
    </div>`;
}

function renderLineChart(canvasId, labels, values, color) {
  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels,
      datasets: [{ data: values, borderColor: color, backgroundColor: color + "33", fill: true, tension: 0.3 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#9aa1ad" } },
        y: { grid: { color: "#2a2e38" }, ticks: { color: "#9aa1ad" } },
      },
    },
  });
}

async function renderFinance() {
  const data = await fetchFinanceSummary();
  document.getElementById("finance-cards").innerHTML =
    renderCard("Revenue (" + data.period + ")", formatCurrency(data.revenue.value), data.revenue.deltaPct) +
    renderCard("Expenses", formatCurrency(data.expenses.value), data.expenses.deltaPct) +
    renderCard("Net Margin", data.netMargin.value + "%", data.netMargin.deltaPct) +
    renderCard("Cash Position", formatCurrency(data.cash.value), data.cash.deltaPct);

  renderLineChart("revenue-chart", data.revenueTrend.labels, data.revenueTrend.values, "#5b8cff");

  const tbody = document.querySelector("#ar-table tbody");
  tbody.innerHTML = data.overdueReceivables
    .map(
      (row) =>
        `<tr><td>${row.customer}</td><td>${formatCurrency(row.amount)}</td><td>${row.daysOverdue}</td></tr>`
    )
    .join("");
}

async function renderMarketing() {
  const data = await fetchMarketingSummary();
  document.getElementById("marketing-cards").innerHTML =
    renderCard("Spend (" + data.period + ")", formatCurrency(data.spend.value), data.spend.deltaPct) +
    renderCard("ROAS", data.roas.value + "x", data.roas.deltaPct) +
    renderCard("Conversions", data.conversions.value, data.conversions.deltaPct) +
    renderCard("Organic Traffic", data.organicTraffic.value + "%", data.organicTraffic.deltaPct);

  renderLineChart("roas-chart", data.roasTrend.labels, data.roasTrend.values, "#3ddc97");

  const tbody = document.querySelector("#campaign-table tbody");
  tbody.innerHTML = data.campaigns
    .map(
      (row) =>
        `<tr><td>${row.name}</td><td>${formatCurrency(row.spend)}</td><td>${row.roas}x</td><td><span class="status-pill status-${row.status}">${row.status}</span></td></tr>`
    )
    .join("");
}

async function renderRisks() {
  const risks = await fetchRisks();
  document.getElementById("risks-list").innerHTML = risks.map((r) => `<li>${r}</li>`).join("");
}

renderFinance();
renderMarketing();
renderRisks();
