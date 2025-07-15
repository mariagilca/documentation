---
id: denials-report-integrated
title: Denials report (integrated)
sidebar_position: 2
---

Use the **Integrated denials report** to analyze license denial events in conjunction with usage and configuration data. This enhanced report supports detailed root cause analysis and helps uncover capacity issues, misconfigurations, or user-level access problems.

## What you can do

- Identify where and why license denials occur.
- Correlate denial events with specific users, features, servers, and vendors.
- Drill into denial trends at multiple time resolutions.

## Visualizations

Each chart includes drill-down capabilities by **year**, **quarter**, **month**, **day**, and **hour**.

### Denials by server name

- **X-axis**: Server name  
- **Y-axis**: Distinct denial count  
- Highlights where license denials are occurring across license servers.

### Denials by error message

- **X-axis**: Error message  
- **Y-axis**: Distinct denial count  
- Categorizes license denial types based on the returned error message.

### Denials by feature name

- **X-axis**: Feature name  
- **Y-axis**: Distinct denial count  
- Shows how frequently license denials occur for specific features.

### Denials by vendor

- **X-axis**: Vendor name  
- **Y-axis**: Distinct denial count  
- Tracks license access failures by software vendor.

### Denials by group

- **X-axis**: Group name  
- **Y-axis**: Distinct denial count  
- Provides visibility into denials grouped by team, department, or business unit.

### Denials by workstation

- **X-axis**: Workstation  
- **Y-axis**: Distinct denial count  
- Identifies machines where users are most frequently denied access to licenses.

> These charts help detect peak demand areas, configuration gaps, and under-licensed environments.

### Filters

You can refine this report using the following filters:

- **Date duration**: January 1, 2015 – December 31, 2030
- **Feature name**
- **License type**
- **Error message**
- **User name**
- **Server name**
- **Vendor**
- **Version**
- **Workstation**
- **Denial category**
- **Denial status**
- **Group name**
- **Additional key**



## Denials Details Table

Use the **Denials Details Table** for a granular, drill-through view of license denial events. This report is accessible from both the **Denials Report** and the **Integrated Denials Report**.

### What you can do

- Investigate individual denial incidents in detail.
- Understand error codes and timestamps.
- Identify recurring issues and affected users or departments.

### Visualizations

This table includes detailed records of denial events with the following fields:

### Values displayed

- **Username**
- **User group**
- **First name**
- **Last name**
- **Workstation**
- **Denial time**
- **Server**
- **Port**
- **Host name**
- **Feature**
- **Version**
- **License type**
- **Additional key**
- **Number of licenses**
- **Major error code**
- **Minor error code**
- **Error message**

These fields help correlate usage attempts with system or licensing issues, enabling better auditing and license planning.

### Filters

Apply the same set of filters used in the integrated report:

- **Date duration**: January 1, 2015 – December 31, 2030
- **Feature name**
- **License type**
- **Error message**
- **User name**
- **Server name**
- **Vendor**
- **Version**
- **Workstation**
- **Denial category**
- **Denial status**
- **Group name**
- **Additional key**