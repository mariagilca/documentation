"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5260],{1068:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"services/sam","title":"Software Asset Management (SAM)","description":"Overview","source":"@site/docs/services/sam.md","sourceDirName":"services","slug":"/services/sam","permalink":"/documentation/docs/services/sam","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":23,"frontMatter":{"sidebar_position":23},"sidebar":"tutorialSidebar","previous":{"title":"Projects","permalink":"/documentation/docs/services/projects"},"next":{"title":"Touch Points Events","permalink":"/documentation/docs/services/touch-point-events"}}');var t=s(4848),i=s(8453);const l={sidebar_position:23},a="Software Asset Management (SAM)",d={},c=[{value:"Overview",id:"overview",level:2},{value:"Overview",id:"overview-1",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Sellers",id:"sellers",level:2},{value:"Add a new seller",id:"add-a-new-seller",level:3},{value:"Entitlement records",id:"entitlement-records",level:2},{value:"Add entitlement records",id:"add-entitlement-records",level:3},{value:"Managing entitlement records",id:"managing-entitlement-records",level:3},{value:"General tab",id:"general-tab",level:4},{value:"Feature/process mapping tab",id:"featureprocess-mapping-tab",level:4},{value:"Purchase info tab",id:"purchase-info-tab",level:4}];function o(e){const n={em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"software-asset-management-sam",children:"Software Asset Management (SAM)"})}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsxs)(n.p,{children:["Software Asset Management helps manage software licenses by tracking seller details, purchases, and entitlement records. It captures information such as purchase cost, purchase date, pricing type (",(0,t.jsx)(n.strong,{children:"Perpetual"}),", ",(0,t.jsx)(n.strong,{children:"Maintenance"}),", ",(0,t.jsx)(n.strong,{children:"Subscription-Based"}),"), license validity periods, and maintenance terms. The module integrates with license servers to retrieve license details and workstations for gathering software usage information."]}),"\n",(0,t.jsx)(n.p,{children:"Entitlement records feed into the reporting service, enabling administrators to generate comprehensive reports."}),"\n",(0,t.jsx)(n.h2,{id:"overview-1",children:"Overview"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Software Asset Management"})," helps manage software  licenses by:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Tracking seller details, purchases, and entitlement records."}),"\n",(0,t.jsxs)(n.li,{children:["Recording purchase information:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Purchase cost and date"}),"\n",(0,t.jsxs)(n.li,{children:["Pricing type (",(0,t.jsx)(n.strong,{children:"Perpetual"}),", ",(0,t.jsx)(n.strong,{children:"Maintenance"}),", ",(0,t.jsx)(n.strong,{children:"Subscription-Based"}),")"]}),"\n",(0,t.jsx)(n.li,{children:"License validity period"}),"\n",(0,t.jsx)(n.li,{children:"Maintenance terms"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Integrating with:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"License servers to retrieve license details"}),"\n",(0,t.jsx)(n.li,{children:"Workstations to gather software usage data\nThe system integrates with license servers and retrieves license details, and gathers software usage data from workstations with the help of special software installed on end user\u2019s workstations and license servers Once you create an entitlement record, the reporting service uses this data to generate reports."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Reporting Service"})," must be active."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.p,{children:["Activate ",(0,t.jsx)(n.strong,{children:"Software Asset Manager"})," from the ",(0,t.jsx)(n.strong,{children:"Product"})," service on the Home page."]}),"\n",(0,t.jsx)(n.h2,{id:"sellers",children:"Sellers"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Seller"})," section lists manually added sellers. Sellers must be created before associating them with procurements."]}),"\n",(0,t.jsx)(n.h3,{id:"add-a-new-seller",children:"Add a new seller"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Select ",(0,t.jsx)(n.strong,{children:"Add"})," and enter the seller details."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Seller Name"})," (",(0,t.jsx)(n.em,{children:"required"}),"). All other fields are optional."]}),"\n",(0,t.jsx)(n.li,{children:"Save your changes."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"entitlement-records",children:"Entitlement records"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.strong,{children:"Entitlement Records"})," screen displays procurement entries."]}),"\n",(0,t.jsx)(n.h3,{id:"add-entitlement-records",children:"Add entitlement records"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Select ",(0,t.jsx)(n.strong,{children:"Add Entitlement Record"})," to manually create an entry."]}),"\n",(0,t.jsxs)(n.li,{children:["Select ",(0,t.jsx)(n.strong,{children:"Import Entitlement Record"})," to bulk-import records."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"managing-entitlement-records",children:"Managing entitlement records"}),"\n",(0,t.jsx)(n.p,{children:"When adding or editing an entitlement record, use the following tabs:"}),"\n",(0,t.jsx)(n.h4,{id:"general-tab",children:"General tab"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Select the ",(0,t.jsx)(n.strong,{children:"Seller"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["Enter the ",(0,t.jsx)(n.strong,{children:"Software Name"})," and ",(0,t.jsx)(n.strong,{children:"Business Owner"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"featureprocess-mapping-tab",children:"Feature/process mapping tab"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Choose a ",(0,t.jsx)(n.strong,{children:"License Server"})," to add licensed features managed by a license server, or select ",(0,t.jsx)(n.strong,{children:"Process"})," to add software not managed by a server."]}),"\n"]}),"\n",(0,t.jsx)(n.h4,{id:"purchase-info-tab",children:"Purchase info tab"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Enter license purchase details and associated costs."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>a});var r=s(6540);const t={},i=r.createContext(t);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);