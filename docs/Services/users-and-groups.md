---
sidebar_position: 27
---

# Users and groups

This guide provides a comprehensive overview of the **Users and Groups** feature, including configuration steps and key functionalities. Follow this guide to manage users and groups effectively in your system.

## Overview

The **Users and Groups** feature allows administrators to manage user accounts, assign roles, and organize users into groups for streamlined access control and collaboration.

## Configurations

### Adding a new user

To add a new user, follow these steps:

1. Navigate to the **Users** section in the admin panel.
2. Click the **Add User** button.
3. Fill in the required fields:
    - **Username**
    - **Email**
    - **Password**
    - **Role**
4. Click **Save** to create the user.

:::tip
Use strong passwords to enhance account security.
:::

### Creating a group

Groups allow you to organize users and assign permissions collectively. To create a group:

1. Go to the **Groups** section in the admin panel.
2. Click the **Create Group** button.
3. Enter a **Group Name** and optional **Description**.
4. Add users to the group by selecting them from the list.
5. Click **Save** to finalize the group creation.

:::info
Groups can be used to assign permissions to multiple users at once, reducing administrative overhead.
:::

### Assigning roles to users

Roles define the permissions and access levels for users. To assign a role:

1. Open the **Users** section.
2. Select the user you want to modify.
3. Choose a role from the **Role** dropdown menu.
4. Click **Update** to save changes.

:::note
Ensure that roles are configured correctly to avoid unintended access issues.
:::

## Features

### Role-based access control (RBAC)

RBAC allows you to define roles with specific permissions and assign them to users or groups. This ensures that users only have access to the resources they need.

### Group-based permissions

Groups simplify permission management by allowing you to assign permissions to a group instead of individual users.

### User activity tracking

Monitor user activity to ensure compliance and identify potential security risks. Activity logs include login attempts, changes to user accounts, and group modifications.

:::warning
Regularly review activity logs to detect unauthorized access or suspicious behavior.
:::

### Bulk user import

Import multiple users at once using a CSV file. This feature is especially useful for onboarding large teams.

1. Navigate to the **Users** section.
2. Click the **Import Users** button.
3. Upload a CSV file with the required user details.
4. Review the imported data and click **Confirm**.

:::danger
Ensure the CSV file is formatted correctly to avoid import errors.
:::

## Best practices

- Regularly review and update user roles and permissions.
- Use groups to simplify permission management.
- Enable multi-factor authentication (MFA) for all users.
- Monitor activity logs for unusual behavior.

## Troubleshooting

### Common issues

#### User cannot log in

- Verify the username and password.
- Check if the user account is active.
- Ensure the user has the correct role assigned.

#### Permissions not working as expected

- Review the user's assigned roles and group memberships.
- Check the permissions associated with the roles or groups.

:::info
Contact support if you encounter issues that cannot be resolved using this guide.
:::

