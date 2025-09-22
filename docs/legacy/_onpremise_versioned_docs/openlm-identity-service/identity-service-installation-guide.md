---
title: OpenLM Identity Service Installation Guide
sidebar_position: 2
description: A guide for installing and configuring the OpenLM Identity Service.
---

# OpenLM Identity Service Installation Guide

The OpenLM Identity Service is a secure solution for managing authentication for all OpenLM products. It uses the industry-standard OAuth 2.0 protocol to log users in. This guide provides a step-by-step process for installing and configuring the service.

:::note
Before you begin, ensure you have a dedicated, empty database for the Identity Service that meets the system requirements. You should also consult the [OpenLM System requirements](https://openlm.com/system-requirements/).
:::

### Installation

Follow these steps to install and configure the Identity Service:

1.  Obtain the **OpenLM Identity Service** installer from the OpenLM website. Double-click the installer to start the process.
2.  Read the terms and conditions carefully. If you agree, check the box to accept the terms and click **Next**.
3.  If you need to install the service in a different location, click **Change** and select your desired destination folder.
4.  Confirm that you have a dedicated empty database ready, then click **Install**.
5.  A prompt will display a temporary username and password. We strongly recommend changing these immediately. Click **Next** to continue.
6.  You will be directed to the database configuration tool. Enter all the required details. After entering the information, click **Test** to verify the connection. If the connection is successful, click **Approve**.
7.  In the next prompt, declare the port number you want to use for the service. The default is `5000`. Click **Enter**.

:::caution
Do not use a port number that is already in use by another application. If you are unsure, use the default port `5000`. You can check port availability by running the following command in Command Prompt:

:::

8.  The installer will now create the database and configure the Identity Service.
9.  Once the configuration is complete, press **Enter**.
10. Click the **Finish** button. You will be redirected to the OpenLM Identity Service UI. Sign in with the provided default credentials:
    -   **Login:** `Admin`
    -   **Password:** `Admin123!`
11. Change the temporary password. Type a new, strong password, confirm it, and click **Change**.
12. After the password has been changed, you will be redirected to the login page. Use your new credentials to access your Identity Service account. For further configuration, consult the [recommended Identity Service configuration guide](https://openlm.com/kb/identity-service-configuration/).

---
