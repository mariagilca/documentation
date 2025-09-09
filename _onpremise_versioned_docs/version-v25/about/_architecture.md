---
sidebar_position: 1
---


# OpenLM System Architecture

OpenLM is a licensing management software company with an international install base and a focus on Software License Management (SLM) solutions for engineering applications. Companies that use OpenLM’s software range from global corporations to small offices, as OpenLM is fully modular and allows for selecting components according to the client’s requirements.

OpenLM’s commitment to innovation guarantees that our clients constantly receive updates with the most advanced technology and get assisted by our highly dedicated support team. 

## Customer Testimonials

Review case studies and full testimonials from OpenLM customers.

## OpenLM Solution

OpenLM’s solution provides a comprehensive management solution for license management software such as FlexLM and DSLS (supported license servers).

OpenLM allows for assessing software license productivity and utilization, which benefits system administrators, high-level managers, and end-users alike. OpenLM supports major trends in the field of license management, such as:

- License consolidation
- Usage chargeback (usage billing)
- Usage trend analysis

OpenLM software provides a comprehensive solution that combines cutting-edge technologies, superior support personnel, easy implementation, and conclusive consulting services to help reduce licensing costs and avoid software audits. OpenLM can be modified and customized to fit specific customer requirements, optimizing the licensing system and increasing software productivity even beyond the basic configuration.

## OpenLM System Components

OpenLM’s basic software package includes:

- **OpenLM SLM module** and its user interface
- **OpenLM EasyAdmin module**

Additional modules included (but not mandatory):

- **OpenLM Broker**
- **OpenLM Workstation Agent**
- **OpenLM Personal Dashboard**

These components are not required for the OpenLM system to function and it can connect directly to the license manager.

OpenLM also includes several optional modules and capabilities, commonly referred to as **OpenLM features**.

## OpenLM for Software Licenses Management

### Block Diagram

The image below represents a generalized block diagram of OpenLM’s license management solution:



OpenLM EasyAdmin is the administrative interface of the OpenLM system. It includes:

- Automatic extraction of statistical license usage from license servers
- Streamlined UI for ease of use
- Role-based security for access control
- Compatibility with all modern browsers (Chrome, Firefox, Edge)
- Touch-friendly interface for mobile OS (Android, iOS, Blackberry, Windows Mobile)
- OpenLM EasyAdmin Mobile app for crisis situations


## OpenLM SLM

OpenLM SLM is the core element of the OpenLM system. It:

- Integrates with EasyAdmin, Agent, Alerts, and Broker
- Collects and stores information in an embedded relational DB
- Is implemented as a Windows service
- Supports monitoring multiple license servers over LAN/WAN
- Comes with an embedded MariaDB (for trial)
- Supports external databases like SQL Server and MySQL



<!-- ![Server Structure 2 of OpenLM’s license management solution](/img/legacy/server-structure-2.png) -->
## OpenLM EasyAdmin User Interface

## Identity Service

The Identity Service provides central access control for OpenLM’s browser UI. It:

- Authenticates communication between components and SLM
- Manages user accounts and permissions
- Has its own dedicated database

## OpenLM Broker

OpenLM Broker is an optional component that runs on the license server. It:

- Queries and pushes license usage info
- Retrieves log data and denial events
- Controls license servers (start/stop/reread)
- Manages FLEXlm option files
- Supports WAN configurations
- Extracts package and expiration data
- Is Java-based and cross-platform (Windows, Linux, UNIX)

## OpenLM Workstation Agent and Personal Dashboard

These end-user tools provide:

- Self-check license availability
- User and license holder details
- LDAP-based user information
- Notifications when licenses become available
- Workstation reporting via IP


# OpenLM Software License Management – Features

## Directory Synchronization

- Imports user details from LDAP (Active Directory)
- Works with multiple AD domains
- Syncs on a defined schedule
- Requires: OpenLM SLM and LDAP provider

## Group Usage

- Reports license usage by group
- Groups can be custom or AD-synced
- Grouping methods: AD, CSV, Options File, manual
- Requires: OpenLM SLM (and AD Sync extension if using AD)

## Project Usage

- Reports usage by project
- Users choose project when pulling a license
- Supports project-based billing
- Requires: OpenLM SLM + OpenLM Agent

## Roles and Permissions

- Define admin roles and assign to users
- Optional Windows Authentication
- Requires: OpenLM SLM + SMTP for email auth

## Actual Usage

- Reports idle vs active usage per user/session
- Tracks CPU and data I/O
- Requires: OpenLM SLM + OpenLM Agent

## Applications Manager

- Monitor/control any software regardless of license model
- Define rules for app session control
- Requires: OpenLM SLM, Agent, Broker, and Applications Manager

## License Allocation Manager

- GUI for managing FlexLM Options Files
- Remotely deploy changes
- Requires: OpenLM SLM + Broker

## Alerts Management

- Set triggers for various events (e.g., license expiration, 90% usage, server down)
- Automate license manager actions
- Requires: OpenLM SLM + SMTP server

## Report Scheduler

- Auto-generate and email reports
- Output formats: CSV or PNG
- Requires: OpenLM SLM + Report Scheduler

## DB Support

- Supports SQL Server, MariaDB, and MySQL
- Requires: OpenLM SLM + appropriate DB server


