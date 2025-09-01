// InstallationInstructions.js
import React from 'react';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';

export default function InstallationInstructions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{translate({message: 'Installation instructions', id: 'installation.instructions.title'})}</h2>
      <p className={styles.subtitle}>
        {translate({message: 'Each component has specific installation requirements. For detailed instructions, please refer to our documentation.', id: 'installation.instructions.subtitle'})}
      </p>
      <ul className={styles.list}>
        <li>{translate({message: 'Download the appropriate component installer for your system.', id: 'installation.instructions.step1'})}</li>
        <li>{translate({message: 'Run the installer as an administrator on the target machine.', id: 'installation.instructions.step2'})}</li>
        <li>{translate({message: 'Follow the on-screen instructions to complete the installation.', id: 'installation.instructions.step3'})}</li>
        <li>{translate({message: 'Configure the component to connect to your OpenLM Server.', id: 'installation.instructions.step4'})}</li>
      </ul>
    </div>
  );
}