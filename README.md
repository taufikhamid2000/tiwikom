# Tiwikom (prototype)

An early Angular prototype for TIWIKOM, a workplace tip-sharing platform. This is the **original, mock-data-only** SPA — it predates and is unrelated in code to [tiwikom-v2](https://github.com/taufikhamid2000/tiwikom-v2), the ASP.NET Core rewrite that became the real, deployed version of the project.

**Live demo:** Not currently deployed

> **Status: Archived / early prototype.** This repo is kept for history. All development moved to [tiwikom-v2](https://github.com/taufikhamid2000/tiwikom-v2), which has a real backend, database, and authentication — this one does not.

## Overview

This project explores TIWIKOM's UI and page flows (posts, comments, likes, admin dashboard, user/department management, dark mode) as an Angular single-page app, but it has **no backend and no persistence**: all data is hardcoded in-memory mock arrays, and "login" is a plaintext string match against a mock user list stored in `localStorage`. It's a UI/UX scaffold, not a working product.

## Tech Stack

- Angular 20 (standalone components, `@angular/ssr` scaffolding included but not used for real data)
- TypeScript, SCSS
- Bootstrap (partial migration in progress)
- No API, no database — see `src/app/mock-data/` (`mock-posts.ts`, `mock-users.ts`, `mock-departments.ts`) and the services that read from them (`post.service.ts`, `auth.service.ts`, etc.)

## Features (UI only, backed by mock data)

- Post feed with create/edit/delete, comments (including replies), likes
- Search, sort, filter, and pagination on the post list
- Mock login/auth via `localStorage`, with an admin role
- Admin dashboard: manage users, manage posts, assign roles
- Dark mode toggle

## Getting Started

```bash
npm install
ng serve
```

Then open `http://localhost:4200/`. There's nothing to configure — it runs entirely on the bundled mock data.

## Relationship to tiwikom-v2

This repo was the first pass at the idea, built to nail down the UI before investing in a real backend. [tiwikom-v2](https://github.com/taufikhamid2000/tiwikom-v2) is a separate, from-scratch ASP.NET Core MVC + EF Core rewrite with real authentication (ASP.NET Identity), a real database, and the live deployment. This repo is not deployed and not being extended further.

---

Built by [Muhammad Taufik](https://taufik.vercel.app)
