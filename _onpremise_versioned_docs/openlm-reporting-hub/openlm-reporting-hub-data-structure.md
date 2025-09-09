---
title: "OpenLM Reporting Hub Data Structure"
date: "2023-11-05T20:40:43"
permalink: "https://www.openlm.com/docs/openlm-reporting-hub-installation-guide/openlm-reporting-hub-data-structure/"
posttype: "manual_documentation"
id: "6663"
---

[video width="1920" height="1080" mp4="https://www.openlm.com/wp-content/uploads/2017/10/Reporting-Hub-Data-Structure.mp4"][/video]

 
<h2><strong>Dimensions</strong></h2>
<h3>Calendar Dimension:</h3>
<span style="font-weight: 400;">Holds time and date fields:</span>
<ul>
 <li style="font-weight: 400;"><b>Date </b><span style="font-weight: 400;">- full date in date format (format by year, quarter, month, day, free form)</span></li>
 <li style="font-weight: 400;"><b>Date_string</b> <span style="font-weight: 400;">- date in string format (example “09-01-2017”)</span></li>
 <li style="font-weight: 400;"><b>Date_string_long</b> <span style="font-weight: 400;">- named date as string (example “Jan 9th 2017”)</span></li>
 <li style="font-weight: 400;"><b>Is_weekend </b><span style="font-weight: 400;">- is the date a part of the weekend</span></li>
 <li style="font-weight: 400;"><b>Is_holiday </b><span style="font-weight: 400;">- is the date a part of a holiday</span></li>
 <li style="font-weight: 400;"><b>Week_yyyyww </b><i><span style="font-weight: 400;">- </span></i><span style="font-weight: 400;">week of the year (YYYY-01 to YYYY-51).</span></li>
 <li style="font-weight: 400;"><b>Day_of_month </b><span style="font-weight: 400;">- day of the month (1 - 31).</span></li>
 <li style="font-weight: 400;"><b>Day_of_week </b><span style="font-weight: 400;">- day of the week (Sunday to Saturday).</span></li>
 <li style="font-weight: 400;"><b>Day_of_year </b><span style="font-weight: 400;">- day of the year (1 - 365)</span></li>
 <li style="font-weight: 400;"><b>Month </b><span style="font-weight: 400;">- month of the year (January - December)</span></li>
</ul>
<h3></h3>
<h3>License Dimension:</h3>
<span style="font-weight: 400;">Holds fields with information related to licenses.</span>
<ul>
 <li style="font-weight: 400;"><b>License_server </b><span style="font-weight: 400;">- license server</span></li>
 <li style="font-weight: 400;"><b>License_vendor </b><span style="font-weight: 400;">- vendor</span></li>
 <li style="font-weight: 400;"><b>License_feature </b><span style="font-weight: 400;">- feature</span></li>
 <li style="font-weight: 400;"><b>License_description </b><span style="font-weight: 400;">- product name</span></li>
 <li style="font-weight: 400;"><b>License_type </b><span style="font-weight: 400;">- license type</span></li>
 <li style="font-weight: 400;"><b>License_version </b><span style="font-weight: 400;">- version</span></li>
 <li style="font-weight: 400;"><b>License_additional_key </b><span style="font-weight: 400;">- additional key</span></li>
 <li style="font-weight: 400;"><b>License_expiration_date</b><span style="font-weight: 400;"> - Expiration date of the license (Blank means ongoing)</span></li>
</ul>
<h3></h3>
<h3>Package Dimension:</h3>
<span style="font-weight: 400;">Holds license package information.</span>
<ul>
 <li style="font-weight: 400;"><b>Package_vendor</b><span style="font-weight: 400;"> - Vendor name of the package</span></li>
 <li style="font-weight: 400;"><b>Package_feature</b><span style="font-weight: 400;"> - Package feature name</span></li>
 <li style="font-weight: 400;"><b>Package_description</b><span style="font-weight: 400;"> - Package descriptive name</span></li>
 <li style="font-weight: 400;"><b>Package_versions</b><span style="font-weight: 400;"> - Package version</span></li>
 <li style="font-weight: 400;"><b>Package_is_fixed</b><span style="font-weight: 400;"> - Package set as fixed</span></li>
</ul>
<h3></h3>
<h3>Project Dimension:</h3>
<span style="font-weight: 400;">Holds project information.</span>
<ul>
 <li style="font-weight: 400;"><b>Project_allocated_time</b><span style="font-weight: 400;"> - Time from start of project</span></li>
 <li style="font-weight: 400;"><b>Project_create_date</b><span style="font-weight: 400;"> - Project creation date</span></li>
 <li style="font-weight: 400;"><b>Project_end_time</b><span style="font-weight: 400;"> - Project expiration time</span></li>
 <li style="font-weight: 400;"><b>Project_name</b><span style="font-weight: 400;"> - Project name</span></li>
 <li style="font-weight: 400;"><b>Project_percent_done</b><span style="font-weight: 400;"> - How much of the project is done.</span></li>
 <li style="font-weight: 400;"><b>Project_priority</b><span style="font-weight: 400;"> - Project priority</span></li>
 <li style="font-weight: 400;"><b>Project_source </b><span style="font-weight: 400;">- Where was the project loaded from</span></li>
 <li style="font-weight: 400;"><b>Project_start_time</b><span style="font-weight: 400;"> - Project starting time</span></li>
 <li style="font-weight: 400;"><b>Project_valid</b><span style="font-weight: 400;"> - is project enabled</span></li>
</ul>
<h3></h3>
<h3>Group Dimension:</h3>
<span style="font-weight: 400;">Holds group information.</span>
<ul>
 <li style="font-weight: 400;"><b>Group_name </b><span style="font-weight: 400;">- group name.</span></li>
 <li style="font-weight: 400;"><b>Group_source </b><span style="font-weight: 400;">- source of the group (License output / LDAP).</span></li>
 <li style="font-weight: 400;"><b>Group_valid </b><span style="font-weight: 400;">- is group set as enabled.</span></li>
</ul>
<h3></h3>
<h3>User Dimension:</h3>
<span style="font-weight: 400;">Holds information related to users, such as - Full user name, department, office, address etc..</span>
<ul>
 <li style="font-weight: 400;"><b>User_name </b><span style="font-weight: 400;">- user name.</span></li>
 <li style="font-weight: 400;"><b>User_first_name </b><span style="font-weight: 400;">- user first name.</span></li>
 <li style="font-weight: 400;"><b>User_last_name </b><span style="font-weight: 400;">- user last name.</span></li>
 <li style="font-weight: 400;"><b>User_display_name </b><span style="font-weight: 400;">- selected display name for user.</span></li>
 <li style="font-weight: 400;"><b>User_title </b><span style="font-weight: 400;">- job title.</span></li>
 <li style="font-weight: 400;"><b>User_department </b><span style="font-weight: 400;">- organizational department.</span></li>
 <li style="font-weight: 400;"><b>User_phone_number </b><span style="font-weight: 400;">- user phone number.</span></li>
 <li style="font-weight: 400;"><b>User_description </b><span style="font-weight: 400;">- user description.</span></li>
 <li style="font-weight: 400;"><b>User_office </b><span style="font-weight: 400;">- user office.</span></li>
 <li style="font-weight: 400;"><b>User_email </b><span style="font-weight: 400;">- user email.</span></li>
 <li style="font-weight: 400;"><b>User_source </b><span style="font-weight: 400;">- source of the user (License output / LDAP).</span></li>
 <li style="font-weight: 400;"><b>User_valid </b><span style="font-weight: 400;">-  is user set as enabled.</span></li>
</ul>
<h3></h3>
<h3>Workstation Dimension:</h3>
<span style="font-weight: 400;">Holds all workstations.</span>
<ul>
 <li style="font-weight: 400;"><b>Workstation </b><span style="font-weight: 400;">- workstation hostname</span></li>
</ul>
 
<h2><b>Raw Measures</b></h2>
<h3>Raw Usage Measure:</h3>
<span style="font-weight: 400;">Holds total session duration, without any aggregation. </span>
<ul>
 <li style="font-weight: 400;"><b>Usage_time </b><span style="font-weight: 400;">- total session duration (do not query by time)</span></li>
 <li style="font-weight: 400;"><b>Num_of_licenses_used </b><span style="font-weight: 400;">- number of licenses pulled on a single session (tokens)</span></li>
 <li style="font-weight: 400;"><b>Borrowed </b><span style="font-weight: 400;">- was a license borrowed for this session.</span></li>
</ul>
<h3></h3>
<h3>Raw Denials Measure:</h3>
<span style="font-weight: 400;">Holds denials, without any aggregation. </span>
<ul>
 <li style="font-weight: 400;"><b>Count(denial_id)</b><span style="font-weight: 400;"> - count of denials.</span></li>
 <li style="font-weight: 400;"><b>Major_error </b><span style="font-weight: 400;">- denial major error code</span></li>
 <li style="font-weight: 400;"><b>Minor_error </b><span style="font-weight: 400;">- denial minor error code</span></li>
 <li style="font-weight: 400;"><b>Hour_of_day </b><span style="font-weight: 400;">- denial hour of day (only for using on denials)</span></li>
 <li style="font-weight: 400;"><b>Error_message </b><span style="font-weight: 400;">- detailed error message for the denial.</span></li>
</ul>
<h3></h3>
<h3>Raw Idle Time Measure:</h3>
<span style="font-weight: 400;">Holds total idle time periods, without any aggregation. </span>
<ul>
 <li style="font-weight: 400;"><b>Idle_time </b><span style="font-weight: 400;">- idle time periods</span></li>
</ul>
 
<h2><strong>Calculated Measures</strong></h2>
<h3>Feature Usage Measure:</h3>
Holds daily usage time and concurrent usage.  (features with one version only)
<ul>
 <li><b>Usage_time </b>- session duration cut by days.</li>
 <li><b>Concurrent_usage </b>- concurrent usage (per single feature selected).</li>
 <li><b>Num_of_licenses_used </b>- number of licenses pulled on a single session (tokens)</li>
 <li><b>Borrowed </b>- was a license borrowed for this session.</li>
</ul>
<h3>Feature Idle Time Measure:</h3>
Holds daily idle time periods that allows you to summarize different features and license servers.
<ul>
 <li><b>Idle_time </b>- idle time cut by days.</li>
</ul>
<h3></h3>
<h2><strong>Daily Measures</strong></h2>
<h3>Daily Concurrent Measure:</h3>
<span style="font-weight: 400;">Holds daily maximum concurrent usage that allows you to summarize different features and license servers. (features with one version only) </span>
<ul>
 <li style="font-weight: 400;"><b>Max_concurrent_usage </b><span style="font-weight: 400;">- daily maximum concurrent usage.</span></li>
</ul>
 
<h3>Daily Concurrent Measure All Versions:</h3>
<span style="font-weight: 400;">Holds daily maximum concurrent usage that allows you to summarize different features and license servers. (features with several versions)</span>

<span style="font-weight: 400;">Acts as the “Select All Versions” in EasyAdmin.</span>
<ul>
 <li style="font-weight: 400;"><b>Max_concurrent_usage_all_versions </b><span style="font-weight: 400;">- daily maximum concurrent usage for features with more than one version.</span></li>
</ul>
 
<h3>Daily Quantity Measure:</h3>
<span style="font-weight: 400;">Holds daily maximum license quantity that allows you to get accurate daily license quantity information</span>
<ul>
 <li style="font-weight: 400;"><b>Max_license_quantity </b><span style="font-weight: 400;">- Daily license quantity per license.</span></li>
</ul>
<h2></h2>
<h2><strong>Unused Tables</strong></h2>
<span style="font-weight: 400;">These tables are auxiliary tables for the usage of the ETL only, and should not be used in any report.</span>
<ul>
 <li style="font-weight: 400;"><b>Version_Table table</b><span style="font-weight: 400;"> - Holds the ETL version and last ETL run time.</span></li>
 <li style="font-weight: 400;"><b>Quantity_Dimension table</b><span style="font-weight: 400;"> - Holds all license procurements, but is not structured to be in a report, only to assist the ETL.</span></li>
 <li><b>Unfinished_Sessions_Aux</b> - Holds all the ID’s for unfinished sessions.</li>
</ul>
 
