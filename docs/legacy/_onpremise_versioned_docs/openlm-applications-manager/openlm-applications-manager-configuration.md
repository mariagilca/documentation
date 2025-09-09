---
title: "OpenLM Applications Manager Configuration"
date: "2023-11-04T23:02:26"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/openlm-applications-manager-configuration/"
posttype: "manual_documentation"
id: "6612"
---

OpenLM Applications Manager is a Java application that monitors and controls the use of any software in the organization regardless of the licensing scheme in effect. This document details the steps on how to configure the  OpenLM Applications Manager.

The main features of the Applications Manager are as follows:
<ul>
 <li>Obtains information from the OpenLM WorkstationAgent regarding active processes and software launches on the end-user workstation</li>
 <li>Enables OpenLM Workstation Agents to launch software according to specific rules and configurations</li>
</ul>
The Applications Manager interacts with the OpenLM Workstation Agent which is a lightweight component that is installed on the end-users’ workstations. It has the following features:
<ul>
 <li>Monitors processes that are running on the workstation</li>
 <li>Intercepts and reports software launch events</li>
 <li>Intervenes in the execution of specific processes on the workstation by running actions as defined by an administrator</li>
</ul>
The Applications Manager also adds management capabilities to applications that are not managed by a license manager or in cases where the license manager lacks advanced management capabilities.

In situations where workstation licenses cannot be managed directly by a license manager (e.g., single licenses or named licenses), the OpenLM Applications Manager provides the ability to monitor software usage. This permits OpenLM to simultaneously monitor software controlled by a license manager along with software that supports stand-alone licenses.
<h2 data-id="articleTOC_0"><strong>Installing required OpenLM components</strong></h2>
The following components are mandatory for the functioning of OpenLM Applications Manager:
<ul>
 <li><strong>OpenLM SLM</strong> which provides an administrative interface (EasyAdmin) to configure OpenLM Applications Manager and its related components, maintains license usage information in the database and provides a platform for reporting license usage. Please see the<a href="https://www.openlm.com/knowledge-base/openlm-server-installation-guide-kb4414/"> OpenLM SLM Installation Guide</a> for more installation information.</li>
 <li><strong>OpenLM Workstation Agent</strong> must be installed on all end-user workstations that will be monitored. The Agent is an end-user proxy that monitors software activity on a user’s workstation. Please see the<a href="https://www.openlm.com/knowledge-base/end-user-services-personal-dashboard-agent-installation-and-configuration/"> OpenLM Workstation Agent Installation</a> guide for more installation information.</li>
 <li><strong>OpenLM Broker</strong> and <strong>OpenLM Applications Manager – </strong>must both be installed on the same Windows OS or Linux machine. OpenLM Broker performs tasks as prompted by the OpenLM SLM and returns advanced licensing information from the license managers.</li>
</ul>
<h2 data-id="articleTOC_1"><a id="post-26657-_ge9hly7db3rh"></a><strong>Configuring OpenLM Workstation Agent</strong></h2>
<ol>
 <li>Make sure the OpenLM Applications Manager is installed before configuring the Workstation Agent. Consult the <a href="https://www.openlm.com/knowledge-base/openlm-applications-manager-v2-installation-configuration-guide-kb805/">OpenLM Applications Manager installation document</a> for detailed instructions on installation.</li>
 <li>Download and install the latest Workstation Agent version from the<a href="https://www.openlm.com/download/"> OpenLM website</a>.</li>
</ol>
<h2 data-id="articleTOC_2"><strong>Configuring OpenLM Applications Manager</strong></h2>
Before proceeding with configuration, make sure that the Applications Manager has been detected and configured in OpenLM Broker’s settings. The Broker in turn should be connected and reporting to an installation of OpenLM SLM.

The following section describes the configuration options and features of the OpenLM Applications Manager.
<h3 data-id="articleTOC_3"><strong>Adding an application to OpenLM Applications Manager</strong></h3>
Applications can be added to the Applications Manager either manually through EasyAdmin’s user interface window The following steps describe how to add an application to the OpenLM Applications Manager using EasyAdmin User Interface:

1. Open the OpenLM EasyAdmin User Interface (<strong>Windows Start → OpenLM →</strong> <strong>OpenLM EasyAdmin User Interface</strong>):

2. Select the <strong>Administration </strong>option from the <strong>EasyAdmin Start Menu</strong>:

3. Click on <strong>OpenLM Applications Manager</strong>:

<img class="wp-image-45305" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-1.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1912px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-1.png 1912w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-1-1280x601.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-1-980x460.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-1-480x225.png 480w" width="1912" height="897" />

4. In the opened <strong>Applications</strong> window, click the <strong>Add </strong>button:

<img class="wp-image-45306" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-2.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1926px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-2.png 1926w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-2-1280x597.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-2-980x457.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-2-480x224.png 480w" width="1926" height="899" />

5. Select the Tracking Type from the drop-down menu depending on what you want to track: <em>Process, File, </em>or<em> Folder</em>.
<ul>
 <li><strong>Process</strong> – this tracks the application using its process name. Most often, this is the same name as the executable without the *.exe extension. To determine the process name of the application you want to track, start the application, open <em>Windows Start → Task Manager, </em>then locate the name of the process associated with your application.</li>
 <li><strong>File</strong> – this tracks the application by monitoring the launch of a specific executable file. Similar to the Process tracking type.</li>
 <li><strong>Folder</strong> – this tracks the application by monitoring all executable file launches in a folder.</li>
</ul>
<img class="wp-image-45307" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-3.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 782px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-3.png 782w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-3-480x195.png 480w" width="782" height="318" />

6. Fill in the text fields as follows. Fields marked with an asterisk are mandatory:

<strong>Application Name*</strong> – a unique name for the application you will be tracking

<strong>Process Name*</strong> – this should match the name of the application process.

<strong>File Path* / Folder Path*</strong> – if you’ve selected the “File” or “Folder” tracking type, enter the full path of the file or folder you want to track

<strong>Description*</strong> – Enter a description to help you recall what a certain process, file or folder does

<strong>Vendor*</strong> – Select the vendor related to the application from the drop-down list or enter your own

<strong>Version</strong> – Enter a version number to help you identify an application and manage to track of multiple versions

<strong>Parameters</strong> – Enter the parameters that were used to launch the tracked application. Used for applications that have the same process name but offer different features depending on what arguments/parameters are used to launch the executable

<strong>Enabled</strong> – Check whether to enable/disable tracking for this application

<strong>Limit*</strong> – Specify the number of concurrent instances allowed per application. “Unlimited” by default. Set to 0 to block all instances from launching.

<strong>License Return Policy</strong> – The license return policy is a collection of definitions that specify when OpenLM releases a license back to the pool.

<strong>License Consumption Policy*</strong> – The license consumption policy specifies certain rules for how an application is to be used, including whether to deny multiple version launches and how to count multiple licensing use

<img class="wp-image-45308" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-4.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 778px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-4.png 778w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-4-480x445.png 480w" width="778" height="722" />

7. Click “Save” to add a new application.
<h3 data-id="articleTOC_4"><strong>Editing an existing application configuration</strong></h3>
To edit an already configured application configuration, you must select the row of the application and then either click on “Edit” in the Applications Manager window or double-click the corresponding row. The configuration settings are the same as in section 3.1 when adding an application.
<h3 data-id="articleTOC_5"><strong>Using the “Filtered Vendors” functionality</strong></h3>
The<strong> <em>Filtered Vendors</em></strong> button allows administrators to prevent double usage reporting when monitoring software that has both floating and non-floating licensing options.

There may be cases when the software on a user’s machine connects to a license manager (e.g. FlexLM) but also has the capability of running using a stand-alone license (e.g. a single-use registration key). Under regular circumstances, if the application is monitored by both the license manager (through OpenLM Broker/SLM) and the OpenLM Applications Manager, launching the application would mean that usage is reported in both places. The “Filtered Vendors” function ensures this doesn’t happen so that the Applications Manager only reports stand-alone license usage.

The term “stand-alone license” refers to any of the following:
<ul>
 <li>Any single-use software installation (that uses a registration key or local license)</li>
 <li>Any node-locked licenses that are not reported by a license manager</li>
 <li>Any named licenses allocated by cloud managers but aren’t monitored anywhere</li>
 <li>Any pirated software installed without the system administrator’s consent</li>
 <li>Any network licenses that are not supported by the OpenLM SLM</li>
</ul>
<strong>Known limitations</strong>
<ul>
 <li>Our solution is based on the assumption that the monitored software is using either a network license or a stand-alone license for the same user on the same workstation.</li>
 <li>Software that has both types of licenses will be considered by the Applications Manager as a network license. As a result, sessions from stand-alone licenses will not be reported.</li>
 <li>When a user switches the licensing method on a workstation (either from network to stand-alone or vice versa), there may be a margin of error for which usage will be erroneously reported.</li>
 <li>Vendor filtering does not distinguish between different applications which use the same vendor name. If you want to filter sessions for applications with the same vendor, we recommend assigning a different vendor name for each application.</li>
</ul>
1. Click the <strong>Filtered Vendors</strong> button to open the Filtered Vendors screen:

<img class="wp-image-45309" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-5.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1916px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-5.png 1916w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-5-1280x603.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-5-980x461.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-5-480x226.png 480w" width="1916" height="902" />

2. A new window will appear with a drop-down list. Click <strong>Add</strong>, then select the desired vendor from the drop-down list (this is populated automatically from the available products list):

<img class="wp-image-45310" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-6.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 602px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-6.png 602w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-6-480x360.png 480w" width="602" height="451" />

3. Click <strong>Save </strong>to commit the changes.

This completes the filtering setup. One of two things will happen:
<ul>
 <li>If the filtered vendor software is controlled by a license manager and a license is consumed (e.g., a floating license), the license usage will be reported by OpenLM SLM only.</li>
 <li>If the filtered vendor software is not controlled by a license manager and a license is consumed e.g., a cloud license, a single user (stand-alone license or pirated software), the license will be reported instead by the OpenLM Applications Manager.</li>
</ul>
<strong>NOTE</strong>: If a user consumes a floating license and does not have the usage report from the license manager for the past 72 hours, the license will be logged as a single-user and not as a floating one. During the short window of this transition between floating and stand-alone licenses, there may be a period of overlap (less than 10 minutes) where a license is counted as both types and appears in reports for both OpenLM SLM and the OpenLM Applications Manager.
<h3 data-id="articleTOC_6"><a id="post-26657-_mxihdzx2un83"></a><strong>Defining rules with the License Consumption Rules Table</strong></h3>
The <strong>License Consumption Rules Table</strong> allows you to define different types of access rules for licenses. The rules are implemented as a “Decision Table”. Click the <strong>License Consumption Rules Table</strong> button to open it:

<img class="wp-image-45311" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-7.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1920px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-7.png 1920w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-7-1280x601.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-7-980x460.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-7-480x225.png 480w" width="1920" height="901" />
<h4 data-id="articleTOC_7"><strong>Adding a new rule</strong></h4>
1. The default <strong>Rule Name </strong>is “Everyone” with the <strong>Actions </strong>set to Deny.

<img class="wp-image-45312" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-8.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1203px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-8.png 1203w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-8-980x345.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-8-480x169.png 480w" width="1203" height="424" />

2. This is a security default and must be set to <strong>Allow</strong> in order to permit application launches and to create new rules and conditions. Alternatively, this rule can be deleted by marking the left side checkbox and clicking <strong>Delete Rule</strong>.

3. Click <strong>New Rule</strong>. Type in a name (e.g. <strong><em>Windows Media Player is not allowed</em></strong>) and set the desired outcome by either checking <strong><em>Deny </em></strong>or <strong><em>Allow </em></strong>(e.g. <strong><em>Deny</em></strong>):

<img class="wp-image-45313" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-9.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1914px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-9.png 1914w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-9-1280x603.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-9-980x461.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-9-480x226.png 480w" width="1914" height="901" />

<strong>Note:</strong> The red triangle indicator shows field changes that haven’t been saved. Press the <strong>Save </strong>button to commit the changes.
<h4 data-id="articleTOC_8"><strong>Adding a new condition to a rule</strong></h4>
1. To create a condition for a new or existing rule click on <strong>New Condition</strong>:

<img class="wp-image-45314" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-10.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1200px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-10.png 1200w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-10-980x338.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-10-480x166.png 480w" width="1200" height="414" />

The <strong>Condition Editor</strong> window will appear. To create a condition, first select the argument followed by the type of operation, and finally input a compared value.

<img class="wp-image-45315" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-11.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 897px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-11.png 897w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-11-480x265.png 480w" width="897" height="496" />

2. Here is a description of each of the <strong>Argument </strong>options:

<strong>Time </strong>– makes your rule time-sensitive. The <em>after</em> and <em>before</em> operations are based on the time of day while <em>matchesCron</em> allows you to define a rule with CRON expressions. Note that the syntax for CRON rules is slightly different from Linux CRON (<a href="http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html">more info</a>)

<em>Example:</em>

time after 9:00

time before 18:00

time matchesCron * * 15 9 6 ?

<strong>Application </strong>– binds the rule to a specific application. The <em>equal, startsWith</em> and <em>endsWith</em> operations are checked against the application name/product name as it has been set in the OpenLM Applications Manager configuration window.

<em>Example:</em>

application equals AutoCAD 2016

application equals MicroStation

application startsWith AutoCAD

application endsWith 2016

<strong>Username </strong>– used to associate a rule to one or more user accounts. The <em>equals</em> operator looks for an exact match while <em>startsWith</em> and <em>endsWith</em> work as wildcard operators.

<em>Example:</em> the _NY suffix is assigned to all usernames from your NY office. You can apply the following condition to all user accounts that match this pattern

username endsWith _NY

<strong>Workstation </strong>– used to associate a rule to a specific workstation. The comparison is made using the workstation’s name.

<em>Example:</em> your organization differentiates desktop workstations with the “DESKTOP-” prefix. If you wanted to create a condition that applies to all desktop computers you could use the following condition

workstation startsWith DESKTOP-

<strong>Groups </strong>– used to associate a rule to users belonging to a specific group as defined in OpenLM’s Groups component.

<em>Example:</em> a condition that applies to users of the “engineering” group

groups include engineering

or you can have a condition for users not associated with any group

groups empty

<strong>Version </strong>– used to associate a rule to a specific version of your software. This is compared to the version value which is set when adding an application to the Applications Manager.

<em>Example:</em>

version equals 5.0

version startsWith 5

version endsWith 2019

<strong>Vendor </strong>– used to associate a rule to a specific Vendor. Vendor-specific rules can be configured by comparing against the vendor value which is set when adding an application to the Applications Manager.

<em>Example:</em>

vendor equals Autodesk

vendor equals Bentley

3. <strong>Select an operation</strong> for the argument. The operation choices are dependent on the type of <strong>Argument </strong>you have selected:

<img class="wp-image-45316" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-12.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 903px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-12.png 903w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-12-480x265.png 480w" width="903" height="498" />

4. Enter a value in the <strong>Compared value </strong>field. With the exception of the <strong>time</strong> argument, this field must fully or partially match (if using the <em>startsWith</em> or <em>endsWith</em> operations) the value as it was defined when an application was added to the Applications Manager list. <strong>Please note that the value comparison is not case sensitive.</strong>

In our example, to match the “Windows Media Player is not allowed” rule, we are setting the condition type to <em>application</em>, the operation to <em>equals</em> and the compared value to <em>windows media player </em>as it has been defined the Applications Manager list

<img class="wp-image-45317" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-13.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 726px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-13.png 726w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-13-480x328.png 480w" width="726" height="496" />

<strong>Note</strong>: Application name, Version and Vendor are the values as you have defined them in the OpenLM Applications Manager. Groups are automatically displayed as they’re present in the OpenLM system. Username and Workstation are matched to the ones reported from OpenLM Workstation Agent.

5. Click the <strong>Save </strong>button to commit the new settings. A new <strong>Conditions </strong>column will appear on the <strong>License Consumption Rules Table</strong> screen.

6. Check the box under <strong>Conditions</strong> in the newly added column for the rule you wish to associate it with.

<img class="wp-image-45318" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-14.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) 1202px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-14.png 1202w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-14-980x350.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-14-480x171.png 480w" width="1202" height="429" />

In our example, the Applications Manager will now check for the launch of the <em>windows media player</em> application whenever a monitored Agent/workstation launches the process, file or folder that has been associated with it. If the condition is met, the Applications Manager will then check against the value of the Actions column to determine whether to <strong>Deny</strong> or <strong>Allow</strong> the application launch.
<h4 data-id="articleTOC_9"><strong>Testing a condition</strong></h4>
In order to test if a new condition is being applied, open an application that has the <strong>Deny</strong> flag set. In our example, this is the <em>Windows Media Player</em> application which has already been added to the Applications Manager configuration. A generic denial message appears when a user attempts to open the application:

Customizing the default message or script that is run is possible by double-clicking on either of the <em>Allow</em> or <em>Deny</em> action columns. This will bring up the Action Editor screen which follows the same configuration as the “Adding a New Action” section below.
<h4 data-id="articleTOC_10"><strong>Adding a new action</strong></h4>
1. Click<strong> New Action</strong> to open the Action Editor screen:

<img class="wp-image-45319" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-15.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1913px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-15.png 1913w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-15-1280x571.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-15-980x437.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-15-480x214.png 480w" width="1913" height="854" />

2. Configure the available fields as follows:

<strong>Name</strong>:

<strong>Allow </strong>– Action will be run when a license is successfully granted.

<strong>Deny </strong>– Action will be run when a license is denied.

<strong>Script</strong>:

This field is available only if your OpenLM SLM license includes the Custom Commands feature (<a href="https://www.openlm.com/contact-sales/">contact sales for more information</a>). This field should contain commands that use the Windows Shell scripting format. Some of the functionality that can be achieved with scripts includes, but is not limited to:
<ul>
 <li>Displaying custom messages such as warnings</li>
 <li>Changing registry entries to allow creative management of available licenses</li>
 <li>Launching any program or process automatically</li>
</ul>
For more detailed information on custom commands see the<a href="https://www.openlm.com/knowledge-base/using-custom-commands/"> Using Custom Commands document</a>.

<strong>Run At:</strong>

<strong>Application</strong>:
<ul>
 <li style="list-style-type: none;">
<ul>
 <li>Intended for scripts that run in the Agent Application domain – those that facilitate on-screen viewing and user interaction (e.g. show messages or display applications).</li>
 <li>The script is executed with the current user’s account privileges.</li>
 <li>These scripts cannot influence System-owned tasks.</li>
</ul>
</li>
</ul>
<strong>Service</strong>:
<ul>
 <li style="list-style-type: none;">
<ul>
 <li>Intended for scripts that run in the Agent Service domain – background tasks and silent procedures (e.g. manage the registry or configure security policies).</li>
 <li>The script is executed with the System user’s account privileges.</li>
 <li>Scripts cannot access any user preference.</li>
 <li>These scripts cannot influence User-owned tasks</li>
</ul>
</li>
</ul>
3. Click <strong>Save </strong>to commit the changes. A new <strong>Actions </strong>subcolumn will appear on the right side of the <strong>License Consumption Rules Table</strong> window. In our example, this is an additional Deny column:

<strong>Note:</strong> It is possible to have multiple actions for a single rule name. For example, you may want to run both an application and a service. To delete unwanted columns, click the column header (e.g., Allow or Deny) and click the <strong>Delete</strong> button in the Action Editor window:

4. Check the <strong>Deny </strong>box in the newly added column.

5. Click <strong>Save</strong> to commit the changes. The script will now be run for all denied events that match the condition.

<strong>Note:</strong> If there are multiple rules matching a request, OpenLM Applications Manager gives priority to the one that has the most conditions checked. E.g. if you have a rule for everyone running AutoCAD but you want to make an exception for the user JohnDoe, you simply create another rule that checks the same conditions but you also create an additional condition for the username JohnDoe. Because this rule has more conditions, it will be prioritized over all the other rules that have similar conditions.
<h4 data-id="articleTOC_11"><a id="post-26657-_enu9njstbz6p"></a><strong>3.4.5 Editing an existing action or condition</strong></h4>
1. To edit an existing action or condition click on its label (e.g., “application starts with Windows media player” under <strong>Conditions</strong> or “Allow/Deny” under <strong>Actions</strong>):

<img class="wp-image-45320" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-16.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1912px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-16.png 1912w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-16-1280x578.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-16-980x442.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-16-480x217.png 480w" width="1912" height="863" />

2. Either the <strong>Condition Editor </strong>or the <strong>Action Editor</strong> window will appear where you can change the configured settings:

<img class="wp-image-45321" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-17.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) 899px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-17.png 899w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-17-480x263.png 480w" width="899" height="493" />
<h3 data-id="articleTOC_12"><strong>Configuring License Return Policies</strong></h3>
1. The set of rules that defines Applications Manager behavior for when a user closes an application is configured under the <strong><em>License Return Policies</em></strong> tab in the lower half of the OpenLM Applications Manager window:

<img class="wp-image-45322" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-18.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1913px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-18.png 1913w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-18-1280x606.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-18-980x464.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-18-480x227.png 480w" width="1913" height="905" />

The explanation for each field is as follows:

<strong>Name </strong>– a unique name to help you associate a specific application to a policy.

<strong>Agent Heartbeat Timeout (min) </strong>– represents the amount of time the Applications Manager holds the license for once the OpenLM Agent instance has stopped sending heartbeats. A heartbeat is a message that is sent every minute which includes a list of all the monitored and running applications on a workstation. This is how the OpenLM Applications Manager synchronizes its state in case of missed events. Once the timeout period has been reached, all licenses related to the OpenLM Agent instance are released.

<strong>Hibernating</strong> – by default, when a workstation is shut down, OpenLM Agent sends a message to terminate all sessions and release all licenses associated with the workstation. Enabling this checkbox will ensure that this behavior also applies when the workstation enters Sleep, Stand By, or Hibernate mode. When this option is enabled, all licenses related to a workstation are released immediately. If disabled, the Applications Manager waits for the heartbeat timeout before releasing any licenses.

<strong>Bucket Duration</strong> – used mainly for applications that use the Bentley trusted licensing model. It can be set to either <strong>DAY</strong>, <strong>HOUR, </strong>or <strong>NONE</strong>. When the license is consumed within a calendar hour or day, the license stays consumed until the end of the hour or day.

If Bucket Duration is set to <strong>DAY</strong>, the Applications Manager releases licenses only at midnight.

If Bucket Duration is set to <strong>HOUR</strong>, licenses are released at minute 0 of every hour (0:00, 1:00, 2:00, etc).

<strong>Release Delay (min) </strong>– the amount of time between the application close event and the return of the license to the Applications Manager license pool. During this time, the license is still reserved to the user. If the user re-opens an application within the delay period, the Applications Manager just continues the previous session and the usage would be displayed as 1 session in the OpenLM SLM.

In the case of applications that use hourly buckets with the Bentley trusted licensing model, the Release Delay should be set to 11 minutes and Bucket Duration to <strong>NONE</strong>, as Bentley considers the minimal session length to be 10 minutes. Note that this also means that Bentley considers every session that is longer than 50 minutes as consuming at least two ‘buckets’.

2. Click <strong>Save </strong>in the upper right corner of the <strong>License Return Policies</strong> tab to commit the changes:
<h2 data-id="articleTOC_13"><a id="post-26657-_3pxjip3623ql"></a><strong>Setting up License Consumption Policies</strong></h2>
1. The <strong>License Consumption Policies</strong> tab allows configuring the behavior of the Application Manager when application launch events are detected and a license is consumed:

<img class="wp-image-45323" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-19.png" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 1917px, 100vw" srcset="https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-19.png 1917w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-19-1280x607.png 1280w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-19-980x465.png 980w, https://www.openlm.com/wp-content/uploads/2021/02/word-image-26657-19-480x228.png 480w" width="1917" height="909" />

<strong>Name </strong>– a unique value to associate an application with a policy.

<strong>Deny multiple versions</strong> – designed to prevent double license consumption of Autodesk products. Autodesk customers can purchase licenses in suites, which means users can run multiple Autodesk products while still consuming just 1 license. However if a user runs 2 versions of the same product (e.g Autodesk 2017 and Autodesk 2016), the Autodesk license manager consumes 2 licenses instead of one.

When this box is checked, OpenLM Applications Manager blocks the execution of another application that has the same vendor name but is a different version.

The version can be set either as the Version field value or as the year suffix in the Name or Description of the application. Most Autodesk products include this in their naming (e.g. AutoCAD 2017).

<em>Example:</em>

The customer purchased AutoCAD and 3DS MAX as a suite. The following rules apply if a License Consumption Policy has the “Deny multiple version” box checked:

If AutoCAD 2016 is running, launching AutoCAD 2015 would result in a denial.

If 3DS MAX 2016 is running, launching 3DS MAX 2015 would result in a denial.

The current version of OpenLM Applications Manager does not support suite configuration. However, this feature relies on the Vendor name. As a workaround, different Vendor names could be set to handle multiple software suites or products that comprise them.

<strong>License Consumption Policy</strong> – applies to the licensed consumer. Double-click on the drop-down menu to select one of the following settings:

<img class="wp-image-45324" src="https://www.openlm.com/wp-content/uploads/2021/02/license-consumption-policy-options.png" sizes="(max-width: 318px) 100vw, 318px" srcset="https://www.openlm.com/wp-content/uploads/2021/02/license-consumption-policy-options.png 318w, https://www.openlm.com/wp-content/uploads/2021/02/license-consumption-policy-options-300x158.png 300w" alt="License Consumption Policy options" width="318" height="168" />

<strong>Single license per application process</strong> – when the consumer is set as “Application Process”, every instance of an application would consume 1 license each even if they run it on the same workstation.

<strong>Single license per workstation</strong> – when the consumer is set as “Workstation”, the license is dedicated to the workstation. Different users using the same computer would consume the same license. This policy is used by applications that use the Bentley licensing model.

<strong>Single license per user on the workstation</strong> – this is the most common policy. Licenses are assigned to users. Even if users share a workstation, they would each have their license usage session reported in the OpenLM Applications Manager.

<strong>Parent Package</strong> – this feature allows the use of a shared license pool for different applications. This way, applications can be monitored and reported separately by the OpenLM SLM. The usage limit would be the same as the number of licensed applications. The value of the “<strong>Parent Package</strong>” is the name of another application that has already been configured in the OpenLM Applications Manager.

The result is that when a user runs an application associated with a policy that includes the “Parent Package”, the consumed license will be counted for both that application as well as the application that is set as the “Parent Package”.

<em>Example:</em>

“AutoCAD 2017” is configured as a stand-alone application in the Applications Manager.

A new License Consumption Policy named “AutoCAD” is created that has “AutoCAD 2017” set as the Parent Package.

“AutoCAD Map 3D 2017” is added as another application in the Applications Manager, using the “AutoCAD” policy that was just configured.

When a user launches “AutoCAD Map 3D 2017”, the Applications Manager will report that 2 licenses are used: one for “AutoCAD 2017” and one for “AutoCAD Map 3D 2017”.

2. Click <strong>Save </strong>in the upper right corner of the <strong>License Consumption Policies</strong> tab to commit the changes.
