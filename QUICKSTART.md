# Quick Start Guide - Y-Ultimate Platform

Get up and running with Y-Ultimate in 5 minutes! 🚀

## ⚡ Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Supabase Account** (Free tier: [supabase.com](https://supabase.com))
- **Code Editor** (VS Code recommended)

## 🎯 5-Minute Setup

### Step 1: Clone & Install (1 min)

```bash
# Clone repository
git clone https://github.com/your-org/yultimate-connect.git
cd yultimate-connect

# Install dependencies
npm install
```

### Step 2: Setup Supabase (2 min)

1. **Create Supabase Project**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Click "New Project"
   - Enter project details
   - Wait for database to initialize (~2 min)

2. **Run Database Migrations**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project (get ref from dashboard URL)
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

3. **Get API Keys**
   - In Supabase Dashboard → Settings → API
   - Copy `Project URL` and `anon public` key

### Step 3: Configure Environment (1 min)

Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Start Development Server (1 min)

```bash
npm run dev
```

Visit: **http://localhost:8080** 🎉

## 🎮 First Steps

### 1. Create Account

- Click "Sign Up"
- Enter email and password
- Check email for verification link
- Return to login

### 2. Create Your First Tournament

```
Dashboard → Tournaments → Create Tournament
```

Fill in:
- Tournament name
- Location
- Start/End dates
- Max teams (default: 16)

### 3. Test PWA Features

**On Desktop:**
- Look for "Install" icon in address bar
- Click to install as desktop app

**On Mobile:**
- Open in Chrome/Safari
- Tap "Add to Home Screen"
- App icon appears on home screen

## 📚 Next Steps

### Learn the Platform

1. **Read Documentation:** [README.md](./README.md)
2. **Explore Features:** Try creating teams, scheduling matches
3. **Check Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

### Customize for Your Organization

1. **Update Branding:**
   - Replace `public/favicon.ico`
   - Update `public/manifest.json` (app name)
   - Add proper PWA icons (see [PWA_ICONS_GUIDE.md](./PWA_ICONS_GUIDE.md))

2. **Configure Supabase:**
   - Set up Row Level Security policies
   - Configure authentication providers
   - Add email templates

3. **Deploy to Production:**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Set up CI/CD pipeline
   - Configure custom domain

## 🎨 Sample Data (Optional)

### Create Test Tournament

```sql
-- In Supabase SQL Editor
INSERT INTO tournaments (name, location, start_date, end_date, created_by)
VALUES (
  'Test Tournament 2025',
  'Mumbai, India',
  '2025-11-15',
  '2025-11-17',
  auth.uid()
);
```

### Add Test Team

```sql
INSERT INTO teams (name, tournament_id, captain_id, email, phone)
VALUES (
  'Test Team Alpha',
  (SELECT id FROM tournaments LIMIT 1),
  auth.uid(),
  'team@example.com',
  '+919876543210'
);
```

## 🧪 Verify Setup

### ✅ Checklist

- [ ] Server runs without errors (`npm run dev`)
- [ ] Can access http://localhost:8080
- [ ] Can create an account
- [ ] Can login successfully
- [ ] Dashboard loads
- [ ] Can create a tournament
- [ ] No console errors in browser DevTools
- [ ] Service worker registers (check DevTools → Application)
- [ ] Manifest loads (DevTools → Application → Manifest)

### 🐛 Troubleshooting

**"Cannot connect to Supabase"**
- Check `.env.local` file exists
- Verify VITE_SUPABASE_URL is correct
- Verify VITE_SUPABASE_ANON_KEY is correct
- Restart dev server

**"Table does not exist"**
- Run migrations: `supabase db push`
- Check migrations ran successfully
- Verify connection to correct project

**"Port 8080 already in use"**
```bash
# Change port in vite.config.ts or use different port
npm run dev -- --port 3000
```

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run dev
```

## 🚀 Deploy in 5 Minutes

### Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables via dashboard
# Promote to production
vercel --prod
```

See full deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📞 Get Help

**Issues?**
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
- Open GitHub issue
- Email: support@yultimate.org

**Want to contribute?**
- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Fork the repo
- Submit a PR

## 🎓 Learning Resources

### Platform Features
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [PWA_ICONS_GUIDE.md](./PWA_ICONS_GUIDE.md) - PWA setup

### Technologies Used
- [React Docs](https://react.dev/) - Learn React
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Learn TypeScript
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling
- [Supabase Docs](https://supabase.com/docs) - Backend
- [Vite Guide](https://vitejs.dev/guide/) - Build tool

## 🎉 You're Ready!

Your Y-Ultimate platform is now running locally. Here's what you can do:

### For Tournament Directors:
1. Create tournaments
2. Approve team registrations
3. Schedule matches
4. Track live scores
5. View leaderboards

### For Coaches:
1. Add child profiles
2. Create sessions
3. Mark attendance
4. Record assessments
5. Log home visits

### For Developers:
1. Explore the codebase
2. Add new features
3. Fix bugs
4. Contribute back

---

**Happy Ultimate-ing! 🥏**

Questions? Open an issue or reach out to the Y-Ultimate community.

