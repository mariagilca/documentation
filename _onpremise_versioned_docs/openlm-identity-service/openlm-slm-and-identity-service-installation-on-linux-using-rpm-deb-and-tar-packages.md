---
title: "OpenLM SLM and Identity Service Installation on Linux using RPM, DEB, and TAR Packages"
date: "2023-11-03T14:15:12"
permalink: "https://www.openlm.com/docs/openlm-identity-service-installation-guide/openlm-slm-and-identity-service-installation-on-linux-using-rpm-deb-and-tar-packages/"
posttype: "manual_documentation"
id: "6560"
---

This document describes the steps required to install the OpenLM SLM  and Identity Service in a Linux machine using RPM, DEB, and TAR packages
<h2><a id="post-33504-_heading=h.egzdck5lzuji"></a>Requirements</h2>
 

Linux Package Dependencies:

<strong>SLM</strong>: systemd, redhat-lsb, libgdiplus, dotnet core, powershell core

<strong>Identity Service</strong>: systemd, dotnet core, powershell core

Software as Putty and WinSCP software are the prerequisites for the OpenLM SLM installation. These are Windows-only tools and are needed to interact with the Linux machine from the Windows machine. You can use any tool apart from Putty / WinSCP that can open a console and copy a file to a Linux machine. Protocols: Putty (SSH protocol), WinSCP (SCP protocol).
<h2><a id="post-33504-_heading=h.43e46iw8ip28"></a>Connect to a Linux Machine using Putty</h2>
 

To connect to a Linux machine using Putty, add the Linux machine address in the Putty session window. Enter the hostname and IP address of the Linux machine to connect to. Click the <strong>Open</strong> button after entering the required details.

<img class="wp-image-33667" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-159.png" />

Connect to the Linux machine using your login credentials, enter your system password:

<img class="wp-image-33668" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-160.png" />

<strong>For RPM</strong>: Type the below-mentioned command to check if you have any OpenLM applications installed:

sudo rpm -qa | grep openlm

In case no information is returned that means no OpenLM applications are installed.

<strong>For DEB</strong>: Type the below-mentioned command to check if you have any OpenLM applications installed:

sudo apt list --installed | grep openlm

<strong>For Tar.Gz</strong>: Type the below-mentioned command to check if you have any OpenLM applications installed:

sudo ps -aux | grep openlm

OR

ls /etc/systemd/system

OR

ls /opt

In case no relevant information is returned that means no OpenLM applications are installed.

<strong>Note</strong>: In case you encounter a display glitch with the putty console, open the CMD windows and use the below command:

ssh [user]@[IP|Hostname]

 
<h2>Installing the OpenLM SLM Using RPM</h2>
 

To install the OpenLM SLM:

1. Download the RPM installation file on your machine (for example, in the Downloads folder).

2. Open WinSCP and connect it to the Linux machine.

<img class="wp-image-33669" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-161.png" />

3. Login using your login credentials, and drag and drop the downloaded RPM file from your machine to the Linux machine.

<strong>Note</strong>: There are some dependencies included in the RPM package. To install all these dependencies automatically, use the below-mentioned command if your distribution include yum:

sudo yum install [RPMFILE]

Otherwise, after the copying process is complete, return to Putty and run the below-mentioned command:

sudo rpm -i [RPMFILE]
(for example, sudo rpm -i openlm_server-21.6.9-937.x86_64.rpm)

<strong>Note</strong>: To check the dependencies with RPM, use the commands:

rpm -qp [RPMFILE] --provides

rpm -qp [RPMFILE] --requires

<img class="wp-image-33670" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-162.png" />

4. When the window with database configuration opens, create a new empty database in your preferred database provider.

<strong>Note</strong>: The following databases are compatible: MS SQL Server, MySQL, MariaDB.

<img class="wp-image-33671" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-163.png" />

<img class="wp-image-33672" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-164.png" />

Provide the server name, database name, and user credentials (User ID and Password), click <strong>Test Connection</strong> and <strong>Approve</strong> button.

<img class="wp-image-33673" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-165.png" />

<img class="wp-image-33674" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-166.png" />

This message confirms that the installation process is done.

5. Add the license to your OpenLM SLM.

Direct cp command into /opt/openlm/license folder.

<img class="wp-image-33675" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-167.png" />

<strong>OR</strong>

In Putty, go to the OpenLM folder using this command: cd /opt/openlm

Go to WinSCP, and drag and drop the license file from your machine to the Linux machine to the /opt/openlm/license folder.

<img class="wp-image-33676" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-168.png" />

Restart the OpenLM service to apply the license. Run the below-mentioned command to restart the OpenLM service:

sudo service openlm restart

OR

sudo systemctl restart openlm

The OpenLM installation is now completed. The OpenLM SLM on the Linux Machine is available via the link: <strong> http://[IP|Hostname]:5015</strong> in the browser.

<img class="wp-image-33677" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-169.png" />
<h2>Installing the Identity Service using RPM</h2>
 

To install the Identity Service:

1. <a id="post-33504-_heading=h.3znysh7"></a>Copy Identity Service RPM file. Move it to the Linux machine via WinSCP and install it.

<img class="wp-image-33678" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-170.png" />
<img class="wp-image-33679" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-171.png" />

2. Create a new database and indicate this database during the Identity Service installation.

<img class="wp-image-33680" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-172.png" />

<img class="wp-image-33681" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-173.png" />

3. Choose the Identity Service port (default 5000, press enter).

<img class="wp-image-33682" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-174.png" />

<img class="wp-image-33683" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-175.png" />

4. Open Identity Service via the link: http://[FQDN]:5000. Here, FQDN means Fully Qualified Domain Name.

<img class="wp-image-33684" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-176.png" />

Connect it to the OpenLM SLM.

<img class="wp-image-33685" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-177.png" />

Run the below-mentioned command to restart the OpenLM service (the account should exist in the OpenLM SLM):

sudo service openlm restart

OR

sudo systemctl restart openlm

<strong><img class="wp-image-33686" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-178.png" /></strong>

OpenLM SLM appsettings.json: To check that the configuration is fine, use the command:

cat /opt/openlm/bin/appsettings.json

<strong><img class="wp-image-33687" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-179.png" />
</strong>

The<strong> Client Secret</strong> and <strong>Authority</strong> field should be filled with the <strong>EnableSecurity</strong> field as <strong>True</strong>.

 
<h2>Useful RPM Specific Linux Sudo Commands</h2>
 

<strong>To Install the RPM:</strong>

sudo rpm -i [RPMFILE]

OR

sudo yum install [RPMFILE]

<strong>To Upgrade the RPM:</strong>

sudo rpm -U [RPMFILE]

OR

sudo yum update [RPMFILE]

<strong>To Uninstall:</strong>

<strong>To check installed OpenLM items: </strong>sudo rpm -qa | grep openlm

<strong>To uninstall one of the installed items:</strong> sudo rpm -e [name]

<strong>To Repair:</strong>

sudo rpm -i --replacepkgs [PackageNAme]

<strong>OpenLM SLM:</strong>

sudo cp [YourLicenseFile] /opt/openlm/license/

<strong>Restart Service</strong>

sudo service openlm restart

<strong>Optional Tool Server:</strong>

<strong>DB Configuration:</strong>

sudo pwsh /opt/openlm/tools/postinstall/start-serverdbconfiguration.ps1

<strong>All DB Upgrade:</strong>

sudo pwsh /opt/openlm/tools/postinstall/start-alldbupgradeapi.ps1

<strong>Optional Tool Identity Service: </strong>

<strong>DB Configuration:</strong>

sudo /opt/securityservice/tools/postinstall/start-identitydbconfiguration.ps1
<h2>Installing the OpenLM SLM Using DEB</h2>
 

1. Copy the Debian Package to your server.

2. Use apt binaries to install it. Run the below-mentioned command:

- sudo apt install ./[DebName]

<img class="wp-image-33688" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-180.png" />
<img class="wp-image-33689" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-181.png" />

3. Configure the database access.

<img class="wp-image-33690" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-182.png" />

<img class="wp-image-33691" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-183.png" />

The following lines files will appear:

<img class="wp-image-33692" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-184.png" />

4. Check that the OpenLM service is running. Command mentioned below:

-sudo service openlm status

<img class="wp-image-33693" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-185.png" />

5. Copy the license file to <strong>/opt/openlm/license</strong>. Command mentioned below:

-  sudo cp [LicenseFileName] /opt/openlm/license/[LicenseFileName]

6. Connect to OpenLM SLM Interface:

Link:<strong> http://[hostname]:5015</strong> in a web browser. Here, hostname is the hostname of the server where the OpenLM SLM is installed.
<h2>Installing the Identity Service Using DEB</h2>
 

1. Copy the Debian (DEB) package to your server.

2. Use apt binaries to install it. Run the below-mentioned command.

- sudo apt install ./[DebName]

<img class="wp-image-33694" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-186.png" />
<img class="wp-image-33695" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-187.png" />

3. Configure the database access.

<img class="wp-image-33696" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-188.png" />

<img class="wp-image-33697" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-189.png" />

4. Choose the Identity server port (5000 by default, press enter).

<img class="wp-image-33698" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-190.png" />

Database created:
<img class="wp-image-33699" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-191.png" />

5. Connect to the Identity Web Browser with: http://[FQDN]:[Port]. Here, FQDN means Fully Qualified Domain Name.

<strong>Note</strong>: In case a blank page appears, it means the correct FQDN is not used.
<h2>Useful DEB Specific Linux Commands</h2>
 

To install and upgrade the Debian package and its configuration files from your system, run the command: sudo apt install ./[DEBNAME] (same command line to be used for upgrade).

To remove the Debian package and its configuration files from your system, run the command: Sudo apt purge [DEBNAME]

 
<h2>Installing the OpenLM SLM Using TAR</h2>
 

To install the OpenLM SLM:

1. Download the TAR installation file on your machine (for example, in the Downloads folder).

2. Open WinSCP and connect it to the Linux machine.

<img class="wp-image-33700" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-192.png" />

3. Login using your login credentials, and drag and drop the downloaded TAR file from your machine to the Linux machine.

4. After the copying process is complete, return to Putty and run the below-mentioned commands:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

<img class="wp-image-33701" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-193.png" />

cd [destination]

sudo /bin/bash ./installer.sh

<img class="wp-image-33702" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-194.png" />

5. When the window with database configuration opens, create a new empty database in your preferred database provider.

<img class="wp-image-33703" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-195.png" />

<img class="wp-image-33704" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-196.png" />

Indicate the created database in Putty, click <strong>Test Connection</strong> and <strong>Approve</strong> button.

<img class="wp-image-33705" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-197.png" />

The following lines file will appear:

<img class="wp-image-33706" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-198.png" />

6. Add the license to your OpenLM SLM.

<strong><img class="wp-image-33707" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-199.png" /></strong>

OR

In Putty, go to OpenLM folder using this command: cd /opt/openlm

Go to WinSCP, and drag and drop the license file from your machine to the Linux machine to the /opt/openlm/license folder.

<img class="wp-image-33708" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-200.png" />

Restart the OpenLM service to apply the license. Run the below-mentioned command to restart the OpenLM service:

sudo service openlm restart

OR

sudo systemctl restart openlm

The OpenLM installation is now completed. The OpenLM SLM on the Linux Machine is available via the link: http://[IP|Hostname]:5015 in the browser.

<img class="wp-image-33709" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-201.png" />

 
<h2>Installing the Identity Service Using TAR</h2>
 

To install the Identity Service:

1. Copy the Identity Service TAR file. Move it to the Linux machine via WinSCP and install it.

Run the below-mentioned commands:

sudo tar -xvf [TARname]

OR

sudo tar -xvf [TARname] -C [destination]

<img class="wp-image-33710" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-202.png" />

cd [destination]

sudo /bin/bash ./installer.sh

<img class="wp-image-33711" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-203.png" />

2. Create a new database and indicate this database during the Identity Service installation.

<img class="wp-image-33712" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-204.png" />

<img class="wp-image-33713" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-205.png" />

3. Choose the identity server port (default 5000, press enter).

<img class="wp-image-33714" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-206.png" />

<img class="wp-image-33715" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-207.png" />

4. Open Identity Service via the link: <strong>http://[FQDN]:5000</strong>. Here, FQDN means Fully Qualified Domain Name.

<img class="wp-image-33716" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-208.png" />

Connect it to the OpenLM SLM. Run the below-mentioned command to restart the OpenLM service (the account should exist in OpenLM SLM):

sudo service openlm restart

OR

sudo systemctl restart openlm

<strong><img class="wp-image-33717" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-209.png" /></strong>

<img class="wp-image-33718" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-210.png" />

Use the following command as shown in the screen below to check that the “Auth” section is filled by the connection process above in the OpenLM config file.

<img class="wp-image-33719" src="https://www.openlm.com/wp-content/uploads/2021/11/word-image-211.png" />

 
<h2>Useful TAR Specific Linux Commands</h2>
 

<strong> tar -xvf [Tarfile] -C [DestinationFolder]:</strong> In this command, -xvf means extraction with force overwrite and verbose mode. -C defines a custom extraction path.

<strong>sudo /bin/bash ./install.sh:</strong> This command opens a bash process running the installer.sh script.

<strong>sudo ps -aux | grep openlm: </strong>To list the processes that are currently opened and filter the one containing the OpenLM pattern.

 
<h2>Acronyms</h2>
 

<strong>FQDN</strong> - Fully Qualified Domain Name
