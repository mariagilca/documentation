---
title: What are Pitfalls in license utilization
sidebar_position: 23
description: Overview of common pitfalls in license utilization.
---

This article addresses two key issues in software licensing: **held licenses** and **open check policies**. Being aware of these scenarios can give you a better negotiating position with software vendors. It also highlights the importance of monitoring actual license usage on your network.

***

## Held licenses

**Held licenses** are a type of network license that has been paid for and is not in use, yet remains unavailable. The original intent was to provide a grace period for users to reclaim a license after closing an application. However, this feature has been a source of frustration for several reasons:

1.  Customers pay for licenses they cannot use.
2.  Publishers set the minimum hold time, and customers cannot reduce or cancel this period.
3.  The hold period is at the publisher's discretion and can be set for as long as they wish, without customer input.
4.  Held time is not explicitly reported and must be extracted using specialized license monitoring tools like **OpenLM**.

Held licensing is a common practice in various license managers:

* **Sentinel RMS**: The term "held licenses" is used. The license is marked as "hold-able" in the usage report and, after the application closes, its status changes to "This license is being held."
* **FlexLM**: This is implemented through the "linger time" mechanism. While customers can set a linger time via the options file, if the software publisher sets a longer minimum linger time, that longer period will be applied.

### What can be done about license holding?

Once a license has been purchased, there's little you can do about the hold time. However, customers should be aware of this pitfall during negotiations. By monitoring idle time with a tool like OpenLM, you can get concrete data on what you're actually paying for.

***

## Open check policy

An **open check policy** is a licensing scheme often referred to as "Pay Per Use" with a predefined usage boundary. While this model offers the benefit of paying only for what you use, a problem arises when license managers do not enforce or warn against surpassing the usage limits.

When license managers fail to restrict usage to the agreed-upon boundary, users can exceed the limit without warning. This leads to unforeseen expenses and painful, uncalculated payment requests, which are especially difficult for smaller companies.

Examples of such licensing schemes are found in:

* **Bentley**: Bentley's "Trust licensing" model provides free access to all licensed users, with billing based on usage. However, it does not restrict usage to an agreed-upon boundary, which can result in unexpected costs.
* **DSLS "Casual named license"**: This license has a quota of 40 hours per month. DSLS does not warn users when this quota is surpassed, and licenses are still granted, but with steep billing.

### What can be done with "Open Cheques"?

The first step is to monitor license usage and track when you are approaching a limitation. With this information, you can take action. OpenLM offers solutions like the **Applications Manager**, which intercepts application launches based on predefined rules, helping administrators avoid unexpected license expenditure.

***

## Knowledge is money

In all these scenarios, customer awareness is crucial. Having the ability to present concrete proof of your license usage history during negotiations can help you secure a better deal on licensed software.