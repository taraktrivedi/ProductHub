# Render.com Deployment (Alternative to Railway)

## 🚀 Quick Deploy to Render (If Railway Fails)

Render.com is a great alternative that often has fewer dependency issues.

### **Step 1: Deploy Backend to Render**
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `producthub-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: (leave empty)

### **Step 2: Add Environment Variables**
In Render dashboard → Environment:
```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
```

### **Step 3: Add PostgreSQL Database**
1. In Render dashboard → "New +" → "Database"
2. Choose "PostgreSQL"
3. Create database
4. Copy connection string
5. Add to web service environment variables:
   ```
   DATABASE_URL=postgresql://user:pass@host:port/database
   ```

### **Step 4: Deploy Frontend (Separate)**
For the frontend, use Netlify:
1. Go to https://netlify.com
2. Drag and drop your `frontend/build` folder
3. Update frontend API URL to point to Render backend
4. Deploy!

## ✅ **Why Render Works Better**
- More lenient with dependencies
- Better error messages
- Simpler configuration
- Free tier includes PostgreSQL
- Automatic SSL

## 💰 **Render Free Tier**
- 750 hours/month (enough for 24/7)
- PostgreSQL database included
- Automatic deployments
- Free SSL certificate
- Custom domains (paid feature)

**URL Format**: `https://producthub-backend.onrender.com`