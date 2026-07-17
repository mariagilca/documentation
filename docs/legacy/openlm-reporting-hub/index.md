---
title: OpenLM Reporting Hub installation guide
description: "OpenLM documentation: openlm reporting hub installation guide."
sidebar_position: 1
---

## Download and unzip

1. [Download](https://www.openlm.com/downloads/) the OpenLM Reporting Hub and unzip it to the server which will house the Reporting Hub.
2. Unzip the file to the server hosting the Reporting Hub. Depending on your preference, you can locate it on the same server as the OpenLM SLM or a different one.

## License file

1. Go to the unzipped Reporting Hub folder.
2. Navigate to ETL folder → Jobs folder → License folder.
3. Paste the license file into the license folder.

## Reporting database

1. Navigate to the unzipped Reporting Hub folder → Postgres folder →Install "Postgres Server.exe". During the installation, ensure the **Stack Builder** is left unchecked **and remember the password setup for PostgreSQL.**
2. Navigate to the Postgres "data" folder (C:\...\PostgreSQL\14\data).
3. Using a text editor with  Administrator privileges, open the  "**pg\_hba.conf**" file.
4. Look for the **Ipv4 local connections settings** section.
5. Copy and paste the existing line underneath, then change the ADDRESS  from 127.0.0.1/32 to **0.0.0.0/0**". Save the changes.  
   ![Editing the IPv4 local connections address in the pg_hba.conf file.](/img/legacy/Screenshot-2023-10-12-at-15.27.32.png)
6. Navigate to the Postgres "data" folder (C:\...\PostgreSQL\14\data).
7. Using a text editor with  Administrator privileges,  open the "**PostgreSQL.conf**" file.  
   \*Make sure **work\_mem** is not commented and has 4MB - 12MB of memory, depending on your system. This line dictates the maximum amount of data each line can have. The default is 4MB (recommended).  
   \*Make sure **shared\_buffers** is not commented and has 2048 - 8192MB of memory, depending on your system. The default is 128KB.
8. Save the edited file and restart the PostgreSQL service through the Windows Services.
9. Navigate to Windows Start →   **PGAdmin 4** and launch this app. Otherwise, use the Windows Search bar to look for the app.
10. To connect to the server, select the PostgreSQL 14 and input the password (Step 1 above). Select OK.
11. Open the context menu of the PostgreSQL 14 →  Create → Database →  name the new DB "ReportingHub" then save it.

## Power BI

- Navigate to the unzipped Reporting Hub folder →Power BI folder → Install "Power BI Desktop.msi" → Install "Power BI Connector.msi" (All components on the entire machine, including GAC component).

## Connection properties

1. Navigate to the unzipped Reporting Hub folder → ETL folder → Run the "Edit\_connection.bat" file (if you do not see a prompt to open, open the kettle.properties file in the kettle\.kettle folder in a text editor like Notepad).
2. Input source database details. (server, port, username, password, database name&schema).
3. Input destination Postgres database details (server, port, username, password, database name).
4. (Optional) Input destination MSSQL or MySQL database details (server, port, username, password, database name).
5. Input the server hostname, MAC address, and License Name in the designated fields in the **License params** section.
6. Input SMTP server details (server, port, username, password, sender email, and destination email).

### **Available properties:**

```text
ETL_TIMEZONE=int value 0..24 Default 0: TimeZone Offset
ETL_LIVE=true/false Default false : (Not yet implemented)
ETL_DATA_AGGREGATION_BY_HOUR= true/false (Minimal data aggregation per hour if 'true' or per day if 'false').'
ETL_RUN_ON_INCREMENTS= true/false (Increment the data each run if 'true,' or sync the entire dataset each time if 'false')
ETL_COMPILE_RESERVED_LICENSES= true/false (Default true: Consider reserved licenses as used licenses if 'true,' disregard reservations if 'false')
ETL_SHOW_ONLY_TRUE_DENIALS= true/false Default false: true/false Extract only true denials if 'true,' extract false denials if set to 'false.'
ETL_DENIALS_AGGREGATION_PERIOD= integer value. Default 0 (Time interval in minutes to consider for denials aggregation)
ETL_EXPORT_DENIALS_INTERVAL= integer value. (Default 7 periods in days for each transfer iteration. Values: 7-30 (7 for bigger DB's 30 For smaller)
ETL_ANONYMIZE=true/false (Default false: If set to "true," it will obfuscate usernames, hostnames, emails, and other sensitive fields in the target database)
ETL_FILTER_BY_VENDOR=accepts a CSV string as input. Default empty. (If specified - it will process data only for vendors from this list)
```

## ETL scheduling

1. Activate "Windows Task Scheduler" and select the "Task Scheduler Library."
2. Under "Actions," select "Create Task."
3. Under the "General" tab, Name the task "OpenLM ETL."
4. Check the checkbox "Run whether the user is logged on or not."
5. Check the checkbox "Run with highest privileges."
6. Navigate to the " Triggers " tab and select "New."
7. Set the schedule once daily at midnight and select OK.
8. Navigate to the " Actions " tab and select "New."
9. Select the action "Start a program".
10. Select the file "Run ETL.bat".
11. Select OK, and now the scheduled task of the ETL is set

## Run ETL

1. Navigate to the unzipped **Reporting Hub** folder → **ETL** folder → activate the "**Run ETL.bat**" file→Might take a while to finish.

## Sample reports

1. Navigate to the "Reports" folder in the "OpenLM Reporting Hub" folder.
2. Activate a report by double-clicking it.
3. In the Power BI → "Edit Queries" → "Data Source Settings" → "Change source"
4. Input the correct PostgreSQL host and database name, then select"OK."
5. Select "Edit Permissions" → "Edit".
6. Input the correct Postgres username and password, then select "OK."
7. Refresh data or "Apply Changes."
