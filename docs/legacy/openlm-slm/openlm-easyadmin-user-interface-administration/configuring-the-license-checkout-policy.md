---
title: "Configuring the License Checkout Policy"
sidebar_position: 5
---
# Checkout policy

OpenLM monitors a great variety of license servers, providing accurate license consumption for a plurality of licensed applications.

One especially elusive property of all licensed applications is its "Checkout policy".

The "Checkout Policy" is defined as the number of licenses consumed by an application when multiple sessions are invoked; For example: launching multiple separate sessions of Autodesk on a single workstation by the same user may prompt the license server to consider either a single license or more as consumed by that user. **It is important to align the checkout policy as defined by the license server (that is, vendor) to the one specified in OpenLM, in order to ensure correct reporting of license usage.**

## FlexLM license files: DUP\_GROUP

The FlexLM license manager is a ubiquitous license manager type that has set the standards for license management throughout the industry. FlexLM makes use of the DUP\_GROUP mechanism to determine its managed licenses' checkout policy, through a respective license file. The FlexLM Spec reads as follows:

```
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
```

OpenLM supports the FlexLM DUP\_GROUP format by reading the license file, extracting  DUP\_GROUP information from it, and applying it to the checkout policy defined in OpenLM. To do so, you will need to install the OpenLM Broker on the license server machine and set OpenLM to read the license file [as explained in this document](../../openlm-broker/index.md)  (Refer to the "Reading a license file" paragraph).

## Reprise RLM license files: 'Share'

In a similar manner to FlexLM's license files, Reprise RLM license files also present check-out policy information. The term used in the case of Reprise RLM is 'Share' data.

As with FlexLM, OpenLM is capable of reading and parsing Reprise RLM license files, extracting the 'Share' data, and presenting correct license consumption information given RLM's consumption policy.

## The Checkout policy interface

For license manager types other than FlexLM or Reprise RLM, or in the absence of a license file, The Checkout policy may be set manually.

Note that in some cases (for example, for Reprise RLM) it is important to set up the Checkout policy either manually or by reading the license file, as neglecting to do so will probably result in erroneous presentation of license consumption.

To do so, open the EasyAdmin web application, on the 'Administration' page. (Start→Administration→Checkout policy)

![Screenshot: The Checkout policy interface](/img/legacy/Screenshot-2023-01-24-at-21.44.17.png)

The Checkout policy screen opens, activating the selection of licensed features according to License servers, Vendors, License type, Asset info and feature / product name. Note the "Checkout policy" column in the following image:

![Screenshot 2: The Checkout policy interface](/img/legacy/Screenshot-2023-01-24-at-21.46.53.png)

The possible checkout policy values are:

- Empty (default): OpenLM will consider multiple sessions run by the same user on the same host as consuming a single license.
- None: OpenLM will consider each session as consuming a single license.
- User: OpenLM will consider multiple sessions invoked by the same user as consuming a single license.
- Display.
- User+Display.
- Host: OpenLM will consider multiple sessions invoked on the same host as consuming a single license.
- User + Host: OpenLM will consider multiple sessions run by the same user on the same host as consuming a single license.
- Display+Host.
- User+Display+Host.
- Vendor.
- User+Vendor.
- Display+Vendor.
- User+Display.
- Host+Vendor.
- User+Host+Vendor.
- Display+Host+Vendor.
- Site.

The checkout policy may be edited in two methods:

1. Change a single feature's checkout policy by right-clicking the column entry and selecting the required policy from the drop-down menu (see image above), or
2. Change multiple features' checkout policy by selecting multiple entries and clicking the "Edit selected" button on the top of the "Checkout policy" window (see the following image): ![Screenshot 3: The Checkout policy interface](/img/legacy/Screenshot-2023-01-24-at-22.00.14.png)

After editing the required policy, click the 'Save' button on the "Checkout policy" window to apply the changes you have made.
