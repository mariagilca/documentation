---
title: "OpenLM Applications Manager Database Configuration Tool"
date: "2023-11-04T23:11:52"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/openlm-applications-manager-database-configuration-tool/"
posttype: "manual_documentation"
id: "6617"
---

The OpenLM Applications Manager Database Configuration tool has been created to help administrators configure and replace the default Hyper SQL Database (HSQLDB) used by the Applications Manager with either a SQL Server or a MySQL database.

The Applications Manager DB Configuration tool requires that your Applications Manager license include support for external databases. If in doubt, please contact <a href="https://www.openlm.com/contact-sales/">sales</a> or <a href="https://www.openlm.com/contact-tech-support/">support</a> for assistance.

Additionally, if you’re running the Applications Manager in conjunction with hundreds of OpenLM Workstation Agent installations, make sure to read the <a href="https://www.openlm.com/knowledge-base/optimal-configuration-applications-manager-kb803/">Optimal Configuration for Applications Manager</a> guide.

 
<h2><a id="post-18787-_6o6r4q7gk43r"></a>Launching the Database Configuration Tool</h2>
<h3><a id="post-18787-_kviyq3pt692a"></a>On Windows</h3>
The Applications Manager DB Configuration tool can be started from
<ol>
 <li>The Windows Start Menu (<em>Start → OpenLM → OpenLM Applications Manager DB Configuration</em>)
<img class="wp-image-18791" src="https://www.openlm.com/wp-content/uploads/2019/07/word-image.png" /></li>
 <li>By executing the <strong>database_configuration.bat</strong> file located in the OpenLM Applications Manager folder (typically <strong>C:Program FilesOpenLMOpenLM App Manager</strong>)</li>
</ol>
 
<h3><a id="post-18787-_70c1rmitztsq"></a>On Linux</h3>
1. Open the folder where you have extracted and installed the OpenLM Applications Manager files.

2. Run the app_manager.sh script with dbconfig as a parameter:
<pre>sudo ./app_manager.sh dbconfig</pre>
 
<h2><a id="post-18787-_dub5wwosbjvs"></a>Configuring HSQLDB</h2>
This is the default database that is provided with OpenLM Applications Manager. If you haven’t changed your DB type, it will be selected by default from the DB Provider dropdown menu.
<img class="alignnone wp-image-18792" src="https://www.openlm.com/wp-content/uploads/2019/07/word-image-1.png" alt="Applications Manager Database Configuration tool using HSQLDB" width="1002" height="452" />

1. Edit the required settings as follows:

<strong>Connection Pool Size</strong> - this is the number of parallel connections that can be made to the database at one given moment (default: <em>50</em>)

<strong>DB File Location</strong> - the location of the HSQLDB database folder (default: the <strong>db/ </strong>folder which is located in the same folder as the Applications Manager)

<strong>User</strong> - the database username used for connecting to the database (default: <em>sa</em>)

<strong>Password</strong> - the database password associated with the username used to connect to the database

2. Click Apply to save the settings and close the DB Configuration tool.

4. Restart the Applications Manager service:

<em>On Windows</em>: Open Windows Services (press <em>Windows + R</em>, type in <strong>services.msc</strong> and press Enter) and restart the “OpenLM App Manager” service.

<em>On Linux</em>: Run the following command
<pre>sudo ./app_manager.sh restart</pre>
or
<pre>sudo ./app_manager.sh stop</pre>
then
<pre>sudo ./app_manager.sh start</pre>
 
<h2><a id="post-18787-_ep27pucqjgm8"></a>Configuring MySQL</h2>
To configure the Applications Manager to interface with a MySQL database:

1. Select “<strong>MySQL</strong>” from the DB Provider dropdown menu.

<img class="alignnone wp-image-18793" src="https://www.openlm.com/wp-content/uploads/2019/07/word-image-2.png" alt="Applications Manager Database Configuration tool using MySQL" width="1002" height="452" />

2. Edit the required settings as follows:

<strong>Connection Pool Size</strong> - number of parallel connections that can be made to the database at one given moment (default: <em>50</em>)

<strong>Server</strong> - the MySQL server name

<strong>Port</strong> - the MySQL server access port

<strong>DB Name</strong> - the name of the DB you would like to access

<strong>User ID</strong> - the User ID used to connect to the database

<strong>Password</strong> - the database password associated with the User ID used to connect to the database

3. Click <strong>Apply</strong> to save the settings and close the DB Configuration tool.

4. Restart the Applications Manager service:

<em>On Windows</em>: Open Windows Services (press <em>Windows + R</em>, type in <strong>services.msc</strong> and press Enter) and restart the “OpenLM App Manager” service.

<em>On Linux</em>: Run the following command
<pre>sudo ./app_manager.sh restart</pre>
or
<pre>sudo ./app_manager.sh stop</pre>
then
<pre>sudo ./app_manager.sh start</pre>
 
<h2><a id="post-18787-_6wjl054udkse"></a>Configuring SQL Server</h2>
To configure the Applications Manager to interface with a MS-SQL database:
<h3><a id="post-18787-_md73hcdjwbd3"></a>Using SQL Server Authentication</h3>
1. Select <strong>SQL Server (SQL Server Authentication)</strong> from the DB Provider dropdown menu.

<img class="alignnone wp-image-18794" src="https://www.openlm.com/wp-content/uploads/2019/07/word-image-3.png" alt="Applications Manager Database Configuration tool using SQL Server with standard authentication" width="1002" height="452" />

2. Edit the required settings as follows:

<strong>Connection Pool Size</strong> - number of parallel connections that can be made to the database at one given moment (default: <em>50</em>)

<strong>Server</strong> - the SQL server name

<strong>User ID</strong> - the User ID used to connect to the database

<strong>Password</strong> - the password associated with the User ID used to connect to the database

<strong>DB Name</strong> - the name of the DB you would like to access (can either by typed in or selected from the dropdown list once the Server, User ID and Password fields have been set)

3. Click <strong>Apply</strong> to save the settings and close the DB Configuration tool.

4. Open Windows Services (press <em>Windows + R</em>, type in <strong>services.msc</strong> and press Enter) and restart the OpenLM App Manager service.

 
<h3><a id="post-18787-_vbcv4utcpwle"></a>Using Windows Authentication</h3>
Please note that connecting to SQL Server using Windows Authentication is possible once the following prerequisites have been met:
<ol>
 <li>The OpenLM service is set to log in with a user that has “Local System Account” permissions</li>
 <li>The MS-SQL server is set to grant access to that user through Windows Authentication</li>
</ol>
Once these prerequisites have been met, the steps are as follows:

1. Select <strong>SQL Server (Windows Authentication)</strong> from the DB Provider dropdown menu.

2. Edit the required settings as follows:

<img class="alignnone wp-image-18795" src="https://www.openlm.com/wp-content/uploads/2019/07/word-image-4.png" alt="Using Applications Manager Database Configuration tool with SQL Server and Windows Auth" width="1002" height="452" />

<strong>Connection Pool Size</strong> - number of parallel connections that can be made to the database at one given moment (default: <em>50</em>)

<strong>Server Name</strong> - the SQL server name

<strong>DB Name</strong> - the name of the DB you would like to access (can either by typed in or selected from the dropdown list once the Server field has been set)

3. Click <strong>Apply</strong> to save the settings and close the DB Configuration tool.

4. Restart the Applications Manager service:

<em>On Windows</em>: Open Windows Services (press <em>Windows + R</em>, type in <strong>services.msc</strong> and press Enter) and restart the “OpenLM App Manager” service.

<em>On Linux</em>: Run the following command
<pre>sudo ./app_manager.sh restart</pre>
or
<pre>sudo ./app_manager.sh stop</pre>
then
<pre>sudo ./app_manager.sh start</pre>
