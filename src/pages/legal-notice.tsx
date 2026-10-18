import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import '@fontsource-variable/quicksand';
import '@fontsource-variable/reddit-sans';

import Container from '../components/container';
import Footer from '../components/footer';
import portfolio from './index.module.css';
import styles from './legal-notice.module.css';

export default function LegalNotice(): ReactNode {
  return (
    <HtmlClassNameProvider className="portfolio-home">
      <Layout title="Legal notice" description="Legal notice." noFooter>
        <div className={portfolio.portfolio}>
          <main className={styles.main}>
            <Container>
              <Link className={styles.back} to="/">
                ← Back to portfolio
              </Link>
              <h1 className={styles.title}>Legal notice</h1>

              <section>
                <h2>Information according to § 5 DDG</h2>
                <p>
                  Henrik Petersen
                  <br />
                  Uslarer Str. 29
                  <br />
                  37170 Uslar
                </p>
              </section>

              <section>
                <h2>Contact</h2>
                <p>
                  Phone: <a href="tel:+4917656035923">+49 176 56035923</a>
                  <br />
                  Email: <a href="mailto:kontakt@henrik-petersen.de">kontakt@henrik-petersen.de</a>
                </p>
              </section>
            </Container>
          </main>
          <Footer />
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
