import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DownloadCard from '@site/src/components/DownloadCard';
import InstallationInstructions from '@site/src/components/InstallationInstructions';
import styles from './downloads.module.css';
import { translate } from '@docusaurus/Translate';


const DownloadComponentsList = [
  {
    title: translate({ id: 'downloads.broker.title', message: 'Broker' }),
    image: require('@site/static/img/configure.png').default,
    description: <>{translate({ id: 'downloads.broker.description', message: 'The OpenLM Broker is installed on the license server machine and facilitates communication between the OpenLM Server and license managers.' })}</>,
    version: '25.7.7.711',
    downloadLinks: [
      { platformName: 'msi', link: 'https://www.openlm.com/download/BrokerWin/latest' },
      { platformName: 'deb', link: 'https://www.openlm.com/download/Broker/Nix/deb/latest' },
      { platformName: 'rpm', link: 'https://www.openlm.com/download/Broker/Nix/rpm/latest' },
      { platformName: 'tar.gz', link: 'https://www.openlm.com/download/Broker/Nix/tar.gz/latest' }

    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: ['Linux', 'Windows']
  },
  {
    title: translate({ id: 'downloads.workstation.title', message: 'Workstation Agent' }),
    image: require('@site/static/img/configure.png').default,
    description: <>{translate({ id: 'downloads.workstation.description', message: "The OpenLM Workstation Agent is a lightweight application that runs on the user's workstation. It captures real usage data and idle times. Furthermore, it identifies idle open sessions and safely releases them. Install it on any number of workstations." })}</>,
    version: '25.7.4.1210',
    downloadLinks: [
      { platformName: 'msi', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/msi/latest/' },
      { platformName: 'deb', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/deb/latest/' },
      { platformName: 'rpm', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/rpm/latest/' },
      { platformName: 'tar.gz', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/targz/latest/' },

    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: ['Linux', 'Windows']
  },

  {
    title: translate({ id: 'downloads.workstation.sxs.title', message: 'Workstation Agent – Side-by-Side Mode' }),
    image: require('@site/static/img/configure.png').default,
    description: <div dangerouslySetInnerHTML={{
      __html: translate({
        id: 'downloads.workstation.sxs.description',
        message: 'Run alongside Legacy OpenLM and Annapurna.<br/><br/><strong>Note:</strong><br/>For silent installation, ensure your script includes: <code>SETUP_MODE="Standalone"</code>.<br/>Without this setting, the Workstation Agent (side-by-side) will uninstall the existing product. When configured correctly, it installs it side-by-side.'
      })
    }} />,
    version: '25.7.4.1237',
    downloadLinks: [
      { platformName: 'msi', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/side-by-side/msi/latest/' },
      { platformName: 'deb', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/side-by-side/deb/latest/' },
      { platformName: 'rpm', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/side-by-side/rpm/latest/' },
      { platformName: 'tar.gz', link: 'https://www.openlm.com/download/Annapurna-Workstation-Agent/side-by-side/targz/latest/' },
    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: ['Linux', 'Windows']
  },

  {
    title: translate({ id: 'downloads.dsa.title', message: 'Directory Synchronization Agent' }),
    image: require('@site/static/img/configure.png').default,
    description: <div dangerouslySetInnerHTML={{
      __html: translate({
        id: 'downloads.dsa.description',
        message: 'The DSA works with the Directory Synchronization Service (DSS) by retrieving sync definitions, collecting user data from domain directories, and sending it back to DSS.<br/><br/>It can be installed on any machine in your network.<br/>&bull; For local directories (e.g., LDAP), the machine must have network access to the directory.<br/>&bull; For cloud directories (e.g., Azure AD, Google), the machine must have external internet access to reach the directory.'
      })
    }} />,
    version: '1.25.724',
    downloadLinks: [
      { platformName: 'msi', link: 'https://www.openlm.com/download/Annapurna-DSA/latest/latest' }
    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: ['Windows']
  }
];

function DownloadCards() {
  return (
    <>
      {DownloadComponentsList.map((props, idx) => (
        <DownloadCard key={idx} {...props} />
      ))}
    </>
  );
}

export default function Downloads() {
  const title = translate({ id: 'downloads.pageTitle', message: 'OpenLM Components download hub' });
  return (
    <Layout
      title={title}
      description={title}>
      <main>
        <div className={styles['header-container']}>
          <h1 className={styles['downloads-title']}>{translate({ id: 'downloads.header.title', message: 'OpenLM Components' })}</h1>
          <p className={styles['downloads-description']}>
            {translate({ id: 'downloads.header.description', message: 'Download the necessary components to enable full functionality of your OpenLM system. Each component plays a critical role in license monitoring, usage tracking, and user management.' })}
          </p>
        </div>
        <div>
          <DownloadCards />
        </div>
        <InstallationInstructions />
      </main>
    </Layout>
  );
}
