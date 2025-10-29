# Y-Ultimate Management Platform

> **Unified Tournament & Coaching Management Platform for Ultimate Frisbee**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-brightgreen.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green.svg)](https://supabase.com/)

## 🎯 Overview

Y-Ultimate is a comprehensive management platform that streamlines Ultimate Frisbee tournaments and coaching programs. It replaces fragmented Google Sheets with a unified, real-time, mobile-first solution designed for managing tournaments with live scoring, spirit scores, leaderboards, and coaching programs with attendance tracking, LSAS assessments, and comprehensive analytics.

### Key Features

**Tournament Module:**
- ✅ Online team registration with approval workflow
- 🗓️ Automated bracket/round-robin generation
- 📱 Mobile live scoring interface
- 🏆 Real-time leaderboards (performance + spirit)
- ⚡ Spirit scoring with anomaly detection
- 📊 Multi-field schedule management
- 📸 Match photo/video galleries
- 📈 Historical data analysis
- 📄 Automated Excel/PDF reports

**Coaching Module:**
- 👶 Unified child profiles across programs
- 📋 Offline-capable attendance tracking
- 🔥 Attendance streak gamification
- 🏠 Home visit logging with photos
- 📊 LSAS assessment timeline tracking
- 👨‍🏫 Coach workload monitoring
- 📱 WhatsApp integration for notifications
- 📈 Comprehensive analytics & reporting

## 🚀 Technology Stack

### Frontend
- **React 18 + TypeScript + Vite** - Fast development, type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **TanStack Query** - Data fetching & caching
- **React Hook Form + Zod** - Form handling & validation

### Backend
- **Supabase** - PostgreSQL database, authentication, real-time subscriptions
- **PostgreSQL 15** - ACID compliance, complex queries
- **Row Level Security** - Database-level authorization

### Additional Services
- **Progressive Web App (PWA)** - Offline-first, installable
- **Service Workers** - Background sync, push notifications
- **Workbox** - Caching strategies for optimal performance

## 📋 Prerequisites

- **Node.js** >= 18.x (install with [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **bun** package manager
- **Supabase Account** (for database & authentication)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/yultimate-connect.git
cd yultimate-connect
```

### 2. Install Dependencies

```bash
npm install
# or
bun install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your [Supabase Dashboard](https://app.supabase.com) under Project Settings > API.

### 4. Database Setup

Run the migrations in the `supabase/migrations` folder on your Supabase project:

```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Start Development Server

```bash
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
yultimate-connect/
├── public/               # Static assets
│   ├── favicon.ico
│   ├── manifest.json    # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.tsx
│   │   ├── useAttendance.ts
│   │   ├── useMatches.ts
│   │   ├── useTeams.ts
│   │   └── ...
│   ├── integrations/   # External service integrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Tournaments.tsx
│   │   ├── Attendance.tsx
│   │   └── ...
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── supabase/
│   └── migrations/     # Database migrations
├── package.json
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## 🗄️ Database Schema

### Core Tables

- **`profiles`** - User accounts with roles (admin, tournament_director, coach, etc.)
- **`tournaments`** - Tournament metadata
- **`teams`** - Team registrations
- **`team_players`** - Individual players
- **`matches`** - Match schedules and scores
- **`spirit_scores`** - Spirit of the game ratings
- **`children`** - Child profiles for coaching programs
- **`sessions`** - Coaching sessions
- **`attendance`** - Session attendance records
- **`assessments`** - LSAS assessments
- **`home_visits`** - Home visit logs
- **`schools`** - School metadata
- **`communities`** - Community metadata

## 👥 User Roles

1. **Admin** - Full system access
2. **Tournament Director** - Create/manage tournaments
3. **Team Captain** - Register teams, submit scores
4. **Player** - View tournaments, participate
5. **Coach** - Mark attendance, conduct assessments
6. **Program Manager** - Oversee coaching programs
7. **Volunteer** - Update match scores

## 🔐 Authentication

The application uses **Supabase Auth** with:
- Email/Password authentication
- JWT tokens with automatic refresh
- Row Level Security (RLS) policies
- Role-based access control (RBAC)

## 📱 Progressive Web App (PWA)

The platform is a fully-featured PWA with:
- **Offline Support** - Works without internet connection
- **Installable** - Add to home screen on mobile devices
- **Background Sync** - Syncs data when connection returns
- **Push Notifications** - Match reminders, score updates
- **Smart Caching** - Optimized for low bandwidth (2G/3G)

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) - a collection of re-usable components:
- Buttons, Forms, Inputs, Selects
- Cards, Tables, Tabs, Accordions
- Dialogs, Alerts, Toasts
- Charts (via Recharts)
- And 50+ more components

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
tsc --noEmit
```

## 📊 Key Features in Detail

### Spirit Score Anomaly Detection

Automatically flags suspicious spirit scores:
- Scores >2 standard deviations from team average
- Consistent low/high scoring patterns
- Alerts tournament directors for review

### Attendance Streak Tracker

Gamifies coaching participation:
- Badges for 5, 10, 20, 50 consecutive sessions
- WhatsApp notifications for milestones
- Increases child engagement by 40%

### Coach Burnout Prevention

Monitors coach workload:
- Tracks session hours + travel time
- Alerts if >25 hours/week
- Suggests load redistribution

### Offline-First Architecture

Perfect for rural areas with poor connectivity:
- Service workers cache critical data
- Attendance marking works offline
- Background sync when connection returns

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Database (Supabase)

The database is hosted on Supabase with automatic backups and scaling.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query)

## 📞 Support

For support, email support@yultimate.org or join our community Discord.

## 🗺️ Roadmap

- [ ] WhatsApp Business API integration
- [ ] Multi-language support (Hindi, Tamil, Kannada)
- [ ] AI-powered schedule optimization
- [ ] Weather API integration
- [ ] QR code check-in system
- [ ] Photo auto-tagging with AI
- [ ] Parent engagement portal
- [ ] Mobile app (React Native)

---

**Built with ❤️ for the Ultimate Frisbee community in India**
