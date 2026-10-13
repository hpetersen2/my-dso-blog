export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  docsUrl: string;
  githubUrl?: string;
}

const placeholderText =
  'Write some information about the project.\nFor example: Why are you proud of it?\nWhat were you able to implement here?\nWhat different algorithms, server architecture did you use?\nWhy did you find this project so interesting?';

export const projects: Project[] = [
  {
    id: 'baby-tools',
    title: 'Baby Tools',
    description: placeholderText,
    tags: ['HTML', 'CSS'],
    image: '/img/portfolio/projects/baby-tools-shop.svg',
    docsUrl: '/docs/projects/baby-tools-shop',
    githubUrl: 'https://github.com/hpetersen2/baby-tools-shop',
  },
  {
    id: 'truck-signs-api',
    title: 'Truck Signs API',
    description: placeholderText,
    tags: ['Python', 'Container'],
    image: '/img/portfolio/projects/truck-signs-api.svg',
    docsUrl: '/docs/projects/truck-signs-api',
    githubUrl: 'https://github.com/hpetersen2/truck-signs-api',
  },
  {
    id: 'juice-shop-meister',
    title: 'Juice Shop Meister',
    description: placeholderText,
    tags: ['IT Security', 'Container'],
    image: '/img/portfolio/projects/owasp-juice-shop-master.svg',
    docsUrl: '/docs/projects/owasp-juice-shop-master/overview',
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    description: placeholderText,
    tags: ['Yaml', 'Shell scripting', 'IT Security', 'Container'],
    image: '/img/portfolio/projects/minecraft.svg',
    docsUrl: '/docs/projects/minecraft-server',
    githubUrl: 'https://github.com/hpetersen2/Minecraft-Server',
  },
  {
    id: 'wordpress-hosten',
    title: 'WordPress hosten',
    description: placeholderText,
    tags: ['Container', 'Yaml'],
    image: '/img/portfolio/projects/wordpress.svg',
    docsUrl: '/docs/projects/wordpress-docker-setup',
    githubUrl: 'https://github.com/hpetersen2/wordpress-docker-setup',
  },
];

export const MORE_PROJECTS_URL = '/docs/projects/overview';
