---
title: OpenLM SLM and Identity Service Installation on Linux using RPM, DEB, and TAR Packages
sidebar_position: 2
description: Step-by-step guide to install OpenLM SLM and Identity Service on Linux using RPM, DEB, and TAR packages.
---


I cannot access the images you have provided. However, I can format the document for you.

Requirements
OpenLM SLM and Identity Service have the following Linux package dependencies:

SLM: systemd, redhat-lsb, libgdiplus, dotnet core, powershell core

Identity Service: systemd, dotnet core, powershell core

You will also need tools like PuTTY and WinSCP to interact with the Linux machine from a Windows machine. PuTTY uses the SSH protocol, and WinSCP uses the SCP protocol.

Connect to a Linux machine using PuTTY
To connect, enter the Linux machine's hostname or IP address in the PuTTY session window and click Open. Log in using your credentials and system password.

To check for existing OpenLM applications:

For RPM: sudo rpm -qa | grep openlm

For DEB: sudo apt list --installed | grep openlm

For Tar.Gz: sudo ps -aux | grep openlm or ls /etc/systemd/system or ls /opt

If no information is returned, no OpenLM applications are installed.

Installing OpenLM SLM using RPM
Download the RPM installation file.

Open WinSCP and connect to the Linux machine. Log in and drag and drop the RPM file from your local machine to the Linux machine.

In PuTTY, run the installation command. If your distribution uses yum, you can automatically install all dependencies with sudo yum install [RPMFILE]. Otherwise, use sudo rpm -i [RPMFILE] (e.g., sudo rpm -i openlm_server-21.6.9-937.x86_64.rpm).

When prompted for database configuration, create a new empty database in your preferred provider (MS SQL Server, MySQL, or MariaDB). Provide the server name, database name, and user credentials. Click Test Connection and Approve.

Add the license file to your OpenLM SLM. Copy the license file to the /opt/openlm/license folder.

Restart the OpenLM service to apply the license: sudo service openlm restart or sudo systemctl restart openlm.

The OpenLM SLM is now accessible at http://[IP|Hostname]:5015 in a web browser.

Installing Identity Service using RPM
Copy the Identity Service RPM file to the Linux machine using WinSCP and install it.

Create a new database and indicate it during the installation.

Choose the Identity Service port (default is 5000).

Open the Identity Service via http://[FQDN]:5000 and connect it to the OpenLM SLM.

Restart the OpenLM service.

Useful RPM-specific Linux commands
Install: sudo rpm -i [RPMFILE] or sudo yum install [RPMFILE]

Upgrade: sudo rpm -U [RPMFILE] or sudo yum update [RPMFILE]

Uninstall: sudo rpm -qa | grep openlm then sudo rpm -e [name]

Restart Service: sudo service openlm restart

Installing OpenLM SLM using DEB
Copy the Debian package to your server.

Use sudo apt install ./[DebName] to install it.

Configure the database access.

Check that the OpenLM service is running with sudo service openlm status.

Copy the license file to /opt/openlm/license with sudo cp [LicenseFileName] /opt/openlm/license/[LicenseFileName].

Connect to the OpenLM SLM interface at http://[hostname]:5015.

Installing Identity Service using DEB
Copy the Debian package to your server.

Use sudo apt install ./[DebName] to install it.

Configure the database access.

Choose the Identity server port (default is 5000).

Connect to the Identity Web Browser with http://[FQDN]:[Port].

Useful DEB-specific Linux commands
Install/Upgrade: sudo apt install ./[DEBNAME]

Remove: sudo apt purge [DEBNAME]

Installing OpenLM SLM using TAR
Download the TAR file and copy it to the Linux machine using WinSCP.

In PuTTY, extract the archive using sudo tar -xvf [TARname].

Navigate to the extracted directory and run the installer script with sudo /bin/bash ./installer.sh.

When prompted for database configuration, create and indicate a new empty database.

Copy the license file to /opt/openlm/license and restart the OpenLM service.

The OpenLM SLM is now available via http://[IP|Hostname]:5015 in a web browser.

Installing Identity Service using TAR
Copy the Identity Service TAR file to the Linux machine using WinSCP.

Extract the archive and run the installer script.

Create a new database and indicate it during installation.

Choose the identity server port (default is 5000).

Open the Identity Service via http://[FQDN]:5000 and connect it to the OpenLM SLM.

Useful TAR-specific Linux commands
tar -xvf [Tarfile] -C [DestinationFolder]: Extracts the archive to a custom path.

sudo /bin/bash ./install.sh: Runs the installer script.

sudo ps -aux | grep openlm: Lists processes containing the "openlm" pattern.

Acronyms
FQDN: Fully Qualified Domain Name