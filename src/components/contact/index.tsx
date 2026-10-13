import type {ReactNode} from 'react';

import Container from '../container';
import SectionTitle from '../section-title';
import styles from './contact.module.css';


const MAIL = 'kontakt@henrik-petersen.de';
const PROFILE_URL = 'https://www.linkedin.com/in/henrik-petersen-9b08b3346/';

function MailIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="15.25" fill="#266ad9" stroke="#fff" strokeWidth="1.5" />
      <rect
        x="7.5"
        y="10.5"
        width="17"
        height="11"
        rx="2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
      />
      <path d="m8 12 8 6 8-6" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="15.25" fill="#266ad9" stroke="#fff" strokeWidth="1.5" />
      <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round">
        <circle cx="10" cy="10" r="1.6" />
        <path d="M8.5 13.5h3v9h-3zM14 13.5h3v1.2c.7-1 1.8-1.6 3.2-1.6 2.3 0 3.3 1.5 3.3 3.8v5.6h-3v-5c0-1.1-.5-1.8-1.5-1.8s-2 .8-2 2v4.8h-3z" />
      </g>
    </svg>
  );
}


export default function Contact(): ReactNode {
  return (
    <section id="contact" className={styles.section}>
      <Container>
        <SectionTitle>Contact me</SectionTitle>

        <div className={styles.grid}>
          <div className={styles.info}>
            <p>Include the Information like:</p>
            <ul>
              <li>Feel free to reach out with job offers or opportunities like…</li>
              <li>What role are you looking for?</li>
              <li>How you will contribute to the new team.</li>
              <li>Are you open for remote work or even relocate?</li>
            </ul>
          </div>

          <div className={styles.links}>
            <p className={styles.lead}>Looking forward to hearing from you!</p>
            <a className={styles.link} href={`mailto:${MAIL}`}>
              <MailIcon />
              <span>{MAIL}</span>
            </a>
            <a
              className={`${styles.link} ${styles.underline}`}
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer">
              <ProfileIcon />
              <span>Profile Page</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
