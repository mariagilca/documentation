---
title: "Directory Sync Installation Guide"
date: "2023-11-04T23:20:40"
permalink: "https://www.openlm.com/docs/directory-sync-installation-guide/"
posttype: "manual_documentation"
id: "6622"
---

<h2 id="post-34440-_1bwtoivrqv9g" class="betterdocs-content-heading">Prerequisites</h2>
<ul>
 <li>OpenLM SLM 21 or higher.</li>
 <li>A license file that has support for the Directory Sync extension (contact sales@openlm.com if unsure).</li>
 <li>If installing DSS and DSA on a machine separate from OpenLM SLM, make sure that the machine is on the same network as the AD domain controller.</li>
 <li>A designated schema in any supported database – <strong>MariaDB, MS SQL, My SQL.
</strong></li>
</ul>
<h2>Directory Synchronization Service Installation</h2>
1. Get the latest version of DSS from the<a href="https://www.openlm.com/download/"> OpenLM Downloads</a> page. Double-click to run the installer.

<img class="wp-image-38467" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-2.png" />

2. Check the “<strong>I agree to the license terms and conditions”</strong> box and click <strong>Next</strong>.

3. In the next prompt you will be asked to select the database type that you want to use. Select it from the dropdown list and click <strong>Next</strong>. If you are upgrading and require to migrate data, go to step<a href="https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/#post-34440-_7lb0bznwhkg0"> 4.2</a>

<img class="wp-image-38468" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-3.png" />

4. Provide the database configurations details then click <strong>Next:</strong>

<strong>Note this prompt may be slightly different, depending on the DB type used.</strong>

<strong><img class="wp-image-38469" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-4.png" /></strong>

5. You can change the installation folder if you want. The default one is C:Program FilesOpenLMOpenLM Directory Sync (DSS) Service . Click <strong>Next</strong>.

<img class="wp-image-38470" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-5.png" />

6. Once the setup is complete, click <strong>Finish</strong>. This will close the Setup Wizard and open the DSS user interface in your browser.

<img class="wp-image-38471" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-6.png" />
<h2>Directory Synchronization Agent Installation</h2>
1. Get the latest version of DSA from the<a href="https://www.openlm.com/download/"> OpenLM Downloads</a> page. Double-click to run the installer.

<img class="wp-image-38487" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-22.png" />

2. Check the “<strong>I agree to the license terms and conditions”</strong> box and click <strong>Next</strong>.

3. Enter a descriptive name (no spaces allowed) to recognize the Agent instance and the details of the DSS installation (found in the <strong>Directory Sync UI → Service Configuration</strong> tab under DSS Server), then select your Server version: On-premise or Cloud. Click <strong>Next</strong>.

<img class="wp-image-38488" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-23.png" />

4. The next prompt will require you to authorize. You can skip this step if you don’t use Identity Service.

<img class="wp-image-38489" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-24.png" />

5. To obtain the Authorization file go to <strong>EasyAdmin</strong> and follow the path: <strong>Start→Administration→System&Security→Security→Authorization→Add</strong>

<strong><img class="wp-image-38490" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-25.png" /></strong>

6. Select the Client type from the drop-down list – DSA. Click <strong>Save.</strong>

<strong>(</strong><em>Note the Secret Key will only be displayed once. Please make sure to save it before closing the window</em><strong>).</strong>

7. Copy or Download the JSON file with the Client ID and Client Secret:

<img class="wp-image-38491" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-26.png" />

8. Go back to the installation process and import or copy&paste the credentials:

<img class="wp-image-38492" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-27.png" />

9. You can change the installation folder if you want. Enter the path or click <strong>Browse, </strong>then click <strong>Next </strong>when completed.

<img class="wp-image-38493" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-28.png" />

10. Once the setup is complete, click <strong>Finish</strong>. At this point, a DSA approval request will have been sent to the DSS. You need to open the DSS user interface and go to the Agent Manager tab to approve it.
<img class="wp-image-38494" src="https://www.openlm.com/wp-content/uploads/2022/01/word-image-34440-29.png" />

When completed, follow <a href="https://www.openlm.com/knowledge-base/directory-synchronization-comprehensive-guide-v21-and-higher/">this guide</a> to configure your Directory Sync Instance.
