---
title: What is the difference between the FlexLM lmgrd and lmadmin license server managers
sidebar_position: 19
description: Overview of the differences between FlexLM lmgrd and lmadmin license server managers.
---
The FlexLM (FlexNet) license server is composed of two main components: the **license server manager** and the **vendor daemon**. The license server manager handles initial contact with a Flex-enabled application, then dispatches it to the appropriate vendor daemon for license checkout.

***

### License server manager types

There are two versions of the FlexLM license server manager:

* **`lmgrd`**: The original license server manager, which uses a command-line interface.
* **`lmadmin`**: A newer, web-based license server manager with a graphical user interface.

***

### Conceptual differences

The table below summarizes the key conceptual differences between `lmgrd` and `lmadmin`.

| Item | `lmgrd` | `lmadmin` |
| :--- | :--- | :--- |
| **Interface** | Command-line interface | Web-based interface |
| **Configuration Options** | Configuration is done via command-line options at startup. | No configuration options are required at startup; all settings are managed from the web interface. |
| **Persistence of change** | Changes must be made in the license file. | Settings are persistent and are maintained even after relaunching the tool. They also override the license file. |
| **License file import** | A single license file is set at startup. | Can import multiple license files. |
| **Number of running instances** | Requires one instance of `lmgrd` for each vendor daemon. | Supports multiple vendor daemons with a single `lmadmin` process. |

***

### More changes between `lmgrd` & `lmadmin`

In addition to these conceptual differences, there are also some changes in commands:

* Some commands, like `lmremove` and `lmdown`, are no longer supported or have been replaced in `lmadmin`.
* Some commands, such as `lmreread`, have changed in behavior.
* `lmadmin` includes new commands that integrate functionality previously handled by the legacy `LMTOOLS` utility.