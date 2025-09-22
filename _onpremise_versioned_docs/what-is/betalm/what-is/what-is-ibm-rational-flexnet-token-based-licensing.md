---
title: What is IBM Rational: FlexNet Token based licensing
sidebar_position: 11
description: Overview of IBM Rational FlexNet token-based licensing.
---


The IBM Rational License Server uses **FLEXnet (FlexLM)** for licensing its products. This system has four main components that work together to manage licenses.

-----

### FLEXnet main components

The FLEXnet system for IBM Rational products is composed of:

  * The **License Manager Daemon** (`lmgrd`), which manages the overall licensing process.
  * The **Vendor Daemon**, specifically `telelogic` for IBM Rational products, which handles licenses for a particular vendor.
  * The **client application program**, which is any IBM Rational software.
  * The **license file** (`license.dat`), which contains the licensing rules and configurations.

-----

### Mode of employment

The licensing process works as follows:

1.  When an IBM Rational application starts, it uses the **`TELELOGIC_LICENSE_FILE`** system variable to locate the license server and port.
2.  The application contacts the **License Manager Daemon** on the server to request a floating license. The request is specifically for the **Telelogic vendor daemon**.
3.  The `lmgrd` daemon forwards the request to the **Telelogic vendor daemon**, which checks for available licenses.
4.  If a license is available, the `telelogic` daemon grants it, and the application runs. If no licenses are available, the request is denied, and the user receives a license denial message.

-----

### Token-based licensing

**Token-based licensing** is a form of floating license where a pool of **tokens** is used instead of a pool of licenses. When a feature is checked out, a certain number of tokens are consumed. This number is specific to each feature and is specified in the `INCREMENT` line of the license file. When the application is closed, the tokens are returned to the pool.

#### Advantages of token licensing

Token-based licensing offers several advantages:

  * **Flexibility**: Customers can use their acquired tokens for multiple products, which is appealing when they are unsure of their full feature needs.
  * **Adaptability**: As project and development needs change, customers can use different features without the cost of unused software.
  * **Simplified purchasing**: The token-based model simplifies the process of adding or trying new software during a project, eliminating the need for new purchase orders or evaluation processes.

#### Rational tools' token-based licensing

IBM Rational includes several license types, such as DOORS, Synergy, and Rhapsody.

**IBM Rational token license file examples**

  * The `INCREMENT` line specifies how many tokens a feature will consume. In the example below, the `Change` feature consumes **5 tokens**.
    ```
    INCREMENT Change telelogic 2015.04302 30-apr-2015 1 ...
    VENDOR_STRING=T10-999999:t,TLSTOK,1.0,Change,5 // 5 Tokens worth.
    ```
  * The total number of tokens in the license file is defined in another `INCREMENT` line. In this example, the total is **200**.
    ```
    INCREMENT TLSTOK ibmratl 2.0 30-apr-2015 200 ISSUER=IBM
    ```

**Rational License Server 8.1.1**
Rational License Server 8.1.1 consolidates all vendor daemons (`telelogic`, `rational`, and `ibmratl`) into a single daemon. This change has also been incorporated into several Rational products, including ClearCase and ClearQuest.