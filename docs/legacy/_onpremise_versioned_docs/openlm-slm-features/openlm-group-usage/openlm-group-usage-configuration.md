---
title: "OpenLM Group Usage Configuration"
date: "2023-11-05T21:07:50"
permalink: "https://www.openlm.com/docs/openlm-slm-features/openlm-group-usage-configuration/"
posttype: "manual_documentation"
id: "6675"
---

<h2><b>Adding Users To A Group Manually</b></h2>
 
<ul>
 <li>Please make sure you have a single OpenLM SLM installation on a central network server.</li>
 <li>Windows <strong>Start</strong> button –> <strong>OpenLM</strong> --> <b>OpenLM User Interface </b>--> <b>Start </b>--> <b> Users & Groups --> Groups.</b></li>
 <li>Click <strong>Add Group</strong> --> <strong>Name</strong> the group --> Check the box <strong>Add Under Current Node </strong>--> Click <strong>Save.</strong></li>
 <li>Select the new group from the list --> Click <strong>Members</strong> --> Click <strong>Add </strong>--><strong> Select users </strong>--><strong> Select.</strong></li>
</ul>
<h2>Upload a CSV file</h2>
<ul>
 <li>Please make sure you have a single OpenLM SLM installation on a central network server.</li>
 <li>Download and unzip the<a href="https://www.openlm.com/Utils/importUsersToOpenLM2.zip"> CSV insert tool </a>on the same server as OpenLM SLM.</li>
 <li>Set <a href="https://docs.oracle.com/cd/E19182-01/821-0917/6nluh6gq9/index.html">JAVA_HOME variable</a>.</li>
 <li>Edit the file <strong>config.properties</strong> as follows:
<ul>
 <li><strong>login</strong> --> Your OpenLM SLM admin username.</li>
 <li><strong>password </strong>--> Your OpenLM SLM admin password.</li>
 <li><strong>csv.format.delimiter</strong> --> delimiter (Line seperator) of the csv file.</li>
</ul>
</li>
 <li><strong>Save</strong> the changes.</li>
 <li>Edit the file called <strong>groups.csv </strong>and fiil in the values as followed:
<ul>
 <li><strong>ID</strong> --> consecutive group ID (1,2,3,4....)</li>
 <li><strong>Name</strong> --> Name of the groups you wish to add.</li>
 <li><strong>ParentId</strong> --> ID of the parent group.</li>
</ul>
</li>
 <li>Edit the file called <strong>datasource.csv </strong>and fiil in user values as followed:
<ul>
 <li>Input the users's details --> UserName, FirstName, LastName, DisplayName, Title, Department, PhoneNumber, Description, Office, Email, Enabled, Projects, DefaultProject.</li>
 <li><strong>Groups</strong> --> Input group ID.</li>
 <li><strong>DefaultGroup</strong> --> Input group ID.</li>
</ul>
</li>
 <li>Double-click the file <strong>Start import.bat.</strong></li>
 <li>Open <b>OpenLM User Interface</b> –> <strong>Start</strong> –> <b>Users and Groups </b>–> <strong>Users </strong>--> See the new users.</li>
 <li>Click <strong>Start</strong> –> <b>Users and Groups </b>–> <strong>Groups</strong>--> See the new groups.</li>
</ul>
<h2><b>Configure Group Usage - Options File</b></h2>
 
<ul>
 <li>Please make sure you have a single OpenLM SLM installation on a central network server.</li>
 <li>Make sure you have an <a href="https://www.openlm.com/knowledge-base/install-openlm-broker-ht821/">OpenLM Broker installation</a> on your license servers and that the <a href="https://www.openlm.com/knowledge-base/configure-openlm-engineering-applications-ht823/">OpenLM Brokers are configured</a>.</li>
 <li>Windows <strong>Start</strong> button –> <strong>All Programs</strong> --> <strong>OpenLM</strong> --> <b>OpenLM User Interface </b>--><b> Start </b>--> <strong>Administration</strong> --><b> Options Files.</b></li>
 <li>Select the relevant options file --> <strong>Edit</strong> --> Check the box <strong>Changes made to the Options File are reflected in the OpenLM User Interface Options File editor.</strong></li>
 <li>Users and groups will be synchronized from the Options File automatically.</li>
 <li>See the <a href="https://www.openlm.com/knowledge-base/openlm-user-interface-reports-ht890/">Reports of OpenLM.</a></li>
</ul>
