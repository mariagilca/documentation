---
title: "Options File management"
sidebar_label: "Options File management Using OpenLM EasyAdmin"
---

{/* Source: https://www.openlm.com/knowledge-base/options-file-management-using-openlm-easyadmin-kb4007/ */}

* [License Allocation Manager (Option Files)](https://www.openlm.com/knowledge-base-category/options-file-management/ "License Allocation Manager (Option Files)")
* Options File management Using OpenLM EasyAdmin

FLEXlm ( [FlexNet](https://www.openlm.com/knowledge-base/flexera-flexlm-flexnet-publisher/ "Flexnet") publisher ) Options files grant license administrators close control over various operating parameters within the constraints of the license model. Licensed features can be dedicated, denied or reserved to users or groups of users, as well as Hosts, IPs, and Host Groups according to the Options file setting.

Employing FLEXlm Options file, the license administrator can:

1. For concurrent (floating) licenses:

* Allow the use of features
* Deny the use of features
* Reserve licenses

2. For all license types:

* Restrict the number of licenses available
* Control the amount of information logged about license usage
* Enable a report log file
* Control the automatic rereading of licenses

FLEXlm Options files are implemented as text files, located on the license server. Although this method fits the licensing requirements well, the process of creating and maintaining Options files is error-prone and difficult to maintain.

The OpenLM solution incorporates synchronization of License administration tools with the organization's LDAP (Active Directory), keeping the FLEXlm Options file up-to-date as users leave or join the organization, or move between groups.

## Creating an Options File [#](#0-toc-title)

1. The Options file should be placed under the same directory as the vendor daemon file, in order to enable FLEXlm to read it automatically. Locating the Options file in a different folder is possible, but this requires FLEXlm to be configured to search for it in that particular location.

2. The recommended name for the Options file is vendor.opt, where vendor is the vendor daemon name ( e.g.: for the ESRI ArcGIS vendor: arcgis.opt is recommended). Note: The name should not contain any blank spaces. Use an underscore ‘\_' to create a separation between words, otherwise name will not register. i.e.: "Vendor name.opt" is not recognized.

## FLEXlm Options file editing [#](#1-toc-title)

When configuring the Options file using OpenLM, the configuration data is presented to the OpenLM Server, and forward by it to the OpenLM Broker, located on the license server machine. The OpenLM Broker updates the Options file.

### OpenLM Broker Configuration

It is necessary to install the OpenLM Broker on the license server machine in order to edit the Options file using the OpenLM OpenLM EasyAdmin User Interface. An indication to proper Broker configuration is the green Status submenu indication on the EasyAdmin License servers window.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201441%20415'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-13.31.03.png)

 

Information about the OpenLM Broker and its installation process is available in the

[Comprehensive Broker Installation Guide](https://www.openlm.com/knowledge-base/openlm-broker-installation-guide-comprehensive-kb4004b/).

The latest OpenLM Broker version is available for download on the [OpenLM website's downloads section](https://www.openlm.com/download/).

After creating an Options file on the license server machine configure the OpenLM Broker to recognize it:

1. Open the OpenLM Broker Configuration Tool installed on the license server machine

(Windows' Start → All Programs → OpenLM → Broker → OpenLM Broker Configuration Tool).

2. In the Broker Configuration Tool window, Click the (+) bullet below the License Servers to expand the License server menu in the configuration window.

3. Click the (+) bullet and expand the Port Node (e.g. Port 27000.)

4. Click the (+) bullet to expand the Vendors file.

5. Input a particular Vendor name (‘adskflex'. Case sensitive)

6. Input in the Options file Path and provide it a name (I left it at its default)

7. Type in the path to the Options file previously created.

8. Click Advanced>> and check the Watch Options file box.

9. Click the Apply and Restart Broker buttons.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20783%20471'%3E%3C/svg%3E)![](/img/legacy/kb/OptionFile_loc.png)

### Options file direction: Write.

2.1. Open the EasyAdmin Start → Administration → Options Files. The "Administration - Options files" dialog window opens.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201920%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-13.35.08.png)

2.2. Select the relevant options file, and click the ‘Edit' button. The "Edit Options file" dialog window opens.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201920%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-13.36.13.png)

On this window, select the direction of data flow:

* "OpenLM User Interface updates the Options file …": OpenLM is acting as a writer, to edit the Options file according to OpenLM EasyAdmin configuration. It is also possible to set a specific time of day at which the Options file would be written on the license manager.
* "Changes made to the Options file …" : OpenLM is acting as a reader, conveying the content of the Options file - its users and groups - to the OpenLM database.

In order to edit Options files - the 1st ("EasyAdmin updates the Options file …") option should be selected (Write).

### Options file targets: Users, User groups, Hosts, Host Groups and IPS

 Options files apply license constraints to certain target categories; namely [Users, User groups, Hosts, Host groups and IPs](https://www.openlm.com/knowledge-base/introducing-entities-in-openlm-users-groups-ip-and-hosts-kb3042/). In order to edit Options files, select a specific Options file, and then apply changes to it.

### Options file Selection

4.1. Open the OpenLM EasyAdmin User Interface

4.2. Click Start → Options file→ Opt. File Admin. The Options file Administration window opens

4.3. Select the specific Options file to be edited (e.g.: Autocad Options file) and click Set

### Policy: Global Settings per Server and vendor daemon

5.1. Open the OpenLM EasyAdmin User Interface.

5.2. Click Start →  Options file → Opt. File Management.

5.3. Select the Policy tab

5.4. Configure the policy text boxes, and click Save to apply changes. See elaboration on each text field below.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201920%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-13.38.43.png)

#### GROUPCASEINSENSITIVE (OFF / ON)

ON: User names and host names specified with the Options File GROUP and HOST\_GROUP keywords respectively, are treated as case insensitive.

OFF (Default): User names and host names are treated as case-sensitive.

#### NOLOG \{ IN | OUT | DENIED | QUEUED \}

Suppresses logging of the selected type of event in the debug log file.  License administrators may use this option to reduce the size of the debug log file, however it can reduce the usefulness of the debug log when debugging license server problems.

* IN / OUT: Turns off logging of license check-ins and check-outs respectively.
* DENIED: Turns off logging of license check-out denials.
* QUEUED: Turns off logging of queued license requests.

#### REPORTLOG

Specifies the report log file for this vendor daemon. It is recommended to precede the report\_log\_path with a ‘+' character to append logging entries; otherwise the file is overwritten each time the daemon is started.

#### TIMEOUTALL

Specify the idle timeout for all features, after which an inactive license is reclaimed. The software publisher sets a minimum value. If a smaller value is set - it is ignored, and the publisher's minimum value is used.

#### DEBUGLOG

Writes debug log information for this vendor daemon to the specified file.

Note that this affects output from only the vendor daemon associated with this options file. The debug log output of lmadmin or lmgrd and any other vendor daemons in the same license file is not captured in this file.

Click Save in order to retain the edited configuration.

### Feature Settings: Apply restrictions per feature

6.1. Open the OpenLM EasyAdmin User Interface, and click Start  →  Options file → Opt. File Management.

6.2. Select a specific Options file, e.g. "Windows 7 Autodesk". The Features list is populated.

6.3. Select a specific subsequent Feature, e.g.: "85811IDSS\_F". The permissions list is populated. You are now able to create license usage constraints per each feature,  and apply these constraints either globally or per specific Users, User groups, Hosts, Host groups and IPs.

6.3a. Select the Users tab form the lower pane.

6.3b. Click the Add icon. The Users search window appears.

6.3c. Mark user(s) from the Users search window, and click the Select icon. The selected users are added (e.g. u1).

6.4. Select as many permission values as needed, and set the value(s) as according to the definitions mentioned here:

#### BORROW\_LOWWATER:

Sets the minimal number of BORROW licenses that cannot be borrowed, i.e: the minimal number of licenses that need to remain as Network licenses. For example, if FEATURE has a count of 10, borrowing is enabled in the application, and BORROW\_LOWWATER = 7 then only 3 licenses may be borrowed. This option is used for licenses held in license files.

#### LINGER:

A lingering license stays checked out for a specified period of time beyond its check-in or FlexEnabled application exit, whichever comes first. This configuration enables users to extend the linger time for a feature beyond its check in.

Note:

* The software publisher sets a minimum linger value. If a value smaller than the minimum is configured, the minimum value is used.
* The linger time may be configured by the software publisher in the FlexEnabled application. When this is the case, the longer linger time is applied.

#### MAX\_BORROW\_HOURS:

Change the maximum borrow period for a specific feature. The new configured period value must be less than that in the license file. This option is used for licenses held in license files.

#### MAX\_OVERDRAFT:

The overdraft policy allows a software publisher to specify a number of additional licenses which users are allowed to use, in addition to the licenses they have purchased. This allows your users to not be denied service when in a "temporary overdraft" state. The MAX\_OVERDRAFT parameter Limits the overdraft usage to less than the amount specified in the license file.

#### TIMEOUT:

Specify the idle timeout for a feature, after which an inactive license is reclaimed. The software publisher sets a minimum value. If a smaller value is set - it is ignored, and the publisher's minimum value is used.

### Setting Restrictions per Features, and specific entities

Some Options file restrictions may be applied according to the following entities: Users, Groups, Hosts, Host Groups and IP's as shown. 

These configurations include:

* Reserved: Reserve licenses per entity (User / User group / Host / Host group of users/hosts).
* Included: Allow a user to use a feature.
* Excluded: Deny a user access to a feature.
* Borrow Included: Allow a user to borrow licenses.
* Borrow Excluded: Deny a user the ability to borrow licenses.
* Max: Limit usage for a particular feature/group-prioritizes usage among users.

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201919%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-17.44.42.png)

### Allow or Deny the Entire Vendor's  Feature Set

It is possible to Allow or Deny an entity (usergrouphosthost groupIP) the entire set of features that a specific vendor daemon serves.

8.1. In the Options file management window, select the All Features tab.

8.2. Add an entity of users (User Group Host Host Groups IP)

8.3. Check the Exclude All or Include All radio button;

* Exclude All: Deny access to all features served by this vendor daemon

* Include All: Enable access to all features served by this vendor daemon

8.4. Click Save

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201920%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-17.46.03.png)

## Editing the Options file by Keywords [#](#2-toc-title)

Feature names can be adjoint to an optional keyword-value pair to fully qualify it. This notation is used for distinguishing a particular group of licenses when there are multiple FEATURE lines for a single feature.

The following syntax is used: feature:keyword=value

For example: f1:VERSION=2.0 specifies the version 2.0 pool of licenses for feature f1.

The following Options file keywords are used as feature name modifiers to denote a specific group of licenses: VERSION, HOSTID, EXPDATE, KEY, SIGN, ISSUER, NOTICE,  VENDOR\_STRING (if configured by the publisher as a pooling component), dist\_info, user\_info and asset\_info.

This enhancement enables advanced operations, such as:

* Including or excluding users and groups to features of specific packages, according to the keywords. For example - the SIGN attribute will differentiate between similar features that reside in different packages.

* Allocating specific Network Named Users' (NNU) licenses:

```
GROUP NNU_MATLAB_USERS User1 User2 User3 User4 User5

INCLUDE MATLAB:asset_info=123 GROUP NNU_MATLAB_USERS
```

In order to apply license restriction by Keyword (see image below for clarification):

9.1 Expand the ‘Keywords' pane

9.2 Select a specific Feature, and click the ‘Add' button.

9.3 Select a keyword from the drop-down menu.

9.4 Provide a value for the new Keyword (e.g. 123), and click ‘OK'

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201920%201080'%3E%3C/svg%3E)![](/img/legacy/kb/Screenshot-2023-03-13-at-17.48.15.png)

### Preview

Click the Preview button to preview the impact of the EasyAdmin Options file configuration on the actual file. The example on item #7 above will yield the following output:

```
MAX_BORROW_HOURS 85811IDSS_F 50

GROUP MYTESTGROUP U2 U3

RESERVE 3 85811IDSS_F USER u1

EXCLUDEALL GROUP MYTESTGROUP
```

### Writing the Options file on the license server

There are two methods to apply the configured change on the actual Options file on the license server's machine:

11.1. Manually: Click the Deploy button.

11.2. Automatically: Through the EasyAdmin Start → Administration → Options Files window: Select a specific Options file, click the Edit button, and check the Enable Options file automatic update box, as described in section 2 above.

After the Options file is written, The OpenLM Broker's Reread command is invoked, so that the changes in the Options file would take effect. Read more about the [Broker commands here](https://www.google.com/url?q=https%3A%2F%2Fwww.openlm.com%2Fapplication-notes-v3-0%2Finstalling-openlm-v3-0%2Fbroker-comprehensive-installation-guide-an4004b%2F&sa=D&sntz=1&usg=AFQjCNHz3s2RLxyv3PyXU24bTr_arcOjSA).

## Reading Options files [#](#3-toc-title)

As displayed above, Options files can be written and updated from the OpenLM EasyAdmin interface to the file resident on the license server machine. As a complementary property, the Options file can also be read by OpenLM, in order to introduce the organization's users and groups to the OpenLM database. In order to do so:

* Click EasyAdmin Start → Administration → Options Files window
* Select a specific Options file
* Click the Edit button
* Set the Options file direction to ‘Read' by checking the "Changes made to the Options File are reflected in the EasyAdmin Options File editor" radio button.

Please refer to this application note for more information on importing users[through Options file reading](https://www.openlm.com/knowledge-base/importing-users-and-groups-via-the-options-files-reading-mechanism-kb4037a/).

## Monitoring Multiple FlexLM license pools [#](#4-toc-title)

Licenses for equivalent features may be bought separately, thus forming separate ‘pools' in the license file, each pool determining specific attributes. OpenLM v3.0 provides a method of differentiating license usage according to the licensing model and license pool. The license type is displayed in the "license type" column (e.g. in the ‘Licenses' window). The license pool is displayed in the "Additional key" column (e.g. also in the  ‘Licenses' window). For additional information please refer to this document:

[Multiple FlexLM license pool monitoring](https://www.openlm.com/knowledge-base/multiple-flexlm-license-pool-monitoring-kb4053/)
