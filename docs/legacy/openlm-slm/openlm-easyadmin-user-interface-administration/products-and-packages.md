---
title: "Products and Packages"
sidebar_position: 2
---
This article deals with two associated subjects: a) Renaming features as products, and b) gathering these features into licensed packages.

- Many features are only named as serial or coded strings, which bear little or no meaning for the end user. Renaming features is required to enhance readability and improve the understanding of EasyAdmin reports.

- Package or Suit licenses are, as their name implies, a set of features that are licensed together as a package. These kinds of licenses should be dealt with differently than individual licenses, to avoid confusion.

## Products/Packages window

The interface for handling product names and packages in EasyAdmin is the **Products/Packages** window.

Open the OpenLM EasyAdmin User Interface:

**Start → Administration→ Product Packages**

## Product names

The **Products/Packages** window enables users to define a meaningful product name to be displayed alongside a feature name. For example, the feature "86263MAXDES\_2015\_0F" corresponds to the product "Autodesk 3ds Max Design 2015″ in the following image. In order to edit the product name, left-click the Product name column for the row of that feature. Click **Save** to retain the changes or **Cancel** to discard them. The **Delete** button is used to remove feature/product name combinations.

![Screenshot: Product names](/img/legacy/Screenshot-2023-01-24-at-22.24.56.png)

The **Products/Packages** window provides an interface to the OpenLM translation table between Feature Names and Product Names. If this translation table is well maintained then the data reported on the EasyAdmin screens will be more comprehensible to the end user.

## Setting up a package in EasyAdmin User Interface

Oftentimes, the application is configured as a design suite/package. OpenLM will indicate that there are more licenses than there actually are, thus giving the appearance of a smaller percentage of license usage than expected. This is caused by a misconfiguration of packaged licenses.

There are three ways of setting up packaged licenses in OpenLM:

- Automatically for FLEXlm managed licenses, by extracting the packaging data in the license file.
- Through XML files provided by OpenLM or edited by the user
- Via the Products/Packages window

### Automatically setting packages according to FLEXlm license files

OpenLM provides the capability to extract Packaging information from FLEXlm license files. This is done by the OpenLM Broker component, which is installed on the license server machine.

For more information on how to obtain license packaging information through the license file, refer to the [Broker configuration document](../../openlm-broker/openlm-broker-configuration.md), the "Read License File" section.

### [Case Study] Setting Autodesk packages manually

In order to manually organize licensed Autodesk features and packages, use the **Products/Packages** window. In this example, we'll study the case of the Autodesk 3Ds Max Package.

1. In the **Products/Packages** window, select the **Autodesk 3Ds Max Package** feature: 662003DSMAX\_F and check the **Is Package** checkbox.

2. Click **Save**.

3. Close and reopen the **Products/Packages** window. It is necessary to close and then reopen the window after marking a product as a package.

4. Assign each item of the package to the parent 662003DSMAX\_F :

- Select an item in the list, for example, 506003DSMAX\_8\_0F
- Right-click on the **Parent Package** value to open a drop-down menu. Select the feature's **Parent Package**, in this case, 662003DSMAX\_F.
- Click **Save**.
- Repeat as needed for each item in the Package.

![Screenshot: [Case Study] Setting Autodesk packages manually](/img/legacy/Screenshot-2023-01-24-at-22.38.43.png)

Note the **Is Fixed** check boxes on the right column. Checking these boxes will fix the current configuration as permanent, so it will not be affected by any other packaging method.
