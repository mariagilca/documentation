---
title: "Software License Management Cloud registration and configuration guide (SLMC)"
sidebar_position: 1
---
## Introduction

[Software License Management Cloud](https://www.openlm.com/products/software-license-management-cloud-saas/) is a platform for managing and monitoring software licenses. In this delivery model, the software is hosted and licensed by a third party by subscription. Organizations choose the cloud to outsource hardware and software maintenance and reduce IT costs. OpenLM offers a cloud solution that enables organizations to implement license monitoring with minimal installation and maintenance efforts.

To implement the Software License Management Cloud solution, organizations need to do the following:

- Register to Use the Software License Management Cloud
- Configure OpenLM Broker for Software License Management Cloud
- Install and configure other components such as Applications Manager, Workstation Agent, and Directory Sync.

For additional information that gives broader perspectives on Software License Management Cloud, OpenLM Broker, and the OpenLM system, please see the following documents and resources:

- [OpenLM System Structure Overview](https://www.openlm.com/knowledge-base/openlm-system-structure-overview-kb4400/)

If you have questions about Software License Management Cloud configuration, please get in touch with our support team (support@openlm.com).

## **Register to use Software License Management Cloud solution**

To start using the Software License Management Cloud solution, follow these steps to complete the registration process:

1. Visit the OpenLM [**Free-Trial**](https://www.openlm.com/free-trial/) page on the company website.
2. Locate the link to sign up for Software License Management Cloud (hosted on the European Union Server or USA Server; see **Figure 1**).

   ![Figure 1: The registration boxes on the Free Trial page have a link to the registration page for Software License Management Cloud.](/img/legacy/word-image-89305-1.png)

   Figure 1: The registration boxes on the Free Trial page have a link to the registration page for Software License Management Cloud.
3. Select a desired server location to open the Identity Service registration page (see **Figure 2**).
4. Choose your preferred registration method:
   - Direct Registration: Provide an email and a password with at least ten characters, including at least one non-alphanumeric character.
   - Third-Party Accounts: Register with Google, Microsoft, or GitHub.

   ![Figure 2: The Identity Service registration form.](/img/legacy/word-image-89305-2.png)

   Figure 2: The Identity Service registration form.
5. For Direct Registration, click the **Register** button.

   ![Figure 3: The registration confirmation screen and login button.](/img/legacy/word-image-89305-3.png)

   Figure 3: The registration confirmation screen and login button.
6. Click **LOGIN**. The Welcome page opens up.
7. Introduce yourself and click **CONFIRM**.

   ![Figure 4: Personal data](/img/legacy/word-image-89305-4.png)

   Figure 4: Personal data
8. Click LET'S GO. The Active Products tab opens:

   ![Figure 5: The Software License Management Cloud Portal Active Products tab](/img/legacy/word-image-89305-5.png)

   Figure 5: The Software License Management Cloud Portal Active Products tab
9. Activate the required products. The first product to activate is the Software License Management Cloud. Click on **Software License Management Cloud** → ****ACTIVATE:****

   ![Figure 6: The Software License Management Cloud Activation window](/img/legacy/word-image-89305-6.png)

   Figure 6: The Software License Management Cloud Activation window
10. It will take a few moments until the Product moves to the Active Products pane:

    ![Figure 7: The Software License Management Cloud Activation process ongoing](/img/legacy/word-image-89305-7.png)

    Figure 7: The Software License Management Cloud Activation process ongoing
11. Once the panel turns blue, click **Open**:

    ![Figure 8: The Software License Management Cloud Activation process finished](/img/legacy/word-image-89305-8.png)

    Figure 8: The Software License Management Cloud Activation process finished
12. The Welcome to OpenLM Cloud screen opens:

![Figure 9: OpenLM Cloud Welcome tour guide](/img/legacy/word-image-89305-9.png)

Figure 9: OpenLM Cloud Welcome tour guide

## Configure license monitoring on Software License Management Cloud

To start monitoring licensing data, configure a License Manager. There are two options:

- **Manual:** no other installation is required. This configuration is dedicated to FlexLM License Manager.
- **Automatic**: it requires the OpenLM Broker configuration on your license Server machine. The Software License Management Cloud creates a secure connection over a dedicated port between the OpenLM Broker and the cloud-resident OpenLM SLM.

## Manual mode

Let's add a FlexLM license manager:

1. During the onboarding tour, continue using the manual method.
2. You will be redirected to **EasyAdmin User Interface** → **License Manager Servers.**

   ![Figure 10: Add License Manager window](/img/legacy/word-image-89305-10.png)

   Figure 10: Add License Manager window
3. Enter a description in the **Display** field to help you recognize the license manager.
4. From the **Type** drop-down menu, select **FlexLM**.
5. Type in the license server's **Hostname** and **Port number**.
6. Set the **Time Zone** to where the license server physically resides (e.g. UTC +02:00 Jerusalem).
7. **Triad Configuration:** Enable the Triad Configuration toggle if needed:  
   **On:** The OpenLM server will monitor the activity of all FlexLM servers in the triad.  
   **Off** (Default): The OpenLM server will monitor the activity of a single FlexLM license server.
8. Drag or select the FlexLM license manager license file. Click **Submit.  
   Important: if you have more than one license file for the same license manager, upload all of them before submitting.**
9. Optionally, you can switch the tab to **Custom fields** and add information such as country, usage scope, and description:

   ![Figure 11: Custom Fields](/img/legacy/word-image-89305-11.png)

   Figure 11: Custom Fields
10. Click **SAVE.**
11. Approve the newly added license manager.
12. Then, the licensing data will be displayed in various OpenLM reports, such as License Activity:

    ![Figure 12: License activity window](/img/legacy/license-activity-window_1.png)

    Figure 12: License activity window

## Automatic mode

1. During the onboarding tour, continue using the automatic method.
2. [Download](https://www.openlm.com/downloads/) and [install](/documentation/legacy/openlm-broker-installation-on-windows) the OpenLM Broker on your license server machine.

   ![Figure 13: OpenLM Cloud Welcome tour guide - Automatic](/img/legacy/word-image-89305-13.png)

   Figure 13: OpenLM Cloud Welcome Tour Guide - Automatic
3. In the onboarding tour, click **NEXT:**

   ![Figure 14: OpenLM Cloud Welcome tour guide - Download Broker authorization file](/img/legacy/word-image-89305-14.png)

   Figure 14: OpenLM Cloud Welcome tour guide - Download Broker authorization file
4. Let's generate the authorization file. [Navigate to your Cloud Portal](https://cloud.openlm.com/portal/)**→Client Authorization files** tab, and click **ADD.**

   ![Figure 15: Cloud Authorization](/img/legacy/word-image-89305-15.png)

   Figure 15: Cloud Authorization
5. The Add Client form appears. From the **Type** drop-down list, select **Broker.** Enter a descriptive text in the **Description** field:

   ![Figure 16: Add Client](/img/legacy/word-image-89305-16.png)

   Figure 16: Add Client
6. Click **SAVE.**
7. Note: The Secret key will be displayed only once; please save it before closing the window.
8. The Secret Key and Secret ID are generated. Download the JSON file and have it ready on the License manager machine.

**Pro-tip:** Here's a tip for accessing the OpenLM Broker remotely!

While the OpenLM Broker is typically installed on a specific machine, you can access it from any device on your network. Here's how:

- Locate the Broker Machine: Identify the machine where you installed the OpenLM Broker.

Generate a Token:

- Open a web browser on the Broker machine.
- Navigate to `http://localhost:yourPort/api/new-token` (replace yourPort with the actual Broker port).
- A single-use token will be displayed. Copy this token.

Access the Broker Remotely:

- Open a web browser on any device within your network.
- Enter the Broker's fully qualified domain name (FQDN) and port in the address bar, like http://demo.openlm.net:5090/#/.
- Paste the copied token into the appropriate field.

1. Access your OpenLM Broker instance. Navigate to the OpenLM Servers tab.
2. Click **Add Server.** Select **OpenLM Cloud** and click **ADD**. Click Import **Broker Authorization File.** The fields are automatically populated. Click **CHECK CONNECTIVITY.**

   ![Figure 17: Add OpenLM Server Connection](/img/legacy/word-image-89305-17.png)

   Figure 17: Add OpenLM Server Connection
3. If successful, **click SAVE.** The Broker is now successfully connected with the OpenLM SLMC.

## Adding a license server

Adding a license server involves adding the server and then configuring it.  
OpenLM supports the monitoring of a wide range of License managers.  
To set up a license manager, visit our knowledge base and access the Monitoring License Managers category. Then, select the required license manager and follow the instructions.
