---
title: OpenLM Applications Manager Configuration
sidebar_position: 4
description: Guide to configuring the OpenLM Applications Manager for software usage monitoring.
---


To install two separate instances of **OpenLM Applications Manager** on the same Windows machine, you need to configure them to run in parallel on different ports. This process involves manually duplicating the application's files, modifying configuration settings for the new instance, and updating the OpenLM Broker and OpenLM SLM configurations to recognize both instances.

***

### 🛠️ Setting up the Applications Manager application

1.  **Duplicate the application folder**: Stop the `OpenLM Applications Manager Service`, then create a new folder named `OpenLM App Manager2` in `C:\Program Files\OpenLM` and copy the contents of the original `OpenLM App Manager` folder into it.
2.  **Configure the new instance**: In the new folder, open the `openlm-app-manager.properties` file and change the port number to a new, unused port (e.g., **27081**). Save the file.
3.  **Rename executables**: In the `bin` subfolder of `OpenLM App Manager2`, rename `OpenLMLicenseManager.exe` and `OpenLMLicenseManager_x86.exe` to `OpenLMLicenseManager2.exe`.
4.  **Edit service files**: Modify the `Install Service.bat` and `Uninstall Service.bat` files to reference the new executable and service name (`OpenLM App Manager2`).
5.  **Install the new service**: Run the new `InstallService.bat` file to create the `OpenLM App Manager2` service in Windows Services.
6.  **Update `lmstat.bat`**: Open the `lmstat.bat` file in the new folder and change the port number to **27081**.
7.  **Start the services**: In Windows Services, start both the `OpenLM App Manager` and `OpenLM App Manager2` services.

***

### ⚙️ Setting up OpenLM Broker

1.  **Add a new port**: Open the `OpenLM Broker Configuration Tool`, and add a new `Applications Manager` license manager port (e.g., **27081**). Remember to copy the license file from the original `AppManager` folder to the new one.
2.  **Configure command paths**: Under the `Commands` menu for the new port, set the path for commands to `C:\Program Files\OpenLM\OpenLM App Manager2`.
3.  **Set log file path**: Under the `Log Files` menu, set the path to `C:\Program Files\OpenLM\OpenLM App Manager2\logs\lm-log.log`.
4.  **Apply and restart**: Click **Apply** and then **Restart Broker** to save and activate the new configuration.
5.  **Verify**: Select the `status` command for the new port and click **Execute** to confirm a successful connection.

***

### 🖥️ Setting up the license server

1.  **Add a new server**: Run the `OpenLM SLM` configuration tool. Go to the `License Servers` menu and click `Add Server`.
2.  **Configure the server**: Select `OpenLM Applications Manager` from the dropdown. Enter the same hostname and the new port (**27081**) that you configured in OpenLM Broker.
3.  **Apply and restart**: Press **Apply** and restart the service.

Once both `OpenLM App Manager` and `OpenLM App Manager2` services are running, you can open the OpenLM User Interface. You'll find both Applications Managers listed on the left side of the screen under **Start → Administration → OpenLM Applications Manager**.