# LearnQuest Frontend

A modern React-based frontend for the LearnQuest Crowdsourced Learning Platform with Gamification.

## Team Members (Group 7)
- **Ibrahim Abdu** - Project Leader, Backend Architecture & Integration
- **Bradley Murimi** - Backend Developer (Auth & Gamification)
- **Julius Mutinda** - Frontend Developer (Auth & Learning)
- **Joyce Njogu** - Frontend Developer Lead (UI Components)
- **Ephrahim Otieno** - Full Stack Developer (Community Features)
- **Craig Omore** - Full Stack Developer (Admin & Creator)

## Features
- Modern, responsive UI with TailwindCSS
- User Authentication (Login/Register)
- Role-based Dashboard (Learner, Contributor, Admin)
- Learning Path Browser & Progress Tracking
- Gamification Display (XP, Badges, Achievements)
- Creator Studio for Contributors
- Animated transitions with Framer Motion
- State Management with Zustand

## Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone git@github.com:MrNawir/LearnQuest-Frontend.git
cd LearnQuest-Frontend
```

2. Install dependencies:
```bash
# Using npm
npm install --legacy-peer-deps

# OR using bun
bun install
```

3. Start the development server:
```bash
npm run dev
# OR
bun dev
```

The app will be available at `http://localhost:3000`

### Backend Connection

The frontend is configured to proxy API requests to `http://localhost:5000`. Make sure the backend is running before using the app.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── AuthModal.tsx   # Login/Register modal
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Layout.tsx      # App layout with sidebar
│   ├── LearningPath.tsx # Learning path view
│   ├── CreatorStudio.tsx # Content creation
│   └── Gamification.tsx # Achievements & badges
├── services/           # API service layer
│   ├── api.ts         # Axios instance with interceptors
│   ├── authService.ts # Authentication API calls
│   ├── userService.ts # User-related API calls
│   ├── learningPathService.ts # Learning path API
│   └── commentService.ts # Comments API
├── stores/            # Zustand state stores
│   └── authStore.ts   # Authentication state
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **Radix UI** - Accessible UI primitives
- **Zustand** - State management
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons

## User Roles

| Role        | Access                                          |
|-------------|-------------------------------------------------|
| Learner     | Dashboard, Learning Paths, Achievements         |
| Contributor | All Learner features + Creator Studio           |
| Admin       | All features + Admin Dashboard (coming soon)    |

## Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

## Design

The UI is based on Figma designs:
- [LearnQuest Figma Design](https://www.figma.com/design/EzvyETFHq479ulBnTppx02/LearnQuest)

## License
MIT
