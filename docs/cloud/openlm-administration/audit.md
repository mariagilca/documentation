---
sidebar_position: 4
---

# Audit

Use **Audit** to monitor, analyze, and manage events across your OpenLM environment in a single, centralized view.

## Overview

The Audit service collects event data from OpenLM components and your systems, providing insights into system activity and potential security issues. It helps you:

- Simplify troubleshooting and bug detection.
- Track system and user activity.
- Support compliance with security and data regulations.


## Access the Audit system

1. In the OpenLM portal, use the global search bar and type `Audit`.
2. Select the **Audit** module from the search results.
3. Access frequently used views from the **Recent** section for quick navigation.

## Events interface

The **Events** interface is your main hub for log analysis.

- Use filters to narrow data by:
  - **Component** (BrokerHub, SecurityService)
  - **Type** (Information, Warning, Error)
  - **Name** (Successful login, AgentDelete)
  - **User**
- View detailed event tables with columns for:
  - Component
  - Event type
  - Timestamp
  - Event name
  - User
  - Description
- Use tools to:
  - Select date ranges
  - Export data
  - Search for keywords

## Track critical activities and access

Audit system maintains:

- **Audit trails**: Track key activities such as user logins, configuration changes, and data modifications.
- **Access logs**: Log details of login attempts, session durations, IP addresses, and authentication methods.

## Monitor data changes and security events

- **Data modification logging**:
  - Records all creates, updates, and deletes.
  - Includes user, action type, and data affected.
- **Security incident logging**:
  - Tracks failed logins, data exports, and privilege changes.
  - Supports proactive threat detection and investigation.

## Compliance logging for cloud environments

For cloud-based OpenLM solutions, Audit system supports:

- GDPR, CCPA, and SOC-2 compliance tracking.
- Event logging to show regulatory adherence.

## Analyze logs and set alerts

- Use advanced search and filtering to locate specific logs.
- Configure alert rules to notify teams of suspicious activities automatically, activating proactive monitoring.

## Manage data security and lifecycle

- **Data protection**:
  - Encrypt log data in transit and at rest.
  - Support anonymization of personal data within logs.
- **Log lifecycle management**:
  - Define policies for retention, archiving, and secure deletion.
  - Automate log rotation and archival to meet operational and compliance requirements.
