---
title: "Glossary"
sidebar_position: 998
toc_max_heading_level: 2
description: "Definitions of the license-management, OpenLM Platform, license-manager, software-vendor, and IT, SAM, and AI terms you meet across the OpenLM documentation."
---

This glossary defines the terms, acronyms, and product names you meet when you manage software licenses with OpenLM. It spans license models, core licensing concepts, OpenLM products and features, the third-party license managers OpenLM connects to, the vendors whose software it monitors, and the wider IT asset management, compliance, and AI concepts around the practice.

Each entry stands on its own, so you can read any single definition without the rest of the page. A category label under each term marks its area &mdash; for example, *OpenLM feature*, *license manager*, or *software vendor*.

## Jump to a letter

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [K](#k) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w)

## A

### Active Directory (AD)

*IT, SAM & integration*

A Microsoft directory service that stores user, group, and computer accounts for a Windows network. OpenLM synchronizes users and groups from Active Directory through its Directory Synchronization Agent, so license usage and access rules map to real organizational identities.

### Actual Usage

*OpenLM feature*

An OpenLM capability that reports the time software is genuinely in use, not only the time a license is checked out. By comparing checkout time with active interaction, Actual Usage exposes idle sessions that you can harvest and reallocate.

### Adobe

*Software vendor*

A vendor of creative and document software licensed mainly through Creative Cloud subscriptions. OpenLM Subscription Optimizer targets unused Adobe seats so you pay only for what teams use.

### AEC (architecture, engineering, and construction)

*Industry & domain*

The industry sector that designs and builds the physical environment using tools such as Revit, MicroStation, and Civil 3D. AEC firms run large estates of license-managed software that OpenLM monitors.

### Agent (OpenLM Agent)

*OpenLM component*

The previous name of the Workstation Agent, the OpenLM client installed on end-user workstations to collect license usage data. Use "Workstation Agent" in new documentation. See Workstation Agent.

### Agent Activity Manager

*OpenLM component*

An OpenLM service that tracks which workstations run an active Workstation Agent. License Access Control queries it during deployment to confirm that a user's machine is running one before it allocates individual-user rules.

### Agents Hub

*OpenLM component*

The central OpenLM interface for deploying, configuring, and monitoring Workstation Agents across an organization. Workstation Agents report their usage data to the OpenLM Platform through Agents Hub.

**Related terms:** Workstation Agent, Broker Hub

### AI FinOps

*AI & integration*

An OpenLM capability that applies financial operations practices to artificial intelligence tooling. It attributes large language model (LLM) token consumption to projects, teams, and users with real-time token attribution, so engineering organizations keep AI budgets predictable alongside traditional software spend.

### Alerts (OpenLM Alerts)

*OpenLM feature*

An OpenLM automation that lets administrators define conditions, such as low license availability or an approaching expiration date, and receive notifications when those conditions are met. Alerts help teams act before a shortage causes a denial.

**Related terms:** denied usage, license utilization

### Allocation

*Licensing concept*

The assignment of specific licenses to specific users, groups, devices, or projects. In OpenLM, allocation through License Access Control reserves capacity for the people who need it and prevents lower-priority users from exhausting a shared pool.

### Allowlist

*Licensing concept*

A list of users or groups explicitly permitted to access a feature, the opposite of a blocklist. OpenLM Compliance and License Access Control use allowlists so that only authorized users reach expensive engineering tools.

### Altair

*Software vendor*

A vendor of simulation and data analytics software that uses a units-based licensing model called HyperWorks Units. OpenLM monitors Altair licensing, including hosted HyperWorks units.

### Annapurna

*Platform & architecture*

The release name for the microservices generation of the OpenLM Platform. Built on a microservices architecture and enhanced with AI for performance and scalability, Annapurna is the central system for license management and monitoring across the OpenLM suite. OpenLM names major releases after mountains.

### Ansys

*Software vendor*

A vendor of engineering simulation software for structural, fluid, electronics, and multiphysics analysis. Ansys licenses are high in value and are commonly monitored with OpenLM.

### API (application programming interface)

*IT, SAM & integration*

A defined set of endpoints that lets external systems read from or write to a platform programmatically. OpenLM exposes APIs so customers can integrate license data with IT service management, business intelligence, and procurement systems.

### Asset (License Access Control)

*OpenLM component*

In License Access Control, the unique combination of host, port, license manager type, and option file that identifies a managed license source. Rules and policies attach to an asset, and only one policy is active per asset at a time.

### Audit (software license audit)

*IT, SAM & compliance*

A formal review, often initiated by a software vendor, that verifies an organization uses licenses within the terms of its agreements. OpenLM supports audit readiness by keeping a complete usage history and exporting evidence of compliant use.

### Autodesk

*Software vendor*

A vendor of design and engineering software, including AutoCAD, Revit, and the Token-Flex program. Autodesk has shifted toward named-user and token-based models, which OpenLM monitors to reduce subscription waste.

### Autodesk Cloud

*License manager*

Autodesk's cloud-based licensing service for named-user subscriptions. OpenLM interfaces with Autodesk Cloud to report assignment and usage and to deploy access policies to supported cloud license sources.

### Autodesk Token-Flex

*License manager*

An Autodesk consumption program that charges for usage based on tokens drawn per product per hour. OpenLM reports Token-Flex consumption so teams can forecast spend and avoid budget overruns.

## B

### Bentley Systems

*Software vendor*

A vendor of infrastructure engineering software, including MicroStation and the OpenRoads product line. Bentley licensing measures usage against entitlements and can generate overage charges, which OpenLM helps prevent through monitoring and alerts.

### BetaLM

*License manager*

A license manager used by some engineering applications. OpenLM monitors BetaLM for usage, denials, and expiration dates.

### BI Services (OpenLM BI Services)

*OpenLM service*

An OpenLM service that builds custom business intelligence reports and dashboards from license data, so leaders see the metrics that matter to their organization.

### BIM (building information modeling)

*Industry & domain*

A process for creating and managing digital representations of buildings and infrastructure. BIM tools such as Revit and MicroStation are costly, license-managed applications that OpenLM customers monitor.

### Blocklist

*Licensing concept*

A list of users or groups explicitly denied access to a feature, the opposite of an allowlist. License Access Control can generate blocklist rules to keep specified users off premium licenses.

### Borrowed license

*Licensing concept*

A license temporarily checked out from a shared pool for offline use, then returned after a set period. It is also called a commuter license. OpenLM reports borrowed licenses so administrators can see capacity that is unavailable to other users.

**Related terms:** floating license, linger time

### Broad Peak

*Platform & architecture*

A named release of the OpenLM Platform. As with Annapurna, OpenLM names major releases after mountains.

### Broker (OpenLM Broker)

*OpenLM component*

An intermediary OpenLM component, installed per license server, that communicates with license managers and converts their usage data into a standardized format. The Broker also deploys option files for License Access Control and watches option files for changes.

Don't confuse the Broker with the Cloud Broker, which connects to SaaS and cloud platforms through the API.

**Related terms:** Broker Hub, Cloud Broker, license server

### Broker Hub

*OpenLM component*

The OpenLM service and interface for registering, approving, and managing Broker hosts — deploying and updating Brokers and viewing their health. A host must be approved in Broker Hub before License Access Control can discover and manage its assets.

**Related terms:** Broker, Agents Hub

## C

### CAD (computer-aided design)

*Industry & domain*

Software used to create precise 2D and 3D designs, such as AutoCAD, SOLIDWORKS, and Creo. CAD tools are among the specialty applications OpenLM is built to manage.

### CAE (computer-aided engineering)

*Industry & domain*

Software used to simulate and validate engineering designs, including finite element analysis and computational fluid dynamics tools. CAE licenses are expensive and benefit from close usage monitoring.

### CAM (computer-aided manufacturing)

*Industry & domain*

Software that turns designs into machine instructions for manufacturing. CAM applications are frequently license-served and tracked by OpenLM.

### CCL (Currently Consumed Licenses)

*Reporting & metrics*

A real-time view of all active license sessions across monitored license servers. CCL shows which licenses are checked out, by whom, and from which workstation.

**Related terms:** concurrent usage, session, real-time reports

### CFD (computational fluid dynamics)

*Industry & domain*

A simulation method that models the flow of liquids and gases. CFD tools such as Ansys Fluent are high-value, license-managed applications.

### Chargeback

*Reporting & metrics*

An accounting practice that allocates software cost to the teams, departments, or projects that consume it. OpenLM Projects supports chargeback by attributing license usage to organizational units.

**Related terms:** project, license utilization

### Check-in (license check-in)

*Licensing concept*

The return of a license to the shared pool when an application closes or a session ends. Prompt check-in keeps capacity available, and OpenLM can force check-in of idle sessions through harvesting.

### Checkout (license checkout)

*Licensing concept*

The moment an application requests and receives a license from a license server. The license manager enforces access rules at checkout time, which is where License Access Control applies its policies.

### Cloud Broker

*OpenLM component*

A Broker variant that connects to SaaS and cloud-based platforms through the API to collect usage data. Cloud Brokers don't require installation on a license server.

Don't confuse the Cloud Broker with the Broker, which monitors on-premises license managers.

**Related terms:** Broker, Subscription Optimizer

### Cloud deployment

*Platform & architecture*

Hosting the OpenLM Platform in the cloud for scalable operation without managing local infrastructure. OpenLM supports cloud, on-premises, and hybrid deployment.

### CodeMeter

*License manager*

A licensing and protection system from Wibu-Systems that uses hardware (CmDongle) and software (CmActLicense) containers. OpenLM monitors CodeMeter usage, including borrowed licenses and expiration dates.

### Commuter license

*Licensing concept*

Another name for a borrowed license, a license checked out for offline use and returned later. See Borrowed license.

### Compliance (license compliance)

*IT, SAM & compliance*

The state of using software within the terms of its license agreements. OpenLM supports compliance by enforcing access rules, reporting true denials and overuse, and producing an audit trail. What it enables depends on each customer's agreement, region, and configuration.

Also known as software license compliance or license audit readiness.

**Related terms:** license entitlement, Compliance Service, SAM

### Compliance Service

*OpenLM component*

An OpenLM microservice that monitors geographical license usage to verify compliance with regional licensing agreements and restrictions.

**Related terms:** license compliance, license entitlement, SAM

### Component (OpenLM)

*Platform & architecture*

A software module deployed separately from the core OpenLM Platform to extend its reach. Examples include the OpenLM Broker, the Workstation Agent, and the Directory Synchronization Agent.

**Related terms:** Broker, Workstation Agent, DSA

### Concurrent license

*License model*

A license drawn from a shared pool and available to any authorized user on a first-come, first-served basis. There is no functional difference between a concurrent license and a floating license. See Floating (concurrent) license.

### Concurrent usage

*Reporting & metrics*

The number of licenses in use at a given moment. Peak concurrent usage is the key input for right-sizing a floating license pool.

Also known as simultaneous usage.

**Related terms:** floating license, license utilization, CCL

### Consultancy Services (OpenLM Consultancy Services)

*OpenLM service*

An OpenLM advisory service that helps organizations design license management strategy, optimize spend, and prepare for audits.

### Cost-per-active-user

*Reporting & metrics*

A metric that divides license cost by the number of users who actually use the software, rather than by seats purchased. It reveals the true cost of a tool and supports accurate department chargebacks.

### Custom Commands

*OpenLM feature*

An OpenLM capability that runs predefined scripts or actions in response to license events, such as notifying a user or releasing an idle session.

## D

### Dassault Systèmes

*Software vendor*

A vendor of design, simulation, and product lifecycle management software, including CATIA, SOLIDWORKS, SIMULIA, and DELMIA. Dassault products are served by the DS License Server (DSLS), which OpenLM monitors and manages.

### Denial (license denial)

*Licensing concept*

An event in which a user requests software but no license is available. Tracking denials shows whether you need more capacity or better allocation. Compare with true denial.

### Denied usage

*Reporting & metrics*

The recorded instances where license access was blocked because all available licenses were in use. OpenLM reports denied usage so teams can quantify shortages.

Also known as license denial.

**Related terms:** concurrent usage, license utilization

### Deployment (License Access Control)

*OpenLM component*

In License Access Control, the act of compiling rules into an option file and sending it to the license server through the Broker. Deployments can be manual or scheduled, and OpenLM logs each one for audit.

### Directory Synchronization Agent (DSA)

*OpenLM component*

An OpenLM component that imports users, groups, and organizational structure from Active Directory or LDAP. The DSA keeps OpenLM identities aligned with the directory so usage records and access rules reflect the real organization.

**Related terms:** DSS, Identity Alignment

### Docker

*Platform & architecture*

A platform for packaging software into containers. The OpenLM platform ships as containerized microservices, which support consistent cloud, on-premises, and hybrid deployment.

### Dongle

*Licensing concept*

A physical hardware key, usually a USB device, that must be present for protected software to run. Dongles can be lost or hoarded in a drawer, so OpenLM monitors USB ports across the network to locate them and confirm whether the software is actually in use.

### Dongle Monitoring

*OpenLM product*

An OpenLM product that tracks hardware dongles across a network, showing which user holds a given dongle and whether the associated software is in use. It brings physical license keys into the same visibility as networked licenses.

**Related terms:** license manager, usage monitoring

### DSLS (Dassault Systèmes License Server)

*License manager*

The license manager for Dassault Systèmes products such as CATIA and SOLIDWORKS. OpenLM provides DSLS monitoring with denial reporting, borrowed-license reporting, token support, allocation, and server-redundancy support.

### DSS (Directory Sync Service)

*OpenLM component*

A platform service that synchronizes user directories with OpenLM, turning on automatic user provisioning and group-based license access policies. The on-premises Directory Synchronization Agent feeds the Directory Sync Service.

**Related terms:** Directory Synchronization Agent, Identity Alignment

## E

### EDA (electronic design automation)

*Industry & domain*

Software used to design integrated circuits and electronic systems, from vendors such as Cadence, Synopsys, and Siemens EDA. EDA licenses are among the most expensive software an enterprise buys, which makes monitoring valuable.

### Engineering license management

*Licensing concept*

The discipline of monitoring and controlling licenses for specialized engineering and scientific software. It is OpenLM's core focus and differs from general IT software management because of floating, token, and dongle models.

### Engineering License Management Service

*OpenLM service*

An OpenLM service in which OpenLM specialists run engineering license management for the customer, combining the platform with expert operation.

### Enrichment Service

*OpenLM component*

An OpenLM microservice that processes raw usage data and enriches it with contextual information such as user identity, project allocation, and denial classification.

**Related terms:** microservice, usage monitoring

### Entitlement

*Licensing concept*

The set of rights an organization has purchased: how many seats, which features, and for how long. Managing licenses by entitlement lets you grant access based on roles rather than one-off assignments.

**Related terms:** license compliance, license file, SAM

### Esri

*Software vendor*

The vendor of the ArcGIS geographic information system. OpenLM monitors ArcGIS named-user and concurrent licensing, including ArcGIS Online.

### EULA (end-user license agreement)

*IT, SAM & compliance*

The legal contract that sets the terms and conditions for using a software product, including allowed users, features, and deployment. Compliance is measured against the EULA.

### EXCLUDE

*OpenLM component*

An option file directive that denies a feature to a specified user, group, or host. License Access Control generates EXCLUDE rules to keep lower-priority users from consuming reserved capacity.

### Expiration monitoring

*Licensing concept*

Tracking license and maintenance renewal dates to prevent an unplanned loss of access. OpenLM reports expiration dates and can alert administrators before licenses lapse.

### External DB Support

*OpenLM feature*

An OpenLM capability that stores license data in an external database, such as PostgreSQL or Microsoft SQL Server, for scale, retention, and integration with business intelligence tools.

## F

### FEA (finite element analysis)

*Industry & domain*

A simulation method that divides a structure into small elements to predict stress, heat, and deformation. FEA tools such as Ansys Mechanical and Abaqus are license-managed and frequently monitored.

### Feature (license feature)

*Licensing concept*

A specific functionality, module, or add-in of a licensed application that the license manager controls separately. OpenLM tracks usage at the feature level, so you can see which capabilities, not only which products, are actually used.

Don't confuse a feature with a product, which is an OpenLM offering.

**Related terms:** product, license file

### Features Service

*OpenLM component*

An OpenLM service that maintains the authoritative catalog of license features. License Access Control validates feature names against the Features Service before it deploys rules.

### FinOps

*IT, SAM & compliance*

A discipline that brings financial accountability to variable technology spend by aligning engineering, finance, and procurement. OpenLM applies FinOps thinking to software licenses and, through AI FinOps, to LLM token consumption.

### Flexera

*Software vendor*

The company behind FlexNet Publisher, the most common engineering license manager, and FlexNet Embedded. OpenLM monitors Flexera-licensed software and integrates with Flexera environments.

### FlexNet (FLEXlm)

*License manager*

The most widely used license manager for engineering software, originally FLEXlm and now Flexera FlexNet Publisher. It uses a vendor daemon, the lmgrd license server process, and an option file for access control. OpenLM provides full FlexNet monitoring with denial reporting, borrowing, token support, and option file management.

### FlexNet Embedded (FNE)

*License manager*

A Flexera licensing technology embedded directly in applications and devices. OpenLM interfaces with FNE for usage, borrowing, and token reporting.

### Floating (concurrent) license

*License model*

A license shared among a pool of users. When you open an application it requests a license from a central server, and when you close it the license returns to the pool for someone else. Floating licenses suit globally distributed teams and are the model OpenLM optimizes most often.

Also known as a concurrent license or network license.

**Related terms:** named user license, node-locked license, concurrent usage

## G

### Gateway

*Platform & architecture*

The DNS or fully qualified domain name (FQDN) entry point through which users and components reach the OpenLM Platform.

**Related terms:** OpenLM Platform, on-premises

### GIS (geographic information system)

*Industry & domain*

Software for capturing, analyzing, and visualizing spatial and geographic data, led by Esri ArcGIS. GIS licenses are widely used across government and utilities and are commonly monitored with OpenLM.

### GraphQL

*AI & integration*

A query language and data layer that lets clients request exactly the data they need. The OpenLM MCP Reporting Connector uses a GraphQL data layer to fetch precise analytics for AI assistants.

### Group Usage

*Reporting & metrics*

An OpenLM report that aggregates license usage by organizational group, so you can compare consumption across teams and departments.

### GSA (General Services Administration)

*IT, SAM & compliance*

The US federal agency whose schedules let government buyers purchase approved products. OpenLM is a GSA contract holder, which simplifies procurement for public-sector customers.

## H

### Hardlock

*License manager*

A hardware-based, dongle-style license manager. OpenLM monitors Hardlock usage and expiration.

### Harvesting (license harvesting)

*Licensing concept*

The automatic reclaiming of licenses from idle sessions and their return to the shared pool. OpenLM detects inactivity, can save a user's work, and releases the license so an active colleague can use it, turning waste into capacity without buying more seats.

**Related terms:** idle time, floating license

### Heat map

*Reporting & metrics*

A visualization that uses color intensity to show when and where license demand peaks. OpenLM includes heat maps among its usage visualizations.

### Hexagon

*Software vendor*

A vendor of design, manufacturing, and geospatial software, including the MSC simulation and Intergraph product lines. OpenLM monitors several Hexagon license managers.

### Historical reports

*Reporting & metrics*

Reports that analyze license usage over a past period to reveal trends and forecast demand. They are the basis for right-sizing renewals with evidence rather than guesswork.

**Related terms:** real-time reports, license utilization

### Hybrid deployment

*Platform & architecture*

A deployment that combines on-premises and cloud components. OpenLM supports hybrid environments so organizations can monitor on-premises license servers and cloud workloads in one place.

## I

### IBM

*Software vendor*

A technology vendor whose engineering and development tools have historically used the IBM License Use Management (LUM) system. OpenLM monitors IBM-licensed software.

### IBM LUM (License Use Management)

*License manager*

A license manager historically used by IBM and several engineering applications. OpenLM monitors IBM LUM for usage, denials, borrowing, expiration, and server redundancy.

### Identity Alignment

*OpenLM feature*

An OpenLM feature that keeps user identities consistent across directories and license managers, so usage records and access rules attach to the correct person even when names differ across systems. It can also deprovision users from external services when they are deactivated in the organization's directory. Formerly OneDirectorySync; don't use that name in new documentation.

**Related terms:** DSA, DSS

### Idle time

*Licensing concept*

The period a license is checked out but the application is not actively used. Idle time is the main signal OpenLM uses to identify licenses worth harvesting.

**Related terms:** License Harvesting, session, license utilization

### INCLUDE

*OpenLM component*

An option file directive that grants a feature to a specified user, group, or host. License Access Control generates INCLUDE rules to reserve capacity for the people who need it.

### ISO/IEC 19770

*IT, SAM & compliance*

The international standard family for IT asset management, including software identification tags. It provides a framework for the software asset management practices that OpenLM data supports.

### ITAM (IT asset management)

*IT, SAM & compliance*

The practice of tracking and managing an organization's hardware and software assets across their lifecycle. Software asset management is the software-focused subset, and OpenLM supplies the engineering-software usage data that general ITAM tools often lack.

### ITIL

*IT, SAM & compliance*

A framework of best practices for IT service management. OpenLM integrates with IT service management platforms such as ServiceNow that implement ITIL processes.

## K

### Kubernetes

*Platform & architecture*

An orchestration system that automates deployment and scaling of containerized applications. The OpenLM platform runs its microservices on Kubernetes for scalable cloud and on-premises operation.

## L

### LDAP (Lightweight Directory Access Protocol)

*IT, SAM & integration*

A protocol for accessing directory services that store users and groups. OpenLM reads users and groups over LDAP to align identities and drive access rules.

### LDAP Connector

*OpenLM product*

An OpenLM product that connects the platform to LDAP and Active Directory directories, importing users and groups for reporting and access control.

### License Access Control (LAC)

*OpenLM feature*

An OpenLM automation that turns license management from passive monitoring into active, policy-driven enforcement. You define rules for who can use which features and when, and LAC compiles and deploys an option file that the license manager enforces at checkout. LAC also logs every outcome for audit and troubleshooting.

**Related terms:** options file, LFM

### License file

*Licensing concept*

A digital document issued by a vendor that records licensing details such as license count, activated features, expiration date, and usage restrictions. OpenLM License Files Management compares and tracks these files.

**Related terms:** LFM, license entitlement, license server

### License File Management (LFM)

*OpenLM feature*

An OpenLM feature for viewing, comparing, editing, and deploying vendor license files across managed license servers from a central interface. It lets administrators confirm that a new file contains the expected features and versions before it goes live.

### License manager

*Licensing concept*

Software that controls how licenses are distributed and used, ensuring purchased limits are not exceeded. Examples include FlexNet, DSLS, IBM LUM, and Sentinel RMS. A license manager is distinct from the license server that hosts it.

**Related terms:** license server, Broker

### License Parser

*OpenLM product*

An OpenLM tool that reads and interprets vendor license files, extracting features, counts, and expiration dates for analysis and comparison.

### License pool

*Licensing concept*

The set of floating licenses shared among users. An application draws from the pool at checkout and returns to it at check-in, and pool size sets the ceiling on concurrent use.

**Related terms:** floating license, concurrent usage

### License server

*Licensing concept*

A server that hosts license manager software and handles license distribution and authentication across a network. The OpenLM Broker is installed per license server to collect its data.

Don't confuse the license server with the Broker, the OpenLM component installed alongside it.

**Related terms:** license manager, Broker

### License Server Monitoring

*OpenLM feature*

An OpenLM capability that watches the health and availability of license servers and alerts administrators to outages that would block checkouts.

### License utilization

*Reporting & metrics*

A metric showing how many of the available licenses are in use over time, used to assess efficiency and find waste. Low utilization on a costly product is a strong candidate for reclamation or a smaller renewal.

**Related terms:** concurrent usage, idle time, historical reports

### linger time

*Licensing concept*

A grace period during which a license stays checked out after the application closes. Configure linger time in the license manager to prevent rapid check-out and check-in cycles.

**Related terms:** floating license, borrowed license, idle time

### LM-X

*License manager*

A commercial license manager from X-Formation used by many engineering applications. OpenLM monitors LM-X for usage, denials, expiration, and token support.

### lmgrd

*License manager*

The FlexNet license server process that starts vendor daemons and brokers checkout requests. OpenLM connects through its Broker rather than to lmgrd directly.

## M

### Maintenance

*Licensing concept*

An annual fee, common with perpetual licenses, that provides updates and support. Tracking maintenance renewals prevents loss of support on critical tools.

### Managed Services (OpenLM Managed Services)

*OpenLM service*

An OpenLM service in which OpenLM experts operate license management on the customer's behalf, including a hosted license manager option.

### MathWorks

*Software vendor*

The vendor of MATLAB and Simulink, technical computing tools licensed through the MathLM license manager. OpenLM monitors MathWorks usage to optimize concurrent and network licenses.

### MCP (Model Context Protocol)

*AI & integration*

An open standard that lets AI assistants connect to external data sources and tools. OpenLM uses MCP so assistants such as Claude and ChatGPT can query license data directly.

### MCP Connector (OpenLM MCP Reporting Connector)

*OpenLM feature*

An OpenLM feature that acts as a secure, read-only gateway between your reporting database and AI assistants. Through it you can ask questions in plain language, for example listing AutoCAD users with no activity in 90 days, and receive answers and visual reports drawn from your own telemetry. It uses a GraphQL data layer and OAuth 2.0 authentication.

### Microservice

*Platform & architecture*

An independent software service that performs one task and combines with others to form a larger system. The OpenLM platform is built as discrete microservices that customers subscribe to as needed.

**Related terms:** OpenLM Platform, Enrichment Service

### Monday.com

*IT, SAM & integration*

A work management platform that OpenLM integrates with, so license events and tasks flow into existing team workflows.

### MSC Licensing (Helium)

*License manager*

The license manager for MSC simulation software, now part of Hexagon. OpenLM monitors MSC Helium for usage, borrowing, expiration, redundancy, and tokens.

## N

### Named user license

*License model*

A license assigned to a specific individual that cannot be shared. It simplifies vendor compliance but can cost more when users need the software only occasionally, a pattern OpenLM exposes so you can reassign idle assignments.

**Related terms:** floating license, node-locked license

### Node-locked license

*License model*

A license tied to a specific machine rather than a user or a shared pool. The software runs only on the device the license is locked to.

**Related terms:** floating license, named user license

### Notifications

*OpenLM feature*

Messages OpenLM sends, by email or integration, when an alert condition, deployment outcome, or threshold is reached, so the right people learn about license events promptly.

### Nvidia License Manager

*License manager*

The licensing service for Nvidia virtual GPU and related software. OpenLM interfaces with it for usage and expiration reporting.

## O

### OAuth 2.0

*AI & integration*

An authorization standard that grants applications scoped access without sharing passwords. The OpenLM MCP Reporting Connector uses OAuth 2.0 to secure connections to AI assistants.

### On-premises

*Platform & architecture*

Software hosted on an organization's own infrastructure, physical or private cloud. OpenLM offers on-premises deployment for customers that require full control of infrastructure and data.

Write "on-premises", not "on-premise" or "on premise".

**Related terms:** OpenLM Platform, Gateway

### OpenLM

*Platform & architecture*

A Gartner-recognized provider of software license management for engineering and specialty software, established in 2007. OpenLM connects to more than 100 license managers and consolidates their data into one platform for visibility, optimization, and control.

### OpenLM Analytics

*OpenLM product*

An OpenLM product that turns license usage data into reports, dashboards, and visualizations for analysis, forecasting, and procurement decisions.

### OpenLM Audit

*OpenLM feature*

An OpenLM feature that records access and configuration changes into a complete audit trail, so you can show who used what and who changed which rule.

### OpenLM Compliance

*OpenLM feature*

An OpenLM feature that helps enforce license terms through allowlists and access rules and surfaces overuse, supporting audit readiness. What it guarantees depends on the customer's agreement and configuration.

### OpenLM Directory Sync

*OpenLM feature*

An OpenLM feature that synchronizes users and groups from Active Directory or LDAP so identities stay current across the platform.

### OpenLM Platform

*OpenLM product*

The core OpenLM system that brings real-time and historical usage data from FlexNet, DSLS, Sentinel RMS, Reprise, LM-X, and 100+ other license managers into one interface. Built on microservices, it offers Software License Management, Software Asset Management, dongle and process monitoring, access control, and more as subscribable services.

Establish "OpenLM Platform" before you use "Platform" on its own in the same page or section.

**Related terms:** microservice, Gateway, on-premises

### OpenLM Projects

*OpenLM feature*

An OpenLM feature that groups license usage by project for tracking, reporting, and chargeback across teams and departments.

### OpenLM token

*Platform & architecture*

A form of license entitlement used within OpenLM as a flexible, reusable unit of measure for accessing specific OpenLM features or functionalities.

**Related terms:** license entitlement, token-based licensing

### Optimization (license optimization)

*Licensing concept*

The practice of matching license supply to real demand by reclaiming idle licenses, right-sizing pools, and cutting shelfware. It is the outcome OpenLM is built to deliver.

### Option file (options file)

*Licensing concept*

A FlexNet and compatible configuration file that controls license access policies, such as user or group restrictions, reservations, and borrowing settings. License Access Control compiles rules into an option file and deploys it through the Broker.

Also known as the FlexNet options file.

**Related terms:** LAC, license manager

### Overuse (over-licensing)

*IT, SAM & compliance*

Using more licenses than an agreement permits, which creates compliance and audit risk. OpenLM reports overuse so you can correct it before an audit does.

## P

### Perpetual license

*License model*

A license bought once for indefinite use of a specific software version, usually with an upfront fee and annual maintenance. It is increasingly rare but still common in engineering estates, and OpenLM tracks it alongside subscription and token models. It is available for on-premises deployments only.

**Related terms:** subscription licensing, token-based licensing

### Policy (License Access Control)

*OpenLM component*

In License Access Control, a named collection of rules for a single asset, optionally scheduled. Only one policy is active per asset at a time, which keeps enforcement predictable.

### Process Manager

*OpenLM feature*

An OpenLM component that tracks application process-level usage on workstations, giving detailed visibility into which applications run and consume licenses.

**Related terms:** Process Monitoring, Workstation Agent, usage monitoring

### Process Monitoring

*OpenLM feature*

An OpenLM capability that watches the application processes running on a workstation, including unmanaged software that has no license server. It identifies idle sessions to harvest and detects use of applications outside the license system.

### Procurement

*IT, SAM & compliance*

The process of sourcing and purchasing software and licenses. OpenLM supplies usage evidence, including true denials, utilization, and trends, that strengthens renewal and vendor negotiations.

### Product (OpenLM)

*Platform & architecture*

A distinct OpenLM offering, core or optional, that may consume system resources when activated. Examples include Dongle Monitoring and Software License Management.

Don't confuse a product with a feature, which is a capability of a third-party licensed application.

**Related terms:** feature, OpenLM Platform

### Professional Services (OpenLM Professional Services)

*OpenLM service*

OpenLM implementation, configuration, and integration services that help customers deploy the platform and connect it to their systems.

### Project

*OpenLM feature*

A categorization method in OpenLM that organizes license usage data by team, department, or project for tracking, reporting, and chargeback.

**Related terms:** license chargeback, historical reports

### Project Usage

*Reporting & metrics*

An OpenLM report that attributes license consumption to defined projects, supporting cost allocation and chargeback.

### PTC

*Software vendor*

A vendor of CAD and product lifecycle management software, including Creo and Windchill. OpenLM monitors PTC license usage.

## R

### Real-time reports

*Reporting & metrics*

Reports that provide up-to-date views of current license usage, availability, and denials. OpenLM uses the phrase near real time where collection latency applies.

**Related terms:** historical reports, CCL

### Reclamation (license reclamation)

*Licensing concept*

Recovering licenses that are checked out but unused so others can use them. Reclamation is the result of harvesting idle sessions.

### Redundancy (license server redundancy)

*Licensing concept*

A high-availability setup where multiple license servers back each other up so checkouts continue if one fails. FlexNet three-server redundancy, also called a triad, is a common example, and OpenLM reports redundant configurations.

### Reporting Hub (OpenLM Reporting Hub)

*OpenLM feature*

An OpenLM capability that centralizes reports across products and license managers, giving teams one place to build, schedule, and share license intelligence.

### Reprise RLM (Reprise License Manager)

*License manager*

A widely used commercial license manager from Reprise Software. OpenLM monitors RLM for usage, denials, and expiration.

### RESERVE

*OpenLM component*

An option file directive that sets aside licenses for a specific user, group, or host so capacity is guaranteed under contention. License Access Control creates RESERVE rules, for example to keep premium seats for senior engineers.

### Role

*Platform & architecture*

A definition of the permissions and access levels assigned to users within OpenLM. Roles control who can view data, change rules, and administer the platform.

**Related terms:** user

### Roles & Permissions

*OpenLM feature*

An OpenLM feature that governs what each user can see and do in the platform, supporting least-privilege administration and separation of duties.

## S

### SaaS (software as a service)

*License model*

Software delivered over the internet on a subscription, such as Adobe Creative Cloud or Microsoft 365. SaaS reduces upfront cost but often produces shelfware, which the OpenLM Subscription Optimizer targets.

### SaaS Management (OpenLM SaaS Management)

*OpenLM product*

An OpenLM product that extends visibility and optimization to SaaS subscriptions, so cloud seats are governed alongside on-premises and floating licenses.

### SAM (software asset management)

*IT, SAM & compliance*

The practice of managing and optimizing the purchase, deployment, use, and retirement of software. OpenLM provides the engineering-software usage data that underpins SAM for specialty applications.

**Related terms:** SLM, license compliance, license entitlement

### SAML (Security Assertion Markup Language)

*AI & integration*

A standard for exchanging authentication data that enables single sign-on. OpenLM integrates with SAML identity providers for secure access.

### Sentinel HASP

*License manager*

A hardware- and software-based protection and licensing system from Thales, where HASP stands for Hardware Against Software Piracy. OpenLM monitors Sentinel HASP usage.

### Sentinel RMS

*License manager*

A software license manager from Thales used by many engineering applications. OpenLM monitors Sentinel RMS for usage, denials, borrowing, and expiration.

### Sentinel SuperPro

*License manager*

A legacy hardware-key license manager in the Sentinel family. OpenLM monitors Sentinel SuperPro usage and expiration.

### Session

*Licensing concept*

A user's active instance of software use, recorded by OpenLM with details such as start and end time, application, and workstation. Sessions are the raw material for usage and idle-time analysis.

**Related terms:** concurrent usage, CCL, idle time

### Shelfware

*IT, SAM & compliance*

Software an organization has paid for but does not use. Identifying shelfware is a primary way OpenLM customers cut spend at renewal.

### Siemens

*Software vendor*

A vendor of industrial, electronic design, and product lifecycle management software, including NX, Teamcenter, and Siemens EDA tools. OpenLM monitors several Siemens license managers.

### SOC 2

*IT, SAM & compliance*

A security and controls auditing standard for service providers. OpenLM maintains SOC 2 to assure customers about how it handles their data.

### Software estate

*IT, SAM & compliance*

The full set of software an organization owns and runs. OpenLM gives engineering software estates the visibility that general ITAM tools usually miss.

### Software License Management (SLM)

*OpenLM feature*

The OpenLM microservice and discipline focused on monitoring, controlling, and optimizing licenses across vendors. It is the foundation of the OpenLM Platform.

**Related terms:** SAM, license manager, license utilization

### Specialty software

*Industry & domain*

High-cost, domain-specific applications such as CAD, EDA, GIS, and simulation tools that use floating, token, and dongle licensing. Specialty software is OpenLM's focus because general IT tools rarely monitor it.

### SSO (single sign-on)

*AI & integration*

An authentication scheme that lets users sign in once for access to multiple systems. OpenLM supports single sign-on through SAML and directory integration.

### Subscription license

*License model*

A license granting use for a recurring fee over a fixed term. Subscriptions are now the industry standard and shift cost from capital to operating budgets, and OpenLM tracks them to prevent paying for unused seats.

**Related terms:** perpetual licensing, Subscription Optimizer

### Subscription Optimizer

*OpenLM feature*

An OpenLM capability that analyzes usage patterns to flag underused subscription seats, so you can reallocate or cancel them at renewal.

**Related terms:** subscription licensing, Cloud Broker

## T

### Third-party integrations

*OpenLM feature*

OpenLM connections to enterprise systems such as ServiceNow, Salesforce, Monday.com, LDAP, and SAML, so license data and actions flow into the tools teams already use.

### Token (token-based or consumption license)

*License model*

A model that charges for use based on tokens drawn per product, feature, or hour, used by programs such as Autodesk Token-Flex. It is flexible but can produce unpredictable cost without monitoring, which OpenLM provides in near real time.

**Related terms:** floating license, OpenLM token

### Token attribution

*AI & integration*

The practice of assigning LLM token consumption to the project, team, or user that caused it. OpenLM AI FinOps uses token attribution to make AI spend transparent and chargeable.

### True denial

*Licensing concept*

A denial that reflects a genuine shortage, after filtering out retries and transient errors that inflate raw denial counts. True denials are the trustworthy signal for whether to buy more capacity, and OpenLM reports them specifically.

### True-up

*IT, SAM & compliance*

A reconciliation, often at renewal or after an audit, where a customer pays for usage that exceeded the licensed amount. Continuous monitoring with OpenLM helps you avoid a surprise true-up.

## U

### UGS (User/Group Service)

*OpenLM component*

An OpenLM service that supplies users, groups, and hosts, backed by Active Directory or LDAP, to features such as License Access Control, which validates rule targets against it.

### Unmanaged process

*OpenLM feature*

An application that runs without a license server to report it. OpenLM Process Monitoring detects unmanaged processes so usage of unlicensed or locally licensed software becomes visible.

### Usage monitoring

*Reporting & metrics*

The process of tracking and recording software usage to analyze and optimize license consumption. It is the foundation of every OpenLM report and optimization.

**Related terms:** license utilization, SLM, session

### User

*Platform & architecture*

An individual who uses licensed applications tracked by OpenLM, with attributes such as name, team, and workstations recorded for reporting and access control.

**Related terms:** role, session, named user license

## V

### Vendor daemon

*License manager*

A FlexNet process, specific to each software publisher, that tracks which features are licensed and how many are in use. It runs under lmgrd on the license server.

### Virtual License Manager (VLM)

*OpenLM product*

An OpenLM product that presents and manages licenses in virtualized and cloud-hosted environments, where traditional license servers are harder to reach.

**Related terms:** license manager, license pool

### Visualization

*Reporting & metrics*

The presentation of license data as charts, heat maps, and dashboards. OpenLM includes visualizations such as pie charts and heat maps to make usage patterns clear at a glance.

## W

### Watch option file

*OpenLM component*

A Broker setting that lets OpenLM observe and manage a license server's option file. It must be enabled before License Access Control can discover and control an asset.

### Workstation

*Platform & architecture*

The computer or device from which a user accesses licensed software, tracked by OpenLM to map license usage across the organization.

**Related terms:** Workstation Agent, user

### Workstation Agent

*OpenLM component*

The OpenLM client installed on end-user workstations to collect software license usage data and transmit it to the OpenLM Platform. It reports application- and feature-level activity, detects idle sessions, and supports dongle and process monitoring. License Access Control can require an active Workstation Agent before it allocates individual-user licenses. Formerly called the Agent (OpenLM Agent).

**Related terms:** Agents Hub, Process Manager, workstation
