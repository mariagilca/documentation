---
title: "Cleanup Manager module"
sidebar_position: 3
---
Cleanup Manager runs a background process that removes all entities from the OpenLM database deleting unwanted information. Such entities include groups and users that do not work in the organization or don't use engineering licenses anymore.

Cleanup Manager also allows the removal of irrelevant usage data (history). You can select a time range to purge old information from the database.

## Starting Cleanup Manager

To open the cleanup tool, click the **OpenLM User Interface** **Start** button and then **Administration**:

![OpenLM User Interface Start menu with Administration option](/img/legacy/word-image-85.png)

Then click on the **Cleanup Manager** icon:

![Cleanup Manager icon in the Administration menu](/img/legacy/word-image-86.png)

**The cleanup Manager** window will open with the following settings:

![Cleanup Manager window showing History, Groups, and Users options](/img/legacy/word-image-87.png)

**History**: This option erases irrelevant usage data. Select a time range to purge old information from the database.

**Groups**: Select 'Groups' to remove all group names that have not accumulated history usage in OpenLM.

**Users**: Select this option to delete all unnecessary users that have not accumulated history usage in OpenLM. Users who have accumulated active usage history will not be removed from the database.

### Cleaning history

Make sure to have a backup of your data before cleaning the history in order to avoid its accidental loss.

To clean up the history of irrelevant data usage choose a time range to delete old information using **Start date/time** and **End date/time**:

![Cleanup Manager with Start date/time and End date/time fields for history cleanup](/img/legacy/word-image-88.png)

After you press the **Run** button **Cleanup Monitor** will open a pop-up window to assure the intended action is performed consciously. Select **Yes** to proceed or **Cancel** to **Discard.**

![Cleanup Monitor confirmation dialog with Yes and Cancel buttons](/img/legacy/word-image-89.png) If **Yes** was selected, a new window displaying cleanup results which can be cleared (Clear button), refreshed (Refresh button ), or exported (Export button):

![Cleanup Monitor results window with Clear, Refresh, and Export buttons](/img/legacy/word-image-90.png)

## Cleaning groups

To clean up groups go to **Cleanup Manager** and press the **Groups** radio button:

![Cleanup Manager with Groups radio button selected and Creation Sources dropdown](/img/legacy/word-image-91.png)

In the **Creation Sources** dropdown menu choose:

- **[All]** to select groups from all creation sources.

- **LDAP Sync** for groups created in the LDAP Sync application.

- **Manual** to choose groups that were created manually in OpenLM User Interface.

- **Options File** to cleanup groups from the Options File.

Press the Run button to start the cleanup. A confirmation window will appear:

![Confirmation dialog for group cleanup process](/img/legacy/word-image-92.png)

Press **Yes** to confirm the initialization of the cleanup process.

**Cleanup Monitor** window will open showing removal results:

![Cleanup Monitor window displaying group removal results](/img/legacy/word-image-93.png)

To delete cleanup results check removed groups (1) and press the **Clear** button (2):

![Selecting removed groups and pressing the Clear button to delete results](/img/legacy/word-image-94.png)

### Cleaning users

To clean up users go to **Cleanup Manager** and press the **Users** radio button:

![Cleanup Manager with Users radio button selected](/img/legacy/word-image-95.png)Select the following Creation Sources for Users from the drop-down menu:

**[All]** - users from all creation sources will be selected

**License Usage** - deletes users who were detected by OpenLM when they checked out a license.

**LDAP Sync** - deletes users that were synchronized from the Active Directory/eDirectory/Apache DS and any other directory compatible with LDAP protocol

**Manual** - deletes users that were added manually in the OpenLM User Interface.

**Options File** - deletes users that were created from the options file.

**Agent** - deletes users that were added by the OpenLM Agent.

**Router** - deletes users that were added by the OpenLM Router.

### Anonymize History User Option

To anonymize the history of all the users for the selected period of time, go to **Cleanup Manager** and press the **Anonimyze Users** radio button. Choose a start date and an end date then click **Run:**

![Cleanup Manager with Anonymize Users option and date range selection](/img/legacy/cleanup-manager.png)

## GDPR Anonymize User Option

If you need to anonymize specific users and hide personal information, the **GDPR Anonymize User** option offers this possibility. Not just username is changed but also Username, First, Last, Display Name, Phone, and Email are replaced with the value of GDPR\_XXXXXXXX. Press the **GDPR Anonymize User** button to start:

![GDPR Anonymize User option in Cleanup Manager](/img/legacy/word-image-96.png)

Select a user to anonymize (1) and then press the **Select** button (2):

![User selection dialog with Select button for GDPR anonymization](/img/legacy/word-image-97.png)

Note the User ID under which the user will be known and press the **Run Anonymization** button to continue:

![User ID display with Run Anonymization button](/img/legacy/word-image-98.png)

Press **Yes** to confirm in the **Confirmation** window:

![Anonymization confirmation dialog with Yes button](/img/legacy/word-image-99.png)

Read the message in the User **Anonymization Summary** window and note that OpenLM applications/features might still contain personal data of users that will need to be deleted manually.

![User Anonymization Summary window with completion message](/img/legacy/word-image-100.png)
