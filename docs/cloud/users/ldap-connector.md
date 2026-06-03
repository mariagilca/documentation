---
sidebar_position: 32
title: LDAP connector
description: "The LDAP Connector forwards directory update data from the OpenLM Directory Synchronization Service (DSS) to external AWS infrastructure — specifically Amazon…"
---
The LDAP Connector forwards directory update data from the OpenLM Directory Synchronization Service (DSS) to external AWS infrastructure — specifically Amazon S3 buckets and Amazon SQS queues (FIFO only).

When DSS detects changes to users and groups in your LDAP or Active Directory, the LDAP Connector automatically sends that data to your configured AWS destinations.

:::info
The LDAP Connector is a **cloud-only** solution. It is not available for on-premise installations.
:::

## Prerequisites

- An active OpenLM Platform account with the LDAP Connector product activated.
- [Directory Synchronization Service (DSS)](directory-sync) configured with at least one sync definition.
- A pre-configured **Amazon S3** bucket in your AWS account.
- A pre-configured **Amazon SQS** queue (FIFO type) in your AWS account.
- AWS credentials (**Access Key** and **Secret Access Key**) with permissions to write to the S3 bucket and SQS queue. Use a **service account** for machine-to-machine authorization rather than personal credentials.

## Activate the LDAP Connector

The LDAP Connector is available as a separate product in the **Products** UI.

1. Navigate to **Products** in the OpenLM Platform.
2. Locate and activate the **LDAP Connector**.

Once activated, the LDAP Connector appears in the navigation menu alongside other services.

:::note
No additional configuration is required in DSS. The Directory Sync Service automatically detects when the LDAP Connector is activated and transmits sync events to the connector.
:::

## Configure destination systems

The LDAP Connector UI displays all configured destination systems. You can add Amazon S3 and Amazon SQS destinations.

### Add an Amazon S3 destination

1. Open the **LDAP Connector** from the navigation menu.
2. Select **Create New System**.
3. Select **Amazon S3** as the system type.
4. Fill in the required fields:
   - **Name**: A display name for this destination.
   - **Bucket Name**: The name of your Amazon S3 bucket.
   - **Access Key**: Your AWS access key.
   - **Secret Access Key**: Your AWS secret access key.
   - **Region**: The AWS region where your bucket is located (for example, `eu-west-1`).
5. Select **Save**.

### Add an Amazon SQS destination

1. Open the **LDAP Connector** from the navigation menu.
2. Select **Create New System**.
3. Select **Amazon SQS** as the system type.
4. Fill in the required fields:
   - **Name**: A display name for this destination.
   - **Queue URL**: The full URL of your Amazon SQS FIFO queue (obtained from the AWS console).
   - **Access Key**: Your AWS access key.
   - **Secret Access Key**: Your AWS secret access key.
   - **Region**: The AWS region where your queue is located.
5. Select **Save**.

### Edit a destination system

1. Select the card header of the destination system to open its detailed view.
2. Select **Edit** to modify the configuration.
3. Update the required fields and select **Save**.

### Check connection

From the detailed view of a destination system, select **Check Connection** to verify that the LDAP Connector can reach the configured AWS resource with the provided credentials.

### Delete a destination system

1. Open the destination system's detailed view.
2. Select **Delete** and confirm the deletion.

## Sync history

Each destination system maintains a sync history that records the outcome of each sync event.

To view sync history:

1. Select the card header of a destination system to open its detailed view.
2. Review the **Sync History** grid, which displays records of successful and failed sync operations.

## How synchronization works

1. DSS detects changes in the configured LDAP/Active Directory source (user creation, updates, or deletions).
2. DSS publishes the changes as events to Kafka.
3. The LDAP Connector receives these events and forwards the data to all configured destination systems.
4. New files appear in the Amazon S3 bucket and new messages are available in the Amazon SQS queue.
