---
title: OpenLM Broker Installation on Windows
sidebar_position: 1
description: Step-by-step guide for installing OpenLM Broker on Windows systems.
---


### 📄 Introduction

The **OpenLM Broker** is a Java-based software module that serves as an intermediary between the OpenLM Server (SLM) and a license manager. By querying the license manager, it provides detailed license statistics and functionality. The Broker is an optional but highly recommended component that must be installed on the same machine as the license manager. Its installer includes the Java Runtime Environment (JRE) for your convenience.

This guide covers the standard wizard-based and silent installation methods for Windows, as well as instructions for installing and uninstalling multiple instances.

-----

### 🧙‍♂️ Installing OpenLM Broker with the Installation Wizard

1.  **Launch the installer**: Double-click the `OpenLM.Broker.Installer-#.#.##.##.msi` file.
2.  **Agree to terms**: Click `[Next]`, accept the license agreement, and click `[Next]` again.
3.  **Choose Java environment**: Select to use the bundled OpenJDK or specify a path to an existing Java 11 installation.
4.  **Select installation folder**: Click `[Next]`, choose a folder (the default is recommended), and click `[Next]` again.
5.  **Confirm and install**: Click `[Next]` to start the installation. A success screen will appear upon completion.
6.  **Broker initial setup**: The setup window will open. For an on-premise installation, select `"Local OpenLM Installation"` and provide the OpenLM SLM URL.
7.  **Authorize**: If using the **Identity Service**, you must generate and import an authorization file from **EasyAdmin**. Go to **EasyAdmin → Start → Administration → System & Security → Authorization → Add**, select **`[Broker]`**, and click `[Save]`. Download the JSON file with the Client ID and Secret, then import it into the Broker setup.
8.  **Complete setup**: Click `[Next]` to finish the installation.

-----

### 💻 OpenLM Broker Silent Installation

Silent installation is ideal for deploying multiple instances with no user interaction.

1.  **Open command prompt**: Launch a command prompt with administrative privileges.
2.  **Run the command**: Use `msiexec` with the necessary parameters. The command format is:
    ```
    msiexec /i "<full Broker MSI file path>" /qn TRANSFORMS=":I01" MSINEWINSTANCE="1" <parameters>
    ```
3.  **Add parameters**: You can specify optional parameters such as `INSTALLLOCATION`, `OPENLMLOCATION` (e.g., `5015@10.0.0.201`), and `BROKERXML` to define a custom configuration file.
4.  **Execute**: Press `[Enter]` to start the background installation.

-----

### ⚙️ Installation of Multiple OpenLM Broker Instances

To install more than one Broker instance on the same machine, each instance must connect to a different OpenLM SLM.

1.  **Launch installer**: Run the installer again. It will detect existing installations and, by default, select `"Install New Instance"`.
2.  **Follow wizard**: The wizard will guide you through the process, automatically adding a digit to the default folder name (e.g., `OpenLM Broker (2)`). Continue with the installation as instructed.

-----

### 🗑️ Uninstalling OpenLM Broker

You can uninstall the OpenLM Broker using three methods.

#### Option A: Windows Control Panel

1.  Open the **Windows Control Panel**.
2.  Go to `"Uninstall a Program"`.
3.  Select **OpenLM Broker** from the list and click `[Uninstall]`.

#### Option B: OpenLM installer package

1.  Double-click the installer file.
2.  Select `"Modify Instance(s)"` and click `[Next]`.
3.  Select the instance you want to remove and click `[Remove]`.

#### Option C: Silent uninstallation

1.  Open a command prompt with administrative privileges.
2.  Enter the command:
    ```
    msiexec /x "<msi installation file path>" /qn TRANSFORMS=":I##"
    ```
3.  Replace `##` with the instance number to be uninstalled.

:::note
All uninstall methods will leave the configuration files (`Broker.xml` and others) intact. To completely remove them, you must manually delete the installation folder. This is by design, as it allows for reinstallation without losing previous configurations.
:::