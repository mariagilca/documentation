---
title: "OpenLM Broker Installation Guide"
sidebar_label: "OpenLM Broker Installation Guide"
---

<!-- Source: https://www.openlm.com/knowledge-base/openlm-broker-installation-guide-comprehensive-kb4004b/ -->

* OpenLM Broker Installation Guide

# OpenLM Broker Installation Guide

Table of contents 

* [Introduction](#0-toc-title)
* [OpenLM Broker Installation](#1-toc-title)
* [Connecting the Broker to an  OpenLM Server](#2-toc-title)

## **Introduction** [#](#0-toc-title)

OpenLM Broker facilitates communication between OpenLM Server and the license manager to provide enhanced license statistics and functionality. It interacts directly with the license manager, querying it regularly for license information and relaying this data to the OpenLM Server. While OpenLM Broker is an optional component, it is highly recommended for enhancing the license management experience and capabilities of the OpenLM system.

This document covers the installation of the OpenLM Broker module. It includes:

## **OpenLM Broker Installation** [#](#1-toc-title)

OpenLM Broker is Java-based and can run on any Java-supported platform. The Broker needs to be installed on the same machine as the license manager. As the Java environment is required, Java Runtime Environment (JRE) is bundled as part of the installation (available only for the Broker installation). Before starting the installation, it is advisable to check the [system requirements](https://www.openlm.com/openlm-system-requirements/) on the OpenLM website. This document covers the installation of the OpenLM Broker on Windows in both standard wizard installation (see **A. Installing OpenLM Broker with the Installation Wizard**) and through the silent installation (see **B. OpenLM Broker Silent Installation**).

Both methods of installation require the OpenLM Broker installer. It can be located in the download area (https://www.openlm.com/download/).

### ***Installing OpenLM Broker with the Installation Wizard***

1. Double-click the installer file (OpenLM.Broker.Installer-#.#.##.##.msi) to initiate installation**.**
2. Click **[Next]** to continue with the installation. The License Agreement screen will appear.  
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20495%20387'%3E%3C/svg%3E)![](/img/legacy/kb/ZIeZNO9ieh9MgXEDgtZ4IUbAHL6kBlOci4y86i7G8iQKGH8BSFjMKiyy2_7zTrBkw7BLAAh0OpH0lyB4JVYLqyTKrr3R5CjsBuMvHA0wbTq4pT1ey-o2xuVf82h5zmsmV64Q3U1aNYNc5opM4OH2pKSE4LFIXfoA-hoHzH0yniXh94oWBMyiwVRT3aQxdQ.png)
3. If you agree to the terms and want to continue with the installation, click the "I Agree" radio button (see **Figure 4**). Clicking the radio button will enable the **[Next]** button. Clicking **[Cancel]** will exit the installer without any changes.  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20495%20387'%3E%3C/svg%3E)![](/img/legacy/kb/wbzlwqkNK8ZCPSPWpVdInfYYjuk8G09QMEnre1u1rSvgfsGCUj9Xh61HvWHqtbbhnS3Wjxcud9fPYHjTQeWpBAWBPVAi2ECG-mmNr6qkmw9Km7Utgv5ildIbr8MKPcRGPQe5DyUfUot12c3cmY4oqTtob0gPk3CSg6grH5DGS0JexQujNhN5Y7dvNJ1nuw.png)  
   **Figure 4: License agreement with "I Agree" checked.**
4. Click **[Next]**. The Java selection screen will appear. Either accept the bundled OpenJDK distributive or choose and point to a path where Java 11 is already installed (see **Figure 5**).  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20495%20387'%3E%3C/svg%3E)![](/img/legacy/kb/sBD2kZOmUPjgadBBuBBqDeMX-P7DrwdZc72NK1ZhL1zNn32Q6AzqQ6GEhiR8VQhRsGrY9eRfqs-va86v_1ASi7e3NoB5pg7AN3FJzBW0LZDBSFNHfaIoaSomA6QnbS7kavPnEIIxSpQ4Jx4ziqbEJ8deGgXQu6_TV4JLz2bmO8BurjBPwVCFFUnq7XJ8Qw.png)

**Figure 5: The Java selection screen.**

5. Click **[Next]**. The Select Installation Folder screen will appear with the default installation path (see **Figure 6**).  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20495%20387'%3E%3C/svg%3E)![](/img/legacy/kb/LW66yWAV6HfMHejcQPu_OvdNwfLggo3Zte0K-dWW505KsAJ2T0_O5qeMGU3dOc-e47GhoGOAGHKr5N5V-bjgzDoVZ9t_yBiGg5TysRssyqz1nT6aMI25eMtqVOGv-GGDA5gw2IxPb7XFFIIGAAkxtNq4RevIxzCJ6roWSeR91IPn24fF0ZoBPIT3evHqrQ.png)  
   **Figure 6: Select Installation Folder screen.**
6. *[Optional]* Click **[Browse]** to select a different installation path. The default path is recommended.
7. Click **[Next]**. An installation confirmation screen will appear (see **Figure 7**).  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20495%20387'%3E%3C/svg%3E)![](/img/legacy/kb/cQ3-exwsg4g0-CEGKuU7hPDbl3mx0mQnXlWeNmG-wIfV7iWBmUPX_YV9uNM5EFj6f_IfwHMKTq6qGxr7bE2Q00n7yZJgwPIs44mxU6_bXt93EacC9tEucJXPctASx7KJ2otOudhMRKOOmwduAlF9Nlh1FLj4nETU3Km5ZCrJVrhBbAOZF91k_DaNPl4cMw.png)  
   **Figure 7: Installation confirmation screen.**
8. Click the **[Next]** button to continue with the installation. An installation progress screen will appear (see **Figure 8**). The installation will continue until completion. The Success screen (see **Figure 9**) will appear at the end of a successful installation.  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20495%20387'%3E%3C/svg%3E)![](/img/legacy/kb/KoDsiPUecJrt_0eGSdLkSQsSz8xzCRIjIu6k69eC2sRm0BYIukBgGuktI-OXv_xLUdKLbBGAdLaAMzWaf32K6r1Tf3zViiZi1cQZODb3mipZAGxD1HPyo70gAyCLNSFsMAXj8U4mutht22M_n6aoeBGaVz79jzIRVHJPTALWJLWXSACyrHVXz97vnTX1JA.png)  
   **Figure 8: Installation progress screen.**
9. Notification of successful installation appears. Click the **[Close]** button to exit the installer. After that, the Broker web UI opens (**Figure 10)**:

![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20262%20204'%3E%3C/svg%3E)![](/img/legacy/kb/EN6cTxOCQ7gnK9MpxG-1z7oosy0HBchm8nO6G6ef9zSxijSQl2BbV82RVvRZBzkOYy1JFdTo4L3fTHMfhuCHxW15-sL271x5JBkS4tPnLhSfhl-luVH2nW4ZNXqo4QCx-vqbQpwgc_lJi6sWs5DDWLKwTKF_jtwMLQ8cL4ZQyah-C3BwtbcAnRP6yyowWw.png)  
**Figure 9: Installation Complete**  
  
![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20288%20151'%3E%3C/svg%3E)![](/img/legacy/kb/BiwS6hRMDk-lAZ3eNyvgKUjZXi6MKXXWECl1UPgmwh4DNaSCbD2lMyKho-xiijWdZjFGjgwRwU_gRzLEs9vPn-LMRIx2AHKthQ1s7mNmCue03oEmBBw_Cm6aQQoB0jSBwXf08h3eB0wzUU-CDzNxNXxxviIJhKJBegQYL1XDbXcDPWHJbAThnxpOaQwcLA.png)

**Figure 10: Broker web UI opens**

10. At this stage, the Broker instance installation is complete. Follow the below Initial Broker Setup steps to make the necessary connections and configurations.

## Connecting the Broker to an  OpenLM Server [#](#2-toc-title)

### Local OpenLM Installation

1. Go back the browser where the Broker is opened and **Continue** with the **Local OpenLM Installation(See figure 10).**
2. The Authorization window appears. To generate the Authorization file, access your EasyAdmin User Interface→Start→Administration→System&Security→Security→Authorization→ADD:
3. The ADD CLIENT form opens. From the drop down list select the client type -  **Broker** and a meaningful description. Click **SAVE**:  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20624%20297'%3E%3C/svg%3E)![](/img/legacy/kb/4Q2FlsopkxSkXLITU3sxQMw1RQ0FQYrIGqkibbieEaxiUT4USAsyp_05lB1IHN9qZViSr-bwBtwKr_CswGp8jh2xVuS0vML77wuCUCpRYtSBtFW-3-hzL7F-oOnhU_0q7wm54BZqiL--gDnbHy_y4OC-wM7bZVAwzkM-dDoZwXOlY2C9Gq_zZVTqPbUUFQ.png)
4. Note the Secret key will be displayed only once. Make sure to download the JSON file to automatically import the credentials or save the Client ID and Client Secret to input manually.
5. Go back to the Broker web UI and choose one of the options:  
   A. Manually input the Server URL, Client ID and Client Secret  
   B. Import (Click  Import Broker Authorization File and browse to the location where the previously downloaded file is located) the JSON Authorization file, so the data will be automatically inserted. Once done, click CONTINUE:
6. The Broker will automatically look for the [License Managers](https://www.openlm.com/license-manager-capabilities/ "license managers") and add them to the OpenLM Server. To finish the setup, approve the detected License servers by accessing the "License Servers" window in OpenLM user interface. Find "Pending" entries, double click or click "Edit" to open details, click "Approve" button.

### OpenLM Cloud Account

1. Go back the browser where the Broker is opened and Continue with the **OpenLM Cloud Account(See figure 10).**
2. The Authorization window appears. To generate the Authorization file, access your Cloud Portal→Client Authorization menu→ADD:  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20578%20231'%3E%3C/svg%3E)![](/img/legacy/kb/9Eor3zYle7UkaH_GpTzcyNZKCCXJo4q_38tb73IxHncdfB7WdSNNRNYzHOmZyfNfMRwqDYYxTdonqMwhKc3mrDJHPmj7aEFpSq_PRG5OuKQYRmYWDet8sYmcI5yz8zZSqBDPwRDuZVzbJFMC_Iqabduvv2aIw95LzCSosn78R8O0RY4QYQkNuDanXv0-_Q.png)  
   **Figure 11: Cloud Portal - Generating Authorization File for the Broker**
3. The ADD CLIENT form opens. From the drop down list select the client type -  **Broker** and a meaningful description. Click **SAVE**:  
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20624%20251'%3E%3C/svg%3E)![](/img/legacy/kb/993-6umNmccHK7DgmdB32q_CkXmSCYi4JcdHJh7U4P-BaGjfCtP3Kbt3ler2GXnD1njZ7_yRwdHBHdNmlqlo_KvxCPHHfrgOsqQR3oFlHVQjYh7eafl6qzbX69iGH4P-g2OunAju7cs-2MT3eSYgIaqNb-m3EljFMLc0P1HFqDoWyvTpLU6DIm8s2m-EJw.png)  
   **Figure 12: Cloud Portal - Generating Authorization File for the Broker**
4. Note the Secret key will be displayed only once. Make sure to download the JSON file to automatically import the credential or save the Client ID and Client Secret to input manually.  
     
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20624%20293'%3E%3C/svg%3E)![](/img/legacy/kb/248V8L93XPQlf8Ydwa5BVCdmlCVLbUSz5tce9hqib7_6IOM26lW9q1lCZuwgboyyu903uF2CrEgbTLY3zWKTUL3cwZBomj7fq3DQOF7GrPVmVcbDU0STZAMFKaSEd1-xIHE3Iodac97w0NXUYDTHgX2wb1XqkLf2gSq6GfmUeKzCOrkN9bUI7KGR4GvmtA.png)  
   **Figure 13: Cloud Portal - Generated Authorization File for the Broker**
5. Go back to the Broker web UI and choose one of the options:  
   A. Manually input the Server URL, Client ID and Client Secret  
   B. Import (Click **Import Broker Authorization File** and browse to the location where the previously downloaded file is located) the JSON Authorization file, so the data will be automatically inserted. Once done, click **CONTINUE:**  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20624%20293'%3E%3C/svg%3E)![](/img/legacy/kb/EEWKI5XHMB8iE0WzVk5QnPUjt76jQnXVJh2z9hmGCzewvqm0S2wmlxo0b4wmoEKNu98JFjy9td9ZVpM6ihZWcXy5D92PkZKYTTkUS-boSP6sHo3iuEzV5rdynaTvVFdqWcWu8APk4q56yyQ_D05oKwIuOztiogMmPfDyGNxaaOlTNueSn8SqOEMQgGrv3w.png)
6. If the authorization succeeds, the Broker is successfully connected to the OpenLM Server and it will scan for the License Managers Automatically. If the License Manager is detected, the following screen will appear:  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20611%20275'%3E%3C/svg%3E)![](/img/legacy/kb/zfVbnn_E0Q-O-1AhfzkcZXsWtHhdkw1Mmo5jOZ_2n3OepHJcgO2JDqadVOpKYNmfr2i83kVqUKXafqJWtdDfEkVu_eLmNSTZJhW6RMOaJEcHxHlRQ2974Xd34ZWIN-RuGgkcaL38lo7KnqqfXUj_tb3HOVVrXfSxWqxrwgUKNWCP4N94cypxJQ5QwkAWoQ.png)
7. If there were no License Managers detected the following screen will appear:  
     
   ![](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20624%20283'%3E%3C/svg%3E)![](/img/legacy/kb/-QcRhFqrQoWLzbwWhZrMLDM97uR2S7U6S66BNeW7c1B7t2m-Z7dEJRYeXpokHDKTrz03XHJeJgD311ug3x15-VSiuGT0OuLvGoMC4cBKnddfvD2K5t18ORGac6ePxrztZI3DAvgQHc3NaoiktXI2j58Fg4bpPFR750X9E9F7-a8HWx2I239tF3Z7fQbJbQ.png)
8. Proceed to the OpenLM EasyAdmin to approve all the discovered License Managers.
