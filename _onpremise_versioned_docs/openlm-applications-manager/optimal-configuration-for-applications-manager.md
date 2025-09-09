---
title: "Optimal Configuration for Applications Manager"
date: "2023-11-04T23:06:19"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/optimal-configuration-for-applications-manager/"
posttype: "manual_documentation"
id: "6615"
---

The following document describes the optimal hardware configuration required for running the OpenLM Applications Manager on your server.

Our recommendations are as follows:
<ul>
 <li>VM network controller should be available for each network card</li>
 <li>For compilers that perform multiple checkout/checkin operations per second, we recommend a hardware specification that is 25%-50% higher than the ones specified in the table at the end of this document.</li>
</ul>
<p style="padding-left: 30px;">For example:</p>
<img class="alignnone size-full wp-image-18305" src="https://www.openlm.com/wp-content/uploads/2019/06/table1.png" alt="" width="700" height="323" />
<ul>
 <li>VM Administrators should make sure that the hosting server is capable of accommodating the required resources.</li>
 <li>When seeing low performance in DB queries, please check disk queue.</li>
 <li>We strongly recommend placing the DB in the same Data Center as the OpenLM SLM.</li>
 <li>See recommendations for MS SQL Server below.</li>
 <li>For MySQL we provide a sample configuration file for Windows (my.ini) & Linux (my.cnf) that should be revised by your DBA.</li>
</ul>
 
<h2>Best practices for using MySQL</h2>
<ol>
 <li>Use the latest 5.7/8 MySQL release.</li>
 <li>In order to fully utilize the system’s resources, MySQL requires its configuration file (my.cnf/my.ini) to be set with the correct values. Otherwise MySQL will not take advantage of the hosting machine’s resources. We recommend some settings – please see our suggestions for configuration files archived in a .zip format according to your system size:
<a href="https://www.openlm.com/wp-content/uploads/2018/10/my_4GB_2Cores_Windows.zip"><span style="font-weight: 400;">4GB_2Cores_Windows </span></a>
<a href="https://www.openlm.com/wp-content/uploads/2018/10/my_8GB_4Cores_Windows.zip"><span style="font-weight: 400;">8GB_4Cores_Windows</span></a>
<a href="https://www.openlm.com/wp-content/uploads/2018/10/My_16GB_8Cores_Linux.zip"><span style="font-weight: 400;">16GB_8Cores_Linux</span></a>
<a href="https://www.openlm.com/wp-content/uploads/2018/10/my_16GB_8Cores_Windows.zip"><span style="font-weight: 400;">16GB_8Cores_Windows</span></a>
<a href="https://www.openlm.com/wp-content/uploads/2018/10/my_24GB_8Cores_Windows.zip"><span style="font-weight: 400;">24GB_8Cores_Windows</span></a></li>
</ol>
 
<h2>Best practices for using MS SQL Server</h2>
1. Customers need to apply a maintenance plan consisting of:
<ol style="list-style-type: lower-alpha;">
 <li>Periodic Statistics Update</li>
 <li>Periodic Rebuild or Reorganization of IndexesDBAs need to apply company maintenance policy also for OpenLM DB. In the case where one does not exist, a public package can be applied.</li>
</ol>
2. Recommended memory allocation for MSSQL Server running (almost) exclusively on a Windows machine should not exceed 80% of total machine memory.

3. OpenLM database should have is_read_committed_snapshot_on parameter set.

To check if it is set:
<pre><strong><span style="font-family: 'courier new', courier, monospace;">SELECT is_read_committed_snapshot_on FROM sys.databases </span></strong><strong><span style="font-family: 'courier new', courier, monospace;">WHERE name= ‘YourDatabase’ </span></strong></pre>
To set:
<pre><strong><span style="font-family: 'courier new', courier, monospace;">DECLARE @sqlCommand varchar(1000)</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">DECLARE @db_name varchar(50)</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">SET @db_name = ‘YourDatabase’</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">SET @sqlCommand = ‘ALTER DATABASE ‘ + @db_name + ‘ SET ALLOW_SNAPSHOT_ISOLATION ON ‘</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">EXEC (@sqlCommand)</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">SET @sqlCommand = ‘ALTER DATABASE ‘ + @db_name + ‘ SET SINGLE_USER WITH ROLLBACK IMMEDIATE ‘</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">EXEC (@sqlCommand)</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">SET @sqlCommand = ‘ALTER DATABASE ‘ + @db_name + ‘ SET READ_COMMITTED_SNAPSHOT ON ‘</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">EXEC (@sqlCommand)</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">SET @sqlCommand = ‘ALTER DATABASE ‘ + @db_name + ‘ SET MULTI_USER ‘</span></strong>
<strong><span style="font-family: 'courier new', courier, monospace;">EXEC (@sqlCommand)
</span></strong></pre>
 

4. For better performance we recommend installing tempdb, databases and log files on separate logical (and in some cases – even physical) disks. A solid installation would have:
<ol style="list-style-type: lower-alpha;">
 <li>1- disk for tempdb Data (ssd configuration is recommended)</li>
 <li>1- disk for system DBs (msdb, model, master)</li>
 <li>1- disk for all logs (including tempdb logs)</li>
 <li>1- disk for all DBs Data</li>
</ol>
5. tempdb has a critical role, having all parameters, temporary tables and executing sorts and aggregations. Number of tempdb data files is recommended to be the same as number of processors – up to 8 (more will have no effect or a negative effect on performance).

6. Autogrowth units of database files is set by default to a percentage, which is dangerous. A good practice would be to use MB units, based on a predicted growth multiplied by record size. In any case, setting alerts on disk size is recommended.

7. It is recommended to set the log size upfront.

8. A regular backup program is recommended in order to be able to resume after crashes and to control the growth of log files. Shrinking a database is bad practice and is not recommended.

 
<div>
<table style="width: 568.4pt; border: 1pt solid #000000; border-collapse: collapse;" cellspacing="0" cellpadding="0">
<tbody>
<tr style="height: 22pt;">
<td style="border-right-style: solid; border-right-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Agent</span></p>
</td>
<td style="border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;" colspan="6">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">App Manager Server</span></p>
</td>
<td style="border-left-style: solid; border-left-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;" colspan="4">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Database Server</span></p>
</td>
</tr>
<tr>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Number of Agents</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">DB type</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Applications</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">CPU</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Memory</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Network </span></p>
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Card</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Disk</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">CPU</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Memory</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Network </span></p>
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Card</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-left-style: solid; border-left-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; text-align: center; font-size: 10pt;"><span style="font-family: Arial; font-weight: bold; color: #666666; background-color: #ffffff;">Disk</span></p>
</td>
</tr>
<tr>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">3000</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">Internal</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">10</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">4 Cores</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">4GB</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">1Gbit</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">Fast HD</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">-</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">-</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">-</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-left-style: solid; border-left-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">-</span></p>
</td>
</tr>
<tr>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">10000</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">External</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">75</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">8 Cores</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">12GB</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">10Gbit</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">Fast HD</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">8 Cores</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">16GB</span></p>
</td>
<td style="border-style: solid; border-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">10Gbit</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-left-style: solid; border-left-width: 1pt; border-bottom-style: solid; border-bottom-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">Fast HD</span></p>
</td>
</tr>
<tr>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">15000</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">External</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">75</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">8 Cores</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">16GB</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">10Gbit</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">Fast HD</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">8 Cores</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">16GB</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-right-style: solid; border-right-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">10Gbit</span></p>
</td>
<td style="border-top-style: solid; border-top-width: 1pt; border-left-style: solid; border-left-width: 1pt; padding: 4.5pt; vertical-align: top;">
<p style="margin-top: 0pt; margin-bottom: 0pt; font-size: 10pt;"><span style="font-family: Arial; color: #666666; background-color: #ffffff;">Fast HD</span></p>
</td>
</tr>
</tbody>
</table>
<p style="margin-top: 0pt; margin-bottom: 0pt; line-height: 115%; font-size: 11pt;"></p>

</div>
 
