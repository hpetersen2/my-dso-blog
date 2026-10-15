import {useEffect, useRef, useState} from 'react';
import type {ReactNode} from 'react';

import Container from '../container';
import styles from './header.module.css';

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  {label: 'About me', href: '#about'},
  {label: 'My skills', href: '#skills'},
  {label: 'My projects', href: '#projects'},
  {label: 'Contact', href: '#contact'},
];

const HIDE_AFTER_PX = 80;

export default function Header(): ReactNode {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > HIDE_AFTER_PX);
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section) => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id === 'about' ? '' : entry.target.id);
          }
        });
      },
      {rootMargin: '-40% 0px -55% 0px'},
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isHidden = hidden && !menuOpen;

  return (
    <header className={[styles.header, isHidden && styles.hidden].filter(Boolean).join(' ')}>
      <Container className={styles.inner}>
        <nav aria-label="Main">
          <button
            type="button"
            className={[styles.burger, menuOpen && styles.burgerOpen].filter(Boolean).join(' ')}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="portfolio-menu"
            onClick={() => setMenuOpen((open) => !open)}>
            <span />
            <span />
            <span />
          </button>

          <ul
            id="portfolio-menu"
            className={[styles.list, menuOpen && styles.listOpen].filter(Boolean).join(' ')}>
            {links.map((link) => {
              const isActive = link.href === `#${activeId}`;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={[styles.link, isActive && styles.active].filter(Boolean).join(' ')}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
