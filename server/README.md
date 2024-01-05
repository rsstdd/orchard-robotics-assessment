# Orchard Robotics Take Home Challenge - Server

## Description

This repository contains the Flask server for the Orchard Robotics Take-Home coding challenge. It serves as the back-end component for an end-to-end web application capable of predicting a harvest size estimate, given the growth rate of the fruit.

## Getting Started

### Prerequisites

Make sure you have the following dependencies installed:

- Python
- Poetry (For managing dependencies)
- Docker (Optional for containerization)
- Gunicorn (Optional for running the server)

### Installation

#### 1. Install Poetry

Follow the instructions [here](https://python-poetry.org/docs/#installing-with-the-official-installer) to install Poetry.

#### 2. Install Dependencies

`poetry install`

#### 3. Set Up Environment Variables

Create a .env file in the root of the project with the following variables:

```
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME="orchard_robotics"
DB_PORT="5432"
DB_HOST="127.0.0.1"
PROJECT_ID=""
CLOUD_SQL_DATABASE_NAME=""
CLOUD_SQL_CONNECTION_NAME=""
```

Reference .env.example for an example.

#### 4. Start Virtual Environment

```bash
poetry shell
```

#### 5. Build Docker Image (Optional)

```bash
sudo docker build . -t or-api
```

#### Run Docker Image (Optional) or Run Locally
```bash
sudo docker run -d -p 5000:5000 or-api
# or
poetry run gunicorn app:app -b 0.0.0.0:8080
```

### Deploying

Ensure you have the [gcloud CLI](https://cloud.google.com/cli?hl=en)  installed and configured.

```bash
gcloud builds submit --region=us-west2 --config cloudbuild.yaml
```
