---
title: "API"
sidebar_position: 14
---
REST API development has been settled down in V21.12.

Here are the critical points for v4.x and v5.x API users.

- v4.x Old XML/SOAP API is no longer supported in v5.6 and v21.12 and above.
- Some XML/SOAP methods are still usable using the following URL.  
  `/OpenLM.Server.Services/AdminAPI/web/{adminApiMethod}`
- Some of the v5.x REST APIs were changed in V21.12 and higher.
- Swagger API Lists are all the APIs for customer use and documents.  
  [HTTP(s)://fqdn:5015/swagger/index.html](http://localhost:5015/swagger/index.html)

## How to use Postman

[Video](https://youtu.be/kqgL-WtDGSA)[CSV for Import](/zips/v21-APIs-for-example.postman_collection.zip)

Note: If you are not using Identity Service Security Mode, you can access it without Bearer Token.  
You don't need to get Token from Identity Service.

## Sample code

[C#](https://cdn.openlm.com/wp-content/uploads/2022/10/Program.cs_.pdf)

Note: If you are not using Identity Service Security Mode, you can access it without Bearer Token  
You don't need to get a Token from Identity Service.

## How to use Swagger

1. Get Token from Postman.
2. Open Swagger UI and click on Authorize. ![](/img/legacy/word-image-41988-1-1.png)
3. Paste the Token in the text box according to the instructions.  
   ![](/img/legacy/word-image-41988-2-1.png)
4. Choose the desired API method. ![](/img/legacy/word-image-41988-3-1.png)
5. Fill in all the necessary parameters. The current API version is 1: ![](/img/legacy/word-image-41988-4-1.png)
6. Execute and get results.  
   ![](/img/legacy/word-image-41988-5-1.png)

Note: If you are not using Identity Service Security Mode, you can access it without Bearer Token  
There is no need to get a Token from Postman.
