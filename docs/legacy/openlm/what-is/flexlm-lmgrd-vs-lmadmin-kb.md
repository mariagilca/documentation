---
title: "FlexLM lmgrd vs lmadmin"
sidebar_position: 20
---

## FlexLM lmgrd vs. lmadmin

## License server components

The vendor daemon and the license server manager jointly comprise the FlexLM (Flexnet) license server. The license server manager contacts a Flex-enabled application, and dispatches the handling of that application to the appropriate vendor daemon. It also serves as an interface between the Vendor daemon and the Application, for checking out licenses.

## License server manager types

There are two versions of the license server manager:  
• lmgrd - the original license server manager with a command-line interface.

## Conceptual differences

The following table summarizes the conceptual differences between the two license server manager types:

|  |  |  |
| --- | --- | --- |
| Item | lmgrd | lmadmin |
| Interface | Command-line interface | Web-based license server manager |
| Configuration Options | Configuration information is acquired  from the command-line options used when the program is started | No configuration options are required upon program start. |
| Persistence of change | Changes need to be done in the license file | Settings are maintained after relaunching the tool, and they override the license file. |
| License file import | A single license file set by the configuration options upon running lmgrd | Import (multiple) license files. |
| Number of running instances | One instance of lmgrd is run for each vendor daemon. | Supports multiple vendor daemons with one lmadmin process. |
|  |  |  |

## More changes between lmgrd and lmadmin

On top of these conceptual changes, there have been some changes in commands:

- Some commands are no longer supported or have been replaced in lmadmin (e.g. lmremove, lmdown)
- Some have changed in behavior (e.g. lmreread)
- Other commands have been added into the lmadmin to integrate the functionality previously provided by the LMTOOLS (Stop server)
