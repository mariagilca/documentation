---
title: API
sidebar_position: 1
description: Overview of the OpenLM API and its usage.
---


## OpenLM V2x REST API
As of V21.12 and above, the OpenLM REST API has been standardized. The old XML/SOAP API (V4.x) is no longer supported, although some methods may still function with the URL /OpenLM.Server.Services​/AdminAPI​/web​/{adminApiMethod}. However, using these legacy methods is not guaranteed. Some V5.x REST APIs were also modified in newer versions.

You can find all supported APIs and their documentation in the Swagger UI, accessible at HTTP(s)://fqdn:5015/swagger/index.html.

## How to use Postman

If you are not using Identity Service Security Mode, you can access it without Bearer Token.
You don’t need to get Token from Identity Service.

## Sample Code

https://cdn.openlm.com/wp-content/uploads/2022/10/Program.cs_.pdf

If you are not using Identity Service Security Mode, you can access it without Bearer Token
You don’t need to get a Token from Identity Service.

## How to use Swagger
To use the Swagger UI, you'll need to obtain a Bearer Token if you're using Identity Service Security Mode.

Get a token: You can get a token using a tool like Postman.

Authorize: Open the Swagger UI and click the Authorize button.

Paste token: Paste the token into the text box as instructed.

Select and execute: Choose the desired API method, fill in the necessary parameters, and click Execute.

If you're not using Identity Service Security Mode, you don't need a Bearer Token to access the API.