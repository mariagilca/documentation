---
title: OpenLM SLM installation guide
sidebar_position: 2
description: Learn how to install, upgrade, repair, and uninstall OpenLM SLM on your system.
---

# OpenLM SLM installation guide

:::note
OpenLM Server has been rebranded to **OpenLM SLM** (Software License Management). While the documentation reflects this change, configuration updates and UI changes will be implemented in upcoming releases.
:::

This guide explains how to install OpenLM SLM for your organization. It walks you through the installation process, license activation, and installer options.

---

## Installing OpenLM SLM

Before you begin:

- Ensure you meet the [system requirements](https://www.openlm.com/openlm-system-requirements/).
- OpenLM supports both Windows and Unix/Linux systems.
- OpenLM SLM can be installed on Linux as well.

### To install OpenLM SLM on Windows:

1. Download the latest installer (e.g., `OpenLM_Server_2x.#.##.##.msi`) from the [Downloads page](https://www.openlm.com/download/).
2. Double-click the file to start the installer.
3. If prompted by Windows User Account Control, click **Yes** to allow changes.

![OpenLM SLM Installation](/img/legacy/installation-guide.png)


You’ll see a screen with checkboxes:


- **Allow OpenLM to send updates and news emails**  
  Receive product updates and support content weekly. Emails go to the address you provide on the Activation screen.

- **I agree to the license terms and conditions**  
  Required to proceed. Review the End User License Agreement (EULA) before continuing.

    :::note
    The EULA outlines how you may use the software. Accepting it ensures legal and responsible usage.
    :::

4. Choose a database option:

![OpenLM SLM Installation](/img/legacy/installation-guide2.png)


   - **Install the embedded MariaDB (evaluation only)**  
     No additional database setup required.

   - **Use your own database**  

![OpenLM SLM Installation](/img/legacy/installation-guide3.png)

     You’ll be asked to provide the database connection string during the next steps.

![OpenLM SLM Installation](/img/legacy/installation-guide4.png)


5. On the **Destination Folder** screen, you can change the installation path or keep the default. Click **Next**, then **Install**.

![OpenLM SLM Installation](/img/legacy/installation-guide5.png)


6. If using your own database, provide the following:


![OpenLM SLM Installation](/img/legacy/installation-guide6.png)

   - Database type  
   - Connection string parameters: **Server name**, **DB name**, **User ID**, **Password**  
   - Click **Test connection**, and if successful, click **Approve**

7. After the setup completes, click **Finish**.

![OpenLM SLM Installation](/img/legacy/installation-guide7.png)

---

## Registration page

After installation, the Registration page opens automatically. You’ll also get a desktop shortcut.

![OpenLM SLM Installation](/img/legacy/installation-guide8.png)
![OpenLM SLM Installation](/img/legacy/installation-guide9.png)

### To redeem a trial license:

1. Fill in the required fields:
   - Company name
   - First name
   - Last name
   - Email address  
2. Click **Contact** to send the request.

### To apply the license:

1. Download the license file you receive.
2.Go to C: Program FilesOpenLMOpenLM SLM license and store your downloaded license in this folder.
3.Restart the OpenLM SLM service:

![OpenLM SLM Installation](/img/legacy/installation-guide10.png)

4. Use the desktop shortcut to access the EasyAdmin interface.

---

## Upgrading an existing OpenLM SLM installation

### Preparation steps:

1. Go to **Windows Services**.
2. Stop the **OpenLM Server Service**.

![OpenLM SLM Installation](/img/legacy/installation-guide11.png)

3. Back up your OpenLM SLM database.

### Upgrade process:

1. Download the latest installer (`OpenLM_Server_2x.#.##.##.msi`) from the [Downloads page](https://www.openlm.com/download/).
2. Run the installer and click **Next**.

![OpenLM SLM Installation](/img/legacy/installation-guide12.png)


3. Accept the End User License Agreement.

:::note
The upgrade requires you to accept the EULA again.
:::

![OpenLM SLM Installation](/img/legacy/installation-guide13.png)

4. The installer detects the existing version and prompts for an upgrade. Click **Install**.

![OpenLM SLM Installation](/img/legacy/installation-guide14.png)

5. The upgrade takes about a minute.

![OpenLM SLM Installation](/img/legacy/installation-guide15.gif)

6. Click **Finish**.


![OpenLM SLM Installation](/img/legacy/installation-guide16.png)

---

## Manual database upgrade

1. Search for **OpenLM Server Post install tool** in Windows and open it.
2. Provide your database connection details.
3. Click **Test connection**. If successful, click **OK**, then **Approve**.

![OpenLM SLM Installation](/img/legacy/installation-guide17.png)

:::caution
Use your actual database configuration, not example values. Proper DB setup is critical to ensure OpenLM works correctly.
:::

### Verify the installation

![OpenLM SLM Installation](/img/legacy/installation-guide20.png)

In the EasyAdmin UI, hover over the version number near the OpenLM logo to confirm that the SLM and database versions match.

---

## Repair mode

If the installation is corrupted or not working:

### To repair:

- Option 1: Run the installer executable again.
- Option 2: Go to **Control Panel → Programs and Features**, select **OpenLM SLM**, click **Uninstall/Change**.

![OpenLM SLM Installation](/img/legacy/installation-guide18.png)

1. Choose **Repair OpenLM**.
2. Click **Next**, then **Finish** once the repair completes.

![OpenLM SLM Installation](/img/legacy/installation-guide19s.png)

3. Launch the EasyAdmin UI or close the window.

---

## Uninstall

You can uninstall OpenLM SLM using one of the following methods:

### Method 1: Run the installer again
1. Double-click the installer.
2. Select **Uninstall OpenLM**, click **Next**.
3. Confirm and proceed with **Uninstall**.
4. Click **Close** after it finishes.

### Method 2: Use Control Panel
1. Go to **Control Panel → Programs and Features**.
2. Select **OpenLM SLM** and click **Uninstall**.
3. Follow the same steps as above.

:::note
The uninstaller leaves behind user files like logs, the license, and the database in:
C:\Program Files\OpenLM
These contain your license, logs, and database files. These will have to be removed manually before they can be uninstalled completely.
:::
