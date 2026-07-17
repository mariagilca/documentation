---
title: Directory Sync installation guide
description: Note this prompt may be slightly different, depending on the DB type used.
sidebar_position: 1
---

## Prerequisites

- OpenLM SLM 21 or higher.
- A license file that has support for the Directory Sync extension (contact sales@openlm.com if unsure).
- If installing DSS and DSA on a machine separate from OpenLM SLM, ensure that the machine is on the same network as the AD domain controller.
- A designated schema in any supported database - **MariaDB, MS SQL, My SQL.**

## Directory Synchronization Service installation

1. Get the latest version of DSS from the [OpenLM Downloads](https://www.openlm.com/downloads/) page. Run the installer.

![Directory Synchronization Service installer welcome screen.](/img/legacy/word-image-34440-2.png)

2. Check the "**I agree to the license terms and conditions"** box and select **Next**.

3. In the next prompt you will be asked to select the database type that you want to use. Select it from the dropdown list and select **Next**. If you are upgrading and require to migrate data, go to step [4.2](./configuration)

![DSS installer prompt to select the database type from a dropdown list.](/img/legacy/word-image-34440-3.png)

4. Provide the database configurations details then select **Next:**

**Note this prompt may be slightly different, depending on the DB type used.**

**![DSS installer prompt for entering the database connection details.](/img/legacy/word-image-34440-4.png)**

5. You can change the installation folder if you want. The default one is C:\Program Files\OpenLM\OpenLM Directory Sync (DSS) Service . Select **Next**.

![DSS installer prompt to choose the installation folder.](/img/legacy/word-image-34440-5.png)

6. Once the setup is complete, select **Finish**. This will close the Setup Wizard and open the DSS user interface in your browser.

![DSS installer completion screen with the Finish button.](/img/legacy/word-image-34440-6.png)

## Directory Synchronization Agent installation

1. Get the latest version of DSA from the [OpenLM Downloads](https://www.openlm.com/downloads/) page. Run the installer.

![Directory Synchronization Agent installer welcome screen.](/img/legacy/word-image-34440-22.png)

2. Check the "**I agree to the license terms and conditions"** box and select **Next**.

3. Enter a descriptive name (no spaces allowed) to recognize the Agent instance and the details of the DSS installation (found in the **Directory Sync UI → Service Configuration** tab under DSS Server), then select your Server version: On-premise or Cloud. Select **Next**.

![DSA installer prompt for the agent name, DSS server details, and server version.](/img/legacy/word-image-34440-23.png)

4. The next prompt will require you to authorize. You can skip this step if you don't use Identity Service.

![DSA installer authorization prompt, which can be skipped without Identity Service.](/img/legacy/word-image-34440-24.png)

5. To obtain the Authorization file go to **EasyAdmin** and follow the path: **Start→Administration→System&Security→Security→Authorization→Add**

**![EasyAdmin Authorization page for generating the DSA authorization file.](/img/legacy/word-image-34440-25.png)**

6. Select the Client type from the drop-down list - DSA. Select **Save.**

**(***Note the Secret Key will only be displayed once. Make sure to save it before closing the window***).**

7. Copy or Download the JSON file with the Client ID and Client Secret:

![Authorization dialog showing the JSON file with Client ID and Client Secret to copy or download.](/img/legacy/word-image-34440-26.png)

8. Go back to the installation process and import or copy&paste the credentials:

![DSA installer step to import or paste the authorization credentials.](/img/legacy/word-image-34440-27.png)

9. You can change the installation folder if you want. Enter the path or select **Browse,** then select **Next** when completed.

![DSA installer prompt to choose the installation folder.](/img/legacy/word-image-34440-28.png)

10. Once the setup is complete, select **Finish**. At this point, a DSA approval request will have been sent to the DSS. You need to open the DSS user interface and go to the Agent Manager tab to approve it.  
![DSA installer completion screen after the approval request is sent to the DSS.](/img/legacy/word-image-34440-29.png)

When completed, follow [this guide](./configuration) to configure your Directory Sync Instance.
