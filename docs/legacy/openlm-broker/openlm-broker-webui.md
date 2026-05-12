---
title: "OpenLM Broker Web UI"
description: Starting from v21.11, the OpenLM Broker has a Browser UI that is accessible from other machines in the same network.
sidebar_position: 2
---

## Overview

Starting from v21.11, the OpenLM Broker has a Browser UI that is accessible from other machines in the same network.

This means the Broker can be controlled and configured remotely. The functionality is useful when there are many Brokers and these require a centralized control station.  
Furthermore, Brokers on Linux machines can be accessed through the Web UI.

## Security concerns

The Broker web UI uses port 5090. Keeping in mind the security aspects, the port can be either opened or closed. We also set a Token in order to access the Broker Browser UI from a remote machine.

In the Broker XML file, the UI port can be changed:

![Screenshot: Security concerns](/img/legacy/word-image-53_1.png)

In Broker Browser, the web UI can be turned off:

![Screenshot 2: Security concerns](/img/legacy/word-image-54_1.png)

This will make the Broker XML port setting to be off:

![Screenshot 3: Security concerns](/img/legacy/word-image-55_1.png)

Change it back to the designated port whenever a revert action is required.

## Remote login process

The OpenLM Broker has a new WebUI that is installed with Broker version 21.11 and on.

The Broker WebUI can be accessed from URL [http://localhost:5090](http://localhost:5090/) remotely by changing localhost to the server Hostname.

You will need to generate an access token for remote access:

![Screenshot: Remote login process](/img/legacy/word-image-56_1.png)

A token can only be retrieved after login into the Broker system. The following URL returns it as plain text:

[http://localhost:5090/api/new-token](http://localhost:5090/api/new-token)

The commands below can be used to get a token from a command line remotely.

Linux:

```
ssh server_name wget -O - http://localhost:5090/api/new-token
```

Windows:

```
winrs -r:server_name powershell -command "(Invoke-WebRequest -Uri http://localhost:5090/api/new-token -Method GET).Content"
```

Example using putty

![Screenshot 2: Remote login process](/img/legacy/word-image-57_1.png)

The token will time out in 30 minutes after generation. It also expires if Broker Service is restarted.

## Basic functionality

### Adding the OpenLM SLM

1. From the **OpenLM SLMs** tab, click **Add Server.  
   ![Screenshot: Adding the OpenLM SLM](/img/legacy/word-image-58_1.png)**
2. Select the Type of connection On-premise or OpenLM Cloud and click Add:  
   ![Screenshot 2: Adding the OpenLM SLM](/img/legacy/word-image-59_1.png)
3. Input the hostname of the OpenLM SLM or if you are using the Identity Service go to Start→Administration→System Security→Security→Authorization→Add and generate the authorization file. Import Broker Authorization File and click **Save.  
   ![Screenshot 3: Adding the OpenLM SLM](/img/legacy/word-image-60_1.png)**
4. In the License Managers screen, you can see and add your license managers.
5. Click **Add License Manager.**
6. Select the type of license manager from the dropdown and enter the port. Click **Add**.  
   ![Screenshot 4: Adding the OpenLM SLM](/img/legacy/word-image-62_1.png)
7. Add the License file information:  
   ![Screenshot 5: Adding the OpenLM SLM](/img/legacy/word-image-63_1.png)
8. Add the Commands information. The path to the executable can be entered and this action will update the command for all the paths and *Status and Data\_Inquiry.  
   ![Screenshot 6: Adding the OpenLM SLM](/img/legacy/word-image-64_1.png)*
9. Input the Vendor information:  
   ![Screenshot 7: Adding the OpenLM SLM](/img/legacy/word-image-65_1.png)
10. Add the vendor name and Options File information, then **Confirm:  
    ![Screenshot 8: Adding the OpenLM SLM](/img/legacy/word-image-66_1.png)**
11. Add the Log File:  
    ![Screenshot 9: Adding the OpenLM SLM](/img/legacy/word-image-67_1.png)
12. Select the Log File Type, update the Log name, input the log path then select the vendor. Click **Confirm then Save:  
    ![Screenshot 10: Adding the OpenLM SLM](/img/legacy/word-image-68.png)**

## Switch between parallel Broker instances

The  Brokers can be switched from UI if you are using multiple Brokers installed on the same machine.

![Screenshot: Switch between parallel Broker instances](/img/legacy/word-image-69.png)

You can also type a URL with a designated port like localhost:5090, localhost:5091 to switch.

## Limitations

The following functions in the Broker Configuration tool can't be used in Browser UI.

- Broker Restart
- License File Sorting
- No File Browsing functionality
