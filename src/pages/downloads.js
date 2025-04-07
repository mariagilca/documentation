import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DownloadCard from '@site/src/components/DownloadCard';
import InstallationInstructions from '@site/src/components/InstallationInstructions';
import styles from './downloads.module.css';

const DownloadComponentsList = [
  {
    title: 'Broker',
    image: require('@site/static/img/configure.png').default,
    description: (
      <>
        The OpenLM Broker is installed on the license server machine and facilitates communication
        between the OpenLM Server and license managers.
      </>
    ),
    version: '25.2.6.1326',
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
    title: 'Workstation Agent',
    image: require('@site/static/img/configure.png').default,
    description: (
      <>
        The OpenLM Workstation Agent is a lightweight application that runs on the user's workstation.
      It captures real usage data and idle times. 
       Furthermore, it identifies idle open sessions and safely releases them. 
       Install it on any number of workstations.
      </>
    ),
    version: '25.4.4',
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
    title: 'Workstation Agent – side-by-side mode',
    image: require('@site/static/img/configure.png').default,
    description: (
      <>
       Run alongside Legacy OpenLM and Annapurna.<br/>
    

  
      </>
    ),
    version: '25.4.4',
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
    title: 'Cloud Broker Agent',
    image: require('@site/static/img/configure.png').default,
    description: (
      <>
      
      The Cloud Broker Agent monitors cloud-based licensed services. 
       It runs on Windows, connects with Chrome, and communicates with the OpenLM Broker Hub for data and commands. 
      </>
    ),
    version: '25.3.21.752',
    downloadLinks: [
      { platformName: 'msi', link: 'https://www.openlm.com/download/Annapurna-Cloud-Broker-Agent/latest/latest' }
    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: [ 'Windows']
  },
  {
    title: 'Directory Synchronization Agent',
    image: require('@site/static/img/configure.png').default,
    description: (
      <>
The DSA works with the Directory Synchronization Service (DSS) by retrieving sync definitions, collecting user data from domain directories, and sending it back to DSS.

It can be installed on any machine in your network.<br/>
    •    For local directories (e.g., LDAP), the machine must have network access to the directory.<br/>
    •    For cloud directories (e.g., Azure AD, Google), the machine must have external internet access to reach the directory.
      </>
    ),
    version: '1.25.318',
    downloadLinks: [
      { platformName: 'msi', link: 'https://www.openlm.com/download/Annapurna-DSA/latest/latest' }
    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: [ 'Windows']
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
  const title = 'OpenLM Components download hub';
  return (
    <Layout
      title={title}
      description={title}>
      <main>
      <div className={styles['header-container']}>
          <h1 className={styles['downloads-title']}>OpenLM Components</h1>
          <p className={styles['downloads-description']}>
          Download the necessary components to enable full functionality of your OpenLM system. Each component plays a critical role in license monitoring, usage tracking, and user management.
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
