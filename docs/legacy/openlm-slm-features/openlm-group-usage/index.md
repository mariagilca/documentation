---
title: "How to manually import users into OpenLM (HT900)"
sidebar_position: 1
---

This document explains how to manually import users from an external data source into the OpenLM database. An external data source can be a directory service (for example, Active Directory), an accounting system, or any database that contains user information.

## Prepare a CSV in the OpenLM user table format

The easiest way to get a sample CSV is to export your current users from OpenLM:

1. Open the OpenLM EasyAdmin User Interface.
2. Click **Start** and go to **Users & Groups**.
3. Open **Users**.
4. Click **Export**.
5. Download the CSV file.

The CSV must use the OpenLM user table format below.

| Column name | Required | Notes |
| --- | --- | --- |
| Username | Yes | Must be unique. Single value. |
| First Name | No | Single value. |
| Last Name | No | Single value. |
| Department | No | Single value. |
| Display Name | No | Single value. |
| Title | No | Single value. |
| Phone | No | Single value. |
| Office | No | Single value. |
| Description | No | Single value. |
| Email | No | Single value. |
| Enabled | Yes | TRUE or FALSE. |
| Groups | No | Use the pipe character `|` to separate multiple groups. |
| Default Group | No | Single value. |
| Projects | No | Use the pipe character `|` to separate multiple projects. |
| Default Project | No | Single value. |

![OpenLM user table format reference](/img/legacy/ht900-p02-01.png)

Note: Any groups or projects referenced in the CSV must already exist in the OpenLM database or the import will fail.

## Import the CSV into OpenLM

1. Open the OpenLM EasyAdmin User Interface.
2. Click **Start** and go to **Users & Groups**.
3. Open **Users**.
4. Click **Import**.
5. Browse to the CSV file and click **Open**.
6. Review the success or failure dialog.

![OpenLM import dialog example](/img/legacy/ht900-p04-01.png)

## Importing users from Active Directory

OpenLM supports full synchronization with Active Directory via Directory Sync components, but you can also import specific users manually by using a CSV file. The process includes exporting users from Active Directory, editing the CSV to match the OpenLM format, and importing it.

### Export users from Active Directory

1. Open **Active Directory Users and Computers**.

![Active Directory Users and Computers tool](/img/legacy/ht900-p05-01.png)

2. In the left panel, expand your domain and select the **Users** folder.
3. Click the **Filter** icon.

![Filter icon location in Active Directory Users and Computers](/img/legacy/ht900-p06-01.png)

4. Select **Show only the following types of objects**, check **Users**, and click **OK**.

![Filter Options window with Users selected](/img/legacy/ht900-p07-01.png)

5. On the menu, click **View** and choose **Add/Remove Columns**.

![Add/Remove Columns dialog](/img/legacy/ht900-p08-01.png)

6. Add the following columns in this order, then click **OK**: `User Logon Name`, `First Name`, `Last Name`, `Department`, `Name`, `Job Title`, `Business Phone`, `Office`, `Description`, `E-mail Address`.
7. Click the **Export** icon.

![Export icon in Active Directory Users and Computers](/img/legacy/ht900-p09-02.png)

8. Choose a save location.
9. For **Save as type**, select **Unicode Text (Comma Delimited) (*.csv)**.

![Save as type dropdown for Unicode Text CSV](/img/legacy/ht900-p09-01.png)

10. Optional: To export only selected users, check **Save Only Selected Rows**.
11. Click **Save**.

### Edit the CSV to match the OpenLM format

1. Open the exported CSV in a spreadsheet application.

![Example CSV in a spreadsheet](/img/legacy/ht900-p10-01.png)

2. Rename these column headers:

| Original header | New header |
| --- | --- |
| User Logon Name | Username |
| Name | Display Name |
| Job Title | Title |
| Business Phone | Phone |
| E-mail Address | Email |

3. Add these column headers at the end of the file in this order: `Enabled`, `Groups`, `Default Group`, `Projects`, `Default Project`.
4. Set the `Enabled` value to TRUE for enabled users and FALSE for disabled users.
5. Save the file as CSV.

### Import the edited CSV into OpenLM

1. Open the OpenLM EasyAdmin User Interface.
2. Click **Start** and go to **Users & Groups**.

![EasyAdmin navigation to Users](/img/legacy/ht900-p11-01.png)

3. Open **Users**.
4. Click **Import** and browse to the edited CSV file.
5. Confirm the success dialog.
