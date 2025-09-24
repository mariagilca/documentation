---
title: "OpenLM Group Usage configuration"
sidebar_position: 1
---
## Adding users to a group manually

- Make sure you have a single OpenLM SLM installation on a central network server.
- Windows **Start** button -> **OpenLM** -> **OpenLM User Interface** -> **Start** ->  **Users & Groups -> Groups.**
- Select **Add Group** -> **Name** the group -> Check the box **Add Under Current Node** -> Select **Save.**
- Select the new group from the list -> Click **Members** -> Click **Add** -> **Select users** -> **Select.**

## Upload a CSV file

- Make sure you have a single OpenLM SLM installation on a central network server.
- Download and unzip the [CSV insert tool](/zips/importUsersToOpenLM2.zip)on the same server as OpenLM SLM.
- Set [JAVA\_HOME variable](https://docs.oracle.com/cd/E19182-01/821-0917/6nluh6gq9/index.html).
- Edit the file **config.properties** as follows:
  - **login** -> Your OpenLM SLM admin username.
  - **password** -> Your OpenLM SLM admin password.
  - **csv.format.delimiter** -> delimiter (Line seperator) of the csv file.
- **Save** the changes.
- Edit the file called **groups.csv** and fiil in the values as followed:
  - **ID** -> consecutive group ID (1,2,3,4....)
  - **Name** -> Name of the groups you wish to add.
  - **ParentId** -> ID of the parent group.
- Edit the file called **datasource.csv** and fiil in user values as followed:
  - Input the users's details -> UserName, FirstName, LastName, DisplayName, Title, Department, PhoneNumber, Description, Office, Email, Enabled, Projects, DefaultProject.
  - **Groups** -> Input group ID.
  - **DefaultGroup** -> Input group ID.
- Double-click the file **Start import.bat.**
- Open **OpenLM User Interface** -> **Start** -> **Users and Groups**-> **Users** -> See the new users.
- Click **Start** -> **Users and Groups**-> **Groups**-> See the new groups.

## Configure Group Usage - Options File

- Please make sure you have a single OpenLM SLM installation on a central network server.
- Make sure you have an [OpenLM Broker installation](https://www.openlm.com/knowledge-base/install-openlm-broker-ht821/) on your license servers and that the [OpenLM Brokers are configured](https://www.openlm.com/knowledge-base/configure-openlm-engineering-applications-ht823/).
- Windows **Start** button -> **All Programs** -> **OpenLM** -> **OpenLM User Interface** -> **Start** -> **Administration** -> **Options Files.**
- Select the relevant options file -> **Edit** -> Check the box **Changes made to the Options File are reflected in the OpenLM User Interface Options File editor.**
- Users and groups will be synchronized from the Options File automatically.
- See the [Reports of OpenLM.](https://www.openlm.com/knowledge-base/openlm-user-interface-reports-ht890/)
