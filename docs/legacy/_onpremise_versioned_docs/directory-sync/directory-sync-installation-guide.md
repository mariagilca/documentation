---
title: Directory Sync Installation Guide
sidebar_position: 1
description: Step-by-step guide to installing and configuring OpenLM Directory Sync.
---

## Prerequisites
OpenLM SLM 21 or higher.
A license file that has support for the Directory Sync extension (contact sales@openlm.com if unsure).
If installing DSS and DSA on a machine separate from OpenLM SLM, make sure that the machine is on the same network as the AD domain controller.
A designated schema in any supported database – MariaDB, MS SQL, My SQL.


## Directory synchronization service installation
Download the latest version of DSS from the OpenLM Downloads page and run the installer.

Agree to the license terms and click Next.

Select your database type from the dropdown list and click Next.

Provide the database configuration details and click Next.

Choose an installation folder. The default is C:\Program Files\OpenLM\OpenLM Directory Sync (DSS) Service. Click Next.

Once the setup is complete, click Finish. This will open the DSS user interface in your browser.

<br>

## Directory synchronization agent installation
Download the latest version of DSA and run the installer.

Agree to the license terms and click Next.

Enter a descriptive name for the Agent instance (no spaces), provide the DSS installation details (found in Directory Sync UI → Service Configuration), and select your server version (On-premise or Cloud). Click Next.

If you are not using Identity Service, you can skip the authorization step. Otherwise, proceed to the next step.

To get the authorization file, go to EasyAdmin → Start → Administration → System&Security → Security → Authorization → Add.

Select DSA as the client type and click Save. The secret key will only be displayed once, so download the JSON file or copy the Client ID and Secret.

Go back to the installer and import the JSON file or copy and paste the credentials.

Choose your installation folder and click Next.

Click Finish. At this point, a DSA approval request will be sent to the DSS. You must open the DSS user interface and go to the Agent Manager tab to approve it.

After installation, follow the official guide to configure your Directory Sync instance.