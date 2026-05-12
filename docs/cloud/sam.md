---
title: "Software Asset Management (SAM)"
sidebar_position: 13
description: "Use Software Asset Management to centralize software license management — track inventory, monitor usage, optimize allocations, and stay compliant."
---

## Overview

Software Asset Management helps manage software licenses by:

- Tracking seller details, purchases, and entitlement records
- Recording purchase information:
  - Purchase cost and date
  - Pricing type (**Perpetual**, **Maintenance**, **Subscription-Based**)
  - License validity period
  - Maintenance terms
- Integrating with:
  - License servers to retrieve license details
  - Workstations to gather software usage data

Once you create an entitlement record, Reporting service uses this data to generate reports.




## Prerequisites

- **Reporting Service** must be active.

## Configuration

Activate **Software Asset Manager** from **Product** service on Home page.

## Sellers

**Seller** section lists manually added sellers. Create sellers before you associate them with procurements.

### Add a new seller

- Select **Add** and enter seller details.
- **Seller Name** (*required*). All other fields are optional.
- Save your changes.

## Entitlement records

**Entitlement Records** screen displays procurement entries.

### Add entitlement records

- Select **Add Entitlement Record** to manually create an entry.
- Select **Import Entitlement Record** to bulk-import records.

### Managing entitlement records

When adding or editing an entitlement record, use the following tabs:

### General tab

Configure the basic entitlement details:

- Select **Seller**.
- Enter **Software Name** and **Business Owner**.

### Feature/process mapping tab

Map the entitlement to monitored software:

- Select **License Server** to add licensed features managed by a license server, or select **Process** to add software not managed by a server.

### Purchase info tab

Record the financial information for the entitlement:

- Enter license purchase details and associated costs.
