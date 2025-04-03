import Layout from '@theme/Layout';
import DeploymentCards from '@site/src/components/DeploymentCards';
import StartGuideCards from '@site/src/components/StartGuideCards';
import HomepageHeader from '@site/src/components/HomepageHeader';

export default function Home() {
  return (
    <Layout
      title="Home"
      description="OpenLM Documentation - License Management and Monitoring">
      <main>
        <HomepageHeader />
        <DeploymentCards />
        <StartGuideCards />
      </main>
    </Layout>
  );
}
