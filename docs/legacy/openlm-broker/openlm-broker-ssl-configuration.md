---
title: Set up SSL for OpenLM Broker
description: "Set up SSL for OpenLM Broker — connect Broker to OpenLM SLM over HTTPS, and serve the Broker browser interface over HTTPS."
sidebar_position: 5
---

This guide covers two separate tasks. Do the one you need:

- **Connect Broker to OpenLM SLM over HTTPS** — Broker reaches the server securely. Broker is the client.
- **Serve the Broker interface over HTTPS** — users open the Broker browser interface securely. Broker is the server.

## Connect Broker to OpenLM SLM over HTTPS

### Step 1. Point Broker to the HTTPS address

1. In the Broker configuration, change the OpenLM SLM URL from `http` to `https`.
2. Open Broker and check that it connects to the server.

**Note:** If you change the URL in the Broker browser interface, you do not need to restart Broker to test the connection. Restart Broker only if you edited `broker.xml` directly (not recommended) or changed the setting in the ConfigTool GUI. In those cases, restart after a successful test so the Broker service applies the change.

Whether you need Step 2 depends on the type of certificate your OpenLM SLM uses:

- **Public certificate** (issued by a public authority such as Sectigo or Let's Encrypt): Java already trusts it, so Broker connects automatically. You are done.
- **Private or company-issued certificate:** Java does not trust it yet. Broker logs a certificate or handshake error. Continue with Step 2.
- **Self-signed certificate:** not supported. Use a certificate issued by your company or by a public authority instead.

### Step 2. Trust the certificate (Linux)

Broker runs on Java, and Java keeps its own list of trusted certificates (a keystore), separate from the operating system. The current Broker version does not read the Linux system certificate store, so you import the certificate into Java's keystore yourself, even if Linux already trusts it. Integration with the Linux and Java system certificates is planned for a future version.

Import the **certificate authority (CA) certificate** that issued the server certificate — the root or intermediate certificate — not the server certificate itself. Certificates form a chain that leads back to a CA. The CA certificate changes rarely, so Broker keeps trusting the server even after the server certificate is renewed, which typically happens at least once a year. Trusting a single server certificate also works, but you would have to repeat the import every time that certificate changes.

**Before you start:**

- Get the issuing CA certificate (root or intermediate) in `.crt`, `.cer`, or `.pem` format.
- Know the `JAVA_HOME` path of the Java that runs Broker.

**Import the certificate:**

1. Run keytool to import the CA certificate into the Java keystore:

   ```bash
   keytool -import -trustcacerts \
     -keystore "$JAVA_HOME/lib/security/cacerts" \
     -storepass changeit -noprompt \
     -alias mycompany-root-ca -file ca-cert.pem
   ```

2. If prompted for a password, enter the keystore password. The default is `changeit`.
3. If prompted to trust the certificate, enter `yes`.
4. Restart Broker and check the connection.

**Note:** `changeit` is the well-known default password for the Java `cacerts` keystore. If your security policy requires it, change this password to a stronger one (for example, with `keytool -storepasswd`) and use the new password in the command above.

**Note:** If your certificate is in `.pfx` (PKCS#12) format, you can extract the CA certificate to a `.pem` file first:

```bash
openssl pkcs12 -in certificate.pfx -clcerts -nokeys -out ca-cert.pem
```

### On Windows

On Windows you do not need keytool. Install the issuing CA certificate in the **Trusted Root Certification Authorities** store for the **Local Computer** (not the Current User), then restart Broker.

### If Broker still cannot connect

- Connect using the exact hostname the certificate was issued to. You can find this name in the certificate details, under the Common Name or the Subject Alternative Name. Connecting with an IP address or a hostname alias might not work. A common cause is a certificate issued for a fully qualified domain name (FQDN) while Broker is configured with a shorter or local hostname.
- Make sure the account that runs Broker can read the certificate file.
- Make sure you imported the certificate into the same Java that runs Broker.

## Serve the Broker interface over HTTPS

By default, traffic to the Broker browser interface is not encrypted, even though each session uses a security token. Enable HTTPS to secure it. You configure this the same way on Windows and Linux, by editing the `application.properties` file in the Broker root directory. On Windows, this file is usually at `C:\Program Files\OpenLM\OpenLM Broker\application.properties`.

**Note:** This uses Broker's own certificate, which holds a private key. That is different from the CA certificate you trusted in Step 2. Here you can use a `.pfx` file directly, with no conversion needed.

**Steps:**

1. Open `application.properties` in the Broker root directory.
2. Set `server.ssl.enabled=true`.
3. Configure the certificate using one of the two options below.
4. Restart Broker, then open the interface using `https`.

**Note:** After you enable HTTPS, the Broker interface redirects HTTP requests to HTTPS, so existing `http` links still reach the secure interface.

**Option A — certificate file, .pfx (Windows and Linux):**

```properties
server.ssl.enabled=true
server.ssl.key-store=mycertificate.pfx
server.ssl.key-store-password=<password to the pfx file>
server.ssl.key-store-type=pkcs12
```

**Option B — Windows certificate store (Windows only):**

```properties
server.ssl.enabled=true
server.ssl.key-store-type=Windows-MY
server.ssl.key-store=
```

`Windows-MY` refers to the **Personal** certificate store (Certificates → Personal), which is one of several stores Windows provides. Install Broker's certificate in the **Local Computer** store, not the Current User store, so the Broker service can read it — unless you are sure you need otherwise.

**Note:** Keep the `server.ssl.key-store=` line even when it is empty. Broker still requires it when SSL is enabled.

**What each parameter does:**

- `server.ssl.enabled` — the main switch. Set it to `true` to turn on HTTPS for the Broker interface. Leave the lines you do not use commented out with `#`.
- `server.ssl.key-store` — the path to the certificate file, for example `mycertificate.pfx`. This certificate holds Broker's own private key. When you read from the Windows store instead, leave this line present but empty.
- `server.ssl.key-store-password` — the password that protects the certificate file.
- `server.ssl.key-store-type` — the keystore format: `pkcs12` for a `.pfx` file, `jks` for a Java keystore, or `Windows-MY` to read from the Windows certificate store.
- `server.ssl.key-alias` — optional. Selects one certificate by its alias when the keystore holds more than one.
