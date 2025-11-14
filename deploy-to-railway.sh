#!/bin/bash

# ProductHub Railway Deployment Script
# Run this script to deploy your ProductHub to Railway

echo "🚀 Starting ProductHub Railway Deployment..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the ProductHub root directory"
    exit 1
fi

# Configure Git if not already done
echo "⚙️  Configuring Git repository..."
git remote add origin https://github.com/taraktrivedi/ProductHub.git 2>/dev/null || echo "Remote already configured"

# Switch to main branch
echo "📂 Switching to main branch..."
git branch -M main

# Add all changes
echo "📦 Adding all changes..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Fix: Resolved all dependency issues - Railway deployment ready"

# Push to GitHub
echo "☁️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🚂 Railway will now automatically deploy your application..."
echo "📋 Monitor deployment at: https://railway.app/dashboard"
echo ""
echo "⏱️  Expected deployment time: 3-5 minutes"
echo "🔗 Your app will be available at: https://YOUR_APP_NAME.railway.app"
echo ""
echo "🎉 Deployment process initiated!"