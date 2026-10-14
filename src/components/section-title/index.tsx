import type {ReactNode} from 'react';

import styles from './section-title.module.css';

interface SectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({children}: SectionTitleProps): ReactNode {
  return <h2 className={styles.title}>{children}</h2>;
}
