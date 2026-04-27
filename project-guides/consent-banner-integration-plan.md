# Cookie Consent Banner — Integration Plan

**Status:** Approved, not yet implemented
**Owner:** Docs infrastructure
**Target ship:** Wave 1 of the April 2026 compliance remediation
**Related:** OpenLM-Docs-Compliance-Audit.docx, finding #3

## Problem

The documentation site loads three third-party resources that process user data before any consent is obtained:

1. **Algolia Insights** — behavioral search tracking (`insights: true` in `docusaurus.config.js`).
2. **Arcade embeds** — interactive demos that can collect name and email.
3. **Google Fonts** — resolved in Wave 1 by self-hosting; no longer in scope for consent.

Under GDPR Article 6 and ePrivacy Article 5(3), non-strictly-necessary cookies and equivalent browser storage require prior, affirmative, granular consent. The site has no consent mechanism today. Under CCPA/CPRA we also need to offer an opt-out for any "sharing" — which is narrower but still requires a user-facing control.

## Options considered

### Option A: Klaro (open source CMP)

Klaro is an OSS consent management platform under the BSD-3 license. It handles per-category consent, remembers choices, and exposes a programmatic API for gating scripts.

**Pros**

- Mature, actively maintained, GDPR-aware out of the box.
- Per-service granularity, not just per-category.
- No SaaS vendor, no data leaves the site.
- Small bundle (~30 KB gzipped).

**Cons**

- Swizzling `Root` theme component needed to wrap the app.
- Additional npm dependency to maintain.

### Option B: Custom minimal component

Small React component in `src/components/ConsentBanner/` with a banner, modal, per-category toggles, and a `localStorage`-backed state.

**Pros**

- Full control over look and feel; matches brand.
- No new npm dependency.
- About 200–300 lines of code.

**Cons**

- We own the spec updates (iAB TCF support, GPC handling, preference revocation, accessibility of the banner itself).
- Re-invents what Klaro already solves.

### Option C: Commercial CMP (OneTrust, Cookiebot, Osano)

Industry-standard offering. Drop-in script.

**Pros**

- Legal coverage, IAB TCF 2.2 compliance, geolocation-aware rule sets.

**Cons**

- Per-visitor or per-page view licensing; usually a few thousand USD per year at docs-site scale.
- The CMP itself often sets tracking cookies, which is ironic.

## Recommendation

**Klaro (Option A)**, unless the legal team specifies IAB TCF compliance is required, in which case switch to a commercial CMP.

## Implementation sketch (Klaro)

### 1. Add dependency

```bash
npm install klaro
```

### 2. Klaro config at `src/klaro-config.js`

```js
export default {
  elementID: 'klaro',
  storageMethod: 'localStorage',
  cookieName: 'klaro',
  cookieExpiresAfterDays: 180,
  default: false,            // opt-in, not opt-out
  mustConsent: false,         // soft gate, not a hard wall
  acceptAll: true,
  hideDeclineAll: false,
  translations: {
    en: { /* Klaro ships defaults; override brand-specific strings */ },
    ja: { /* Japanese translations */ },
  },
  services: [
    {
      name: 'algolia-insights',
      title: 'Algolia search analytics',
      purposes: ['analytics'],
      cookies: [/^_ALGOLIA/],
      required: false,
      default: false,
    },
    {
      name: 'arcade',
      title: 'Arcade interactive demos',
      purposes: ['functional', 'analytics'],
      contextualConsentOnly: true,
      cookies: [/arcade/i],
      required: false,
      default: false,
    },
  ],
  purposes: [
    { id: 'functional', title: 'Functional' },
    { id: 'analytics', title: 'Analytics' },
  ],
};
```

### 3. Swizzle `Root`

```bash
npm run swizzle @docusaurus/theme-classic Root -- --wrap
```

Wrap with a Klaro provider that reads config and renders the banner:

```jsx
// src/theme/Root.js
import React, {useEffect} from 'react';
import * as Klaro from 'klaro';
import 'klaro/dist/klaro.css';
import klaroConfig from '../klaro-config';
import OriginalRoot from '@theme-original/Root';

export default function Root({children}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.klaro = Klaro;
    window.klaroConfig = klaroConfig;
    Klaro.setup(klaroConfig);
  }, []);
  return <OriginalRoot>{children}</OriginalRoot>;
}
```

### 4. Gate Algolia Insights

Edit `docusaurus.config.js`:

```js
algolia: {
  // insights: true,  // remove unconditional enable
  insights: false,    // default off; Klaro enables it post-consent via the Algolia runtime API
}
```

Add a small client module `src/clientModules/algolia-insights-consent.js` that listens for Klaro consent-change events and calls the Algolia Insights SDK accordingly.

### 5. Gate Arcade embeds

Replace each `<iframe src="https://demo.arcade.software/...">` with a Klaro-aware placeholder:

```jsx
<div data-name="arcade" data-type="application/x-www-form-urlencoded"
     data-src="https://demo.arcade.software/...">
  {/* Klaro swaps in the real iframe once the user consents */}
</div>
```

Or, use `contextualConsentOnly: true` so Klaro asks for consent per-embed when the user hovers.

### 6. Global Privacy Control (GPC)

Add a one-liner that treats a GPC signal as an automatic "decline all analytics" before Klaro initializes:

```js
if (typeof navigator !== 'undefined' && navigator.globalPrivacyControl) {
  Klaro.getManager().setConsent('algolia-insights', false);
  Klaro.getManager().setConsent('arcade', false);
}
```

### 7. Accessibility of the banner itself

- Banner renders inside a dialog with `role="dialog"`, `aria-modal="false"` (it's non-blocking), `aria-labelledby` pointing at its heading.
- Every toggle is a real `<input type="checkbox">` with an associated `<label>`.
- First focusable element on open: the accept button. Last focusable element: close. Tab order cycles.
- Banner text meets WCAG 1.4.3 contrast against its background.

Klaro's default markup is close to these defaults but verify post-install with axe-core.

### 8. Persistent control

Add a "Cookie settings" link in the footer next to "Your Privacy Choices" that calls `Klaro.show()`. Users must be able to revoke or change their consent at any time (GDPR Article 7(3)).

## Testing checklist

- [ ] First visit: no Algolia Insights network calls, no Arcade iframe loads until consent.
- [ ] Accept: Insights activates; Arcade iframes load; choice persists across page reloads.
- [ ] Decline: Insights stays off; Arcade stays gated; verify in the Network tab.
- [ ] Revoke via footer link: stored preferences clear; site behaves as on a first visit.
- [ ] GPC signal: analytics/functional services default to off regardless of stored state.
- [ ] Axe-core scan of the banner component itself (no color-contrast, focus, or label errors).
- [ ] Keyboard-only: everything reachable; Escape closes the modal; focus returns to the trigger.
- [ ] Screen reader: heading announced on open; toggle state announced on change.

## Known edge cases

- **SSR hydration**: Klaro initializes in `useEffect`, which avoids server-side rendering issues, but verify the banner doesn't flash content before scripts hydrate.
- **i18n**: Docusaurus passes `locale` as a prop through the Root wrapper; pass it into `klaroConfig.lang` to match.
- **Search-first landing**: Users who land on a search-result URL hit the page with Insights needing to fire immediately for `clickAnalytics`. Klaro should resolve consent state before the first search event.

## Rollout plan

1. Merge the config, Root wrapper, and gating changes behind a feature flag.
2. Enable on `main` for internal review.
3. Run axe-core against the banner in both themes.
4. Review with legal (EU and California counsel).
5. Publish to production. Monitor analytics for consent-rate drift and breakage reports.
