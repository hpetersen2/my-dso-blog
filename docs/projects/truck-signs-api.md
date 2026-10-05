---
title: Signs for Trucks
description: A Django REST Framework backend for an online store that sells customizable truck lettering vinyls, with Stripe payments.
---

# Signs for Trucks

## TOC

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Project Overview](#project-overview)
  - [Settings](#settings)
  - [Models](#models)
  - [Brief Explanation of the Views](#brief-explanation-of-the-views)
- [Installation](#installation)
- [Useful Links](#useful-links)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/HPetersen2/truck-signs-api"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Description

**Signs for Trucks** is an online store to buy pre-designed vinyls with custom lines of letters (often called truck letterings). The store also allows clients to upload their own designs and to customize them on the website as well. Aside from the vinyls that are the main product of the store, clients can also purchase simple lettering vinyls with no truck logo, a fire extinguisher vinyl, and/or a vinyl with only the truck unit number (or another number selected by the client).

This page documents the Django backend (REST API and admin panel).

## Tech Stack

- Python 3.8.10
- Django 2.2.8
- Django REST Framework 3.12.4
- PostgreSQL
- [Stripe](https://stripe.com/) for payments

## Project Overview

### Settings

The `settings` folder inside the `truck_signs_designs` folder contains the settings for each environment (development, Docker testing, and production). Those files extend `base.py`, which contains the basic configuration shared among the environments (for example, the location of the template directory).

In addition, the `.env` file inside this folder holds the environment variables, mostly sensitive information, which must always be configured before use. By default, the environment in use is Docker testing. To switch between environments, modify the `__init__.py` file.

### Models

Most of the models do what can be inferred from their name. The following notes make the purpose of some of them clearer:

- **Category:** The category of the vinyls in the store. It contains the title of the category as well as the basic properties shared among products of the same category. For example, *Truck Logo* is a category for all vinyls that have a truck logo plus some lines of lettering (the vinyls are instances of the model *Product*). Another category is *Fire Extinguisher*, for all vinyls with a fire extinguisher logo.
- **Lettering Item Category:** The category of the lettering, for example *Company Name* or *VIN Number*. Each has a different price.
- **Lettering Item Variations:** Contains a foreign key to the *Lettering Item Category* and the text added by the client.
- **Product Variation:** Has the original product as a foreign key, plus the lettering lines (instances of *Lettering Item Variations*) added by the client.
- **Order:** Contains the cart (just one vinyl, as only one product can be purchased at a time), plus the contact and shipping information of the client.
- **Payment:** Holds the payment information such as the time of the purchase and the client ID in Stripe.

### Brief Explanation of the Views

Most views are class-based views (CBVs) from `rest_framework.generics`. They provide the basic CRUD operations of the API and inherit from `ListAPIView`, `CreateAPIView`, `RetrieveAPIView`, and so on.

Some views had to be customized. For example, creating an order and the payment are implemented in the same view, which therefore inherits from `GenericAPIView`. Another example is the `UploadCustomerImage` view, which takes the vinyl template uploaded by the client and creates a new product based on it.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HPetersen2/truck-signs-api.git
   cd truck-signs-api
   ```

2. Configure a virtual environment and set up the database. See [configuring a virtual environment](https://docs.python-guide.org/dev/virtualenvs/) and [database setup](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04).

3. Configure the environment variables.

   1. Copy the example env file from the `truck_signs_designs/settings` folder to a `.env` file:

      ```bash
      cd truck_signs_designs/settings
      cp simple_env_config.env .env
      ```

   2. The new `.env` file contains all variables needed to run the Django app in every environment. For the development environment, only the following are required:

      ```bash
      SECRET_KEY
      DB_NAME
      DB_USER
      DB_PASSWORD
      DB_HOST
      DB_PORT
      STRIPE_PUBLISHABLE_KEY
      STRIPE_SECRET_KEY
      EMAIL_HOST_USER
      EMAIL_HOST_PASSWORD
      ```

   3. Example database configuration for local development (use your own, strong password):

      ```bash
      DB_NAME=trucksigns_db
      DB_USER=trucksigns_user
      DB_PASSWORD=<choose-a-strong-password>
      DB_HOST=localhost
      DB_PORT=5432
      ```

   4. `SECRET_KEY` is the Django secret key. To generate a new one, see this [Stack Overflow answer](https://stackoverflow.com/questions/41298963/is-there-a-function-for-generating-settings-secret-key-in-django).

   5. `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` come from a Stripe developer account (not required for the exercise):

      1. Log in to your Stripe account at [stripe.com](https://stripe.com/) or create a new one. This redirects to the Dashboard.
      2. Go to Developers > API keys and copy both the publishable key and the secret key.

   6. `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` are the credentials used to send emails when a client makes a purchase. Sending is currently disabled; the code to activate it is commented out in the create-order view in `views.py`. Any valid email and password will therefore work.

4. Run the migrations and then the app:

   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

5. The app is now running at [http://localhost:8000](http://localhost:8000).

6. (Optional) Create a superuser for the admin panel:

   ```bash
   python manage.py createsuperuser
   ```

:::note
To create truck vinyls with truck logos, first create the **Category** *Truck Sign*, then the **Product** (any name). The frontend only fetches products of the category *Truck Sign* for the product grid.
:::

:::warning
Never commit your `.env` file. It contains the Django secret key, database credentials, and Stripe keys.
:::

## Useful Links

### PostgreSQL Database

- [Setting up Django with Postgres, Nginx, and Gunicorn on a VPS (DigitalOcean)](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04)

### Docker

- [Docker Official Documentation](https://docs.docker.com/)
- Dockerizing Django, PostgreSQL, Gunicorn, and Nginx:
  - [GitHub repo of sunilale0](https://github.com/sunilale0/django-postgresql-gunicorn-nginx-dockerized/blob/master/README.md#nginx)
  - [Michael Herman on testdriven.io](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)

### Django and DRF

- [Django Official Documentation](https://docs.djangoproject.com/en/4.0/)
- [Generate a new secret key](https://stackoverflow.com/questions/41298963/is-there-a-function-for-generating-settings-secret-key-in-django)
- Modify the Django admin:
  - [Small modifications (searching, columns, …)](https://realpython.com/customize-django-admin-python/)
  - [Modify templates and CSS](https://medium.com/@brianmayrose/django-step-9-180d04a4152c)
- [Django Rest Framework Official Documentation](https://www.django-rest-framework.org/)
- [More about nested serializers](https://stackoverflow.com/questions/51182823/django-rest-framework-nested-serializers)
- [More about generic views](https://testdriven.io/blog/drf-views-part-2/)

### Miscellaneous

- [Create a virtual environment with virtualenv and virtualenvwrapper](https://docs.python-guide.org/dev/virtualenvs/)
- [Configure CORS](https://www.stackhawk.com/blog/django-cors-guide/)
- [Set up Django with Cloudinary](https://cloudinary.com/documentation/django_integration)
