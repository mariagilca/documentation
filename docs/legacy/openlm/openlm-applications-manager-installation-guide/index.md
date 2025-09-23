---
title: "OpenLM Applications Manager installation guide"
sidebar_position: 1
---
The OpenLM Applications Manager provides a solution for intervening in excessive license consumption and avoiding unplanned license expenditure or breach of license compliance.

The Applications Manager is a Java application hub for all OpenLM Workstation Agents. The OpenLM SLM queries the Broker component, which queries the Application Manager to obtain usage data. Because of this, the Broker component is mandatory and must be installed on the same machine as the Applications Manager.

![OpenLM Applications Manager workflow](/img/legacy/openlm-applications-manager-workflow.png)

OpenLM Applications Manager workflow.

## Installation

The OpenLM Applications Manager is implemented in Java and can be installed on any machine that supports it. This section covers both Windows and Unix / Linux installations.

### System requirements

1. Java 11**\***
2. 64-bit OS
3. A working install of OpenLM SLM
4. Working install of OpenLM Broker

**\*** Java 11 is optionally bundled with the Applications Manager installer, so no additional download is required.

### Unix / Linux installation

### Preliminary steps

1. Download the latest version of the Application Manager for Unix/Linux from the OpenLM website downloads section.

2. Extract the archive (OpenLM\_AppManager\_#.#.#.#.tar.gz) to a convenient location.

3. Open the **settings.sh,** file in your editor of choice. This file holds all the variables required for AppManager to operate. It is mandatory to modify the **JAVA\_HOME** variable to point to the path of your JDK 11 install.

*The* ***JAVA\_HOME*** *path must* ***not*** *end with a trailing slash*.

Optionally, you can also edit the **APPMANGERSRVNAMEUSER** variable in case you need to launch the service from a different account than "root." In this case, you must ensure that all the files in the "OpenLM\_AppManager\_X.X.X.X" folder have their ownership reassigned to the new user.

4. Save the file and continue following the installation steps below, depending on your Linux distribution.

### Installing Applications Manager as a service

If your Linux version supports systemd, the following steps will install OpenLM AppManager as a service which starts automatically on system start-up:

1. Install the AppManager as a service:

sudo ./appmanager.sh install

2. Test the status of the AppManager service:

sudo ./appmanager.sh status

3. Run the AppManager detection script. Alternatively, if your Linux install has a desktop user interface, you can run the GUI AppManager Configuration tool with:

sudo ./appmanager.sh config

### Running Applications Manager as a background process

If your Linux version does not support systemd, the following steps will run OpenLM AppManager as a background process instead:

1. Run the AppManager process with:

sudo ./run\_appmanager.sh

To open the AppManger configuration screen:

sudo ./run\_appmanagerconfig.sh

### Windows installation

1. Obtain the latest Windows installer from our [Downloads](https://www.openlm.com/download/) page.
2. Double-click the OpenLM Applications Manager installation file to launch the installation wizard.  
   ![](/img/legacy/word-image-50401-2.png)
3. Click  **Next,** and the License agreement screen will appear
4. Read the license agreement, then check the "**I Accept the Terms of the License Agreement**" box.  
   ![](/img/legacy/word-image-50401-3.png)  
   Figure 2: The License Agreement screen.
5. Click  **Next** to advance to the Java Selection Screen. You have two options:
6. Install Application Manager with Java OpenJDK
7. If you already have it installed, browse to the path where it is installed:  
   ![](/img/legacy/word-image-50401-4.png)  
   Figure 3: The Java Selection screen.
8. Click  **Next** to accept the configuration and advance to the "Install Location" screen.  
   ![](/img/legacy/word-image-50401-5.png)  
   Figure 4: The "Choose Install Location" screen.
9. Select the installation path. The default is: **C:\Program Files\OpenLM\OpenLM App Manager\**
10. Provide the OpenLM SLM hostname and listener port - the default port is 5015:  
    ![](/img/legacy/word-image-50401-6.png)  
    Figure 5: The Installation Completed screen.
11. After installation is complete, click  **Next,** then  **Finish** to complete the installation:  
    ![](/img/legacy/word-image-50401-7.png)  
    Figure 6: The completion screen.

### Using an external JRE installation

Suppose you have chosen to use an external JRE installation instead of the one bundled with the Applications Manager installer. In that case, you must follow additional steps to get the "OpenLM App Manager" service to work. Please ensure that your Java installation is at least version 11 per the listed system requirements. To configure an external JRE with the Applications Manager:

1. Locate your Applications Manager installation and open the **bin** folder (by default, the full path is **C:\Program Files\OpenLM\OpenLM App Manager\bin**).
2. Double-click on **OpenLMLicenseManager.exe.**
3. Select the **Java** tab.  
   ![](/img/legacy/word-image-50401-8.png)  
   Figure 7: The "Java" tab in the OpenLM App Manager Config tool.
4. Uncheck the "Use default" box.
5. Click the  **...** box near the "Java Virtual Machine" field.
6. Browse to the location of your **sqljdbc\_auth.dll** file. (e.g., on a typical JDK11 installation, this is located at **C:\Program Files\OpenLM\OpenLM Applications Manager\bin**)
7. Click Open, then OK.

### Generate an authorization file.

1. Access the EasyAdmin User Interface.
2. Navigate to Start → Administration → System & Security → Security → Authorization → ADD.
3. From the **Type**drop-down list, select **Applications Manager.**
4. In the **Description** field, type in a free text.
5. Click **SAVE**. Click **OK.** The authorization details (Client ID and Client Secret ) are displayed. You can either download the JSON file or copy and paste them.
6. Click **Download** or **Copy.**
7. Close the dialog.

### Applications Manager authorization

1. Access C:\Program Files\OpenLM\OpenLM Applications Manager
2. Look for the **auth\_tool**bat file and open it. The OpenLM Applications Manager Auth Tool opens up.
3. Click **Import Authorization File**. Please navigate to the location where the authorization file is saved and open it. (You can also manually paste the Client ID and Client Secret).
4. Click **Test.**A pop-up message should appear that the connection is successful. Click **OK** to close it.
5. Click **Apply.**A pop-up message should appear, prompting you to restart the Applications Manager.
6. Open the Windows Services screen (open a Run dialog by pressing **Windows + R**, type **services. msc,** and click OK)
7. Locate the "OpenLM App Manager" service and select it.
8. Click on "Start" in the top-left corner.
9. You can close the Services window once the service has started.

## Configuring the Applications Manager

To run correctly, the Applications Manager requires configuration of the various components that it interacts with. These include the OpenLM SLM, OpenLM Broker, and OpenLM Workstation Agent. This section will show you how to configure each of these components separately.

### OpenLM Broker configuration for Applications Manager

The OpenLM Broker facilitates the connection to the OpenLM SLM. Once the Broker has been configured to interface with the Applications Manager, the settings will be passed along to the SLM. For this reason, we recommend that the configuration of the Applications Manager be done through the Broker first.

The Detect feature can automatically detect license manager information and simplify OpenLM Broker configuration. The function will add information for new ports (e.g., commands and paths) depending on what is detected.

1. Open the OpenLM Broker. Go to  **License Managers Tab → ADD**.
2. Click  **Detect. This will populate the options with detected configurations or** use defaults. The Applications Manager license server and additional nodes will be added to the navigation panel.  
   ![](/img/legacy/word-image-50401-10.png)  
   Figure 8: The OpenLM Broker Configuration Tool and the "Detect" function.
3. Review the auto-detected license managers to ensure the information corresponds to your installation. These items include the Applications Manager Host Name \ IP (License Server node), Port number and License Manager Type (Port node), command line paths to 'status' (Commands Status node) and 'data\_inquiry' (Commands → data\_inquiry node), and log file path (Log Files node). See the defaults listed in **Table 1**.

| **LM Type** | OpenLM App Manager |
| --- | --- |
| **Hostname \ IP** | Localhost |
| **Port Number** | 27080 |
| **Status Toggle** | *Active* |
| **Log File** | C:\Program Files\OpenLM\OpenLM App Manager\logs\lm-log.log |

**Table 1: OpenLM Broker defaults for the Applications Manager**

Click  **SAVE**  to commit the changes.

1. Open the EasyAdmin User Interface of the SLM and Open the License Servers window. Go to **Start → Widgets → License Servers.**  
   ![](/img/legacy/word-image-50401-11.png)  
   Figure 9: EasyAdmin User InterfaceLicense Servers screen.
2. If the Broker has detected and added your Applications Manager, you should use the AppManager with Pending Status as depicted in the screenshot above. Double-click, then select the timezone and click **Approve.**

### OpenLM Workstation Agent configuration for Applications Manager

To enable the OpenLM Workstation Agent to intervene in software licensing distribution via the Applications Manager, it must be configured in the Workstation Agent. This can be done in two ways: before or after the Workstation Agent.

1. While installing the Workstation Agent, one prompt will ask whether you are using the App Manager. Check the Use Applications Manager box and provide its host and port as depicted below:  
   ![](/img/legacy/word-image-50401-12.png)  
   Figure 10: The OpenLM Workstation Agent installation prompt with Applications Manager settings
2. For the complete Workstation Agent installation guide, follow this link
3. If not already set, change the Applications Manager server address to the actual hostname or IP address where it is installed.
4. Check the connectivity to the OpenLM License Manager by clicking the  **Check Connectivity Status** button. This should return a success screen. If it returns a failure, check to see that the Applications Manager service is running, that the configuration for the Port and License Server in the Broker is set correctly, and that your license file has support for the Applications Manager extension. If the problem persists, please get in touch with OpenLM support (support@openlm.com)
5. Click the **Apply** button. This will accept the changes and close the Agent Configuration screen.

At this point, the configuration is complete.

Please take a look at [this document](https://www.openlm.com/knowledge-base/configuring-openlm-applications-manager/) for more in-depth information.
