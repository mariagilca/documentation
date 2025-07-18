import React from 'react';
import Layout from '@theme/Layout';
import styles from './privacy-policy.module.css';

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      <div className={styles.container}>
        <h1 className={styles.heading}>OpenLM documentation – privacy policy</h1>
        <div className={styles.lastUpdated}>Last updated: 18/07/2025</div>
        <p className={styles.text}>
          The OpenLM documentation website is committed to protecting your privacy and being transparent about our data practices. This privacy policy explains what minimal data we collect and how we use it on our documentation platform.
        </p>

        <h2 className={styles.subheading}>Cookies</h2>
        <p className={styles.text}>
          The OpenLM documentation website uses only one cookie for managing the website usage modal visibility. This cookie is essential for the proper functioning of the documentation site and ensures you don't see repeated modal dialogs during your browsing session.
        </p>

        <h2 className={styles.subheading}>Data collection</h2>
        <ul className={styles.bulletList}>
          <li className={styles.text}>We do <strong>not</strong> collect any personal data.</li>
          <li className={styles.text}>We do <strong>not</strong> collect any anonymized or pseudonymized data.</li>
          <li className={styles.text}>We do <strong>not</strong> use any third-party trackers or analytics services.</li>
        </ul>

        <h2 className={styles.subheading}>Search keywords</h2>
        <p className={styles.text}>
          We track search keywords entered on the OpenLM documentation site to improve our documentation content and user experience. <strong>These search keywords are not associated with any user identification or personal information.</strong>
        </p>

        <p className={styles.text}>
          Your use of this website implies consent to this minimal and privacy-respecting setup.
        </p>

        <h2 className={styles.subheading}>Your rights</h2>
        <p className={styles.text}>
          Given that we don't collect personal data, there is no personal information to access, modify, or delete. You can clear your browser cookies at any time to remove the single functional cookie we use.
        </p>

        <h2 className={styles.subheading}>Changes to this policy</h2>
        <p className={styles.text}>
          We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
        </p>
      </div>
    </Layout>
  );
}