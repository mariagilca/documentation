---
sidebar_position: 27
---

# Users and Groups

## Overview

The **Users and Groups** feature lets you manage users, groups, email aliases, user aliases, and workstations. You can view, create, and edit all these entries directly from this section.

## Prerequisites

- Users and Groups is automatically activated as a core system component for all accounts.

## Users

The **Users** panel provides an overview of all users added to OpenLM from various sources (manual input, license usage, options file, agent, or LDAP).

### Manage users

You can:

- Import users from a `.csv` file.
- Export the current user list to `.csv` or `.pdf`.
- Refresh the user list.
- Enable filtering and use the search bar.
- Show or hide specific columns, restore default views, and print the current page by selecting the **More (three dots)** icon next to the columns.

> **Tip:** When importing users, first export and download the current user list as a `.csv` file, modify it, and then upload it again. Maintain the `.csv` file structure to avoid errors.

### Add a new user

To add a new user:

1. Select **Add User**.
2. In the **General** panel, enter user details. The only mandatory field is **Username**. Optional fields include:
   - Title (select from predefined titles or create a custom one)
   - First Name
   - Last Name
   - Email
   - Display Name
   - Phone
   - Mobile Phone
   - Country (required for Compliance Service)
   - Description
   - Department
   - Office
   - Source (automatically set to **ManualEditing** for manually created users)
3. By default, the **Enable/Disable User** toggle is set to enabled. Deselect this if the user should be initially disabled.

### Manage user groups

In the **Groups** panel, manage a user's group memberships:

- Select **Add To Group** to assign the user to existing groups.
- Select **Remove** to detach the user from a group.
- Use **Set as default** to assign a default group for reporting purposes.
- Select **Show Disabled** to display disabled groups.
- Use the search bar to refine your search.

### Manage email aliases

Use **Email Aliases** to link additional email addresses to a user:

- Select **Add Alias** to attach an existing alias or enter a new one.
- Select **Detach** to remove an attached alias from the user.

### Manage user aliases

Use **User Aliases** to link multiple user identities to a single primary user:

- Select **Attach Alias** to attach existing user identities as aliases under a primary user.
- Select **Detach** to remove a user alias.

### Edit user details

To edit existing users:

- Select the **Edit (pencil)** icon beside a user's name. Edit user details as described in **Add a new user**.

