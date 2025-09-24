---
title: "OpenLM SLM and Identity Service installation on Linux using RPM, DEB, and TAR Packages"
sidebar_position: 2
---
This document describes the steps required to install the OpenLM SLM  and Identity Service in a Linux machine using RPM, DEB, and TAR packages

## Requirements

Linux Package Dependencies:

**SLM**: systemd, redhat-lsb, libgdiplus, dotnet core, powershell core

**Identity Service**: systemd, dotnet core, powershell core

Software as Putty and WinSCP software are the prerequisites for the OpenLM SLM installation. These are Windows-only tools and are needed to interact with the Linux machine from the Windows machine. You can use any tool apart from Putty / WinSCP that can open a console and copy a file to a Linux machine. Protocols: Putty (SSH protocol), WinSCP (SCP protocol).

## Connect to a Linux machine using Putty

To connect to a Linux machine using Putty, add the Linux machine address in the Putty session window. Enter the hostname and IP address of the Linux machine to connect to. Click the **Open** button after entering the required details.

![](/img/legacy/word-image-159.png)

Connect to the Linux machine using your login credentials, enter your system password:

![](/img/legacy/word-image-160.png)

**For RPM**: Type the below-mentioned command to check if you have any OpenLM applications installed:

sudo rpm -qa | grep openlm

In case no information is returned that means no OpenLM applications are installed.

**For DEB**: Type the below-mentioned command to check if you have any OpenLM applications installed:

sudo apt list -installed | grep openlm

**For Tar.Gz**: Type the below-mentioned command to check if you have any OpenLM applications installed:

sudo ps -aux | grep openlm

OR

ls /etc/systemd/system

OR

ls /opt

In case no relevant information is returned that means no OpenLM applications are installed.

**Note**: In case you encounter a display glitch with the putty console, open the CMD windows and use the below command:

ssh [user]@[IP|Hostname]

## Installing the OpenLM SLM Using RPM

To install the OpenLM SLM:

1. Download the RPM installation file on your machine (for example, in the Downloads folder).

2. Open WinSCP and connect it to the Linux machine.

![](/img/legacy/word-image-161.png)

3. Login using your login credentials, and drag and drop the downloaded RPM file from your machine to the Linux machine.

**Note**: There are some dependencies included in the RPM package. To install all these dependencies automatically, use the below-mentioned command if your distribution include yum:

sudo yum install [RPMFILE]

Otherwise, after the copying process is complete, return to Putty and run the below-mentioned command:

sudo rpm -i [RPMFILE]  
(for example, sudo rpm -i openlm\_server-21.6.9-937.x86\_64.rpm)

**Note**: To check the dependencies with RPM, use the commands:

rpm -qp [RPMFILE] -provides

rpm -qp [RPMFILE] -requires

![](/img/legacy/word-image-162.png)

4. When the window with database configuration opens, create a new empty database in your preferred database provider.

**Note**: The following databases are compatible: MS SQL Server, MySQL, MariaDB.

![](/img/legacy/word-image-163.png)

![](/img/legacy/word-image-164.png)

Provide the server name, database name, and user credentials (User ID and Password), click **Test Connection** and **Approve** button.

![](/img/legacy/word-image-165.png)

![](/img/legacy/word-image-166.png)

This message confirms that the installation process is done.

5. Add the license to your OpenLM SLM.

Direct cp command into /opt/openlm/license folder.

![](/img/legacy/word-image-167.png)

**OR**

In Putty, go to the OpenLM folder using this command: cd /opt/openlm

Go to WinSCP, and drag and drop the license file from your machine to the Linux machine to the /opt/openlm/license folder.

![](/img/legacy/word-image-168.png)

Restart the OpenLM service to apply the license. Run the below-mentioned command to restart the OpenLM service:

sudo service openlm restart

OR

sudo systemctl restart openlm

OpenLM installation is now completed. The OpenLM SLM on the Linux Machine is available via the link:  **http://[IP|Hostname]:5015** in the browser.

![](/img/legacy/word-image-169.png)

## Installing Identity Service using RPM

To install Identity Service:

1. Copy Identity Service RPM file. Move it to the Linux machine via WinSCP and install it.

![](/img/legacy/word-image-170.png)  
![](/img/legacy/word-image-171.png)

2. Create a new database and indicate this database during the Identity Service installation.

![](/img/legacy/word-image-172.png)

![](/img/legacy/word-image-173.png)

3. Choose the Identity Service port (default 5000, press enter).

![](/img/legacy/word-image-174.png)

![](/img/legacy/word-image-175.png)

4. Open Identity Service via the link: http://[FQDN]:5000. Here, FQDN means Fully Qualified Domain Name.

![](/img/legacy/word-image-176.png)

Connect it to the OpenLM SLM.

![](/img/legacy/word-image-177.png)

Run the below-mentioned command to restart the OpenLM service (the account should exist in the OpenLM SLM):

sudo service openlm restart

OR

sudo systemctl restart openlm

**![](/img/legacy/word-image-178.png)**

OpenLM SLM appsettings.json: To check that the configuration is fine, use the command:

cat /opt/openlm/bin/appsettings.json

**![](/img/legacy/word-image-179.png)**

The **Client Secret** and **Authority** field should be filled with the **EnableSecurity** field as **True**.

## Useful RPM Specific Linux Sudo Commands

**To Install the RPM:**

sudo rpm -i [RPMFILE]

OR

sudo yum install [RPMFILE]

**To Upgrade the RPM:**

sudo rpm -U [RPMFILE]

OR

sudo yum update [RPMFILE]

**To Uninstall:**

**To check installed OpenLM items:** sudo rpm -qa | grep openlm

**To uninstall one of the installed items:** sudo rpm -e [name]

**To Repair:**

sudo rpm -i -replacepkgs [PackageNAme]

**OpenLM SLM:**

sudo cp [YourLicenseFile] /opt/openlm/license/

**Restart Service**

sudo service openlm restart

**Optional Tool Server:**

**DB Configuration:**

sudo pwsh /opt/openlm/tools/postinstall/start-serverdbconfiguration.ps1

**All DB Upgrade:**

sudo pwsh /opt/openlm/tools/postinstall/start-alldbupgradeapi.ps1

**Optional Tool Identity Service:**

**DB Configuration:**

sudo /opt/securityservice/tools/postinstall/start-identitydbconfiguration.ps1

## Installing OpenLM SLM Using DEB

1. Copy the Debian Package to your server.

2. Use apt binaries to install it. Run the below-mentioned command:

- sudo apt install ./[DebName]

![](/img/legacy/word-image-180.png)  
![](/img/legacy/word-image-181.png)

3. Configure the database access.

![](/img/legacy/word-image-182.png)

![](/img/legacy/word-image-183.png)

The following lines files will appear:

![](/img/legacy/word-image-184.png)

4. Check that the OpenLM service is running. Command mentioned below:

-sudo service openlm status

![](/img/legacy/word-image-185.png)

5. Copy the license file to **/opt/openlm/license**. Command mentioned below:

-  sudo cp [LicenseFileName] /opt/openlm/license/[LicenseFileName]

6. Connect to OpenLM SLM Interface:

Link: **http://[hostname]:5015** in a web browser. Here, hostname is the hostname of the server where the OpenLM SLM is installed.

## Installing Identity Service Using DEB

1. Copy Debian (DEB) package to your server.

2. Use apt binaries to install it. Run the below-mentioned command.

- sudo apt install ./[DebName]

![](/img/legacy/word-image-186.png)  
![](/img/legacy/word-image-187.png)

3. Configure the database access.

![](/img/legacy/word-image-188.png)

![](/img/legacy/word-image-189.png)

4. Choose the Identity server port (5000 by default, press enter).

![](/img/legacy/word-image-190.png)

Database created:  
![](/img/legacy/word-image-191.png)

5. Connect to the Identity Web Browser with: `http://[FQDN]:[Port].` Here, FQDN means Fully Qualified Domain Name.

**Note**: In case a blank page appears, it means the correct FQDN is not used.

## Useful DEB specific Linux commands

To install and upgrade the Debian package and its configuration files from your system, run the command: sudo apt install ./[DEBNAME] (same command line to be used for upgrade).

To remove the Debian package and its configuration files from your system, run the command: Sudo apt purge [DEBNAME]

## Installing OpenLM SLM using TAR

To install OpenLM SLM:

1. Download TAR installation file on your machine (for example, in the Downloads folder).

2. Open WinSCP and connect it to Linux machine.

![](/img/legacy/word-image-192.png)

3. Login using your login credentials, and drag and drop the downloaded TAR file from your machine to the Linux machine.

4. After the copying process is complete, return to Putty and run the below-mentioned commands:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

![](/img/legacy/word-image-193.png)

cd [destination]

sudo /bin/bash ./installer.sh

![](/img/legacy/word-image-194.png)

5. When the window with database configuration opens, create a new empty database in your preferred database provider.

![](/img/legacy/word-image-195.png)

![](/img/legacy/word-image-196.png)

Indicate the created database in Putty, click **Test Connection** and **Approve** button.

![](/img/legacy/word-image-197.png)

The following lines file will appear:

![](/img/legacy/word-image-198.png)

6. Add the license to your OpenLM SLM.

**![](/img/legacy/word-image-199.png)**

OR

In Putty, go to OpenLM folder using this command: cd /opt/openlm

Go to WinSCP, and drag and drop the license file from your machine to the Linux machine to the /opt/openlm/license folder.

![](/img/legacy/word-image-200.png)

Restart the OpenLM service to apply the license. Run the below-mentioned command to restart the OpenLM service:

sudo service openlm restart

OR

sudo systemctl restart openlm

The OpenLM installation is now completed. The OpenLM SLM on the Linux Machine is available via the link: http://[IP|Hostname]:5015 in the browser.

![](/img/legacy/word-image-201.png)

## Installing Identity Service using TAR

To install the Identity Service:

1. Copy the Identity Service TAR file. Move it to the Linux machine via WinSCP and install it.

Run the below-mentioned commands:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

![](/img/legacy/word-image-202.png)

cd [destination]

sudo /bin/bash ./installer.sh

![](/img/legacy/word-image-203.png)

2. Create a new database and indicate this database during the Identity Service installation.

![](/img/legacy/word-image-204.png)

![](/img/legacy/word-image-205.png)

3. Choose the identity server port (default 5000, press enter).

![](/img/legacy/word-image-206.png)

![](/img/legacy/word-image-207.png)

4. Open Identity Service via the link: **http://[FQDN]:5000**. Here, FQDN means Fully Qualified Domain Name.

![](/img/legacy/word-image-208.png)

Connect it to the OpenLM SLM. Run the below-mentioned command to restart the OpenLM service (the account should exist in OpenLM SLM):

sudo service openlm restart

OR

sudo systemctl restart openlm

**![](/img/legacy/word-image-209.png)**

![](/img/legacy/word-image-210.png)

Use the following command as shown in the screen below to check that the "Auth" section is filled by the connection process above in the OpenLM config file.

![](/img/legacy/word-image-211.png)

## Useful TAR specific Linux commands

**tar -xvf [Tarfile] -C [DestinationFolder]:** In this command, -xvf means extraction with force overwrite and verbose mode. -C defines a custom extraction path.

**sudo /bin/bash ./install.sh:** This command opens a bash process running the installer.sh script.

**sudo ps -aux | grep openlm:** To list the processes that are currently opened and filter the one containing the OpenLM pattern.

## Acronyms

**FQDN** - Fully Qualified Domain Name
