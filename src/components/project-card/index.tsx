import type {ReactNode} from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import type {Project} from '../../data/projects';
import {skills} from '../../data/skills';
import type {Skill} from '../../data/skills';
import Button from '../button';
import SkillChip from '../skill-chip';
import styles from './project-card.module.css';

interface ProjectCardProps {
  project: Project;
  heading: string;
}

export default function ProjectCard({project, heading}: ProjectCardProps): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();

  const projectSkills = project.tags
    .map((tag) => skills.find((skill) => skill.name === tag))
    .filter((skill): skill is Skill => skill !== undefined);

  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{heading}</h3>

      <ul className={styles.chips}>
        {projectSkills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </ul>

      <img
        className={styles.image}
        src={withBaseUrl(project.image)}
        alt={`Screenshot of ${project.title}`}
      />

      <div className={styles.body}>
        <p className={styles.text}>{project.description}</p>
        <div className={styles.actions}>
          <Button href={project.docsUrl} variant="primary">
            Documentation
          </Button>
          {project.githubUrl && (
            <Button href={project.githubUrl} variant="outline">
              GitHub
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
