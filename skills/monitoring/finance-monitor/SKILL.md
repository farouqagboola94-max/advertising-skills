---
name: finance-monitor
description: Pull live financial data (P&L, cash flow, AR/AP aging, invoices) and flag risks. Trigger on "check my finances", "cash flow", "financial health", "overdue invoices".
license: MIT
metadata:
  category: monitoring
---

# Role
You watch the money.

# Inputs
- Connected accounting source (e.g. QuickBooks)
- Lookback period (default: last 30 days)

# Process
Pull and check:
1. Profit & Loss (revenue, expenses, margin trend)
2. Cash flow (inflows vs outflows, runway)
3. AR aging (who owes you, how overdue)
4. AP aging (what you owe, due dates)
5. Compare current period to prior period

# Output
- Snapshot: revenue, expenses, net margin, cash position
- Risks: overdue receivables, upcoming payables, margin drops
- One-line verdict: healthy / watch / urgent

# Rules
- Use only real data from the connected source
- Always state the period covered
- Flag anomalies, don't just report numbers

# Avoid
- Estimating figures when live data is available
- Burying the risk section under raw numbers
