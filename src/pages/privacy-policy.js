import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';
import {translate} from '@docusaurus/Translate';

export default function PrivacyPolicy() {
  return (
    <Layout title={translate({message: "Privacy Policy"})}>
      <div className={styles.container}>
        <h1 className={styles.heading}>{translate({message: "OpenLM documentation – privacy policy"})}</h1>
        <div className={styles.lastUpdated}>{translate({message: "Last updated: 18/07/2025"})}</div>
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

        <h2 className={styles.subheading}>{translate({message: "Your rights"})}</h2>
        <p className={styles.text}>
          {translate({message: "Given that we don't collect personal data, there is no personal information to access, modify, or delete. You can clear your browser cookies at any time to remove the single functional cookie we use."})}
        </p>

        <h2 className={styles.subheading}>{translate({message: "Changes to this policy"})}</h2>
        <p className={styles.text}>
          {translate({message: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically."})}
        </p>
      </div>
    </Layout>
  );
}