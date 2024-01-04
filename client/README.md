<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
  <img alt="Shows all of the tools in the stack for this template, also listed in the README file." src="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>Next.js 14 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="http://admin-dash-template.vercel.sh/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-planetscale-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/14)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [Vercel Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Tremor](https://www.tremor.so)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

Finally, run the following commands to start the development server:

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.


### Production Deployment

```
gcloud builds submit --tag gcr.io/carbide-pilot-410123/or-client .
gcloud beta run deploy demo-app --image gcr.io/carbide-pilot-410123/or-client --region us-central1 --platform managed --allow-unauthenticated --quiet
```

## Deploy to Google Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)
