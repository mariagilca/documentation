---
title: "Data structure"
description: Download the Reporting Hub Data Structure video.
sidebar_position: 2
---

[Download the Reporting Hub Data Structure video](https://www.openlm.com/wp-content/uploads/2017/10/Reporting-Hub-Data-Structure.mp4)

## **Dimensions**

### Calendar dimension

Holds time and date fields:

- **Date** - full date in date format (format by year, quarter, month, day, free form)
- **Date\_string** - date in string format (example "09-01-2017")
- **Date\_string\_long** - named date as string (example "Jan 9th 2017")
- **Is\_weekend** - is the date a part of the weekend
- **Is\_holiday** - is the date a part of a holiday
- **Week\_yyyyww** *-* week of the year (YYYY-01 to YYYY-51).
- **Day\_of\_month** - day of the month (1 - 31).
- **Day\_of\_week** - day of the week (Sunday to Saturday).
- **Day\_of\_year** - day of the year (1 - 365)
- **Month** - month of the year (January - December)


### License dimension

Holds fields with information related to licenses.

- **License\_server** - license server
- **License\_vendor** - vendor
- **License\_feature** - feature
- **License\_description** - product name
- **License\_type** - license type
- **License\_version** - version
- **License\_additional\_key** - additional key
- **License\_expiration\_date** - Expiration date of the license (Blank means ongoing)


### Package dimension

Holds license package information.

- **Package\_vendor** - Vendor name of the package
- **Package\_feature** - Package feature name
- **Package\_description** - Package descriptive name
- **Package\_versions** - Package version
- **Package\_is\_fixed** - Package set as fixed


### Project dimension

Holds project information.

- **Project\_allocated\_time** - Time from start of project
- **Project\_create\_date** - Project creation date
- **Project\_end\_time** - Project expiration time
- **Project\_name** - Project name
- **Project\_percent\_done** - How much of the project is done.
- **Project\_priority** - Project priority
- **Project\_source** - Where was the project loaded from
- **Project\_start\_time** - Project starting time
- **Project\_valid** - is project activated


### Group dimension

Holds group information.

- **Group\_name** - group name.
- **Group\_source** - source of the group (License output / LDAP).
- **Group\_valid** - is group set as activated.

### User dimension

Holds information related to users, such as - Full user name, department, office, address and so on.

- **User\_name** - user name.
- **User\_first\_name** - user first name.
- **User\_last\_name** - user last name.
- **User\_display\_name** - selected display name for user.
- **User\_title** - job title.
- **User\_department** - organizational department.
- **User\_phone\_number** - user phone number.
- **User\_description** - user description.
- **User\_office** - user office.
- **User\_email** - user email.
- **User\_source** - source of the user (License output / LDAP).
- **User\_valid** -  is user set as activated.


### Workstation dimension

Holds all workstations.

- **Workstation** - workstation hostname

## **Raw measures**

### Raw usage measure

Holds total session duration, without any aggregation.

- **Usage\_time** - total session duration (do not query by time)
- **Num\_of\_licenses\_used** - number of licenses pulled on a single session (tokens)
- **Borrowed** - was a license borrowed for this session.

### Raw denials measure

Holds denials, without any aggregation.

- **Count(denial\_id)** - count of denials.
- **Major\_error** - denial major error code
- **Minor\_error** - denial minor error code
- **Hour\_of\_day** - denial hour of day (only for using on denials)
- **Error\_message** - detailed error message for the denial.


### Raw idle time measure

Holds total idle time periods, without any aggregation.

- **Idle\_time** - idle time periods

## **Calculated measures**

### Feature usage measure

Holds daily usage time and concurrent usage.  (features with one version only)

- **Usage\_time** - session duration cut by days.
- **Concurrent\_usage** - concurrent usage (per single feature selected).
- **Num\_of\_licenses\_used** - number of licenses pulled on a single session (tokens)
- **Borrowed** - was a license borrowed for this session.

### Feature idle time measure

Holds daily idle time periods. Use this measure to summarize different features and license servers.

- **Idle\_time** - idle time cut by days.


## **Daily measures**

### Daily concurrent measure

Holds daily maximum concurrent usage. Use this measure to summarize different features and license servers. (features with one version only)

- **Max\_concurrent\_usage** - daily maximum concurrent usage.

### Daily concurrent measure all versions

Holds daily maximum concurrent usage. Use this measure to summarize different features and license servers. (features with several versions)

Acts as the "Select All Versions" in EasyAdmin.

- **Max\_concurrent\_usage\_all\_versions** - daily maximum concurrent usage for features with more than one version.

### Daily quantity measure

Holds daily maximum license quantity for accurate daily license quantity information

- **Max\_license\_quantity** - Daily license quantity per license.


## **Unused tables**

These tables are auxiliary tables for the usage of the ETL only, and should not be used in any report.

- **Version\_Table table** - Holds the ETL version and last ETL run time.
- **Quantity\_Dimension table** - Holds all license procurements, but is not structured to be in a report, only to assist the ETL.
- **Unfinished\_Sessions\_Aux** - Holds all the ID's for unfinished sessions.
