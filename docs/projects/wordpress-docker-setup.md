---
title: WordPress Docker Setup
description: A reusable Docker Compose setup for deploying isolated WordPress instances quickly and consistently.
---

# WordPress Docker Setup

A reusable Docker setup for deploying WordPress quickly and consistently. It spins up isolated WordPress environments for development, testing, or repeated project setups with minimal effort.

## TOC

- [Description](#description)
- [Features](#features)
- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
  - [Adjusting Configuration](#adjusting-configuration)
  - [Container Management](#container-management)
- [Security Notes](#security-notes)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/hpetersen2/wordpress-docker-setup/"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Description

The repository provides a ready-to-use Docker configuration that installs WordPress together with a database. Its purpose is to:

- Offer a **simple, consistent, and repeatable** WordPress setup
- Allow the configuration of multiple independent WordPress instances
- Reduce setup time by automating environment preparation

**Contents of the repository:**

- `docker-compose.yml` — WordPress and database containers
- `.env.template` — Template with all configurable environment variables
- Startup instructions for local development or server deployment

## Features

- Quick WordPress deployment using Docker
- Fully configurable via `.env`
- Easily replicable for multiple projects
- Suitable for local development or server environments
- No manual database setup required

## Quickstart

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- Docker Compose v2+
- Git

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/HPetersen2/wordpress-docker-setup.git
   cd wordpress-docker-setup
   ```

2. **Copy the environment file**

   ```bash
   cp .env.template .env
   ```

3. **Fill in the required values** inside `.env`, for example:

   - `WORDPRESS_DB_NAME`
   - `WORDPRESS_DB_USER`
   - `WORDPRESS_DB_PASSWORD`
   - `WORDPRESS_PORT`

4. **Start the containers**

   ```bash
   docker compose up -d
   ```

5. **Open WordPress** in your browser (by default `http://localhost:8080`, depending on `WORDPRESS_PORT`) and complete the installation wizard.

## Usage

This section explains configuration options and how to manage the running setup.

### Adjusting Configuration

All customizable values are located in the `.env` file.

```env
WORDPRESS_DB_NAME=your_database
WORDPRESS_DB_USER=your_user
WORDPRESS_DB_PASSWORD=<choose-a-strong-password>
WORDPRESS_PORT=8080
```

WordPress is then available at `http://localhost:<WORDPRESS_PORT>`. After changing values, apply them with `docker compose up -d`.

To run multiple independent instances, clone the repository once per instance and use a different `WORDPRESS_PORT` for each.

### Container Management

Stop containers:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

Restart:

```bash
docker compose restart
```

:::warning
`docker compose down -v` also removes the volumes and therefore **deletes the database and all WordPress data**. Use it only if you want to start from scratch.
:::

## Security Notes

- Never commit your `.env` file; it contains credentials. Only `.env.template` belongs in version control.
- Use strong, unique database passwords.
- When deploying to a server, put WordPress behind a reverse proxy with HTTPS instead of exposing the port directly.
