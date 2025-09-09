---
title: "Quick start guide: OpenLM"
sidebar_position: 1
description: "Learn how to get started with OpenLM for managing engineering software licenses."
---


# Quick start guide: OpenLM

## Introduction

Welcome to **OpenLM** – a powerful tool designed to monitor and administer engineering software licenses. It serves organizations that use licensed software, empowers license admins to implement and enforce usage policies, and helps accurately forecast the number of licenses needed. It also provides key reporting capabilities:

- Availability of licenses to engineers  
- Cost optimization based on compliance  
- License management optimization and automation  

This quick start guide will walk you through the process of getting started with OpenLM.

## System requirements

Before proceeding with the installation, review the [System Requirements](https://www.openlm.com/openlm-system-requirements/) to ensure compatibility.

:::note
OpenLM is modular software. Each module has specific requirements and installation steps.
:::

## Overview

OpenLM software license management includes several modules that must be installed in a specific order:

### OpenLM SLM

Collects information about the usage of software applications and stores it in a relational database.

- Requires a dedicated supported database.  
- More information available on the [System Requirements](https://www.openlm.com/openlm-system-requirements/) page.

### OpenLM Identity Service

Manages user authentication and user management for OpenLM products.

- Requires a dedicated database, just like the OpenLM SLM.

### OpenLM Broker

Provides added functionality to the OpenLM SLM, such as:

- Denials monitoring  
- Data buffering if the OpenLM SLM is unavailable  

An instance should be installed on **each license manager server**.

### Workstation Agent

Tracks real usage and idle time of engineering applications.

- Monitors executables, processes, and URLs  
- Identifies idle sessions and allows safe session release

### End-User Services

Provides a UI for the Workstation Agent and allows engineers to:

- View license servers  
- Access license usage data

### Reports Scheduler

Generates predefined reports and sends them to specific recipients on a schedule.

### Directory Sync (DSS and DSA)

Allows OpenLM to synchronize with directory services that support LDAP.

- **DSS (Directory Synchronization Service):** Defines sync configuration  
- **DSA (Directory Synchronization Agent):** Executes the sync definitions

### ServiceNow Adapter

Integrates OpenLM data with ServiceNow for enhanced ITSM capabilities.

### OpenLM Reporting Hub

A drag-and-drop interface that supports:

- Flexible data aggregation  
- Integration with external data sources  
- Building comprehensive reports and dashboards

## Support and resources

For additional assistance:

- **Website:** [www.openlm.com](https://www.openlm.com)  
- **Customer support:** [support@openlm.com](mailto:support@openlm.com)

Thank you for choosing OpenLM for your engineering software license management needs!

:::tip
If you have questions or feedback, don’t hesitate to contact our team.
:::
