---
title: "Directory Sync installation guide"
description: Note this prompt may be slightly different, depending on the DB type used.
sidebar_position: 1
---

## Prerequisites

- OpenLM SLM 21 or higher.
- A license file that has support for the Directory Sync extension (contact sales@openlm.com if unsure).
- If installing DSS and DSA on a machine separate from OpenLM SLM, make sure that the machine is on the same network as the AD domain controller.
- A designated schema in any supported database - **MariaDB, MS SQL, My SQL.**

## Directory Synchronization Service installation

1. Get the latest version of DSS from the [OpenLM Downloads](https://www.openlm.com/download/) page. Double-click to run the installer.

![Screenshot: Directory Synchronization Service installation](/img/legacy/word-image-34440-2.png)

2. Check the "**I agree to the license terms and conditions"** box and click **Next**.

3. In the next prompt you will be asked to select the database type that you want to use. Select it from the dropdown list and click **Next**. If you are upgrading and require to migrate data, go to step [4.2](./configuration)

![Screenshot 2: Directory Synchronization Service installation](/img/legacy/word-image-34440-3.png)

4. Provide the database configurations details then click **Next:**

**Note this prompt may be slightly different, depending on the DB type used.**

**![Screenshot 3: Directory Synchronization Service installation](/img/legacy/word-image-34440-4.png)**

5. You can change the installation folder if you want. The default one is C:Program FilesOpenLMOpenLM Directory Sync (DSS) Service . Click **Next**.

![Screenshot 4: Directory Synchronization Service installation](/img/legacy/word-image-34440-5.png)

6. Once the setup is complete, click **Finish**. This will close the Setup Wizard and open the DSS user interface in your browser.

![Screenshot 5: Directory Synchronization Service installation](/img/legacy/word-image-34440-6.png)

## Directory Synchronization Agent Installation

1. Get the latest version of DSA from the [OpenLM Downloads](https://www.openlm.com/download/) page. Double-click to run the installer.

![Screenshot: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-22.png)

2. Check the "**I agree to the license terms and conditions"** box and click **Next**.

3. Enter a descriptive name (no spaces allowed) to recognize the Agent instance and the details of the DSS installation (found in the **Directory Sync UI → Service Configuration** tab under DSS Server), then select your Server version: On-premise or Cloud. Click **Next**.

![Screenshot 2: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-23.png)

4. The next prompt will require you to authorize. You can skip this step if you don't use Identity Service.

![Screenshot 3: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-24.png)

5. To obtain the Authorization file go to **EasyAdmin** and follow the path: **Start→Administration→System&Security→Security→Authorization→Add**

**![Screenshot 4: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-25.png)**

6. Select the Client type from the drop-down list - DSA. Click **Save.**

**(***Note the Secret Key will only be displayed once. Make sure to save it before closing the window***).**

7. Copy or Download the JSON file with the Client ID and Client Secret:

![Screenshot 5: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-26.png)

8. Go back to the installation process and import or copy&paste the credentials:

![Screenshot 6: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-27.png)

9. You can change the installation folder if you want. Enter the path or click **Browse,** then click **Next** when completed.

![Screenshot 7: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-28.png)

10. Once the setup is complete, click **Finish**. At this point, a DSA approval request will have been sent to the DSS. You need to open the DSS user interface and go to the Agent Manager tab to approve it.  
![Screenshot 8: Directory Synchronization Agent Installation](/img/legacy/word-image-34440-29.png)

When completed, follow [this guide](./configuration) to configure your Directory Sync Instance.
