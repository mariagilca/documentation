---
title: OpenLM Broker Connectivity Through HTTP Proxy Server
sidebar_position: 5
description: Configure OpenLM Broker to connect through an HTTP proxy server for secure license server communication.
---


You can connect the **OpenLM Broker** through a proxy server by creating a `proxy.properties` file with your proxy's network and authentication details. This file must be saved in the OpenLM Broker installation directory, and the service must be restarted for the changes to take effect.

-----

## Manual Proxy Settings Configuration

To configure your OpenLM Broker to use a proxy server, follow these steps:

1.  **Create a new file** named `proxy.properties` in a text editor.
2.  **Add the proxy settings**. Paste the following code into the file and replace the placeholder values with your actual proxy server details:

<!-- end list -->

```properties
http.proxyHost=your.proxy.host
http.proxyPort=your.proxy.port
https.proxyHost=your.https.proxy.host
https.proxyPort=your.https.proxy.port
jdk.http.auth.tunneling.disabledSchemes=
http.proxyUser=your.username
http.proxyPassword=your.password
```

3.  **Save the file** to the OpenLM Broker installation directory, which is typically `C:\Program Files\OpenLM\OpenLM Broker`.
4.  **Restart the service**. Open **Windows Services**, locate the **OpenLM Broker** service, and restart it to apply the new configuration.

-----

## Properties Explained

  * **`http.proxyHost`** and **`http.proxyPort`**: Specify the host and port for HTTP traffic.
  * **`https.proxyHost`** and **`https.proxyPort`**: Specify the host and port for HTTPS traffic.
  * **`http.proxyUser`** and **`http.proxyPassword`**: These are used if your proxy server requires authentication.
  * **`jdk.http.auth.tunneling.disabledSchemes`**: This property is left empty by default as basic authentication is disabled.

-----

## Additional Resources

The `proxy.properties` file also supports other settings for Apache Commons HTTPClient, such as `http.proxyUser`, `https.proxyUser`, and `socks.proxyUser`. For more information on Java network properties, refer to the [official Java documentation](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/doc-files/net-properties.html).