---
title: User consumption analysis
sidebar_position: 3
description: "A user-centric view of AI adoption, daily spend, and peak usage bursts."
---

The User consumption analysis report gives a granular, user-centric view of AI interactions. It highlights daily adoption trends, total token footprints, and intensive usage bursts. Use it to identify power users, track daily spend, and validate whether a user needs a premium license based on actual demand.

## Visualizations

- **Total tokens by user tree map:** A proportional area chart that sizes each user by their total token consumption, giving an immediate hierarchy of the heaviest users.

**Values displayed:**

- Grouping: user name
- Size: total tokens consumed (sum of total tokens)
- Color: record count

- **Daily tokens and cost combo chart:** A dual-axis time series that overlays daily token volume with daily cost, so you can track day-over-day trends and spot spikes.

**Values displayed:**

- X-axis: date (day)
- Bars (left Y-axis): total tokens consumed (sum of total tokens)
- Line (right Y-axis): total cost consumption (sum of raw cost)

- **Peak 5-hour tokens by user bar chart:** The maximum token consumption in a rolling 5-hour window for each user. This helps you decide whether a user needs a high-tier license or whether their usage is spread out enough for a standard tier.

**Values displayed:**

- Y-axis: user name
- X-axis: peak 5-hour tokens (maximum of peak 5-hour tokens)

- **User consumption details table:** A tabular ledger of user-level metrics, active dates, the token split, and associated costs.

**Values displayed:**

- User name
- Email
- Type of license allocated (derived from feature name)
- Model name
- Last active date
- Has usage (Yes or No)
- Total input tokens
- Total output tokens
- Total token consumption
- Total cost consumption
