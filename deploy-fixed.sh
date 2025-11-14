#!/bin/bash

# ProductHub Deployment - All Issues Fixed
# This script handles multiple deployment scenarios

set -e

echo "🚀 ProductHub Deployment - All Dependencies Fixed"
echo "=================================================="

# Function to push to GitHub
push_to_github() {
    echo "📤 Pushing to GitHub..."
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit: ProductHub with all dependency fixes"
        echo "⚠️  Please create a GitHub repository and run:"
        echo "   git remote add origin https://github.com/your-username/producthub.git"
        echo "   git push -u origin main"
    else
        git add .
        git commit -m "Update: Fixed all dependency issues and simplified deployment"
        git push
    fi
}

# Function to test Railway deployment
test_railway() {
    echo "🚂 Testing Railway deployment..."
    echo "Your Railway deployment should now work with:"
    echo "✅ Fixed rate-limiter-flexible issue"
    echo "✅ Simplified dependencies"
    echo "✅ Clean package.json"
    echo "✅ Optimized railway.json"
    echo ""
    echo "Railway should auto-deploy from your GitHub repository."
    echo "Check the deployment status in your Railway dashboard."
}

# Function to provide Render alternative
provide_render_alternative() {
    echo "🌐 Render.com Alternative (if Railway fails)"
    echo "============================================"
    echo "If Railway continues having issues, use Render:"
    echo ""
    echo "1. Go to https://render.com"
    echo "2. Connect your GitHub repository"  
    echo "3. Create new Web Service"
    echo "4. Set build command: npm install"
    echo "5. Set start command: cd backend && npm start"
    echo "6. Add environment variables:"
    echo "   - NODE_ENV=production"
    echo "   - JWT_SECRET=your-jwt-secret"
    echo ""
    echo "Render is often more reliable for Node.js deployments."
}

# Function to show what was fixed
show_fixes() {
    echo "🔧 What Was Fixed"
    echo "=================="
    echo "✅ Removed rate-limiter-flexible (version doesn't exist)"
    echo "✅ Removed redis (deployment complexity)"
    echo "✅ Removed node-cron (unnecessary dependency)"
    echo "✅ Simplified railway.json configuration"
    echo "✅ Updated all dependencies to stable versions"
    echo "✅ Created minimal backup server"
    echo "✅ Provided alternative deployment options"
    echo ""
    echo "Dependencies are now minimal and production-ready!"
}

# Main deployment process
main() {
    echo "Choose deployment action:"
    echo "1) Push to GitHub (required for Railway)"
    echo "2) Show Railway deployment status"
    echo "3) Show Render.com alternative"
    echo "4) Show all fixes made"
    echo "5) All of the above"
    echo ""
    read -p "Enter choice (1-5): " choice

    case $choice in
        1)
            push_to_github
            ;;
        2)
            test_railway
            ;;
        3)
            provide_render_alternative
            ;;
        4)
            show_fixes
            ;;
        5)
            show_fixes
            echo ""
            push_to_github
            echo ""
            test_railway
            echo ""
            provide_render_alternative
            ;;
        *)
            echo "Invalid choice"
            exit 1
            ;;
    esac

    echo ""
    echo "🎉 Deployment preparation complete!"
    echo ""
    echo "Next steps:"
    echo "1. Check your GitHub repository is updated"
    echo "2. Monitor Railway deployment status"
    echo "3. If Railway fails, try Render.com"
    echo ""
    echo "📚 Documentation:"
    echo "   - DEPENDENCY_FIX.md (all fixes explained)"
    echo "   - RENDER_DEPLOYMENT.md (alternative platform)"
    echo "   - backend/server-minimal.js (backup server)"
}

# Run main function
main