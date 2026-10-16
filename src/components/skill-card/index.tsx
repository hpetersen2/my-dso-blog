import type {ReactNode} from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import type {Skill} from '../../data/skills';
import styles from './skill-card.module.css';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({skill}: SkillCardProps): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();

  return (
    <div className={styles.card} tabIndex={0}>
      <div className={styles.face}>
        <img src={withBaseUrl(skill.icon)} alt="" />
        <span className={styles.label}>{skill.cardLabel}</span>
      </div>

      <div className={styles.details}>
        <h3 className={styles.detailsTitle}>How I used this skill</h3>
        <ul className={styles.detailsList}>
          {skill.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
