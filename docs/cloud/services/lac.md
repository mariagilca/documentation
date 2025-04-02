---
sidebar_position: 14
---

# License Access Control (LAC)

License Access Control (LAC) is a feature that allows administrators to manage and restrict access to licenses within your organization. This guide provides detailed instructions on configuring and using LAC, along with an overview of its features.

## Features of License Access Control

- **Granular access control**: Assign licenses to specific users or groups.
- **Audit logging**: Track license usage and access history.
- **Customizable policies**: Define rules for license allocation and usage.
- **Integration support**: Seamlessly integrate with existing authentication systems.

## Configuring License Access Control

Follow these steps to configure LAC for your organization.

### Step 1: Enable License Access Control

1. Navigate to the **Admin Settings** page.
2. Locate the **License Access Control** section.
3. Toggle the switch to enable LAC.

:::note
Enabling LAC will apply access restrictions to all licenses in your system.
:::

### Step 2: Define Access Policies

1. Go to the **Access Policies** tab under the LAC settings.
2. Click **Create Policy**.
3. Specify the following details:
    - **Policy Name**: A unique name for the policy.
    - **Assigned Users/Groups**: Select users or groups to include.
    - **License Scope**: Define which licenses the policy applies to.
4. Save the policy.

:::tip
Use descriptive names for policies to make them easier to manage.
:::

### Step 3: Assign Licenses

1. Navigate to the **Licenses** section.
2. Select a license and click **Assign**.
3. Choose the policy to associate with the license.
4. Confirm the assignment.

:::info
You can assign multiple licenses to a single policy.
:::

## Managing License Access

### Viewing Audit Logs

1. Go to the **Audit Logs** section under LAC.
2. Filter logs by user, group, or license.
3. Export logs for further analysis if needed.

:::warning
Audit logs are retained for 90 days by default. Ensure you export logs regularly if you need long-term records.
:::

### Editing Policies

1. Open the **Access Policies** tab.
2. Select the policy you want to edit.
3. Make the necessary changes and save.

:::danger
Editing a policy may immediately impact users' access to licenses. Notify affected users before making changes.
:::

## Best Practices for Using LAC

- Regularly review and update access policies to ensure compliance.
- Use audit logs to monitor license usage and detect anomalies.
- Limit access to sensitive licenses to only those who need it.

## Troubleshooting

### Common Issues

#### Users cannot access licenses

- Verify that the user is included in an active access policy.
- Check if the license has been assigned to the correct policy.

#### Audit logs are missing

- Ensure that LAC is enabled and functioning correctly.
- Confirm that logs have not exceeded the 90-day retention period.

:::info
For additional support, contact your system administrator or refer to the Support Documentation.
:::

## Conclusion

License Access Control provides a robust framework for managing license access within your organization. By following this guide, you can configure and maintain LAC effectively, ensuring secure and efficient license usage.
```