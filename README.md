# CampusEventUI

A deployment-ready React system for the Prof Elective 3 Advanced Web Development Front End 2 final lab exam.

## Features

- Vite + React
- React Router routes for Home, Events, Event Details, Dashboard, and Login
- Protected Dashboard route
- Context API + reducer state management
- Add, delete, and toggle event status
- API integration with loading and error states
- Auto-refresh and last updated indicator
- Lazy-loaded pages with Suspense
- Search, category filters, dark mode, badges, hover states, and responsive UI
- Vercel and Netlify SPA routing configuration

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Vercel and Netlify can both deploy this project using:

- Build command: `npm run build`
- Publish directory: `dist`
