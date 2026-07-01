---
title: "IBM Rational FlexNet token-based licensing"
description: The IBM Rational License Server uses FLEXnet (FlexLM) for licensing IBM Rational products.
sidebar_position: 11
---

## What is IBM Rational FlexNet token-based licensing?

The IBM Rational License Server uses FLEXnet (FlexLM) for licensing IBM Rational products.

## FlexNet main components

The four main components of FLEXnet are:

- The License Manager Daemon, lmgrd
- The Vendor Daemon, telelogic
- The client application program, in this case any IBM Rational application
- The license file, license.dat

## Mode of employment

- When an IBM Rational product is started, the program uses the TELELOGIC_LICENSE_FILE system variable to find out the name of the computer that's running the FLEXnet license server and the port that it's using.
- The program contacts the license manager on the FLEXnet license server, using the specified port. It requests a floating license and makes the request for the Telelogic vendor daemon.
- On the FLEXnet license server, the license manager sends the request to the Telelogic vendor daemon. The Telelogic vendor daemon checks to see if any licenses are available.
- If there are free licenses, the Telelogic vendor daemon grants a license and the program runs. If there aren't any licenses available, the Telelogic vendor daemon refuses the request, and the program fails to start and displays a license denial message.

Token-based licensing

Token licenses are in fact a form of floating license, only that instead of having a pool of licenses - it has a pool of tokens. When a feature is checked-out, a certain amount of tokens are consumed. The number of consumed tokens is specific to each feature, and is apparent in the feature/Increment line in the license file. When the application is closed, the tokens are returned to the pool for other end users to use.

## Advantages of token licenses

Having the ability to apply the acquired licenses to multiple products is an appealing concept:

- Customers are not always aware of the full array of features they may acquire. having a token based license scheme ensures customer satisfaction from the license acquisition.
- As development stages progress, customer needs change. They may require different licensed features, and eliminate the charge of "unused" software.
- The entire license purchasing method is simplified. Customer can add/try new software during project, without new PO or evaluation process

## Rational tools' token-based licensing

### IBM Rational license types

IBM Rational includes the following license types:

DOORS, Synergy, Change, Tau, System Architect, Focal Point, Rhapsody, Publishing Engine, Logiscope and Team Webtop

### IBM Rational token license files examples

- The Increment / Change line marks the number of tokens to be consumed:

```text
INCREMENT Change telelogic 2015.04302 30-apr-2015 1 ...

VENDOR_STRING=T10-999999:t,TLSTOK,1.0,Change,5  ... // 5 Tokens worth.
```

- This is an INCREMENT line indicating the total number of Tokens in the license

file. In this case, it is 200:

```text
INCREMENT TLSTOK ibmratl 2.0 30-apr-2015 200 ISSUER=IBM
```

### Rational License Server 8.1.1

Rational License Server 8.1.1 incorporates all vendor daemons (telelogic, rational, and ibmratl) into one. This change has also been incorporated into multiple Rational products such as ClearCase and ClearQuest.

## References

https://publib.boulder.ibm.com/infocenter/rational/v0r0m0/index.jsp?topic=/com.ibm.rational.license.doc/topics/r_lic_log_file.html

https://www-01.ibm.com/support/docview.wss?uid=swg27023414&aid=1
