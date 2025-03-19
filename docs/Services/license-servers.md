---
sidebar_position: 15
---

# License servers

This guide provides a comprehensive overview of the License Server, including its configuration and features. Follow the instructions below to set up and manage your License Server effectively.

## Overview

The License Server is a critical component for managing software licenses across your organization. It ensures compliance, tracks usage, and provides centralized control over license distribution.

## Features

- Centralized license management
- Real-time usage tracking
- Automated compliance reporting
- Scalable architecture for enterprise environments

## Configuration

### Prerequisites

Before configuring the License Server, ensure the following:

- A supported operating system is installed.
- Network connectivity is available.
- Administrative privileges are granted.

:::info
Refer to the System requirements for detailed compatibility information.
:::

### Installation

1. Download the License Server installer from the official website.
2. Run the installer and follow the on-screen instructions.
3. Verify the installation by accessing the License Server dashboard.

:::tip
Use the `--silent` flag for unattended installations.
:::

### Initial setup

1. Log in to the License Server dashboard.
2. Configure the network settings under **Settings > Network**.
3. Add your license keys under **Licenses > Add License**.

:::note
Ensure that the license keys match the software versions in use.
:::

### Advanced configuration

- **High availability**: Set up a secondary License Server for failover support.
- **Custom ports**: Modify the default ports under **Settings > Ports**.
- **User roles**: Assign roles to users for granular access control.

:::warning
Changing default ports may require firewall reconfiguration.
:::

## Managing licenses

### Adding licenses

1. Navigate to **Licenses > Add License**.
2. Upload the license file or enter the license key.
3. Click **Save** to activate the license.

### Monitoring usage

- Access the **Usage Dashboard** to view real-time license consumption.
- Generate reports under **Reports > Usage Reports**.

:::danger
Exceeding license limits may result in service interruptions.
:::

### Revoking licenses

1. Go to **Licenses > Manage Licenses**.
2. Select the license to revoke.
3. Click **Revoke** and confirm the action.

## Troubleshooting

### Common issues

- **License not recognized**: Verify the license key and ensure it matches the software version.
- **Dashboard inaccessible**: Check network connectivity and firewall settings.

:::info
For additional support, contact technical support.
:::

## Conclusion

The License Server simplifies license management and ensures compliance across your organization. Follow the steps outlined in this guide to configure and manage your License Server effectively.
