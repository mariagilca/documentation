---
title: OpenLM Applications Manager Database Configuration Tool
sidebar_position: 7
description: Guide to using the OpenLM Applications Manager Database Configuration Tool.
---


The **OpenLM Applications Manager Database Configuration** tool helps administrators replace the default **Hyper SQL Database (HSQLDB)** with either a **SQL Server** or a **MySQL** database. This feature requires an Applications Manager license that supports external databases. 

***

## Launching the tool

You can launch the tool on **Windows** either from the Start Menu (`Start → OpenLM → OpenLM Applications Manager DB Configuration`) or by running the `database_configuration.bat` file in the installation folder. On **Linux**, open the installation folder and run `sudo ./app_manager.sh dbconfig`.

***

## Configuring HSQLDB

HSQLDB is the default database. You can configure it by:

1.  Editing the **Connection Pool Size**, **DB File Location**, **User**, and **Password**.
2.  Clicking **Apply** and restarting the **OpenLM App Manager** service.

***

## Configuring MySQL

To configure the Applications Manager for MySQL:

1.  Select **MySQL** from the **DB Provider** dropdown.
2.  Fill in the **Connection Pool Size**, **Server**, **Port**, **DB Name**, **User ID**, and **Password**.
3.  Click **Apply** and restart the service.

***

## Configuring SQL Server

### Using SQL Server Authentication

1.  Select **SQL Server (SQL Server Authentication)** from the dropdown.
2.  Enter the **Connection Pool Size**, **Server**, **User ID**, **Password**, and **DB Name**.
3.  Click **Apply** and restart the service.

### Using Windows Authentication

This method requires the OpenLM service to have **"Local System Account"** permissions and for the MS-SQL server to grant access to that user.

1.  Select **SQL Server (Windows Authentication)**.
2.  Enter the **Connection Pool Size**, **Server Name**, and **DB Name**.
3.  Click **Apply** and restart the service.