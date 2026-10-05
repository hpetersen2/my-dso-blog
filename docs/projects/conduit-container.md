---
title: Conduit Container
description: An Angular frontend and Django backend run together in a containerized environment with Docker Compose.
---

# Conduit Container

A Docker-based setup to run an Angular frontend and a Django backend together in a unified, containerized environment. This project demonstrates how to package, network, and secure multiple services using Docker and Docker Compose for local development and cloud-ready deployment.

The main goal of this project is to consolidate knowledge in containerization, networking, and basic network security by operating a full-stack application stack in isolated yet connected containers.

## TOC

- [Installation / Quickstart](#installation--quickstart)
  - [Prerequisites](#prerequisites)
  - [Setup Steps](#setup-steps)
- [Usage](#usage)
  - [Starting and Stopping Services](#starting-and-stopping-services)
  - [Creating a Django Superuser](#creating-a-django-superuser)
  - [Accessing Services](#accessing-services)
  - [Database Management](#database-management)
  - [Viewing Logs](#viewing-logs)
  - [Running Django Management Commands](#running-django-management-commands)
  - [Rebuilding Containers](#rebuilding-containers)
  - [Updating Submodules](#updating-submodules)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)
- [License](#license)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/hpetersen2/conduit-container"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Installation / Quickstart

Follow these steps to get the project up and running locally.

### Prerequisites

* Docker Desktop (Docker Engine + Docker Compose)
* Git

If Docker is not installed, follow the official installation guide:

* Docker Desktop (Windows / macOS): [https://docs.docker.com/desktop/](https://docs.docker.com/desktop/)
* Docker Engine (Linux): [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

After installation, verify Docker:

```bash
docker --version
docker compose --version
```

### Setup Steps

1. Clone the project repository:

   ```bash
   git clone git@github.com:HPetersen2/conduit-container.git
   cd conduit-container
   ```

2. Initialize and update Git submodules (frontend & backend):

   ```bash
   git submodule update --init --recursive
   ```

3. Copy the environment template file and adjust the values (ports, secrets):

   ```bash
   cp .env.template .env
   ```

4. Make sure Docker Desktop is installed and running.

5. Build and start all services:

   ```bash
   docker compose up --build -d
   ```

6. To stop and remove the containers:

   ```bash
   docker compose down
   ```

---

## Usage

After starting the stack with Docker Compose, the containers run together within a shared Docker network. The Angular frontend consumes the backend via the service name defined in `docker-compose.yml`. All configuration (ports, hostnames, secrets) is controlled via the `.env` file.

### Starting and Stopping Services

Start the stack in detached mode:
```bash
docker compose up -d
```

Start the stack with build (useful after code changes):
```bash
docker compose up --build -d
```

Stop and remove containers (volumes and database data are preserved):
```bash
docker compose down
```

Stop and remove containers **and volumes** (deletes the database data):
```bash
docker compose down --volumes
```

### Creating a Django Superuser

To access the Django admin interface, you need to create a superuser account:
```bash
docker compose exec backend python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password. After creation, you can log in to the Django admin panel.

### Accessing Services

Once the containers are running, the services are available at:

* **Frontend (Angular)**: `http://localhost:4200`
* **Backend (Django API)**: `http://localhost:8000`
* **Django Admin Panel**: `http://localhost:8000/admin`

Make sure the ports match those defined in your `.env` file.

### Database Management

Run Django migrations to set up or update the database schema:
```bash
docker compose exec backend python manage.py migrate
```

Create new migrations after model changes:
```bash
docker compose exec backend python manage.py makemigrations
```

Access the database shell:
```bash
docker compose exec backend python manage.py dbshell
```

### Viewing Logs

View logs from all services:
```bash
docker compose logs -f
```

View logs from a specific service (e.g., backend):
```bash
docker compose logs -f backend
```

View logs from the frontend:
```bash
docker compose logs -f frontend
```

### Running Django Management Commands

Execute any Django management command inside the backend container:
```bash
docker compose exec backend python manage.py <command>
```

Examples:
```bash
# Check for issues
docker compose exec backend python manage.py check

# Collect static files
docker compose exec backend python manage.py collectstatic --no-input

# Create a new Django app
docker compose exec backend python manage.py startapp myapp

# Load fixture data
docker compose exec backend python manage.py loaddata fixtures/initial_data.json
```

### Rebuilding Containers

If you've made changes to Dockerfiles or dependencies, rebuild the containers:
```bash
docker compose build
```

Rebuild a specific service:
```bash
docker compose build backend
```

Rebuild without cache (clean build):
```bash
docker compose build --no-cache
```

### Updating Submodules

If the Git submodules (frontend or backend) need to be updated, run the following command:
```bash
git pull --recurse-submodules
git submodule update --init --recursive
```

---

## Architecture Overview

* **Angular Frontend**: Built and served from a dedicated frontend container
* **Django Backend**: Runs in its own container with isolated dependencies
* **Docker Network**: Enables secure communication between services
* **Environment Variables**: Centralized configuration via `.env` file

This setup mirrors real-world cloud deployments and encourages best practices in service isolation and network security.

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/HPetersen2/conduit-container/blob/main/LICENSE) file for details.