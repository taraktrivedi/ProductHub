# Deploy ProductHub to Railway (Full-Stack)

## Why Railway?
- ✅ **500 free hours/month** - Perfect for development and small projects
- ✅ **PostgreSQL included** - No separate database setup needed
- ✅ **Automatic deployments** - Push to GitHub = automatic deploy
- ✅ **Custom domains** - Free SSL included
- ✅ **Environment variables** - Easy configuration management
- ✅ **Built-in monitoring** - Track performance and errors

## Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app)

## Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: ProductHub application"

# Create GitHub repository and push
# (Do this through GitHub web interface or GitHub CLI)
git remote add origin https://github.com/your-username/producthub.git
git push -u origin main
```

### 2. Setup Railway
1. Go to https://railway.app
2. Sign up/sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your ProductHub repository
6. Railway will automatically detect it as a Node.js project

### 3. Configure Database
1. In your Railway project dashboard
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway will automatically create a PostgreSQL database
4. The `DATABASE_URL` environment variable will be set

### 4. Set Environment Variables
In Railway dashboard → Settings → Variables, add:

```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001
```

### 5. Update Code for Railway
Railway automatically detects Node.js projects. Your application will be deployed!

### 6. Access Your Application
- Railway will provide a URL like: `https://your-app-name.railway.app`
- This URL will serve both your backend API and static files

## Configuration for Railway

### Package.json (Already configured)
Railway automatically detects:
- Backend: Node.js application
- Port: Uses PORT environment variable
- Start command: `npm start`

### Health Check
Railway will use the `/api/health` endpoint for health checks.

## Custom Domain (Optional)
1. In Railway dashboard → Settings → Domains
2. Add your custom domain
3. Configure DNS records
4. Free SSL certificate is automatically provisioned

## Monitoring
- **Metrics**: Available in Railway dashboard
- **Logs**: Real-time log streaming
- **Alerts**: Set up notifications for downtime

## Railway Free Tier Limits
- **Hours**: 500 hours/month (≈20 hours/day)
- **Memory**: 512MB per service
- **Bandwidth**: 100GB/month
- **Database**: 1GB storage

For production use, consider upgrading to paid plan for unlimited hours.

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Railway uses Node 18 by default)
- Check build logs in Railway dashboard

### Database Connection Issues
- Verify `DATABASE_URL` environment variable is set
- Check that PostgreSQL service is running
- Ensure your database schema is applied

### Port Issues
- Railway sets `PORT` environment variable
- Use `process.env.PORT` in your application
- Don't hardcode ports in your code

## Next Steps
1. Test your deployed application
2. Set up custom domain
3. Configure monitoring
4. Enable automatic deployments from GitHub
5. Set up staging environment for testing

## Support
- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Community: https://github.com/railwayapp/railway/discussions