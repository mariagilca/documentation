"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6280],{685:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"services/broker-hub","title":"Broker Hub","description":"Overview","source":"@site/docs/cloud/services/broker-hub.md","sourceDirName":"services","slug":"/services/broker-hub","permalink":"/documentation/cloud/services/broker-hub","draft":false,"unlisted":false,"tags":[],"version":"current","lastUpdatedAt":1743621700000,"sidebarPosition":5,"frontMatter":{"sidebar_position":5},"sidebar":"tutorialSidebar","previous":{"title":"Audit","permalink":"/documentation/cloud/services/audit"},"next":{"title":"Cloud Broker","permalink":"/documentation/cloud/services/cloud-broker"}}');var t=n(4848),s=n(8453);const o={sidebar_position:5},l="Broker Hub",a={},c=[{value:"Overview",id:"overview",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Prepare a Broker authorization file",id:"prepare-a-broker-authorization-file",level:2},{value:"Install a Broker",id:"install-a-broker",level:2},{value:"Import the authorization file",id:"import-the-authorization-file",level:2},{value:"Initial setup",id:"initial-setup",level:2},{value:"Approve brokers in Broker Hub",id:"approve-brokers-in-broker-hub",level:2}];function d(e){const r={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.header,{children:(0,t.jsx)(r.h1,{id:"broker-hub",children:"Broker Hub"})}),"\n",(0,t.jsx)(r.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsxs)(r.p,{children:["The ",(0,t.jsx)(r.strong,{children:"Broker Hub"})," provides a central interface to view, approve, or reject brokers installed on license servers. Brokers first report data here, before sending it further to the OpenLM Server for processing."]}),"\n",(0,t.jsx)(r.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsx)(r.p,{children:"Before Brokers appear in the Broker Hub, you must install them on your license servers."}),"\n",(0,t.jsx)(r.h2,{id:"prepare-a-broker-authorization-file",children:"Prepare a Broker authorization file"}),"\n",(0,t.jsx)(r.p,{children:"Before installing the Broker on a license server, create an authorization file to authenticate the Broker's connection with OpenLM:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsxs)(r.li,{children:["From the ",(0,t.jsx)(r.strong,{children:"Home page"}),", select ",(0,t.jsx)(r.strong,{children:"Identity"}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["Under ",(0,t.jsx)(r.strong,{children:"Identity"}),", go to ",(0,t.jsx)(r.strong,{children:"Authorization"})," and select ",(0,t.jsx)(r.strong,{children:"Add Client"}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["In ",(0,t.jsx)(r.strong,{children:"Client Type"}),", select ",(0,t.jsx)(r.strong,{children:"Broker"}),"."]}),"\n",(0,t.jsx)(r.li,{children:"Enter a description (this is optional)."}),"\n",(0,t.jsxs)(r.li,{children:["Select ",(0,t.jsx)(r.strong,{children:"Save"})," to generate the authorization file."]}),"\n",(0,t.jsx)(r.li,{children:"Download the authorization file."}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"install-a-broker",children:"Install a Broker"}),"\n",(0,t.jsx)(r.p,{children:"Follow these steps to install the broker:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"Download the Broker installer from the OpenLM download page and transfer it to the license server."}),"\n",(0,t.jsxs)(r.li,{children:["Double-click the ",(0,t.jsx)(r.code,{children:".msi"})," file to start installation."]}),"\n",(0,t.jsxs)(r.li,{children:["Accept the terms and select ",(0,t.jsx)(r.strong,{children:"Next"}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["Choose the default option (",(0,t.jsx)(r.strong,{children:"Install Broker with Java 11 OpenJDK"}),") and select ",(0,t.jsx)(r.strong,{children:"Next"}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["Keep the default installation directory (recommended), or specify another directory, then select ",(0,t.jsx)(r.strong,{children:"Next"}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["Confirm your selections by selecting ",(0,t.jsx)(r.strong,{children:"Next"}),"."]}),"\n",(0,t.jsx)(r.li,{children:"Once installation ends, close the confirmation window."}),"\n",(0,t.jsxs)(r.li,{children:["The Broker UI opens automatically in your browser:","\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["For local OpenLM installations, select ",(0,t.jsx)(r.strong,{children:"Continue"})," under ",(0,t.jsx)(r.strong,{children:"Local OpenLM Installation"}),"."]}),"\n",(0,t.jsxs)(r.li,{children:["For cloud installations, select ",(0,t.jsx)(r.strong,{children:"Continue"})," under ",(0,t.jsx)(r.strong,{children:"OpenLM Cloud Account"}),"."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"import-the-authorization-file",children:"Import the authorization file"}),"\n",(0,t.jsx)(r.p,{children:"After installation, import the previously generated authorization file:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsx)(r.li,{children:"In the Broker UI, upload the authorization file."}),"\n",(0,t.jsxs)(r.li,{children:["Select ",(0,t.jsx)(r.strong,{children:"Continue"}),"."]}),"\n"]}),"\n",(0,t.jsx)(r.h2,{id:"initial-setup",children:"Initial setup"}),"\n",(0,t.jsx)(r.p,{children:"The broker automatically detects license managers installed on the license server and checks connectivity."}),"\n",(0,t.jsx)(r.p,{children:"When detection completes:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsx)(r.li,{children:"Review detected license managers."}),"\n",(0,t.jsx)(r.li,{children:"Open the OpenLM UI to approve the broker and start monitoring."}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["The Broker Console will show that the OpenLM Server status is ",(0,t.jsx)(r.strong,{children:"Active"}),"."]}),"\n",(0,t.jsx)(r.h2,{id:"approve-brokers-in-broker-hub",children:"Approve brokers in Broker Hub"}),"\n",(0,t.jsx)(r.p,{children:"Post Broker installation:"}),"\n",(0,t.jsxs)(r.ol,{children:["\n",(0,t.jsxs)(r.li,{children:["Open the ",(0,t.jsx)(r.strong,{children:"Broker Hub"})," from Home navigation."]}),"\n",(0,t.jsxs)(r.li,{children:["Locate the new Broker entry marked as ",(0,t.jsx)(r.strong,{children:"Pending Approval"}),"."]}),"\n",(0,t.jsx)(r.li,{children:"Select the OpenLM icon associated with the broker to approve it."}),"\n",(0,t.jsxs)(r.li,{children:["In the prompt, select the Broker and choose ",(0,t.jsx)(r.strong,{children:"Approve"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(r.p,{children:["After approving the Broker, corresponding license manager entries appear under ",(0,t.jsx)(r.strong,{children:"Pending Servers"}),". Review and approve or deny servers as needed."]})]})}function h(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>o,x:()=>l});var i=n(6540);const t={},s=i.createContext(t);function o(e){const r=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(s.Provider,{value:r},e.children)}}}]);