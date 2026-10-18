export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  docsUrl: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'baby-tools',
    title: 'Baby Tools Shop',
    description: 'A Django web shop for baby products, containerized with Docker. The same image runs locally for development and on my V-Server in production.\nAn entrypoint script prepares the database, creates the admin user, loads demo data and starts Gunicorn.',
    tags: ['HTML', 'CSS', 'Python', 'Container'],
    image: '/img/portfolio/projects/baby-tools-shop.svg',
    docsUrl: '/docs/projects/baby-tools-shop',
    githubUrl: 'https://github.com/hpetersen2/baby-tools-shop',
  },
  {
    id: 'truck-signs-api',
    title: 'Truck Signs API',
    description: 'Django REST Framework backend of an online store for customizable truck lettering vinyls. Customers configure their own lettering or upload designs and pay via Stripe.\nSeparate settings for development, Docker testing and production, with PostgreSQL as database.',
    tags: ['Python', 'Container'],
    image: '/img/portfolio/projects/truck-signs-api.svg',
    docsUrl: '/docs/projects/truck-signs-api',
    githubUrl: 'https://github.com/hpetersen2/truck-signs-api',
  },
  {
    id: 'juice-shop-meister',
    title: 'Juice Shop Master',
    description: 'Three 3-star OWASP Juice Shop challenges, each with a write-up and a demo video: an OSINT-based password reset, bypassing the upload size validation and reading the database schema via SQL injection.\nCompleted for the Developer Akademie project "Juice Shop Meister".',
    tags: ['IT Security', 'Container'],
    image: '/img/portfolio/projects/owasp-juice-shop-master.svg',
    docsUrl: '/docs/projects/owasp-juice-shop-master/overview',
  },
  {
    id: 'minecraft',
    title: 'Minecraft Server',
    description: 'A fully containerized, configurable Minecraft server that runs locally or on a V-Server with a single Docker command.\nMemory, ports and EULA are set in a .env file, world data is kept in a volume and a Python script checks whether the server is online.',
    tags: ['Yaml', 'Shell scripting', 'IT Security', 'Container'],
    image: '/img/portfolio/projects/minecraft.svg',
    docsUrl: '/docs/projects/minecraft-server',
    githubUrl: 'https://github.com/hpetersen2/Minecraft-Server',
  },
  {
    id: 'wordpress-hosten',
    title: 'WordPress Docker Setup',
    description: 'A reusable Docker Compose setup that starts WordPress together with its database in one command.\nEverything is configured in a .env file, so several isolated instances for development, testing or repeated projects can run side by side.',
    tags: ['Container', 'Yaml'],
    image: '/img/portfolio/projects/wordpress.svg',
    docsUrl: '/docs/projects/wordpress-docker-setup',
    githubUrl: 'https://github.com/hpetersen2/wordpress-docker-setup',
  },
];

export const MORE_PROJECTS_URL = '/docs/projects/overview';
