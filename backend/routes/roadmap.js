const express = require('express');
const router = express.Router();

// Mock roadmaps data
let roadmaps = [
  {
    id: 1,
    name: 'Product Roadmap Q1 2024',
    description: 'Strategic roadmap for the first quarter of 2024',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    audienceType: 'internal',
    isPublic: false,
    version: 1,
    createdBy: 'John Doe',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  }
];

// Mock roadmap items
let roadmapItems = [
  {
    id: 1,
    roadmapId: 1,
    featureId: 1,
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    status: 'in-progress',
    positionX: 0,
    positionY: 0,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  }
];

// GET /api/roadmap - Get all roadmaps
router.get('/', async (req, res) => {
  try {
    res.json(roadmaps);
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
});

// GET /api/roadmap/:id - Get specific roadmap
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const roadmap = roadmaps.find(item => item.id === parseInt(id));
    
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }
    
    const items = roadmapItems.filter(item => item.roadmapId === parseInt(id));
    
    res.json({ ...roadmap, items });
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
});

// POST /api/roadmap - Create new roadmap
router.post('/', async (req, res) => {
  try {
    const { name, description, startDate, endDate, audienceType = 'internal' } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const newRoadmap = {
      id: Math.max(...roadmaps.map(r => r.id)) + 1,
      name,
      description,
      startDate,
      endDate,
      audienceType,
      isPublic: false,
      version: 1,
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    roadmaps.push(newRoadmap);
    res.status(201).json(newRoadmap);
  } catch (error) {
    console.error('Error creating roadmap:', error);
    res.status(500).json({ error: 'Failed to create roadmap' });
  }
});

// PUT /api/roadmap/:id - Update roadmap
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const roadmapIndex = roadmaps.findIndex(item => item.id === parseInt(id));
    
    if (roadmapIndex === -1) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    roadmaps[roadmapIndex] = {
      ...roadmaps[roadmapIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json(roadmaps[roadmapIndex]);
  } catch (error) {
    console.error('Error updating roadmap:', error);
    res.status(500).json({ error: 'Failed to update roadmap' });
  }
});

module.exports = router;