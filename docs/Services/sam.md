---
sidebar_position: 23
---

# Software Asset Management (SAM)

## Overview

Software Asset Management helps manage software licenses by tracking seller details, purchases, and entitlement records. It captures information such as purchase cost, purchase date, pricing type (**Perpetual**, **Maintenance**, **Subscription-Based**), license validity periods, and maintenance terms. The module integrates with license servers to retrieve license details and workstations for gathering software usage information.

Entitlement records feed into the reporting service, enabling administrators to generate comprehensive reports.

## Overview

**Software Asset Management** helps manage software  licenses by:

- Tracking seller details, purchases, and entitlement records.
- Recording purchase information:
  - Purchase cost and date
  - Pricing type (**Perpetual**, **Maintenance**, **Subscription-Based**)
  - License validity period
  - Maintenance terms
- Integrating with:
  - License servers to retrieve license details
  - Workstations to gather software usage data
The system integrates with license servers and retrieves license details, and gathers software usage data from workstations with the help of special software installed on end user’s workstations and license servers Once you create an entitlement record, the reporting service uses this data to generate reports.




## Prerequisites

- **Reporting Service** must be active.

## Configuration

Activate **Software Asset Manager** from the **Product** service on the Home page.

## Sellers

The **Seller** section lists manually added sellers. Sellers must be created before associating them with procurements.

### Add a new seller

- Select **Add** and enter the seller details.
- **Seller Name** (*required*). All other fields are optional.
- Save your changes.

## Entitlement records

The **Entitlement Records** screen displays procurement entries.

### Add entitlement records

- Select **Add Entitlement Record** to manually create an entry.
- Select **Import Entitlement Record** to bulk-import records.

### Managing entitlement records

When adding or editing an entitlement record, use the following tabs:

#### General tab
- Select the **Seller**.
- Enter the **Software Name** and **Business Owner**.

#### Feature/process mapping tab
- Choose a **License Server** to add licensed features managed by a license server, or select **Process** to add software not managed by a server.

#### Purchase info tab
- Enter license purchase details and associated costs.

