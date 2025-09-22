---
title: OpenLM usability report files
sidebar_position: 7
description: Overview of OpenLM usability report files and their configuration.
---

## General
OpenLM deals with pieces of license usage information that originate from multiple sources, and may prove contradictory to each other. We apply our hard-earned experience to reconcile such contradictions, and to present valid license usage reports.

## Usability reports
OpenLM reconciles license usage data from multiple sources to provide accurate reports. When conflicting information is encountered, OpenLM creates a usability report to help diagnose the issue.

How to access
A system message will appear as an envelope icon in the EasyAdmin user interface.

Click the icon to download the report. You'll be prompted to send the file to the OpenLM support team at support@openlm.com.

The report is saved as a zip file in your downloads folder. The filename includes the day of the week (e.g., usability_report_sunday.zip). The system notification will persist until the zipped report file is no longer in the download folder.

## File policies
The OpenLM Server follows these policies for usability report files:

Reports are kept for 3 days.

A maximum of 2 reports can be downloaded per day.

Zipped files are not expected to exceed a few megabytes.

If you change the default download folder for these reports, ensure the OpenLM Server service has the necessary access permissions for the new location.

## Email notification
Administrators can receive email notifications when a new report is available. The email account for these notifications is configured in the EasyAdmin user interface via Start → Administration → Email.

Referenced Images
img/easyadmin-usability-report-icon.png

img/easyadmin-email-configuration.png