---
title: What is FlexLM License file format
sidebar_position: 17
description: Overview of the FlexLM license file format and its structure.
---

FlexLM license files act as an agreement between the software vendor and the end user, detailing the number of licenses available, checkout policy, and expiration dates. The FlexLM License Manager Daemon (`lmgrd`) uses this file to manage and dispatch license requests. This document provides a brief overview of the format and syntax of the FlexLM license file.

### SERVER line

The license file typically begins with one `SERVER` line. For a redundant server configuration, known as a **triad**, there will be three `SERVER` lines. This line specifies the following for the license server:

  * Hostname
  * HostID (MAC address)
  * TCP/IP port number for `lmgrd`. If no port is specified, a port between 27000 and 27009 will be used.

#### Syntax

```
SERVER <server name> <host id> <lmgrd port>
```

#### Example

```
SERVER my_server 001122334455 27000
```

### VENDOR line

The `VENDOR` line provides details about the vendor daemon, which manages the specific licenses for that vendor's software. It specifies:

  * Vendor daemon name and path. `lmgrd` uses this to start the vendor daemon.
  * The path to the **Options file**, if one is used.
  * The vendor daemon's TCP/IP port number (default is 2080).

#### Syntax

```
VENDOR vendor [vendor_daemon_path][[options=]options_file_path] [[port=]port]
```

#### Example

```
VENDOR adskflex adskflex.opt port=2080
```

### FEATURE line / INCREMENT line

`FEATURE` or `INCREMENT` lines describe specific licenses. A single `FEATURE` line can be followed by multiple `INCREMENT` lines, which create separate license pools.

#### Syntax

```
{FEATURE|INCREMENT} feature vendor feat_version exp_date num_lic SIGN=sign [optional_attributes]
```

#### Example

```
FEATURE MayaUnltdf sgiawd 7.000 17-aug-2005 2 001122334455
```

### PACKAGE lines

`PACKAGE` lines are used to define **licensing product suites**. They group features that share common arguments, making it easier to manage product bundles. A `PACKAGE` line is not functional on its own and requires a `FEATURE` or `INCREMENT` line to be activated.

#### Syntax

```
PACKAGE package vendor COMPONENTS=pkg_list SIGN=pkg_sign
```

#### Example

```
PACKAGE suite_example vendor_name version SIGN=12345 COMPONENTS="feature_1:version_1:3 feature_2:version_2:4"

FEATURE suite_example vendor_name version issue_date 2 SIGN=54321 SN=123
```

In this example, checking out either `feature_1` or `feature_2` will also check out the `suite_example` suite. The total number of licenses available is `3 * 2 = 6` for `feature_1` and `4 * 2 = 8` for `feature_2`.