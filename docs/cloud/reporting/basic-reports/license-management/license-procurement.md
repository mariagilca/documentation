---
id: license-procurement
title: License procurement
sidebar_position: 4
---

Use the **License procurement** report to view information about all procured licenses. This report helps track entitlements, monitor license inventory, and maintain procurement compliance.

![License Procurement](/img/reporting/license-procurement.png)

## What you can do

- Review license quantities and procurement status.
- Identify licenses approaching expiration.
- Track historical and upcoming purchase details.

## Visualization

### License procurement table

This table displays detailed data about acquired licenses. It includes license metadata, lifecycle dates, counts, and status indicators to help you manage license compliance and renewal cycles.

**Columns displayed:**

- **Server**: The license server name.
- **Vendor**: The vendor that issued the license.
- **Feature name**: The licensed feature or capability.
- **Product name**: The associated software product.
- **Additional key**: Any additional metadata for classification.
- **Issued date**: When the license was originally issued.
- **Start date**: When the license became active.
- **Expiration date**: When the license is set to expire.
- **Expired**: Indicates whether the license is currently expired.
- **Quantity**: Number of licenses procured.
- **Version**: Version of the licensed feature.
- **License type**: Type of license (e.g., floating, node-locked).

### Expiration logic

The expiration status is calculated using the following rules:

```text
If Expiration date is blank or after December 31, 2030 → Permanent  
If Expiration date is in the future and on or before December 31, 2030 → Not expired  
If Expiration date is before today → Expired  