---
title: OpenLM Group Usage Configuration
sidebar_position: 1
description: Guide to configuring group usage monitoring in OpenLM.
---

## Adding users to a group manually
To manually add users to a group in OpenLM:

Ensure you have a single OpenLM SLM installation on a central network server.

Go to Windows Start → OpenLM → OpenLM User Interface → Start → Users & Groups → Groups.

Click Add Group, name the group, check the Add Under Current Node box, and click Save.

Select the new group, click Members, then click Add to select and add users.

## Upload a CSV file
To upload users and groups using a CSV file:

Ensure you have a single OpenLM SLM installation on a central network server.

Download and unzip the CSV insert tool on the same server as OpenLM SLM.

Set the JAVA_HOME variable.

Edit the config.properties file, entering your OpenLM SLM admin login and password. Also, set the csv.format.delimiter to match your CSV file's delimiter.

Save the changes.

Edit the groups.csv file, entering a consecutive ID, Name, and ParentId for each group.

Edit the datasource.csv file, entering user details for each column. Specify the group ID for the Groups and DefaultGroup columns.

Double-click the Start import.bat file.

Verify the new users and groups in the OpenLM User Interface by navigating to Start → Users and Groups → Users and Start → Users and Groups → Groups.

## Configure group usage - Options File
To configure group usage via an Options File:

Ensure you have a single OpenLM SLM installation on a central network server.

Ensure you have an OpenLM Broker installation on your license servers and that the Brokers are configured.

Go to Windows Start → OpenLM → OpenLM User Interface → Start → Administration → Options Files.

Select the relevant Options File and click Edit. Check the box for "Changes made to the Options File are reflected in the OpenLM User Interface Options File editor."

Users and groups will automatically synchronize from the Options File.

View reports on group usage in the OpenLM User Interface Reports.






