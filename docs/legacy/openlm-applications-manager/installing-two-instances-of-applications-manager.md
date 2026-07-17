---
title: Installing 2 instances of Applications Manager in parallel
description: The following document describes how to install 2 different instances of Applications Manager in parallel on the same Windows machine.
sidebar_position: 2
---

The following document describes how to install 2 different instances of Applications Manager in parallel on the same Windows machine.

## General overview of the procedure

Installation of parallel Applications Manager entails the following:

- Setting up 2 different ports (for example 27080 and 27081) for each Applications Manager on OpenLM Workstation Agent and Broker;
- Creation of a new folder, copying contents of existing Applications Manager settings, and adjusting them.

## Setting up the Applications Manager application

1. Set up a machine with Applications Manager up and running.
2. Stop the Applications Manager Service.
3. Create a new folder named **OpenLM App Manager2** in C:\Program Files\OpenLM.
4. Copy contents of ***C:\Program Files\OpenLM\OpenLM App Manager*** to ***C:\Program Files\OpenLM\OpenLM App Manager2***.
5. Open **Openlm-app-manager.properties** file in the **OpenLM App Manager2** folder.
6. Set the port=27081.
7. Ensure that all other settings are correct in this file.
8. Save this file.
9. Rename **OpenLMLicenseManager.exe** to **OpenLMLicenseManager2.exe** in **Bin** folder.
10. Rename **OpenLMLicenseManager\_x86.exe** to **OpenLMLicenseManager2.exe.**
11. Edit **Uninstall Service.bat** file in the same folder to "**OpenLMLicenseManager2\_x86.exe**" //DS//**OpenLMLicenseManager2**
12. **Install *Service.bat*** file in the same folder **Bin** should look like the one below. Changes made to the original file are highlighted in bold:  
    @SET LOG\_DIR="%~dp0..\logs" **"OpenLMLicenseManager2.exe" //IS//OpenLMLicenseManager2** -DisplayName="**OpenLM App Manager2**"^ -Description="**OpenLM App Manager2**"^ -Install="**%~dp0OpenLMLicenseManager2.exe**"^ -Jvm="C:\Program Files\OpenLM\**OpenLM App Manager2**\jre\bin\server\jvm.dll" -StartMode=jvm -StopMode=jvm -Startup=auto -Classpath=openlm-app-manager-1.8.3.jar^ -StartClass=com.openlm.shadowlm.Main -StartMethod=start^ -JvmOptions=-Djava.net.preferIPv4Stack=true;-Dlog4j.configuration=file:log4j.properties;-Dopenlm.log.dir=%LOG\_DIR%^ -StopClass=com.openlm.shadowlm.Main -StopMethod=stop^ -StdOutput=auto -StdError=auto -StartPath "%~dp0.."^ -LogPath=%LOG\_DIR% -LogPrefix=openlm-app-manager
13. Double select **OpenLMLicenseManager2.exe** and set it to proper Java Runtime Environment.10. Now run the ***InstallService.bat*** file and verify if a new Service **OpenLM App Manager2** was created in Windows Services.  
    ![OpenLM Applications Manager](/img/legacy/installing-2-app-managers-006.png)
14. Open ***lmstat.bat*** file in the **OpenLM App Manager 2** folder and set **port=27080** to **port=27081** (port number is set as example. The port should be the same as in step 5**).**
15. After these steps there will be 2 parallel instances of Applications Manager with the same database. Delete the existing database for the newly added Applications Manager.
16. Go to **Windows Services** and start OpenLM App Manager and OpenLM App Manager2 services.  
    ![OpenLM Applications Manager](/img/legacy/installing-2-app-managers-007.png)

## Setting up OpenLM Broker

1. Open the Broker.
2. Add a new Applications Manager License Manager port 27081.  
   **Note**: You will also have to copy the License file from the original AppManager (C:\Program Files\OpenLM\OpenLM App Manager\license) into new AppManager...license folder.
3. Go to **Commands** menu under **Port 27081** and set path for commands to *C:\Program Files\OpenLM\OpenLM App Manager2* in both commands menus:
4. Select the ***Update*** button to save changes.
5. Set log file path under **Log Files** menu to ***C:\Program Files\OpenLM\OpenLM App Manager2\logs\lm-log.log***:
6. Select ***Apply*** button and then ***Restart Broker***.
7. Select the **status** command for added port 27081.
8. Select **Execute** button.
9. Ensure that you get successful response in the form:  
   `<SERVER name="..." port="27081" request_time_utc="..." server_status="ok"/>`
10. In case you get a similar error message [contact OpenLM support](https://www.openlm.com/contact-tech-support/):

## Setting up license server

1. Run the **OpenLM SLM** configuration tool from **Windows Start menu**, select **License Servers** menu and select ***Add Server***:
2. Select **OpenLM Applications Manager** type from drop-down menu.
3. Type in the same Hostname and Port as Host Name/IP and port in **OpenLM Broker** application and insert **Port 27081** (as example).
4. Select ***Apply*** button and restart now.

## Viewing 2 Applications Managers in the OpenLM User Interface

1. Before viewing 2 instances of Applications Manager, go to **Windows Services** and start the services OpenLM App Manager and OpenLM App Manager2
2. Then go to **OpenLM User Interface ->Start->Administration** and select **OpenLM Applications Manager**:
3. In the opened window there are 2 parallel Applications Managers in the left part of the screen:
