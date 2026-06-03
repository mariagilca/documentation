---
title: "Pitfalls in license utilization"
description: "This article deals with pesky licensing issues. It lays out a few scenarios in which clients not only can't get what they want, but don't even get what."
sidebar_position: 29
---

## What are pitfalls in license utilization?

This article deals with pesky licensing issues. It lays out a few scenarios in which clients not only can't get what they want, but don't even get what they need.

There is a benefit in knowing and being aware of the bends and curves when negotiating for new licenses with your software vendor. It also highlights the benefits of monitoring the actual license usage on your network.

## Held licences

The first scenario I'm referring to are "Held" licenses. This term depicts network licenses that have been paid for, are not currently in use, and are nevertheless unavailable to the end user. Licenses are simply kept unavailable even after the application has been closed.

The original purpose of held licenses was to activate a grace period in which active users could reclaim a license after shutting down the application. I personally feel this advantage has been abused for several reasons:

1. You shouldn't pay for something you can't use. Period.
2. The setting of a minimal hold time is reserved to the publisher. The customer is unable to cancel or decrease this period.
3. The configuration of the hold period is at the publisher's discretion. They could set it as long as they wish. Customers have no say on the subject.
4. The portion of held time is not explicitly reported. This information should be extracted explicitly by license monitoring tools such as OpenLM.

"Held" licensing is a common practice by different license managers which employ dedicated mechanisms for this purpose:

- In Sentinel RMS the term "held licenses" is used. The license is noted as "hold"-able in the license usage report, for example:

**|- Held licenses : Allowed, hold time set by license.**

**|- Hold time : 30 min(s)**

After shutting the application down, the license status reads:

**|- Status : Running since Thu Aug 04 10:48:07 2015   ...**

**|- Status : This license is being held.**

- In FlexLM, license holding is implemented through the "linger time" mechanism. The customer may select to apply lingering through the options file, thus obtaining the grace period I have mentioned earlier. However, the software publisher may set their own minimal linger time value. In that case - the longer period will be applied, and licenses will not be freed until after the application was shut down and the longer period has elapsed.

## What can be done about license holding?

After the license has been bought - probably not much. But customers should be aware of this pitfall at the negotiating table, know what they are actually getting for their money, and be able to monitor the idle time percentage with a license monitoring tool such as OpenLM.

## Open cheque policy

Another unpleasant pitfall is what we internally refer to as an "Open cheque" licensing policy. This type of license management scheme employs "Pay Per Use" licensing within a predefined usage boundary. This boundary is agreed upon at the negotiating table, and reflects the customer's calculated expenditure on software. Another appealing advantage of this licensing scheme apart from paying per usage, is the lack of ownership costs.

A problem arises when license managers do not restrict license usage to the agreed boundary. They may also fail to warn against an upcoming usage limit or even against having surpassed it. This will lead to loss of control over expenditure, as end users will be freely granted licenses, and may surpass the agreed limit.

It is notable that surpassing the usage limits will lead to high payment requests. This kind of uncalculated expense that comes by surprise proves especially painful for small companies. Examples for such licensing schemes is found in:

### Bentley

[Bentley is a CAD software house,](https://www.google.com/url?q=https://www.openlm.com/monitoring-bentley-select-license-manager/&sa=D&usg=AFQjCNEBTEIPbAymlrUuOI898vvRzYhWuQ) which produces market leading solutions for Architecture, GIS, Plant infrastructure and Civil engineering projects. Bentley's license management model is referred to as ["Trust licensing"](https://www.google.com/url?q=https://communities.bentley.com/products/licensing/w/licensing__wiki/2771&sa=D&usg=AFQjCNFV-T_bwA2Ptwbb8bTuQfBjt0H6-A). License management is either performed on the cloud or on premise, and provides free access to all licensed users. The client will conveniently pay per usage, and not be submitted to ownership cost. However license usage will not be restricted to the agreed boundary, and the customer may be surprised by unforeseen billing.

### DSLS "casual named license"

This license flavor limits the usage to a quota of 40 hrs/month. DSLS will not explicitly warn against the surpassing of the "Casual license" quota. After this quota has been surpassed, licenses are still freely granted, albeit in conjunction with steep billing.

## What can be done with "open cheques"?

The first thing to do is to monitor license usage and be aware of the approach of a license limitation.

When this information is available action can be taken.

OpenLM has implemented specific solutions such as the "OpenLM Applications Manager", which intercepts the launch of applications according to predefined rules, and helps license administrators avoid being surprised by unforeseen license expenditure.

## Knowledge is money

The bottom line with all such cases is customer awareness, and the ability to present concrete proof of license usage history when negotiating for a better deal on licensed software.
