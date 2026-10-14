export interface Skill {
  name: string;
  icon: string;
  cardLabel: string;
  chipLabel: string;
  shortLabel: string;
  details: string[];
  uses: string[];
}

export const skills: Skill[] = [
  {
    name: 'HTML',
    icon: '/img/portfolio/icons/icon_html.svg',
    cardLabel: 'HTML',
    chipLabel: 'HTML',
    shortLabel: 'HTML',
    details: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effect',
    ],
    uses: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effect',
    ],
  },
  {
    name: 'CSS',
    icon: '/img/portfolio/icons/icon_css.svg',
    cardLabel: 'CSS',
    chipLabel: 'CSS',
    shortLabel: 'CSS',
    details: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effect',
    ],
    uses: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effect',
    ],
  },
  {
    name: 'Static site generator',
    icon: '/img/portfolio/icons/icon_staticsiteGenerator.svg',
    cardLabel: 'Static site\ngenerator',
    chipLabel: 'Static site generator',
    shortLabel: 'Static\nsite',
    details: [
      'search functionality',
      'static website and customization',
      'tags, categories, and RSS feeds',
      'translation',
    ],
    uses: [
      'search functionality',
      'static website and customization',
      'tags, categories, and RSS feeds',
      'translation',
    ],
  },
  {
    name: 'Python',
    icon: '/img/portfolio/icons/icon_python.svg',
    cardLabel: 'Python',
    chipLabel: 'Python',
    shortLabel: 'Python',
    details: [
      'Build APIs',
      'spam filtering, recommendation systems',
      'automate software testing',
      'using libraries like Tkinter, PyQt, or Kivy',
    ],
    uses: [
      'Build APIs',
      'spam filtering, recommendation systems',
      'automate software testing',
      'using libraries: Tkinter, Kivy',
    ],
  },
  {
    name: 'Shell scripting',
    icon: '/img/portfolio/icons/icon_shellscripting.svg',
    cardLabel: 'Shell\nscripting',
    chipLabel: 'Shell\nscripting',
    shortLabel: 'Shell\nscripting',
    details: [
      'Adding new users and setting their permissions.',
      'Performing calculations or running statistical analysis on data.',
      'Conditional statements, loops, functions',
    ],
    uses: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Animations and hover effect',
    ],
  },
  {
    name: 'Yaml',
    icon: '/img/portfolio/icons/icon_yaml.svg',
    cardLabel: 'Yaml',
    chipLabel: 'Yaml',
    shortLabel: 'Yaml',
    details: [
      'A Kubernetes deployment',
      'store settings like database connections',
      'environment-specific variables',
      'complex data structures represent lists and maps',
    ],
    uses: [
      'A Kubernetes deployment',
      'database connections',
      'environment-specific variables',
      'complex data structures represent lists and maps',
    ],
  },
  {
    name: 'Container',
    icon: '/img/portfolio/icons/icon_docker.svg',
    cardLabel: 'Container',
    chipLabel: 'Container',
    shortLabel: 'Container',
    details: [
      'CI/CD pipelines',
      'automate building, testing, deploying applications.',
      'build microservices-based applications.',
    ],
    uses: [
      'CI/CD pipelines',
      'automate building, testing, deploying applications.',
      'use microservices',
    ],
  },
  {
    name: 'CI/CD with GitHub Actions',
    icon: '/img/portfolio/icons/icon_CD.svg',
    cardLabel: 'CI/CD with\nGitHub Actions',
    chipLabel: 'CI/CD with GitHub Actions',
    shortLabel: 'CI/CD',
    details: [
      'Automated builds and tests',
      'pre-built actions for common tasks',
      'push, pull request, or schedule',
      'Automated deployments',
    ],
    uses: [
      'Automated builds and tests',
      'pre-built actions',
      'push, pull request, schedule',
      'Automated deployments',
    ],
  },
  {
    name: 'IT Security',
    icon: '/img/portfolio/icons/icon_itSecurity.svg',
    cardLabel: 'IT Security',
    chipLabel: 'IT Security',
    shortLabel: 'IT\nSecurity',
    details: [
      'simulate attacks and identify vulnerabilities',
      'Setting up multi-factor authentication',
      'login security',
      'Implement authentication and authorization mechanisms',
    ],
    uses: [
      'simulate attacks and identify vulnerabilities',
      'Setting up multi-factor authentication',
      'login security',
      'Implement authentication & authorization mechanisms',
    ],
  },
];

export const skillSlides: Skill[][] = [
  skills.slice(0, 3),
  skills.slice(3, 6),
  skills.slice(6, 9),
];
