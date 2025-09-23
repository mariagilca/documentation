---
title: "NVIDIA License Manager"
sidebar_position: 12
---
## What is NVIDIA License Manager?

The Nvidia GRID® License manager is used to monitor how many GRID® licenses are in use and how many are required from a capacity planning perspective. NVIDIA has 4 different software offerings that enable the customer to run in a virtual computing mode, and this software is managed by their license manager. There are two license models, either via annual subscription or a concurrent usage version, which requires an annual maintenance fee as well. The way in which the NVIDIA GPU is to be used can also affect the license type: if the customer is using the GPU as a vCS (virtual Compute Server) for AI, high-performance computing, or machine learning, licensing costs are per GPU, rather than per user.

The concurrent license is not restrictive and will allow users to run GRID software without a license and will not deny them access. The customer is also not limited to using the NVIDIA GRID license manager and NVIDIA will accept reliable license tracking data from another method.

**Please note that as of OpenLM Server v4.5, this integration is outdated as the Nvidia License Manager has been replaced with [FlexNet Embedded](../knowledge-base/interfacing-the-flexnet-embedded-license-manager-ht907.md).**

OpenLM provides the following functionality for monitoring NVIDIA licenses:

- Denials reporting *No*
- Report resolution *By minute*
- Borrowed license reporting *No*
- Expiration date reporting *Yes*
- Multiple server redundancy support *No*
- Token license support *No*

NVIDIA is only one of over 70 license managers that OpenLM can manage. [Check the list](https://www.openlm.com/license-manager-capabilities/).

### Who is NVIDIA?

Who would have thought that a company that began by developing graphics accelerator boards for gaming would become an essential hardware provider to a broad range of industries? Engineers and research companies who run simulation software, IT Operations managers who have an extensive virtual machine setup, and any other organization who requires more computing power than a stack of CPUs can provide, depend on NVIDIA GPUs. Although they have competitors, like AMD, NVIDIA has the majority market share. They also provide a license manager to monitor license usage, to ensure that the customer has sufficient capacity to work at maximum efficiency. The license manager is known as the NVIDIA GRID® license manager, and is used to monitor the 4 software editions that NVIDIA provides:-

- GRID vPC (GRID Virtual PC) for a full performance virtual desktop
- Quadro vDWS (Quadro® Virtual Data Center Workstation) - ideally suited to designers and engineers who need to run software like CATIA, SOLIWORKS, Siemens NX, PTC Creo, Autodesk Maya or Schlumberger Petrel.
- GRID vApps (GRID Virtual Applications), which is suited to customers running app streaming solutions such as XenApp.
- NVIDIA vCS (Virtual ComputeServer) for AI, machine learning and high-performance computing. This software is licensed by GPU, rather than by user, unlike the other 3 products.
