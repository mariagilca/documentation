---
title: OpenLM AutoCAD Plugin Installation Guide
sidebar_position: 3
description: Step-by-step guide for installing the OpenLM AutoCAD Plugin.
---

### **Installing the OpenLM AutoCAD Plugin**

The **OpenLM AutoCAD Plugin** is a software component designed to save a user's work, close AutoCAD, and release the license. It works exclusively with **OpenLM Cloud Server**, and a separate Workstation Agent should not be installed on the same machine.

-----

#### **Setup Wizard installation** 🧙‍♂️

1.  **Obtain a JSON Authorization File**:
      * Navigate to your Cloud Portal account at **Identity & Access Management (IAM) → Client Authorization files → Add Client**.
      * Select **Agent** as the client type, provide a descriptive name, and download the JSON file. Note that these details are displayed only once.
2.  **Run the installer**:
      * Double-click the installer file (`OpenLM_AutoCADPlugin_Setup_####.msi`) to launch the wizard.
3.  **Follow the prompts**:
      * Click **Next**, agree to the license terms, and click **Next** again.
4.  **Select the authorization file**:
      * On the next screen, click **Browse** to select the JSON Authorization File you downloaded.
5.  **Install the plugin**:
      * Click **Install** to begin the installation.
      * Once complete, click **Finish** to exit the installer.

-----

#### **Silent installation** 🤫

This method is for installing the plugin with predefined options and no user interaction.

1.  **Open a command prompt**:
      * Launch a command prompt with administrative privileges.
2.  **Use one of the following commands**:
      * **Silent with Authorization File**:
        ```bash
        msiexec /i "AutoCADPlugin_FILE_PATH\OpenLM.AutoCAD.Plugin.Setup.msi" CLOUD_LOCATION="cloudLocation property value" CLIENT_ID="clientId property value" SECRET_KEY="clientSecret property value" AUTHORIZATION_FILE_PATH="path to the agent-authorization.json file" /l*v "path to msi log file\log.txt" /q
        ```
      * **Silent with basic UI**:
        ```bash
        msiexec /i "AutoCADPlugin_FILE_PATH\OpenLM.AutoCAD.Plugin.Setup.msi" CLOUD_LOCATION="cloudLocation property value" CLIENT_ID="clientId property value" SECRET_KEY="clientSecret property value" AUTHORIZATION_TYPE="2" /l*v "path to msi log file\log.txt" /qb
        ```
3.  **Execute the command**:
      * Press **Enter** or **Return** to launch the installation in the background.