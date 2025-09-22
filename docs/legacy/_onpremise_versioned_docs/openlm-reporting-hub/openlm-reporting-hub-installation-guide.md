---
title: OpenLM Reporting Hub Installation Guide
sidebar_position: 1
description: Step-by-step guide for installing the OpenLM Reporting Hub.
---


<h2>Download and Unzip</h2>
<ol>
 <li><a href="https://www.openlm.com/downloads/">Download</a> the OpenLM Reporting Hub and unzip it to the server which will house the Reporting Hub.</li>
 <li>Unzip the file to the server hosting the Reporting Hub. Depending on your preference, you can locate it on the same server as the OpenLM SLM or a different one.</li>
</ol>
<h2>License File</h2>
<ol>
 <li>Go to the unzipped Reporting Hub folder.</li>
 <li>Navigate to ETL folder → Jobs folder → License folder.</li>
 <li>Paste the license file into the license folder.</li>
</ol>
<h2>Reporting database</h2>
<ol>
 <li>Navigate to the unzipped Reporting Hub folder → Postgres folder →Install “Postgres Server.exe“. During the installation, ensure the <strong>Stack Builder</strong> is left unchecked <strong>and remember the password setup for PostgreSQL.</strong></li>
 <li>Navigate to the Postgres “data” folder (C:\…\PostgreSQL\14\data).</li>
 <li>Using a text editor with  Administrator privileges, open the  “<strong>pg_hba.conf</strong>” file.</li>
 <li>Look for the <strong>Ipv4 local connections settings</strong> section.</li>
 <li>Copy and paste the existing line underneath, then change the ADDRESS  from 127.0.0.1/32 to <strong>0.0.0.0/0</strong>“. Save the changes.
<img class="alignnone size-full wp-image-62386" src="https://www.openlm.com/wp-content/uploads/2021/02/Screenshot-2023-10-12-at-15.27.32.png" alt="" width="678" height="40" /></li>
 <li>Navigate to the Postgres “data” folder (C:\…\PostgreSQL\14\data).</li>
 <li>Using a text editor with  Administrator privileges,  open the “<strong>PostgreSQL.conf</strong>” file.
*Make sure <strong>work_mem</strong> is not commented and has 4MB – 12MB of memory, depending on your system. This line dictates the maximum amount of data each line can have. The default is 4MB (recommended).
*Make sure <strong>shared_buffers</strong> is not commented and has 2048 – 8192MB of memory, depending on your system. The default is 128KB.</li>
 <li>Save the edited file and restart the PostgreSQL service via the Windows Services.</li>
 <li>Navigate to Windows Start →   <strong>PGAdmin 4 </strong>and launch this app. Otherwise, use the Windows Search bar to look for the app.</li>
 <li>To connect to the server, click the PostgreSQL 14 and input the password (Step 1 above). Click OK.</li>
 <li>Right-click on the PostgreSQL 14 →  Create → Database →  name the new DB “ReportingHub” then save it.</li>
</ol>
<h2>Power BI</h2>
<ul>
 <li>Navigate to the unzipped Reporting Hub folder →Power BI folder → Install “Power BI Desktop.msi” → Install “Power BI Connector.msi” (All components on the entire machine, including GAC component).</li>
</ul>
<h2>Connection properties</h2>
<ol>
 <li>Navigate to the unzipped Reporting Hub folder → ETL folder → Run the “Edit_connection.bat” file (if you do not see a prompt to open, open the kettle.properties file in the kettle\.kettle folder in a text editor like Notepad).</li>
 <li>Input source database details. (server, port, username, password, database name&schema).</li>
 <li>Input destination Postgres database details (server, port, username, password, database name).</li>
 <li>(Optional) Input destination MSSQL or MySQL database details (server, port, username, password, database name).</li>
 <li>Input the server hostname, MAC address, and License Name in the designated fields in the <strong>License params</strong> section.</li>
 <li>Input SMTP server details (server, port, username, password, sender email, and destination email).</li>
</ol>
 
<h3><strong>Available properties:</strong></h3>
 
<pre>ETL_TIMEZONE=int value 0..24 Default <strong>0</strong>: TimeZone Offset
ETL_LIVE=true/false Default false : (Not yet implemented)
ETL_DATA_AGGREGATION_BY_HOUR= true/false (Minimal data aggregation per hour if 'true' or per day if 'false').'
ETL_RUN_ON_INCREMENTS= true/false (Increment the data each run if 'true,' or sync the entire dataset each time if 'false')
ETL_COMPILE_RESERVED_LICENSES= true/false (Default true: Consider reserved licenses as used licenses if 'true,' disregard reservations if 'false')
ETL_SHOW_ONLY_TRUE_DENIALS= true/false Default false: true/false Extract only true denials if 'true,' extract false denials if set to 'false.'
ETL_DENIALS_AGGREGATION_PERIOD= integer value. Default 0 (Time interval in minutes to consider for denials aggregation)
ETL_EXPORT_DENIALS_INTERVAL= integer value. (Default 7 periods in days for each transfer iteration. Values: 7-30 (7 for bigger DB's 30 For smaller)
ETL_ANONYMIZE=true/false (Default false: If set to "true," it will obfuscate usernames, hostnames, emails, and other sensitive fields in the target database)
ETL_FILTER_BY_VENDOR=accepts a CSV string as input. Default empty. (If specified - it will process data only for vendors from this list)</pre>
<h2>ETL scheduling</h2>
<ol>
 <li>Activate “Windows Task Scheduler” and choose the “Task Scheduler Library.”</li>
 <li>Under “Actions,” click on “Create Task.”</li>
 <li>Under the “General” tab, Name the task “OpenLM ETL.”</li>
 <li>Check the checkbox “Run whether the user is logged on or not.”</li>
 <li>Check the checkbox “Run with highest privileges.”</li>
 <li>Navigate to the " Triggers " tab and click “New.”</li>
 <li>Set the schedule once daily at midnight and click OK.</li>
 <li>Navigate to the " Actions " tab and click “New.”</li>
 <li>Choose the action “Start a program”.</li>
 <li>Select the file “Run ETL.bat”.</li>
 <li>Click OK, and now the scheduled task of the ETL is set</li>
</ol>
<h2>Run ETL</h2>
<ol>
 <li>Navigate to the unzipped <strong>Reporting Hub</strong> folder <span style="font-weight: 400;">→</span> <b>ETL </b>folder <span style="font-weight: 400;">→</span> activate the "<strong>Run ETL.bat</strong>" file<span style="font-weight: 400;">→</span>Might take a while to finish.</li>
</ol>
<h2>Sample Reports</h2>
<ol>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Navigate to the “Reports” folder in the “OpenLM Reporting Hub” folder.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Activate a report by double-clicking it.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">In the Power BI → “Edit Queries” → “Data Source Settings” → “Change source”</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Input the correct PostgreSQL host and database name, then click“OK.”</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Click “Edit Permissions” → “Edit”.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Input the correct Postgres username and password, then press “OK.”</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Refresh data or “Apply Changes.”</span></li>
</ol>
