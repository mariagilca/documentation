---
title: Software License Management Cloud Registration and Configuration Guide (SLMC)
sidebar_position: 1
description: Guide to registering and configuring OpenLM Software License Management Cloud (SLMC).
---

---
title: Software License Management Cloud (SLMC) Setup Guide
sidebar_position: 1
description: Learn how to register, configure, and monitor licenses in the OpenLM Software License Management Cloud (SLMC).
---

## Introduction

[Software License Management Cloud](https://www.openlm.com/products/software-license-management-cloud-saas/) (SLMC) is a platform for managing and monitoring software licenses.  
In this delivery model, the software is hosted and licensed by a third party by subscription. Organizations adopt the cloud to outsource hardware/software maintenance and reduce IT costs.  

OpenLM offers a cloud solution that enables organizations to implement license monitoring with minimal installation and maintenance efforts.

### To implement SLMC, organizations need to:

- Register to use the Software License Management Cloud  
- Configure OpenLM Broker for SLMC  
- Install and configure other components such as Applications Manager, Workstation Agent, and Directory Sync  

📖 For additional perspectives, see:  
- [OpenLM System Structure Overview](https://www.openlm.com/knowledge-base/openlm-system-structure-overview-kb4400/)  

📧 For configuration questions, contact: **support@openlm.com**

---

## Register to Use the Software License Management Cloud Solution

To start using SLMC, follow these steps:

1. Visit the [Free-Trial](https://www.openlm.com/free-trial/) page.  
2. Locate the **registration boxes** for Software License Management Cloud (EU or USA server).  
   ![Figure 1: Registration boxes](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-1.png)  
3. Select your desired server location to open the Identity Service registration page.  
   ![Figure 2: Identity Service registration form](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-2.png)  
4. Choose registration method:  
   - **Direct Registration** → email + password (≥10 characters, incl. 1 non-alphanumeric)  
   - **Third-Party Accounts** → Google, Microsoft, or GitHub  
5. For direct registration, click **Register**.  
   ![Figure 3: Registration confirmation](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-3.png)  
6. Click **LOGIN**. The Welcome page opens.  
7. Introduce yourself → click **CONFIRM**.  
   ![Figure 4: Personal data](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-4.png)  
8. Click **LET’S GO** → Active Products tab opens.  
   ![Figure 5: Active Products tab](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-5.png)  
9. Activate required products. Start with **Software License Management Cloud → ACTIVATE**.  
   ![Figure 6: SLMC Activation window](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-6.png)  
10. Wait until product moves to **Active Products** pane.  
    ![Figure 7: Activation ongoing](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-7.png)  
11. Once the panel turns blue, click **Open**.  
    ![Figure 8: Activation finished](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-8.png)  
12. The **Welcome to OpenLM Cloud** screen opens.  
    ![Figure 9: Welcome tour](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-9.png)  

---

## Configure License Monitoring on SLMC

To start monitoring licensing data, configure a License Manager.  
Two options are available:

- **Manual** → No other installation required (FlexLM only).  
- **Automatic** → Requires OpenLM Broker on the license server. A secure connection is created over a dedicated port.  

---

## Manual Mode

Let’s add a **FlexLM license manager**:

1. During the onboarding tour, select the manual method.  
2. Redirected to **EasyAdmin UI → License Manager Servers**.  
   ![Figure 10: Add License Manager window](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-10.png)  
3. Enter description in **Display** field.  
4. From **Type** dropdown → select **FlexLM**.  
5. Enter **Hostname** and **Port number**.  
6. Set **Time Zone** (where the license server resides).  
7. **Triad Configuration** toggle:  
   - **On** → monitor all FlexLM servers in triad  
   - **Off (default)** → monitor single server  
8. Upload license file(s). Upload **all** files for the same LM before submitting.  
9. (Optional) Switch to **Custom fields** → add country, scope, description.  
   ![Figure 11: Custom fields](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-11.png)  
10. Click **SAVE**.  
11. Approve the new license manager.  
12. Licensing data now displays in reports like **License Activity**.  
    ![Figure 12: License Activity window](https://cdn.openlm.com/wp-content/uploads/2024/08/license-activity-window.png)  

---

## Automatic Mode

1. During onboarding, select the automatic method.  
2. [Download](https://www.openlm.com/downloads/) and [install OpenLM Broker](https://www.openlm.com/docs/openlm-broker-installation-on-windows/) on the license server.  
   ![Figure 13: Automatic mode](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-13.png)  
3. In onboarding, click **NEXT**.  
   ![Figure 14: Download Broker authorization file](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-14.png)  
4. In Cloud Portal → **Client Authorization files → ADD**.  
   ![Figure 15: Cloud Authorization](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-15.png)  
5. Fill **Add Client** form:  
   - Type = **Broker**  
   - Description = meaningful text  
   ![Figure 16: Add Client](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-16.png)  
6. Click **SAVE**. Secret Key + Secret ID generated (save them!).  
7. Download JSON file → keep on LM machine.  

### 🔑 Pro Tip: Access Broker Remotely

- On Broker machine → open `http://localhost:yourPort/api/new-token` → copy token.  
- On another device in same network → access `http://FQDN:port/#/` → paste token.  

8. In Broker → OpenLM Servers tab → click **Add Server**.  
9. Select **OpenLM Cloud → ADD → Import Broker Authorization File**.  
10. Fields auto-populate → click **CHECK CONNECTIVITY**.  
    ![Figure 17: Add OpenLM Server Connection](https://cdn.openlm.com/wp-content/uploads/2024/08/word-image-89305-17.png)  
11. If successful → click **SAVE**. Broker is now connected to SLMC.  

---

## Adding a License Server

Adding a license server = add the server + configure it.  
OpenLM supports many license managers.  

👉 For setup instructions: visit **Knowledge Base → Monitoring License Managers** category, then choose the required LM guide.  
