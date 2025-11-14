# Deploy ProductHub to Netlify + Supabase

## Why Netlify + Supabase?
- ✅ **Netlify**: Unlimited personal sites with 100GB bandwidth/month
- ✅ **Supabase**: PostgreSQL with 50,000 monthly active users free
- ✅ **Built-in Auth**: Supabase handles authentication automatically
- ✅ **Real-time**: Supabase provides real-time subscriptions
- ✅ **Edge Functions**: Serverless functions for custom backend logic
- ✅ **Free SSL**: Automatic HTTPS for all sites

## Architecture
- **Frontend**: Netlify (React static site)
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **API**: Supabase Edge Functions (serverless)
- **Hosting**: Netlify CDN (global edge network)

## Prerequisites
- GitHub account
- Netlify account (sign up at https://netlify.com)
- Supabase account (sign up at https://supabase.com)

## Step 1: Setup Supabase Database

### 1.1 Create Supabase Project
1. Go to https://supabase.com
2. Sign up/login with GitHub
3. Click "New Project"
4. Choose organization
5. Enter project details:
   - **Name**: producthub
   - **Database Password**: (create strong password)
   - **Region**: Choose closest to your users
6. Click "Create new project"

### 1.2 Setup Database Schema
1. In Supabase dashboard → SQL Editor
2. Run the database schema from `/backend/config/schema.js`
3. Apply all CREATE TABLE statements
4. Create indexes for better performance

### 1.3 Configure Authentication
1. Go to Authentication → Settings
2. Configure email settings:
   - Site URL: `https://your-site.netlify.app`
   - Redirect URLs: `https://your-site.netlify.app/**`
3. Enable providers (email/password minimum)

### 1.4 Get API Keys
1. Go to Settings → API
2. Copy:
   - **Project URL**: `https://xxx.supabase.co`
   - **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 2: Deploy Frontend to Netlify

### 2.1 Prepare Frontend
```bash
# Create environment file for frontend
cat > frontend/.env.production << EOF
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
REACT_APP_API_URL=https://xxx.supabase.co/rest/v1
EOF
```

### 2.2 Deploy via GitHub
1. Push code to GitHub (if not done already)
2. Go to https://netlify.com
3. Click "New site from Git"
4. Choose GitHub
5. Select your ProductHub repository
6. Configure build settings:
   - **Build command**: `cd frontend && npm install && npm run build`
   - **Publish directory**: `frontend/build`
7. Click "Deploy site"

### 2.3 Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.4 Configure Redirects
Netlify will auto-create redirects for SPA routing. Ensure `netlify.toml` includes:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Step 3: Update Frontend Code for Supabase

### 3.1 Install Supabase Client
```bash
cd frontend
npm install @supabase/supabase-js
```

### 3.2 Create Supabase Client
```typescript
// frontend/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 3.3 Replace API Calls
Update your API calls to use Supabase client:

```typescript
// Instead of axios.get('/api/feedback')
const { data, error } = await supabase
  .from('feedback')
  .select('*')
  .order('created_at', { ascending: false })

// Instead of axios.post('/api/auth/login')
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})
```

## Step 4: Setup Supabase Edge Functions (Optional)

### 4.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 4.2 Initialize Supabase
```bash
supabase init
```

### 4.3 Create Edge Function
```bash
supabase functions new analytics
```

### 4.4 Deploy Functions
```bash
supabase functions deploy
```

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Domain in Netlify
1. Netlify dashboard → Domain settings
2. Add custom domain
3. Configure DNS records

### 5.2 Update Supabase URLs
Update Supabase authentication settings:
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/**`

## Supabase Free Tier Limits
- **Database**: 500MB storage
- **API Requests**: 50,000 monthly active users
- **Bandwidth**: 5GB/month
- **Auth**: Unlimited users
- **Real-time**: 2 concurrent connections
- **Functions**: 2 million invocations/month

## Netlify Free Tier Limits
- **Sites**: Unlimited personal sites
- **Bandwidth**: 100GB/month
- **Build minutes**: 300/month
- **Function calls**: 125,000/month
- **Storage**: 100GB

## Performance Optimization

### Frontend
- Enable Netlify Edge Functions
- Configure proper caching headers
- Use Netlify's image optimization
- Enable Brotli compression

### Database
- Create appropriate indexes
- Use Supabase's built-in caching
- Implement pagination
- Use connection pooling

## Monitoring & Analytics

### Netlify Analytics
- Built-in analytics dashboard
- Page views, bandwidth, performance
- Real-time visitor data

### Supabase Dashboard
- Database metrics
- API usage statistics
- Authentication metrics
- Real-time connection monitoring

## Migration from Express to Supabase

### Authentication
```typescript
// Old Express + JWT
const token = localStorage.getItem('token')
const user = jwt.decode(token)

// New Supabase Auth
const { data: { user } } = await supabase.auth.getUser()
```

### Database Operations
```typescript
// Old Express API
const feedback = await axios.get('/api/feedback')

// New Supabase
const { data: feedback } = await supabase
  .from('feedback')
  .select(`
    *,
    customers(*),
    companies(*)
  `)
```

## Troubleshooting

### CORS Issues
- Ensure Supabase allows your Netlify domain
- Check CORS configuration in Supabase

### Build Failures
- Verify environment variables are set
- Check build logs in Netlify dashboard
- Ensure all dependencies are in package.json

### Database Connection
- Verify Supabase URL and API key
- Check RLS (Row Level Security) policies
- Ensure database schema is applied

## Security Best Practices
- Enable RLS on all Supabase tables
- Use environment variables for sensitive data
- Implement proper authentication checks
- Enable audit logging in Supabase
- Use Supabase's built-in security features

## Cost Estimation
For a small to medium application:
- **Netlify**: Free tier sufficient
- **Supabase**: Free tier supports ~1000 MAU
- **Total**: $0/month for small projects

## Next Steps
1. Set up monitoring and alerts
2. Configure automated backups
3. Implement CI/CD pipeline
4. Set up staging environment
5. Add custom analytics

## Support
- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **Netlify Discord**: https://discord.gg/netlify
- **Supabase Discord**: https://discord.supabase.com