---
title: "LDAP Connector Configuration"
date: "2023-11-05T22:03:21"
permalink: "https://www.openlm.com/docs/ldap-connector-configuration/"
posttype: "manual_documentation"
id: "6712"
---

<h2>What is LDAP Connector</h2>
LDAP Connector can save User and Group entity data from Source Directory to Amazon S3 or SQS. This is convenient if you would like to make use of entity data for your solution (ex: Software).
<h2>Prerequisites</h2>
<ul>
 <li><a href="https://www.openlm.com/knowledge-base/openlm-cloud-registration-installation-configuration/">OpenLM SLMC Registration</a></li>
 <li>Directory Sync Activation and Configuration if you would like to sync with OpenLM SLM DB.
(Not necessary if you just want to sync with Amazon S3 or SQS only)</li>
 <li>LDAP Connector Activation in the Cloud Portal</li>
</ul>
<h2>Configuration</h2>
<ul>
 <li>Activate the LDAP Connector in Cloud Customer Portal.
<img class="wp-image-56144" src="https://www.openlm.com/wp-content/uploads/2023/04/word-image-56143-1.png" /></li>
 <li>Set up a source Active Directory in Directory Sync:
<a href="https://www.openlm.com/knowledge-base/setting-up-cloud-directory-sync/">https://www.openlm.com/knowledge-base/setting-up-cloud-directory-sync/</a></li>
 <li>Active Directory</li>
 <li>eDirectory</li>
 <li>ApacheDS</li>
 <li>AzureAD</li>
 <li>Google CDS</li>
 <li>Please configure the Synchronization setting in Directory Sync.</li>
</ul>
<a href="https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/">https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/</a>
<ul>
 <li>Set up a destination System in LDAP Connector.
You can register multiple systems. Check connectivity.
Amazon S3
Amazon SQS
<img class="wp-image-56145" src="https://www.openlm.com/wp-content/uploads/2023/04/word-image-56143-2.png" /></li>
 <li>Go to Directory Sync and manually run Sync.
<img class="wp-image-56146" src="https://www.openlm.com/wp-content/uploads/2023/04/word-image-56143-3.png" /></li>
 <li>In case this doesn’t trigger LDAP Connector, please delete all entities from Directory Sync Database once and run Sync from scratch.<img class="wp-image-56147" src="https://www.openlm.com/wp-content/uploads/2023/04/word-image-56143-4.png" /></li>
 <li>User and Group entities are saved and synchronized in the registered destination systems.</li>
</ul>
 
