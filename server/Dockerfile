# syntax=docker/dockerfile:1

FROM python:3.11-alpine

ENV POETRY_VERSION=1.7.1 \
  PORT=5000

# Install necessary dependencies
RUN apk update && \
    apk add --no-cache postgresql-dev gcc python3-dev musl-dev

# Install poetry
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /app
COPY poetry.lock pyproject.toml /app/

# Initialization:
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

# Copy app to the Docker image
COPY app.py /app/

CMD gunicorn app:app -w 2 --threads 2 -b 0.0.0.0:${PORT}
