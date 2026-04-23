import Layout from '@theme/Layout';
import DeploymentCards from '@site/src/components/DeploymentCards';
import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageDemo from '@site/src/components/HomepageDemo';
import HomepageSupported from '@site/src/components/HomepageSupported';
import {translate} from '@docusaurus/Translate';

export default function Home() {
  return (
    <Layout
      title={translate({message: 'Home'})}
      description={translate({message: 'OpenLM Documentation - License Management and Monitoring'})}>
      <div className="homepage-main">
        <HomepageHeader />
        <HomepageDemo />
        <DeploymentCards />
        <HomepageSupported />
      </div>
    </Layout>
  );
}
