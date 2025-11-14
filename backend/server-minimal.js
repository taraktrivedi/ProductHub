#!/usr/bin/env node

/**
 * Minimal ProductHub Server - Backup Deployment
 * This is a ultra-simple version that only uses core dependencies
 * Use this if the main server.js has any dependency issues
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0-minimal'
  });
});

// Mock API endpoints (for testing)
app.get('/api/feedback', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Sample feedback item",
      description: "This is a mock feedback for testing",
      category: "feature",
      priority: "medium",
      status: "new",
      votes: 5
    }
  ]);
});

app.get('/api/features', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Sample feature",
      description: "This is a mock feature for testing",
      status: "backlog",
      votes: 3
    }
  ]);
});

// Serve static files from frontend build (if exists)
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle React routing - send all non-API routes to React app
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    const indexPath = path.join(__dirname, 'frontend/build', 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).send('Frontend build not found. Please build the frontend first.');
      }
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 ProductHub Minimal Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
  console.log(`Frontend: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = { app, server };