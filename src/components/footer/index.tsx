import type {ReactNode} from 'react';

import Container from '../container';
import ScrollTopButton from '../scroll-top-button';
import styles from './footer.module.css';

const OWNER = 'Henrik Petersen';
const LEGAL_URL = '#';

export default function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <ScrollTopButton />
        <p className={styles.copy}>
          © {OWNER} {new Date().getFullYear()}
        </p>
        <a className={styles.legal} href={LEGAL_URL}>
          Legal notice
        </a>
      </Container>
    </footer>
  );
}
