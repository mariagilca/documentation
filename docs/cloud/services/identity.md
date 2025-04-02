---
sidebar_position: 14
---

# Identity Service

## Overview

The **Identity Service** allows you to manage users, single sign-on (SSO) via external providers, and authorization files for OpenLM components. Navigate between these options using the side menu in the Identity Service UI.

Identity Service is automatically activated for your account as it is a core system product.

## User management

In the **Users** panel, account administrators can add new users and edit or delete existing users. The user who creates the cloud account automatically receives the Account Administrator role.

### Add a new user

To add a new user:

1. In the **Users** panel, select **Add User**.
2. In the **General** window:
   - Enter the user's email address. The user will receive their login details and a link to the cloud portal at this email address.
   - The **Status** toggle is active by default. To create an inactive user, deselect this toggle.
   - **First Name** and **Last Name** fields are optional and can be updated later by users or account administrators.
   - Set a temporary password. If required, select **User must change password at next login**.
   - Enable the **Account Administrator** toggle if the user needs permission to manage other users.
3. In the **Products and Roles** window, set the user's access level (**Admin** or **Viewer**) for each activated product.
4. Select **Save** to confirm your settings.

### Delete a user

To delete one or more users:

1. Select the user(s) you want to delete.
2. Select **Delete**.
3. Confirm your action when prompted. To temporarily disable confirmation prompts, select **Don’t ask for next 5 minutes**.

### Edit a user

To edit user details:

- Hover over the user’s row and select the **Edit (pencil)** icon.

## External providers (SSO)

In the **External Providers** panel, configure SSO using external providers such as Okta, ADFS, Azure, or OIDC.

To add an SSO provider:

1. Select **Add Provider**.
2. Configure the chosen provider using the instructions provided.

To delete an existing SSO configuration:

1. Select the provider you want to delete.
2. Select **Delete** and confirm the action when prompted.

> **Note:** To log in via SSO, access the system using the link generated as **Login URL** along with your account ID.

## Authorization

In the **Authorization** panel, generate authorization files for OpenLM components to authenticate with the Identity Service. Components without valid authorization files are rejected.

To generate a new authorization file:

1. Select **Add Client**.
2. Select the client type, add a description (optional), then select **Save**.
3. Copy and paste the provided client ID and secret, or download the entire file as `.json`.

To delete an existing authorization file:

1. Select the authorization entry.
2. Select **Delete** and confirm the action when prompted.
3. After deletion, components using this authorization will lose access to the system.

### Reset client secret

To reset a client secret:

1. Select **Reset Secret** on the desired authorization entry.
2. Confirm the action in the confirmation window.
3. Copy the new secret or download the new authorization file. After resetting, the previous secret becomes invalid, and components using it will no longer connect to the system.

