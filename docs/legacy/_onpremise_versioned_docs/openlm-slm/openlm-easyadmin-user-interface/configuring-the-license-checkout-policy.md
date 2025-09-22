---
title: Configuring the License Checkout Policy
sidebar_position: 5
description: Learn how to configure the license checkout policy in OpenLM EasyAdmin.
---

## Checkout policy
OpenLM monitors a wide variety of license servers, providing accurate license consumption for licensed applications.

One especially elusive property of all licensed applications is their checkout policy. The checkout policy is defined as the number of licenses an application consumes when multiple sessions are invoked. For example, launching multiple separate Autodesk sessions on a single workstation by the same user may prompt the license server to consider either a single license or more as consumed by that user. It's important to align the checkout policy as defined by the license server (the vendor) to the one specified in OpenLM to ensure correct reporting of license usage.

## FlexLM license files: DUP_GROUP
The FlexLM license manager is a ubiquitous license manager type that has set the standards for license management throughout the industry. FlexLM uses the DUP_GROUP mechanism to determine its managed licenses' checkout policy through a respective license file. The FlexLM specification reads as follows:

DUP_GROUP=... The syntax is:

DUP_GROUP=NONE|SITE|[UHDV]

U = DUP_USER
H = DUP_HOST
D = DUP_DISPLAY
V = DUP_VENDOR_DEF

Any combination of UHDV is allowed, and the DUP_MASK is the OR of the
combination. For example, DUP_GROUP=UHD means the duplicate grouping is
(DUP_USER|DUP_HOST|DUP_DISPLAY), so for a user on the same host and display,
additional uses of a feature do not consume additional licenses.
OpenLM supports the FlexLM DUP_GROUP format by reading the license file, extracting the DUP_GROUP information from it, and applying it to the checkout policy defined in OpenLM. To do so, you must install the OpenLM Broker on the license server machine and set OpenLM to read the license file, as explained in this document (refer to the "Reading a license file" paragraph).

## Reprise RLM license files: 'share'
In a similar manner to FlexLM's license files, Reprise RLM license files also present checkout policy information. The term used in the case of Reprise RLM is 'share' data.

As with FlexLM, OpenLM is capable of reading and parsing Reprise RLM license files, extracting the 'share' data, and presenting correct license consumption information given RLM's consumption policy.

## The checkout policy interface
For license manager types other than FlexLM or Reprise RLM, or in the absence of a license file, you can set the checkout policy manually.

:::note
In some cases (e.g., for Reprise RLM), it's important to set up the checkout policy either manually or by reading the license file. Neglecting to do so will likely result in an erroneous presentation of license consumption.
:::

To do so, open the EasyAdmin web application on the 'Administration' page (Start → Administration → Checkout policy).

!

The checkout policy screen opens, enabling the selection of licensed features according to license servers, vendors, license type, asset info, and feature/product name. Note the "Checkout policy" column in the image below:

!

The possible checkout policy values are:

Empty (default): OpenLM will consider multiple sessions run by the same user on the same host as consuming a single license.

None: OpenLM will consider each session as consuming a single license.

User: OpenLM will consider multiple sessions invoked by the same user as consuming a single license.

Display.

User+Display.

Host: OpenLM will consider multiple sessions invoked on the same host as consuming a single license.

User + Host: OpenLM will consider multiple sessions run by the same user on the same host as consuming a single license.

Display+Host.

User+Display+Host.

Vendor.

User+Vendor.

Display+Vendor.

User+Display.

Host+Vendor.

User+Host+Vendor.

Display+Host+Vendor.

Site.

You can edit the checkout policy in two ways:

Change a single feature's checkout policy by right-clicking the column entry and selecting the required policy from the drop-down menu (see the image above), or

Change multiple features' checkout policy by selecting multiple entries and clicking the "Edit selected" button on the top of the "Checkout policy" window (see below):
!

After editing the required policy, click the 'Save' button on the "Checkout policy" window to apply your changes.