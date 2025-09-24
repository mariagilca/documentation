---
title: "OpenLM Reports Scheduler installation guide"
sidebar_position: 1
---
## **System requirements**

To install OpenLM Reports Scheduler, the following prerequisites must be met:

1. A single OpenLM SLM installation running on a central network server.
2. An OpenLM license that includes support for the Reports Scheduler extension (please contact [sales](https://www.openlm.com/contact-us/) if you cannot locate the "Reports\_Scheduler" feature in the Administration → OpenLM License window).
3. *(optional)* If you choose not to install the OpenJDK 11 distributive that comes bundled with the Reports Scheduler installer, a compatible version of Java 11 must be present on the target machine.

\* This will vary depending on the Reports Scheduler installer package (consult the [release notes](https://www.openlm.com/cbxchangelog/openlm-reports-scheduler/)).

## **Installation**

OpenLM Reports Scheduler should be installed on the same machine where OpenLM SLM resides.

1. Download the latest installer of OpenLM Reports Scheduler from the [Downloads](https://www.openlm.com/download/) page.

2. Double-click the installer file (Openlm\_Reports\_Scheduler\_XXXX.exe) to start the installation. The installer window appears:

![](/img/legacy/word-image-65_2.png)

3. Click **Next** to advance to the License Agreement screen:

![OpenLM End User License Agreement screen](/img/legacy/openlm-end-user-license-agreement-screen-2.png)

4. Check the **I accept the terms of the License Agreement** box, then click **Next**

5. On the **Choose Install Location** screen, you can provide an alternative installation folder. We recommend leaving the default one as-is. Click **Next**.

![Installation destination folder](/img/legacy/installation-destination-folder-2.png)

6. The **Choose Components** screen displays the required components that will be installed. JRE can be optionally unchecked if you prefer using an external installation of Java 11, however, we recommend leaving the default settings as-is. Click **Install**.

![Check the boxes near the components you want to install and uncheck the ones you do not wish to install](/img/legacy/check-the-boxes-near-the-components-you-want-to-in-2.png)

7. Click **Next** then **Finish** to close the wizard.

![Completing OpenLM Reports Scheduler Setup](/img/legacy/completing-openlm-reports-scheduler-setup-2.png)

8. To verify that the Reports Scheduler is operational, open the Services window and verify that the "OpenLM Report Scheduler" service is up and running.

![Verifying if the Reports Scheduler is fully functional by using "Services"](/img/legacy/verifying-if-the-reports-scheduler-is-fully-functi-2.png)

To continue with the Reports Scheduler configuration, please see [this guide.](./openlm-reports-scheduler-configuration.md)
