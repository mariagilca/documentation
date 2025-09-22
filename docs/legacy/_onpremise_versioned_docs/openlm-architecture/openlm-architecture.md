

# OpenLM: A Software License Management Solution

OpenLM is a licensing management software company that provides Software License Management (SLM) solutions for engineering applications. OpenLM's software is used by a wide range of companies, from global corporations to small offices. Its modular design allows clients to select components that fit their specific needs.

OpenLM is committed to innovation, providing clients with regular updates and dedicated support. Below is an overview of the OpenLM System Architecture.

## Customer Testimonials

Review [case studies](https://www.openlm.com/openlm-case-studies/) and full testimonials from OpenLM customers.

## OpenLM Solution

OpenLM's solution provides comprehensive management for various license management software, such as FlexLM and DSLS. OpenLM enables the assessment of software license productivity and utilization, benefiting system administrators, high-level managers, and end-users. The software supports key trends in license management, including license consolidation, usage chargeback, and usage trend analysis.

The OpenLM software offers a complete solution with advanced technologies, exceptional support, easy implementation, and conclusive consulting services. This ensures that you can reduce licensing costs and avoid software audits by vendors. OpenLM's components can be customized to fit any customer's specific requirements, optimizing the licensing system and boosting software productivity.

## OpenLM System Components

The basic OpenLM software package includes the OpenLM SLM module and its user interface, the OpenLM EasyAdmin module.

The OpenLM Broker, OpenLM Workstation Agent, and Personal Dashboard modules are also part of the basic package but are not mandatory for installation. The OpenLM system can function without these two components and can connect directly to the license manager without any special extensions or configurations.

The OpenLM software package also includes several optional modules and capabilities, known as [OpenLM features](https://www.openlm.com/openlm-extensions/).

## OpenLM For Software Licenses Management

### Block Diagram

This generalized block diagram shows OpenLM's license management solution:

### OpenLM EasyAdmin User Interface

OpenLM EasyAdmin is the administrative interface of the OpenLM system. Its control panel features a desktop interface for configuring the OpenLM SLM, which is OpenLM's core component.

Key features of EasyAdmin:

  - Automatically extracts statistical license usage information from all connected license servers.
  - Streamlined user interface for simple and effective use.
  - Role-based security to grant varying access levels to different user groups.
  - Runs on all modern web browsers (Google Chrome, Firefox, and Microsoft Edge) and can be accessed from any machine in the organization.
  - Touch interface compatible with mobile operating systems like Android, iOS, Blackberry, and Windows Mobile, useful for after-hours crisis management.

### OpenLM SLM

OpenLM SLM is the core of the OpenLM system. It integrates the functions of all other peripheral components, such as OpenLM EasyAdmin, OpenLM Agent, OpenLM Alerts, and OpenLM Broker. It is responsible for collecting information from various system components and storing it in an embedded relational database.

  - The OpenLM SLM is a Windows service that can be installed on any network server.
  - It enables the monitoring and management of multiple license servers over LAN or WAN networks.
  - Common configurations range from one or more license managers nationwide to multiple license servers worldwide, across different time zones.
  - OpenLM SLM comes with an embedded MariaDB database for trial purposes. It also fully supports external databases like Microsoft SQL Server and MySQL.

### Identity Service

The Identity Service is a central access control point for OpenLM's browser UI. It provides secure authentication between each component and the OpenLM SLM, manages user accounts, and ensures overall software security. This service uses its own dedicated database for these functions.

### OpenLM Broker

OpenLM Broker is an optional component that runs on the license server machine. It performs tasks dictated by the OpenLM SLM and is required for advanced licensing information and sophisticated capabilities.

The Broker's tasks include:

  - Querying license usage information locally on the License Manager machine and pushing it to the OpenLM server.
  - Obtaining license usage and denial information from the License manager's log file and pushing it to the OpenLM server.
  - Remotely controlling license servers (e.g., start/stop/reread).
  - Managing FLEXlm option files.
  - Supporting complex configurations, such as license servers on WAN networks.
  - Obtaining information from FLEXlm license files, including packaging information and expiration dates.

The Broker is an independent Java-based software module that can run on any license server operating system (UNIX, Linux, or Windows).

### OpenLM Workstation Agent and Personal Dashboard

The [OpenLM Workstation Agent and Personal Dashboard](https://www.openlm.com/knowledge-base/end-user-services-personal-dashboard-agent-installation-and-configuration/) are end-user tools deployed on workstations. They provide the following capabilities to both admins and end-users:

  - End-users can query license availability.
  - Check which users are currently holding required licenses.
  - View a user's full details from the LDAP and communicate with them about license availability.
  - Receive notifications when requested licenses become available.
  - Admins receive reports on workstation availability and usage via IP addresses.

## OpenLM Software License Management - Features

### Directory Synchronization

  - Directory Synchronization imports user details from an LDAP provider like Windows Active Directory, including hostnames, usernames, OUs, and groups.
  - Synchronization frequency is customizable and works with multiple corporate AD domains.
  - Requires OpenLM SLM and an LDAP provider (eDirectory, Active Directory, Novell, Apache).

### Group Usage

  - Group Usage provides usage reporting by group. Groups can be custom-defined in OpenLM or based on organizational workgroups.
  - Organizational groups can be synchronized using Active Directory, a CSV file, the FlexLM "Options File," or manually.
  - Requires only the OpenLM SLM component to group users. If using Active Directory, the "Active Directory Synchronization" extension is also required.

### Project Usage

  - Project Usage offers usage reporting by project. Projects are defined in OpenLM, and users of engineering software can be required to select the appropriate project when pulling a license.
  - Enables license usage aggregation and filtering by different projects, which is great for project-based license billing.
  - Requires OpenLM SLM on a central server and the OpenLM Agent on end-user workstations.

### Roles and Permissions

  - Roles and Permissions allow you to allocate OpenLM functionality to different administrators. You can define administration roles with various OpenLM capabilities and then assign them to appropriate administrators.
  - Windows Authentication can be enabled to allow users to access OpenLM based on their authenticated credentials in the organization's Active Directory.
  - Requires OpenLM SLM on a central server and a configured organizational SMTP server for email-based authentication.

### Actual Usage

  - Actual Usage reports how much time a license was consumed but not actively used by a user in a session.
  - Idle time monitoring parameters include CPU and data I/O operations per minute for monitored applications, so long, userless processing is not considered idle.
  - Requires OpenLM SLM on a central server and the OpenLM Agent on end-user workstations.

### Applications Manager

  - Applications Manager monitors and controls any software in the organization, regardless of the licensing scheme.
  - Admins can set rules to prevent sessions from starting based on defined criteria, effectively reserving and allocating licenses for all applications.
  - Requires OpenLM SLM on a central server, the OpenLM Agent on end-user workstations, and the Applications Manager and Broker on a separate central server.

### License Allocation Manager

  - License Allocation Manager simplifies the configuration of FlexLM's "Options Files" for incorporating rules and allocations.
  - Remotely deploy changes to Options files using a user-friendly interface that allows for modifying all fields with a simple "click-to-select" interface.
  - Requires OpenLM SLM on a central server and the OpenLM Broker on the license server itself, which interacts with the [FlexLM license manager](https://www.openlm.com/knowledge-base/configuring-openlm-to-interface-the-flexlm-license-manager-kb4001a/) files.

### Alerts Management

  - Alerts Management sends notifications when specific criteria are met, such as a license about to expire, license usage at 90% capacity, the license server being down, or unauthorized license usage.
  - OpenLM allows for automating the system to act on the license manager (e.g., start/stop it) when certain criteria are met.
  - Requires OpenLM SLM on a central server and a configured organizational SMTP server.

### Report Scheduler

  - Report Scheduler automatically and repeatedly generates predefined reports and sends them to specified email recipients on a set schedule.
  - Any report in the EasyAdmin interface can be scheduled to be sent as a CSV file or a PNG image.
  - Requires OpenLM SLM and the Report Scheduler on the same central server.

### DB Support

  - OpenLM SLM fully supports [SQL Server](https://www.openlm.com/knowledge-base/connect-external-database-sql-server-database-ht812/) and MySQL databases as the main OpenLM database.
  - Requires OpenLM SLM on a central server and a database server with SQL Server, MariaDB, or MySQL.