---
title: "OpenLM Applications Manager Database Configuration Tool"
sidebar_position: 7
---
The OpenLM Applications Manager Database Configuration tool has been created to help administrators configure and replace the default Hyper SQL Database (HSQLDB) used by the Applications Manager with either a SQL Server or a MySQL database.

The Applications Manager DB Configuration tool requires that your Applications Manager license include support for external databases. If in doubt, please contact [sales](https://www.openlm.com/contact-sales/) or [support](https://www.openlm.com/contact-tech-support/) for assistance.

Additionally, if you're running the Applications Manager in conjunction with hundreds of OpenLM Workstation Agent installations, make sure to read the [Optimal Configuration for Applications Manager](./optimal-configuration-for-applications-manager.md) guide.

## Launching the Database Configuration Tool

### On Windows

The Applications Manager DB Configuration tool can be started from

1. The Windows Start Menu (*Start → OpenLM → OpenLM Applications Manager DB Configuration*)  
   ![](/img/legacy/word-image.png)
2. By executing the **database\_configuration.bat** file located in the OpenLM Applications Manager folder (typically **C:Program FilesOpenLMOpenLM App Manager**)

### On Linux

1. Open the folder where you have extracted and installed the OpenLM Applications Manager files.

2. Run the app\_manager.sh script with dbconfig as a parameter:

```
sudo ./app_manager.sh dbconfig
```

## Configuring HSQLDB

This is the default database that is provided with OpenLM Applications Manager. If you haven't changed your DB type, it will be selected by default from the DB Provider dropdown menu.  
![Applications Manager Database Configuration tool using HSQLDB](/img/legacy/word-image-1.png)

1. Edit the required settings as follows:

**Connection Pool Size** - this is the number of parallel connections that can be made to the database at one given moment (default: *50*)

**DB File Location** - the location of the HSQLDB database folder (default: the **db/** folder which is located in the same folder as the Applications Manager)

**User** - the database username used for connecting to the database (default: *sa*)

**Password** - the database password associated with the username used to connect to the database

2. Click Apply to save the settings and close the DB Configuration tool.

4. Restart the Applications Manager service:

*On Windows*: Open Windows Services (press *Windows + R*, type in **services.msc** and press Enter) and restart the "OpenLM App Manager" service.

*On Linux*: Run the following command

```
sudo ./app_manager.sh restart
```

or

```
sudo ./app_manager.sh stop
```

then

```
sudo ./app_manager.sh start
```

## Configuring MySQL

To configure the Applications Manager to interface with a MySQL database:

1. Select "**MySQL**" from the DB Provider dropdown menu.

![Applications Manager Database Configuration tool using MySQL](/img/legacy/word-image-2.png)

2. Edit the required settings as follows:

**Connection Pool Size** - number of parallel connections that can be made to the database at one given moment (default: *50*)

**Server** - the MySQL server name

**Port** - the MySQL server access port

**DB Name** - the name of the DB you would like to access

**User ID** - the User ID used to connect to the database

**Password** - the database password associated with the User ID used to connect to the database

3. Click **Apply** to save the settings and close the DB Configuration tool.

4. Restart the Applications Manager service:

*On Windows*: Open Windows Services (press *Windows + R*, type in **services.msc** and press Enter) and restart the "OpenLM App Manager" service.

*On Linux*: Run the following command

```
sudo ./app_manager.sh restart
```

or

```
sudo ./app_manager.sh stop
```

then

```
sudo ./app_manager.sh start
```

## Configuring SQL Server

To configure the Applications Manager to interface with a MS-SQL database:

### Using SQL Server Authentication

1. Select **SQL Server (SQL Server Authentication)** from the DB Provider dropdown menu.

![Applications Manager Database Configuration tool using SQL Server with standard authentication](/img/legacy/word-image-3.png)

2. Edit the required settings as follows:

**Connection Pool Size** - number of parallel connections that can be made to the database at one given moment (default: *50*)

**Server** - the SQL server name

**User ID** - the User ID used to connect to the database

**Password** - the password associated with the User ID used to connect to the database

**DB Name** - the name of the DB you would like to access (can either by typed in or selected from the dropdown list once the Server, User ID and Password fields have been set)

3. Click **Apply** to save the settings and close the DB Configuration tool.

4. Open Windows Services (press *Windows + R*, type in **services.msc** and press Enter) and restart the OpenLM App Manager service.

### Using Windows Authentication

Please note that connecting to SQL Server using Windows Authentication is possible once the following prerequisites have been met:

1. The OpenLM service is set to log in with a user that has "Local System Account" permissions
2. The MS-SQL server is set to grant access to that user through Windows Authentication

Once these prerequisites have been met, the steps are as follows:

1. Select **SQL Server (Windows Authentication)** from the DB Provider dropdown menu.

2. Edit the required settings as follows:

![Using Applications Manager Database Configuration tool with SQL Server and Windows Auth](/img/legacy/word-image-4.png)

**Connection Pool Size** - number of parallel connections that can be made to the database at one given moment (default: *50*)

**Server Name** - the SQL server name

**DB Name** - the name of the DB you would like to access (can either by typed in or selected from the dropdown list once the Server field has been set)

3. Click **Apply** to save the settings and close the DB Configuration tool.

4. Restart the Applications Manager service:

*On Windows*: Open Windows Services (press *Windows + R*, type in **services.msc** and press Enter) and restart the "OpenLM App Manager" service.

*On Linux*: Run the following command

```
sudo ./app_manager.sh restart
```

or

```
sudo ./app_manager.sh stop
```

then

```
sudo ./app_manager.sh start
```
