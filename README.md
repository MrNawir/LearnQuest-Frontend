<div align="center">

# LearnQuest Frontend

**A modern, gamified e-learning interface built with React, TypeScript, and TailwindCSS.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Live](https://img.shields.io/badge/Live-learnquest.qzz.io-6C63FF?style=flat-square)](https://learnquest.qzz.io)

[Live Demo](https://learnquest.qzz.io) -- [Backend Repo](https://github.com/MrNawir/LearnQuest-Backend) -- [Figma Design](https://www.figma.com/design/EzvyETFHq479ulBnTppx02/LearnQuest)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Application Architecture](#application-architecture)
- [Component Reference](#component-reference)
- [State Management](#state-management)
- [Service Layer](#service-layer)
- [Routing and Navigation](#routing-and-navigation)
- [Project Structure](#project-structure)
- [Build and Deployment](#build-and-deployment)
- [Demo Walkthrough](#demo-walkthrough)
- [Team](#team)
- [License](#license)

---

## Overview

LearnQuest is a crowdsourced learning platform that turns online education into an engaging, game-like experience. The frontend is a single-page application that provides learners with an interactive dashboard, video-based lessons, quizzes, XP tracking, badge unlocking, leaderboards, and community discussions. Contributors get a full-featured Creator Studio for building learning paths, and administrators have a comprehensive dashboard for content moderation and user management.

The application communicates with a Flask REST API and is deployed as static files served by Nginx, proxied through Cloudflare.

---

## Features

| Area | Details |
|------|---------|
| **Landing Page** | Animated hero section, feature highlights, call-to-action, onboarding flow for new users |
| **Authentication** | Modal-based login/signup with role-aware routing, JWT token management via Axios interceptors |
| **Dashboard** | Personalized stats (XP, streak, level), enrolled learning paths with progress bars, daily challenges |
| **Learning Paths** | Course catalog with category/difficulty filtering, enrollment, module-based navigation, creator attribution |
| **Lesson View** | Embedded YouTube player, collapsible module sidebar, "Complete Lesson" button with XP reward, tabbed interface (Overview, Notes, Discussion) |
| **Gamification** | Achievements page with badge grid (locked/unlocked states), animated progress bars, global leaderboard with weekly/all-time toggle, milestone tracking, active challenges, level progression card |
| **Badge Unlock** | Automatic badge checking after lesson completion with celebratory toast notifications |
| **Quizzes** | Timed quiz interface, multiple-choice/true-false questions, instant scoring with explanations, XP rewards |
| **Creator Studio** | Multi-step form (Basic Info, Content, Preview), module/resource management, video URL input, PDF file upload, publish-to-approval pipeline |
| **Admin Dashboard** | Platform statistics, pending path approvals (approve/reject), user management (role changes, suspension), content moderation reports |
| **Community** | Threaded comment system on learning paths, nested replies, XP rewards for participation |
| **Settings** | Profile editing (username, bio, avatar URL), account information display |
| **Search** | Debounced global search across learning paths, modules, and resources with categorized dropdown results |
| **Theme** | DaisyUI theming with light/dark mode support, consistent design tokens |
| **Responsive** | Mobile-first layout with collapsible sidebar, adaptive grids, touch-friendly interactions |

---

## Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | React 18 | Component-based UI with hooks |
| **Language** | TypeScript 5.4 | Static type checking across the entire codebase |
| **Build Tool** | Vite 6 | Fast HMR development server and optimized production builds |
| **Styling** | TailwindCSS 4 + DaisyUI 5 | Utility-first CSS with semantic component classes |
| **State** | Zustand 4 | Lightweight, hook-based global state management |
| **HTTP** | Axios | API client with JWT interceptors and error handling |
| **Animations** | Motion (Framer Motion) | Page transitions, hover effects, staggered list animations |
| **Icons** | Lucide React | Consistent, tree-shakeable SVG icon library |
| **UI Primitives** | Radix UI | Accessible, unstyled components (dialogs, dropdowns, tooltips) |
| **Notifications** | Sonner | Toast notification system (bottom-right positioned) |
| **Forms** | React Hook Form + Zod | Form validation with schema-based type inference |
| **Charts** | Recharts | Data visualization for admin statistics |
| **Routing** | Internal state-based | Single-page navigation via `activeTab` state in `App.tsx` |

---

## Getting Started

### Prerequisites

- **Node.js 18+** (or Bun)
- **npm**, **yarn**, or **bun**
- The [LearnQuest Backend](https://github.com/MrNawir/LearnQuest-Backend) running on port 5000

### Installation

```bash
# Clone the repository
git clone git@github.com:MrNawir/LearnQuest-Frontend.git
cd LearnQuest-Frontend

# Install dependencies
npm install --legacy-peer-deps
# OR
bun install

# Start the development server
npm run dev
# OR
bun dev
```

The application will be available at **http://localhost:5173**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Type-check with `tsc` and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## Environment Variables

Create a `.env` file in the project root:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

The Axios instance in `src/services/api.ts` reads this variable and falls back to `/api` for production (where Nginx proxies `/api/*` to the backend).

---

## Application Architecture

```
                    App.tsx (Root)
                    |
        +-----------+-----------+
        |           |           |
    LandingPage  AuthModal   Layout
    (unauth)     (login/     (authenticated)
                  signup)     |
                         +----+----+
                         |         |
                      Sidebar   Content Area
                      (nav)     |
                         +------+------+------+------+------+------+
                         |      |      |      |      |      |      |
                      Dash   Learn  Lesson  Quiz  Gamif  Creator Admin
                      board  Path   View         ication Studio  Dash
```

**Data flow:**

1. `App.tsx` manages top-level state: active tab, auth status, modal visibility, lesson mode
2. `useAuthStore` (Zustand) holds the authenticated user and JWT token
3. `useLearningStore` manages learning paths, enrollment, and progress
4. `useGamificationStore` manages badges, leaderboard, challenges, and achievements
5. Service files (`src/services/*`) wrap Axios calls to the backend API
6. Components consume stores via hooks and call service methods for mutations

---

## Component Reference

### Pages and Views

| Component | File | Description |
|-----------|------|-------------|
| **LandingPage** | `LandingPage.tsx` | Public marketing page with hero, features, CTA, and footer |
| **Dashboard** | `Dashboard.tsx` | Authenticated home: stats cards, enrolled paths, daily challenge |
| **LearningPath** | `LearningPath.tsx` | Course detail view with modules, progress sidebar, mentor card |
| **LessonView** | `LessonView.tsx` | Video player, collapsible module sidebar, completion, notes, discussion |
| **Gamification** | `Gamification.tsx` | Leaderboard, badge grid, milestones, challenges, level progress |
| **Quiz** | `Quiz.tsx` | Timed quiz interface with scoring and explanations |
| **CreatorStudio** | `CreatorStudio.tsx` | Creator dashboard and multi-step path creation form |
| **AdminDashboard** | `admin/AdminDashboard.tsx` | Stats, pending approvals, user management, reports |
| **Settings** | `Settings.tsx` | Profile editing with tabs |

### Shared Components

| Component | File | Description |
|-----------|------|-------------|
| **Layout** | `Layout.tsx` | Sidebar navigation, header with search, mobile menu |
| **AuthModal** | `AuthModal.tsx` | Login/signup modal with mode toggle |
| **Onboarding** | `Onboarding.tsx` | First-time user tutorial walkthrough |

### Informational Pages

| Component | File | Description |
|-----------|------|-------------|
| **AboutPage** | `AboutPage.tsx` | Company information |
| **PrivacyPage** | `PrivacyPage.tsx` | Privacy policy |
| **TermsPage** | `TermsPage.tsx` | Terms of service |

---

## State Management

The application uses **Zustand** for global state, organized into domain-specific stores:

| Store | File | Responsibilities |
|-------|------|-----------------|
| **authStore** | `stores/authStore.ts` | User authentication, JWT persistence, login/logout, role checking |
| **learningStore** | `stores/learningStore.ts` | Learning paths, enrollment, progress tracking, resource completion |
| **gamificationStore** | `stores/gamificationStore.ts` | Badges, leaderboard, challenges, achievements, streak, badge checking |
| **themeStore** | `stores/themeStore.ts` | Theme preference persistence |

Each store exposes both state and async action methods. Components access stores via hooks:

```typescript
const { user, isAuthenticated } = useAuthStore();
const { completeResource } = useLearningStore();
const { checkBadges } = useGamificationStore();
```

---

## Service Layer

API communication is centralized in `src/services/`:

| Service | File | Endpoints Covered |
|---------|------|-------------------|
| **api** | `api.ts` | Axios instance with base URL config, JWT token injection, error interceptors |
| **authService** | `authService.ts` | `/auth/login`, `/auth/register`, `/auth/me` |
| **userService** | `userService.ts` | `/users/*` -- profiles, stats |
| **learningPathService** | `learningPathService.ts` | `/learning-paths/*`, `/progress/*` -- CRUD, enrollment, completion |
| **gamificationService** | `gamificationService.ts` | `/gamification/*` -- badges, leaderboard, XP, streaks, challenges |
| **quizService** | `quizService.ts` | `/quizzes/*` -- quiz fetching, submission |
| **commentService** | `commentService.ts` | `/comments/*` -- CRUD for threaded discussions |
| **adminService** | `adminService.ts` | `/admin/*` -- stats, approvals, user management |

The Axios instance automatically attaches the JWT token from `localStorage` to every request and handles 401 responses by clearing auth state.

---

## Routing and Navigation

Navigation is state-based rather than URL-based (single-page app pattern):

| Tab Key | Component | Access |
|---------|-----------|--------|
| `dashboard` | Dashboard | All authenticated users |
| `learning-path` | LearningPath | All authenticated users |
| `gamification` | Gamification | All authenticated users |
| `creator` | CreatorStudio | Contributors and Admins |
| `admin` | AdminDashboard | Admins only |
| `settings` | Settings | All authenticated users |

Special modes overlay the main layout:
- **Lesson Mode** (`isInLessonMode`) -- full-screen `LessonView` replacing the sidebar layout
- **Quiz Mode** (`activeQuizId`) -- dedicated `Quiz` component

The browser tab title updates dynamically based on the active view (e.g., "Dashboard -- LearnQuest", "Lesson -- LearnQuest").

---

## Project Structure

```
LearnQuest-Frontend/
|
|-- public/
|   +-- favicon.svg              # LearnQuest SVG favicon
|
|-- src/
|   |-- components/
|   |   |-- ui/                  # shadcn/ui primitives (Button, Dialog, etc.)
|   |   |-- admin/
|   |   |   +-- AdminDashboard.tsx  # Admin panel (stats, approvals, users, reports)
|   |   |-- App.tsx              # Root component, routing, auth state
|   |   |-- LandingPage.tsx      # Public landing page
|   |   |-- AuthModal.tsx        # Login/signup modal
|   |   |-- Onboarding.tsx       # First-time user tutorial
|   |   |-- Layout.tsx           # Sidebar + header layout shell
|   |   |-- Dashboard.tsx        # Learner dashboard
|   |   |-- LearningPath.tsx     # Course detail and enrollment
|   |   |-- LessonView.tsx       # Video player and lesson completion
|   |   |-- Quiz.tsx             # Quiz taking interface
|   |   |-- Gamification.tsx     # Achievements, leaderboard, badges
|   |   |-- CreatorStudio.tsx    # Content creation for contributors
|   |   |-- Settings.tsx         # Profile and account settings
|   |   |-- AboutPage.tsx        # About page
|   |   |-- PrivacyPage.tsx      # Privacy policy
|   |   +-- TermsPage.tsx        # Terms of service
|   |
|   |-- services/
|   |   |-- api.ts               # Axios instance with interceptors
|   |   |-- authService.ts       # Authentication API
|   |   |-- userService.ts       # User profiles and stats
|   |   |-- learningPathService.ts  # Learning paths, enrollment, progress
|   |   |-- gamificationService.ts  # Badges, leaderboard, XP, streaks
|   |   |-- quizService.ts       # Quiz fetching and submission
|   |   |-- commentService.ts    # Discussion comments
|   |   +-- adminService.ts      # Admin operations
|   |
|   |-- stores/
|   |   |-- authStore.ts         # Auth state (Zustand)
|   |   |-- learningStore.ts     # Learning paths and progress
|   |   |-- gamificationStore.ts # Badges, leaderboard, challenges
|   |   +-- themeStore.ts        # Theme preferences
|   |
|   |-- types/
|   |   +-- index.ts             # Shared TypeScript interfaces
|   |
|   |-- main.tsx                 # Application entry point
|   +-- index.css                # TailwindCSS imports and global styles
|
|-- index.html                   # HTML shell with favicon and meta tags
|-- vite.config.ts               # Vite configuration
|-- tsconfig.json                # TypeScript configuration
|-- tailwind.config.ts           # TailwindCSS + DaisyUI configuration
|-- package.json                 # Dependencies and scripts
+-- eslint.config.js             # ESLint configuration
```

---

## Build and Deployment

### Production Build

```bash
npm run build
```

This outputs optimized static files to the `build/` directory (configured via `vite.config.ts`):
- `index.html` -- entry point
- `assets/index-[hash].js` -- bundled JavaScript (~155KB gzipped)
- `assets/index-[hash].css` -- bundled styles (~34KB gzipped)
- `favicon.svg` -- application icon

### Deployment

The production build is served by Nginx on the same VPS as the backend:

```
Cloudflare (DNS + SSL)
       |
Nginx
  |-- / -> /opt/learnquest/app/frontend/build/ (static files)
  |-- /api/* -> proxy to Flask backend (127.0.0.1:5000)
  +-- SPA fallback: try_files $uri $uri/ /index.html
```

To deploy after changes:

```bash
# Build
npm run build

# Reload Nginx to pick up new static files (if cache headers changed)
sudo systemctl reload nginx
```

---

## Demo Walkthrough

All demo accounts use the password: **`demo123`**

### Learner Experience -- Badge Unlock

1. Open `https://learnquest.qzz.io` in an incognito window
2. Click **Log In** and sign in as `sarah@example.com` / `demo123`
3. From the Dashboard, click on any learning path (e.g., "Full Stack Web Development")
4. Click **Enroll Now**, then **Start Learning**
5. In the lesson view, click **Complete Lesson**
6. A toast notification appears: "Lesson completed! +10 XP earned"
7. Immediately after, a second toast: "Badge Unlocked: First Steps!"
8. Navigate to **Achievements** in the sidebar to see the badge in your collection

### Creator Experience -- Publish a Course

1. Log in as `creator@learnquest.com` / `demo123`
2. Click **Creator Studio** in the sidebar
3. Click **Create New Path**
4. **Step 1 -- Basic Info:** Enter title, description, category, difficulty
5. **Step 2 -- Content:** Add modules, paste YouTube URLs for video resources, or select "PDF" type to upload a document
6. **Step 3 -- Preview:** Review the summary and click **Publish**
7. The path is submitted for admin approval

### Admin Experience -- Approve Content

1. Log in as `admin@learnquest.com` / `demo123`
2. Click **Admin** in the sidebar
3. Navigate to **Pending Approvals**
4. Review the submitted path and click **Approve** (or **Reject** with a reason)
5. The path is now visible to all learners on the platform

---

## Team -- Group 7

| Name | Role |
|------|------|
| **Ibrahim Abdu** | Project Leader, Backend Architecture and Integration |
| **Bradley Murimi** | Backend Developer (Auth and Gamification) |
| **Joyce Njogu** | Frontend Developer Lead |
| **Julius Mutinda** | Frontend Developer (Auth and Learning) |
| **Ephrahim Otieno** | Full Stack Developer (Community Features) |
| **Craig Omore** | Full Stack Developer (Content and Admin) |

---

## License

This project is licensed under the [MIT License](LICENSE).
