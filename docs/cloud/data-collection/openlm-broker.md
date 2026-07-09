---
title: "OpenLM Broker"
sidebar_position: 2
description: "The OpenLM Broker is a lightweight service installed on your license servers. It collects license manager data, forwards it to OpenLM, and carries out management commands — configurable through its own browser-based Broker UI."
legacy_equivalent: /legacy/category/openlm-broker
legacy_equivalent_notice: false
---

## Overview

The **OpenLM Broker** is a lightweight Java service installed on (or next to) each of your license servers. It is the component that talks to your license managers: it runs their status and usage queries, reads their log files, watches license and option files, and streams everything to OpenLM — either the OpenLM Platform or an on-premises OpenLM Server.

![The Broker UI, showing the OpenLM Servers screen with configured server connections](/services/openlm-broker/broker-ui-olm-servers.png)
*The Broker UI — the Broker's own browser interface, served from the license server on port 5090*

The Broker:

- **Collects usage data** — it queries the license manager about once a minute (for example, `lmutil lmstat` for FLEXlm) and combines the output with newly read log lines into a single usage snapshot.
- **Reads log files** — debug and audit logs are parsed continuously, including activity that happened while the Broker was down.
- **Watches license and option files** — changed files are detected and sent to OpenLM automatically.
- **Executes commands from OpenLM** — start, stop, or reread a license manager, deploy an option file, upload logs, restart or update itself. This is what powers remote management from the [Broker Hub](./broker-hub).
- **Buffers data during outages** — if OpenLM is unreachable, usage data is queued on disk and delivered when the connection returns, so statistics have no gaps.

Deploy a Broker on every license server. A single Broker can monitor several license managers (ports) on its machine, and can report to more than one OpenLM destination at the same time.

:::note
Don't confuse the three Broker-named components. The **Broker** (this page) is the service on your license server. The **[Broker Hub](./broker-hub)** is the Platform console where you approve and manage all your Brokers. The **[Cloud Broker](./cloud-broker)** is a Platform service that collects data from SaaS platforms where no Broker can be installed.
:::

## Install the Broker

Download the Broker for your operating system from the [OpenLM Downloads page](https://www.openlm.com/download-center/), and see [Install and configure OpenLM components](../deployment-operations/components-installation) for the step-by-step procedure. In short:

- **Windows** — run the installer. The Broker is registered as the **OpenLM Broker** Windows service and ships with its own bundled Java runtime, so no Java installation is required. The default installation folder is typically `C:\Program Files\OpenLM\OpenLM Broker`.
- **Linux** — install the `.rpm` or `.deb` package (installs to `/opt/broker`), or extract the `.tar.gz` archive, set `JAVA_HOME` in `settings.sh`, and run `./broker.sh install`. The Broker is registered as a systemd unit (named `openlm_broker_root` by default) and requires a system Java runtime (Java 8 or 11). The `broker.sh` script also provides `start`, `stop`, `restart`, `status`, and `uninstall` commands.

To connect a Broker to the OpenLM Platform you also need a **Broker authorization file** — a JSON file with the credentials that identify your tenant. [Generate it in the Platform](../openlm-administration/identity#generate-a-new-authorization-file) before or right after installing.

Upgrades — whether run locally or pushed from the Broker Hub — never touch your configuration: `broker.xml`, the Broker's identity file, logs, and buffered data all survive updates.

### Network requirements

| Direction | Port | Purpose |
| --- | --- | --- |
| Outbound | 443 (HTTPS) | Reporting to the OpenLM Platform |
| Outbound | 5015 (default) | Reporting to an on-premises OpenLM Server (older installations might use 7016) |
| Local | License manager ports (for example, 27000 for FLEXlm) | Querying the license managers on the same machine |
| Inbound (optional) | 5090 | The Broker UI, if you want to open it from another computer |

The Broker only ever opens connections *to* OpenLM — the Platform never connects into your network. If the Broker must reach OpenLM through an HTTP proxy, see [Proxy Configuration](#proxy-configuration).

## Open the Broker UI

The Broker ships with its own browser interface, the **Broker UI**, served by the Broker service itself on port **5090**:

```
http://<license-server>:5090/
```

- **On the license server itself**, open `http://localhost:5090/` — no login is required for local access.
- **From another computer**, the Broker UI asks for a **remote access token**:

![The remote access token screen shown when opening the Broker UI from another computer](/services/openlm-broker/broker-ui-token.png)
*Remote access to the Broker UI requires a token generated on the license server itself*

A token can only be generated on the license server, which is what makes remote access safe: open `http://localhost:5090/api/new-token` in a browser on that machine (or run the `ssh`/`winrs` command shown on the token screen), paste the returned token into the **Enter Token** field, and select **Continue**. Tokens expire after 30 minutes or when the Broker service restarts — enter a fresh one when the screen reappears.

:::tip
You rarely need to type the address by hand. In the [Broker Hub](./broker-hub), selecting a Broker's **Broker UI** icon opens that Broker's interface for you, with the token handled automatically.
:::

Other things worth knowing about the Broker UI:

- **The port can differ.** If port 5090 is taken (for example, by another Broker instance), the Broker binds the next free port and records it in `broker.xml`. The **Current Broker** selector at the bottom of the sidebar lists every Broker instance on the machine as *version #port*, and lets you switch between them when browsing locally.
- **Changes apply immediately.** Every **Save** in the Broker UI reconfigures the running service on the spot — no service restart is needed.
- **Unsaved changes are guarded.** If you navigate away from an edited form, the Broker UI asks whether to save or discard your changes.
- **It can be served over HTTPS** — see [Security](#security).

![The Current Broker selector showing several Broker instances on one machine](/services/openlm-broker/broker-ui-instances.png)
*The Current Broker selector lists every Broker instance installed on the machine*

The sidebar screens mirror the Broker's job: **OpenLM Servers** (where the data goes), **License Managers** (where the data comes from), and **Settings** (the Broker itself).

## First run: Broker Initial Setup

When a freshly installed Broker has no server connection and no license managers configured, the Broker UI opens the **Broker Initial Setup** dialog:

1. **Choose the connection type** — *Local OpenLM Installation* (an on-premises OpenLM Server) or *OpenLM Cloud Account* (the OpenLM Platform).
2. **Enter the connection details** — the URL, Client ID, and Client Secret, or select **Import Broker Authorization File** and pick the `.json` file you generated in the Platform. **Continue** tests the connection.
3. **Detect license managers** — the Broker scans the machine and pre-configures every license manager it finds.
4. **Approve the Broker** — finish by approving the new Broker in OpenLM: in the Platform this is the [Broker Hub's Pending Brokers view](./broker-hub#approve-pending-brokers).

You can skip the guided setup and configure everything manually from the **OpenLM Servers** and **License Managers** screens — the sections that follow cover each screen in full.

## Connect the Broker to OpenLM: the OpenLM Servers screen

The **OpenLM Servers** screen lists the destinations this Broker reports to. Each connection is a card showing the host name, its **Status** (Active, Disabled, or Standby), whether **SSL** is used, the **Port**, and the offline **Buffer** state and size.

To add a connection, select **Add Server**, then choose the connection type:

![The Add OpenLM Server dialog with the On-premise OpenLM Server and OpenLM Cloud options](/services/openlm-broker/broker-ui-add-server.png)
*A Broker can report to an on-premises OpenLM Server, to the OpenLM Platform, or to both at once*

- **On-premise OpenLM Server** — the URL defaults to `http://localhost:5015`; change the host name to your OpenLM Server. Use `https://` in the URL to connect over SSL.
- **OpenLM Cloud** — the connection to the OpenLM Platform. Instead of typing the URL, Client ID, and Client Secret by hand, select **Import Broker Authorization File** and pick your tenant's authorization file — it fills in the URL and credentials for you.

![The Edit OpenLM Connection form with URL, Client ID, Client Secret and the Advanced section expanded](/services/openlm-broker/broker-ui-edit-connection.png)
*The connection form. Check Connectivity verifies the URL and credentials before you save*

Select **Check Connectivity** to test the connection before saving — it verifies both that the server is reachable and that the credentials are accepted.

The **Advanced** section holds the delivery settings:

| Setting | Default | Meaning |
| --- | --- | --- |
| Sending timeout (sec) | 45 | How long the Broker waits for the server to accept a message |
| Buffering | On | Buffer usage data on disk while the server is unreachable |
| Buffer file size (mb) | 3 | Size of each buffer segment file on disk |
| Clear Buffer | — | Permanently deletes all buffered, not-yet-sent data for this connection |

:::warning
**Clear Buffer** discards data that has not reached OpenLM yet, which can leave gaps in usage statistics. Use it only if a corrupted buffer is reported or you knowingly want to drop the backlog.
:::

The **Inactive/Active** toggle at the top pauses or resumes reporting to this destination without deleting it, and **Delete** removes the connection entirely. A card marked **Standby** means OpenLM itself has told this Broker to pause sending (for example, while a Platform tenant is suspended) — the Broker keeps buffering locally and checks back every 3 minutes, so no action is needed on the Broker side.

## Configure license managers

The **License Managers** screen lists every license manager (port) the Broker monitors, with its **Type**, **Port**, **Vendor**, **Status**, and whether a **Log file** and **License file** are configured. The **Host** field next to the title is the host name the Broker reports for this license server — it defaults to the machine's own host name and rarely needs changing.

![The License Managers screen listing the monitored license managers](/services/openlm-broker/broker-ui-license-managers.png)
*The License Managers screen. Select the pencil icon to open a license manager's full configuration*

### Detect license managers automatically

Select **Detect** to have the Broker scan the machine for running license managers. It identifies known license manager processes, extracts their ports, tool paths, and log file locations, verifies each candidate by running its status command, and adds what it finds to the list. On Linux, the detection dialog offers an optional sudo password to widen what the scan can see. Leaving it empty runs a basic scan.

Detection covers the most common license managers — FLEXlm (lmgrd/lmadmin, including ESRI ArcGIS License Manager), DSLS, LM-X, RMS, HASP, Sentinel, TASKING, Houdini, GEOVIA, Moldex3D, Zoo, and more. License managers that detection cannot see can always be added manually.

### Add a license manager manually

Select **Add License Manager**, pick the **LM Type** from the dropdown (see the [full list of supported license managers](#supported-license-managers)), and set the port the license manager listens on:

![The Add License Manager dialog with the LM Type dropdown open](/services/openlm-broker/broker-ui-add-lm.png)
*The LM Type dropdown is populated with all license manager types the Broker supports*

The Broker pre-fills everything it can for the chosen type — default commands, log file types, the Windows service name — from its built-in per-LM templates. After adding, the license manager opens in the editor described next.

### The license manager editor

Selecting a license manager (or the pencil icon) opens the editor. The header shows the read-only **LM Type** and **Hostname/IP**, the editable **Port**, and an **Inactive/Active** toggle that pauses monitoring without deleting the configuration. Below it, the configuration is organized into tabs: **Settings**, **Commands**, **Vendors**, and **Log Files** (certain license manager types add an **Advanced** tab, and types without license file support omit **Settings**).

Select **Save** at the bottom right to apply your changes — they take effect immediately.

#### Settings tab

License file handling and type-specific options:

![The license manager Settings tab with license file path and watch options](/services/openlm-broker/broker-ui-lm-settings.png)
*License file paths can be detected automatically or set manually*

- **Detect license file path automatically / Set license file path manually** — in manual mode you add one or more explicit license file paths (a built-in file explorer lets you browse the license server's disks from the Broker UI).
- **Watch License file** — when on, the Broker resends the license file whenever it changes, checking at the **Watch interval** (default 300 seconds). License files are also resent every 12 hours regardless of changes.
- **Allow license file sorting** — lets OpenLM maintain a sorted copy of a FLEXlm license file (used with license ordering features).
- **Cluster / Failover Instance / Cluster name** — for license managers running in a redundant (cluster) configuration; available only for types that support cluster commands.
- **Date format / Date language** — for license managers whose output contains ambiguous date formats (for example DSLS or Zoo); **Check date format on file** validates your choice against the actual file.

#### Commands tab

The commands the Broker runs against this license manager, grouped into **Periodic commands** (run on a schedule — *Status* and *Data Inquiry*) and **On-demand commands** (run when you or OpenLM triggers them — *Start*, *Stop*, *Reread*, *Remove License*, and others depending on the type):

![The Commands tab showing the Status command configuration and its command line](/services/openlm-broker/broker-ui-lm-commands.png)
*Each command has an editable command line. Execute runs it once so you can verify the output*

- **Executable path** — the folder holding the license manager's utilities (for example `lmutil`). For FLEXlm and LM-X the Broker ships its own bundled tools, so this can stay empty.
- Each command has an on/off toggle, a **Timeout** (default 60 seconds), and — for periodic commands — a **Watch interval** (default 55 seconds, which in practice means once a minute).
- **Use the operating system start/stop commands** — on Windows, runs start/stop/reread through the license manager's Windows service (`NET START`/`NET STOP` with the given **Service name**) instead of the vendor utilities.
- **Parallel execution** — allows multipart command lines to run their parts concurrently.
- **Filter Reservations** (FLEXlm Data Inquiry only) — excludes license reservations from usage data.
- The command line itself is editable. Select **Execute** to run it once and inspect the output, or **Restore Default** to return to the built-in template for this license manager type.

:::tip
**Execute** is the fastest way to troubleshoot a license manager that shows no data: if the command output is empty or errors, the problem is between the Broker and the license manager, not in OpenLM.
:::

#### Vendors tab

The vendor daemons of this license manager, one row per vendor (for example `adskflex` for Autodesk on FLEXlm). Vendor names must match the license manager's actual daemon names exactly. For license manager types that support option files, each vendor can also carry its option file definition — its path, an optional backup folder, and a **Watch** toggle (default interval 600 seconds) that makes the Broker resend the file when it changes. A few types name the file differently — for example, DSLS calls it the *Authorization Rules File* and RLM the *ISV Options File*.

#### Log Files tab

The license manager log files the Broker reads, each with its **Log type**, name, path, associated **Vendor**, and a **Monitoring** toggle:

![The Log Files tab listing a FlexLM debug log with monitoring turned on](/services/openlm-broker/broker-ui-lm-logfiles.png)
*Log files feed denials, sessions, and historical activity into OpenLM*

The available log types depend on the license manager — for FLEXlm they are *FlexLM Debug Log File*, *ESRI Audit Log File*, and *Other*. When adding or editing a log file, the **Advanced** section offers the file **Encoding**, a sent-data size limit, and **Watch files by pattern** — useful for license managers that rotate their logs, so the Broker automatically follows the newest matching file.

The Broker remembers its position in each log between restarts and reads FLEXlm debug logs historically — activity from a period when the Broker was down is still recovered from the log, as long as the downtime is under 24 hours.

#### Advanced tab

Certain license manager types (for example Altium, GitLab, or Salesforce) need extra type-specific options such as API credentials or feature totals. For those types an **Advanced** tab lists the options as editable key/value pairs. Secret values are stored encrypted.

## Broker settings

The **Settings** screen configures the Broker service itself, in a row of tabs:

![The Broker Settings screen on the Broker Log Level tab](/services/openlm-broker/broker-ui-settings.png)
*Broker Settings: log level, self-update, web UI control, TCP monitoring, and proxy configuration*

- **Broker Log Level** — the verbosity of the Broker's own logs (ERROR by default — raise it to DEBUG while investigating an issue, then lower it back). **Download Logs** saves all Broker logs as a single `broker-logs.zip` — the file OpenLM support usually asks for. **Dump Threads** downloads a diagnostic thread dump.
- **Update Broker Version** — **Update** makes the Broker download the latest version from the OpenLM download site and update itself in place. Configuration and buffered data are preserved. You can also push updates centrally from the [Broker Hub](./broker-hub#update-brokers).
- **Reset Configuration** — resets the Broker to an empty configuration. The current `broker.xml` is backed up first as `broker_<DateTimeOfReset>.xml`; to roll back, rename that file to `broker.xml`. As the tab itself warns: don't use Reset to remove individual license managers (delete them on the License Managers screen) or to rerun detection (use **Detect**).
- **Turn off Web UI** — disables the Broker UI entirely, for hardened environments. After turning it off, no configuration can be applied remotely. To turn the UI back on, edit `broker.xml` on the license server, set `webUIPort="5090"`, and restart the Broker service.
- **TCP Connections Monitoring** — when on, the Broker samples the TCP connections of the monitored license manager ports every few minutes and reports them to the Platform. Off by default.
- **Proxy Configuration** — the HTTP proxy (host, port, and optional credentials) the Broker uses to reach OpenLM. Restart the Broker service after changing proxy settings to make sure they take effect.

## When OpenLM is unreachable: buffering

Delivery problems don't lose data. If sending fails repeatedly, the connection switches to offline mode: usage snapshots, log data, and license/option files are appended to compressed buffer files on disk (the `bufferfiles/` folder in the Broker installation directory), while the Broker keeps retrying with an increasing backoff of up to 10 minutes. Once the server responds again, the backlog is delivered oldest-first and the Broker returns to live sending — statistics on the OpenLM side simply fill in.

Buffering is on by default and controlled per connection ([Advanced settings](#connect-the-broker-to-openlm-the-openlm-servers-screen)). Two limits apply: each buffer segment file is capped (3 MB by default), and buffered data older than 10 days is discarded. There is no cap on the total buffer size — a Broker that is offline for a long time keeps accumulating segments, so keep an eye on disk space during extended outages.

Every Broker also has a permanent identity — a unique ID stored in the `broker.id` file next to `broker.xml`. This is how OpenLM recognizes a specific Broker across restarts, upgrades, and IP changes.

:::warning
If you clone a virtual machine with an installed Broker, delete the clone's `broker.id` file before starting it (a new one is generated automatically). Two Brokers sharing the same identity show up as **Duplicate** in the [Broker Hub](./broker-hub#understand-broker-status).
:::

## Security

- **Local-trust access model.** The Broker UI requires no credentials from `localhost` but demands a [remote access token](#open-the-broker-ui) from anywhere else — and tokens can only be minted on the license server itself. Administrators without OS access to the license server cannot reconfigure the Broker.
- **HTTPS for the Broker UI.** The Broker creates an `application.properties` file in its installation directory on first start. Set `server.ssl.enabled=true` there and point it at a certificate — either a keystore file (`.pfx`/`.jks`) or, on Windows, the `Windows-MY` OS certificate store — then restart the service. Local HTTP access on the license server keeps working.
- **TLS to OpenLM.** Connections to the Platform use HTTPS with standard certificate validation. On Windows the Broker trusts the Windows certificate store, so corporate CA certificates are picked up automatically; on Linux, import private CA certificates into the Java runtime's trust store.
- **Secrets are encrypted.** The Client Secret and other stored passwords are kept encrypted in the Broker's configuration files, and the Broker UI never displays them.
- **Arbitrary remote commands are off by default.** OpenLM can only send the Broker its predefined management commands. Free-form *custom* commands are refused unless explicitly enabled by setting `customCommands=true` in `config.properties` on the license server.
- **The web UI can be turned off** entirely on hardened hosts — see [Broker settings](#broker-settings).

## Manage Brokers from the Platform

Day-to-day Broker fleet management happens in the [Broker Hub](./broker-hub), not on each license server. After a new Broker first reports in, approve it under **Pending Brokers**; from then on the Platform can remotely:

- monitor Broker health and version,
- restart a Broker,
- update Brokers to a new version (individually or in bulk; requires Broker 22.6.13.105 or later),
- start, stop, or reread a license manager, and download or deploy its license file,
- collect the Broker's log bundle,
- open any Broker's [Broker UI](#open-the-broker-ui) directly.

## Files and directories

Everything the Broker owns lives in its installation directory:

| Path | Purpose |
| --- | --- |
| `broker.xml` | The entire Broker configuration. Every save also writes `broker.xml.backup` |
| `broker.id` | The Broker's permanent unique identity — preserve it when moving a Broker, delete it when cloning one |
| `config.properties` | Service name, version, update URL, and the `customCommands` switch |
| `application.properties` | HTTPS settings for the Broker UI |
| `proxy.properties` | HTTP proxy settings for reaching OpenLM |
| `lmsettings/` | Built-in templates for every supported license manager type |
| `bufferfiles/` | Buffered usage data queued while OpenLM is unreachable |
| `markerfiles/` | Saved read positions in license manager log files |
| `logs/` | The Broker's own logs — `broker-service.log` (rolling, 10 files × 10 MB) plus a log per license manager port and per server connection |

Back up `broker.xml` and `broker.id` together — restoring both onto a fresh installation fully restores a Broker, including its identity in OpenLM.

## Supported license managers

The Broker supports 100 license manager types with built-in defaults. The **LM Type** dropdown lists them all; each type comes with ready-made commands, log parsers, and defaults. For vendor-specific setup guides, see [Connect license managers](/cloud/category/connect-license-managers).

<details>
  <summary>Full list of supported license manager types</summary>

AbsInt, AEScripts, AIMMS, Altair, Altair Managed, Altium License Manager, Altium Primary Server, Altiva, Ash Ware, Autodesk Cloud, BetaLM, Cadenas, CADMATIC, Canvas, Chaos, CodeMeter, COMOS, COSCOM, CREO, Datamine, DSLS, DSLS Cloud, DUG Insight, EPLAN, Esprit, ETAP, FLEXlm, FlexNet Embedded, FlexNet Embedded JSON, FVA, GEOVIA, GitLab, GNS, GreenHills, Guardant, Hardlock, HASP, Helios, Hosted HyperWorks Units, Houdini, Infograph, Infor SLM, Innovyze, Intergraph, INTES, IPGLock, JAZZ, JetBrains, Juniper, L3Harris, LexFloat Server, Licman, LiMBR, LimeLM, LMX, LSDYNA, LUM, Materialise Magics, MathLM, MlicAdmin, Moldex3D, NIVLM, OGI, OLicense, OpenLM Applications Manager, OpenLM Generic, OpenText, Oracle Enterprise Manager, Parasoft, Peloton RigView, Phase2Phase Server, Presto, ProSim, Pure Variants, QPS, Razorcat, REVision Effects, RLM, RMS, Salesforce, SEH_UTN, Seisware, Sentinel SuperPro, Siemens Polarion, SIMATIC, SlickEdit, Sparx, Sparx Pro, SPLM, Squish, TASKING, Tebis, tNavigator, Transoft Solutions, Tweak, UniSim, Venturis, VSLM, Zetaware, Zoo.

The **OpenLM Generic** type is an empty template for license managers not on the list — you supply the query commands, and the Broker handles scheduling and delivery.

</details>

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| The Broker UI doesn't open on port 5090 | Another process (often a second Broker instance) took the port, and the Broker moved to the next free one — check the `webUIPort` attribute in `broker.xml`. If it says `off`, the web UI was disabled: set a port number and restart the service |
| The token screen keeps coming back | Tokens expire after 30 minutes and on every Broker restart — generate a fresh one from the license server. If it happens immediately, check that the browser can keep session storage for the site |
| A new Broker doesn't appear in Pending Brokers | Use **Check Connectivity** on the OpenLM Servers screen. If it fails, verify the URL, import the authorization file again, and check firewall/proxy rules for outbound HTTPS |
| A license manager shows no usage data | Open its **Commands** tab and **Execute** the Data Inquiry command — if the output is empty or an error, fix the executable path, port, or host name; if the output looks right, check the connection status on the OpenLM Servers screen |
| The Broker shows **Time Sync Error** in the Broker Hub | The license server's clock has drifted — sync it with Network Time Protocol (NTP). Correct time matters, because the Broker converts usage timestamps from the machine's local time |
| Disk usage grows in `bufferfiles/` | The Broker can't reach OpenLM and is buffering. Restore connectivity and the backlog drains automatically; buffered data expires after 10 days |
| Something else | Raise the **Broker Log Level** to DEBUG, reproduce the issue, then **Download Logs** and open the zip — or send it to OpenLM support |
