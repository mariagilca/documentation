---
title: Products and packages
sidebar_position: 1
description: Rename features as products and group them into packages for clearer license usage insights.
---

# Products and packages

This article covers two related topics:

- Renaming features to meaningful product names  
- Grouping features into licensed packages

Many features are named using cryptic serial or code strings, making them hard to understand. Renaming these features improves readability in EasyAdmin reports.

Package or suite licenses consist of a group of features licensed together. These should be handled differently than individual features to avoid incorrect reporting.

## Products/packages window

The interface for managing product names and packages is found in the **Products/Packages** window.

To access it:

**Start → Administration → Product Packages**

## Product names

The **Products/Packages** window lets you assign a user-friendly product name to each feature.  
For example, the feature `86263MAXDES_2015_0F` can be renamed to **Autodesk 3ds Max Design 2015**.

To rename:

1. Left-click the **Product name** column of the target feature.  
2. Enter the desired name.  
3. Click **Save** to keep the change or **Cancel** to discard it.  
4. Click **Delete** to remove a feature-product name mapping.

This window serves as a translation table between internal feature names and readable product names. Maintaining this table ensures EasyAdmin reports are clear to end users.

![Products window example](img/products-window-example.png)

## Setting up packages in the EasyAdmin interface

When applications are licensed as suites (e.g., Autodesk design suites), incorrect configuration may cause OpenLM to show more licenses than actually available. This leads to misleading usage percentages.

There are three methods for configuring packages:

1. **Automatically** via FLEXlm license files  
2. **Using XML files** (from OpenLM or user-defined)  
3. **Manually** in the **Products/Packages** window

### Automatically set packages from FLEXlm license files

The OpenLM **Broker** component (installed on the license server) can extract package data directly from FLEXlm license files.

:::note
Refer to the Broker configuration guide, specifically the **Read License File** se
:::
