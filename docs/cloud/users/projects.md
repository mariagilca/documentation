---
sidebar_position: 3
id: projects
title: Projects
description: "Use projects to track license usage by project and allocate licensing costs accurately."
---
Use projects to track license usage by project and allocate licensing costs accurately. Each user works under an *active project*, and OpenLM attributes their license usage to it. The active project can be chosen by the user in the Workstation Agent / Personal Dashboard, set automatically from a system environment variable, or fall back to the user's default project.

:::info[Finding this in the app]
Open the OpenLM Platform **app launcher** (grid icon, top-right) and select **Users → Projects**.

**Before you start:** Activate **Projects** in [OpenLM Products](/cloud/openlm-administration/products) and install [Workstation Agent](/cloud/getting-started/install-workstation-agent) on target machines so usage can be captured.

**Related:** [Users and Groups](/cloud/users/users-and-groups) · [Directory Sync](/cloud/users/directory-sync) · [Agents Hub](/cloud/data-collection/agents_hub)
:::

![The Projects list showing project names, dates, source, and priority](/img/projects/projects-list.png)

## Prerequisites

- **Projects product**: Activate **Projects** in [OpenLM Products](/cloud/openlm-administration/products). Every operation in the app is gated on this activation.
- **Workstation Agent**: Install [Workstation Agent](/cloud/getting-started/install-workstation-agent) on all target machines so it can capture which project is active during license usage.
- **Directory Sync (optional)**: Use [Directory Sync](/cloud/users/directory-sync) to create projects automatically from Active Directory organizational units.

## The Projects app

The app has two screens, reachable from the side navigation:

- **Projects** — the list where you add, edit, organize, enable/disable, delete, import, and export projects.
- **Settings** — where you configure how the Workstation Agent presents projects to users (see [Configure agent behavior](#configure-agent-behavior)).

Adding, editing, importing, and changing settings require an **administrator** role; users without it see the screens in read-only mode. (Exporting the project list to CSV is available to everyone.)

## Configure agent behavior

Open **Settings** to control how the Workstation Agent and Personal Dashboard handle projects. All controls sit under one **Agent's behavior** section, which offers a choice between two mutually exclusive modes: **Use OpenLM's projects** or **Support environment variable**. Select **Save** to apply your changes.

![The Projects Settings screen with the Agent's behavior options](/img/projects/projects-settings.png)

### Use OpenLM's projects

The default mode. Users pick from projects managed here in OpenLM. Selecting it enables the following options (all on by default):

- **Display active project at license retrieval**: Prompt the user to confirm or select a project when an application retrieves a license.
- **Display active project periodically**: Prompt the user to confirm the active project at a set interval.
  - **Display periodically every … minutes**: The interval, in minutes, between periodic prompts. Must be greater than 0.
- **Show "Set Active Project" in Personal Dashboard's projects page**: Let users set their active project from the Personal Dashboard.
- **Show "Create New Project" in Personal Dashboard's projects page**: Let users create a new project directly from the Personal Dashboard.
- **Show unassigned projects**: Show all projects in the picker, including those not assigned to the user. This option is available only when **Show "Set Active Project" in Personal Dashboard's projects page** is on.

### Support environment variable

Instead of the OpenLM project list, derive the active project from a system environment variable set on the workstation. Selecting it enables:

- **Environment variable name**: The name of the environment variable the agent reads to determine the project (for example, `LM_PROJECT`). Required in this mode.
- **Add unknown projects**: Automatically create a project when the environment variable reports a name that doesn't already exist in OpenLM. Off by default.

## Manage projects

The **Projects** screen lists every project for the tenant. From here you can:

- Add, edit, enable, disable, and delete projects.
- Switch between a flat **grid** and a hierarchical **tree** view.
- Search, filter columns, filter by date range, and show or hide disabled projects.
- Import projects from a CSV file or export the list to CSV.

The default grid columns are **Project Name**, **Start Date**, **End Date**, **Created By**, and **Priority**. Use the column menu (⋮) to show additional columns — **Parent Project**, **Allocate Time**, **Percent Done**, and **Status** (Enabled/Disabled). **Created By** shows the project's source: `Admin` (created in this app), `Agent` (created from a workstation), `CSV` (imported), or `LDAP` (created by Directory Sync).

### Grid and tree views

Use the **View By** switch to choose how projects are displayed:

- **Grid view** — a flat, sortable table with column filters and date-range filters. Use it to scan project details.
- **Tree view** — the parent/child hierarchy, with expandable branches. Use it to see how projects nest.

![The Projects tree view showing parent and child projects](/img/projects/projects-tree.png)

### Search, filter, and date ranges

- **Search** matches across project fields and assigned usernames (up to 100 characters).
- **Toggle Filters** turns on per-column filters in grid view — for example, filter Priority by Low/Medium/High or Created By by source.
- **Start Date Range** and **End Date Range** filter the list to projects whose start or end dates fall in the range (grid view only).
- **Show disabled** includes disabled projects in the list; they are otherwise hidden and marked with a red icon when shown.

### Add or edit a project

Select **Add Project** (or the edit icon on a row) to open the project form, which has three tabs: **Project**, **Users**, and **Groups**.

![The Add Project form with the project detail fields](/img/projects/add-project.png)

On the **Project** tab:

- **Active / Inactive**: Whether the project is enabled. A disabled project is hidden from the picker.
- **Name**: The project name. Required and unique per tenant (case-insensitive).
- **Parent Project**: Optional. Nest this project under another to build a hierarchy. A project cannot be its own parent, and parent/child loops are rejected.
- **Priority**: Low, Medium, or High. Defaults to Low.
- **Allocated Time**: Planned hours for the project (informational).
- **Progress**: Percent complete, 0–100 (informational).
- **Start Date / Start Time** and **End Date / End Time**: The project window. The start must be earlier than the end.

Only the project name and parent are used to attribute and organize usage; priority, allocated time, and progress are descriptive attributes for tracking and reporting. Select **Save** to create or update the project.

:::note
Start and end dates define the project window but do **not** automatically expire a project — a project stays available until you disable it. Enabling or disabling is the only lifecycle control the service enforces.
:::

### Enable, disable, and delete

Select one or more projects with the row checkboxes, then use the toolbar:

- **Disable** deactivates the selected projects. Disabling a parent **also disables all of its child projects**, and a child cannot be enabled while its parent is disabled.
- **Enable** reactivates disabled projects.
- **Delete** removes the selected projects. Deleting a project does **not** delete its children — they are kept and moved up to the top level. The project is also removed from all users and groups it was assigned to.

Disable and Delete ask for confirmation before they run.

### Import and export CSV

Use **Import records** to create projects in bulk from a CSV file (administrators only), and **Export CSV** to download the current list.

![The Import CSV dialog on the Projects list](/img/projects/projects-import.png)

The CSV columns match the export template: **Project Name, Start Date, End Date, Created By, Priority, Parent Project, Allocate Time, Percent Done, Status**. On import:

- **Parent Project** is matched by parent **name** — the parent must already exist or appear earlier in the file.
- **Created By** is ignored; imported projects always get the source `CSV`.
- Missing values default to Allocate Time `0`, Percent Done `0`, and Priority `Medium`; **Status** accepts `Enabled` or `Disabled`.
- Dates are parsed using your account's date format.

After import, the dialog reports how many records succeeded and failed. If any rows fail, you can download only the failed rows, fix them, and re-upload.

### Assign users to a project

On the **Users** tab of a project, assign the users who should see it in their Personal Dashboard.

![The Users tab of a project listing assigned users](/img/projects/project-users.png)

- **Add Users To Project**: Pick users to assign. Users come from [Users and Groups](/cloud/users/users-and-groups) — make sure at least one user exists there.
- **Set As Default Project** / **Remove default project**: Mark this project as the selected user's default. Each user has at most one default project; it is the fallback used when the agent doesn't report an explicit project. A default is marked with a home icon in the Username column.
- **Remove**: Unassign the selected users.
- **Show disabled**: Include deactivated users in the list.

The grid shows **Username, First Name, Last Name, Display Name, Email, Department**. Select **Save** to persist assignment changes.

### Assign groups to a project

The **Groups** tab works the same way for groups: **Add Groups To Project**, **Set As Default Project** / **Remove default project**, **Remove**, and **Show disabled**. Groups also come from [Users and Groups](/cloud/users/users-and-groups). The grid shows the **Group** name and a **Members** count; select the count to view the group's members in a read-only list.

## Choose the active project

How a user's active project is determined depends on your Settings and the user:

1. **Explicit selection** — with **Use OpenLM's projects**, the agent prompts the user at license retrieval, periodically, or both, and the user can set or create a project from the Personal Dashboard (when those options are enabled).
2. **Environment variable** — with **Support environment variable**, the agent reads the configured variable and uses that project (optionally creating it when **Add unknown projects** is on).
3. **Default project** — if no project is reported explicitly, usage falls back to the user's default project.

Users can also work with projects from the Personal Dashboard's Projects page when the corresponding Settings options are enabled — see [Personal Dashboard](/cloud/users/personal-dashboard).

## Automate project creation with Directory Sync

[Directory Sync](/cloud/users/directory-sync) can create and maintain projects from your Active Directory structure. Projects it creates appear with the source **LDAP**. Beyond creation, Directory Sync can also update a project's parent and add or remove users on existing projects, keeping the project structure aligned with your directory.

## Project visibility and Agents Hub

Which project-selection options users see is controlled by this app's **Settings** (see [Configure agent behavior](#configure-agent-behavior)) — for example, whether the agent prompts at license retrieval, and whether the Personal Dashboard shows the *Set Active Project* and *Create New Project* actions.

[Agents Hub](/cloud/data-collection/agents_hub) is where you govern the Personal Dashboard more broadly — its page policies and whether project selection is forced. Use the two together: Projects **Settings** for what the project picker offers, and Agents Hub for the surrounding Personal Dashboard policy.

## Reporting

Project usage data appears in your BI tool. The Projects app's own **Dashboard** (under Reporting) embeds the **User and Project Insights** analytics dashboard, and the same data feeds the [Project report](/cloud/reporting/bi-reports/basic-reports/user-projects-insights/project-report) and [Project usage](/cloud/reporting/bi-reports/basic-reports/user-projects-insights/project-usage-report) BI reports.
