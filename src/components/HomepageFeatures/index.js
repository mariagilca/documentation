import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Deploy',
    Svg: require('@site/static/img/Deploy.png').default,
    description: (
      <>
        Test deploy.
      </>
    ),
  },
  {
    title: 'Configure',
    Svg: require('@site/static/img/Configure.png').default,
    description: (
      <>
        Test configure.
      </>
    ),
  },
  {
    title: 'Enjoy',
    Svg: require('@site/static/img/Enjoy.png').default,
    description: (
      <>
        Test configure.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Svg} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
