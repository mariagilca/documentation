---
title: "OpenLM usability report files"
date: "2017-02-14T20:12:50"
permalink: "https://www.openlm.com/docs/openlm-usability-report-files/"
posttype: "manual_documentation"
id: "7614"
---

<h2><a id="post-26349-_kh8ex0vr98k4"></a>General</h2>
OpenLM deals with pieces of license usage information that originate from multiple sources, and may prove contradictory to each other. We apply our hard-earned experience to reconcile such contradictions, and to present valid license usage reports.

 
<h2><a id="post-26349-_47wh35fok8dn"></a>Usability reports</h2>
In the event that such a contradiction is encountered, a usability report file will be created, and the EasyAdmin User Interface web application will present it as a system message (envelope icon), as shown below.

<img class="wp-image-39071" src="https://www.openlm.com/docs/wp-content/uploads/2017/02/word-image-26349-1.png" />

The user will be prompted to download the report and send it by mail to the OpenLM support team, at support@openlm.com

Usability report files will be saved in the download folder as zip files, and their name will contain the day of week; e.g.: <strong>usability_report_sunday.zip</strong>.

The system notification (envelope icon) indication will persist as long as zipped usability report files exist in the download folder.

 
<h2>Files policies</h2>
The OpenLM Server implements the following policy on the downloaded usability report files:
<ol>
 <li>Usability report files will be kept in the folder for 3 days.</li>
 <li>There will be no more than 2 reports downloaded per day.</li>
 <li>The size of zipped files are not expected to exceed a few Megabytes.</li>
</ol>
In case the EasyAdmin user chooses to designate a folder other than the default for downloading usability report files, they would need to ensure the OpenLM Server service possesses the appropriate access permissions to the said folder.

 
<h2><a id="post-26349-_bmdit7fvaksu"></a>Email notification</h2>
Administrators may be notified regarding the existence of report files to be downloaded through email. The email account for such notifications is set up through EasyAdminUser Interface via <strong>Start → Administration → Email </strong>window, as depicted below.

<img class="alignnone wp-image-53949 size-full" src="https://www.openlm.com/docs/wp-content/uploads/2017/02/Screenshot-2023-01-24-at-21.39.17.png" alt="" width="2558" height="1330" />
