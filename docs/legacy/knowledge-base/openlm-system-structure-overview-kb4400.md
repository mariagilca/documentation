---
title: "OpenLM System Architecture"
sidebar_label: "OpenLM System Architecture"
---

<!-- Source: https://www.openlm.com/knowledge-base/openlm-system-structure-overview-kb4400/ -->

# OpenLM System Architecture

[OpenLM](https://www.youtube.com/watch?v=g2Vh83IXa5g) is a licensing management software company with an international install base and a focus on Software License Management (SLM) solutions for engineering applications. Companies that use OpenLM's software range from global corporations to small offices, as OpenLM is fully modular and allows for selecting components according to the client's requirements.

OpenLM's commitment to innovation guarantees that our clients constantly receive updates with the most advanced technology and get assisted by our highly dedicated support team. Below is an overview of the OpenLM System Architecture.

## Customer Testimonials

Review [case studies](https://www.openlm.com/openlm-case-studies/) and full testimonials from OpenLM customers.

## OpenLM Solution

OpenLM's solution provides a comprehensive management solution for [license management software](https://www.openlm.com/software-asset-management/ "license management software") such as FlexLM and DSLS ( [Supported license servers](https://www.openlm.com/license-manager-capabilities/) ).

OpenLM allows for assessing software license productivity and utilization, which benefits system administrators, high-level managers, and end-users alike., as OpenLM supports major trends in the field of license management, e.g.: license consolidation, Usage chargeback (usage billing), usage trend analysis, etc.

OpenLM software provides a comprehensive solution that combines cutting-edge technologies, superior support personnel, easy implementation, and conclusive consulting services, to ensure you reduce licensing costs and avoid software audits by software vendors. OpenLM can be modified and its components can be customized to fit any customer's specific requirements, thus optimizing the licensing system and increasing software productivity even further than OpenLM in its basic configuration.

## OpenLM System Components

OpenLM's basic software package includes the OpenLM SLM module and its user interface; the OpenLM EasyAdmin module.

In addition to these core components, the OpenLM Broker and the OpenLM  Workstation Agent and Personal Dashboard modules are incorporated into the basic software package, but their installation is not mandatory; The OpenLM system can function without the use of these two components and can even be directly connected to the license manager without any other special extension or configuration.

The OpenLM software package also includes several optional modules and capabilities, which are commonly referred to as [OpenLM features.](https://www.openlm.com/openlm-extensions/)

## **OpenLM For Software Licenses Management**

### Block Diagram

The image below represents a generalized block diagram of OpenLM's [license management solution](https://www.openlm.com/software-license-management/ "Software License Management"):

![](/img/legacy/kb/word-image-135.png)

### OpenLM EasyAdmin User Interface

OpenLM EasyAdmin is the administrative interface of the OpenLM system. EasyAdmin's control panel features a desktop interface that enables users to configure the OpenLM SLM; OpenLM's core component. Some of EasyAdmin's main properties are listed below:

* Automatically extracts statistical license usage information from all attached license servers.
* Streamlined user interface design promotes the simple and effective use of its unique capabilities.
* Role-based security enables system administrators to grant varying degrees of access to different groups of users.
* Runs on all modern web browsers including Google Chrome, Firefox, and Microsoft Edge, and can be accessed from any machine in the organization.
* Features a touch interface that is compatible with mobile operating systems like Android, IOS, Blackberry, and Windows Mobile. The OpenLM EasyAdmin Mobile application is particularly useful for after-hours crisis management situations.

[![](/img/legacy/kb/Server_Server_Structure_kb4400.png)](/img/legacy/kb/Server_Server_Structure_kb4400.png)

### OpenLM SLM

OpenLM SLM is the core element of the OpenLM system. It integrates the functionality of all other peripheral system components, such as OpenLM EasyAdmin, OpenLM Agent, OpenLM Alerts, and OpenLM Broker. It is responsible for collecting information from various system components and storing it in an embedded relational DB.

* The OpenLM SLM is implemented as a Windows service and can be installed on any network server.
* OpenLM SLM enables monitoring and managing of multiple license servers, over LAN or WAN networks.
* Common OpenLM SLM configurations may vary from one or more [license managers](https://www.openlm.com/software-license-management/ "license managers") nationwide to multiple license servers located worldwide, over different time zones.
* OpenLM SLM comes with an embedded MariaDB database for trial purposes. External databases like Microsoft SQL Server and MySQL are fully supported.

[![](/img/legacy/kb/Server_Structure_kb4400-3.png)](/img/legacy/kb/Server_Structure_kb4400-3.png)

### Identity Service

The Identity Service serves as a central access control point for OpenLM Software's browser UI. It facilitates secure authentication between each component and the OpenLM SLM, manages user accounts, and ensures the overall security of the software. Additionally, the Identity Service utilizes its own dedicated database to carry out these functions

### OpenLM Broker

OpenLM Broker is an optional component that runs on the license server machine. The Broker performs tasks as dictated by OpenLM SLM, and is required in order to provide advanced licensing information and sophisticated abilities. The Broker's tasks include:

* Query License usage information locally on the License Manager machine. Push this information to the OpenLM server.
* Obtain license usage and license denial information from the License manager's log file, and push it to the OpenLM server.
* Control license servers remotely (e.g. start/stop / reread the servers)
* Manage FLEXlm option files.
* Support complex configurations, e.g. license servers that work over WAN networks.
* Obtain information from FLEXlm license files, such as packaging information and expiration dates

* The Broker is an independent java based software module that can run on any license server operating system: UNIX, Linux, or Windows.

[![](/img/legacy/kb/Server_Broker_Structure_kb4400.png)](/img/legacy/kb/Server_Broker_Structure_kb4400.png)

### OpenLM Workstation Agent and Personal Dashboard

[OpenLM  Workstation Agent and Personal Dashboard](https://www.openlm.com/knowledge-base/end-user-services-personal-dashboard-agent-installation-and-configuration/)are the end-user tools of the OpenLM system, which is deployed on the workstations and provides both admins and end-users with the following capabilities:

* End users can query license availability by themselves.
* Check which users are holding the required licenses.
* View a user's full set of details as they appear on the LDAP, and communicate with users regarding license availability.
* Receive license availability notifications as soon as requested licenses become available.
* Admins receive reporting on workstation availability and workstations in use via the IP address.

[![](/img/legacy/kb/Server_Agent_Structure_kb4400-3.png)](/img/legacy/kb/Server_Agent_Structure_kb4400-3.png)

## **OpenLM Software License Management -****Features**

### Directory Synchronization

* Directory Synchronization lets you import user details from an LDAP provider such as Windows Active Directory, including host and user names, OUs, and groups.
* Synchronized according to the frequency you specify (doesn't require anything else) and works with multiple corporate AD domains.
* Requires OpenLM SLM and an LDAP provider (eDirectory, Active Directory, Novell, Apache).

### Group Usage

* Group Usage gives you a usage reporting option by the group. Groups can be custom-defined in OpenLM or based on organizational workgroups.
* Organizational groups can be synchronized and created using Active Directory, using a CSV file, using the FlexLM "Options File", or simply grouping users manually.
* Requires only the OpenLM SLM component in order to group users, unless using an Active directory, in which case the "Active Directory Synchronization" extension is required.

### Project Usage

* Project Usage gives you a usage reporting option by the project. Projects are defined in OpenLM and users of engineering software can be forced to select the appropriate project when pulling a license.
* Enables license usage aggregation and filtering by different projects running in the organization, great for project-based license billing.
* Requires having the OpenLM SLM component installed on a central server, and the OpenLM Agent installed on the end-user workstations.

### Roles and Permissions

* Roles and Permissions let you allocate OpenLM functionality to different administrators. First, define administration roles with different OpenLM capabilities and then grant roles to appropriate administrators as necessary.
* Windows Authentication can be enabled to allow users to access OpenLM within their role, based on authenticated credentials found in the organization's Active Directory.
* Requires having the OpenLM SLM component installed with the organizational SMTP server configured, for email-based authentication.

### Actual Usage

* Actual Usage lets you report how much time a license was consumed but not actually used by a specific user in a specific session.
* Parameters for monitoring user idle times include CPU and data IO operations per minute allocated to the applications being monitored, so long userless processing runs will not be considered idle.
* Requires having the OpenLM SLM component installed on a central server, and the OpenLM Agent installed on the end-user workstations.

### Applications Manager

* Applications Manager allows for monitoring and control of any software in the organization regardless of the licensing scheme in effect.
* Admins can set up rule sets for preventing sessions from initiating according to criteria they define, effectively reserving and allocating licenses to all applications, regardless of their licensing policy.
* Requires having the OpenLM SLM on a central server, the OpenLM Agent on the end-user workstations, and finally, the Applications Manager and Broker on a separate central server.

### License Allocation Manager

* License Allocation Manager gives you an easy way to configure FlexLM's "Options Files" for incorporating different rules and allocations with ease.
* Remotely deploy changes to Options files using a user-friendly interface, which allows for modifying all fields of the Options file using a simple "click-to-select" interface.
* Requires having the OpenLM SLM on a central server, and the OpenLM Broker on the license server itself, interacting with files of the [FlexLM license manager](https://www.openlm.com/knowledge-base/configuring-openlm-to-interface-the-flexlm-license-manager-kb4001a/ "FLEXlm license manager").

### Alerts Management

* Alerts Management enables receiving notifications when certain criteria are met such as license about to expire, license used to 90% capacity, the license server is down, unauthorized license usage detected, and more.
* OpenLM allows for automating the system to act on the license manager when certain criteria are met (Start / Stop license manager).
* Requires having the OpenLM SLM on a central server and an organizational SMTP server to be configured.

### Report Scheduler

* Report Scheduler allows for the automatic and repeating generation of predefined reports, and submission of these reports to predefined email recipients on predefined schedules.
* Schedule any report in the EasyAdmin interface to be sent out by email to any recipient as a CSV file or a PNG image of the report.
* Requires having the OpenLM SLM and the Report Scheduler on the same central server.

### DB support

* OpenLM SLM fully supports  [SQL Server](https://www.openlm.com/knowledge-base/connect-external-database-sql-server-database-ht812/) and MySQL databases as the main OpenLM database.
* Requires having the OpenLM SLM on a central server and a database server holding either an SQL Server, MariaDB, or MySQL.

Tags:[OpenLM System Architecture](https://www.openlm.com/docs/tag/openlm-system-architecture/)
