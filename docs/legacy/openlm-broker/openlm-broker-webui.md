---
title: OpenLM Broker web UI
description: Starting from v21.11, the OpenLM Broker has a Browser UI that is accessible from other machines in the same network.
sidebar_position: 2
---

## Overview

Starting from v21.11, the OpenLM Broker has a Browser UI that is accessible from other machines in the same network.

This means the Broker can be controlled and configured remotely. The functionality is useful when there are many Brokers and these require a centralized control station.  
Furthermore, Brokers on Linux machines can be accessed through the web UI.

## Security concerns

The Broker web UI uses port 5090. Keeping in mind the security aspects, the port can be either opened or closed. We also set a Token to access the Broker Browser UI from a remote machine.

In the Broker XML file, the UI port can be changed:

![Broker XML file showing the web UI port setting.](/img/legacy/word-image-53_1.png)

In Broker Browser, the web UI can be turned off:

![Broker Browser UI with the web UI turned off.](/img/legacy/word-image-54_1.png)

This will make the Broker XML port setting to be off:

![Broker XML file with the UI port setting turned off.](/img/legacy/word-image-55_1.png)

Change it back to the designated port whenever a revert action is required.

## Remote login process

The OpenLM Broker has a new WebUI that is installed with Broker version 21.11 and on.

The Broker WebUI can be accessed from URL [http://localhost:5090](http://localhost:5090/) remotely by changing localhost to the server Hostname.

You will need to generate an access token for remote access:

![Broker web UI screen for generating a remote access token.](/img/legacy/word-image-56_1.png)

A token can only be retrieved after login into the Broker system. The following URL returns it as plain text:

[http://localhost:5090/api/new-token](http://localhost:5090/api/new-token)

The commands below can be used to get a token from a command line remotely.

Linux:

```bash
ssh server_name wget -O - http://localhost:5090/api/new-token
```

Windows:

```text
winrs -r:server_name powershell -command "(Invoke-WebRequest -Uri http://localhost:5090/api/new-token -Method GET).Content"
```

Example using putty

![Retrieving a Broker access token from the command line using PuTTY.](/img/legacy/word-image-57_1.png)

The token will time out in 30 minutes after generation. It also expires if Broker Service is restarted.

## Basic functionality

### Adding the OpenLM SLM

1. From the **OpenLM SLMs** tab, select **Add Server.  
   ![Broker web UI OpenLM SLMs tab with the Add Server button.](/img/legacy/word-image-58_1.png)**
2. Select the Type of connection On-premise or OpenLM Platform and select Add:  
   ![Selecting the OpenLM SLM connection type, on-premise or OpenLM Platform.](/img/legacy/word-image-59_1.png)
3. Input the hostname of the OpenLM SLM or if you are using the Identity Service go to Start→Administration→System Security→Security→Authorization→Add and generate the authorization file. Import Broker Authorization File and select **Save.  
   ![Entering the OpenLM SLM hostname and importing the Broker authorization file.](/img/legacy/word-image-60_1.png)**
4. In the License Managers screen, you can see and add your license managers.
5. Select **Add License Manager.**
6. Select the type of license manager from the dropdown and enter the port. Select **Add**.  
   ![Adding a license manager by selecting its type and entering the port.](/img/legacy/word-image-62_1.png)
7. Add the License file information:  
   ![Adding license file information for the license manager.](/img/legacy/word-image-63_1.png)
8. Add the Commands information. The path to the executable can be entered and this action will update the command for all the paths and *Status and Data\_Inquiry.  
   ![Adding the commands path to the license manager executable.](/img/legacy/word-image-64_1.png)*
9. Input the Vendor information:  
   ![Entering vendor information for the license manager.](/img/legacy/word-image-65_1.png)
10. Add the vendor name and Options File information, then **Confirm:  
    ![Adding the vendor name and options file information.](/img/legacy/word-image-66_1.png)**
11. Add the Log File:  
    ![Adding the log file for the license manager.](/img/legacy/word-image-67_1.png)
12. Select the Log File Type, update the Log name, input the log path then select the vendor. Select **Confirm then Save:  
    ![Configuring the log file type, name, path, and vendor.](/img/legacy/word-image-68.png)**

## Switch between parallel Broker instances

The  Brokers can be switched from UI if you are using multiple Brokers installed on the same machine.

![Broker web UI control for switching between parallel Broker instances.](/img/legacy/word-image-69.png)

You can also type a URL with a designated port like localhost:5090, localhost:5091 to switch.

## Limitations

The following functions in the Broker Configuration tool can't be used in Browser UI.

- Broker Restart
- License File Sorting
- No File Browsing functionality
