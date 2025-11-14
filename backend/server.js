require('dotenv').config();
const express = require('express');
const cors = require('cors');

const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const featureRoutes = require('./routes/features');
const roadmapRoutes = require('./routes/roadmap');
const analyticsRoutes = require('./routes/analytics');
const integrationRoutes = require('./routes/integrations');
const prioritizationRoutes = require('./routes/prioritization');
const mindMapRoutes = require('./routes/mindmap');

// Import database
const db = require('./config/database');
const initDatabase = require('./config/schema');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Make io available to routes
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/prioritization', prioritizationRoutes);
app.use('/api/mindmap', mindMapRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join room based on user authentication
  socket.on('join-room', (userId) => {
    socket.join(`user-${userId}`);
  });

  socket.on('join-roadmap', (roadmapId) => {
    socket.join(`roadmap-${roadmapId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialized successfully');
    
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`API Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = { app, server, io };