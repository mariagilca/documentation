---
title: OpenLM Broker connectivity through HTTP proxy server
description: In certain network environments, it may be necessary to configure a proxy server to activate client-based applications to communicate with OpenLM Broker..
sidebar_position: 6
---

## Introduction

In certain network environments, it may be necessary to configure a proxy server to activate client-based applications to communicate with OpenLM Broker. This article demonstrates how to connect the Broker through a proxy server.

## Manual proxy settings configuration

To connect your OpenLM Broker through a proxy server, follow these steps:

- Open any convenient text editor and create a new file called `proxy.properties`
- Paste the following properties and assign values.

```text
http.proxyHost=your.proxy.host (related to target URLs)
http.proxyPort=your.proxy.port (related to target URLs)
https.proxyHost=your.https.proxy.host (related to target URLs)
https.proxyPort=your.https.proxy.port (related to target URLs)
jdk.http.auth.tunneling.disabledSchemes= (empty as Basic Auth is disabled by default )
http.proxyUser=your.username (related to the proxy)
http.proxyPassword=your.password (related to the proxy)
```

- **Ensure that you replace the placeholders with your actual proxy server and authentication details.**
- Save this file and place it at **C:\Program Files\OpenLM\OpenLM Broker.**
- Go to Windows Services and restart the OpenLM Broker.

## Properties explanations

- `http.proxyHost` and `http.proxyPort`: The host and port settings for the HTTP proxy related to your target URLs.
- `https.proxyHost` and `https.proxyPort`: The host and port settings for the HTTPS proxy related to your target URLs.
- `http.proxyUser` and `http.proxyPassword`: If your proxy server requires authentication, you can specify the username and password.
- `jdk.http.auth.tunneling.disabledSchemes`: Empty when Basic Authentication is deactivated (default).

## Additional resources

Other than that, the file allows Apache Commons HTTPClient settings:

```text
http.proxyUser
https.proxyUser
socks.proxyUser
```

For more information on Java network properties, you can refer to the [[official documentation]](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/net/doc-files/net-properties.html).
