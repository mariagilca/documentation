import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './index.module.css';

/**
 * ProductNotice — a slim, quiet cross-product notice on an OpenLM Platform doc
 * page, pointing to the Version 25 (legacy) equivalent of a shared component
 * (e.g. Broker). Opt-in per page via the `legacy_equivalent` frontmatter field,
 * so it appears only where confusion is actually likely.
 *
 * The banner is rendered by DocItem/Layout only when `legacy_equivalent` is set
 * AND `legacy_equivalent_notice` is not false. Setting `legacy_equivalent_notice:
 * false` keeps the machine-readable <link rel="related"> DocItem emits (so the
 * cross-product signal still reaches crawlers/RAG) while hiding this banner.
 *
 * Part of the product-disambiguation strategy
 * (project-guides/ai-disambiguation-strategy.md, Fix 3). It earns its place
 * twice: readers who land on the wrong OpenLM product from a search engine can
 * self-correct, and the visible anchor text ("OpenLM Version 25") is crawlable,
 * so it reinforces the two-entity distinction in exactly the HTML that AI answer
 * engines train on.
 *
 * Note: this is deliberately one-directional (Platform → legacy). There is no
 * legacy → Platform banner: that "migrate to Platform" notice was removed on
 * purpose (see git history), so legacy pages carry only the machine-readable
 * product signals from DocItem/Layout, not a visible banner.
 *
 * Props:
 *  - `to`    — legacy target path (from `legacy_equivalent`). Required; renders
 *              nothing if absent.
 *  - `label` — optional link text (from `legacy_equivalent_label`); defaults to
 *              a translatable "OpenLM Version 25 (legacy) documentation".
 */
export default function ProductNotice({ to, label }) {
  if (!to) {
    return null;
  }
  const linkNode = (
    <Link to={to}>
      {label || (
        <Translate
          id="productNotice.platform.defaultLabel"
          description="Default link text pointing to the Version 25 (legacy) equivalent of a shared component">
          OpenLM Version 25 (legacy) documentation
        </Translate>
      )}
    </Link>
  );
  return (
    <aside className={styles.notice} role="note">
      <Translate
        id="productNotice.platform.text"
        description="Quiet notice on an OpenLM Platform doc page linking to the Version 25 (legacy) equivalent of a shared component"
        values={{ link: linkNode }}>
        {'This page documents OpenLM Platform. The OpenLM Version 25 (legacy) equivalent is documented separately: {link}.'}
      </Translate>
    </aside>
  );
}
