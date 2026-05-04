import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DownloadCard from '@site/src/components/DownloadCard';
import InstallationInstructions from '@site/src/components/InstallationInstructions';
import styles from './downloads.module.css';
import { translate } from '@docusaurus/Translate';


// Note label is reused across cards.
const noteLabel = (
  <strong>
    {translate({ id: 'downloads.note.label', message: 'Note:' })}
  </strong>
);

const workstationDescription = (
  <>
    <p style={{margin: 0}}>
      {translate({
        id: 'downloads.workstation.description',
        message:
          "The OpenLM Workstation Agent is a lightweight application that runs on the user's workstation. It captures real usage data and idle times. Furthermore, it identifies idle open sessions and safely releases them. Install it on any number of workstations.",
      })}
    </p>
    <p style={{marginTop: '0.75rem', marginBottom: 0}}>
      {noteLabel}{' '}
      {translate({
        id: 'downloads.workstation.description.note',
        message:
          'This version of Workstation Agent is required for compatibility with Dongle Monitoring in production.',
      })}
    </p>
  </>
);

const sxsDescription = (
  <>
    <p style={{margin: 0}}>
      {translate({
        id: 'downloads.workstation.sxs.description.body',
        message: 'Run alongside OpenLM Legacy and OpenLM Platform Annapurna version.',
      })}
    </p>
    <p style={{marginTop: '0.75rem', marginBottom: 0}}>
      {noteLabel}{' '}
      {translate({
        id: 'downloads.workstation.sxs.description.silent',
        message:
          'For silent installation, ensure your script includes SETUP_MODE="Standalone". Without this setting, the Workstation Agent (side-by-side) will uninstall the existing product. When configured correctly, it installs it side-by-side.',
        values: {},
      })}
    </p>
    <p style={{marginTop: '0.75rem', marginBottom: 0}}>
      {noteLabel}{' '}
      {translate({
        id: 'downloads.workstation.sxs.description.note',
        message:
          'This version of Workstation Agent is required for compatibility with Dongle Monitoring in production.',
      })}
    </p>
  </>
);

const dsaDescription = (
  <>
    <p style={{margin: 0}}>
      {translate({
        id: 'downloads.dsa.description.body',
        message:
          'The DSA works with the Directory Synchronization Service (DSS) by retrieving sync definitions, collecting user data from domain directories, and sending it back to DSS.',
      })}
    </p>
    <p style={{marginTop: '0.75rem', marginBottom: '0.25rem'}}>
      {translate({
        id: 'downloads.dsa.description.lead',
        message: 'It can be installed on any machine in your network.',
      })}
    </p>
    <ul style={{margin: 0, paddingLeft: '1.25rem'}}>
      <li>
        {translate({
          id: 'downloads.dsa.description.local',
          message:
            'For local directories (e.g., LDAP), the machine must have network access to the directory.',
        })}
      </li>
      <li>
        {translate({
          id: 'downloads.dsa.description.cloud',
          message:
            'For cloud directories (e.g., Azure AD, Google), the machine must have external internet access to reach the directory.',
        })}
      </li>
    </ul>
  </>
);

const DownloadComponentsList = [
  {
    title: translate({ id: 'downloads.broker.title', message: 'Broker' }),
    image: require('@site/static/img/configure.png').default,
    description: (
      <p style={{margin: 0}}>
        {translate({
          id: 'downloads.broker.description',
          message:
            'The OpenLM Broker is installed on the license server machine and facilitates communication between the OpenLM Server and license managers.',
        })}
      </p>
    ),
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
    description: workstationDescription,
    version: '25.9.26.1338',
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
    description: sxsDescription,
    version: '25.9.26.1340',
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
    description: dsaDescription,
    version: '1.25.027.1034',
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
      {DownloadComponentsList.map((props) => (
        <DownloadCard key={props.title} {...props} />
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
      <div>
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
      </div>
    </Layout>
  );
}
