import type {ReactNode} from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import Button from '../button';
import Container from '../container';
import styles from './hero.module.css';

export default function Hero(): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();

  return (
    <Container className={styles.hero}>
      <div className={styles.text}>
        <p className={styles.greeting}>Hey there. 👋 I am</p>
        <h1 className={styles.name}>Henrik Petersen</h1>
        <p className={styles.role}>DevSecOps Engineer</p>
        <p className={styles.about}>
          I love building things from scratch that make people’s daily work easier. With a
          full-stack background, I focus on running software securely in the cloud and keep growing
          through continuous training and personal projects.
        </p>
        <div className={styles.cta}>
          <Button href="#contact" size="small">
            Contact me
          </Button>
        </div>
      </div>
      <img
        className={styles.image}
        src={withBaseUrl('/img/portfolio/profile.webp')}
        alt="Portrait of Henrik Petersen"
      />
    </Container>
  );
}
