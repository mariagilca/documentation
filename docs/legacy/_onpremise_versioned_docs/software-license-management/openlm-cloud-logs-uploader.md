---
title: OpenLM Cloud Logs Uploader
sidebar_position: 4
description: Overview and configuration of the OpenLM Cloud Logs Uploader.
---



The logs uploader is the **manual** method of interfacing with a FlexLM license manager.  
With this method, license manager files must be uploaded manually into the EasyAdmin user interface.  

:::note
You must have the necessary admin roles to perform this procedure.
:::

## Configuration

1. **Navigate to the EasyAdmin user interface:**
   - Go to **Start → Administration → License Manager Servers → Add LM**.

2. **Set up license manager details:**
   - **Unique name**: Enter a unique name to identify the License Manager.  
   - **License file**: Drag and drop the license file into the designated area.  

3. **Submit the license file:**
   - Click **Submit**.  

4. **Configure connection settings:**
   - **Port number**: Define the port number for the License Manager.  
   - **Time zone**: Select the appropriate time zone for the License Manager.  

5. Click **Save** to finalize the setup.  
   ![Add a new license server window](img/add-license-server-manually.png)  
   *Figure 1: Add a new license server window (manual setup)*

6. **Upload the debug log:**
   - Click the **Cloud icon** in the upper-right corner.  
   ![Debug log upload icon](img/debug-log-upload-icon.png)  
   *Figure 2: Debug log upload icon*

7. **Drag and drop the debug log**, then click **Upload**.  
   ![Drag and drop the debug log](img/drag-drop-debug-log.png)  
   *Figure 3: Drag and drop the debug log prompt*

8. After upload, licensing data becomes available in OpenLM reports such as **License Activity**.  
   ![License activity window](img/license-activity-window.png)  
   *Figure 4: License activity window*

---

## Referenced images

- `img/add-license-server-manually.png` – Add new license server window  
- `img/debug-log-upload-icon.png` – Debug log upload icon  
- `img/drag-drop-debug-log.png` – Drag and drop debug log prompt  
- `img/license-activity-window.png` – License activity report window  
