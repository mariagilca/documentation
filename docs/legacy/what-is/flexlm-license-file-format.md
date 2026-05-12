---
title: "FlexLM license file format"
description: FlexLM license files are in effect an agreement between the license vendor and the end user; They elaborate on the number of available licenses, the.
sidebar_position: 17
---

## General

FlexLM license files are in effect an agreement between the license vendor and the end user; They elaborate on the number of available licenses, the check-out policy for each license, the validity and expiration date of each license and so on. The FlexLM License Manager Daemon (lmgrd) interprets the license file to dispatch license requests to different license vendor daemons.

This document is a short account of the format and syntax of the license file, and its effect on licensed applications' utilization.

## Server line

License files usually begin with a single SERVER line, or three SERVER lines for Server triad configurations. The SERVER line specifies the license server's

- Hostname
- Hostid (MAC address) of the and
- TCP/IP port number of the license manager daemon (lmgrd). If no port is specified then the first available port in the range 27000 to 27009 will be used.

### Syntax

Server line syntax is as follows:

```
SERVER <server name> <host id> <lmgrd port>
```

### Example

```
SERVER my_server 001122334455 27000
```

## Vendor line

The VENDOR line specifies the

- Vendor daemon name and path. lmgrd uses this line to start the vendor daemon.
- Options file path
- Vendor daemon TCP/IP port number (default 2080).

### Syntax

```
VENDOR vendor [vendor_daemon_path][[options=]options_file_path] [[port=]port]
```

### Example

```
VENDOR adskflex adskflex.opt port=2080
```

## Feature line / increment line

FEATURE / INCREMENT lines describe specific licenses. A single FEATURE (or INCREMENT) line may be followed by several INCREMENT lines, creating separate license pools.

### Syntax

```
{FEATURE|INCREMENT} feature vendor feat_version exp_date num_lic SIGN=sign [optional_attributes]
```

### Example

```
FEATURE MayaUnltdf sgiawd 7.000 17-aug-2005 2 001122334455
```

## Package lines

PACKAGE lines provide an outline to licensing product SUITEs, and facilitate distribution of features which largely share the same FEATURE line arguments. PACKAGE lines are ineffective on their own account; they require FEATURE / INCREMENT lines to effectively activate these licenses.

### Syntax

```
PACKAGE package vendor COMPONENTS=pkg_list SIGN=pkg_sign
```

### Example

```
PACKAGE suite_example vendor_name version SIGN=12345 COMPONENTS="feature_1:version_1:3 feature_2:version_2:4"

FEATURE suite_example vendor_name version issue_date 2 SIGN=54321 SN=123
```

In this case, checking out either feature\_1 or feature\_2 will also check out the suite\_example suite. The total number of available licenses is 3×2=6 for feature\_1, and 4×2=8 for feature\_2.

For more information on the FlexLM license file format, refer to this document.
