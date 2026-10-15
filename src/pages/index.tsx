import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import '@fontsource-variable/quicksand';
import '@fontsource-variable/reddit-sans';

import Contact from '../components/contact';
import Footer from '../components/footer';
import Header from '../components/header';
import Hero from '../components/hero';
import MySkills from '../components/my-skills';
import ProjectHighlights from '../components/project-highlights';
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
            <section id="about" className={styles.about}>
              <Hero />
            </section>
            <MySkills />
            <ProjectHighlights />
            <Contact />
          </main>
          <Footer />
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
