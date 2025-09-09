---
title: OpenLM EasyAdmin administration
sidebar_position: 7
description: Overview of the OpenLM EasyAdmin interface administration features and settings.
---


<h2><a id="post-37531-_2jsojb7m7o7"></a>Ports Changing</h2>
Please note, that it's not enough to just change listening ports. After changing the listening port number, make sure all other components that connect to it as a client, are also updated for the new port number. E.g. if you change Server port 5015 to something else, you also need to change other components to use the new port because they are connecting to Server API through 5015.
<h2><a id="post-37531-_11ausia1x9ck"></a>OpenLM Server</h2>
Access C:Program FilesOpenLMOpenLM Serverbinappsettings.json to make the required changes:

<img class="wp-image-37532" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-51.png" />

<img class="wp-image-37533" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-52.png" />

 
<h2><a id="post-37531-_4e42hbml5yo"></a>Identity Service</h2>
Go to C:Program FilesOpenLMOpenLM Identity ServiceSecurityServiceappsettings.json

<img class="wp-image-37534" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-53.png" />

<img class="wp-image-37535" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-54.png" />

If you are changing ports of other components:

<img class="wp-image-37536" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-55.png" />

 
<h2><a id="post-37531-_ioueay839731"></a>Broker</h2>
Change the ports of OpenLM Server, then you can use other ports other than 5015 in the Broker configuration tool.
<h2><a id="post-37531-_ngbvc3tdpa8x"></a>Broker UI</h2>
Access C:Program FilesOpenLMOpenLM Brokerbroker.xml

<img class="wp-image-37537" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-56.png" />
<h3><a id="post-37531-_evamhj4dc53v"></a>End-User Services</h3>
Access C:Program FilesOpenLMEnd-User Servicessettings.json

<img class="wp-image-37538" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-57.png" />

If you are changing ports for other components:

<img class="wp-image-37539" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-58.png" />
<h3><a id="post-37531-_7k7wokcu9pua"></a>Workstation Agent</h3>
If you are changing ports for other components,

C:Program FilesOpenLMAgentsettings.json

<img class="wp-image-37540" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-59.png" />
<h3>Applications Manager</h3>
C:Program FilesOpenLMOpenLM Applications Manageropenlm-app-manager.properties

<img class="wp-image-37541" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-60.png" />

If you are changing ports for other components,

<img class="wp-image-37542" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-61.png" />
<h3><a id="post-37531-_p79qqx6a5ysa"></a>Reports Scheduler</h3>
C:Program FilesOpenLMOpenLM Reports Schedulerreport_scheduler.properties

<img class="wp-image-37543" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-62.png" />

C:Program FilesOpenLMOpenLM Serverbinwwwrootparams.js

<img class="wp-image-37544" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-63.png" />

If you are changing ports for other components,

C:Program FilesOpenLMOpenLM Reports Schedulerreport_scheduler.properties.

<img class="wp-image-37545" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-64.png" />
<h3><a id="post-37531-_78x8ba92c825"></a>DSS</h3>
C:Program FilesOpenLMOpenLM Directory Synchronization Servicekestrel.config

<img class="wp-image-37546" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-65.png" />

 
<h3><a id="post-37531-_zrmetmh8koc"></a>DSA</h3>
C:Program FilesOpenLMOpenLM Directory Synchronization Agentkestrel.config

<img class="wp-image-37547" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-66.png" />

If you are changing ports for other components,

C:Program FilesOpenLMOpenLM Directory Synchronization AgentOpenLM.Ldap.Agent.config

<img class="wp-image-37548" src="https://www.openlm.com/docs/wp-content/uploads/2022/05/word-image-67.png" />
