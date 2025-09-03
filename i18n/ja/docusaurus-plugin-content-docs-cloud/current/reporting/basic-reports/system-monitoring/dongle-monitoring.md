---
sidebar_position: 2
---

# Dongle Monitoring

Use this report to track hardware dongles used for license enforcement. It shows real-time and historical data on dongle usage, distribution, and device status. You can identify which users and hosts are using dongles, detect restricted or duplicate devices, and monitor compliance across systems.

This report helps you understand user behavior, hardware distribution, and security risks related to dongle-based licensing.

## Visualizations

**Device count by host name**  
This treemap shows how many dongles are connected to each host machine. Use it to track dongle distribution across systems.

**Values displayed:**
- **Host name**
- **Device count**

**Dongle usage time by user name**  
This bar chart displays total dongle usage time by each user. Use it to identify top consumers of dongle-based licenses.

**Values displayed:**
- **User name**
- **Dongle usage time**

**Dongle usage time by manufacturer**  
This bar chart categorizes total dongle usage by device manufacturer. Use it to spot vendor-specific patterns.

**Values displayed:**
- **Manufacturer**
- **Dongle usage time**

**Device count by manufacturer**  
This bar chart shows how many dongles are used from each manufacturer. Use it to manage hardware inventory and vendor relationships.

**Values displayed:**
- **Manufacturer**
- **Device count**

**Dongle usage time by date**  
This bar chart shows daily usage time of dongles over a selected period. Use it to identify peak usage days or trends.

**Values displayed:**
- **Day**
- **Dongle usage time**

**Total number of sessions by device name**  
This donut chart breaks down the number of sessions per dongle device. Use it to monitor device-level activity.

**Values displayed:**
- **Device name**
- **Total number of sessions**

**Additional metrics**
- **Total users**: Number of users who used dongles  
- **Average usage (hours)**: Average dongle usage time per user  
- **Unique device identifier**: Count of unique dongle devices detected  
- **Restricted devices**: Number of dongles flagged as restricted for security monitoring  

## Filters

Use filters to narrow the scope of the report:

- **Device connected date**: Select a date range (January 1, 2020 – December 1, 2024)  
- **Agent status**: Filter by the operational status of the monitoring agent (Online or Offline)  
- **Device status**: Filter devices by status (Active or Restricted)  
- **Host name**: Filter usage by host machine  
- **User name**: Focus on individual users  
- **Manufacturer**: Filter by dongle vendor  
- **Device name**: View sessions and usage for specific dongle hardware  



## User tips

- Use the **Device status** filter to quickly find restricted or inactive dongles.  
- Drill down into **dongle usage by user** to identify heavy users or outliers.  
- Track **usage by date** to identify peak demand times and adjust licensing or hardware policies.  
- Use **device name** and **manufacturer** filters together to spot duplication or unauthorized clones.

## Notes on interpreting dongle data

- **High dongle usage by a single user** could indicate a dependency on specific features or misuse.  
- **Frequent restricted devices** may suggest tampering, outdated hardware, or policy violations.  
- **Duplicate usage patterns** under different usernames might require a license compliance audit.  
- **Low usage but high distribution** could mean underutilized assets—consider reallocation to maximize efficiency.