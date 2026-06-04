---
title: "OpenLM ServiceNOW Adapter installation and configuration"
description: The following document describes the process for installing the OpenLM ServiceNow Adapter. The External Platform Service configuration is also covered in.
sidebar_position: 10
---

The following document describes the process for installing the OpenLM ServiceNow Adapter. The External Platform Service configuration is also covered to make the Adapter establish a successful connection between OpenLM SLM and ServiceNow.

## Requirements

The following components are required for the OpenLM ServiceNow Adapter to work:

1. The OpenLM ServiceNow application in your ServiceNow instance

2. A working installation of OpenLM SLM v21 or higher or an OpenLM SLMC account (for SLMC account scroll to section #4)

4. An OpenLM SLM license that has support for External Platforms. To verify, go to **EasyAdmin Start → Administration → OpenLM License**. Look for the *External\_Platforms* flag:

![Screenshot: Requirements](/img/legacy/word-image-103.png)

In case your license is missing support for External Platforms, contact sales@openlm.com for assistance.

## Installing the OpenLM ServiceNow Adapter

The steps for installing the ServiceNow Adapter are as follows:

1. Obtain the latest External Platforms Service & ServiceNow Adapter installer file (**OpenLM\_ServiceNow\_Adapter\_Installer\_#.#.###.msi**) from our [Downloads](https://www.openlm.com/downloads-servicenow/) page

2. Open the installer file to run it.

3. Check the "**I agree to the license terms and conditions**" box.

4. Select **Next**.

5. If you want to install the External Platforms & ServiceNow Adapter to a different location, select **Browse** and navigate to the destination folder of your selecting.

6. Select **Next** to begin the installation. Note that this step may take up to several minutes depending on your hardware specifications.

7. Once the installer has finished, select **Finish** to close the window. This will open the External Platforms UI configuration screen which is described in the following section.

![Screenshot: Installing the OpenLM ServiceNow Adapter](/img/legacy/word-image-104.png)

## Configuring the External Platforms Service with ServiceNow

### With Identity Service

First, the External Platforms Service must be connected to the Identity Service in order for the ServiceNow integration to work. To do so, login to the Identity Service, go to **the Settings tab→Security Configuration→** toggle on the **ServiceNow** button and provide its URL. Select **Save**. Restart the ServiceNow Service.

![Screenshot: With Identity Service](/img/legacy/word-image-105.png)

### Without Identity Service

The next step is to open the External Platform configuration screen.  
The External Platforms configuration screen can be opened in several ways:

- Automatically, at the successful conclusion of the ServiceNow Adapter installation after the user has selected the "Finish" button.
- Through the shortcut found in *Start Menu → OpenLM → OpenLM External Platform Configuration*
- By accessing the OpenLM SLM address dedicated to the External Platforms Service in your browser (by default: [http://fqdn:5005/](http://localhost:8080/))

![Screenshot: Without Identity Service](/img/legacy/word-image-106.png)

The purpose of this screen is to configure and test the connection between the External Platform Service and your installation of OpenLM SLM. The fields are as follows:

- **URL** - Enter the path to your OpenLM SLM with either http:// or https:// and the listening port (default 5015). for example, [**`http://localhost:5015**](http://devbuild:7014/) Once you have filled in the required field, select on **Test Connection** to verify that a connection can be established. If successful, select **Save**. Note that you will be able to advance the wizard only if a successful connection can be established. In case of success, you should see the following message:

![Screenshot 2: Without Identity Service](/img/legacy/word-image-107.png)

- The correct port has been specified
- The SLM URL is spelled correctly
- The OpenLM SLM is up and running
- All database requirements from section 1 ("Requirements") of this document have been met
- There are no firewall roles, security policies or other applications preventing communication on that port or between your machine and the OpenLM SLM

![Screenshot 3: Without Identity Service](/img/legacy/word-image-108.png)

## Using the External Platform Setup Wizard

To finalize the ServiceNow integration with OpenLM, you must launch the External Platforms Setup Wizard from the EasyAdmin interface.

To do so:

1. Go to **EasyAdmin Start → Administration** → select on **External Platforms** → **ServiceNow.  
   ![Screenshot: Using the External Platform Setup Wizard](/img/legacy/word-image-109.png)**
2. The ServiceNow Setup Wizard will open.  
   ![Screenshot 2: Using the External Platform Setup Wizard](/img/legacy/word-image-110.png)
3. Fill in the required fields as follows:  
   **Basic Authentication****ServiceNow URL** - The path to your ServiceNow instance. For example, https://abc123.service-now.com**Username** - Your ServiceNow account username.**Password** - Your ServiceNow account password.**OAuth 2.0**

   **ServiceNow URL** - The path to your ServiceNow instance. For example, https://abc123.service-now.com

   **Username** - Your ServiceNow account username.

   **Password** - Your ServiceNow account password.

   **Client ID**

   **Client Secret**
4. Select **Test Connection**. Note that you will be able to advance to the next screen only if the test is successful, as indicated by this notice in the UI:  
   ![Screenshot 3: Using the External Platform Setup Wizard](/img/legacy/word-image-111.png)
5. Select **Next** to advance to the Sync Configurations screen.  
   This screen holds the options for configuring the synchronization of OpenLM with ServiceNow.**Select range to sync your data** - You can pick the time range for the sync. Three options are available:
   1. *Period* - this will synchronize all the data within the selected time period
   2. *Start date* - this will synchronize all the data beginning with the selected start date up until today
   3. *All available data* - this will synchronize all data available from the OpenLM database

   **Schedule sync to run every day at** - Specify the time you would like the synchronization of OpenLM with ServiceNow to start at.

   **Sync Now (Run initial sync at the end of this wizard)** - turning this toggle on will start the initial synchronization as soon as you have completed all the steps and finished the Wizard configuration. Leaving it off means that the sync will begin at the scheduled sync time above.

   ![Screenshot 4: Using the External Platform Setup Wizard](/img/legacy/word-image-112.png)
6. Select **Next**.  
   ![Screenshot 5: Using the External Platform Setup Wizard](/img/legacy/word-image-113.png)
7. On the ServiceNow Time Zone screen, select the time zone by which OpenLM will synchronize the aggregated data it sends to ServiceNow. Since synchronization once per day, you must specify the time zone by which OpenLM will adjust the time calculations.
8. Select **Next** to advance to the Notifications configuration part of the Wizard.  
   ![Screenshot 6: Using the External Platform Setup Wizard](/img/legacy/word-image-114.png)
9. Configure the options on this screen as follows:  
   **Notifications (on/off)** - this is a global switch that enables or disables all sync notifications.**EasyAdmin Alerts (on/off)** - this switch enables or disables notifications in the EasyAdmin user interface.**Email (on/off)** - this switch allows or deactivates email notifications.Notifications to both EasyAdmin and email can be sent whenever a sync has either:
   - Succeeded
   - Skipped
   - Failed
   - When the External Platform service is not reporting back to the OpenLM SLM

   **Recipients** - if the email switch has been turned on, enter the email(s) from which you want to receive the notifications. For multiple emails, each email must be placed on its line. Note: The SMTP server must be configured for this setting.
10. Select **Finish** to commit the new ServiceNow configuration and close the Wizard.
11. In the ServiceNow interface, simply add a scoped application user that requires the following roles:

    ```
    X_oplm_openlm_data.integration_user
    sam_eng_app_integrator
    ```
12. In the ServiceNow interface, go to your "Plugins" section and search for "OpenLM". After finding it select on **Install** to install the OpenLM API on the ServiceNow side.

At this point configuration on the External Platforms side is complete. To finish the configuration, follow the steps in section 5 below.

## Post-installation steps for the App Store application

**Only for customers who have Domain Separation activated on their instances**

In the ServiceNow navigation panel, navigate to **Scripts - Background** module and open this in a new tab. Copy the script from **OpenLM Integration: Domain Field Fix Script** and paste it in the **Run Script** field in Scripts - Background tab

![Screenshot: Post-installation steps for the App Store application](/img/legacy/word-image-115.png)

Set the scope to **global** and select on **Run script** to run it.

For the customers which do not want to run this script, they can go the **Transform Map** corresponding to each of the staging table and activate coalesce value and set choice action to reject on **sys\_domain** field by following these steps:

1. Navigate to the **Transform Maps** module which is present under the **Administration** subsection of **System Import Sets**

2. Select on the **Filter** icon and add **Application** is **OpenLM Data Integration**. Select on the **Run** button

![Screenshot 2: Post-installation steps for the App Store application](/img/legacy/word-image-116.png)

3. Open each of the record and update the **sys\_domain** mapping under **Field Maps** section to true and choice action to reject and select on the **Update** button when done.

![Screenshot 3: Post-installation steps for the App Store application](/img/legacy/word-image-117.png)

The following records must be updated:

- olm\_imp\_group\_relations\_table
- olm\_imp\_agg\_usage
- olm\_imp\_users\_table
- olm\_imp\_lm\_hosts
- olm\_imp\_groups\_table
- olm\_imp\_computers
- olm\_imp\_license\_servers
- olm\_imp\_projects\_table
- olm\_imp\_agg\_concurrent\_usage
- olm\_imp\_license\_inventory
- olm\_imp\_group\_users\_table
- olm\_imp\_agg\_denials
- olm\_imp\_alerts

**Information note:** When creating an integration user in a domain-separated environment, the integration user should be assigned to the appropriate domain and should not be part of a global domain as the data gets inserted into the domain the integration user is part of. Assigning a wrong/global domain to a user leads to the data being inserted in the wrong domain and can be visible to all users.
