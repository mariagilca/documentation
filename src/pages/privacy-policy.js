import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';
import {translate} from '@docusaurus/Translate';
import Admonition from '@theme/Admonition';

export default function PrivacyPolicy() {
  return (
    <Layout title={translate({message: "Privacy Policy"})}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{translate({message: "OpenLM Documentation – Privacy Policy"})}</h1>
  <div className={styles.lastUpdated}>{translate({message: "Last updated: June 11, 2026"})}</div>
        <p className={styles.text}>
          {translate({message: "The OpenLM documentation website is committed to protecting your privacy and being transparent about our data practices. This privacy policy explains what minimal data we collect and how we use it on our documentation platform."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Cookies and similar technologies"})}</h2>
        <p className={styles.text}>
          {translate({message: "The documentation site uses cookies and browser storage in the following categories."})}
        </p>
        <ul className={styles.bulletList}>
          <li className={styles.text}>
            <strong>{translate({message: "Strictly necessary."})}</strong>{' '}
            {translate({message: "A first-party cookie stores whether you have dismissed the welcome modal. This cookie is essential for the site to function correctly."})}
          </li>
          <li className={styles.text}>
            <strong>{translate({message: "Functional."})}</strong>{' '}
            {translate({message: "Browser local storage remembers your selected color theme (light or dark) and language. No data leaves your browser."})}
          </li>
          <li className={styles.text}>
            <strong>{translate({message: "Search analytics (third-party)."})}</strong>{' '}
            {translate({message: "Algolia DocSearch and AskAI may set cookies to improve search relevance and to track query patterns in aggregate. These are set when you use the search function. See the Algolia section below for details."})}
          </li>
          <li className={styles.text}>
            <strong>{translate({message: "Interactive demos (third-party)."})}</strong>{' '}
            {translate({message: "Arcade interactive demos may set cookies when you interact with them. Do not interact with a demo to avoid these cookies."})}
          </li>
        </ul>
        <p className={styles.text}>
          {translate({message: "You can control non-essential cookies through your browser settings. A site-wide consent banner giving per-category control is in development."})}
        </p>

        {/* TODO(legal): Section updated June 2026 to disclose the release-update
            subscription data flow (email + language preference, processed
            through Google Cloud Functions into Zoho). Pending legal review —
            verify processor names, retention wording, and the lawful basis
            before the next deploy. */}
        <h2 className={styles.subheading}>{translate({message: "Data collection"})}</h2>
        <ul className={styles.bulletList}>
          <li className={styles.text}>{translate({message: "OpenLM does not collect personal data directly on this documentation site, except the information you voluntarily submit: your email address when you subscribe to release updates, and any details you enter into embedded demo forms."})}</li>
          <li className={styles.text}>{translate({message: "The site uses a small number of third-party services (Algolia, Arcade, and the subscription processors described below) that process usage data for the purposes described below. These are disclosed so you can make an informed choice about using them."})}</li>
          <li className={styles.text}>{translate({message: "Fonts are self-hosted. No font or typography files are fetched from Google Fonts or any other third-party font provider."})}</li>
        </ul>

        <h2 className={styles.subheading}>{translate({message: "Release update subscriptions"})}</h2>
        <p className={styles.text}>
          {translate({message: "If you subscribe to release updates, we collect your email address and language preference. We use this information only to send you release update emails. Subscription uses double opt-in: we send a confirmation link to your address, and you are subscribed only after you click it."})}
        </p>
        <p className={styles.text}>
          {translate({message: "Subscription data is processed through Google Cloud Functions (EU region) and stored in Zoho, which OpenLM uses to manage and send release update emails. It is not shared with anyone else or used for marketing beyond the release updates you requested."})}
        </p>
        <p className={styles.text}>
          {translate({message: "You can unsubscribe at any time using the link included in every release update email. When you unsubscribe, your email address is removed from the subscription list."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Search keywords"})}</h2>
        <p className={styles.text}>
          {translate({message: "We track search keywords entered on the OpenLM documentation site to improve our documentation content and user experience. "})}
          <strong>{translate({message: "These search keywords are not associated with any user identification or personal information."})}</strong>
        </p>

        <p className={styles.text}>
          {translate({message: "Your use of this website implies consent to this minimal and privacy-respecting setup."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Use of third-party services"})}</h2>
        <p className={styles.text}>
          {translate({message: "To enhance the user experience and improve access to our content and product features, we use third-party services such as Algolia DocSearch, Algolia AskAI, and Arcade. These services may collect certain categories of user interaction data. The following sections describe the types of data collected, the reasons for collection, and your rights regarding this data."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Algolia DocSearch and AskAI"})}</h2>
        <p className={styles.text}>
          {translate({message: "We use Algolia DocSearch to provide fast, full-text search across our documentation, and AskAI, an AI-powered assistant, to deliver natural-language answers based on our published materials."})}
        </p>
        <h3 className={styles.subheading}>{translate({message: "Categories of data collected"})}</h3>
        <ul className={styles.bulletList}>
          <li className={styles.text}>{translate({message: "Search inputs and queries, including free-text questions"})}</li>
          <li className={styles.text}>{translate({message: "Clickstream and selection behavior, such as which results are selected"})}</li>
          <li className={styles.text}>{translate({message: "Aggregated usage statistics, such as query volume and no-result queries"})}</li>
        </ul>
        <h3 className={styles.subheading}>{translate({message: "Purpose of collection"})}</h3>
        <ul className={styles.bulletList}>
          <li className={styles.text}>{translate({message: "To improve the quality and relevance of search results"})}</li>
          <li className={styles.text}>{translate({message: "To identify informational gaps within our documentation"})}</li>
          <li className={styles.text}>{translate({message: "To enhance overall user experience and content discoverability"})}</li>
        </ul>
        <Admonition type="note" title={translate({message: "Note"})}>
          {translate({message: "DocSearch and AskAI do not collect personally identifiable information (PII) by default unless you voluntarily include such data in your search query."})}
        </Admonition>

        <h2 className={styles.subheading}>{translate({message: "Arcade interactive product demos"})}</h2>
        <p className={styles.text}>
          {translate({message: "Our website features Arcade interactive product demonstrations that allow users to explore our products and services in a guided, hands-on way without registration or software installation."})}
        </p>
        <h3 className={styles.subheading}>{translate({message: "Categories of data collected"})}</h3>
        <ul className={styles.bulletList}>
          <li className={styles.text}>{translate({message: "Interaction and engagement metrics, such as views, completions, and time spent"})}</li>
          <li className={styles.text}>{translate({message: "User navigation behavior within demos, including button clicks and step progression"})}</li>
          <li className={styles.text}>{translate({message: "Voluntarily submitted personal data, such as name or email, if entered into embedded forms"})}</li>
        </ul>
        <h3 className={styles.subheading}>{translate({message: "Purpose of collection"})}</h3>
        <ul className={styles.bulletList}>
          <li className={styles.text}>{translate({message: "To assess and improve the clarity and effectiveness of our product presentations"})}</li>
          <li className={styles.text}>{translate({message: "To analyze user engagement and interest in specific features"})}</li>
          <li className={styles.text}>{translate({message: "To identify potential customer intent"})}</li>
        </ul>

        <h2 className={styles.subheading}>{translate({message: "Third-party data processing and compliance"})}</h2>
        <p className={styles.text}>
          {translate({message: "Data collected through these services may be processed by their respective providers under the terms of their privacy policies:"})}
        </p>
        <ul className={styles.bulletList}>
          <li className={styles.text}><a href="https://www.algolia.com/policies/privacy/" target="_blank" rel="noopener noreferrer">{translate({message: "Algolia Privacy Policy"})}</a></li>
          <li className={styles.text}><a href="https://www.arcade.software/privacy" target="_blank" rel="noopener noreferrer">{translate({message: "Arcade Privacy Policy"})}</a></li>
          <li className={styles.text}><a href="https://cloud.google.com/terms/cloud-privacy-notice" target="_blank" rel="noopener noreferrer">{translate({message: "Google Cloud Privacy Notice"})}</a></li>
          <li className={styles.text}><a href="https://www.zoho.com/privacy.html" target="_blank" rel="noopener noreferrer">{translate({message: "Zoho Privacy Policy"})}</a></li>
        </ul>
        <p className={styles.text}>
          {translate({message: "We ensure that all third-party processors we work with maintain adequate safeguards to protect your data and comply with applicable data protection laws."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Data retention and your rights"})}</h2>
        <p className={styles.text}>
          {translate({message: "Aggregated and anonymized usage data may be retained for internal analytics purposes. If you voluntarily provide personal data (for example, through a demo form), it will be processed and stored according to our internal data retention policy."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Your rights"})}</h2>
        <p className={styles.text}>
          {translate({message: "Beyond what you voluntarily provide (a release update subscription or a demo form submission), we hold no personal information about you to access, modify, or delete. To remove a subscription, use the unsubscribe link in any release update email. You can clear your browser cookies at any time to remove the single functional cookie we use."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Changes to this policy"})}</h2>
        <p className={styles.text}>
          {translate({message: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."})}
        </p>
      </div>
    </Layout>
  );
}