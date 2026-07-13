// Run this in the target tab (via the claude-in-chrome javascript_tool) on EVERY page
// BEFORE capturing. A full-load navigation wipes window.* each time, so re-run it.
// It: waits for render, anonymizes demo-tenant PII, sets the capture title marker,
// and continuously strips injected browser-extension overlays (Arcade / Grammarly).
// Adjust the anonymization pairs/regexes to the app + data you're shooting.

for (let i = 0; i < 40; i++) {
  if (document.querySelector('.menu-button-content-container')) break;   // app-specific "ready" signal
  await new Promise(r => setTimeout(r, 300));
}
await new Promise(r => setTimeout(r, 1200));

// --- text-node anonymizer: exact-string pairs + regex rules ---
window.__anon = function (pairs, rx) {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const ns = []; let n; while (n = w.nextNode()) ns.push(n);
  let c = 0;
  for (const nd of ns) {
    let t = nd.nodeValue, o = t;
    for (const k in pairs) t = t.split(k).join(pairs[k]);
    for (const rr of (rx || [])) t = t.replace(rr[0], rr[1]);
    if (t !== o) { nd.nodeValue = t; c++; }
  }
  return c;
};

// --- unique title marker so capture.sh can find THIS tab's window ---
window.__setMark = () => { if (document.title.indexOf('ZZCAP') < 0) document.title = 'ZZCAP ' + document.title; };

// --- strip injected extension overlays (they'd otherwise land in the screencapture) ---
function killOverlays() {
  document.getElementById('arcade-page-editor-overlay')?.remove();     // Arcade "This domain has edits"
  document.querySelectorAll('*').forEach(el => {                       // its host may be in a shadow root
    try { if (el.shadowRoot && /this domain has edits|arcade-page-editor/i.test(el.shadowRoot.innerHTML || '')) el.remove(); } catch (e) {}
  });
  document.querySelectorAll('grammarly-desktop-integration').forEach(e => e.remove());
}
if (window.__killTimer) clearInterval(window.__killTimer);
window.__killTimer = setInterval(killOverlays, 80);

killOverlays();
window.__setMark();

// EDIT these for your app/data:
window.__anon(
  { 'anamariagilca': 'jordan lee', 'Anamariagilca': 'Jordan Lee' },      // exact strings
  [                                                                       // regexes
    [/\b(\d{2,5})@[A-Za-z0-9][A-Za-z0-9._-]*/g, '$1@licsrv01'],           // port@host -> port@licsrv01
    [/AutodeskCloud-\d+/g, 'AcmeCloud'],                                  // vendor account ids
  ]
);

// Per-page extras (run as needed):
//   workstation cards:  document.querySelectorAll('app-workstation-item').forEach((c,i)=>{const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.nodeValue.trim();if(t&&t!=='Available'&&t!=='In use'){n.nodeValue='WS-'+(1001+i);break;}}});
//   open a menu/expander: document.querySelector('.advanced-row')?.click();  // JS click, NOT a computer click
'prep done';
