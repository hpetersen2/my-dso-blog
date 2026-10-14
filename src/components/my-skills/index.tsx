import type {ReactNode} from 'react';

import {skills} from '../../data/skills';
import Container from '../container';
import SectionTitle from '../section-title';
import SkillCard from '../skill-card';
import SkillCarousel from '../skill-carousel';
import styles from './my-skills.module.css';

export default function MySkills(): ReactNode {
  return (
    <section id="skills" className={styles.section}>
      <Container>
        <SectionTitle>My skills</SectionTitle>

        <div className={styles.grid}>
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

        <div className={styles.carousel}>
          <SkillCarousel />
        </div>
      </Container>
    </section>
  );
}
