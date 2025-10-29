# Quick Fix: Auth Not Working

## Problem
The `/auth` page isn't working because Supabase credentials are not configured.

## Solution (5-Minute Fix)

### Option 1: Use Your Own Supabase Project (Recommended)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up / Login
3. Click "New Project"
4. Enter project details (name, database password, region)
5. Wait ~2 minutes for project to initialize

#### Step 2: Get Your Credentials
1. In Supabase Dashboard → Settings → API
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long JWT token)

#### Step 3: Create `.env.local` File
In your project root, create a file named `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_actual_key_here
```

**Replace the values** with your actual credentials from Step 2.

#### Step 4: Run Database Migrations
```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login
supabase login

# Link your project (get project ref from dashboard URL)
supabase link --project-ref your-project-ref

# Run migrations to create tables
supabase db push
```

#### Step 5: Restart Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

#### Step 6: Test Auth
1. Go to `http://localhost:8080/auth`
2. Click "Sign Up" tab
3. Fill in the form and create an account
4. You should be redirected to `/dashboard`

---

### Option 2: Quick Demo Setup (For Testing Only)

If you just want to test the UI without actual authentication:

#### Create `.env.local` with dummy values:
```env
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo_key_for_testing
```

**Note:** This won't actually work for authentication, but the page will load without errors so you can see the UI.

---

## Verify Setup

### Check Environment Variables
Run this in your dev server console (browser DevTools):
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
```

If you see your actual values, you're good! If you see `undefined`, the `.env.local` file isn't being loaded.

### Check Console Errors
Open browser DevTools (F12) → Console tab. You should see:
- ✅ No errors about missing environment variables
- ✅ No Supabase connection errors

If you see errors about missing env vars, check:
1. File is named exactly `.env.local` (not `.env.local.txt`)
2. File is in the project root (same directory as `package.json`)
3. You restarted the dev server after creating the file

---

## Database Tables Required

The auth system needs these tables (created by migrations):

```sql
-- profiles table (automatically created on signup via triggers)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);
```

These should already be in your migration files in `supabase/migrations/`.

---

## Troubleshooting

### Error: "Invalid API key"
- Double-check your `VITE_SUPABASE_ANON_KEY` is the **anon** key, not the **service_role** key
- Make sure there are no extra spaces or quotes in `.env.local`

### Error: "Failed to fetch"
- Check your `VITE_SUPABASE_URL` is correct (no trailing slash)
- Make sure your Supabase project is not paused (free tier pauses after 7 days of inactivity)

### Error: "relation 'profiles' does not exist"
- Run the database migrations: `supabase db push`
- Check migrations ran successfully in Supabase Dashboard → Database → Migrations

### Auth page shows but signup/login doesn't work
- Open browser DevTools → Network tab
- Try to sign up and watch for failed requests
- Check the error message in Console tab

### Still not working?
1. Delete `.env.local`
2. Recreate it with fresh credentials
3. Restart dev server
4. Clear browser cache (Ctrl+Shift+Del)
5. Try in incognito/private window

---

## Quick Test Commands

```bash
# Check if .env.local exists
# Windows PowerShell:
Test-Path .env.local

# Check Supabase connection (in browser console):
supabase.auth.getSession()

# Test signup (in browser console):
supabase.auth.signUp({
  email: 'test@example.com',
  password: 'test123456',
  options: {
    data: {
      name: 'Test User',
      role: 'player'
    }
  }
})
```

---

## Next Steps After Auth Works

1. ✅ Create your first account via `/auth`
2. ✅ Verify you can login/logout
3. ✅ Check `/dashboard` loads after login
4. ✅ Test protected routes work
5. ✅ Create test data (tournaments, teams, etc.)

---

## Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Environment Variables in Vite](https://vitejs.dev/guide/env-and-mode.html)
- [Y-Ultimate Quickstart](./QUICKSTART.md)
- [Full Deployment Guide](./DEPLOYMENT.md)

---

**Need Help?** Open an issue or contact support@yultimate.org

