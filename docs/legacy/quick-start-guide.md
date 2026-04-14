---
title: "Quick start guide"
sidebar_position: 2
---
## Introduction

Welcome to OpenLM -  a powerful tool designed to monitor and administer engineering software licenses. It serves organizations that are consumers of licensed software empowers license admins to implement and enforce usage policies and lets them accurately forecast the number of licenses they need to purchase and maintain. It also provides reporting capabilities:

- Availability of licenses to the engineers
- Cost optimization based on compliance
- License management optimization and automation

This quick start guide will walk you through the process of getting started with OpenLM. 

## **System requirements**

Before proceeding with the installation, consult the System Requirements page and make sure you meet them. Keep in mind that OpenLM is a modular software.  
  
  
[https://www.openlm.com/openlm-system-requirements/](https://www.openlm.com/openlm-system-requirements/)

## Overview

OpenLM Software License Management comprises several modules that must be installed in a specific sequence. The installation order for these modules is as follows:

- **OpenLM SLM** - collects information about the usage of the software applications and stores it in an internal relational database. Make sure to have a dedicated supported database. More about that on the system requirements page.
- **OpenLM Identity Service** - a tool that facilitates the user management and authentication of OpenLM products' users. As well as the Server, it requires a dedicated database.
- **OpenLM Broker** - this tool provides added functionality to the OpenLM SLM, such as denials monitoring, and data buffering whenever the OpenLM SLM is unavailable.  An instance should be installed on each license manager server you have.

- **Workstation Agent** - The OpenLM Workstation Agent shows the real usage and the idle time of the engineering applications. It monitors the executables, processes, and URLs. Furthermore, use the Agent to identify idle open sessions and safely release them.

- **End-User Services** - provides a user interface for OpenLM  Workstation Agent, as well as the possibility for the engineers to view license servers and license usage information.

- **Reports Scheduler -** facilitates the generation of predefined reports and submission of these reports to specific recipients according to your preferred schedule.

- **Directory Sync - (DSS and DSA)** allows OpenLM to sync its database with directory services that support the LDAP protocol. The Directory Synchronization Agent (DSA) is the component that runs the sync definitions as received from the DSS.

- **ServiceNow Adapter** - Use the ServiceNow Adapter to integrate OpenLM data into ServiceNow.
- **OpenLM Reporting Hub** - a drag-and-drop interface, that facilitates the flexible aggregation of data and the seamless integration of external data sources to generate comprehensive interaction reports and dashboards.

## **Support and resources**

For additional help and resources, visit the OpenLM website:

- Website: [www.openlm.com](http://www.openlm.com/)
- Customer Support: support@openlm.com

Thank you for choosing OpenLM for your engineering software license management needs. If you have any further questions or feedback, don't hesitate to contact our team.
