---
title: License Allocation Manager - Options File Management Using OpenLM EasyAdmin User Interface
sidebar_position: 2
description: Guide to managing Options Files with OpenLM EasyAdmin.
---


## Overview of options files
FLEXlm (FlexNet Publisher) Options files give license administrators fine-grained control over various operating parameters. They are used to allow, deny, or reserve features for users, user groups, hosts, host groups, and IPs.

With a FLEXlm Options file, you can:

For concurrent (floating) licenses:

Allow or deny the use of features.

Reserve licenses.

For all license types:

Restrict the number of available licenses.

Control the amount of information logged about license usage.

Enable a report log file.

Control the automatic rereading of licenses.

While powerful, managing Options files manually can be error-prone. The OpenLM solution synchronizes with your organization's LDAP (Active Directory) to keep the Options file up-to-date as your user base changes.

## Creating and editing an options file
The Options file is a text file located on the license server. For FLEXlm to read it automatically, it should be in the same directory as the vendor daemon file. The recommended naming convention is vendor.opt (e.g., arcgis.opt for the ESRI ArcGIS vendor). The name should not contain spaces.

## OpenLM Broker configuration
You must install and configure the OpenLM Broker on the license server to edit the Options file using the EasyAdmin web application. A green status indicator on the License servers window in EasyAdmin confirms proper Broker configuration.

You can find the latest OpenLM Broker version on the OpenLM website's downloads section.

After creating the Options file, configure the OpenLM Broker to recognize it:

Open the OpenLM Broker Configuration Tool (Windows Start → All Programs → OpenLM → Broker → OpenLM Broker Configuration Tool).

Expand the License Servers menu.

Expand the Port Node (e.g., Port 27000).

Expand the Vendors file.

Enter the vendor name (e.g., adskflex).

Enter the Options file Path and provide it a name.

Click Advanced>> and check the Watch Options file box.

Click Apply and Restart Broker.

Options file direction
You can set the direction of data flow for the Options file in the EasyAdmin UI.

Go to EasyAdmin Start → Administration → Options Files.

Select the relevant Options file and click Edit. The Edit Options file dialog window opens.

Choose the direction of data flow:

"OpenLM User Interface updates the Options file..." (Write): OpenLM acts as a writer, editing the Options file based on your EasyAdmin configuration.

"Changes made to the Options file..." (Read): OpenLM acts as a reader, importing the content of the Options file (users and groups) into the OpenLM database.

## Options file targets
Options files apply license constraints to specific target categories: Users, User groups, Hosts, Host groups, and IPs.

## Policy: Global settings per server and vendor daemon
Go to EasyAdmin Start → Options file → Opt. File Management.

Select the Policy tab.

Configure the policy settings and click Save.

 Policy settings includ0e:

## GROUPCASEINSENSITIVE (ON / OFF): 
Determines if user and host names are case-sensitive.

## NOLOG {IN | OUT | DENIED | QUEUED}: 
Suppresses logging of specific events to the debug log file.

## REPORTLOG: 
Specifies the report log file for the vendor daemon.

## TIMEOUTALL: 
Specifies the idle timeout for all features, after which an inactive license is reclaimed.

## DEBUGLOG:
 Writes debug log information for this vendor daemon to a specified file.

## Feature settings: 
Apply restrictions per feature
Go to EasyAdmin Start → Options file → Opt. File Management.

Select an Options file (e.g., Windows 7 Autodesk). The Features list will populate.

Select a specific feature (e.g., 85811IDSS_F). The permissions list will populate. You can now create constraints for this feature and apply them to specific users, groups, hosts, etc.

Select a tab from the lower pane (Users, Groups, Hosts, etc.). Click Add to search for and select the entities to which you want to apply constraints.

You can set various permission values, including:

## 0BORROW_LOWWATER:
 Sets the minimum number of licenses that cannot be borrowed.

## LINGER: 
Extends the time a license stays checked out after a check-in or application exit.

## MAX_BORROW_HOURS:
Changes the maximum borrow period for a specific feature.

## MAX_OVERDRAFT:
Limits overdraft usage to less than the amount specified in the license file.

## TIMEOUT: 
Specifies the idle timeout for a feature.

## Setting restrictions per features and specific entities
You can apply restrictions based on Users, Groups, Hosts, Host Groups, and IPs. These include:

Reserved: Reserves a number of licenses for an entity.

Included: Allows an entity to use a feature.

Excluded: Denies an entity access to a feature.

Borrow Included / Excluded: Grants or denies an entity the ability to borrow licenses.

Max: Limits usage for a particular feature or group.

!

## Allow or deny the entire vendor's feature set
In the Options file management window, select the All Features tab.

Add a target entity.

Check the Exclude All or Include All radio button.

Exclude All: Denies access to all features from this vendor daemon.

Include All: Enables access to all features from this vendor daemon.

Click Save.

!

## Editing the options file by keywords
Feature names can be qualified with an optional keyword=value pair to distinguish between multiple feature lines in a license file. This allows for advanced operations such as including or excluding users based on specific license pools.

Expand the Keywords pane.

Select a specific Feature and click Add.

Select a keyword from the dropdown menu and provide a value.

Click OK.

!

### Preview and deploy
Click the Preview button to see how your EasyAdmin configuration will translate to the actual Options file.

To apply the changes to the Options file on the license server, you can either:

Manually: Click the Deploy button.

Automatically: In the Options Files window, select an Options file, click Edit, and check the Enable Options file automatic update box.

After the file is written, the OpenLM Broker's Reread command is automatically invoked to apply the changes.

## Reading options files
As a complementary property, OpenLM can read the Options file to import the organization's users and groups into the OpenLM database.

Go to EasyAdmin Start → Administration → Options Files.

Select a specific Options file.

Click Edit.

Check the "Changes made to the Options File are reflected in the EasyAdmin Options File editor" radio button.

## Monitoring multiple FlexLM license pools
OpenLM can differentiate license usage based on licensing models and license pools. This allows for monitoring licenses for equivalent features bought separately, which form separate "pools" in the license file. The license type and pool are displayed in the "license type" and "Additional key" columns in the Licenses window. For more information, refer to the Multiple FlexLM license pool monitoring document.