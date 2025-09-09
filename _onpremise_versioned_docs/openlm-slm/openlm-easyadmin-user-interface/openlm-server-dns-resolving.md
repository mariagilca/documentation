---
title: "OpenLM Server  DNS resolving"
date: "2021-02-20T19:31:43"
permalink: "https://www.openlm.com/docs/openlm-software-dns-resolving-an4061/"
posttype: "manual_documentation"
id: "7219"
---

<p class="c3"><span class="c0">OpenLM reports all aspects of license usage e.g. license inventory, license usage, users, and workstations. System administrators often find the IP address of active workstations important, for example, to locate the domain of such workstations.</span></p>
<p class="c3"><span class="c0">Some floating license management systems do not report the IP addresses of workstations that had checked out licenses.</span></p>
<p class="c3"><span class="c0">The OpenLM Workstation Agent module may provide this information, however, agents are not always deployed on all end users' workstations. The OpenLM Server is able to resolve the IP address of workstations using network services, thus providing the IP.</span></p>
 
<h2 class="c2"><span class="c5">DNS resolving configuration</span></h2>
<p class="c3"><span class="c0">DNS configuration is executed as a background process on the OpenLM Server. In order to configure OpenLM to resolve workstation IPs please:</span></p>

<ol class="c6 lst-kix_c3gzm03dgdp6-0 start" start="1">
 <li class="c3 c4"><span class="c0">Open the EasyAdmin User Interface <b>→ Start → Administration → System&Security → Security → Data Management.</b></span></li>
 <li class="c3 c4"><span class="c0">Turn the “<strong>Resolve workstations names ...</strong>” toggle on.</span></li>
 <li class="c3 c4"><span class="c0">Set the resolution time.</span></li>
 <li>Click <strong>Save</strong>.</li>
</ol>
<p class="c3"><span class="c0">The process will take place every 24 hours at the set time. See the screenshot below for clarification: DNS resolving is set to take place every day at 3AM.</span></p>
<p class="c3"><img class="alignnone size-full wp-image-60708" src="https://www.openlm.com/docs/wp-content/uploads/2021/02/Screenshot-2023-08-22-at-19.37.47.png" alt="" width="2228" height="1140" /></p>
<p class="c3"><span class="c0">Before the first occurrence of the process, no IP addresses will be shown. Between occurrences of the resolving process, some workstations may be shown without IP addresses.</span></p>
<p class="c3"><span class="c0">The IP information will later be presented in OpenLM report windows such as the Start → Reports → “License Activity” window (see example below).</span></p>
<p class="c8"><img class="alignnone size-full wp-image-60709" src="https://www.openlm.com/docs/wp-content/uploads/2021/02/Screenshot-2023-08-22-at-19.40.15.png" alt="" width="2224" height="1144" /></p>
