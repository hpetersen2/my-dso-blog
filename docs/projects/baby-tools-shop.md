---
title: Baby Tools Shop
description: A Django e-commerce app for baby products, containerized with Docker and deployed on a V-Server.
---

# Baby Tools Shop - Containerized with Docker

A Django-based e-commerce web application for baby products, containerized with Docker for easy deployment and development.

## TOC

- [Description](#description)
- [Quickstart](#quickstart)
- [Running the Container](#running-the-container)
  - [Development Mode](#development-mode)
  - [Production Mode (V-Server)](#production-mode-v-server)
  - [Updating the Application](#updating-the-application)
  - [Useful Commands](#useful-commands)
- [Configuration](#configuration)
  - [Port](#port)
  - [Environment Variables](#environment-variables)
  - [Container Naming](#container-naming)
  - [Django Settings](#django-settings)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Security Notes](#security-notes)
- [Known Limitations](#known-limitations)
- [License](#license)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/hpetersen2/baby-tools-shop"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Description

This project demonstrates how to containerize an existing Django application with Docker. The same image runs on a local machine for development and on a V-Server for production, so the application behaves identically in both environments.

**Repository contents:**

- Django web application (Python 3.9, Django 4.0.2)
- Dockerfile for building the image
- `entrypoint.sh`, which prepares the database, creates a superuser, loads demo data and starts Gunicorn
- SQLite3 database configuration

## Quickstart

**Prerequisites:**

- [Docker Desktop](https://docs.docker.com/get-docker/) installed and running
- Git installed on your system

**Steps:**

1. Clone the repository and change into the app folder (the Dockerfile lives in `babyshop_app`):

   ```bash
   git clone https://github.com/hpetersen2/baby-tools-shop.git
   cd baby-tools-shop/babyshop_app
   ```

2. Make sure `entrypoint.sh` uses **LF** line endings (important on Windows). With CRLF the container fails to start. In VS Code, click "CRLF" in the bottom-right corner, select "LF" and save.

3. Build the Docker image:

   ```bash
   docker build -t babyshop_app -f Dockerfile .
   ```

4. Run the container:

   ```bash
   docker run -it --rm -p 8025:8025 babyshop_app
   ```

5. Open `http://localhost:8025` in your browser.

## Running the Container

### Development Mode

```bash
docker run -it --rm -p <host-port>:8025 <image-name>
```

- `-it`: interactive terminal, so you see the logs live
- `--rm`: removes the container when it stops (`Ctrl+C`)
- `-p <host-port>:8025`: maps a port of your machine to the container port

**Example:**

```bash
docker run -it --rm -p 3000:8025 babyshop_app
```

The app is then available at `http://localhost:3000`.

### Production Mode (V-Server)

**Prerequisites:** Docker and SSH access on the V-Server (see [V-Server Setup](./vserver-setup.md)).

1. Connect to the server, clone the repository and build the image there:

   ```bash
   ssh <username>@<your-server-ip>
   git clone https://github.com/hpetersen2/baby-tools-shop.git
   cd baby-tools-shop/babyshop_app
   docker build -t babyshop_app -f Dockerfile .
   ```

2. Start the container in the background:

   ```bash
   docker run -d --restart=always --name babyshop_app_container \
     -p 8025:8025 \
     -e DJANGO_SUPERUSER_PASSWORD='<a-strong-password>' \
     babyshop_app
   ```

- `-d`: runs the container in the background
- `--restart=always`: restarts the container after a crash or a server reboot
- `--name`: gives the container a fixed name for easy management
- `-e`: sets an environment variable (see [Environment Variables](#environment-variables))

:::warning Data is lost when the container is removed
The SQLite database (`db.sqlite3`) lives inside the container. `docker rm` deletes it, including all users and orders. To keep it, create the file on the host once and mount it:

```bash
touch db.sqlite3
docker run -d --restart=always --name babyshop_app_container \
  -p 8025:8025 \
  -v "$(pwd)/db.sqlite3:/app/db.sqlite3" \
  babyshop_app
```

Create the file **before** the first run. Otherwise Docker creates a directory with that name.
:::

### Updating the Application

```bash
git pull
docker stop babyshop_app_container
docker rm babyshop_app_container
docker build -t babyshop_app -f Dockerfile .
docker run -d --restart=always --name babyshop_app_container -p 8025:8025 babyshop_app
```

Use the same `docker run` options (`-e`, `-v`) as for the first start. Without the database volume, the update resets all data.

### Useful Commands

| Command | Description |
|---------|-------------|
| `docker ps` | Show running containers |
| `docker ps -a` | Show all containers, including stopped ones |
| `docker logs <container-name>` | Show container logs |
| `docker logs -f <container-name>` | Follow logs in real time |
| `docker stop <container-name>` | Stop a running container |
| `docker start <container-name>` | Start a stopped container |
| `docker restart <container-name>` | Restart a container |
| `docker rm <container-name>` | Remove a stopped container |
| `docker rm -f <container-name>` | Force-remove a running container |

## Configuration

### Port

The container listens on port **8025**. This value comes from the environment variable `PORT`, which is set in the Dockerfile and read by `entrypoint.sh`. You do not need to edit any file to change it.

**Change only the host port** (container stays on 8025):

```bash
docker run -it --rm -p 3000:8025 babyshop_app
```

**Change the container port** as well:

```bash
docker run -it --rm -e PORT=9000 -p 9000:9000 babyshop_app
```

The format of `-p` is `<host-port>:<container-port>`. If the host port is already in use (for example by Nginx on port 80), pick another one.

### Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8025` | Port Gunicorn listens on inside the container |
| `DJANGO_SUPERUSER_USERNAME` | `admin` | Username of the admin account created on startup |
| `DJANGO_SUPERUSER_EMAIL` | `admin@example.com` | Email of the admin account |
| `DJANGO_SUPERUSER_PASSWORD` | `adminpassword` | Password of the admin account |

:::danger Change the default admin password
If you do not set `DJANGO_SUPERUSER_PASSWORD`, the admin account is created with the publicly known password `adminpassword`. Always set your own value on a server.
:::

You can pass several variables from a file with `--env-file`:

```bash
docker run -d --restart=always --name babyshop_app_container \
  --env-file .env -p 8025:8025 babyshop_app
```

Keep this `.env` file out of Git. It is already listed in `.dockerignore`, so it is not copied into the image.

### Container Naming

Use clear names, especially when several containers run on the same host:

```bash
docker run -d --restart=always --name babyshop_prod -p 8025:8025 babyshop_app
```

- Use descriptive names with an environment indicator (`babyshop_dev`, `babyshop_prod`)
- Use only lowercase letters, numbers, underscores and hyphens

### Django Settings

All Django settings are in `babyshop_app/babyshop/settings.py`.

**Database:** SQLite3, stored as `db.sqlite3` in the project root.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

**Debug mode:** `DEBUG = True` shows detailed error pages. Set it to `False` in production.

**Allowed hosts:** With `DEBUG = False`, Django only accepts requests for hosts listed in `ALLOWED_HOSTS`:

```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'yourdomain.com', 'your-server-ip']
```

After changing `settings.py`, rebuild the image.

## Project Structure

```text
babyshop_app/
├── Dockerfile          # Builds the image (python:3.9-alpine)
├── entrypoint.sh       # Runs on container start (LF line endings required)
├── requirements.txt    # Python dependencies
├── docker-compose.yml  # Compose file (not used in this guide)
├── manage.py
├── babyshop/           # Django project (settings.py, urls.py, wsgi.py)
├── products/           # Products and categories
├── users/              # Login and registration
└── templates/          # HTML templates
```

On start, `entrypoint.sh` collects static files, runs migrations, creates the superuser, adds demo categories and products, and starts Gunicorn.

## Tech Stack

- **Python** 3.9
- **Django** 4.0.2
- **Gunicorn** (WSGI server)
- **SQLite3** (database)
- **Docker** (containerization)
- **Git/GitHub** (version control)

## Security Notes

- **Never commit secrets** such as SSH keys, passwords, API tokens or `.env` files.
- **Replace the Django `SECRET_KEY`.** The key in `settings.py` is a `django-insecure-...` placeholder that is public in the repository. Generate a new one for production and load it from an environment variable.
- **Set `DEBUG = False` in production** to avoid leaking internal information.
- **Change the default admin password** (see [Environment Variables](#environment-variables)).
- **Use HTTPS** for anything reachable from the internet, for example with Nginx as a reverse proxy in front of the container.

## Known Limitations

This project is a learning exercise and not hardened for production use:

- **Outdated versions:** Python 3.9 and Django 4.0.2 are end-of-life and have known vulnerabilities. Upgrade them before real use.
- **Development flag in production:** `entrypoint.sh` starts Gunicorn with `--reload`, which is meant for development.
- **Root user:** The container runs as root. A dedicated unprivileged user would be safer.
- **Hardcoded settings:** `SECRET_KEY` and `DEBUG` are set directly in `settings.py` instead of being read from environment variables.
- **`docker-compose.yml`:** The Compose file maps port 8000, while the app listens on 8025. It needs adjusting before it can be used.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/hpetersen2/baby-tools-shop/blob/main/babyshop_app/LICENSE) file for details.
