import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import styles from './button.module.css';

interface ButtonProps {
  href: string;
  variant?: 'light' | 'primary' | 'outline';
  size?: 'default' | 'small';
  children: ReactNode;
}

export default function Button({
  href,
  variant = 'light',
  size = 'default',
  children,
}: ButtonProps): ReactNode {
  const className = [styles.button, styles[variant], size === 'small' && styles.small]
    .filter(Boolean)
    .join(' ');

  if (href.startsWith('/')) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    );
  }

  const isExternal = href.startsWith('http');

  return (
    <a
      className={className}
      href={href}
      {...(isExternal && {target: '_blank', rel: 'noopener noreferrer'})}>
      {children}
    </a>
  );
}
