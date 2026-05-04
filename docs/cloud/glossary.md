---
title: "Glossary"
sidebar_position: 998
description: "This glossary defines key terms, acronyms, and phrases used throughout OpenLM documentation."
---
# Glossary

This glossary defines key terms, acronyms, and phrases used throughout OpenLM documentation. Terms are organized alphabetically.

## A

### Agents Hub

The central management interface for deploying, configuring, and monitoring Workstation Agents across an organization.

**Related terms:** Workstation Agent, Broker Hub

### alerts

Conditions defined by license managers that trigger notifications when met, ensuring license system stability. You can configure alerts to monitor license usage thresholds, expirations, and denials.

**Related terms:** denied usage, license utilization

### API

Application Programming Interface. OpenLM exposes REST APIs for integrating with third-party systems and automating license management tasks.

## B

### borrowed license

A license temporarily checked out from a license server for offline use. The license is unavailable to other users until it is returned or the borrow period expires.

**Related terms:** floating license, linger time

### Broker

An intermediary software component installed on or near a license server that facilitates communication between OpenLM and license managers. The Broker converts license usage data into a standardized format for ingestion by the OpenLM Platform.

Don't confuse with Cloud Broker, which connects to SaaS platforms through the API.

**Related terms:** Broker Hub, Cloud Broker, license server

### Broker Hub

The central management interface for deploying, configuring, and monitoring License Server Brokers. Use Broker Hub to manage Broker connections, update Broker versions, and view Broker health status.

**Related terms:** Broker, Agents Hub

## C

### CCL (Currently Consumed Licenses)

A real-time view of all active license sessions across monitored license servers. CCL shows which licenses are checked out, by whom, and from which workstation.

**Related terms:** concurrent usage, session, real-time reports

### Cloud Broker

A Broker variant that connects to SaaS and cloud-based platforms through the API to collect usage data. Cloud Brokers do not require installation on a license server.

Don't confuse with Broker, which monitors on-premises license managers.

**Related terms:** Broker, Subscription Optimizer

### Compliance Service

A service that monitors geographical license usage to verify compliance with regional licensing agreements and restrictions.

**Related terms:** license entitlement, SAM

### component

A software module deployed separately from the core OpenLM Platform to extend functionality. Examples include the Broker, Workstation Agent, and Directory Sync Agent.

**Related terms:** Broker, Workstation Agent, DSA

### concurrent usage

The number of licenses in use at any given moment. Monitoring concurrent usage helps organizations identify peak demand periods and optimize license allocation.

Also known as: simultaneous usage.

**Related terms:** floating license, license utilization, CCL

## D

### denied usage

An event recorded when a user attempts to check out a license but is blocked because all available licenses are in use. Tracking denials helps justify additional license purchases or policy changes.

Also known as: license denial.

**Related terms:** concurrent usage, license utilization

### Dongle Monitoring

An OpenLM product that tracks USB hardware license keys (dongles) connected to workstations across the organization. Dongle Monitoring provides visibility into dongle location, usage, and availability.

**Related terms:** license manager, usage monitoring

### DSA (Directory Sync Agent)

An agent installed on-premises that synchronizes user and group data from local directory services (such as Active Directory or LDAP) with the Directory Sync Service.

**Related terms:** DSS, Identity Alignment

### DSS (Directory Sync Service)

A platform service that synchronizes user directories with OpenLM, activating automatic user provisioning and group-based license access policies.

**Related terms:** DSA, Identity Alignment

## E

### Enrichment Service

A platform microservice that processes raw usage data and enriches it with contextual information such as user identity, project allocation, and denial classification.

**Related terms:** microservice, usage monitoring

## F

### feature

A specific functionality, module, or capability of a licensed software application tracked by OpenLM. For example, a single software product might contain multiple features, each consuming a separate license or token.

Don't confuse with product, which refers to an OpenLM offering.

**Related terms:** product, license file

### floating license

A license shared among users on a network. A floating license is checked out when a user opens the application and returned to the pool when the application closes. The total number of simultaneous users is limited by the license count.

Also known as: concurrent license, network license.

**Related terms:** named user license, node-locked license, concurrent usage

## G

### Gateway

The DNS or FQDN entry point through which users and components access the OpenLM Platform.

**Related terms:** OpenLM Platform, on-premises

## H

### historical reports

Reports that analyze license usage over a defined past period. Historical reports are useful for identifying usage trends, forecasting demand, and preparing for license audits.

**Related terms:** real-time reports, license utilization

## I

### Identity Alignment

An OpenLM product that automatically removes or deprovisions users from external services when they are deactivated in the organization's directory. Formerly known as OneDirectorySync.

Don't use "OneDirectorySync" in new documentation.

**Related terms:** DSA, DSS

### idle time

The duration a license remains checked out while the associated application is not actively in use. Identifying idle licenses helps organizations reclaim underutilized resources.

**Related terms:** License Harvesting, session, license utilization

## L

### LAC (License Access Control)

A policy-driven feature for enforcing license access rules using options files. LAC allows administrators to define who can access specific licenses based on user, group, or workstation attributes.

**Related terms:** options file, LFM

### LFM (License File Management)

A feature for viewing, editing, and deploying license files across managed license servers from a central interface.

**Related terms:** license file, LAC

### license chargeback

The practice of allocating software license costs to specific departments, teams, or projects based on actual usage data collected by OpenLM.

**Related terms:** project, license utilization

### license compliance

The process of verifying that software usage aligns with the terms of purchased license agreements. OpenLM supports compliance monitoring through usage tracking, entitlement comparison, and denial reporting.

Also known as: software license compliance, license audit readiness.

**Related terms:** license entitlement, Compliance Service, SAM

### license entitlement

A record of purchased license rights, including the number of seats, the licensed features, and the validity period. Comparing entitlements against actual usage reveals over- or under-licensing.

**Related terms:** license compliance, license file, SAM

### license file

A digital document containing licensing information such as license count, activated features, expiration date, and usage restrictions. License files are issued by software vendors and deployed to license servers.

**Related terms:** LFM, license entitlement, license server

### License Harvesting

The process of reclaiming idle floating licenses from users who are no longer actively using the software. License Harvesting increases effective license availability without purchasing additional seats.

**Related terms:** idle time, floating license

### license manager

Software that controls license distribution and usage, ensuring that concurrent usage does not exceed purchased limits. OpenLM monitors a wide range of license managers, including FlexNet (FlexLM), IBM LUM, Sentinel RMS, Reprise RLM, LM-X, and DSLS, among others.

**Related terms:** license server, Broker

### license pool

A group of licenses of the same type available for concurrent use. The license manager defines a license pool and can restrict it by feature, server, or user group.

**Related terms:** floating license, concurrent usage

### license server

A server that hosts license manager software and handles license distribution and authentication across a network.

Don't confuse with Broker, which is the OpenLM component installed alongside the license server.

**Related terms:** license manager, Broker

### license utilization

A metric showing how many of the available licenses are in use over time. License utilization data helps assess software usage efficiency, justify renewals, and identify optimization opportunities.

**Related terms:** concurrent usage, idle time, historical reports

### linger time

A grace period during which a license remains checked out after the associated application closes. Configure linger time in the license manager to prevent rapid check-out/check-in cycles.

**Related terms:** floating license, borrowed license, idle time

## M

### microservice

An independent software service performing a specific task, forming part of the OpenLM Platform's microservices-based architecture. Each microservice handles a distinct function such as data enrichment, reporting, or directory synchronization.

**Related terms:** OpenLM Platform, Enrichment Service

## N

### named user license

A license assigned to a specific individual. Only that user can access the software, regardless of whether they are currently using it.

**Related terms:** floating license, node-locked license

### node-locked license

A license tied to a specific machine, identified by a hardware attribute such as a MAC address or host ID. The software can only run on that machine.

**Related terms:** floating license, named user license

## O

### on-premises

OpenLM software hosted on the organization's own infrastructure, whether physical servers, virtual machines, or private cloud environments. On-premises deployments give organizations full control over their data and network configuration.

Write as "on-premises", not "on-premise" or "on premise".

**Related terms:** OpenLM Platform, Gateway

### OpenLM Platform

The core system encompassing OpenLM's services and products for engineering license management, SAM, and SaaS management. The Platform is built on a microservices architecture and is available as a cloud (SaaS) or on-premises deployment.

Don't use "Platform" on its own without establishing "OpenLM Platform" first in the same page or section.

**Related terms:** microservice, Gateway, on-premises

### OpenLM token

A flexible, reusable unit of measure for accessing and using specific OpenLM features or functionalities. OpenLM tokens are a form of license entitlement within the OpenLM system.

**Related terms:** license entitlement, token-based licensing

### options file

A FlexNet configuration file used to control license access policies. Options files define rules such as INCLUDE, EXCLUDE, and RESERVE directives to manage which users or groups can access specific licenses.

Also known as: FlexNet options file.

**Related terms:** LAC, license manager

## P

### perpetual licensing

A licensing model where software is licensed for indefinite use, typically with an upfront fee and optional annual maintenance. In OpenLM, perpetual licensing is available for on-premises deployments only.

**Related terms:** subscription licensing, token-based licensing

### Process Manager

A component that tracks application process-level usage on workstations, providing detailed visibility into which applications are running and consuming licenses.

**Related terms:** Workstation Agent, usage monitoring

### product (OpenLM)

A distinct OpenLM offering, either core or optional, which may consume system resources when activated. Examples: Dongle Monitoring, Software License Management, Identity Alignment.

Don't confuse with feature, which refers to a capability of a third-party licensed application.

**Related terms:** feature, OpenLM Platform

### project

A categorization method in OpenLM for organizing license usage data by teams, departments, or cost centers. Projects activate license chargeback and usage attribution reporting.

**Related terms:** license chargeback, historical reports

## R

### real-time reports

Reports that provide up-to-date views of current license usage, availability, and denials. Real-time reports complement historical reports for day-to-day license monitoring.

**Related terms:** historical reports, CCL

### role

A named set of permissions and access levels assigned to users within the OpenLM system. Roles control which features and data a user can view or manage.

**Related terms:** user

## S

### SAM (Software Asset Management)

The practice and OpenLM product for tracking software entitlements, procurement, costs, and compliance across the organization. SAM connects license usage data with purchase records to identify savings opportunities.

**Related terms:** SLM, license compliance, license entitlement

### session

A user's active instance of software use, tracked by OpenLM with details such as start time, end time, application, feature, license server, and workstation. Sessions are the foundational data unit for usage reporting.

**Related terms:** concurrent usage, CCL, idle time

### SLM (Software License Management)

The core OpenLM product for monitoring, tracking, and managing software license usage across an organization.

**Related terms:** SAM, license manager, license utilization

### subscription licensing

A licensing model where software is licensed for a defined period (monthly, annually) with recurring fees. Subscription licenses expire at the end of the term unless renewed.

**Related terms:** perpetual licensing, Subscription Optimizer

### Subscription Optimizer

An OpenLM product that automates seat reallocation for SaaS subscriptions. Subscription Optimizer identifies inactive named-user seats and reclaims them, reducing waste on platforms such as Autodesk Cloud and LinkedIn Sales Navigator.

**Related terms:** subscription licensing, Cloud Broker

## T

### token-based licensing

A licensing model where a shared pool of tokens is consumed based on the applications or features used. Different features may consume different token amounts. Examples include Autodesk Token Flex and Altair HyperWorks Units.

**Related terms:** floating license, OpenLM token

## U

### usage monitoring

The process of tracking and recording software usage to analyze and optimize license consumption. OpenLM monitors usage across on-premises license managers, SaaS platforms, and cloud services.

**Related terms:** license utilization, SLM, session

### user

An individual using licensed applications tracked by OpenLM. User attributes such as name, department, email, and associated workstations are recorded for reporting and access control.

**Related terms:** role, session, named user license

## V

### VLM (Virtual License Manager)

A feature that allocates licenses without requiring a physical license server. VLM creates a virtual license pool managed entirely within OpenLM. Currently supported for FlexNet Embedded licenses.

**Related terms:** license manager, license pool

## W

### workstation

The computer or device from which a user accesses licensed software. OpenLM tracks workstation attributes to map license usage across the organization.

**Related terms:** Workstation Agent, user

### Workstation Agent

A lightweight software program installed on end-user workstations to collect software license usage data and transmit it to the OpenLM Platform through Agents Hub.

**Related terms:** Agents Hub, Process Manager, workstation
