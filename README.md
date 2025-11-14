# ProductHub - Full Stack Product Management Platform

A comprehensive product management tool that consolidates customer feedback, enables feature prioritization, and provides advanced roadmapping capabilities.

## Features

### 🎯 Core Features
- **Dashboard**: Real-time overview of feedback, features, and analytics
- **Feedback Management**: Unified feedback repository with categorization and voting
- **Feature Management**: Complete feature lifecycle with voting and status tracking
- **Prioritization**: Multiple frameworks (Impact/Effort Matrix, RICE Scoring)
- **Roadmapping**: Visual roadmap builder for strategic planning
- **Analytics**: Comprehensive reporting and insights
- **Integrations**: Connect with popular tools (Jira, Salesforce, Slack, etc.)
- **Mind Mapping**: AI-powered idea generation and organization

### 🛠 Technical Stack

#### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Redis** for caching
- **Socket.io** for real-time updates
- **JWT** authentication
- **RESTful API** design

#### Frontend
- **React 18** with TypeScript
- **Material-UI** for components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Beautiful DnD** for drag-and-drop
- **Recharts** for data visualization
- **Framer Motion** for animations

## Quick Start

### Prerequisites
- Node.js 16+ 
- PostgreSQL 12+
- Redis (optional, for caching)

### Installation

1. **Clone and install dependencies**
```bash
# Install root dependencies
npm install

# Install all dependencies (root, backend, frontend)
npm run install-all
```

2. **Setup database**
```bash
# Create PostgreSQL database
createdb producthub

# Run database setup (backend will auto-create tables)
cd backend && node -e "require('./config/schema')().then(() => process.exit(0)).catch(console.error)"
```

3. **Environment Configuration**
```bash
# Backend .env
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Frontend .env (optional)
cp frontend/.env.example frontend/.env
```

4. **Start the application**
```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or start separately
npm run server  # Backend on http://localhost:5000
npm run client  # Frontend on http://localhost:3000
```

## Project Structure

```
producthub/
├── backend/                 # Node.js/Express API server
│   ├── config/             # Database and app configuration
│   ├── routes/             # API route handlers
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React TypeScript application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   └── App.tsx         # Main application component
│   └── package.json        # Frontend dependencies
├── package.json            # Root package configuration
└── README.md              # This file
```

## Key Components

### 📊 Dashboard
- Real-time metrics and KPIs
- Recent activity feed
- Top features by voting
- Growth trends and analytics
- Customer satisfaction scores

### 💬 Feedback Management
- Unified feedback inbox
- Smart categorization with AI
- Duplicate detection
- Source attribution
- Customer context linking
- Public voting portal

### 🚀 Feature Management
- Feature lifecycle tracking
- Voting and prioritization
- Assignment and collaboration
- Dependency management
- Status and progress tracking

### ⚖️ Prioritization Frameworks
- **Impact/Effort Matrix**: Visual 2x2 grid with drag-and-drop
- **RICE Scoring**: Reach, Impact, Confidence, Effort calculator
- **Value vs Complexity**: Customizable scoring
- **Monetization Scoring**: Revenue impact assessment

### 🗺 Roadmapping
- Visual timeline builder
- Multiple view modes (timeline, theme, release)
- Drag-and-drop planning
- Dependency visualization
- Audience customization
- Real-time collaboration

### 📈 Analytics
- Feedback volume trends
- Feature popularity metrics
- Customer segmentation
- ROI analysis
- Custom report builder

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Feedback
- `GET /api/feedback` - List all feedback
- `POST /api/feedback` - Create new feedback
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback
- `POST /api/feedback/:id/vote` - Vote on feedback
- `GET /api/feedback/stats/summary` - Get feedback statistics

### Features
- `GET /api/features` - List all features
- `POST /api/features` - Create new feature
- `PUT /api/features/:id` - Update feature
- `DELETE /api/features/:id` - Delete feature

## Database Schema

The application uses a comprehensive PostgreSQL schema including:

- **Users & Authentication**: users, user_profiles, roles
- **Data Sources**: integrations, integration_configs, sync_history
- **Feedback**: feedback_items, feedback_sources, customers
- **Features**: features, feature_votes, feature_comments
- **Prioritization**: prioritization_frameworks, prioritization_sessions
- **Roadmapping**: roadmaps, roadmap_items, strategic_objectives
- **Analytics**: analytics_events, reports
- **Mind Mapping**: mind_maps, mind_map_nodes, ai_generated_ideas

## Development

### Adding New Features
1. Create backend route in `backend/routes/`
2. Add Redux slice in `frontend/src/store/slices/`
3. Create React components in `frontend/src/components/`
4. Update main App routes

### Database Migrations
The application auto-creates tables on startup. For production use, implement proper migration system.

### Real-time Features
Socket.io is configured for real-time updates:
- New feedback notifications
- Feature vote updates
- Roadmap changes
- User collaboration

## Production Deployment

### 🚀 Cloud Deployment Options

ProductHub can be deployed to multiple free cloud platforms. Choose the option that best fits your needs:

#### Option 1: Railway (Recommended)
**Full-stack deployment with PostgreSQL**
- ✅ 500 free hours/month
- ✅ PostgreSQL database included
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- [See detailed Railway deployment guide](./DEPLOY_RAILWAY.md)

#### Option 2: Netlify + Supabase
**Frontend hosting with managed database**
- ✅ Unlimited personal sites (Netlify)
- ✅ 50,000 monthly active users (Supabase)
- ✅ Built-in authentication and real-time
- ✅ Global CDN
- [See detailed Netlify deployment guide](./DEPLOY_NETLIFY.md)

#### Option 3: Vercel + PlanetScale
**Modern serverless architecture**
- ✅ Unlimited personal projects (Vercel)
- ✅ 1 billion database reads/month (PlanetScale)
- ✅ Branch-based database schema
- ✅ Edge functions
- [See Vercel configuration](./vercel.json)

### Quick Deployment Script
Use our automated deployment script:
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d

# Production mode with nginx
docker-compose --profile production up -d
```

### Environment Variables
```env
# Backend (Production)
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://user:pass@host:port/database
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend (Production)
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_SOCKET_URL=https://your-backend-url.com
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Authentication providers set up
- [ ] CORS settings configured
- [ ] SSL certificates (usually automatic)
- [ ] Domain names configured (optional)
- [ ] Monitoring setup (Sentry, etc.)
- [ ] Backup strategy implemented

### Performance Optimization
- Enable gzip/brotli compression
- Configure CDN for static assets
- Set up database connection pooling
- Implement Redis caching
- Use image optimization
- Enable browser caching headers

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For questions and support, please create an issue in the GitHub repository.

---

**Author**: MiniMax Agent
**Version**: 1.0.0
**Last Updated**: 2025-11-10