---
title: "OpenLM usability report files"
sidebar_position: 7
---
## General

OpenLM deals with pieces of license usage information that originate from multiple sources, and may prove contradictory to each other. We apply our hard-earned experience to reconcile such contradictions, and to present valid license usage reports.

## Usability reports

In the event that such a contradiction is encountered, a usability report file will be created, and the EasyAdmin User Interface web application will present it as a system message (envelope icon), as shown in the following image.

![Screenshot: Usability reports](/img/legacy/word-image-26349-1.png)

The user will be prompted to download the report and send it by mail to the OpenLM support team, at support@openlm.com

Usability report files will be saved in the download folder as zip files, and their name will contain the day of week; for example, **usability\_report\_sunday.zip**.

The system notification (envelope icon) indication will persist as long as zipped usability report files exist in the download folder.

## Files policies

The OpenLM Server implements the following policy on the downloaded usability report files:

1. Usability report files will be kept in the folder for 3 days.
2. There will be no more than 2 reports downloaded per day.
3. The size of zipped files are not expected to exceed a few Megabytes.

In case the EasyAdmin user chooses to designate a folder other than the default for downloading usability report files, they would need to ensure the OpenLM Server service possesses the appropriate access permissions to the said folder.

## Email notification

Administrators may be notified regarding the existence of report files to be downloaded through email. The email account for such notifications is set up through EasyAdminUser Interface through **Start → Administration → Email** window, as depicted below.

![Screenshot: Email notification](/img/legacy/Screenshot-2023-01-24-at-21.39.17.png)
