---
id: shadow-denials
title: Shadow denials
sidebar_position: 1
---

The Shadow License Capping Report provides a detailed view of all license capping events where application usage was restricted based on defined shadow license policies. It tracks each instance of capping with user, system, and application-level details, enabling accurate monitoring and validation of license enforcement behavior. It captures, analyzes, and visualizes shadow license capping events to ensure transparency, compliance, and optimized license utilization.

![Shadow Denials](/img/reporting/shadow-denials.png)
*Shadow License Capping Overview Dashboard: Displays key KPIs including total capping events, successful sessions, and denial rate, along with top impacted vendors and applications, capping distribution by consumption policy type, and user-wise capping events.*

![Shadow Denials Analysis](/img/reporting/shadow-denials-analysis.png)
*Shadow License Capping Analysis and Detailed Event Table: Shows time-based trends of capping events, denial rate per user, workstation-wise capping distribution, and a detailed table capturing event-level data such as user, workstation, application, vendor, policy type, and denial status.*

## KPIs

- **Total Capping Events:** Total number of shadow denial events recorded.
- **Total Successful Sessions:** Total number of sessions that were not denied.
- **Denial Rate (%):** Calculated as (Capping Events / Total Checkout Attempts) x 100, where Total Checkout Attempts = Successful Sessions + Denials.

## Visualizations

- **Top Impact Analysis:** Displays the top impacted vendors and applications based on the number of capping events. This helps identify which software or providers are most affected by license restrictions and may require optimization or policy adjustments.

- **Capping Distribution Charts:** Visualizes how capping events are distributed across different consumption policy types (such as Process, Workstation, and User at Workstation). This helps identify where enforcement is most frequently applied.

- **Time-Series Analysis:** Shows the trend of capping events over time, allowing users to detect spikes, recurring patterns, or anomalies in license enforcement behavior across selected periods.

- **Denial Rate per User Chart:** Represents the percentage of denied sessions for each user, helping identify users who are most impacted by license capping. This is useful for troubleshooting access issues and improving user experience.

- **User & Workstation Charts:** Provide a comparative view of capping events across users and workstations. These charts help pinpoint specific users or machines that frequently encounter license restrictions.

- **Detailed Capping Table:** Displays granular, event-level data including user, workstation, application, vendor, policy type, and denial status. This table supports deep analysis, auditing, and validation of individual capping events.

**Values displayed:**

- **Username:** The user account for which the license capping was enforced.
- **Workstation:** The machine or host from which the application was accessed.
- **IP Address:** The IP address of the workstation at the time of the capping event.
- **Capping Timestamp:** The exact date and time when the capping action occurred.
- **Application Name:** The application that triggered the capping event.
- **Vendor Name:** The software vendor associated with the application.
- **Tracking Type:** The method used to detect usage (Process, File, or Directory).
- **Consumption Policy Type:** The level at which the cap was applied (Process, Workstation, or User at Workstation).
- **Shadow License Policy:** The policy or rule responsible for enforcing the cap.
- **Denial Status:** Indicates whether the session was denied due to capping.
- **Limit:** The configured threshold for license usage under the applied policy.

- **Filters:**

- **Date:** Users can select a specific time range to analyze capping events.
- **User:** Users can select specific users to track individual capping behavior.
- **Workstation:** Users can select any workstation from this filter.
- **Application Name:** Users can select any application name from this filter.
- **Vendor:** Users can select any vendor from this filter.
- **Tracking Type:** Users can filter by usage detection method (Process, File, Directory).
- **Consumption Policy Type:** Users can filter by how the capping policy is applied.
- **Denial Status:** Users can filter to view true and false denials.
