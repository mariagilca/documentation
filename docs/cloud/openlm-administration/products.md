---
title: "OpenLM Products"
sidebar_position: 2
description: "Use Products to activate and deactivate OpenLM products for your account, set the default role each product assigns to new users, download OpenLM components, and manage third-party integrations."
---

Use **Products** to manage the OpenLM products that are available to your account. From this application you can activate and deactivate products, set the default role each product assigns to new users, download OpenLM component installers, and manage integrations with third-party ticketing systems.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Platform Administration → OpenLM Products**.

**Related:** [OpenLM License Manager](/cloud/openlm-administration/license-manager) · [Users and Groups](/cloud/users/users-and-groups) · [Audit](/cloud/openlm-administration/audit)
:::

To open it, select **Navigation** in the OpenLM portal and choose **Products**. The application contains three pages under **Management** in the left navigation:

- **Products** — view and manage all OpenLM products for your account.
- **Downloads** — download installers for OpenLM components.
- **Integrations** — manage the alert integrations with third-party ticketing systems.

![The Products page groups product cards into Active, Deactivated, Available, and System products sections.](/services/openlm_administration/products.png)
*Figure 1. The Products page groups product cards into Active, Deactivated, Available, and System products sections.*

## Product sections

The Products page groups products into four sections. A product moves between the first three sections as its activation state changes. System products stay in their own section.

| Section | What it shows |
|---|---|
| Active products | Products that are activated for your account. Select a product name to open its user interface in a new tab. Products whose activation is still in progress, or has failed, also appear here. |
| Deactivated products | Products you previously activated and then deactivated. Select **Reactivate** to activate one again. |
| Available products | Products offered by OpenLM that you have not activated yet. Select **Activate** to move a product to **Active products**. |
| System products | Core OpenLM products that are always active by default. They cannot be deactivated. System products that define roles offer **Settings** for [default role configuration](#configure-default-roles). |

## Product cards

Each product card shows the product icon, name, and description, together with the actions that apply in the product's current state:

- **Action button** — the main button changes with the product state: **Activate** (never activated), **Deactivate** (currently active), **Reactivate** (previously deactivated), or **Retry** (activation or deactivation is pending or has failed). System products have no action button.
- **Settings** — opens the product's [default role settings](#configure-default-roles). The link appears for any product, system or active, that defines roles.
- **Learn more** — opens a product description page on openlm.com in a new tab. The link appears on products that provide a description page.

Use the **Lite view** / **Detailed view** toggle in the top bar to change the card layout. Lite view, the default, shows the compact card. Detailed view adds a **Services included** panel that lists the individual services the product provides. For active and system products, each listed service is a link that opens its user interface. For example, Software License Management includes the License Servers, Licenses, Denials, Usage, and License Allocations services, and Process Monitoring includes Process Manager, Process Sessions, and Personal Dashboard.

![In Detailed view, each product card includes the Services included panel listing the services the product provides.](/services/openlm_administration/products-detailed-view.png)
*Figure 2. In Detailed view, each product card includes the Services included panel listing the services the product provides.*

## System products

10 system products are active by default in OpenLM Cloud, regardless of the license in place. They always appear in the **System products** section:

- Agent Activity Manager
- Agents Hub
- Audit
- Broker Hub
- Cloud Broker
- Identity Service
- Notifications
- Reporting
- Users And Groups
- OpenLM License

![The System products section lists the core OpenLM products that are always active.](/services/openlm_administration/products-system.png)
*Figure 3. The System products section lists the core OpenLM products that are always active.*

## Activate a product

1. On the **Products** page, scroll to **Available products**.
2. On the product card, select **Activate**.
3. In the **Activate Product** dialog, select **Confirm**.

Most products activate immediately: the card moves to **Active products** and the product's menu entries are added to the OpenLM Platform navigation. The page updates in real time, so you do not need to refresh it.

A few products provision additional infrastructure when they are activated: **Software License Management**, **Directory Sync**, and, in OpenLM Cloud, **ServiceNow Connector**. Their cards stay in **Active products** with the message **Activation can take up to 10 minutes, please wait...** while the activation runs. If activation does not complete within 10 minutes, the card shows **Activation failed** and the **Retry** button becomes available.

:::note
A product can only be activated if it is covered by your OpenLM license. If it is not, activation fails with a message asking you to contact OpenLM sales. To check which products your subscriptions include, see [OpenLM License Manager](./license-manager#product-to-feature-mapping).
:::

### Product dependencies

Certain products require another product to be active first:

| Product | Requires |
|---|---|
| Virtual License Manager | Software License Management |
| Subscription Optimizer | License Access Control |
| Identity Alignment | Directory Sync |
| LDAP Connector | Directory Sync |

If you activate a product whose dependency is not active, the **Dependent Products** dialog opens and lists each required product with its activation status. Select **Activate All** to activate the missing dependencies, or activate them individually, then confirm.

## Deactivate a product

1. In **Active products**, select **Deactivate** on the product card.
2. In the **Deactivate Product** dialog, select **Confirm**.

The product moves to **Deactivated products**, and its menu entries are removed from the OpenLM Platform navigation. You can reactivate it at any time with **Reactivate**.

:::warning
Deactivating **Software License Management** or **Directory Sync** permanently deletes all data related to the product. The confirmation dialog warns you about the data loss, and its **Confirm** button becomes available only after a 10-second countdown.
:::

Products can also be deactivated automatically: when the license feature that covers a product expires, the product is deactivated. Products deactivated this way are reactivated automatically once the license is renewed; products you deactivated manually stay deactivated. All activations, deactivations, and default role changes are recorded in [Audit](./audit).

## Configure default roles

Each product that defines roles has a **Settings** option for default role assignment. The assigned default role is automatically preselected for that product when you create a new user, and can be removed before finalizing the user setup. For details on assigning product roles to users, see [Users and Groups](../users/users-and-groups).

1. On the product card, select **Settings**.
2. In **Default Role**, select the role you want assigned by default.
3. Select **Save**.

![The product settings page provides the Default Role selection for the product.](/services/openlm_administration/product-settings-roles.png)
*Figure 4. The product settings page provides the Default Role selection for the product.*

Most products offer the **Admin** and **Viewer** roles. A few products differ: Virtual License Manager adds a department **Manager** role, ServiceNow Connector defines separate Admin and Viewer roles for each of its components, and a few products (such as Notifications, Identity Alignment, and LDAP Connector) define only an Admin role. Products that define no roles (such as Identity Service, Reporting, and Subscription Optimizer) show no **Settings** link on their cards.

## Download OpenLM components

The **Downloads** page provides the installers for OpenLM components that run in your environment. It has two tabs: **Platform** lists the current releases for OpenLM Platform deployments, and **Legacy** lists the components for Version 25 (on-premises) deployments.

Each card shows the component's current version, a short description, a **Download** button with a menu of the available package formats, and a **Documentation** button that opens the relevant installation guide.

![The Platform tab of the Downloads page provides installers for Workstation Agent, Broker, DSA, and SaaS Agent.](/services/openlm_administration/products-downloads.png)
*Figure 5. The Platform tab of the Downloads page provides installers for Workstation Agent, Broker, DSA, and SaaS Agent.*

The **Platform** tab includes the following components. For installation instructions, see [Components installation](../deployment-operations/components-installation).

| Component | Package formats |
|---|---|
| Workstation Agent | Windows Installer, tar.gz Archive, Debian Package, RPM Package, macOS (Intel), macOS (Apple Silicon) |
| Broker | Windows Installer, tar.gz Archive, Debian Package, RPM Package |
| DSA — Directory Synchronization Agent | Windows Installer |
| SaaS Agent | Windows Installer |

The **Legacy** tab lists the Version 25 components: SLM, Identity, Broker, AutoCAD Plugin, Workstation Agent, End-User Services, ServiceNow Adapter, Directory Sync, Reporting Hub, Applications Manager, and Reports Scheduler. Each legacy card also includes a **See what's new** link that opens the component's changelog.

![The Legacy tab of the Downloads page provides installers and changelogs for Version 25 components.](/services/openlm_administration/products-downloads-legacy.png)
*Figure 6. The Legacy tab of the Downloads page provides installers and changelogs for Version 25 components.*

## Manage integrations

The **Integrations** page manages the alert integrations that create tickets in third-party systems from OpenLM alerts. It works exactly like the Products page, with **Active**, **Deactivated**, and **Available** sections, the same card actions, and the same view toggle.

The available integrations are:

- [Freshworks Alerts Integration](../integrations/freshworks-alerts) — creates tickets on Freshdesk.
- [Zoho Alerts Integration](../integrations/zoho-alerts) — creates tickets on Zoho Desk.
- [Salesforce Alerts Integration](../integrations/salesforce-alerts) — creates cases on Salesforce Service Cloud.
- Zendesk Alerts Integration — creates tickets on Zendesk.

![The Integrations page manages the alert integrations with third-party ticketing systems.](/services/openlm_administration/products-integrations.png)
*Figure 7. The Integrations page manages the alert integrations with third-party ticketing systems.*

## OpenLM Cloud and On-Premises differences

The product catalog differs slightly between deployment models:

| Area | OpenLM Cloud | OpenLM On-Premises |
|---|---|---|
| Cloud-only products | License Parser, Identity Alignment, LDAP Connector, and the Freshworks, Salesforce, and Zoho alert integrations are available. | Not available. |
| Diagnostics & Logs | Not available. | Available as a system product for platform monitoring. |
| Anonymization | Not available. | Available as a system product. |
| Identity Service | System product, always active. | Managed like a standard product. |
| Reporting | Includes the Quicksight Reporting and Touch Point Events services. | Includes the Superset Reporting and Touch Point Events services. |
| ServiceNow Connector | Activation provisions infrastructure and can take up to 10 minutes. | Activates immediately. |
