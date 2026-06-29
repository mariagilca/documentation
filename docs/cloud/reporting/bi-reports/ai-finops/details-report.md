---
title: Details report
sidebar_position: 4
description: "A day-by-day transaction log of AI usage, one row per user, model, and date."
---

The Details report is the foundational data ledger for the AI FinOps dashboards. It provides a granular, day-by-day log of AI interactions, combining user identity, procurement details such as vendor and license tier, and AI usage in a single exportable view.

## Visualizations

- **Details table:** A flat matrix that lists every daily usage record per user and per model. It lets you track the exact daily token flow, split into input and output, and the resulting cost for any date.

**Values displayed:**

- Date: the day the usage occurred (usage date)
- User: the employee's display name
- Email: the user's contact email
- Vendor: the AI provider or license vendor
- Type of license allocated: the procurement tier assigned to the user (derived from feature name)
- Model family: the overarching model tier, for example Haiku, Opus, or Sonnet
- Model name: the specific model version accessed
- Last active date
- Has usage: Yes or No, indicating whether compute was consumed
- Total input tokens: the sum of prompt tokens used on that date
- Total output tokens: the sum of generated tokens used on that date
- Total token consumption: the combined input and output tokens
- Total cost consumption: the cost incurred for that date's usage
