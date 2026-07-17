---
title: Logs uploader
description: "The logs uploader is what we call the \"Manual\" method of interfacing with a FlexLM license manager. The license manager files must be uploaded manually."
sidebar_position: 4
---

The logs uploader is what we call the "Manual" method of interfacing with a FlexLM license manager. The license manager files must be uploaded manually to the EasyAdmin User interface.  
Make sure to have the necessary admin roles for this procedure.

## Configuration

1. Navigate to the EasyAdmin User Interface:
   - Go to Start → Administration → License Manager Servers → Add LM.
2. Set Up License Manager Details:
   - Unique Name: Enter a unique name to identify the License Manager. (1)
   - License File: Drag and drop the license file into the designated area. (2)
3. Submit the License File:
   - Select [**Submit**]. (3)
4. Configure Connection Settings:
   - Port Number: Define the port number for the License Manager. (4)
   - Time Zone: Select the appropriate time zone for the License Manager. (5)
5. Select [**Save**] to finalize the setup.  
   ![Add a new License Server window (manually)](/img/legacy/add-a-new-license-server-window-manually.png)

   ![Figure 1: Add a new License Server window (manually)](/img/legacy/word-image-85568-2.png)
6. The next step is to upload the debug log. To do so, select the Cloud Icon on the upper right side:

   ![Debug log upload icon](/img/legacy/debug-log-upload-icon.png)

   Figure 2: Debug log upload icon
7. Drag and drop the debug log, then select **Upload**.

   ![Drag and drop the debug log prompt](/img/legacy/drag-and-drop-the-debug-log-prompt.png)

   Figure 3: Drag and drop the debug log prompt
8. Then, the licensing data will be displayed in various OpenLM reports, such as License Activity.

   ![License activity window](/img/legacy/license-activity-window.png)

   Figure 4: License activity window
