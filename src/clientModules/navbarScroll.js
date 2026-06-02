/**
 * Homepage navbar treatment — mirrors arcade.software's scroll-reveal pill.
 *
 * Sets two data attributes on <html> that src/css/custom.css keys off:
 *   data-homepage      — "true" only on the site landing page
 *   data-nav-scrolled  — "true" once the page is scrolled past a small threshold
 *
 * On the homepage the navbar is transparent and blends into the hero; once the
 * reader scrolls, it transitions into a frosted, centered "pill" that floats
 * over the content. Toggling these attributes here keeps the effect pure CSS.
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const SCROLL_THRESHOLD = 24; // px scrolled before the pill frosts in
// baseUrl is '/documentation/'; cover the with/without trailing-slash forms.
const HOME_PATHS = new Set(['/documentation/', '/documentation', '/']);

function setScrolled() {
  const scrolled = window.scrollY > SCROLL_THRESHOLD;
  document.documentElement.dataset.navScrolled = scrolled ? 'true' : 'false';
}

function setHomepage(pathname) {
  // Pathname is the fast path; the DOM check is a baseUrl-agnostic fallback
  // (the homepage <main> is the only one tagged .homepageLayout).
  const isHome =
    HOME_PATHS.has(pathname) ||
    Boolean(document.querySelector('main.homepageLayout'));
  document.documentElement.dataset.homepage = isHome ? 'true' : 'false';
}

if (ExecutionEnvironment.canUseDOM) {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled();
        ticking = false;
      });
    },
    {passive: true},
  );
  // Initial paint, before the first route-update fires.
  setHomepage(window.location.pathname);
  setScrolled();
}

// Re-evaluate on every client-side route change.
export function onRouteDidUpdate({location}) {
  if (!ExecutionEnvironment.canUseDOM) return;
  setHomepage(location.pathname);
  setScrolled();
}
