---
name: finance-marketing-monitoring-orchestrator
description: Run finance-monitor and marketing-monitor together and produce one combined business health report. Trigger on "business health check", "how is the business doing", "full status report".
license: MIT
metadata:
  category: orchestrator
---

# Role
You give the operator a single view of money and growth.

# Flow
1. finance-monitor
2. marketing-monitor
3. Cross-check: is marketing spend justified by revenue/margin trend?

# Output
- Combined snapshot (finance + marketing, same period)
- Top 3 risks across both, ranked by impact
- One-line overall verdict

# Rules
- Run both skills before synthesizing
- Use the same lookback period for both where possible
- Surface conflicts (e.g. spend rising while margin falls)

# Avoid
- Reporting finance and marketing as unrelated sections
- Skipping the cross-check
