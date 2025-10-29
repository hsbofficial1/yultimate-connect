# Deployment Guide - Y-Ultimate Management Platform

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

### 2. Database Setup

Ensure your Supabase database is properly set up:

```bash
# Install Supabase CLI globally
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. PWA Icons (Optional but Recommended)

For a complete PWA experience, add the following icons to the `public/` directory:

- `icon-192.png` - 192x192px app icon
- `icon-512.png` - 512x512px app icon  
- `screenshot-wide.png` - 1280x720px wide screenshot
- `screenshot-narrow.png` - 750x1334px narrow screenshot

You can use tools like:
- [Favicon Generator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)

**Quick command to generate PWA assets:**

```bash
npx @vite-pwa/assets-generator --preset minimal public/logo.svg
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Frontend)

#### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/yultimate-connect)

#### Manual Deployment

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

4. **Add Environment Variables**

Go to your Vercel Dashboard → Project → Settings → Environment Variables

Add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

5. **Redeploy**

```bash
vercel --prod
```

#### Automatic Deployments

Connect your GitHub repository to Vercel for automatic deployments on every push to `main`.

### Option 2: Netlify

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login**

```bash
netlify login
```

3. **Deploy**

```bash
netlify deploy --prod
```

4. **Environment Variables**

```bash
netlify env:set VITE_SUPABASE_URL "your_url"
netlify env:set VITE_SUPABASE_ANON_KEY "your_key"
```

### Option 3: GitHub Pages (Static Hosting)

1. **Update `vite.config.ts`**

```typescript
export default defineConfig({
  base: '/yultimate-connect/', // Your repo name
  // ... rest of config
});
```

2. **Build**

```bash
npm run build
```

3. **Deploy using gh-pages**

```bash
npm install -g gh-pages
gh-pages -d dist
```

### Option 4: Railway

1. **Install Railway CLI**

```bash
npm install -g @railway/cli
```

2. **Login**

```bash
railway login
```

3. **Initialize Project**

```bash
railway init
```

4. **Add Environment Variables**

```bash
railway variables set VITE_SUPABASE_URL=your_url
railway variables set VITE_SUPABASE_ANON_KEY=your_key
```

5. **Deploy**

```bash
railway up
```

### Option 5: Docker Deployment

#### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # PWA support
    location /manifest.json {
        add_header Cache-Control "public, max-age=31536000";
    }
    
    location /sw.js {
        add_header Cache-Control "no-cache";
        add_header Service-Worker-Allowed "/";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### Build and Run

```bash
# Build image
docker build -t yultimate-connect .

# Run container
docker run -p 8080:80 yultimate-connect
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "8080:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## 🔐 Security Considerations

### Environment Variables

**NEVER commit these to version control:**
- `.env`
- `.env.local`
- `.env.production`

They are already in `.gitignore`.

### Supabase Security

1. **Enable Row Level Security (RLS)**

All tables should have RLS policies enabled. Example:

```sql
-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);
```

2. **API Key Rotation**

Rotate your `SUPABASE_ANON_KEY` periodically from the Supabase Dashboard.

3. **CORS Configuration**

In Supabase Dashboard → Project Settings → API Settings → CORS:
- Add your production domain
- Remove development URLs in production

## 📊 Performance Optimization

### 1. Build Optimization

```bash
# Production build with source maps
npm run build

# Analyze bundle size
npm install -g vite-bundle-visualizer
npx vite-bundle-visualizer
```

### 2. CDN Configuration

For optimal performance, serve static assets through a CDN:

- **Cloudflare** - Free tier available
- **Vercel Edge Network** - Included with Vercel
- **Netlify Edge** - Included with Netlify

### 3. Caching Strategy

The service worker automatically caches:
- Static assets (JS, CSS) - 1 year
- Images - 30 days
- API responses - 5 minutes
- Fonts - 1 year

## 🔍 Monitoring & Analytics

### Error Tracking

Integrate [Sentry](https://sentry.io) for error tracking:

```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Analytics

Add Google Analytics or Plausible:

```typescript
// src/main.tsx
declare global {
  interface Window {
    gtag: any;
  }
}

// Track page views
window.gtag('config', 'GA_TRACKING_ID', {
  page_path: window.location.pathname,
});
```

## 🧪 Pre-Production Testing

### 1. Lighthouse Audit

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-deployment-url.com --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+
- PWA: 100

### 2. PWA Test

Visit your deployed site and:
- ✅ Install prompt appears
- ✅ Works offline
- ✅ Manifest loads correctly
- ✅ Service worker registers
- ✅ Icons display properly

### 3. Cross-Browser Testing

Test on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS & macOS)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🚨 Troubleshooting

### Service Worker Not Updating

Clear the service worker:

```javascript
// In browser console
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```

### Environment Variables Not Loading

Ensure variables are prefixed with `VITE_`:

```env
# ✅ Correct
VITE_SUPABASE_URL=...

# ❌ Wrong
SUPABASE_URL=...
```

### Build Errors

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

## 📱 Mobile App Deployment

### PWA Installation

Users can install the app directly from the browser:

**iOS Safari:**
1. Tap Share button
2. Tap "Add to Home Screen"

**Android Chrome:**
1. Tap the "..." menu
2. Tap "Install app" or "Add to Home Screen"

### React Native (Future)

For a native mobile app, consider:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

Shared code can be reused from this project.

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm run lint
        
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Support

For deployment issues:
- Open an issue on GitHub
- Email: support@yultimate.org
- Documentation: [Full Docs](./README.md)

---

**Deployment Checklist:**
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] PWA icons added
- [ ] Supabase RLS policies enabled
- [ ] Production build tested locally
- [ ] Lighthouse audit passed
- [ ] Cross-browser testing completed
- [ ] Domain configured (if custom)
- [ ] Analytics integrated
- [ ] Error tracking setup
- [ ] Monitoring configured

🎉 **Ready to deploy!**

