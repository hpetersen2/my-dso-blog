import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import Container from '../container';
import ScrollTopButton from '../scroll-top-button';
import styles from './footer.module.css';

const OWNER = 'Henrik Petersen';
const LEGAL_URL = '/legal-notice';

export default function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <ScrollTopButton />
        <p className={styles.copy}>
          © {OWNER} {new Date().getFullYear()}
        </p>
        <Link className={styles.legal} to={LEGAL_URL}>
          Legal notice
        </Link>
      </Container>
    </footer>
  );
}
