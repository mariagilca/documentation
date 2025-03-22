"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[828],{3073:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"services/agents_hub","title":"Agents Hub","description":"Overview","source":"@site/docs/services/agents_hub.md","sourceDirName":"services","slug":"/services/agents_hub","permalink":"/documentation/docs/services/agents_hub","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Agent Activity Manager","permalink":"/documentation/docs/services/agent_activity_manager"},"next":{"title":"Alerts","permalink":"/documentation/docs/services/alerts"}}');var t=n(4848),r=n(8453);const l={sidebar_position:2},o="Agents Hub",c={},a=[{value:"Overview",id:"overview",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Manage discovered websites",id:"manage-discovered-websites",level:2},{value:"Agent configuration settings",id:"agent-configuration-settings",level:2},{value:"General",id:"general",level:3},{value:"Discovery settings",id:"discovery-settings",level:3},{value:"Licensing settings",id:"licensing-settings",level:3},{value:"Reporting settings",id:"reporting-settings",level:3},{value:"Projects settings",id:"projects-settings",level:3},{value:"Extensions (ArcGIS only)",id:"extensions-arcgis-only",level:3},{value:"Personal Dashboard configuration",id:"personal-dashboard-configuration",level:2},{value:"General",id:"general-1",level:3},{value:"Visibility settings",id:"visibility-settings",level:3},{value:"ArcGIS-specific settings",id:"arcgis-specific-settings",level:3},{value:"Personal Dashboard notifications",id:"personal-dashboard-notifications",level:2},{value:"Notification examples:",id:"notification-examples",level:3},{value:"Projects and license tracking",id:"projects-and-license-tracking",level:2},{value:"Recently Closed",id:"recently-closed",level:3},{value:"License Repository",id:"license-repository",level:3},{value:"ArcGIS licensing levels (ArcGIS only)",id:"arcgis-licensing-levels-arcgis-only",level:3}];function d(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"agents-hub",children:"Agents Hub"})}),"\n",(0,t.jsx)(s.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsxs)(s.p,{children:["The ",(0,t.jsx)(s.strong,{children:"Agents Hub"})," microservice manages and orchestrates connected Workstation Agents. You can configure agent settings, manage user interfaces such as the Personal Dashboard, and handle monitoring of websites accessed by users."]}),"\n",(0,t.jsx)(s.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Agent Activity Manager"}),": Install and connect the Workstation Agent on each target machine."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"manage-discovered-websites",children:"Manage discovered websites"}),"\n",(0,t.jsxs)(s.p,{children:["The Agents Hub automatically discovers websites accessed by users. In the ",(0,t.jsx)(s.strong,{children:"Discovered Web Services"})," section, you can:"]}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Approve discovered websites for monitoring (these will appear in the ",(0,t.jsx)(s.a,{href:"Link",children:"Touch Points Events"})," microservice)."]}),"\n",(0,t.jsx)(s.li,{children:"Toggle off (deny) discovered websites to exclude them from monitoring."}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:"You can also manually add websites (including specific subdirectories) to track access frequency."}),"\n",(0,t.jsx)(s.h2,{id:"agent-configuration-settings",children:"Agent configuration settings"}),"\n",(0,t.jsxs)(s.p,{children:["Configure the following settings within the ",(0,t.jsx)(s.strong,{children:"Agents Hub"}),":"]}),"\n",(0,t.jsx)(s.h3,{id:"general",children:"General"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Enable Process Screenshots"}),": Allow the agent to periodically capture screenshots of monitored processes. Screenshots can be viewed in the Personal Dashboard under the ",(0,t.jsx)(s.strong,{children:"Recently Closed"})," page."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"discovery-settings",children:"Discovery settings"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Report web services anonymously"}),": Anonymizes user and machine details for discovered websites."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Report discovered applications anonymously"}),": Anonymizes user and machine details for discovered applications."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Report discovered related executables"}),": When enabled, reports ",(0,t.jsx)(s.code,{children:".exe"})," files associated with discovered applications. Use cautiously, as it can generate significant data."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"licensing-settings",children:"Licensing settings"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Available license notification"}),": Notify end-users when previously unavailable licenses become available within a defined reservation period."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"reporting-settings",children:"Reporting settings"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Normalize reported workstation names"}),": Converts all reported workstation names to lowercase."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Normalize reported usernames"}),": Converts usernames to lowercase. Use cautiously on Unix-like systems where usernames are case-sensitive."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"projects-settings",children:"Projects settings"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Default Closed Projects Location"}),": Default location for unsaved projects when the agent automatically closes applications."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Overwrite Existing Projects"}),": Allows overwriting project files when saving."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Force Project Selection"}),": Forces users to select an active project, automatically closing newly opened processes until selection is made."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"extensions-arcgis-only",children:"Extensions (ArcGIS only)"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Show extensions list at software startup"}),": Displays ArcGIS extensions list on ArcMap startup."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Turn off license extensions at shutdown"}),": Automatically disables ArcMap licensed extensions on shutdown."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Turn off custom extensions"}),": Disables third-party ArcMap extensions on shutdown."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Application's behavior when extension passes usage threshold"}),": Choose to either turn off the extension or shut down ArcMap when idle usage thresholds are exceeded."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Actively shut any open applications down at"}),": Specify a time to automatically shut down supported applications."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Software items that won't be saved or reported"}),": List executables (e.g., ArcCatalog.exe) that will not save data upon closure."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Directories excluded from automatic project saving"}),": List directories to exclude from automatic project saving."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"personal-dashboard-configuration",children:"Personal Dashboard configuration"}),"\n",(0,t.jsx)(s.p,{children:"Adjust the agent\u2019s browser-based user interface (Personal Dashboard):"}),"\n",(0,t.jsx)(s.h3,{id:"general-1",children:"General"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Set the minimum interval between license release request notifications."}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"visibility-settings",children:"Visibility settings"}),"\n",(0,t.jsx)(s.p,{children:"Control Personal Dashboard page visibility:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Show Project Page"}),": Display the Projects page."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Show Live Feed Page"}),": Display the Live Feed page."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Show Workstation Overview Page"}),": Display the Workstation Overview page."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Disable open folder button"}),": Disable opening last used project folders."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Hide license usage information"}),": Prevent users from viewing license usage details."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Show named license usage information"}),": Control visibility of named license usage details."]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"arcgis-specific-settings",children:"ArcGIS-specific settings"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Set default ArcGIS license levels for users."}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Prohibit users from changing ArcGIS level"}),": Prevent changes to ArcGIS licensing levels."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"Hide ArcGIS level selection"}),": Disable the ArcGIS license selection UI for users."]}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"personal-dashboard-notifications",children:"Personal Dashboard notifications"}),"\n",(0,t.jsx)(s.p,{children:"Personal Dashboard users can receive browser notifications from the Workstation Agent:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Notifications include process release alerts, project selection prompts, forbidden application alerts, and license availability notifications."}),"\n",(0,t.jsx)(s.li,{children:"Notifications use native browser notifications if allowed. Otherwise, notifications appear in-app as toast messages."}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"notification-examples",children:"Notification examples:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Prompting a user to select an active project."}),"\n",(0,t.jsx)(s.li,{children:"Alerting users when licenses become available."}),"\n",(0,t.jsx)(s.li,{children:'Notifying users to release licenses requested by others through the Personal Dashboard\'s "Send In-App Request" feature (limit: once every 3 minutes).'}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"projects-and-license-tracking",children:"Projects and license tracking"}),"\n",(0,t.jsx)(s.p,{children:"OpenLM can attribute license usage to specific active projects:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Users can create or select active projects within the Personal Dashboard if activated in EasyAdmin."}),"\n",(0,t.jsx)(s.li,{children:"You can manage project-based license usage tracking through EasyAdmin."}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"recently-closed",children:"Recently Closed"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"View applications actively closed by Workstation Agent to recover licenses."}),"\n",(0,t.jsx)(s.li,{children:"Select the process names to reopen applications and check out licenses again."}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"license-repository",children:"License Repository"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"View real-time license usage, including the number of licenses in use, borrowed, and available."}),"\n",(0,t.jsx)(s.li,{children:"Access detailed user information currently holding licenses."}),"\n",(0,t.jsx)(s.li,{children:"Configure filtering options to control license visibility for end-users."}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"arcgis-licensing-levels-arcgis-only",children:"ArcGIS licensing levels (ArcGIS only)"}),"\n",(0,t.jsxs)(s.p,{children:["ArcGIS users can select licensing levels (",(0,t.jsx)(s.strong,{children:"Advanced"}),", ",(0,t.jsx)(s.strong,{children:"Standard"}),", ",(0,t.jsx)(s.strong,{children:"Basic"}),") for ArcGIS Desktop and ArcGIS Pro. Set default levels or restrict user choices in the Personal Dashboard."]}),"\n",(0,t.jsxs)(s.blockquote,{children:["\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"https://pro.arcgis.com/en/pro-app/latest/get-started/license-levels.htm",children:"Learn more about ArcGIS licensing levels"}),"."]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>l,x:()=>o});var i=n(6540);const t={},r=i.createContext(t);function l(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);