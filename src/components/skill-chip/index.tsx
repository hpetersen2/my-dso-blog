import type {ReactNode} from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import type {Skill} from '../../data/skills';
import styles from './skill-chip.module.css';

interface SkillChipProps {
  skill: Skill;
}

export default function SkillChip({skill}: SkillChipProps): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();

  return (
    <li className={styles.chip}>
      <img src={withBaseUrl(skill.icon)} alt="" />
      <span>{skill.chipLabel}</span>
    </li>
  );
}
