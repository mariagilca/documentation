---
title: Model consumption analysis
sidebar_position: 2
description: "A user-centric breakdown of how each AI model is used, with token volumes and costs."
---

The Model consumption analysis report breaks down how different AI models are used across the organization. It shows each user's model preferences — for example Opus, Sonnet, and Haiku — alongside a detailed ledger of token volumes and costs. Use it to understand model adoption and to audit spend for FinOps.

## Visualizations

- **Token-based model mix by user bar chart:** A horizontal stacked bar chart of the tokens each user consumed, segmented by the models they used. It helps identify power users, their model-tier preferences, and adoption trends.

**Values displayed:**

- Y-axis: user name
- X-axis: tokens consumed (total tokens)
- Color: model name

- **Model consumption details table:** A granular table of user-and-model consumption records, with licensing context, recent activity, the input and output token split, and the resulting cost. Suited to FinOps auditing and data exports.

**Values displayed:**

- Model name
- User
- Email
- Type of license allocated (derived from feature name)
- Last active date
- Has usage (Yes or No, indicating whether compute was consumed)
- Total input tokens
- Total output tokens
- Total token consumption
- Total cost consumption
