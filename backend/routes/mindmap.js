const express = require('express');
const router = express.Router();

// Mock mind maps
let mindMaps = [
  {
    id: 1,
    name: 'Feature Ideas Mind Map',
    data: {
      nodes: [
        { id: '1', label: 'Product Features', x: 300, y: 200, color: '#9333EA' },
        { id: '2', label: 'UI/UX', x: 150, y: 100, color: '#A855F7' },
        { id: '3', label: 'Integration', x: 450, y: 100, color: '#6366F1' },
        { id: '4', label: 'Mobile App', x: 100, y: 50, color: '#C084FC' },
        { id: '5', label: 'Desktop App', x: 200, y: 50, color: '#DDD6FE' }
      ],
      edges: [
        { from: '1', to: '2' },
        { from: '1', to: '3' },
        { from: '2', to: '4' },
        { from: '2', to: '5' }
      ]
    },
    isShared: false,
    createdBy: 'John Doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Mock AI generated ideas
let aiIdeas = [
  {
    id: 1,
    title: 'Smart Feature Discovery',
    description: 'AI-powered feature suggestions based on user behavior patterns',
    sourceData: { feedbackCount: 45, categories: ['analytics', 'automation'] },
    confidenceScore: 85,
    status: 'pending',
    feedbackAnalysis: 'High demand for automation features',
    implementationSuggestions: 'Use machine learning to analyze usage patterns',
    createdAt: '2024-01-16T14:30:00Z'
  }
];

// GET /api/mindmap - Get all mind maps
router.get('/', async (req, res) => {
  try {
    res.json(mindMaps);
  } catch (error) {
    console.error('Error fetching mind maps:', error);
    res.status(500).json({ error: 'Failed to fetch mind maps' });
  }
});

// POST /api/mindmap - Create new mind map
router.post('/', async (req, res) => {
  try {
    const { name, data, isShared = false } = req.body;

    if (!name || !data) {
      return res.status(400).json({ error: 'Name and data are required' });
    }

    const newMindMap = {
      id: Math.max(...mindMaps.map(m => m.id)) + 1,
      name,
      data,
      isShared,
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mindMaps.push(newMindMap);
    res.status(201).json(newMindMap);
  } catch (error) {
    console.error('Error creating mind map:', error);
    res.status(500).json({ error: 'Failed to create mind map' });
  }
});

// PUT /api/mindmap/:id - Update mind map
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const mindMapIndex = mindMaps.findIndex(item => item.id === parseInt(id));
    
    if (mindMapIndex === -1) {
      return res.status(404).json({ error: 'Mind map not found' });
    }

    mindMaps[mindMapIndex] = {
      ...mindMaps[mindMapIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json(mindMaps[mindMapIndex]);
  } catch (error) {
    console.error('Error updating mind map:', error);
    res.status(500).json({ error: 'Failed to update mind map' });
  }
});

// GET /api/mindmap/ai-ideas - Get AI generated ideas
router.get('/ai-ideas', async (req, res) => {
  try {
    res.json(aiIdeas);
  } catch (error) {
    console.error('Error fetching AI ideas:', error);
    res.status(500).json({ error: 'Failed to fetch AI ideas' });
  }
});

// POST /api/mindmap/ai-ideas/generate - Generate AI ideas
router.post('/ai-ideas/generate', async (req, res) => {
  try {
    const { feedbackSources, criteria } = req.body;

    // Mock AI idea generation
    const newIdea = {
      id: Math.max(...aiIdeas.map(i => i.id)) + 1,
      title: 'AI Generated Feature Idea',
      description: 'Based on analysis of your feedback data',
      sourceData: { feedbackSources, criteria },
      confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-100
      status: 'pending',
      feedbackAnalysis: 'Analysis of user feedback patterns',
      implementationSuggestions: 'Suggested implementation approach',
      createdAt: new Date().toISOString()
    };

    aiIdeas.push(newIdea);
    res.status(201).json(newIdea);
  } catch (error) {
    console.error('Error generating AI ideas:', error);
    res.status(500).json({ error: 'Failed to generate AI ideas' });
  }
});

module.exports = router;