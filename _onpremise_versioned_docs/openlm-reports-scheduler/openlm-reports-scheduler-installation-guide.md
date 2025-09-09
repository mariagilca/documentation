---
title: "OpenLM Reports Scheduler Installation Guide"
date: "2023-11-04T23:28:41"
permalink: "https://www.openlm.com/docs/openlm-reports-scheduler-installation-guide/"
posttype: "manual_documentation"
id: "6628"
---

<h2><strong>System Requirements</strong></h2>
To install OpenLM Reports Scheduler, the following prerequisites must be met:
<ol>
 <li>A single OpenLM SLM installation running on a central network server.</li>
 <li>An OpenLM license that includes support for the Reports Scheduler extension (please contact <a href="https://www.openlm.com/contact-us/">sales</a> if you cannot locate the “Reports_Scheduler” feature in the Administration → OpenLM License window).</li>
 <li><em>(optional)</em> If you choose not to install the OpenJDK 11 distributive that comes bundled with the Reports Scheduler installer, a compatible version of Java 11 must be present on the target machine.</li>
</ol>
* This will vary depending on the Reports Scheduler installer package (consult the <a href="https://www.openlm.com/cbxchangelog/openlm-reports-scheduler/">release notes</a>).
<h2><a id="post-35188-_heading=h.1fob9te"></a><strong>Installation</strong></h2>
OpenLM Reports Scheduler should be installed on the same machine where OpenLM SLM resides.

1. Download the latest installer of OpenLM Reports Scheduler from the <a href="https://www.openlm.com/download/">Downloads</a> page.

2. Double-click the installer file (Openlm_Reports_Scheduler_XXXX.exe) to start the installation. The installer window appears:

<img class="wp-image-35189" src="https://www.openlm.com/wp-content/uploads/2022/03/word-image-65.png" />

3. Click <strong>Next</strong> to advance to the License Agreement screen:

<img class="wp-image-35190" src="https://www.openlm.com/wp-content/uploads/2022/03/openlm-end-user-license-agreement-screen-2.png" alt="OpenLM End User License Agreement screen" />

4. Check the <strong>I accept the terms of the License Agreement</strong> box, then click <strong>Next</strong>

5. On the <strong>Choose Install Location</strong> screen, you can provide an alternative installation folder. We recommend leaving the default one as-is. Click <strong>Next</strong>.

<img class="wp-image-35191" src="https://www.openlm.com/wp-content/uploads/2022/03/installation-destination-folder-2.png" alt="Installation destination folder" />

6. The <strong>Choose Components</strong> screen displays the required components that will be installed. JRE can be optionally unchecked if you prefer using an external installation of Java 11, however, we recommend leaving the default settings as-is. Click <strong>Install</strong>.

<img class="wp-image-35192" src="https://www.openlm.com/wp-content/uploads/2022/03/check-the-boxes-near-the-components-you-want-to-in-2.png" alt="Check the boxes near the components you want to install and uncheck the ones you do not wish to install" />

7. Click <strong>Next </strong>then <strong>Finish </strong>to close the wizard.

<img class="wp-image-35193" src="https://www.openlm.com/wp-content/uploads/2022/03/completing-openlm-reports-scheduler-setup-2.png" alt="Completing OpenLM Reports Scheduler Setup" />

8. To verify that the Reports Scheduler is operational, open the Services window and verify that the “OpenLM Report Scheduler” service is up and running.

<img class="wp-image-35194" src="https://www.openlm.com/wp-content/uploads/2022/03/verifying-if-the-reports-scheduler-is-fully-functi-2.png" alt="Verifying if the Reports Scheduler is fully functional by using "Services"" />

To continue with the Reports Scheduler configuration, please see <a href="https://www.openlm.com/knowledge-base/openlm-easyadmin-reports-scheduler-v21-and-higher/">this guide.</a>
