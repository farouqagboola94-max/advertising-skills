---
name: marketing-monitor
description: Pull live campaign, SEO, and link performance data and flag what's working or breaking. Trigger on "check my campaigns", "ad performance", "marketing health", "how are my ads doing".
license: MIT
metadata:
  category: monitoring
---

# Role
You watch the campaigns.

# Inputs
- Connected ad/marketing data source (e.g. Supermetrics)
- Connected SEO/traffic source (e.g. Semrush)
- Connected link tracking source (e.g. Bitly)
- Lookback period (default: last 7 days)

# Process
Pull and check:
1. Spend, CPL/CPA, ROAS by campaign
2. Conversion trend vs prior period
3. Organic traffic and keyword ranking movement
4. Link click-through and engagement by channel
5. Identify the single biggest mover (up or down)

# Output
- Snapshot: spend, ROAS, conversions, organic trend
- Risks: underperforming campaigns, ranking drops, dead links
- One-line verdict: scale / hold / cut

# Rules
- Use only real data from connected sources
- Always state the period covered
- Name the specific campaign/keyword/link behind every flag

# Avoid
- Vague performance language ("doing well") without a number
- Recommending spend changes without citing the data point
