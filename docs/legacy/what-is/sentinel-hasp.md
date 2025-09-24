---
title: "Sentinel HASP"
sidebar_position: 19
---

## What is Sentinel HASP?

Sentinel HASP was originally developed by Aladdin Knowledge Technologies, which SafeNet acquired in 2008. SafeNet was acquired in its turn by [Gemalto](#Who-is-Gemalto?) in 2014. Originally HASP was available as both a hardware (dongle) and a software solution. It has now been renamed to Sentinel HL and is a hardware solution. Customers are encouraged to purchase the Sentinel LDK, which includes Sentinel SL, which was the software portion of Sentinel HASP, as well as all the HL or hardware variants.

Read more about how Sentinel HASP is configured for [interfacing](../interfacing-articles/sentinel-hasp) with OpenLM.

Sentinel HASP is only one of over 70 license managers that OpenLM can manage. [Check the list](https://www.openlm.com/license-manager-capabilities/).

## What is Sentinel HL?

Sentinel HL is a hardware license protection application. Formerly known as Sentinel HASP, which was both a hardware and software license manager, Sentinel HL is hardware-only protection and is backward compatible with Sentinel HASP HL. It can be updated in the field using Gemalto's proprietary UpdateOnChip mechanism™. [Gemalto](#Who-is-Gemalto?) has over 75% of the global market share in hardware license managers.

OpenLM provides the following functionality for monitoring Sentinel HL licenses:

- Denials reporting Yes
- Report resolution *By minute*
- Borrowed license reporting *No*
- Expiration date reporting *No*
- Multiple server redundancy support *No*
- Token license support *No*

## What is Sentinel LDK?

Sentinel LDK (License Development Kit) is the product that independent software vendors (ISVs) buy to license their proprietary software. It is part of the Sentinel range from Gemalto and allows the ISV to select a variety of license models, from perpetual to the cloud and select hardware or software license management, or a combination of both. This last option is achieved via their Cross-Locking™ technology.

## What is Sentinel EMS?

Gemalto's Sentinel EMS is an entitlement management system which supports the product lifecycle from generation and activation of a licence through to tracking and reporting on usage until the license expires. It allows the vendor both flexibility and versatility in the licenses that can be offered to customers and permits upgrades for existing customers without the need to create a new entitlement.

## What is Sentinel Fit?

Sentinel Fit is a very small and compact license manager, ideal for embedding into devices. Although designed for environments with very little available storage, Fit still has the flexibility to cater to different licensing models, such as perpetual or time-based variants. The license can be updated remotely, when required, and is practical for the IoT. The Sentinel products are supplied by [Gemalto](#Who-is-Gemalto?), which is now part of the Thales Group.

## What is Sentinel UP?

Sentinel UP from Gemalto is an application that automatically sends software updates to those who are entitled to receive them. It takes into account global location, product version and operating platform.

## Who is Gemalto?

Gemalto was formed in 2006, via a merger between Schlumberger's Axalto and Gemplus, two major suppliers of smartcards and point-of-sale terminals to the banking sector. Through a steady process of acquisitions, Gemalto has become the worldwide leader in digital asset management. In 2014 Gemalto acquired US information security company [SafeNet](#safenet) for $890 million. At the time they stated that SafeNet's network data protection offered a good fit with their own authentication technology. From a software monetization perspective, they acquired SafeNet's Sentinel brand license management and software monetization products, which now makes them the largest supplier of license managers globally. Products include Sentinel LDK (License Development Kit) Sentinel HASP, now known as Sentinel HL, Sentinel RMS and Sentinel Fit.

Gemalto in turn has been swallowed up, having been purchased by French aerospace and defense giant Thales, in April 2019.

## Who is SafeNet?

SafeNet, Inc was the name given in 2000 to information security company IRE (Industrial Resource Engineering) which had been founded in 1983 and was listed in 1989. IRE was a leading provider to the banking sector, supplying encryption devices for secure interbank transfers, most notably to SWIFT and its customers, via what was the first virtual private network (VPN), switching packages using X25 protocol. They then produced the first commercial VPN, which was called SafeNet, and was adopted by most of the major US banks. The company was renamed SafeNet and it started on an acquisition trail of various security technology companies. One of these acquisitions in 2004 was Rainbow Technologies, which had a software asset protection product range called Sentinel, providing both hardware and software options. In 2008, SafeNet acquired Aladdin Knowledge Technologies, whose HASP product also provided software security via a variety of hardware devices, which was rebranded as Sentinel HASP. Then in 2014, SafeNet and the rights to the Sentinel brand became part of Gemalto's portfolio, making [Gemalto](#Who-is-Gemalto?) the global market leader in software monetization products. This market share is based on them having the lion's share of hardware license management, while Flexera narrowly beats them in the software license management market.

Sentinel HASP (Formerly Aladdin HASP SRM) is a concurrent usage software licensing solution provided by SafeNet. It comes in two flavors:

- HASP SL employs software protection keys to enforce software protection and licensing. Data encryption keys are obtained by communication with the software vendor, thus enabling the process of license request and grant
- HASP HL does the same with hardware dongles. No internet connection is required in order to access the license server and obtain licenses.

Sentinel HASP also features the following capabilities

- It can tie licenses to specific Virtual Machines (VM), thus providing license protection in virtual environments.

- Feature-wise flexibility: Enable or disable product features based on the user's needs and budget.
- Charge users for the number of sessions or the number of features they use.
- Enables end users to subscribe to a software tool for a specific time period.
- Create complex license models to best suit business needs.

## Monitoring HASP with OpenLM

In principle, OpenLM supports Sentinel HASP from version 5.0 onward. Having said that, elaboration is required: OpenLM interfaces the HASP (Sentinel) Admin Control Center web interface.

The Sentinel driver (and there are many of those) should interface with the Admin Control Center from within. So if you see license usage reporting on the Admin Control Center, then it is surely supported by OpenLM. Please refer to [this article](../interfacing-articles/sentinel-hasp) regarding the required OpenLM server configuration for Sentinel HASP.
