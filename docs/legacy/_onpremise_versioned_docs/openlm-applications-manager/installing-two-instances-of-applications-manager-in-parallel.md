---
title: "Installing two instances of Applications Manager in parallel"
date: "2023-11-04T22:38:48"
permalink: "https://www.openlm.com/docs/openlm-applications-manager-installation-guide/installing-two-instances-of-applications-manager-in-parallel/"
posttype: "manual_documentation"
id: "6604"
---

<span style="font-weight: 400;">The following document describes how to install 2 different instances of Applications Manager in parallel on the same Windows machine.</span>

 
<h2><span style="font-weight: 400;">General overview of the procedure</span></h2>
<span style="font-weight: 400;">Installation of parallel Applications Manager entails the following:</span>
<ul>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Setting up 2 different ports (for example 27080 and 27081) for each Applications Manager on OpenLM Workstation Agent and Broker;</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Creation of a new folder, copying contents of existing Applications Manager settings, and adjusting them.</span></li>
</ul>
 
<h2><span style="font-weight: 400;"> Setting up the Applications Manager application </span></h2>
<ol>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Set up a machine with Applications Manager up and running.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Stop the Applications Manager Service.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Create a new folder named </span><b>OpenLM App Manager2</b><span style="font-weight: 400;"> in C:Program Files OpenLM. </span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Copy contents of </span><b><i>C:Program Files OpenLMOpenLM App Manager</i></b><span style="font-weight: 400;"> to </span><b><i>C:Program Files OpenLMOpenLM App Manager2</i></b><span style="font-weight: 400;">.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;">Open </span><b>Openlm-app-manager.properties</b><span style="font-weight: 400;"> file in the </span><b>OpenLM App Manager2 </b><span style="font-weight: 400;">folder.</span></li>
 <li style="font-weight: 400;">Set the port=27081.</li>
 <li style="font-weight: 400;">Make sure that all other settings are correct in this file.</li>
 <li style="font-weight: 400;">Save this file.</li>
 <li style="font-weight: 400;">Rename <b>OpenLMLicenseManager.exe</b><span> to </span><b>OpenLMLicenseManager2.exe </b><span>in </span><b>Bin </b><span>folder.</span></li>
 <li style="font-weight: 400;">Rename <b>OpenLMLicenseManager_x86.exe </b><span>to </span><b>OpenLMLicenseManager2.exe.</b></li>
 <li style="font-weight: 400;">Edit <b>Uninstall Service.bat</b><span> file in the same folder to "</span><b>OpenLMLicenseManager2_x86.exe</b><span>" //DS//</span><b>OpenLMLicenseManager2</b></li>
 <li style="font-weight: 400;"><b>Install<i> Service.bat</i></b><span> file in the same folder </span><b>Bin </b><span>should look like the one below. Changes made to the original file are highlighted in bold:
@SET LOG_DIR="%~dp0..logs" <b>"OpenLMLicenseManager2.exe" //IS//OpenLMLicenseManager2 </b>--DisplayName="<b>OpenLM App Manager2</b>"^ --Description="<b>OpenLM App Manager2</b>"^ --Install="<b>%~dp0OpenLMLicenseManager2.exe</b>"^ --Jvm="C:Program FilesOpenLM<b>OpenLM App Manager2</b>jrebinserverjvm.dll" --StartMode=jvm --StopMode=jvm --Startup=auto --Classpath=openlm-app-manager-1.8.3.jar^ --StartClass=com.openlm.shadowlm.Main --StartMethod=start^ --JvmOptions=-Djava.net.preferIPv4Stack=true;-Dlog4j.configuration=file:log4j.properties;-Dopenlm.log.dir=%LOG_DIR%^ --StopClass=com.openlm.shadowlm.Main --StopMethod=stop^ --StdOutput=auto --StdError=auto --StartPath "%~dp0.."^ --LogPath=%LOG_DIR% --LogPrefix=openlm-app-manager
</span></li>
 <li style="font-weight: 400;">Double click <b>OpenLMLicenseManager2.exe</b> and set it to proper Java Runtime Environment.10. Now run the <b><i>InstallService.bat</i></b> file and verify if a new Service <b>OpenLM App Manager2</b> was created in Windows Services.
<img class="alignnone" src="https://www.openlm.com/wp-content/uploads/2018/09/installing-2-app-managers-006.png" alt="OpenLM Applications Manager" width="858" height="467" /></li>
 <li style="font-weight: 400;"> Open <b><i>lmstat.bat </i></b><span>file in the </span><b>OpenLM App Manager 2 </b><span>folder and set </span><b>port=27080</b><span> to </span><b>port=27081 </b><span>(port number is set as example. The port should be the same as in step 5</span><b>).</b></li>
 <li style="font-weight: 400;">After these steps there will be 2 parallel instances of Applications Manager with the same database. It is recommended to delete existing database for the newly added Applications Manager.</li>
 <li style="font-weight: 400;">Go to <b>Windows Services</b><span> and start OpenLM App Manager and OpenLM App Manager2 services.
<img class="alignnone" src="https://www.openlm.com/wp-content/uploads/2018/09/installing-2-app-managers-007.png" alt="OpenLM Applications Manager" width="861" height="592" />
</span></li>
</ol>
 

 
<h2><span style="font-weight: 400;">Setting up OpenLM Broker </span></h2>
<ol>
 <li><span style="font-weight: 400;">Open the Broker.</span></li>
 <li style="font-weight: 400;"><span style="font-weight: 400;"><span style="font-weight: 400;">Add a new Applications Manager License Manager port 27081.
</span></span><b>Note</b><span style="font-weight: 400;">: You will also have to copy the License file from the original AppManager (C:Program Files OpenLMOpenLM App Managerlicense) into new AppManager...license folder. </span></li>
 <li style="font-weight: 400;"><span>Go to </span><b>Commands </b><span>menu under </span><b>Port 27081 </b><span>and set path for commands to </span><i><span>C:Program Files OpenLMOpenLM App Manager2 </span></i><span>in both commands menus:</span></li>
 <li><span style="font-weight: 400;"> Click the </span><b><i>Update </i></b><span style="font-weight: 400;">button to save changes.</span></li>
 <li>Set log file path under <b>Log Files </b>menu to <b><i>C:Program Files OpenLMOpenLM App Manager2logslm-log.log</i></b>:</li>
 <li><span style="font-weight: 400;"> Press </span><b><i>Apply </i></b><span style="font-weight: 400;">button and then </span><b><i>Restart Broker</i></b><span style="font-weight: 400;">. </span></li>
 <li><span style="font-weight: 400;"> Click on the </span><b>status </b><span style="font-weight: 400;">command for added port 27081.</span></li>
 <li>Click <b>Execute </b>button.</li>
 <li><span style="font-weight: 400;"> Make sure that you get successful response in the form:
<SERVER name="..." port="27081" request_time_utc="..." server_status="ok"/></span></li>
 <li>In case you get a similar error message please <a href="https://www.openlm.com/contact-tech-support/"><span>contact OpenLM support</span></a><span>:</span></li>
</ol>
 
<h2><span style="font-weight: 400;">Setting up the License Server</span></h2>
<ol>
 <li><span style="font-weight: 400;">Run the </span><b>OpenLM SLM </b>configuration <span style="font-weight: 400;">tool from </span><b>Windows Start menu</b><span style="font-weight: 400;">, press </span><b>License Servers </b><span style="font-weight: 400;">menu and click </span><b><i>Add Server</i></b><span style="font-weight: 400;">:</span></li>
 <li><span style="font-weight: 400;"> Select </span><b>OpenLM Applications Manager</b><span style="font-weight: 400;"> type from drop-down menu. </span></li>
 <li><span style="font-weight: 400;"> Type in the same Hostname and Port as Host Name/IP and port in </span><b>OpenLM Broker</b><span style="font-weight: 400;"> application and insert </span><b>Port 27081 </b><span style="font-weight: 400;">(as example).</span></li>
 <li><span style="font-weight: 400;"> Press </span><b><i>Apply </i></b><span style="font-weight: 400;">button and restart now.</span></li>
</ol>
 
<h2><span style="font-weight: 400;">Viewing 2 Applications Managers in the OpenLM User Interface</span></h2>
<ol>
 <li><span style="font-weight: 400;">Before viewing 2 instances of Applications Manager, go to </span><b>Windows Services</b><span style="font-weight: 400;"> and start the services OpenLM App Manager and OpenLM App Manager2 </span></li>
 <li>Then go to <b>OpenLM User Interface ->Start->Administration </b>and click <b>OpenLM Applications Manager</b>:</li>
 <li>In the opened window there will be two parallel Applications Managers in the left part of the screen:</li>
</ol>
 
