---
id: license-usage-report
title: License Usage 
sidebar_position: 1
---

Use the **License Usage** report to monitor how efficiently your software licenses are being used. This report shows the percentage of concurrent license usage over time and helps identify peak usage periods, heavily used features, and underutilized resources.

![License Usage](/img/reporting/license-usage.png)

## What you can do

- Monitor hourly concurrent license usage by feature.
- Identify high-demand time slots and license overuse risks.
- Analyze detailed concurrent usage metrics across days, weeks, or years.
- Drill down to understand feature-, server-, or vendor-specific behavior.

## Visualizations

### Heatmap: hourly concurrent usage by feature

This heatmap shows the percentage of concurrent license usage for a selected feature across different time slots during the day.

**Key elements:**

- **Rows**: Feature names (e.g., Feature ID 10106).
- **Columns**: Time slots from 0 to 23 (hours of the day).
- **Cells**: Percentage of available licenses used concurrently.

**Color coding:**

- **Red**: High usage (75%–100%)
- **Green/Gray**: Low or no usage (0%–25%)

The final column on the right shows the **maximum concurrent usage** percentage for that feature on the selected day.

> Use this heatmap to detect patterns of overuse or underutilization at specific hours.

### Feature-wise concurrent usage (line chart)

Select the **Feature Wise Concurrent Usage** button to view a line chart that displays:

- Maximum concurrent usage per feature.
- Total number of available licenses.

This chart includes drill-down options by:

- Year
- Quarter
- Month
- Day
- Hour

## Filters

You can use the following filters across the heatmap and line chart:

- **Date duration**: Select any date range between July 12, 2015 and July 11, 2025.
- **Feature name**
- **Product name**
- **Version**
- **License type**
- **Server name**
- **Vendor**
- **Additional key**: A custom identifier or metadata field for advanced filtering.

---

## License usage (table)

Use this tabular view to analyze detailed concurrent license usage for a specific feature. This report provides timestamped usage data, helping you understand when and how licenses were used.

### What you can do

- Track exact concurrent license usage per hour.
- Compare minimum, maximum, and average usage.
- View detailed metadata for each license transaction.

### Visualizations

This report includes the following key metrics for each selected time range:

- **Minimum concurrent usage**: Lowest number of users/sessions active at the same time.
- **Maximum concurrent usage**: Peak number of users accessing the license concurrently.
- **Average concurrent usage**: Typical number of users over time, useful for spotting trends.

### Columns displayed

Each row includes:

- **Date and hour**: When the license usage occurred.
- **Vendor and server name**: Source of the license and its managing server.
- **Feature name and product**: Specific software functionality being used.
- **License type**: E.g., floating or node-locked.
- **Version**: Software version in use.
- **Additional key**: Any custom column for filtering or grouping.
- **Total available licenses**: Used to calculate the concurrent usage percentage.

This view helps you assess system load patterns — from the lightest to peak usage — across your entire license inventory.

### Filters

The table view supports the same filters as the heatmap:

- **Date duration**: July 12, 2015 – July 11, 2025
- **Feature name**
- **Product name**
- **Version**
- **License type**
- **Server name**
- **Vendor**
- **Additional key**s