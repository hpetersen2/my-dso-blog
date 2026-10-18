import {useState} from 'react';
import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import {MORE_PROJECTS_URL, projects} from '../../data/projects';
import Container from '../container';
import ProjectCard from '../project-card';
import SectionTitle from '../section-title';
import styles from './project-highlights.module.css';


const DEFAULT_PROJECT_ID = 'minecraft';

function SeeMoreLink(): ReactNode {
  return (
    <Link className={styles.more} to={MORE_PROJECTS_URL}>
      <svg
        aria-hidden="true"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M2 2v10a3 3 0 0 0 3 3h16" />
        <path d="m17 10 5 5-5 5" transform="translate(0 -1)" />
      </svg>
      <span>see more projects</span>
    </Link>
  );
}


export default function ProjectHighlights(): ReactNode {
  const [selectedId, setSelectedId] = useState(DEFAULT_PROJECT_ID);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <section id="projects" className={styles.section}>
      <Container>
        <SectionTitle>My project highlights</SectionTitle>

        <div className={styles.desktop}>
          <div>
            <ol className={styles.list}>
              {projects.map((project) => (
                <li
                  key={project.id}
                  className={project.id === selected.id ? styles.active : undefined}>
                  <button
                    type="button"
                    aria-pressed={project.id === selected.id}
                    onClick={() => setSelectedId(project.id)}>
                    {project.title}
                  </button>
                </li>
              ))}
            </ol>
            <SeeMoreLink />
          </div>

          <ProjectCard project={selected} heading={`Project ${selected.title}`} />
        </div>

        <div className={styles.mobile}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              heading={`${index + 1}. ${project.title}`}
            />
          ))}
          <p className={styles.moreText}>
            More projects, such as a full-stack Angular and Django setup with Docker Compose and the
            setup of my first V-Server, are documented in the project overview.
          </p>
          <SeeMoreLink />
        </div>
      </Container>
    </section>
  );
}
