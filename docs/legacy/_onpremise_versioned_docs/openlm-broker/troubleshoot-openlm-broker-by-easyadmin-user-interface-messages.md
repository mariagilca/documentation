---
title: "Troubleshoot OpenLM Broker by EasyAdmin User Interface messages"
date: "2023-11-04T21:51:38"
permalink: "https://www.openlm.com/docs/openlm-broker-installation-on-windows/troubleshoot-openlm-broker-by-easyadmin-user-interface-messages/"
posttype: "manual_documentation"
id: "6595"
---

When opening the “License Servers” widget in OpenLM’s EasyAdmin user interface, you will see status messages:

<img class="wp-image-62126" src="https://www.openlm.com/wp-content/uploads/2020/01/description-of-each-possible-broker-error-2.png" alt="Description of each possible Broker error" />
<h3><a id="post-42321-_qpx0sclamh19"></a>How to troubleshoot each scenario:</h3>
<strong>BROKER DOWN:</strong> An OpenLM Broker had connected in the past, but no connection is currently active with the license server machine and OpenLM SLM.
<ul>
 <li>Is the “OpenLM Broker” service running? Verify in Windows Services.</li>
 <li>Has the hostname or IP changed? Note that the Broker IP or hostname in the OpenLM SLM configuration tool needs to be the same as it is shown in EasyAdmin.</li>
 <li>Is it a network issue?</li>
 <li>In the Broker interface, click on <strong>Check Connectivity to OpenLM SLM.</strong></li>
 <li>Check if a connection can be established with telnet.</li>
</ul>
<strong>UNKNOWN</strong>: The connection has been established, but the incoming data can not be identified
<ul>
 <li>If this is a fresh configuration, this is a normal message which should change in about 3 minutes.</li>
 <li>Is the same License Manager type configured in both the OpenLM SLM configuration tool and the OpenLM Broker configuration tool?</li>
 <li>Does the Broker query the license manager correctly? To verify:</li>
 <li>In the configuration tool, select <strong>Port → Commands → status,</strong> then click on <strong>Execute</strong>. Does the result look OK?</li>
 <li>In the configuration tool, select <strong>Port → Commands → status,</strong> then click on <strong>Execute</strong>. Does the result look OK?</li>
 <li>If the above commands do not work, make sure the path to the license manager executable is mapped correctly. Click the Commands node of the required port → click the “<strong>…</strong>” button on the “<em>Update path for commands</em>” field → browse to the folder where the executable is located (usually in Program Files)→ click <strong>Open</strong> → click <strong>Update</strong>.</li>
 <li>Did the <strong>Port → Commands →</strong> <strong>data_inquiry</strong> command line path get mapped correctly? Try re-running the <strong>status</strong> and <strong>data_inquiry</strong> commands now.</li>
 <li>Did you upgrade the license manager? A lot of times, when upgrading the license manager, the path will change. Refer to point C above.</li>
 <li>Did you install a new license file? Make sure the Broker is pointing to the new license file under the <strong>Port → Advanced</strong> button.</li>
</ul>
<strong>LM DOWN - </strong>The Broker is operational, but the license manager is currently offline. Please verify the status of the license manager and initiate a start or restart as needed.

<strong>NO BROKER - </strong>The Broker is supposed to transmit data, but it has not yet communicated with the OpenLM SLM. This situation may arise during a fresh installation or following a significant upgrade.

<strong>REMOTE SAMPLING - </strong>This configuration does not involve a broker. Instead, the server directly queries a license manager (LM).

<strong>DATA ERROR - T</strong>he Broker is transmitting data to the OpenLM SLM, but there appears to be an issue with the data itself. OpenLM SLM can't parse the data.

<strong>CLUSTER_ERROR - </strong>Primarily seen with FLEXlm, this error occurs when multiple servers within a cluster or triad incorrectly identify themselves as the master server.

<strong>NOT CONFIGURED - </strong>The Broker is present but has not reported any port-related data.

<strong>BROKER SYNC - </strong>The connection between the Broker and the Server has been disrupted for an extended period, resulting in the Broker reporting data from the past that accumulated during the downtime.

<strong>TIME DIFF ERROR - </strong>The LM configuration in EasyAdmin is incorrect, or there is another timing issue within the LM or Broker, often stemming from Daylight Saving Time adjustments.

<strong>UP (initializing...) -</strong> A data gap, typically attributed to startup processes.

 
<h3><a id="post-42321-_nq3jpk9r0yfw"></a>Other things to check:</h3>
<ol>
 <li>Which<a href="https://www.openlm.com/download/"> version</a> are you using? It is recommended to use the latest Broker version. (Back up Broker.xml file and upgrade).</li>
 <li>If you’ve upgraded to the latest version and it suddenly stopped working, the broker.xml file may have been corrupted. Uninstall it, clean any trace files, do a fresh install, and replace the XML file with the backup.</li>
 <li>When using RMS, is the path pointing to lsmon.exe/lservnt.exe? Do they exist in your environment? If not, please contact <a href="mailto:support@openlm.com">support@openlm.com</a>.</li>
 <li>If you receive a "license file is missing" error message despite correctly configuring the license path in the Broker configuration tool, it may be due to an unsupported license file. To address this, toggle off the "Watch license file" option in the Broker configuration tool and the "Read License File" option in the EasyAdmin configuration. Then, restart both the Broker Service and the OpenLM SLM service in Windows Services.<img class="alignnone size-full wp-image-62136" src="https://www.openlm.com/wp-content/uploads/2020/01/Screenshot-2023-10-03-at-16.44.11.png" alt="" width="2540" height="1380" />
<img class="wp-image-62128" src="https://www.openlm.com/wp-content/uploads/2020/01/word-image-42321-3-1.png" width="859" height="463" /></li>
 <li>If you encounter an issue with the Broker status, be sure to inspect any error messages displayed in the Alert Window as well.<img class="wp-image-62129" src="https://www.openlm.com/wp-content/uploads/2020/01/word-image-42321-4-1.png" /></li>
 <li>The latest FlexLM might not support lmutil.exe. Please use the Broker embedded lmutil.exe.<img class="wp-image-62130" src="https://www.openlm.com/wp-content/uploads/2020/01/word-image-42321-5-1.png" /></li>
 <li>The Broker Configuration Tool operates within the context of a Windows logon account, whereas the Broker Service runs using a local system account. Certain license managers may encounter permission problems when attempting to execute data_inquiry commands under a local system account. To resolve this issue, it is advisable to switch the Service account to a Windows logon account.</li>
 <li>The "Empty Feature List" error message occurs when the streamed data lacks any features. If you are configuring Applications Manager, please ensure that you have added features within the Applications Manager Window.<img class="wp-image-62131" src="https://www.openlm.com/wp-content/uploads/2020/01/word-image-42321-6-1.png" /></li>
 <li>For DSLS, please set date_format as blank and a locale as en_US. If it doesn’t work, find the correct date_format and locale according to your license manager.</li>
 <li>For DSLS, it is essential to mention the vendor name as "Dassault Systèmes." Failing to do so will result in incorrect license output and log parsing.</li>
</ol>
