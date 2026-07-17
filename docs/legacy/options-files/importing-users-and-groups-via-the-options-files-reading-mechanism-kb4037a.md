---
title: Importing users and groups through the options files reading mechanism - KB4037a
description: Table of contents.
sidebar_label: "Importing users and groups through the Options files reading mechanism - KB4037a"
sidebar_position: 3
---

{/* Source: https://www.openlm.com/knowledge-base/importing-users-and-groups-via-the-options-files-reading-mechanism-kb4037a/ */}

* [License Allocation Manager (Option Files)](https://www.openlm.com/knowledge-base-category/options-file-management/ "License Allocation Manager (Option Files)")
* Importing users and groups through the Options files reading mechanism - KB4037a

Table of contents 

* [Background](#0-toc-title)
* [Starting point](#1-toc-title)
* [Procedure](#2-toc-title)

## Background [#](#0-toc-title)

Customers have requested a method to easily introduce lists of users and organize them as members of groups in the OpenLM database. This request was especially relevant for large lists of users who could not be explicitly determined in any LDAP group or attribute.

OpenLM has a few methods of [introducing different entities into its database](https://www.openlm.com/knowledge-base/introducing-entities-in-openlm-users-groups-ip-and-hosts/). This Application note elaborates on such a method that makes use of the OpenLM capability of reading FlexLM Options files.

## Starting point [#](#1-toc-title)

Prior to this procedure, we only had users U1, …, U6 as members of the OpenLM Everyone default group. We wanted to introduce them into the MYTESTGROUP group, and add some new users NEWUSER1 , …, NEWUSER4 in the process.

## Procedure [#](#2-toc-title)

1. You will need to have the OpenLM Broker installed on one of the FlexLM [license managers](https://www.openlm.com/license-manager-capabilities/ "license managers") you're already monitoring. It does not matter which one. See the required configuration in the following image.

![OpenLM Broker configuration required on a monitored FlexLM license manager for Options file reading.](/img/legacy/kb/options-file-watch-broker.png)

2. Create a demo - Options file on that machine. The format of this file should be like this:

```text
GROUPCASEINSENSITIVE ON

GROUP MYTESTGROUP U1 U2 U3 NEWUSER1 NEWUSER2

GROUP MYTESTGROUP U4 U5 U6 NEWUSER3 NEWUSER4

```

Translation:

GROUPCASEINSENSITIVE : users and group names would be case insensitive.

GROUP MYTESTGROUP : The group line was broken on purpose. This is because FlexLM has a restriction of 200 characters on the Group lines' length. To add more users to that group, it needs to be broken into smaller portions.

3. In **EasyAdmin → Start → Administration → Options Files → select an entry and open Edit**, set OpenLM to read from the Options file in the "Direction of Option file data flow" dialog frame. If you are currently configured to actively manage Options by the EasyAdmin Options files interface - remember to revert back to writing Options files after this procedure is finished. See the following image for clarification. Select **Save**.

![EasyAdmin Direction of Option file data flow dialog set to read from the Options file.](/img/legacy/kb/Screenshot-2023-03-13-at-18.06.46.png)

4. Make sure the EasyAdmin start → Options file  → Options file management window recognizes the Options file you have configured on the Broker machine. You can read more about [Options files configuration here](https://www.openlm.com/knowledge-base/options-file-management-using-openlm-easyadmin-kb4007/).

5. After that - The OpenLM Group should appear as defined in the Options file.
