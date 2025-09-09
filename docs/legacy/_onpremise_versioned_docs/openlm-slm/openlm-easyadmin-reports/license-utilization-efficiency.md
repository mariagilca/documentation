---
title: Determining license utilization efficiency
sidebar_position: 4
description: Learn how to use OpenLM’s License Utilization chart to assess license efficiency and make informed purchase or renewal decisions.
---

## Decide whether to purchase subscription licenses or renew license maintenance

The License Utilization chart is a powerful tool for assessing the efficiency of license usage in an organization.  
It is especially useful for customers deciding whether to purchase or renew subscription licenses (e.g., Autodesk subscription licenses) or renew license maintenance.  

## Where is it?

To view the license utilization of a specific feature or group of features:

1. Open **EasyAdmin User Interface → Start → Management → License Utilization**.  
2. Fill in the filter data (e.g., feature name, server name).  
3. Select the date range. Longer date ranges provide better statistical data.  
4. Choose whether to include weekends and off-hours data.  
5. Click **Apply**.  

## Available data

The report provides:

- **Aggregated usage presentation**: A clear license utilization cut-off indicator.  
- **Quality of Service (QoS)**: A license efficiency indicator.  
- **Detection of abnormal usage patterns**: Identify where licenses may have gone.  

---

## Presentation option 1: Show aggregated

If the **Show aggregated** box is checked, the chart displays the aggregated percentage of usage.  
Each point `(x,y)` answers:  
*What percentage of usage time (y) did at least a given number of licenses (x) have concurrent use?*

Example with 4 licenses:

- At least 0 licenses were in use 100% of the time.  
- At least 1 license was in use 8.73% of the time.  
- At least 2 licenses were in use 2.7% of the time.  
- At least 3 licenses were in use 0.01% of the time.  

![Aggregated usage](img/aggregated-usage.png)  
**Figure 1**: Aggregated usage  

This view filters out temporary peaks and shows the number of licenses needed to support activity.

---

## Presentation option 2: No aggregation

If the **Show aggregated** box is **not** checked, the chart shows a histogram of license usage.  
Each point `(x,y)` answers:  
*What percentage of usage time (y) did exactly a given number of licenses (x) have concurrent use?*

Example:

- Exactly 0 licenses were in use 91.27% of the time.  
- Exactly 1 license was in use 6.03% of the time.  
- Exactly 2 licenses were in use 2.69% of the time.  
- Exactly 3 licenses were in use 0.01% of the time.  

Note: This produces a non-monotonic function (e.g., the value for 3 licenses may be higher than for 2).  

![Non-aggregated usage](img/non-aggregated-usage.png)  
**Figure 2**: Non-aggregated usage  

---

## Extracting license efficiency information

### Aggregated usage presentation: clear cut-off

The aggregated presentation is a decreasing function showing the required number of licenses.  
For example, in **Figure 1**, no more than 3 licenses were ever used at the same time in the past 365 days.  

### Quality of Service (QoS): license efficiency indicator

The **QoS** parameter is the percentage of required license availability defined by the license administrator.  

Example (Figure 1):  

To support 95% of license requests, the organization only needs 2 licenses.  
If 4 licenses were purchased, then 2 licenses are redundant.  

:::tip
Use QoS to make informed decisions about subscription renewals, new purchases, or maintenance renewals.  
:::

### Detection of abnormal usage patterns

By comparing aggregated and non-aggregated charts (Figures 1 and 2), you may notice **blips** in utilization.  
These can indicate abnormal usage patterns, such as:

- Long-forgotten active sessions.  
- Borrowed (offline) licenses.  
