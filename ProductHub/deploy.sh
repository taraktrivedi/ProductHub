#!/bin/bash

# ProductHub - Cloud Deployment Script
# This script helps deploy ProductHub to various cloud platforms

set -e

echo "🚀 ProductHub Cloud Deployment"
echo "================================"

# Check if git repo exists
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Function to setup Railway
setup_railway() {
    echo "🚂 Setting up Railway deployment..."
    
    # Check if railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo "📦 Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    echo "🔐 Please login to Railway:"
    railway login
    
    echo "📁 Creating Railway project..."
    railway link
    
    echo "💾 Setting up PostgreSQL database..."
    railway add postgresql
    
    echo "🔧 Setting environment variables..."
    railway variables set NODE_ENV=production
    railway variables set JWT_SECRET=your-super-secret-jwt-key-change-in-production
    railway variables set PORT=3001
    
    echo "🚀 Deploying to Railway..."
    railway deploy
    
    echo "✅ Railway deployment complete!"
    echo "🔗 Your app URL: $(railway status)"
}

# Function to setup Netlify
setup_netlify() {
    echo "🌐 Setting up Netlify deployment..."
    
    # Check if netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        echo "📦 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    echo "🔐 Please login to Netlify:"
    netlify login
    
    echo "📁 Creating Netlify site..."
    netlify init
    
    echo "🔧 Setting build command..."
    netlify build:set-command --command "cd frontend && npm install && npm run build"
    
    echo "🔧 Setting publish directory..."
    netlify build:set-publish --dir frontend/build
    
    echo "🚀 Deploying to Netlify..."
    netlify deploy --prod
    
    echo "✅ Netlify deployment complete!"
    echo "🔗 Your frontend URL: Check your Netlify dashboard"
}

# Function to setup Supabase
setup_supabase() {
    echo "🗄️ Setting up Supabase database..."
    
    # Check if supabase CLI is installed
    if ! command -v supabase &> /dev/null; then
        echo "📦 Installing Supabase CLI..."
        npm install -g supabase
    fi
    
    echo "🔐 Please login to Supabase:"
    supabase login
    
    echo "📁 Creating Supabase project..."
    supabase init
    
    echo "📤 Pushing database schema..."
    supabase db push
    
    echo "✅ Supabase setup complete!"
    echo "🔗 Your project URL: Check your Supabase dashboard"
}

# Function to prepare for deployment
prepare_deployment() {
    echo "📦 Preparing application for deployment..."
    
    # Build frontend
    echo "🏗️ Building frontend..."
    cd frontend && npm install && npm run build
    
    # Install backend dependencies
    echo "📦 Installing backend dependencies..."
    cd ../backend && npm install --production
    
    echo "✅ Application prepared for deployment!"
}

# Main menu
echo "Choose deployment option:"
echo "1) Railway (Full-stack with PostgreSQL)"
echo "2) Netlify (Frontend only)"
echo "3) Netlify + Supabase (Frontend + Database)"
echo "4) Prepare application only (no deployment)"
echo "5) Setup all (prepare + deploy)"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        prepare_deployment
        setup_railway
        ;;
    2)
        prepare_deployment
        setup_netlify
        ;;
    3)
        prepare_deployment
        setup_netlify
        setup_supabase
        ;;
    4)
        prepare_deployment
        ;;
    5)
        prepare_deployment
        echo "Which platform to deploy to?"
        echo "1) Railway"
        echo "2) Netlify"
        read -p "Enter choice: " deploy_choice
        if [ $deploy_choice -eq 1 ]; then
            setup_railway
        else
            setup_netlify
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📚 Check the following files for detailed instructions:"
echo "   - DEPLOYMENT.md (General deployment guide)"
echo "   - DEPLOY_RAILWAY.md (Railway-specific guide)"
echo "   - DEPLOY_NETLIFY.md (Netlify-specific guide)"
echo ""
echo "Need help? Visit our documentation or create an issue on GitHub."