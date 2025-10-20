---
id: license-procurement
title: License Procurement
sidebar_position: 4
---

Definition: A dataset containing information on all procured licenses, including vendor, quantity, purchase date, and expiration details.

![License Procurement](/img/reporting/license-procurement.png)

This table presents key information related to license procurement

## Visualizations

- **License Procurement Details Table:** This page presents a structured table containing comprehensive License Procurement Details. It captures key information related to the acquisition and status of software licenses across the organization. The table includes data such as license servers and vendors, detailed feature and product names, associated license keys, and critical lifecycle dates-such as the license issue date, activation (start) date, and expiration date. Additionally, it provides visibility into the total number of licenses issued (quantities), their respective versions, and license types. The inclusion of expiration indicators helps track which licenses are active or expired, supporting improved compliance and renewal planning.

**Values displayed:**

- Server Name
- Vendor
- Feature Name
- Product Name
- Additional Key
- Issued Date
- Start Date
- **Expired Status:** Treat blank expiry dates or dates after December 31, 2030 as Permanent. Treat future expiry dates on or before December 31, 2030 as Not Expired. Treat expiry dates before today as Expired.
- Expiration Date
- Quantity
- Version
- License Type

- **Filters:**

- **Date Duration:** Users can select any date range within a rolling 10-year window - from January 1, 2015 to July 17, 2025 - using this filter.
- **Server Name:** Users can select any server name from this filter.
- **Vendor:** Users can select any vendor from this filter.
- **License Type:** Users can select any license type from this filter.
- **Asset Info:** Users can select any asset info from this filter.
- **Feature Name:** Users can select any feature name from this filter.
- **Product Name:** Users can select any product name from this filter.
- **Version:** Users can select any version from this filter.
