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
  <div className={styles.lastUpdated}>{translate({message: "Last updated: 07/10/2025"})}</div>
        <p className={styles.text}>
          {translate({message: "The OpenLM documentation website is committed to protecting your privacy and being transparent about our data practices. This privacy policy explains what minimal data we collect and how we use it on our documentation platform."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Cookies"})}</h2>
        <p className={styles.text}>
          {translate({message: "The OpenLM documentation website uses only one cookie for managing the website usage modal visibility. This cookie is essential for the proper functioning of the documentation site and ensures you don't see repeated modal dialogs during your browsing session."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Data collection"})}</h2>
        <ul className={styles.bulletList}>
          <li className={styles.text}>{translate({message: "We do not collect any personal data."})}</li>
          <li className={styles.text}>{translate({message: "We do not collect any anonymized or pseudonymized data."})}</li>
          <li className={styles.text}>{translate({message: "We do not use any third-party trackers or analytics services."})}</li>
        </ul>

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
          {translate({message: "Given that we don't collect personal data (unless you voluntarily submit it through interactive demos), there is no personal information to access, modify, or delete beyond what you choose to provide. You can clear your browser cookies at any time to remove the single functional cookie we use."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Changes to this policy"})}</h2>
        <p className={styles.text}>
          {translate({message: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."})}
        </p>
      </div>
    </Layout>
  );
}