---
title: "OpenLM Broker Web UI"
date: "2022-02-04T16:13:10"
permalink: "https://www.openlm.com/docs/openlm-broker-installation-on-windows/openlm-broker-webui/"
posttype: "manual_documentation"
id: "6598"
---

<h2>Overview</h2>
Starting from v21.11, the OpenLM Broker has a Browser UI that is accessible from other machines in the same network.

This means the Broker can be controlled and configured remotely. The functionality is useful when there are many Brokers and these require a centralized control station.
Furthermore, Brokers on Linux machines can be accessed via Web UI.
<h2><a id="post-34821-_p64t2el1w4mn"></a> Security Concerns</h2>
The Broker web UI uses port 5090. Keeping in mind the security aspects, the port can be either opened or closed. We also set a Token in order to access the Broker Browser UI from a remote machine.

In the Broker XML file, the UI port can be changed:

<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-53.png" />

In Broker Browser, the web UI can be turned off:

<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-54.png" />

This will make the Broker XML port setting to be off:

<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-55.png" />

Please change it back to the designated port whenever a revert action is required.
<h2><a id="post-34821-_wzq8fvsp6yap"></a> Remote Login Process</h2>
The OpenLM Broker has a new WebUI that is installed with Broker version 21.11 and on.

The Broker WebUI can be accessed from URL <a href="http://localhost:5090/">http://localhost:5090</a> remotely by changing localhost to the server Hostname.

You will need to generate an access token for remote access:

<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-56.png" />

A token can only be retrieved after login into the Broker system. The following URL returns it as plain text:

<a href="http://localhost:5090/api/new-token">http://localhost:5090/api/new-token</a>

The commands below can be used to get a token from a command line remotely.

Linux:
<pre>ssh server_name wget -O - http://localhost:5090/api/new-token</pre>
Windows:
<pre>winrs -r:server_name powershell -command "(Invoke-WebRequest -Uri http://localhost:5090/api/new-token -Method GET).Content"</pre>
Example using putty

<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-57.png" />

The token will time out in 30 minutes after generation. It also expires if Broker Service is restarted.
<h2><a id="post-34821-_fw0aqn9il9l5"></a>Basic Functionality</h2>
<h4><a id="post-34821-_yh0aoy75ejmv"></a> Adding the OpenLM Server</h4>
<ol>
 <li>From the <strong>OpenLM Servers </strong>tab, click <strong>Add Server.
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-58.png" />
</strong></li>
 <li> Select the Type of connection On-premise or OpenLM Cloud and click Add:
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-59.png" /></li>
 <li>Input the hostname of the OpenLM Server or if you are using the Identity Service go to Start→Administration→System Security→Security→Authorization→Add and generate the authorization file. Import Broker Authorization File and click <strong>Save.
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-60.png" />
</strong></li>
 <li>In the License Managers screen, you can see and add your license managers.</li>
 <li>Click <strong>Add License Manager.</strong></li>
 <li>Select the type of license manager from the dropdown and enter the port. Click <strong>Add</strong>.
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-62.png" /></li>
 <li>Add the License file information:
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-63.png" /></li>
 <li>Add the Commands information. The path to the executable can be entered and this action will update the command for all the paths and <em>Status and Data_Inquiry.
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-64.png" />
</em></li>
 <li>Input the Vendor information:
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-65.png" /></li>
 <li>Add the vendor name and Options File information, then <strong>Confirm:
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-66.png" />
</strong></li>
 <li>Add the Log File:
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-67.png" /></li>
 <li>Select the Log File Type, update the Log name, input the log path then select the vendor. Click <strong>Confirm then Save:
<img src="https://www.openlm.com/docs/wp-content/uploads/2022/03/word-image-68.png" />
</strong></li>
</ol>
 
<h2><a id="post-34821-_6bj9hx3tjkc"></a>Switch between parallel Broker instances</h2>
The  Brokers can be switched from UI if you are using multiple Brokers installed on the same machine.

<img src="https://www.openlm.com/docs/wp-content/uploads/2022/03/word-image-69.png" />

You can also type a URL with a designated port like localhost:5090, localhost:5091 to switch.
<h2><a id="post-34821-_t85skcy9v7su"></a>Limitations</h2>
The following functions in the Broker Configuration tool can’t be used in Browser UI.
<ul>
 <li>Broker Restart</li>
 <li>License File Sorting</li>
 <li>No File Browsing functionality</li>
</ul>
