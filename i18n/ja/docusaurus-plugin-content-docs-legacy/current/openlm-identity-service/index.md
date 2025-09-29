---
title: "OpenLM Identity Service installation guide"
sidebar_position: 1
---
## Prerequisites:

- A dedicated empty database for Identity Service according to system requirements.

## Introduction

The Identity Service is a secured solution that manages the authentication for all the OpenLM products. It uses the industry-standard OAuth 2.0 and it serves to log a user right away. Also, make sure to consult the OpenLM [System requirements](https://www.openlm.com/openlm-system-requirements/).

## Installation

Below is a short guide on how to install and configure the Identity Service:

1. On the OpenLM website, obtain the OpenLM Identity Service. Double-click on it to trigger the installation process:
2. Read carefully the terms and conditions. If compliant, check the box to accept then click **Next.**
3. If you want to install the Identity Service in a different location, click **Change** and navigate to the destination folder of your choosing.
4. The Identity Service requires an empty database. Make sure you have one before continuing with the installation then click **Install:**

![](/img/legacy/jKJPez2KcHF1NWTx5Y8ARyGAHKAK4C5bbiE67a5yY4eGgyGacHiEmdT3EoNH72jGn93BZv0qOUgoQl_yKDlLhAdnTntmSJXM9AyrAbyW6IYKEgGTwWhx3iBsst-h4WZWkhKe9nVkIx-Ph22rv-hL23a7rLtuDwMQuc5ZmT9uDNlLYsvHdB3JCZ2B8ycE.png)

5. The next prompt will disclose the temporary username and password. We strongly recommend changing them right away. Click **Next**to continue:

![](/img/legacy/MNScr54FAtXIpS03yUcEJlDCqG1Zc_kRkvz-JUxAM-uzttDnHAs1zLl0uPwxqt_xq245jmmNW8JuqgRLviXCAoFuIpMqCiXU9VQc8W0L8-FwyJ201lyvD8O_WrimEWrCuTHjpyjTiFH1SbmlqKMnkNklzL_xIElArMTUJW-eD_NoCl_Y5ZrCig1EgLh7.png)

6. Immediately after you will be directed to the database configuration tool prompt. Type in all the required details. Test the connection. If successful, click **Approve.**

![powershell prompt](/img/legacy/f0I9m8EeX7qED8GuRaU-geeRYZM0Cy6Pxw3AL3LAt_7IkjpDIUrb0qSunxSlsvsOzwaVASq1-6I0KS2BONxo1NgzVA91Wm1mK8ToEhYdT5SZSwHL6y2IA6V-CRHiOR8cX591rToEK2RP0dxydDiXTgCZO4HTrNFuhmI2CRmjPG-7NF2IY4BNfO08dK9y.png)

7.  In the next prompt declare the port number then click **Enter**. The default is 5000: *Note: Please do not use a port number that is occupied by other applications. If you are not sure, please use the default 5000.*

CMD Command to check if the port availability500:      netstat -a -n -o | find "5000"

![powershell prompt](/img/legacy/B2oHKWr83vT6zOS0MES70Rb-sCFqrk2Z2jl119a4GfwkE-YWUkHZuLqiTYmEF0FZswFph-Ykvw2uzTaz07MClB-tTzn6JBIuXtEGhIPR-pGckcKJfATRW5-9fNfEJd0oztvVSPKxcKkcGqmjvV42GESdFlehQN82h-5QH7FER0sI3MEg5fb_ImEGAyTr.png)

8. In the next steps, the database will be created and the Identity Service configured:

![powershell prompt](/img/legacy/XtHahtucly2BFtcCP4J2Cbqu05S0QQbkLvriIpjwUbnWRmrUh_1RKhhTkuts8I21rCRtYZ3xy6CWjuaMbR5YXtLGvvEJJo1eEjk_N6yQyROTDWeV3lFEA3plai9arUE8nTbRNf32w1-vKTYttgF0uA3qJ4bE4o1AL3frVCudDXdZmKezM02pBMBAy86G.png)

9. When the configuration is completed, press **Enter.**

10. Hit the **Finish**button. You will be redirected to the OpenLM Identity Service UI. Sign in with the provided default credentials:

Login: Admin

Password: Admin123!

![Identity service login](/img/legacy/ydu0Ms_f7IbTQqdFRsy2fvSWNiNtM-CQL7mFnoWlc1OpMMj015Ei1hm4aefsuLvh6Rop5PRArR7KVfMv5CACKiO8M44OnrTuFC8NJVTziRFpyYHKWzrjLhV2j6_ktKCITF60jk-fbo_J0op96yh-u76_A9Rg9cK9fcYFPK9b4gDCYu_sxM4dnvDh6hR2.png)

11. Change the temporary password. Type in a new reliable password, confirm it then hit the**Change**button:

![Identity service change password prompt](/img/legacy/AGgqWzAXCCo6kXDEgs9TNRj8srylFuguwBeK4Na6bnjM97XeDrMJuaefG2ZLvUrRDO0CXC1mss5GlAFND3yNeZvw0w1kapoO6TY94ldrq5oaXzsIF1VJ3DBAqh5nUtkWoAO9FYqTUTGgxqu6OQ8Ddsyj6GrtMEEWsmILz95qTx2o2YEqZC-afanfjvQo.png)

12. Once the password has been changed, you will be redirected to the login page. Use your new credentials to access the Identity Service account. Consult this guide for the recommended [Identity Service configuration](./configuration/).
