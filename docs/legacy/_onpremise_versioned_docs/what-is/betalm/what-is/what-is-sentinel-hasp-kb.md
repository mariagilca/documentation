---
title: What is Sentinel HASP?
sidebar_position: 19
description: Overview of Sentinel HASP and its licensing.
---


Sentinel HASP was a licensing solution that originated from **Aladdin Knowledge Technologies**. It was a versatile product offering both **hardware (dongle)** and **software-based** licensing options. In 2008, Aladdin was acquired by **SafeNet**, and then in 2014, SafeNet itself was acquired by **Gemalto**.

### What is Sentinel HL?

**Sentinel HL** is the hardware-only license protection application that succeeded Sentinel HASP. It is backward-compatible with Sentinel HASP HL keys and can be updated remotely using Gemalto’s proprietary **UpdateOnChip™** mechanism. Gemalto holds a dominant market share in hardware license managers.

OpenLM provides the following functionality for monitoring Sentinel HL licenses:
* **Denials Reporting**: Yes
* **Report resolution**: By Minute
* **Borrowed License reporting**: No
* **Expiration Date reporting**: No
* **Multiple Server Redundancy Support**: No
* **Token License Support**: No

Sentinel HASP is a concurrent-usage software licensing solution provided by SafeNet. It comes in two flavors:
* **HASP SL**: Uses software protection keys to enforce licensing.
* **HASP HL**: Uses hardware dongles.

Sentinel HASP can tie licenses to specific virtual machines (VMs) and offers flexibility in licensing, such as per-session or feature-based charges and time-based subscriptions. OpenLM supports monitoring Sentinel HASP from version 5.0 onward by interfacing with the Sentinel Admin Control Center web interface.

### What is Sentinel LDK?

**Sentinel LDK (License Development Kit)** is a product from **Gemalto** that independent software vendors (ISVs) use to license their proprietary software. LDK allows ISVs to choose from a variety of license models, including perpetual, subscription, or cloud-based. It also supports a combination of hardware and software license management through its **Cross-Locking™** technology.

### What is Sentinel EMS?

**Sentinel EMS** is an **entitlement management system** from Gemalto that supports the entire product lifecycle, from license generation and activation to usage tracking and reporting. It provides vendors with flexibility and versatility in their license offerings and allows for seamless upgrades for existing customers.

### What is Sentinel Fit?

**Sentinel Fit** is a compact license manager designed for **embedding into devices**, making it ideal for the **Internet of Things (IoT)**. Despite its small size, it offers flexible licensing models and supports remote license updates.

### What is Sentinel UP?

**Sentinel UP** is an application from **Gemalto** that automates the distribution of software updates to entitled users. It considers factors like global location, product version, and operating platform when delivering updates.

### Who is Gemalto?

**Gemalto** was a digital security company formed in 2006 from the merger of two smartcard suppliers. It became a global leader in digital asset management. In 2014, Gemalto acquired the U.S. information security company **SafeNet**, including its popular **Sentinel** brand of license management products. This acquisition made Gemalto the world's largest supplier of license managers. In April 2019, Gemalto was acquired by the French aerospace and defense giant, **Thales Group**.

### Who is SafeNet?

**SafeNet, Inc.** was an information security company founded in 1983 as IRE. It was a major provider to the banking sector, specializing in encryption devices and virtual private networks (VPNs). After acquiring **Rainbow Technologies** in 2004 and **Aladdin Knowledge Technologies** in 2008, SafeNet rebranded their software protection products under the **Sentinel** name. In 2014, SafeNet and the rights to the Sentinel brand were acquired by **Gemalto**, solidifying Gemalto's position as a global leader in software monetization.