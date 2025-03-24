import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import DownloadCard from '@site/src/components/DownloadCard';
import InstallationInstructions from '@site/src/components/InstallationInstructions';
import styles from './downloads.module.css';

const DownloadComponentsList = [
  {
    title: 'OpenLM Broker',
    image: require('@site/static/img/Configure.png').default,
    description: (
      <>
        The OpenLM Broker is installed on the license server machine and facilitates communication
        between the OpenLM Server and license managers.
      </>
    ),
    version: '25.2',
    downloadLinks: [
      { platformName: 'Windows', link: 'https://www.openlm.com/download/' },
      { platformName: 'Debian', link: 'https://www.openlm.com/download/' }
    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: ['Linux', 'Windows']
  },
  {
    title: 'OpenLM BrokerX',
    image: require('@site/static/img/Configure.png').default,
    description: (
      <>
        XThe OpenLM Broker is installed on the license server machine and facilitates communication
        between the OpenLM Server and license managers.
      </>
    ),
    version: '25.2',
    downloadLinks: [
      { platformName: 'Windows', link: 'https://www.openlm.com/download/' }
    ],
    learnMoreLink: 'https://www.openlm.com/',
    supportedOSVersions: ['Linux', 'Windows']
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
  //const {siteConfig} = useDocusaurusContext();
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
