# Orchard Robotics Take Home Challenge - Client

This repository contains the Next.js client for the Orchard Robotics Take-Home coding challenge. It serves as the front-end component for an end-to-end web application capable of predicting a harvest size estimate, given the growth rate of the fruit.

## Overview

This client is built on top of the following technologies:

- Framework: [Next.js 14](https://nextjs.org/14)
- Language: [TypeScript](https://www.typescriptlang.org)
- Styling: [Tailwind CSS](https://tailwindcss.com)
- Components: [Tremor](https://www.tremor.so)
- Analytics: [Vercel Analytics](https://vercel.com/analytics)
- Linting: [ESLint](https://eslint.org)
- Formatting: [Prettier](https://prettier.io)

This client integrates with the Orchard Robotics server, which is responsible for predicting harvest size estimates.

## Getting Started

### Prerequisites

Make sure you have the following dependencies installed:

- Node.js
- Yarn (or npm for package management)

### Installation

```bash
# Install dependencies
yarn install

# Start the development server
yarn dev
```

## Production Deployment

Ensure you have configured the deployment settings appropriately.

```bash
# Build the client
yarn build
```

## Deploy to Google Cloud Run

Use the following command to deploy the client to Google Cloud Run:

```bash
gcloud builds submit --tag gcr.io/carbide-pilot-410123/or-client .
gcloud beta run deploy demo-app --image gcr.io/carbide-pilot-410123/or-client --region us-central1 --platform managed --allow-unauthenticated --quiet
```

Alternatively, you can submit a build and then deploy directly from the button below:

```bash
gcloud builds submit --tag gcr.io/carbide-pilot-410123/or-client .
```

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)
