---
title: "Configuring the License Checkout Policy"
date: "2023-11-02T21:15:14"
permalink: "https://www.openlm.com/docs/openlm-slm-installation-guide/openlm-easyadmin-user-interface-administration/configuring-the-license-checkout-policy/"
posttype: "manual_documentation"
id: "6550"
---

<h1 id="h.o5ut8fxgb085">Checkout policy</h1>
OpenLM monitors a great variety of license servers, providing accurate license consumption for a plurality of licensed applications.

One especially elusive property of all licensed applications is its “Checkout policy”.

The “Checkout Policy” is defined as the number of licenses consumed by an application when multiple sessions are invoked; For example: launching multiple separate sessions of Autodesk on a single workstation by the same user may prompt the license server to consider either a single license or more as consumed by that user. <strong>It is important to align the checkout policy as defined by the license server (i.e. vendor) to the one specified in OpenLM, in order to ensure correct reporting of license usage.</strong>

 
<h1 id="h.y0dsjxxderx5">FlexLM license files: DUP_GROUP</h1>
The FlexLM license manager is a ubiquitous license manager type that has set the standards for license management throughout the industry. FlexLM makes use of the DUP_GROUP mechanism to determine its managed licenses’ checkout policy, through a respective license file. The FlexLM Spec reads as follows:
<pre><span style="color: #0000ff;"><em><strong>DUP_GROUP=... The syntax is:</strong></em></span>

<span style="color: #0000ff;"><em><strong>DUP_GROUP=NONE|SITE|[UHDV]</strong></em></span>

<span style="color: #0000ff;"><em><strong>U = DUP_USER</strong></em></span>

<span style="color: #0000ff;"><em><strong>H = DUP_HOST</strong></em></span>

<span style="color: #0000ff;"><em><strong>D = DUP_DISPLAY</strong></em></span>

<span style="color: #0000ff;"><em><strong>V = DUP_VENDOR_DEF</strong></em></span>

<span style="color: #0000ff;"><em><strong>Any combination of UHDV is allowed, and the DUP_MASK is the OR of the</strong></em></span>

<span style="color: #0000ff;"><em><strong>combination. For example, DUP_GROUP=UHD means the duplicate grouping is</strong></em></span>

<span style="color: #0000ff;"><em><strong>(DUP_USER|DUP_HOST|DUP_DISPLAY), so for a user on the same host and display,</strong></em></span>

<span style="color: #0000ff;"><em><strong>additional uses of a feature do not consume additional licenses.</strong></em></span></pre>
OpenLM supports the FlexLM DUP_GROUP format by reading the license file, extracting  DUP_GROUP information from it, and applying it to the checkout policy defined in OpenLM. To do so, you will need to install the OpenLM Broker on the license server machine and set OpenLM to read the license file <a href="https://www.openlm.com/knowledge-base/openlm-broker-installation-guide-comprehensive-kb4004b/"><span style="font-weight: 400;">as explained in this document</span></a>  (Refer to the “Reading a license file” paragraph).

 
<h1 id="h.y0dsjxxderx5">Reprise RLM license files: 'Share'</h1>
In a similar manner to FlexLM's license files, Reprise RLM license files also present check-out policy information. The term used in the case of Reprise RLM is 'Share' data.

As with FlexLM, OpenLM is capable of reading and parsing Reprise RLM license files, extracting the 'Share' data, and presenting correct license consumption information given RLM's consumption policy.

 
<h1 id="h.7j1dzn7grm5a">The Checkout policy interface</h1>
For license manager types other than FlexLM or Reprise RLM, or in the absence of a license file, The Checkout policy may be set manually.

Please note that in some cases (e.g. for Reprise RLM) it is important to set up the Checkout policy either manually or by reading the license file, as neglecting to do so will probably result in erroneous presentation of license consumption.

To do so, open the EasyAdmin web application, on the ‘Administration’ page. (Start→Administration→Checkout policy)

<img class="alignnone size-full wp-image-53951" src="https://www.openlm.com/wp-content/uploads/2017/02/Screenshot-2023-01-24-at-21.44.17.png" alt="" width="2560" height="1324" />

The Checkout policy screen opens, enabling the selection of licensed features according to License servers, Vendors, License type, Asset info and feature / product name. Note the “Checkout policy” column in the image below:

<img class="alignnone size-full wp-image-53953" src="https://www.openlm.com/wp-content/uploads/2017/02/Screenshot-2023-01-24-at-21.46.53.png" alt="" width="2560" height="1316" />

The possible checkout policy values are:
<ul>
 <li>Empty (default): OpenLM will consider multiple sessions run by the same user on the same host as consuming a single license.</li>
 <li>None: OpenLM will consider each session as consuming a single license.</li>
 <li>User: OpenLM will consider multiple sessions invoked by the same user as consuming a single license.</li>
 <li>Display.</li>
 <li>User+Display.</li>
 <li>Host: OpenLM will consider multiple sessions invoked on the same host as consuming a single license.</li>
 <li>User + Host: OpenLM will consider multiple sessions run by the same user on the same host as consuming a single license.</li>
 <li>Display+Host.</li>
 <li>User+Display+Host.</li>
 <li>Vendor.</li>
 <li>User+Vendor.</li>
 <li>Display+Vendor.</li>
 <li>User+Display.</li>
 <li>Host+Vendor.</li>
 <li>User+Host+Vendor.</li>
 <li>Display+Host+Vendor.</li>
 <li>Site.</li>
</ul>
The checkout policy may be edited in two methods:
<ol start="1">
 <li>Change a single feature’s checkout policy by right-clicking the column entry and selecting the required policy from the drop-down menu (see image above), or</li>
 <li>Change multiple features’ checkout policy by selecting multiple entries and clicking the “Edit selected” button on the top of the “Checkout policy” window (see below): <span style="overflow: hidden; margin: 0.00px 0.00px; border: 0.00px solid #000000; width: 401.00px; height: 171.00px;"><img class="alignnone size-full wp-image-53954" src="https://www.openlm.com/wp-content/uploads/2017/02/Screenshot-2023-01-24-at-22.00.14.png" alt="" width="2558" height="1338" /></span></li>
</ol>
After editing the required policy, click the ‘Save’ button on the “Checkout policy” window to apply the changes you have made.
