/**
 * Force-open every collapsed <details> element while printing, then restore
 * the previous state. Without this, collapsed details print as empty boxes
 * ("expand to see…") — useless on paper, where there is nothing to expand.
 *
 * Pairs with the @media print rules in src/css/custom.css, which keep the
 * details content visible even when JS has not run (crawler/PDF pipelines).
 *
 * Registered in docusaurus.config.js under clientModules.
 */
if (typeof window !== 'undefined') {
  const OPENED_FLAG = 'printOpened';

  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details:not([open])').forEach((details) => {
      details.dataset[OPENED_FLAG] = 'true';
      details.setAttribute('open', '');
    });
  });

  window.addEventListener('afterprint', () => {
    document.querySelectorAll('details[data-print-opened]').forEach((details) => {
      delete details.dataset[OPENED_FLAG];
      details.removeAttribute('open');
    });
  });
}
