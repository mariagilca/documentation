---
title: "License Allocation Manager - Options File management Using OpenLM EasyAdmin User Interface"
date: "2023-11-05T21:11:35"
permalink: "https://www.openlm.com/docs/openlm-slm-features/options-file-management-using-openlm-easyadmin-user-interface/"
posttype: "manual_documentation"
id: "6679"
---

<p class="c4"><span class="c1">FLEXlm ( FlexNet publisher ) Options files grant license administrators close control over various operating parameters within the constraints of the license model. Licensed features can be dedicated, denied, or reserved to users or groups of users, as well as Hosts, IPs, and Host Groups according to the Options file setting.</span></p>
<p class="c4"><span class="c1">Employing FLEXlm Options file, the license administrator can:</span></p>
<p class="c4"><span class="c1">1. For concurrent (floating) licenses:</span></p>

<ul class="c8 lst-kix_98v229i2e7g-0 start">
 <li class="c4 c5"><span class="c1">Allow the use of features</span></li>
 <li class="c4 c5"><span class="c1">Deny the use of features</span></li>
 <li class="c4 c5"><span class="c1">Reserve licenses</span></li>
</ul>
<p class="c4"><span class="c1">2. For all license types:</span></p>

<ul class="c8 lst-kix_bramz3ly4i4m-0 start">
 <li class="c4 c5"><span class="c1">Restrict the number of licenses available</span></li>
 <li class="c4 c5"><span class="c1">Control the amount of information logged about license usage</span></li>
 <li class="c4 c5"><span class="c1">Enable a report log file</span></li>
 <li class="c4 c5"><span class="c1">Control the automatic rereading of licenses</span></li>
</ul>
<p class="c4"><span class="c1">FLEXlm Options files are implemented as text files, located on the license server. Although this method fits the licensing requirements well, the process of creating and maintaining Options files is error-prone and difficult to maintain.</span></p>
<p class="c4"><span class="c1">The OpenLM solution incorporates synchronization of License administration tools with the organization’s LDAP (Active Directory), keeping the FLEXlm Options file up-to-date as users leave or join the organization, or move between groups.</span></p>
 
<h2 class="c9 c25 c18"><a name="h.1b9wib1skouq"></a><span class="c17">Creating an Options File</span></h2>
<p class="c4"><span class="c1">1. The Options file should be placed under the same directory as the vendor daemon file, in order to enable FLEXlm to read it automatically. Locating the Options file in a different folder is possible, but this requires FLEXlm to be configured to search for it in that particular location.</span></p>
<p class="c4"><span class="c1">2. The recommended name for the Options file is vendor.opt, where vendor is the vendor daemon name ( e.g.: for the ESRI ArcGIS vendor: arcgis.opt is recommended). </span><span class="c0">Note</span><span class="c1">: The name should not contain any blank spaces. Use an underscore ‘_’ to create a separation between words, otherwise name will not register. i.e.: “Vendor name.opt” is not recognized.</span></p>
 
<h2 class="c9 c18 c25"><a name="h.q5alf6vvw6sg"></a><span class="c17">FLEXlm Options file editing</span></h2>
<p class="c4"><span class="c1">When configuring the Options file using OpenLM, the configuration data is presented to the OpenLM SLM, and forward by it to the OpenLM Broker, located on the license server machine. The OpenLM Broker updates the Options file.</span></p>
 
<h3 class="c7"><a name="h.rzibl1aflrhq"></a><span class="c3">OpenLM Broker Configuration</span></h3>
<p class="c4"><span class="c1">It is necessary to install the OpenLM Broker on the license server machine in order to edit the Options file using the OpenLM EasyAdmin web application. An indication to proper Broker configuration is the green Status submenu indication on the EasyAdmin </span><span class="c0">License servers </span><span class="c1">window.</span></p>
<p class="c4"><img class="alignnone size-full wp-image-55246" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-13.31.03.png" alt="" width="1441" height="415" /></p>
<p class="c4"><span class="c1"> </span></p>
<p class="c4"><span class="c1">Information about the OpenLM Broker and its installation process is available in the</span></p>
<p class="c4"><span class="c16"><a class="c2" href="https://www.openlm.com/knowledge-base/openlm-broker-installation-guide-comprehensive-kb4004b/">Comprehensive Broker Installation Guide</a></span><span class="c1">.</span></p>
<p class="c4"><span class="c1">The latest OpenLM Broker version is available for download on the </span><span class="c16"><a class="c2" href="https://www.openlm.com/download/">OpenLM website’s downloads section</a></span><span class="c1">.</span></p>
<p class="c4"><span class="c1">After creating an Options file on the license server machine configure the OpenLM Broker to recognize it:</span></p>
<p class="c4"><span class="c1">1. Open the </span><span class="c0">OpenLM Broker Configuration Tool</span><span class="c1"> installed on the license server machine</span></p>
<p class="c4"><span class="c1">(Windows’ Start → All Programs → OpenLM → Broker → OpenLM Broker Configuration Tool).</span></p>
<p class="c4"><span class="c1">2. In the </span><span class="c0">Broker Configuration Tool</span><span class="c1"> window, Click the (</span><span class="c0">+</span><span class="c1">) bullet below the </span><span class="c0">License Servers</span><span class="c1"> to expand the License server menu in the configuration window.</span></p>
<p class="c4"><span class="c1">3. Click the (</span><span class="c0">+</span><span class="c1">) bullet and expand the </span><span class="c0">Port Node</span><span class="c1"> (e.g. Port 27000.)</span></p>
<p class="c4"><span class="c1">4. Click the (</span><span class="c0">+</span><span class="c1">) bullet to expand the </span><span class="c0">Vendors</span><span class="c1"> file.</span></p>
<p class="c4"><span class="c1">5. Input a particular </span><span class="c0">Vendor</span><span class="c1"> name (‘adskflex’. Case sensitive)</span></p>
<p class="c4"><span class="c1">6. Input in the </span><span class="c0">Options file Path</span><span class="c1"> and provide it a name (I left it at its default)</span></p>
<p class="c4"><span class="c1">7. Type in the path to the Options file previously created.</span></p>
<p class="c4"><span class="c1">8. Click </span><span class="c0">Advanced>></span><span class="c1"> and check the </span><span class="c0">Watch Options file</span><span class="c1"> box.</span></p>
<p class="c4"><span class="c1">9. Click the </span><span class="c0">Apply</span><span class="c1"> and </span><span class="c0">Restart Broker</span><span class="c1"> buttons.</span></p>
<p class="c4"><img class="alignnone wp-image-13779 size-full" src="https://www.openlm.com/wp-content/uploads/2017/02/OptionFile_loc.png" alt="" width="783" height="471" /></p>
 
<h3 class="c7"><span class="c3">Options file direction: Write.</span></h3>
<p class="c9 c15">2.1. Open the EasyAdmin Start → Administration → Options Files. The “Administration - Options files” dialog window opens.</p>
<img class="size-full wp-image-55247" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-13.35.08.png" alt="" width="1920" height="1080" />
<p class="c9 c15">2.2. Select the relevant options file, and click the ‘Edit’ button. The “Edit Options file” dialog window opens.</p>
<p class="c9 c15"><img class="alignnone size-full wp-image-55248" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-13.36.13.png" alt="" width="1920" height="1080" /></p>
<p class="c9 c15">On this window, select the direction of data flow:</p>

<ul class="c8 lst-kix_64u5arunke49-0 start">
 <li class="c9 c15 c5">“OpenLM User Interface updates the Options file …”: OpenLM is acting as a writer, to edit the Options file according to OpenLM EasyAdmin configuration. It is also possible to set a specific time of day at which the Options file would be written on the license manager.</li>
 <li class="c9 c15 c5">“Changes made to the Options file ...” : OpenLM is acting as a reader, conveying the content of the Options file - its users and groups - to the OpenLM database.</li>
</ul>
<p class="c9 c15">In order to edit Options files - the 1st (“EasyAdmin updates the Options file …”) option should be selected (Write).</p>
 
<h3 class="c7"><a name="h.p8vvba2b5l1g"></a><span class="c3">Options file targets: Users, User groups, Hosts, Host Groups and IPS</span></h3>
<p class="c4"><span class="c1"> </span><span class="c1">Options files apply license constraints to certain target categories; namely </span><span class="c16"><a class="c2" href="https://www.openlm.com/knowledge-base/introducing-entities-in-openlm-users-groups-ip-and-hosts-kb3042/">Users, User groups, Hosts, Host groups and IPs</a></span><span class="c1">. In order to edit Options files, select a specific Options file, and then apply changes to it.</span></p>
 
<h3 class="c7"><a name="h.pyy2mtebur2j"></a><span class="c3">Options file Selection</span></h3>
<p class="c4"><span class="c1">4.1. Open the OpenLM EasyAdmin web application</span></p>
<p class="c4"><span class="c1">4.2. Click </span><span class="c0">Start</span><span class="c1"> → </span><span class="c0">Options file</span><span class="c1">→ </span><span class="c0">Opt. File Admin</span><span class="c1">. The </span><span class="c0">Options file Administration</span><span class="c1"> window opens</span></p>
<p class="c4"><span class="c1">4.3. Select the specific Options file to be edited (e.g.: Autocad Options file) and click </span><span class="c0">Set</span></p>
 
<h3 class="c7"><a name="h.ikfzk4qpj4p6"></a><span class="c3">. Policy: Global Settings per Server and vendor daemon</span></h3>
<p class="c4"><span class="c1">5.1. Open the OpenLM EasyAdmin User Interface.</span></p>
<p class="c4"><span class="c1">5.2. Click </span><span class="c0">Start</span><span class="c1"> →  </span><span class="c0">Options file</span><span class="c1"> → </span><span class="c0">Opt. File Management.</span></p>
<p class="c4"><span class="c1">5.3. Select the </span><span class="c0">Policy</span><span class="c1"> tab</span></p>
<p class="c4"><span class="c1">5.4. Configure the policy text boxes, and click </span><span class="c0">Save </span><span class="c1">to apply changes. See elaboration on each text field below.</span></p>
<p class="c4"><img class="alignnone size-full wp-image-55249" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-13.38.43.png" alt="" width="1920" height="1080" /></p>

<h4 class="c4 c12"><a name="h.i4fyxflosaqy"></a><span class="c0 c13">GROUPCASEINSENSITIVE (OFF / ON)</span></h4>
<p class="c4"><span class="c0">ON</span><span class="c1">: User names and host names specified with the Options File GROUP and HOST_GROUP keywords respectively, are treated as case insensitive.</span></p>
<p class="c4"><span class="c0">OFF</span><span class="c1"> (Default): User names and host names are treated as case-sensitive.</span></p>
 
<h4 class="c4 c12"><a name="h.y4l9hdnosqwb"></a><span class="c0 c13">NOLOG { IN | OUT | DENIED | QUEUED }</span></h4>
<p class="c4"><span class="c1">Suppresses logging of the selected type of event in the debug log file.  License administrators may use this option to reduce the size of the debug log file, however it can reduce the usefulness of the debug log when debugging license server problems.</span></p>

<ul class="c8 lst-kix_6vjzdfze7lx2-0 start">
 <li class="c4 c5"><span class="c0">IN / OUT</span><span class="c1">: Turns off logging of license check-ins and check-outs respectively.</span></li>
 <li class="c4 c5"><span class="c0">DENIED</span><span class="c1">: Turns off logging of license check-out denials.</span></li>
 <li class="c4 c5"><span class="c0">QUEUED</span><span class="c1">: Turns off logging of queued license requests.</span></li>
</ul>
 
<h4 class="c4 c12"><a name="h.hbl7aaftusra"></a><span class="c0 c13">REPORTLOG</span></h4>
<p class="c4"><span class="c1">Specifies the report log file for this vendor daemon. It is recommended to precede the report_log_path with a ‘</span><span class="c0">+</span><span class="c1">’ character to append logging entries; otherwise the file is overwritten each time the daemon is started.</span></p>
 
<h4 class="c4 c12"><a name="h.mcejc3kx4iho"></a><span class="c0 c13">TIMEOUTALL</span></h4>
<p class="c4"><span class="c1">Specify the idle timeout for all features, after which an inactive license is reclaimed. The software publisher sets a minimum value. If a smaller value is set – it is ignored, and the publisher’s minimum value is used.</span></p>
 
<h4 class="c4 c12"><a name="h.inrmprv2f4gd"></a><span class="c0 c13">DEBUGLOG</span></h4>
<p class="c4"><span class="c1">Writes debug log information for this vendor daemon to the specified file.</span></p>
<p class="c4"><span class="c1">Note that this affects output from only the vendor daemon associated with this options file. The debug log output of lmadmin or lmgrd and any other vendor daemons in the same license file is not captured in this file.</span></p>
<p class="c4"><span class="c1">Click Save in order to retain the edited configuration.</span></p>
 
<h3 class="c7"><a name="h.30jbederx51e"></a><span class="c3">Feature Settings: Apply restrictions per feature</span></h3>
<p class="c4"><span class="c1">6.1. Open the OpenLM EasyAdmin web application, and click </span><span class="c0">Start  </span><span class="c1">→  </span><span class="c0">Options file</span><span class="c1"> → </span><span class="c0">Opt. File Management</span><span class="c1">.</span></p>
<p class="c4"><span class="c1">6.2. Select a specific Options file, e.g. “Windows 7 Autodesk”. The Features list is populated.</span></p>
<p class="c4"><span class="c1">6.3. Select a specific subsequent Feature, e.g.: “85811IDSS_F”. The permissions list is populated. You are now able to create license usage constraints per each feature,  and apply these constraints either globally or per specific Users, User groups, Hosts, Host groups and IPs.</span></p>
<p class="c4"><span class="c1">6.3a. Select the </span><span class="c0">Users</span><span class="c1"> tab form the lower pane.</span></p>
<p class="c4"><span class="c1">6.3b. Click the </span><span class="c0">Add</span><span class="c1"> icon. The Users search window appears.</span></p>
<p class="c4"><span class="c1">6.3c. Mark user(s) from the </span><span class="c0">Users search</span><span class="c1"> window, and click the </span><span class="c0">Select</span><span class="c1"> icon. The selected users are added (e.g. u1).</span></p>
<p class="c4"><span class="c1">6.4. Select as many permission values as needed, and set the value(s) as according to the definitions mentioned here:</span></p>
 
<h4 class="c4 c12"><a name="h.3l0zi1ot57dr"></a><span class="c0 c13">BORROW_LOWWATER:</span></h4>
<p class="c4"><span class="c1">Sets the minimal number of BORROW licenses that cannot be borrowed, i.e: the minimal number of licenses that need to remain as Network licenses. For example, if FEATURE has a count of 10, borrowing is enabled in the application, and BORROW_LOWWATER = 7 then only 3 licenses may be borrowed. This option is used for licenses held in license files.</span></p>

<h4 class="c4 c12"><a name="h.m5rona70zlw4"></a><span class="c0 c13">LINGER:</span></h4>
<p class="c4"><span class="c1">A lingering license stays checked out for a specified period of time beyond its check-in or FlexEnabled application exit, whichever comes first. This configuration enables users to extend the linger time for a feature beyond its check in.</span></p>
<p class="c4"><span class="c0">Note</span><span class="c1">:</span></p>

<ul class="c8 lst-kix_eqtvxgaaeir1-0 start">
 <li class="c4 c5"><span class="c1">The software publisher sets a minimum linger value. If a value smaller than the minimum is configured, the minimum value is used.</span></li>
 <li class="c4 c5"><span class="c1">The linger time may be configured by the software publisher in the FlexEnabled application. When this is the case, the longer linger time is applied.</span></li>
</ul>
<h4 class="c4 c12"><a name="h.v5zbqjrxw1bo"></a><span class="c0 c13">MAX_BORROW_HOURS:</span></h4>
<p class="c4"><span class="c1">Change the maximum borrow period for a specific feature. The new configured period value must be less than that in the license file. This option is used for licenses held in license files.</span></p>

<h4 class="c4 c12"><a name="h.6e7pqmicmk24"></a><span class="c0 c13">MAX_OVERDRAFT:</span></h4>
<p class="c4"><span class="c1">The overdraft policy allows a software publisher to specify a number of additional licenses which users are allowed to use, in addition to the licenses they have purchased. This allows your users to not be denied service when in a “temporary overdraft” state. The MAX_OVERDRAFT parameter Limits the overdraft usage to less than the amount specified in the license file.</span></p>

<h4 class="c4 c12"><a name="h.av065t2a4eh8"></a><span class="c0 c13">TIMEOUT:</span></h4>
<p class="c4"><span class="c1">Specify the idle timeout for a feature, after which an inactive license is reclaimed. The software publisher sets a minimum value. If a smaller value is set – it is ignored, and the publisher’s minimum value is used.</span></p>
 
<h3 class="c7"><a name="h.cpa45dchpxx1"></a><span class="c3">7. Setting Restrictions per Features, and specific entities</span></h3>
<p class="c4"><span class="c1">Some Options file restrictions may be applied according to the following entities: </span><span class="c0">Users</span><span class="c1">, </span><span class="c0">Groups</span><span class="c1">, </span><span class="c0">Hosts</span><span class="c1">, </span><span class="c0">Host Groups</span><span class="c1"> and </span><span class="c0">IP’s</span><span class="c1"> as shown.</span><span class="c1"> </span></p>
<p class="c4"><span class="c1">These configurations include:</span></p>

<ul class="c8 lst-kix_44m4tub4m8mv-0 start">
 <li class="c4 c5"><span class="c0">Reserved</span><span class="c1">: Reserve licenses per entity (User / User group / Host / Host group of users/hosts).</span></li>
 <li class="c4 c5"><span class="c0">Included</span><span class="c1">: Allow a user to use a feature.</span></li>
 <li class="c4 c5"><span class="c0">Excluded</span><span class="c1">: Deny a user access to a feature.</span></li>
 <li class="c4 c5"><span class="c0">Borrow Included</span><span class="c1">: Allow a user to borrow licenses.</span></li>
 <li class="c4 c5"><span class="c0">Borrow Excluded</span><span class="c1">: Deny a user the ability to borrow licenses.</span></li>
 <li class="c4 c5"><span class="c0">Max</span><span class="c1">: Limit usage for a particular feature/group—prioritizes usage among users.</span></li>
</ul>
<p class="c4"><img class="alignnone size-full wp-image-55250" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-17.44.42.png" alt="" width="1919" height="1080" /></p>
 
<h3 class="c7"><a name="h.gvz6nqeuds1e"></a><span class="c3">Allow or Deny the Entire Vendor’s  Feature Set</span></h3>
<p class="c4"><span class="c1">It is possible to Allow or Deny an entity (usergrouphosthost groupIP) the entire set of features that a specific vendor daemon serves.</span></p>
<p class="c4"><span class="c1">8.1. In the Options file management window, select the </span><span class="c0">All Features </span><span class="c1">tab.</span></p>
<p class="c4"><span class="c1">8.2</span><span class="c1">. Add an entity of users (User Group Host Host Groups IP)</span></p>
<p class="c4"><span class="c1">8.3. Check the </span><span class="c0">Exclude All</span><span class="c1"> or </span><span class="c0">Include All</span><span class="c1"> radio button;</span></p>

<ul class="c8 lst-kix_kv98ijytr0y2-0 start">
 <li class="c4 c5"><span class="c0">Exclude All</span><span class="c1">: Deny access to all features served by this vendor daemon</span></li>
</ul>
<ul class="c8 lst-kix_yijtfyreh83m-0 start">
 <li class="c4 c5"><span class="c0">Include All</span><span class="c1">: Enable access to all features served by this vendor daemon</span></li>
</ul>
<p class="c4"><span class="c1">8.4. Click </span><span class="c0">Save</span></p>
<p class="c4"><img class="alignnone size-full wp-image-55251" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-17.46.03.png" alt="" width="1920" height="1080" /></p>
 
<h2 class="c9 c18"><a name="h.tfry21203ts1"></a>Editing the Options file by Keywords</h2>
<p class="c9">Feature names can be adjoint to an optional keyword-value pair to fully qualify it. This notation is used for distinguishing a particular group of licenses when there are multiple FEATURE lines for a single feature.</p>
<p class="c9">The following syntax is used: <span class="c10">feature:keyword=value</span></p>
<p class="c9">For example: <span class="c10">f1:VERSION=2.0 </span>specifies the version 2.0 pool of licenses for feature f1.</p>
<p class="c9">The following Options file keywords are used as feature name modifiers to denote a specific group of licenses: <span class="c10">VERSION, HOSTID, EXPDATE, KEY, </span><span class="c10">SIGN</span><span class="c10">, ISSUER, NOTICE,  VENDOR_STRING</span> (if configured by the publisher as a pooling component)<span class="c19">, </span><span class="c10">dist_info, user_info and asset_info</span><span class="c21">.</span></p>
<p class="c9">This enhancement enables advanced operations, such as:</p>

<ul class="c8 lst-kix_26r2zj3wfpoc-0 start">
 <li class="c9 c5">Including or excluding users and groups to features of specific packages, according to the keywords. For example - the SIGN attribute will differentiate between similar features that reside in different packages.</li>
</ul>
<ul class="c8 lst-kix_26r2zj3wfpoc-0">
 <li class="c9 c5">Allocating specific Network Named Users’ (NNU) licenses:</li>
</ul>
<pre class="c9 c22"><span class="c10">GROUP NNU_MATLAB_USERS User1 User2 User3 User4 User5</span>

<span class="c10">INCLUDE MATLAB:asset_info=123 GROUP NNU_MATLAB_USERS</span></pre>
<p class="c9 c15">In order to apply license restriction by Keyword (see image below for clarification):</p>
<p class="c9 c15">9.1 Expand the ‘Keywords’ pane</p>
<p class="c9 c15">9.2 Select a specific Feature, and click the ‘Add’ button.</p>
<p class="c9 c15">9.3 Select a keyword from the drop-down menu.</p>
<p class="c9 c15">9.4 Provide a value for the new Keyword (e.g. 123), and click ‘OK’</p>
<p class="c9 c15"><img class="alignnone size-full wp-image-55252" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-03-13-at-17.48.15.png" alt="" width="1920" height="1080" /></p>
 
<h3 class="c7"><span class="c3">. Preview</span></h3>
<p class="c9">Click the <span class="c19">Preview</span> button to preview the impact of the EasyAdmin Options file configuration on the actual file. The example on item #7 above will yield the following output:</p>

<pre class="c9"><span class="c11">MAX_BORROW_HOURS 85811IDSS_F 50</span>

<span class="c11">GROUP MYTESTGROUP U2 U3</span>

<span class="c11">RESERVE 3 85811IDSS_F USER u1</span>

<span class="c11">EXCLUDEALL GROUP MYTESTGROUP</span></pre>
 
<h3 class="c7"><a name="h.9bwn7316t9wn"></a><span class="c3"> Writing the Options file on the license server</span></h3>
<p class="c9">There are two methods to apply the configured change on the actual Options file on the license server’s machine:</p>
<p class="c9">11.1. Manually: Click the <span class="c19">Deploy </span>button.</p>
<p class="c9">11.2. Automatically: Through the EasyAdmin Start → Administration → Options Files window: Select a specific Options file, click the <span class="c19">Edit</span> button, and check the <span class="c19">Enable Options file automatic update </span>box, as described in section 2 above.</p>
<p class="c9">After the Options file is written, The OpenLM Broker’s Reread command is invoked, so that the changes in the Options file would take effect. Read more about the <span class="c24"><a class="c2" href="https://www.google.com/url?q=https%3A%2F%2Fwww.openlm.com%2Fapplication-notes-v3-0%2Finstalling-openlm-v3-0%2Fbroker-comprehensive-installation-guide-an4004b%2F&sa=D&sntz=1&usg=AFQjCNHz3s2RLxyv3PyXU24bTr_arcOjSA">Broker commands here</a></span>.</p>
 
<h2 class="c9 c18"><a name="h.6wxl3ing77d0"></a>Reading Options files</h2>
<p class="c9">As displayed above, Options files can be written and updated from the OpenLM EasyAdmin interface to the file resident on the license server machine. As a complementary property, the Options file can also be read by OpenLM, to introduce the organization’s users and groups to the OpenLM database. To do so:</p>

<ul class="c8 lst-kix_w14gwqnq36be-0 start">
 <li class="c9 c5">Click EasyAdmin Start → Administration → Options Files window</li>
 <li class="c9 c5">Select a specific Options file</li>
 <li class="c9 c5">Click the Edit button</li>
 <li class="c9 c5">Set the Options file direction to ‘Read’ by checking the “Changes made to the Options File are reflected in the EasyAdmin Options File editor” radio button.</li>
</ul>
<p class="c9">Please refer to this application note for more information on importing users<span class="c24"><a class="c2" href="https://www.openlm.com/knowledge-base/importing-users-and-groups-via-the-options-files-reading-mechanism-kb4037a/"> through Options file reading</a></span>.</p>
 
<h2 class="c9 c18"><a name="h.wxmltxx8qm5v"></a>Monitoring Multiple FlexLM license pools</h2>
<p class="c9">Licenses for equivalent features may be bought separately, thus forming separate ‘pools’ in the license file, each pool determining specific attributes. OpenLM v3.0 <span class="c6">provides a method of differentiating license usage according to the licensing model and license pool. The license type is displayed in the “license type” column (e.g. in the ‘Licenses’ window). The license pool is displayed in the “Additional key” column (e.g. also in the  ‘Licenses’ window). For additional information please refer to this document:</span></p>
<p class="c9 c26"><span class="c23"><a class="c2" href="https://www.openlm.com/knowledge-base/multiple-flexlm-license-pool-monitoring-kb4053/">Multiple FlexLM license pool monitoring </a></span></p>
