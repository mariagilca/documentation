---
title: OpenLM EasyAdmin administration
sidebar_position: 1
description: Overview of the OpenLM EasyAdmin interface administration features and settings.
---

# OpenLM EasyAdmin administration

## System & security

### Timezone

You can set the OpenLM interface timezone globally or allow users to choose it on their first login.

### Chart color

Customize chart colors using one of three palettes: Medium, Soft, or Custom. Clicking a color opens a picker. This applies to all charts in the interface.

### Email notifications

Toggle email notifications for predefined scenarios. You must configure and test the email panel to enable notifications.

Supported email notification types:

1. **Performance improvements**: Reports on possible license spending optimizations.  
2. **License violations**: Alerts when license agreement terms are breached.  
3. **New version released**: Notifies when a new version is available.  
4. **Usability report**: Sends crash and technical issue reports via email.

## General configuration

- **Support spaces in usernames**: Enable this to handle usernames with spaces in log/output files.  
  :::caution
  This may increase the risk of parsing errors.
  :::

- **Table mapping**:
  - **Update product features**: Syncs product feature tables remotely.
  - **Update feature/packages**: Organizes features into packages, updated remotely.

  Choose auto-update frequency: daily (midnight), weekly (Sunday), or monthly (1st of each month). Manual updates override previous mappings.

- **System configuration**: Export or import your configuration.  
  :::tip
  Always back up before switching database types.
  :::

## Logs & reports

- **Generate support reports**: Useful for troubleshooting with the OpenLM support team.

- **Logger configuration file destination**: Path to the log configuration file.

- **Enable detailed logs**:
  - Modes:
    - **All logs**: Full detailed logging.
    - **Full LM logging**: Specific LM server detailed logging.
    - **LDAP log**: LDAP-related logs.

  Set the logging duration (5 min to 48 hours). After expiration, normal logging resumes.

## Security

### Data management

- **Resolve workstation name every day**: Maps workstation names to IPs.

- **Store user information anonymously**: Complies with legal/privacy constraints.

- **Set as permanent**: Makes anonymous user data storage irreversible.

  :::caution
  You won’t be able to collect identifiable user data again. Make sure this is required before enabling.
  :::

### Authorization

Supports OAuth2.0 and Open ID Connect. Generate a client ID and secret key for external components (e.g., Broker, DSS).

- **Reset secret**: Resets the client’s secret key. Previous keys stop working.

## Working hours

Define working hours to filter license usage in reports.

## Show/hide features

Toggle feature visibility in the EasyAdmin interface.

## Product packages

Edit product names and configure product groupings in the interface.

## Process feature

Configure application-specific license monitoring:

- Set idle thresholds
- Define inactive session rules
- Helps reclaim unused licenses

## Projects

- **Log project info**: Enable project tracking features.

### General settings

- **Minimal usage duration**: Threshold before marking a project as inactive.
- **Active project window**:
  - Show on license retrieval.
  - Show periodically (set interval).
  - Control window timeout/fade behavior.
- Agent menu options:
  - “Set Active Project”
  - “Create New Project”
- **Show unassigned projects**
- **Support environment variables**:
  - Define a variable name
  - Optionally add unknown projects based on this variable

## Cleanup manager

Delete usage history, groups, and users from the database.

## Directory synchronization

Sync OpenLM DB with domain directories (e.g., Active Directory).

## OpenLM license

View license details, expiration, available extensions, and quantities.

## Email

Configure SMTP server settings for notifications and alerts.

## Alerts

Monitor licensing system stability. Alert options:

- EasyAdmin alerts widget
- Application Event Log
- Email alerts

## Roles

Use role-based access control to customize tool access by user group (e.g., help desk, sysadmin).

## Unmanaged processes

Track software features not managed by a license server.

## Options files

Configure FLEXlm (FlexNet) options files to:

- Reserve or deny features by user, host, IP, or group

## Agent procedures

Retrieve licenses from idle applications.

Use cases:
- General license retrieval (any license server)
- Conditional retrieval (e.g., close A if B is inactive)
- Reclaim unmanaged licenses

## Checkout policy

Control how many licenses an application consumes with multiple sessions. Align with vendor settings to ensure accurate reporting.

## Applications manager

Monitor and control software use regardless of license type.

## Token Flex

Used with Autodesk. Pay-as-you-go token model. Users consume tokens per product usage per 24-hour window.

## External platforms

### DSS (Directory Synchronization Service)

- Approve/manage OpenLM Server <–> DSS connections
- Pending approval lasts 5 minutes or until approved/rejected

### ServiceNow

OpenLM integrates with ServiceNow for data reporting.

#### ServiceNow destination

- Set instance URL, username, password
- Use “Test connection” to verify setup

#### Sync configuration

- Enable/disable daily sync
- Set sync start time
- Sync manually (disabled if sync is already running)
- Set aggregation timezone

#### Notifications

- **EasyAdmin alerts**: Display in the interface
- **Email notifications**: Send to admin and custom recipients
- **Recipient list**: Add multiple addresses (new line separated)

## License manager servers

Monitor and manage license server connections.

- **Status**:
  - **Pending**: Reported by Broker, awaiting approval
  - **Denied**: Reported but not monitored
  - **Enabled**: Monitoring active (green check = healthy)
  - **Disabled**: Configured but inactive

- Actions:
  - **Add LM**: Add a new server manually
  - **Edit**: Double-click or select and click edit
  - **Remove**: Remove from monitoring (history retained)
  - **Show/hide denied servers**

### LM tools

Configure how OpenLM queries the license server (EXE or CLI).

## License files

Manage FLEXlm license files.

Columns:
- **License server name**
- **Type**
- **Upload date**

Features:
- **Create draft**
- **Compare current vs. draft**
- **Push to LM server**:
  - Push and restart
  - Push and reread

- **Search in file**

## Denials

Control denial reporting.

- **Track true denials only**: Ignores denials followed by quick success (defined tolerance).
- **License pull tolerance**: Set from 1–600 seconds.
- **Excluded denials**: Filter by server, error codes, messages.

---
