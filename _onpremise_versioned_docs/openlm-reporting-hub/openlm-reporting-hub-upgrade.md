---
title: "OpenLM Reporting Hub Upgrade"
date: "2023-11-05T20:42:38"
permalink: "https://www.openlm.com/docs/openlm-reporting-hub-installation-guide/openlm-reporting-hub-upgrade/"
posttype: "manual_documentation"
id: "6665"
---

<h2>Notes:</h2>
<ul>
 <li>While upgrading the ETL version make sure to rename or remove the old folder.</li>
 <li>The installation should be done in an empty folder. When overwriting an existing folder it could keep some files that were deleted in the later releases and this may lead to broken functionalities.</li>
 <li>It is recommended to keep an existing kettle.properties file before upgrading the ETL.</li>
 <li>For newer releases, we may add new parameters to the kettle.properties file.</li>
 <li>If you replace a new empty configuration with an existing one it also may break the functionality if a new file has a different set of parameters.</li>
</ul>
<h3>How to Upgrade the Reporting Hub</h3>
<ol>
 <li>Go to the current installation path of the Reporting Hub and copy a <strong>backup of the license</strong> file found in “C:...ETLJobsLicense”.</li>
</ol>
<img class="wp-image-36300" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-118.png" />

2. Copy a <strong>backup of the kettle file</strong> found in “C:...ETLJobsLicense”, it holds database connection details and ETL preferences.

<img class="wp-image-36301" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-119.png" />

3<strong>. Download</strong> the latest version of RH from <a href="https://www.openlm.com/download/ReportingHub/Latest">https://www.openlm.com/download/ReportingHub/Latest</a>

<img class="wp-image-36302" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-120.png" />

4<strong>. Unzip and replace</strong> the current ETL folder with the downloaded one.

<img class="wp-image-36303" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-121.png" />

<img class="wp-image-36304" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-122.png" />

5. <strong>Paste the license file</strong> you saved back to the folder “C:…ETLJobsLicense”.

<img class="wp-image-36305" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-123.png" />

 

6. From the original <strong>kettle.properties</strong> file, copy the following:

a. Source Database (Note: FireBird entry has been removed as it is no longer supported).

<img class="wp-image-36306" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-124.png" />

b. Cross-check the Reporting database entries.

<img class="wp-image-36307" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-125.png" />

c. Destination database if using it (MSSQL or MySQL)

<img class="wp-image-36308" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-126.png" />

d. Fill in the SMTP server details from the original Kettle.properties file.

<img class="wp-image-36309" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-127.png" />

e. Fill in the entries of License params.

<img class="wp-image-36310" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-128.png" />

f. Fill in the correct ETL flagging**:

<img class="wp-image-36311" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-129.png" />

7. Applicable only if using MySQL or MS SQL Server as the destination database: <strong>Delete all the tables</strong> in the destination Reporting Hub MySQL / MSSQL database, the schema will be recreated

<img class="wp-image-36312" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-130.png" />

8. <strong>Set the variable</strong> “ETL_RUN_ON_INCREMENTS” to be “<strong>false</strong>” and save the kettle file.

<img class="wp-image-36313" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-131.png" />

9. <strong>Run the ETL</strong> using the “<strong>Run_ETL.bat</strong>” file, which will delete the old DB schema and recreate it.

<img class="wp-image-36314" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-132.png" />

10. Once the run is finished, <strong>set the variable</strong> “ETL_RUN_ON_INCREMENTS” to be “<strong>true</strong>” and save the kettle file.

<img class="wp-image-36315" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-133.png" />

**
<h2>Kettle file ETL flagging map:</h2>
<ul>
 <li>
<ol>
 <li>ETL_DATA_AGGREGATION_BY_HOUR (true/false)
<ul>
 <li>Choose if the data will get aggregated to a daily or an hourly resolution.</li>
</ul>
</li>
 <li>ETL_RUN_ON_INCREMENTS (true/false)
<ul>
 <li>The ETL can do an incremental run or recreate the whole database each time.</li>
</ul>
</li>
 <li>ETL_COMPILE_RESERVED_LICENSES (true/false)
<ul>
 <li>Show reserved licenses like they are used licenses, even if no one is using the reserved license.</li>
</ul>
</li>
 <li>ETL_SHOW_ONLY_TRUE_DENIALS (true/false)
<ul>
 <li>Filter out any false denials or choose to show them</li>
</ul>
</li>
 <li>ETL_EXPORT_DENIALS_INTERVAL (Whole Number)
<ul>
 <li>Aggregate close denials into a single denial event. The number represents the period you wish to aggregate denials by (0 means no aggregation of denials).</li>
</ul>
</li>
 <li>ETL_ANONYMIZE (true/false)
<ul>
 <li>Allows for personal information like usernames and group names to be anonymized in case high-security measures are required.</li>
</ul>
</li>
 <li>ETL_FILTER_BY_VENDOR (text list separated by “,”)
<ul>
 <li>Filter only the vendors you are interested in (empty means selecting all vendors.)</li>
</ul>
</li>
 <li>ETL_EXPORT_RAW_START_DATE='2010-01-01 00:00:00'
<ul>
 <li>Selects data starting from a chosen date.</li>
</ul>
</li>
</ol>
</li>
</ul>
<img class="wp-image-36317" src="https://www.openlm.com/wp-content/uploads/2021/02/word-image-134.png" />
