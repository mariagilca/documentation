---
sidebar_position: 7
---

# Compliance

## Overview

You can use the **Compliance** service to monitor license usage compliance based on geographical rules. You can define license usage policies tied to specific countries or regions. The service reports any non compliant usage based on the user's geographical location.

## Prerequisites

- Activate **Compliance** in the products UI.
- To view compliance reports, ensure that the license manager for which you're creating rules sends data to OpenLM via:
  - **Broker** (for licenses)
  - **Workstation Agent** (for tracking compliance of processes, executables, or web services)

## Settings

In the **Settings** panel, you can integrate your OpenLM license inventory with Compliance Service. 

- When integration is **on**, you can select features directly from your license inventory.
- When integration is **off**, you must manually enter licensing details for each feature.

> **Important:** Activate inventory integration to prevent mismatches between Compliance Service and your license inventory.

## Compliance rules

Use the **Compliance Rules** panel to manage your compliance rules:

- **Add Rule**: Create a new compliance rule.
- **Delete**: Remove existing compliance rules.
- **Import Rules**: Import previously exported compliance rules.

### Add a new rule

To add a new compliance rule:

1. Select **Add Rule** in the **Compliance Rules** panel.
2. In the **General** panel, define these parameters:
   - **Entity Type**: Select **User** or **Machine** to build reports based on user or host machine location.
   - **Rule Type**: Select **Country**, **Region**, or **Global**:
     - **Global**: The system considers all users or machines compliant at all times.
     - **Country/Region**: Specify a country or region in **Rule Value**.
   - **Start Date/Time** and **End Date/Time**: Set the period when this rule is valid.
3. Select the **Feature parameters**:
   - If you activate integration, select the applicable feature from the inventory. Use the filter option to refine your search.
   - You can select only 1 feature per rule. Create separate rules for multiple features.
4. If you deactivate inventory integration, manually enter the required feature parameters.
   - Validate these parameters by selecting **Check feature in OpenLM license inventory**.
   - If parameters match, you receive a confirmation message.
   - If there's a mismatch, you receive an error message. Review and correct the parameters accordingly.

For compliance data reports, refer to the **Compliance Report** in the Reporting section.

