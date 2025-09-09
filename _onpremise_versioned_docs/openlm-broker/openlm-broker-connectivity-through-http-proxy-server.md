---
title: "OpenLM Broker Connectivity Through HTTP Proxy Server"
date: "2023-11-04T21:49:01"
permalink: "https://www.openlm.com/docs/openlm-broker-installation-on-windows/openlm-broker-connectivity-through-http-proxy-server/"
posttype: "manual_documentation"
id: "6591"
---

<h2><a id="post-62449-_kog6qii9qb1m"></a>Introduction:</h2>
In certain network environments, it may be necessary to configure a proxy server to enable client-based applications to communicate with OpenLM Broker. This article demonstrates how to connect the Broker through a proxy server.

 
<h2><a id="post-62449-_dferr0ca187s"></a>Manual Proxy Settings Configuration</h2>
To connect your OpenLM Broker through a proxy server, follow these steps:

 
<ul>
 <li>Open any convenient text editor and create a new file called `proxy.properties`</li>
 <li>Paste the following properties and assign values.</li>
</ul>
<pre>http.proxyHost=your.proxy.host <em>(related to target URLs)</em>
http.proxyPort=your.proxy.port <em>(related to target URLs)</em>
https.proxyHost=your.https.proxy.host <em>(related to target URLs)</em>
https.proxyPort=your.https.proxy.port <em>(related to target URLs)</em>
jdk.http.auth.tunneling.disabledSchemes= <em>(empty as Basic Auth is disabled by default )</em>
http.proxyUser=your.username <em>(related to the proxy)</em>
http.proxyPassword=your.password <em>(related to the proxy)</em></pre>
<ul>
 <li><strong> Ensure that you replace the placeholders with your actual proxy server and authentication details.</strong></li>
 <li>Save this file and place it at <strong>C:\Program Files\OpenLM\OpenLM Broker.</strong></li>
 <li>Go to Windows Services and restart the OpenLM Broker.</li>
</ul>
<h2><a id="post-62449-_qlcyn6i6cx8x"></a>Properties explanations:</h2>
<ul>
 <li>`http.proxyHost` and `http.proxyPort`: The host and port settings for the HTTP proxy related to your target URLs.</li>
 <li>`https.proxyHost` and `https.proxyPort`: The host and port settings for the HTTPS proxy related to your target URLs.</li>
 <li>`http.proxyUser` and `http.proxyPassword`: If your proxy server requires authentication, you can specify the username and password.</li>
 <li>`jdk.http.auth.tunneling.disabledSchemes`: Empty when Basic Authentication is disabled (default).</li>
</ul>
 
<h2><a id="post-62449-_j2m1adswr8uf"></a>Additional Resources</h2>
Other than that, the file allows Apache Commons HTTPClient settings:
<pre>http.proxyUser
https.proxyUser
socks.proxyUser</pre>
For more information on Java network properties, you can refer to the [<a href="https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/doc-files/net-properties.html">official documentation]</a>.
