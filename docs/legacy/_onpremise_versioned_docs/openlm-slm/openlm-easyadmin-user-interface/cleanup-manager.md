---
title: Cleanup manager module
sidebar_position: 3
description: Remove unused users, groups, and history from the OpenLM database to keep it optimized.
---

# Cleanup manager module

The Cleanup Manager runs a background process that removes obsolete entities from the OpenLM database, such as users and groups who no longer use engineering licenses.

It also allows you to remove irrelevant usage data by selecting a specific time range to purge historical data.

## Starting Cleanup Manager

To open Cleanup Manager:

1. Open the **OpenLM User Interface**.
2. Go to **Start → Administration**.
3. Click the **Cleanup Manager** icon.

![Cleanup Manager navigation](img/cleanup-manager-navigation.png)

The Cleanup Manager window will display with the following options:

- **History**: Erases old usage data within a defined time range.
- **Groups**: Removes group names with no usage history.
- **Users**: Deletes users with no usage history. Users with active history will not be removed.

## Cleaning history

:::caution
Make sure to back up your database before cleaning the history to prevent accidental data loss.
:::

To clean usage history:

1. Choose a **Start date/time** and **End date/time**.
2. Click **Run**.

A confirmation pop-up will appear. Click **Yes** to proceed or **Cancel** to abort.

If you proceed, a new window will show cleanup results. You can:

- Click **Clear** to delete the result logs
- Click **Refresh** to update the display
- Click **Export** to download the cleanup results

![History cleanup interface](img/cleanup-history-interface.png)

## Cleaning groups

To clean unused groups:

1. In Cleanup Manager, select the **Groups** radio button.
2. Choose a creation source from the dropdown:

   - **[All]** – All groups
   - **LDAP Sync** – Groups from LDAP
   - **Manual** – Manually created groups
   - **Options File** – Groups from license options file

3. Click **Run**.

A confirmation window will appear. Click **Yes** to proceed.

The results will appear in the Cleanup Monitor.

To delete cleanup logs:

1. Check the groups to remove (1)
2. Click the **Clear** button (2)

![Group cleanup interface](img/group-cleanup-interface.png)

## Cleaning users

To clean unused users:

1. Select the **Users** radio button.
2. Choose a creation source:

   - **[All]** – All users
   - **License Usage** – Users detected through license checkout
   - **LDAP Sync** – Users synced from directories
   - **Manual** – Manually created users
   - **Options File** – Users from options file
   - **Agent** – Users added by OpenLM Agent
   - **Router** – Users added by OpenLM Router

3. Click **Run** to proceed with cleanup.

![User cleanup interface](img/user-cleanup-interface.png)

## Anonymizing user data

### Anonymize history for a time range

To anonymize user data for a specific period:

1. Select **Anonymize Users**.
2. Set the **Start date** and **End date**.
3. Click **Run**.

![Anonymize users by time](img/anonymize-users-by-time.png)

### GDPR anonymize specific users

To anonymize specific users to comply with GDPR:

1. Click **GDPR Anonymize User**.
2. Select the user to anonymize (1).
3. Click **Select** (2).
4. Confirm the **User ID** displayed.
5. Click **Run Anonymization**.

A confirmation pop-up will appear. Click **Yes**.

:::note
This process changes the user’s username, first name, last name, display name, phone, and email to `GDPR_XXXXXXXX`.
:::

![GDPR anonymize interface](img/gdpr-anonymize-interface.png)

After anonymization, the **User Anonymization Summary** appears.  
Review the message.

:::caution
Other OpenLM components may still contain personal data that must be deleted manually.
:::

---

