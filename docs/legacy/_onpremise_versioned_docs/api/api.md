---
title: "API"
date: "2025-05-26T16:03:18"
permalink: "https://www.openlm.com/docs/api/"
posttype: "manual_documentation"
id: "6977"
---

<div class="elementor-element elementor-element-e945905 elementor-widget elementor-widget-betterdocs-title" data-id="e945905" data-element_type="widget" data-widget_type="betterdocs-title.default">
<h2 id="betterdocs-entry-title" class="betterdocs-entry-title">OpenLM V2x REST API</h2>
</div>
<div class="elementor-element elementor-element-585577c elementor-widget elementor-widget-betterdocs-content" data-id="585577c" data-element_type="widget" data-widget_type="betterdocs-content.default">
<div class="betterdocs-entry-content ">
<div id="betterdocs-single-content" class="betterdocs-content">

REST API development has been settled down in V21.12.

Here are the critical points for v4.x and v5.x API users.
<ul>
 <li>v4.x Old XML/SOAP API is no longer supported in v5.6 and v21.12 and above.</li>
 <li>Some XML/SOAP methods are still usable using the following URL.
/OpenLM.Server.Services​/AdminAPI​/web​/{adminApiMethod}
However, there is no guarantee. We change the contents internally.</li>
 <li>Some of the v5.x REST APIs were changed in V21.12 and higher.</li>
 <li>Swagger API Lists are all the APIs for customer use and documents.
<a href="http://localhost:5015/swagger/index.html" target="_blank" rel="noopener">HTTP(s)://fqdn:5015/swagger/index.html</a></li>
</ul>
<h2 id="post-41988-_7watsmpo6exv" class="betterdocs-content-heading"><a id="post-41988-_7watsmpo6exv"></a>How to Use Postman</h2>
<a href="https://youtu.be/kqgL-WtDGSA" target="_blank" rel="noopener">Video
</a><a href="https://www.openlm.com/wp-content/uploads/2022/02/v21-APIs-for-example.postman_collection.zip">CSV for Import</a>

Note: If you are not using Identity Service Security Mode, you can access it without Bearer Token.
You don’t need to get Token from Identity Service.
<h2 id="post-41988-_bnxz7d5vfvei" class="betterdocs-content-heading"><a id="post-41988-_bnxz7d5vfvei"></a>Sample Code</h2>
<a href="https://cdn.openlm.com/wp-content/uploads/2022/10/Program.cs_.pdf" target="_blank" rel="noopener">C#</a>

Note: If you are not using Identity Service Security Mode, you can access it without Bearer Token
You don’t need to get a Token from Identity Service.
<h2 id="post-41988-_d55vv0azqzwm" class="betterdocs-content-heading"><a id="post-41988-_d55vv0azqzwm"></a>How to Use Swagger</h2>
<ol>
 <li>Get Token from Postman.</li>
 <li>Open Swagger UI and click on Authorize. <img class="wp-image-83453" src="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1.png" sizes="(max-width: 985px) 100vw, 985px" srcset="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1.png 985w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-300x99.png 300w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-768x254.png 768w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-360x119.png 360w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-800x265.png 800w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-24x8.png 24w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-36x12.png 36w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-1-1-48x16.png 48w" width="985" height="326" /></li>
 <li>Paste the Token in the text box according to the instructions.
<img class="wp-image-83454" src="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1.png" sizes="(max-width: 650px) 100vw, 650px" srcset="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1.png 650w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1-300x170.png 300w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1-360x204.png 360w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1-24x14.png 24w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1-36x20.png 36w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-2-1-48x27.png 48w" width="650" height="368" /></li>
 <li>Choose the desired API method. <img class="wp-image-83455" src="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1.png" sizes="(max-width: 881px) 100vw, 881px" srcset="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1.png 881w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-300x59.png 300w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-768x152.png 768w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-360x71.png 360w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-800x158.png 800w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-24x5.png 24w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-36x7.png 36w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-3-1-48x9.png 48w" width="881" height="174" /></li>
 <li>Fill in all the necessary parameters. The current API version is 1: <img class="wp-image-83456" src="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1.png" sizes="(max-width: 668px) 100vw, 668px" srcset="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1.png 668w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1-228x300.png 228w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1-360x474.png 360w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1-18x24.png 18w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1-27x36.png 27w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-4-1-36x48.png 36w" width="668" height="880" /></li>
 <li>Execute and get results.
<img class="wp-image-83457" src="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1.png" sizes="(max-width: 676px) 100vw, 676px" srcset="https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1.png 676w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1-295x300.png 295w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1-360x366.png 360w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1-24x24.png 24w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1-36x36.png 36w, https://cdn.openlm.com/wp-content/uploads/2022/02/word-image-41988-5-1-48x48.png 48w" width="676" height="688" /></li>
</ol>
Note: If you are not using Identity Service Security Mode, you can access it without Bearer Token
There is no need to get a Token from Postman.

</div>
</div>
</div>
