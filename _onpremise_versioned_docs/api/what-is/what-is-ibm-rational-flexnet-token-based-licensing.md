---
title: What is IBM Rational: FlexNet Token based licensing
sidebar_position: 10
description: Overview of IBM Rational FlexNet token-based licensing.
---


<aside id="sidebar2">
<div>
<div></div>
<div>
<p dir="ltr">The IBM Rational License Server uses FLEXnet (FlexLM) for licensing IBM Rational products.</p>

<h2>FLEXNET MAIN COMPONENTS</h2>
<p dir="ltr">The four main components of FLEXnet are:</p>

<ul>
 <li>
<p dir="ltr">The License Manager Daemon, lmgrd</p>
</li>
 <li>
<p dir="ltr">The Vendor Daemon, telelogic</p>
</li>
 <li>
<p dir="ltr">The client application program, in this case any IBM Rational application</p>
</li>
 <li>
<p dir="ltr">The license file, license.dat</p>
</li>
</ul>
 
<h2>MODE OF EMPLOYMENT</h2>
<ul>
 <li>
<p dir="ltr">When an IBM Rational product is started, the program uses the TELELOGIC_LICENSE_FILE system variable to find out the name of the computer that's running the FLEXnet license server and the port that it's using.</p>
</li>
 <li>
<p dir="ltr">The program contacts the license manager on the FLEXnet license server, using the specified port. It requests a floating license and makes the request for the Telelogic vendor daemon.</p>
</li>
 <li>
<p dir="ltr">On the FLEXnet license server, the license manager sends the request to the Telelogic vendor daemon. The Telelogic vendor daemon checks to see if any licenses are available.</p>
</li>
 <li>
<p dir="ltr">If there are free licenses, the Telelogic vendor daemon grants a license and the program runs. If there aren't any licenses available, the Telelogic vendor daemon refuses the request, and the program fails to start and displays a license denial message.</p>
</li>
</ul>
 

Token-based licensing
<p dir="ltr">Token licenses are in fact a form of floating license, only that instead of having a pool of licenses - it has a pool of tokens. When a feature is checked-out, a certain amount of tokens are consumed. The number of consumed tokens is specific to each feature, and is apparent in the feature/Increment line in the license file. When the application is closed, the tokens are returned to the pool for other end users to use.</p>

<h2>ADVANTAGES OF TOKEN LICENSING</h2>
<p dir="ltr">Having the ability to apply the acquired licenses to multiple products is an appealing concept:</p>

<ul>
 <li>
<p dir="ltr">Customers are not always aware of the full array of features they may acquire. having a token based license scheme ensures customer satisfaction from the license acquisition.</p>
</li>
 <li>
<p dir="ltr">As development stages progress, customer needs change. They may require different licensed features, and eliminate the charge of “unused” software.</p>
</li>
 <li>
<p dir="ltr">The entire license purchasing method is simplified. Customer can add/try new software during project, without new PO or evaluation process</p>
</li>
</ul>
 
<h2>Rational tools’ token-based licensing</h2>
<h3>IBM RATIONAL LICENSE TYPES</h3>
<p dir="ltr">IBM Rational includes the following license types:</p>
<p dir="ltr">DOORS, Synergy, Change, Tau, System Architect, Focal Point, Rhapsody, Publishing Engine, Logiscope and Team Webtop</p>

<h3>IBM RATIONAL TOKEN LICENSE FILE EXAMPLES</h3>
<ul>
 <li>
<p dir="ltr">The Increment / Change line marks the number of tokens to be consumed:</p>
</li>
</ul>
<pre>INCREMENT Change telelogic 2015.04302 30-apr-2015 1 ...

VENDOR_STRING=T10-999999:t,TLSTOK,1.0,Change,5  ... // 5 Tokens worth.</pre>
<ul>
 <li>
<p dir="ltr">This is an INCREMENT line indicating the total number of Tokens in the license</p>
</li>
</ul>
<p dir="ltr">file. In this case, it is 200:</p>

<pre>INCREMENT TLSTOK ibmratl 2.0 30-apr-2015 200 ISSUER=IBM</pre>
<h3>RATIONAL LICENSE SERVER 8.1.1</h3>
<p dir="ltr">Rational License Server 8.1.1 incorporates all vendor daemons (telelogic, rational, and ibmratl) into one. This change has also been incorporated into multiple Rational products such as ClearCase and ClearQuest.</p>
<strong> </strong>
<h2>References</h2>
<p dir="ltr"><a href="http://publib.boulder.ibm.com/infocenter/rational/v0r0m0/index.jsp?topic=/com.ibm.rational.license.doc/topics/r_lic_log_file.html">http://publib.boulder.ibm.com/infocenter/rational/v0r0m0/index.jsp?topic=/com.ibm.rational.license.doc/topics/r_lic_log_file.html</a></p>
<a href="http://www-01.ibm.com/support/docview.wss?uid=swg27023414&aid=1">http://www-01.ibm.com/support/docview.wss?uid=swg27023414&aid=1</a>

</div>
</div>
<div></div>
</aside>
<div></div>
<div id="myid"></div>
