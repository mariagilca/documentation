---
id: multi-license-consumption
title: Multi-license consumption
sidebar_position: 9
description: "This report identifies redundant software usage by flagging instances where a single user is simultaneously holding more than one unique license key for the…"
---
This report identifies redundant software usage by flagging instances where a single user is simultaneously holding more than one unique license key for the exact same feature and product combination. The system identifies active sessions with no end time and retains only the most recent unique record per user, feature, product, and license ID to prevent double-counting. It then flags any user simultaneously holding multiple unique license keys for the exact same combination of feature, product, vendor, version, and additional key.

![Multi-License Consumption](/img/reporting/multi-license-consumption.png)
*Multi-License Consumption*

Detailed dashboard visualizing redundant active sessions where a single user consumes multiple unique license keys for the same feature and product.

## KPIs

- **Distinct Servers:** The total number of unique license servers currently involved in redundant license transactions.
- **Distinct Licenses:** The total count of unique license IDs (keys) that are currently flagged as part of a multi-license consumption event.
- **Distinct Users:** Total number of unique individuals currently identified as holding multiple concurrent licenses for the same feature.
- **Distinct Features:** The number of unique software features or modules currently subject to redundant consumption.

## Visualizations

- **Multi-License Consumption Table:** A detailed log that captures the full context for flagged redundant sessions.

- **Users by License Count (Bar Chart):** Displays users holding the highest number of concurrent licenses for the same feature.

- **License Count by Feature (Bar Chart):** Illustrates which specific features are most frequently subject to multi-license consumption.

**Values displayed:**

- **Username:** The user holding or consuming the license.
- **Feature Name:** The specific software feature being used.
- **Product Name:** The software product associated with the license.
- **Server Name:** The license server managing and distributing the licenses.
- **Vendor:** The software provider associated with the license.
- **License Type:** The category of license assigned (for example, floating or node-locked).
- **Licenses:** The total number of licenses allocated or available.
- **Project Name:** The project under which the license is being used.
- **Version:** The version of the software being accessed.
- **Active Session Duration:** The current duration of the active session.
- **Start Date:** The timestamp when the session began.
- **End Date:** The timestamp when the session ended or is expected to end.

- **Filters:**

- **Date Duration:** Users can select a time range to analyze license usage (for example, last 14 years or custom range).
- **Server Name:** Users can select any server name from this filter.
- **Vendor:** Users can select any vendor from this filter.
- **Feature Name:** Users can select any feature name from this filter.
- **Product Name:** Users can select any product name from this filter.
- **License Type:** Users can select any license type from this filter.
- **Version:** Users can select any version from this filter.
- **Username:** Users can select any username from this filter.
