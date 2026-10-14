import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import '@fontsource-variable/quicksand';
import '@fontsource-variable/reddit-sans';

import Header from '../components/header';

import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <HtmlClassNameProvider className="portfolio-home">
      <Layout
        title="Portfolio"
        description="Portfolio of a DevSecOps engineer: skills, project highlights and contact."
        noFooter>
        <div className={styles.portfolio}>
          <Header />
          <main>
          </main>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
