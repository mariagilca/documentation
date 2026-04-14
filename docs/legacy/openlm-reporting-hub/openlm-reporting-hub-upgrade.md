---
title: "OpenLM Reporting Hub upgrade"
sidebar_position: 5
---
## Notes:

- While upgrading the ETL version make sure to rename or remove the old folder.
- The installation should be done in an empty folder. When overwriting an existing folder it could keep some files that were deleted in the later releases and this may lead to broken functionalities.
- Keep the existing kettle.properties file before upgrading the ETL.
- For newer releases, we may add new parameters to the kettle.properties file.
- If you replace a new empty configuration with an existing one it also may break the functionality if a new file has a different set of parameters.

### How to upgrade Reporting Hub

1. Go to the current installation path of the Reporting Hub and copy a **backup of the license** file found in "C:...ETLJobsLicense".

![Screenshot: How to upgrade Reporting Hub](/img/legacy/word-image-118.png)

2. Copy a **backup of the kettle file** found in "C:...ETLJobsLicense", it holds database connection details and ETL preferences.

![Screenshot 2: How to upgrade Reporting Hub](/img/legacy/word-image-119.png)

3**. Download** the latest version of RH from [https://www.openlm.com/download/ReportingHub/Latest](https://www.openlm.com/download/ReportingHub/Latest)

![Screenshot 3: How to upgrade Reporting Hub](/img/legacy/word-image-120.png)

4**. Unzip and replace** the current ETL folder with the downloaded one.

![Screenshot 4: How to upgrade Reporting Hub](/img/legacy/word-image-121.png)

![Screenshot 5: How to upgrade Reporting Hub](/img/legacy/word-image-122.png)

5. **Paste the license file** you saved back to the folder "C:...ETLJobsLicense".

![Screenshot 6: How to upgrade Reporting Hub](/img/legacy/word-image-123.png)

6. From the original **kettle.properties** file, copy the following:

a. Source Database (Note: FireBird entry has been removed as it is no longer supported).

![Screenshot 7: How to upgrade Reporting Hub](/img/legacy/word-image-124.png)

b. Cross-check the Reporting database entries.

![Screenshot 8: How to upgrade Reporting Hub](/img/legacy/word-image-125.png)

c. Destination database if using it (MSSQL or MySQL)

![Screenshot 9: How to upgrade Reporting Hub](/img/legacy/word-image-126.png)

d. Fill in the SMTP server details from the original Kettle.properties file.

![Screenshot 10: How to upgrade Reporting Hub](/img/legacy/word-image-127.png)

e. Fill in the entries of License params.

![Screenshot 11: How to upgrade Reporting Hub](/img/legacy/word-image-128.png)

f. Fill in the correct ETL flagging\*\*:

![Screenshot 12: How to upgrade Reporting Hub](/img/legacy/word-image-129.png)

7. Applicable only if using MySQL or MS SQL Server as the destination database: **Delete all the tables** in the destination Reporting Hub MySQL / MSSQL database, the schema will be recreated

![Screenshot 13: How to upgrade Reporting Hub](/img/legacy/word-image-130.png)

8. **Set the variable** "ETL\_RUN\_ON\_INCREMENTS" to be "**false**" and save the kettle file.

![Screenshot 14: How to upgrade Reporting Hub](/img/legacy/word-image-131.png)

9. **Run the ETL** using the "**Run\_ETL.bat**" file, which will delete the old DB schema and recreate it.

![Screenshot 15: How to upgrade Reporting Hub](/img/legacy/word-image-132.png)

10. Once the run is finished, **set the variable** "ETL\_RUN\_ON\_INCREMENTS" to be "**true**" and save the kettle file.

![Screenshot 16: How to upgrade Reporting Hub](/img/legacy/word-image-133.png)

\*\*

## Kettle file ETL flagging map:

- 1. ETL\_DATA\_AGGREGATION\_BY\_HOUR (true/false)
     - Choose if the data will get aggregated to a daily or an hourly resolution.
  2. ETL\_RUN\_ON\_INCREMENTS (true/false)
     - The ETL can do an incremental run or recreate the whole database each time.
  3. ETL\_COMPILE\_RESERVED\_LICENSES (true/false)
     - Show reserved licenses like they are used licenses, even if no one is using the reserved license.
  4. ETL\_SHOW\_ONLY\_TRUE\_DENIALS (true/false)
     - Filter out any false denials or choose to show them
  5. ETL\_EXPORT\_DENIALS\_INTERVAL (Whole Number)
     - Aggregate close denials into a single denial event. The number represents the period you wish to aggregate denials by (0 means no aggregation of denials).
  6. ETL\_ANONYMIZE (true/false)
     - Allows for personal information like usernames and group names to be anonymized in case high-security measures are required.
  7. ETL\_FILTER\_BY\_VENDOR (text list separated by ",")
     - Filter only the vendors you are interested in (empty means selecting all vendors.)
  8. ETL\_EXPORT\_RAW\_START\_DATE='2010-01-01 00:00:00′
     - Selects data starting from a chosen date.

![Screenshot: Kettle file ETL flagging map:](/img/legacy/word-image-134.png)
