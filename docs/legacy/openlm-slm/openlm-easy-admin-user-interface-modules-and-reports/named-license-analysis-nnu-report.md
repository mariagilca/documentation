---
title: "Named License Analysis (NNU) report"
sidebar_position: 3
---
The Named License Analysis (NNU) report provides an overview of the license allocation and consumption of your FLEXlm named licenses.

This report has benefits for administrators as it allows them to determine the real usage of an organization's named licenses, which can help with license planning and reducing costs. After running the report and analyzing the results, the administrator can decide whether to assign more users to NNU licenses, reduce the load of floating licenses, or purchase additional licenses.

This report also serves as a self-auditing tool by displaying whether the named licenses are being used as per the vendor agreement or not, thus preventing license breaches in time to avoid costly penalties and legal fees.

## Launching the NNU report

The Named License Analysis (NNU) report can be displayed by going to **EasyAdmin Start → Reports → Named License Analysis (NNU)**

![Screenshot: Launching the NNU report](/img/legacy/Screenshot-2023-03-14-at-09.53.16.png)

## Report filters and options

### Include current activity\*

This check box toggles whether the report should include session activity for named licenses that are included in the selected Date filter but which are still open.

***\**** *This option is only present when viewing the report in "View by → Usage" mode.*

### View by

There are three types of views that you can choose from when displaying results:

**1. By allocation** - provides a high-level view of NNU licenses, displaying information such as what kind of licenses there are, their total amount and how many of them are in use. Use this view to drill down to a specific feature and display the current status of the license allocation.

![Screenshot: View by](/img/legacy/Screenshot-2023-03-14-at-09.56.23.png)

*The Named License Analysis (NNU) Report showing the Allocation view*

**2. By usage** - provides a detailed view of the NNU licenses. You can see information such as to whom the license is allocated to, the last time it was in use and the duration of this usage.

![Screenshot 2: View by](/img/legacy/Screenshot-2023-03-14-at-09.57.53.png)

*The Named License Analysis (NNU) Report showing the Usage view*

**3. Not in use** - provides a detailed view of the NNU licenses that have been least used and not in use during a specific period

![Screenshot 3: View by](/img/legacy/Screenshot-2023-03-14-at-11.38.46.png)

*The Named License Analysis (NNU) Report showing the Not In Use view*

### Vendor name

This filter setting allows the administrator to filter named licenses by vendor name.

### Server name

This filter setting allows the administrator to filter named licenses by the license manager server.

### Asset-info

This filter setting allows the administrator to filter named licenses by the pool to which they belong in order to see allocation status and usage data.

### License model

This filter setting allows the administrator to filter named licenses by the license model they belong to. This is determined from the vendor license file, where each asset-info pool has one of these two flags:

- **NamedUser** - indicating that the license allocation is done per user
- **HostBased** - indicating that the license allocation is done per workstation

### Features

This filter setting allows the administrator to filter users by the feature (application) license assigned to them.

### Users

This filter setting allows the administrator to see full usage statistics for a specific user. It can also show the currently allocated named licenses for a user when used in conjunction with the Date filter set to "Today".

### Date

This filter allows the administrator to specify the period when selecting data for the report generation.
