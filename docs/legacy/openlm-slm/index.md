---
title: "OpenLM SLM installation guide"
description: "Important: Our product has been rebranded from OpenLM Server to OpenLM SLM (Software License Management). While documentation and the website reflect."
sidebar_position: 1
---

**Important:** Our product has been rebranded from OpenLM Server to OpenLM SLM (Software License Management). While documentation and the website reflect this change, configuration updates and the user interface (UI) will be implemented in subsequent releases. Thank you for your understanding.

The following document will provide instructions on installing the OpenLM SLM for your organization. Understanding the installation process will allow you to properly set up OpenLM, configure the initial steps required to activate the license, and clarify any of the options presented by the OpenLM SLM installer.

## **Installing the OpenLM SLM**

Before installing the OpenLM SLM, ensure you meet the [recommended system requirements](https://www.openlm.com/openlm-system-requirements-2/). Also, note that OpenLM can monitor both Windows and Unix / Linux resident systems, and the OpenLM SLM component can also be installed on [Linux machines](../openlm-identity-service/openlm-slm-and-identity-service-installation-on-linux).

To install the OpenLM SLM on Windows:

1. Obtain the latest OpenLM SLM installer (for example, **OpenLM\_Server\_2x.#.##.##.msi**) from our [Downloads](https://www.openlm.com/free-trial/) page.
2. Once the download is complete, open the installer file to begin the installation process
3. The Windows User Account Control Process might prompt a screen asking "Do you want to allow the following software to make changes to your computer?" Select "**Yes**" to continue. Once the installer has started, you should see the following screen:  
   ![OpenLM SLM installer welcome screen with license agreement checkbox](/img/legacy/word-image-63206-1.png)The checkboxes are explained as follows:
   - **"Allow OpenLM to send updates and news emails"** will ensure that you receive OpenLM news and updates and support webinars approximately once a week. You will receive the emails at the address provided later on the "Activation" screen.
   - **"I agree to the license terms and conditions"** is required for the installation to proceed. Take a moment to review and accept the End User License Agreement (EULA) terms. The EULA outlines the terms and conditions under which you may use this software. By accepting the agreement, you acknowledge your understanding and agreement to abide by these terms, ensuring legal and responsible use of the software. Select **Next** to continue.
4. Select your Database option:a. Install the embedded MariaDB (this is only for evaluation purposes):![Database option screen with embedded MariaDB selected](/img/legacy/word-image-63206-2.png)If you select embedded MariaDB, no other steps related to the database are required.  
   Instead, if you continue with your database, you must provide connection string parameters (step 5)b. Or, use your database connection:![Database option screen with custom database connection selected](/img/legacy/word-image-63206-3.png)(*If you select to provide your database connection, later during the installation process, you will be required to provide database connection string details (step 6).**![Destination Folder screen with Browse button to change install directory](/img/legacy/word-image-63206-4.png)*

   On the "Destination Folder" screen, you can change the default install directory for the OpenLM SLM. Select "Browse" to select a new location. We recommend leaving the default location as-is.
5. Once you have picked a destination directory, select "**Next** " and "**Install**" for the process to begin.  
   ![OpenLM SLM installation ready screen with Install button](/img/legacy/word-image-63206-5.png)
6. At this point, if you select to use your database, this prompt will appear:  
   ****Note: Enter your DB configuration details instead of using the examples in the screenshot. This step is crucial for the system's proper functioning in your unique environment.****![Database configuration dialog with DB type, server name, and connection test](/img/legacy/word-image-63206-6.png)

### Steps to take

1. Select the DB type
2. Provide the connection strings parameters (Server name, DB name, User ID, and password):
3. Test the connection. If successful, select "**Approve.**"
4. Once the database is all set up and the installation is completed, select "**Finish**.  
   ![Installation completed screen with Finish button](/img/legacy/word-image-63206-7.png)

### **Registration page**

1. The Registration page will automatically open, and you can redeem your trial license by sending a form to our Sales department. Also, a shortcut on your desktop will be available:  
   ![OpenLM SLM registration page for trial license](/img/legacy/word-image-63206-8.png)  
   ![OpenLM EasyAdmin desktop shortcut](/img/legacy/word-image-63206-9.png)
2. Fill out the required fields (Company Name, First and Last Name, and Email) and select **"Contact"** to receive further details and the license file.
3. The next step is to download the License file:
4. Go to C: Program FilesOpenLMOpenLM SLM license and store your downloaded license in this folder.
5. Restart the OpenLM SLM service:  
   ![Windows Services showing OpenLM SLM service restart](/img/legacy/word-image-63206-10.png)
6. Use the Shortcut on your Desktop to access the EasyAdmin User Interface.

## **Upgrading an existing OpenLM SLM installation**

The steps to upgrade an existing OpenLM SLM installation are as follows:

### Preparations for upgrade

1. Navigate to the Windows Services and look for the OpenLM Server Service. Select **Stop the service**.  
   ![Windows Services with OpenLM Server Service and Stop option](/img/legacy/word-image-63206-11.png)
2. Back up your OpenLM SLM database.

### Upgrade

1. Obtain the latest OpenLM SLM installer (for example, **OpenLM\_Server\_2x.#.##.##.msi**) from our [Downloads](https://www.openlm.com/download/) page.
2. Open it to run the installation wizard. A welcome message will appear. Select **Next:**  
   ![OpenLM SLM upgrade wizard welcome screen](/img/legacy/word-image-63206-12.png)
3. The following prompt requires you to read and accept the End-User License Agreement. Check the box Accepting the End User License Agreement
4. Before proceeding with the upgrade, take a moment to review and accept the End User License Agreement (EULA) terms. The EULA outlines the terms and conditions under which you may use this software. By accepting the agreement, you acknowledge your understanding and agreement to abide by these terms, ensuring legal and responsible use of the software. Select **Next** to continue.  
   ![End-User License Agreement acceptance screen during upgrade](/img/legacy/word-image-63206-13.png)
5. The system has detected an existing SLM installed and prompts for an upgrade. Select the **Install** button to begin the upgrade.  
   ![Upgrade prompt with Install button to begin the upgrade](/img/legacy/word-image-63206-14.png)
6. The installation process should take about one minute.  
   ![Installation progress animation](/img/legacy/gif.gif)
7. Select **Finish.** The upgrade process is completed.  **![Upgrade completed screen with Finish button](/img/legacy/word-image-63206-16.png)**

### Manual database upgrade

1. Navigate to Windows Search, look for the OpenLM Server Post install tool, and open it.
2. Provide the database connection details. Select **Test connection**. If successful, select **OK,** then **Approve.  
   Note: Enter your DB configuration details instead of using the examples in the screenshot. This step is crucial for the system's proper functioning in your unique environment.**  
   ![OpenLM Server Post install tool with database connection details](/img/legacy/word-image-63206-17.png)
3. Verify that the OpenLM SLM and database version match from the EasyAdmin Background by putting your cursor over the version shown next to OpenLM logo.  
   ![EasyAdmin version tooltip showing SLM and database version match](/img/legacy/image.png)

The installation is complete.

## **Repair mode**

Repairing your OpenLM SLM installation if it has been corrupted or stopped working due to software or hardware malfunction is possible.

To do so, either:

1. Open the installer executable file to run it.
2. Go to Control Panel → Programs and Features → Select "OpenLM SLM" → Select "Uninstall/Change".\  
   ![Control Panel Programs and Features with OpenLM SLM selected](/img/legacy/word-image-63206-18.png)
3. Select "Repair OpenLM" and select "**Next**" to proceed.
4. Once the repair has finished, you can select "Finish" to complete the process, then access the EasyAdmin User Interface or close the window **[X]** to complete the process.  
   ![Repair completed screen with Finish button](/img/legacy/word-image-63206-19.png)

## **Uninstall**

If at any time you wish to uninstall OpenLM SLM, there are two ways to do so:

1. Open (run) the installer executable
2. Go to Control Panel -> Programs and Features -> Select "OpenLM SLM" -> Select "Uninstall"
3. Select the "Uninstall OpenLM" option, then select "**Next**."
4. You will be prompted with a final confirmation dialogue asking if you want to proceed. Select "Uninstall" to begin
5. you should see the screen below once the uninstaller has finished. Select "**Close**" to complete the procedure.

The uninstaller leaves several user files and folders behind (located by default in **C: Program FilesOpenLM**). These contain your license, logs, and database files. These will have to be removed manually before they can be uninstalled completely.
