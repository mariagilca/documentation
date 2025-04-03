// InstallationInstructions.js
import React from 'react';
import styles from './index.module.css';

export default function InstallationInstructions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Installation Instructions</h2>
      <p className={styles.subtitle}>
        Each component has specific installation requirements. For detailed instructions, please refer to our documentation.
      </p>
      <ul className={styles.list}>
        <li>Download the appropriate component installer for your system.</li>
        <li>Run the installer as an administrator on the target machine.</li>
        <li>Follow the on-screen instructions to complete the installation.</li>
        <li>Configure the component to connect to your OpenLM Server.</li>
      </ul>
    </div>
  );
}